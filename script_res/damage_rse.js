function CALCULATE_ALL_MOVES_ADV(p1, p2, field) {
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = CALCULATE_DAMAGE_ADV(p1, p2, p1.moves[i], side1);
        results[1][i] = CALCULATE_DAMAGE_ADV(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function CALCULATE_DAMAGE_ADV(attacker, defender, move, field) {
    var description = {
        "attackerName": attacker.name,
        "moveName": move.name,
        "defenderName": defender.name
    };
    
    if (move.bp === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    if (move.name === "웨더볼") {
        move.type = field.weather === "쾌청" ? "불꽃"
                : field.weather === "비" ? "물"
                : field.weather === "모래바람" ? "바위"
                : field.weather === "싸라기눈" ? "얼음"
                : "노말";
        description.weather = field.weather;
        description.moveType = move.type;
        description.moveBP = move.bp;
    }
    
    var typeEffect1 = getMoveEffectiveness(move, defender.type1, field.isForesight);
    var typeEffect2 = defender.type2 ? getMoveEffectiveness(move, defender.type2, field.isForesight) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;

    if (typeEffectiveness === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    if ((defender.ability.indexOf("타오르는불꽃") !== -1 && move.type === "불꽃") ||
            (defender.ability === "부유" && move.type === "땅") ||
            (defender.ability === "축전" && move.type === "전기") ||
            (defender.ability === "축전" && move.type === "물") ||
            (defender.ability === "불가사의부적" && typeEffectiveness <= 1) ||
            (defender.ability === "방음" && move.isSound)) {
        description.defenderAbility = defender.ability;
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    var lv = attacker.level;
    if (move.name === "지구던지기" || move.name === "나이트헤드") {
        return {"damage":[lv], "description":buildDescription(description)};
    }
    
    if (move.hits > 1) {
        description.hits = move.hits;
    }

    var bp;
    switch (move.name) {
        case "바둥바둥":
        case "기사회생":
            var p = Math.floor(48 * attacker.curHP / attacker.maxHP);
            bp = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
            description.moveBP = bp;
            break;
        case "분화":
        case "해수스파우팅":
            bp = Math.max(1, Math.floor(150 * attacker.curHP / attacker.maxHP));
            description.moveBP = bp;
            break;
        case "안다리걸기":
            var w = defender.weight;
            bp = w >= 200 ? 120 : w >= 100 ? 100 : w >= 50 ? 80 : w >= 25 ? 60 : w >= 10 ? 40 : 20;
            description.moveBP = bp;
            break;
        default:
            bp = move.bp;
    }
    
    var isPhysical = typeChart[move.type].category === "물리";
    var attackStat = isPhysical ? AT : SA;
    var defenseStat = isPhysical ? DF : SD;
    var at = attacker.rawStats[attackStat];
    var df = defender.rawStats[defenseStat];
    
    if (isPhysical && (attacker.ability === "천하장사" || attacker.ability === "순수한힘")) {
        at *= 2;
        description.attackerAbility = attacker.ability;
    }
    
    if (getItemBoostType(attacker.item) === move.type) {
        at = Math.floor(at * 1.1);
        description.attackerItem = attacker.item;
    } else if ((isPhysical && attacker.item === "구애머리띠") ||
            (!isPhysical && attacker.item === "마음의물방울" && (attacker.name === "라티오스" || attacker.name === "라티아스"))) {
        at = Math.floor(at * 1.5);
        description.attackerItem = attacker.item;
    } else if ((!isPhysical && attacker.item === "심해의이빨" && attacker.name === "진주몽") ||
            (!isPhysical && attacker.item === "전기구슬" && attacker.name === "피카츄") ||
            (isPhysical && attacker.item === "굵은뼈" && (attacker.name === "탕구리" || attacker.name === "텅구리"))) {
        at *= 2;
        description.attackerItem = attacker.item;
    }
    
    if ((!isPhysical && defender.item === "마음의물방울" && (defender.name === "라티오스" || defender.name === "라티아스")) ||
            (isPhysical && defender.item === "금속파우더" && defender.name === "메타몽")) {
        df = Math.floor(df * 1.5);
        description.defenderItem = defender.item;
    } else if (!isPhysical && defender.item === "심해의비늘" && defender.name === "진주몽") {
        df *= 2;
        description.defenderItem = defender.item;
    }
    
    if (defender.ability === "두꺼운지방" && (move.type === "불꽃" || move.type === "얼음")) {
        at = Math.floor(at / 2);
        description.defenderAbility = defender.ability;
    } else if (isPhysical && defender.ability === "이상한비늘" && defender.status !== "정상") {
        df = Math.floor(df * 1.5);
        description.defenderAbility = defender.ability;
    }
    
    if (isPhysical && (attacker.ability === "의욕" || (attacker.ability === "근성" && attacker.status !== "정상"))) {
        at = Math.floor(at * 1.5);
        description.attackerAbility = attacker.ability;
    } else if (attacker.curHP <= attacker.maxHP / 3 &&
            ((attacker.ability === "심록" && move.type === "Grass") ||
            (attacker.ability === "맹화" && move.type === "불꽃") ||
            (attacker.ability === "급류" && move.type === "물") ||
            (attacker.ability === "벌레의알림" && move.type === "벌레"))) {
        bp = Math.floor(bp * 1.5);
        description.attackerAbility = attacker.ability;
    }
    
    if (move.name === "대폭발" || move.name === "자폭") {
        df = Math.floor(df / 2);
    }
    
    var isCritical = move.isCrit && ["전투무장", "조가비갑옷"].indexOf(defender.ability) === -1;
    
    var attackBoost = attacker.boosts[attackStat];
    var defenseBoost = defender.boosts[defenseStat];
    if (attackBoost > 0 || (!isCritical && attackBoost < 0)) {
        at = getModifiedStat(at, attackBoost);
        description.attackBoost = attackBoost;
    }
    if (defenseBoost < 0 || (!isCritical && defenseBoost > 0)) {
        df = getModifiedStat(df, defenseBoost);
        description.defenseBoost = defenseBoost;
    }
    
    var baseDamage = Math.floor(Math.floor(Math.floor(2 * lv / 5 + 2) * at * bp / df) / 50);
    
    if (attacker.status === "화상" && isPhysical && attacker.ability !== "근성") {
        baseDamage = Math.floor(baseDamage / 2);
        description.isBurned = true;
    }
    
    if (!isCritical) {
        var screenMultiplier = field.format !== "싱글" ? (2/3) : (1/2);
        if (isPhysical && field.isReflect) {
            baseDamage = Math.floor(baseDamage * screenMultiplier); 
            description.isReflect = true;
        } else if (!isPhysical && field.isLightScreen) {
            baseDamage = Math.floor(baseDamage * screenMultiplier); 
            description.isLightScreen = true;
        }
    }

    if (field.format !== "싱글" && move.isSpread) {
        // some sources say 3/4, some say 2/3, some say 1/2...using 3/4 for now since that's what DPP+ use
        baseDamage = Math.floor(baseDamage * 3/4);
    }
    
    if ((field.weather === "쾌청" && move.type === "불꽃") || (field.weather === "비" && move.type === "물")) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.weather = field.weather;
    } else if ((field.weather === "쾌청" && move.type === "물") || (field.weather === "비" && move.type === "불꽃") ||
            (move.name === "솔라빔" && ["비", "모래바람", "싸라기눈"].indexOf(field.weather) !== -1)) {
        baseDamage = Math.floor(baseDamage / 2);
        description.weather = field.weather;
    }

    if (attacker.ability === "타오르는불꽃 (활성)" && move.type === "불꽃") {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.attackerAbility = "타오르는불꽃";
    }
    
    baseDamage = Math.max(1, baseDamage) + 2;
    
    if (isCritical) {
        baseDamage *= 2;
        description.isCritical = true;
    }
    
    if (move.name === "웨더볼" && field.weather !== "") {
        baseDamage *= 2;
        description.moveBP = move.bp * 2;
    }
    
    if (field.isHelpingHand) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.isHelpingHand = true;
    }
    
    if (move.type === attacker.type1 || move.type === attacker.type2) {
        baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    baseDamage = Math.floor(baseDamage * typeEffectiveness);
    
    var damage = [];
    for (var i = 85; i <= 100; i++) {
        damage[i-85] = Math.max(1, Math.floor(baseDamage * i / 100));
    }
    return {"damage":damage, "description":buildDescription(description)};
}
