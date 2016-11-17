function CALCULATE_ALL_MOVES_DPP(p1, p2, field) {
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkKlutz(p1);
    checkKlutz(p2);
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    checkDownload(p1, p2);
    checkDownload(p2, p1);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather());
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather());
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = CALCULATE_DAMAGE_DPP(p1, p2, p1.moves[i], side1);
        results[1][i] = CALCULATE_DAMAGE_DPP(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function CALCULATE_DAMAGE_DPP(attacker, defender, move, field) {
    var description = {
        "attackerName": attacker.name,
        "moveName": move.name,
        "defenderName": defender.name
    };
    
    if (move.bp === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    var defAbility = defender.ability;
    if (attacker.ability === "틀깨기") {
        defAbility = "";
        description.attackerAbility = attacker.ability;
    }
    
    var isCritical = move.isCrit && ["전투무장", "조가비갑옷"].indexOf(defAbility) === -1;
    
    if (move.name === "웨더볼") {
        if (field.weather === "쾌청") {
            move.type = "불꽃";
            move.bp *= 2;
        } else if (field.weather === "비") {
            move.type = "물";
            move.bp *= 2;
        } else if (field.weather === "모래바람") {
            move.type = "바위";
            move.bp *= 2;
        } else if (field.weather === "싸라기눈") {
            move.type = "얼음";
            move.bp *= 2;
        } else {
            move.type = "노말";
        }
        description.weather = field.weather;
        description.moveType = move.type;
        description.moveBP = basePower;
    } else if (move.name === "심판의뭉치" && attacker.item.indexOf("플레이트") !== -1) {
        move.type = getItemBoostType(attacker.item);
    } else if (move.name === "자연의은혜" && attacker.item.indexOf("열매") !== -1) {
        var gift = getNaturalGift(attacker.item);
        move.type = gift.t;
        move.bp = gift.p;
        description.attackerItem = attacker.item;
        description.moveBP = move.bp;
        description.moveType = move.type;
    }
    
    if (attacker.ability === "노말스킨") {
        move.type = "노말";
        description.attackerAbility = attacker.ability;
    }
    
    var typeEffect1 = getMoveEffectiveness(move, defender.type1, attacker.ability === "배짱" || field.isForesight, field.isGravity);
    var typeEffect2 = defender.type2 ? getMoveEffectiveness(move, defender.type2, attacker.ability === "배짱" || field.isForesight, field.isGravity) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;
    
    if (typeEffectiveness === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    if ((defAbility === "불가사의부적" && typeEffectiveness <= 1) ||
            (move.type === "불꽃" && defAbility.indexOf("타오르는불꽃") !== -1) ||
            (move.type === "물" && ["건조피부", "축전"].indexOf(defAbility) !== -1) ||
            (move.type === "전기" && ["전기엔진", "축전"].indexOf(defAbility) !== -1) ||
            (move.type === "땅" && !field.isGravity && defAbility === "부유") ||
            (move.isSound && defAbility === "방음")) {
        description.defenderAbility = defAbility;
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    description.HPEVs = defender.HPEVs + " HP";
    
    if (move.name === "지구던지기" || move.name === "나이트헤드") {
        return {"damage":[attacker.level], "description":buildDescription(description)};
    }
    
    if (move.hits > 1) {
        description.hits = move.hits;
    }
    var turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";
    
    ////////////////////////////////
    ////////// BASE POWER //////////
    ////////////////////////////////
    switch (move.name) {
        case "소금물":
            if (defender.curHP <= (defender.maxHP / 2)) {
                move.bp *= 2;
                description.moveBP = move.bp;
            }
            break;
        case "분화":
        case "해수스파우팅":
            move.bp = Math.max(1, Math.floor(move.bp * attacker.curHP / attacker.maxHP));
            description.moveBP = move.bp;
            break;
        case "객기":
            if (["마비", "독", "맹독", "화상"].indexOf(attacker.status) !== -1) {
                move.bp *= 2;
                description.moveBP = move.bp;
            }
            break;
        case "바둥바둥":
        case "기사회생":
            var p = Math.floor(48 * attacker.curHP / attacker.maxHP);
            move.bp = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
            description.moveBP = move.bp;
            break;
        case "내던지기":
            move.bp = getFlingPower(attacker.item);
            description.moveBP = move.bp;
            description.attackerItem = attacker.item;
            break;
        case "풀묶기":
        case "안다리걸기":
            var w = defender.weight;
            move.bp = w >= 200 ? 120 : w >= 100 ? 100 : w >= 50 ? 80 : w >= 25 ? 60 : w >= 10 ? 40 : 20;
            description.moveBP = move.bp;
            break;
        case "자이로볼":
            move.bp = Math.min(150, Math.floor(25 * defender.stats[SP] / attacker.stats[SP]));
            description.moveBP = move.bp;
            break;
        case "보복":
            if (turnOrder !== "FIRST") {
                move.bp *= 2;
                description.moveBP = move.bp;
            }
            break;
        case "혼내기":
            var boostCount = countBoosts(defender.boosts);
            if (boostCount > 0) {
                move.bp = Math.min(200, move.bp + 20 * boostCount);
                description.moveBP = move.bp;
            }
            break;
        case "잠깨움뺨치기":
            if (defender.status === "잠듦") {
                move.bp *= 2;
                description.moveBP = move.bp;
            }
            break;
    }
    
    var basePower = move.bp;

    if (field.isHelpingHand) {
        basePower = Math.floor(basePower * 1.5);
        description.isHelpingHand = true;
    }
    
    var isPhysical = move.category === "물리";
    if ((attacker.item === "힘의머리띠" && isPhysical) || (attacker.item === "박식안경" && !isPhysical)) {
        basePower = Math.floor(basePower * 1.1);
        description.attackerItem = attacker.item;
    } else if (getItemBoostType(attacker.item) === move.type ||
            (((attacker.item === "금강옥" && attacker.name === "디아루가") ||
            (attacker.item === "백옥" && attacker.name === "펄기아") ||
            (attacker.item === "백금옥" && attacker.name === "기라티나-오리진")) &&
            (move.type === attacker.type1 || move.type === attacker.type2))) {
        basePower = Math.floor(basePower * 1.2);
        description.attackerItem = attacker.item;
    }
    
    if ((attacker.ability === "이판사판" && move.hasRecoil) ||
            (attacker.ability === "철주먹" && move.isPunch)) {
        basePower = Math.floor(basePower * 1.2);
        description.attackerAbility = attacker.ability;
    } else if ((attacker.curHP <= attacker.maxHP / 3 &&
            ((attacker.ability === "심록" && move.type === "풀") ||
            (attacker.ability === "맹화" && move.type === "불꽃") ||
            (attacker.ability === "급류" && move.type === "물") ||
            (attacker.ability === "벌레의알림" && move.type === "벌레"))) ||
            (attacker.ability === "테크니션" && move.bp <= 60)) {
        basePower = Math.floor(basePower * 1.5);
        description.attackerAbility = attacker.ability;
    }
    
    if ((defAbility === "두꺼운지방" && (move.type === "불꽃" || move.type === "얼음")) ||
            (defAbility === "내열" && move.type === "불꽃")) {
        basePower = Math.floor(basePower * 0.5);
        description.defenderAbility = defAbility;
    } else if (defAbility === "건조피부" && move.type === "불꽃") {
        basePower = Math.floor(basePower * 1.25);
        description.defenderAbility = defAbility;
    }
    
    ////////////////////////////////
    ////////// (SP)ATTACK //////////
    ////////////////////////////////
    var attackStat = isPhysical ? AT : SA;
    description.attackEVs = attacker.evs[attackStat] +
            (NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
            toSmogonStat(attackStat);
    var attack;
    var attackBoost = attacker.boosts[attackStat];
    var rawAttack = attacker.rawStats[attackStat];
    if (attackBoost === 0 || (isCritical && attackBoost < 0)) {
        attack = rawAttack;
    } else if (defAbility === "천진") {
        attack = rawAttack;
        description.defenderAbility = defAbility;
    } else if (attacker.ability === "단순") {
        attack = getSimpleModifiedStat(rawAttack, attackBoost);
        description.attackerAbility = attacker.ability;
        description.attackBoost = attackBoost;
    } else {
        attack = getModifiedStat(rawAttack, attackBoost);
        description.attackBoost = attackBoost;
    }
    
    if (isPhysical && (attacker.ability === "순수한힘" || attacker.ability === "천하장사")) {
        attack *= 2;
        description.attackerAbility = attacker.ability;
    } else if (field.weather === "쾌청" && (isPhysical ? attacker.ability === "플라워기프트" : attacker.ability === "선파워")) {
        attack = Math.floor(attack * 1.5);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    } else if (isPhysical && (attacker.ability === "의욕" || (attacker.ability === "근성" && attacker.status !== "정상"))) {
        attack = Math.floor(attack * 1.5);
        description.attackerAbility = attacker.ability;
    }
    
    if ((isPhysical ? attacker.item === "구애머리띠" : attacker.item === "구애안경") ||
            (attacker.item === "마음의물방울" && (attacker.name === "라티오스" || attacker.name === "라티아스") && !isPhysical)) {
        attack = Math.floor(attack * 1.5);
        description.attackerItem = attacker.item;
    } else if ((attacker.item === "전기구슬" && attacker.name === "피카츄") ||
            (attacker.item === "굵은뼈" && (attacker.name === "탕구리" || attacker.name === "텅구리") && isPhysical) ||
            (attacker.item === "심해의이빨" && attacker.name === "진주몽" && !isPhysical)) {
        attack *= 2;
        description.attackerItem = attacker.item;
    }
    
    ////////////////////////////////
    ///////// (SP)DEFENSE //////////
    ////////////////////////////////
    var defenseStat = isPhysical ? DF : SD;
    description.defenseEVs = defender.evs[defenseStat] +
            (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
            toSmogonStat(defenseStat);
    var defense;
    var defenseBoost = defender.boosts[defenseStat];
    var rawDefense = defender.rawStats[defenseStat];
    if (defenseBoost === 0 || (isCritical && defenseBoost > 0)) {
        defense = rawDefense;
    } else if (attacker.ability === "천진") {
        defense = rawDefense;
        description.attackerAbility = attacker.ability;
    } else if (defAbility === "단순") {
        defense = getSimpleModifiedStat(rawDefense, defenseBoost);
        description.defenderAbility = defAbility;
        description.defenseBoost = defenseBoost;
    } else {
        defense = getModifiedStat(rawDefense, defenseBoost);
        description.defenseBoost = defenseBoost;
    }
    
    if (defAbility === "이상한비늘" && defender.status !== "정상" && isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.defenderAbility = defAbility;
    } else if (defAbility === "플라워기프트" && field.weather === "쾌청" && !isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.defenderAbility = defAbility;
        description.weather = field.weather;
    }
    
    if ((defender.item === "마음의물방울" && (defender.name === "라티오스" || defender.name === "라티아스") && !isPhysical) ||
            (defender.item === "금속파우더" && defender.name === "메타몽")) {
        defense = Math.floor(defense * 1.5);
        description.defenderItem = defender.item;
    } else if (defender.item === "심해의비늘" && defender.name === "진주몽" && !isPhysical) {
        defense *= 2;
        description.defenderItem = defender.item;
    }
    
    if (field.weather === "모래바람" && (defender.type1 === "바위" || defender.type2 === "바위") && !isPhysical) {
        defense = Math.floor(defense * 1.5);
        description.weather = field.weather;
    }
    
    if (move.name === "대폭발" || move.name === "자폭") {
        defense = Math.floor(defense * 0.5);
    }
    
    if (defense < 1) {
        defense = 1;
    }
    
    ////////////////////////////////
    //////////// DAMAGE ////////////
    ////////////////////////////////
    var baseDamage = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * basePower * attack / 50) / defense);
    
    if (attacker.status === "화상" && isPhysical && attacker.ability !== "근성") {
        baseDamage = Math.floor(baseDamage * 0.5);
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
        baseDamage = Math.floor(baseDamage * 3/4);
    }
    
    if ((field.weather === "쾌청" && move.type === "불꽃") || (field.weather === "비" && move.type === "물")) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.weather = field.weather;
    } else if ((field.weather === "쾌청" && move.type === "물") || (field.weather === "비" && move.type === "불꽃") ||
            (["비", "모래바람", "싸라기눈"].indexOf(field.weather) !== -1 && move.name === "솔라빔")) {
        baseDamage = Math.floor(baseDamage * 0.5);
        description.weather = field.weather;
    }
    
    if (attacker.ability === "타오르는불꽃 (활성)" && move.type === "불꽃") {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.attackerAbility = "타오르는불꽃";
    }
    
    baseDamage += 2;
    
    if (isCritical) {
        if (attacker.ability === "스나이퍼") {
            baseDamage *= 3;
            description.attackerAbility = attacker.ability;
        } else {
            baseDamage *= 2;
        }
        description.isCritical = isCritical;
    }
    
    if (attacker.item === "생명의구슬") {
        baseDamage = Math.floor(baseDamage * 1.3);
        description.attackerItem = attacker.item;
    }
    
    // the random factor is applied between the LO mod and the STAB mod, so don't apply anything below this until we're inside the loop
    var stabMod = 1;
    if (move.type === attacker.type1 || move.type === attacker.type2) {
        if (attacker.ability === "적응력") {
            stabMod = 2;
            description.attackerAbility = attacker.ability;
        } else {
            stabMod = 1.5;
        }
    }
    
    var filterMod = 1;
    if ((defAbility === "필터" || defAbility === "하드록" || defAbility === "프리즘아머") && typeEffectiveness > 1) {
        filterMod = 0.75;
        description.defenderAbility = defAbility;
    }
    var ebeltMod = 1;
    if (attacker.item === "달인의띠" && typeEffectiveness > 1) {
        ebeltMod = 1.2;
        description.attackerItem = attacker.item;
    }
    var tintedMod = 1;
    if (attacker.ability === "색안경" && typeEffectiveness < 1) {
        tintedMod = 2;
        description.attackerAbility = attacker.ability;
    }
    var berryMod = 1;
    if (getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.type === "노말")) {
        berryMod = 0.5;
        description.defenderItem = defender.item;
    }
    
    var damage = [];
    for (var i = 0; i < 16; i++) {
        damage[i] = Math.floor(baseDamage * (85 + i) / 100);
        damage[i] = Math.floor(damage[i] * stabMod);
        damage[i] = Math.floor(damage[i] * typeEffect1);
        damage[i] = Math.floor(damage[i] * typeEffect2);
        damage[i] = Math.floor(damage[i] * filterMod);
        damage[i] = Math.floor(damage[i] * ebeltMod);
        damage[i] = Math.floor(damage[i] * tintedMod);
        damage[i] = Math.floor(damage[i] * berryMod);
        damage[i] = Math.max(1, damage[i]);
    }
    return {"damage":damage, "description":buildDescription(description)};
}

function getSimpleModifiedStat(stat, mod) {
    var simpleMod = Math.min(6, Math.max(-6, mod * 2));
    return simpleMod > 0 ? Math.floor(stat * (2 + simpleMod) / 2)
            : simpleMod < 0 ? Math.floor(stat * 2 / (2 - simpleMod))
            : stat;
}
