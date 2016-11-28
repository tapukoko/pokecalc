function CALCULATE_ALL_MOVES_BW(p1, p2, field) {
    checkAirLock(p1, field);
    checkAirLock(p2, field);
    checkForecast(p1, field.getWeather());
    checkForecast(p2, field.getWeather());
    checkKlutz(p1);
    checkKlutz(p2);
    p1.stats[DF] = getModifiedStat(p1.rawStats[DF], p1.boosts[DF]);
    p1.stats[SD] = getModifiedStat(p1.rawStats[SD], p1.boosts[SD]);
    p1.stats[SP] = getFinalSpeed(p1, field.getWeather());
    p2.stats[DF] = getModifiedStat(p2.rawStats[DF], p2.boosts[DF]);
    p2.stats[SD] = getModifiedStat(p2.rawStats[SD], p2.boosts[SD]);
    p2.stats[SP] = getFinalSpeed(p2, field.getWeather());
    checkIntimidate(p1, p2);
    checkIntimidate(p2, p1);
    checkDownload(p1, p2);
    checkDownload(p2, p1);
    p1.stats[AT] = getModifiedStat(p1.rawStats[AT], p1.boosts[AT]);
    p1.stats[SA] = getModifiedStat(p1.rawStats[SA], p1.boosts[SA]);
    p2.stats[AT] = getModifiedStat(p2.rawStats[AT], p2.boosts[AT]);
    p2.stats[SA] = getModifiedStat(p2.rawStats[SA], p2.boosts[SA]);
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    checkInfiltrator(p1, side1);
    checkInfiltrator(p2, side2);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = getDamageResult(p1, p2, p1.moves[i], side1);
        results[1][i] = getDamageResult(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function getDamageResult(attacker, defender, move, field) {
    var moveDescName = move.name;
    if(move.isZ){
        var tempMove = move;
        //turning it into a generic single-target Z-move
        move = moves[ZMOVES_LOOKUP[tempMove.type]];
        move.bp = tempMove.zp;
        move.name = "Z-"+tempMove.name;
        move.isZ = true;
        move.category = tempMove.category;
        move.type = tempMove.type;
        move.isCrit = tempMove.isCrit;
        move.hits = 1;
        moveDescName = ZMOVES_LOOKUP[tempMove.type] + " (" + tempMove.zp + " BP)";
    }
    var description = {
        "attackerName": attacker.name,
        "moveName": moveDescName,
        "defenderName": defender.name
    };
    if (move.bp === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    var defAbility = defender.ability;
    if (["틀깨기", "테라볼티지", "터보블레이즈"].indexOf(attacker.ability) !== -1) {
        defAbility = "";
        description.attackerAbility = attacker.ability;
    }
    else if(move.name === "섀도레이" || move.name === "메테오드라이브")
        defAbility = ""; //works as a mold breaker
    
    var isCritical = move.isCrit && ["전투무장", "조가비갑옷"].indexOf(defAbility) === -1;
    
    if (move.name === "웨더볼") {
        move.type = field.weather.indexOf("쾌청") > -1 ? "불꽃"
                : field.weather.indexOf("비") > -1 ? "물"
                : field.weather === "모래바람" ? "바위"
                : field.weather === "싸라기눈" ? "얼음"
                : "노말";
        description.weather = field.weather;
        description.moveType = move.type;
    } else if (move.name === "심판의뭉치" && attacker.item.indexOf("플레이트") !== -1) {
        move.type = getItemBoostType(attacker.item);
    } else if (move.name === "자연의은혜" && attacker.item.indexOf("열매") !== -1) {
        var gift = getNaturalGift(attacker.item);
        move.type = gift.t;
        move.bp = gift.p;
        description.attackerItem = attacker.item;
        description.moveBP = move.bp;
        description.moveType = move.type;
    } else if (move.name === "자연의힘") {
        move.type = field.terrain === "일렉트릭" ? "전기" : field.terrain === "그래스" ? "풀" : field.terrain === "미스트" ? "페어리" : "노말";
    }
    
    var isAerilate = attacker.ability === "스카이스킨" && move.type === "노말";
    var isPixilate = attacker.ability === "페어리스킨" && move.type === "노말";
    var isRefrigerate = attacker.ability === "프리즈스킨" && move.type === "노말";
    var isGalvanize = attacker.ability === "일렉트릭스킨" && move.type === "노말";
    if(!move.isZ){ //Z-Moves don't receive -ate type changes
        if (isAerilate) {
            move.type = "비행";
        } else if (isPixilate) {
            move.type = "페어리";
        } else if (isRefrigerate) {
            move.type = "얼음";
        } else if(isGalvanize) {
            move.type = "전기";
        } else if (attacker.ability === "노말스킨") {
            move.type = "노말";
            description.attackerAbility = attacker.ability;
        } else if(attacker.ability === "촉촉보이스" && move.isSound){
            move.type = "물"
            description.attackerAbility = attacker.ability;
        } 
    }
    
    var typeEffect1 = getMoveEffectiveness(move, defender.type1, attacker.ability === "배짱" || field.isForesight, field.isGravity);
    var typeEffect2 = defender.type2 ? getMoveEffectiveness(move, defender.type2, attacker.ability === "배짱" || field.isForesight, field.isGravity) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;
    
    if (typeEffectiveness === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    if ((defAbility === "불가사의부적" && typeEffectiveness <= 1) ||
            (move.type === "풀" && defAbility === "초식") ||
            (move.type === "불꽃" && defAbility.indexOf("타오르는불꽃") !== -1) ||
            (move.type === "물" && ["건조피부", "마중물", "축전"].indexOf(defAbility) !== -1) ||
            (move.type === "전기" && ["피뢰침", "피뢰침", "전기엔진", "축전"].indexOf(defAbility) !== -1) ||
            (move.type === "땅" && !field.isGravity && defAbility === "부유") ||
            (move.isBullet && defAbility === "방탄") ||
            (move.isSound && defAbility === "방음")) {
        description.defenderAbility = defAbility;
        return {"damage":[0], "description":buildDescription(description)};
    }
    if (move.type === "땅" && !field.isGravity && defender.item === "풍선") {
        description.defenderItem = defender.item;
        return {"damage":[0], "description":buildDescription(description)};
    }
    if ((field.weather === "아주 강한 햇살" && move.type === "물") || (field.weather === "강한 비" && move.type === "불꽃")) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    if (move.name === "프리폴" &&
        ([defender.type1, defender.type2].indexOf("비행") !== -1 ||
            defender.weight >= 200.0 || field.isGravity)) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    if (move.name === "싱크로노이즈" &&
            [defender.type1, defender.type2].indexOf(attacker.type1) === -1 && [defender.type1, defender.type2].indexOf(attacker.type2) === -1) {
        return {"damage": [0], "description": buildDescription(description)};
    }
    
    description.HPEVs = defender.HPEVs + " HP";
    
    if (move.name === "지구던지기" || move.name === "나이트헤드") {
        var lv = attacker.level;
        if (attacker.ability === "부자유친") {
            lv *= 2;
        }
        return {"damage":[lv], "description":buildDescription(description)};
    }
    
    if (move.hits > 1) {
        description.hits = move.hits;
    }
    var turnOrder = attacker.stats[SP] > defender.stats[SP] ? "FIRST" : "LAST";
    
    ////////////////////////////////
    ////////// BASE POWER //////////
    ////////////////////////////////
    var basePower;
    switch (move.name) {
        case "보복":
            basePower = turnOrder === "LAST" ? 100 : 50;
            description.moveBP = basePower;
            break;
        case "일렉트릭볼":
            var r = Math.floor(attacker.stats[SP] / defender.stats[SP]);
            basePower = r >= 4 ? 150 : r >= 3 ? 120 : r >= 2 ? 80 : 60;
            description.moveBP = basePower;
            break;
        case "자이로볼":
            basePower = Math.min(150, Math.floor(25 * defender.stats[SP] / attacker.stats[SP]));
            description.moveBP = basePower;
            break;
        case "혼내기":
            basePower = Math.min(200, 60 + 20 * countBoosts(defender.boosts));
            description.moveBP = basePower;
            break;
        case "안다리걸기":
        case "풀묶기":
            var w = defender.weight;
            basePower = w >= 200 ? 120 : w >= 100 ? 100 : w >= 50 ? 80 : w >= 25 ? 60 : w >= 10 ? 40 : 20;
            description.moveBP = basePower;
            break;
        case "병상첨병":
            basePower = move.bp * (defender.status !== "정상" ? 2 : 1);
            description.moveBP = basePower;
            break;
        case "헤비봄버":
        case "히트스탬프":
            var wr = attacker.weight / defender.weight;
            basePower = wr >= 5 ? 120 : wr >= 4 ? 100 : wr >= 3 ? 80 : wr >= 2 ? 60 : 40;
            description.moveBP = basePower;
            break;
        case "어시스트파워":
            basePower = 20 + 20 * countBoosts(attacker.boosts);
            description.moveBP = basePower;
            break;
        case "애크러뱃":
            basePower = attacker.item === "비행주얼" || attacker.item === "" ? 110 : 55;
            description.moveBP = basePower;
            break;
        case "잠깨움뺨치기":
            basePower = move.bp * (defender.status === "잠듦" ? 2 : 1);
            description.moveBP = basePower;
            break;
        case "웨더볼":
            basePower = field.weather !== "" ? 100 : 50;
            description.moveBP = basePower;
            break;
        case "내던지기":
            basePower = getFlingPower(attacker.item);
            description.moveBP = basePower;
            description.attackerItem = attacker.item;
            break;
        case "분화":
        case "해수스파우팅":
            basePower = Math.max(1, Math.floor(150 * attacker.curHP / attacker.maxHP));
            description.moveBP = basePower;
            break;
        case "바둥바둥":
        case "기사회생":
            var p = Math.floor(48 * attacker.curHP / attacker.maxHP);
            basePower = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
            description.moveBP = basePower;
            break;
        case "땅고르기":
        case "지진":
            basePower = (field.terrain === "그래스") ? move.bp / 2 : move.bp;
            description.terrain = field.terrain;
            break;
        case "자연의힘":
            basePower = (field.terrain === "일렉트릭" || field.terrain === "그래스") ? 90 : (field.terrain === "미스트") ? 95 : 80;
            break;
        default:
            basePower = move.bp;
    }
    
    var bpMods = [];
    if ((attacker.ability === "테크니션" && basePower <= 60) ||
            (attacker.ability === "열폭주" && attacker.status === "화상" && move.category === "특수") ||
            (attacker.ability === "독폭주" && (attacker.status === "독" || attacker.status === "맹독") &&
                    move.category === "물리")) {
        bpMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    } else if (attacker.ability === "애널라이즈" && turnOrder !== "FIRST") {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    } else if (attacker.ability === "모래의힘" && field.weather === "모래바람" && ["바위","땅","강철"].indexOf(move.type) !== -1) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    } else if ((attacker.ability === "이판사판" && move.hasRecoil) ||
            (attacker.ability === "철주먹" && move.isPunch)) {
        bpMods.push(0x1333);
        description.attackerAbility = attacker.ability;
    }
    
    if (defAbility === "내열" && move.type === "불꽃") {
        bpMods.push(0x800);
        description.defenderAbility = defAbility;
    } else if (defAbility === "건조피부" && move.type === "불꽃") {
        bpMods.push(0x1400);
        description.defenderAbility = defAbility;
    }
    
    if (attacker.ability === "우격다짐" && move.hasSecondaryEffect) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    }
    
    if (getItemBoostType(attacker.item) === move.type) {
        bpMods.push(0x1333);
        description.attackerItem = attacker.item;
    } else if ((attacker.item === "힘의머리띠" && move.category === "물리") ||
            (attacker.item === "박식안경" && move.category === "특수")) {
        bpMods.push(0x1199);
        description.attackerItem = attacker.item;
    } else if (((attacker.item === "금강옥" && attacker.name === "디아루가") ||
            (attacker.item === "백옥" && attacker.name === "펄기아") ||
            (attacker.item === "백금옥" && attacker.name === "기라티나-오리진")) &&
            (move.type === attacker.type1 || move.type === attacker.type2)) {
        bpMods.push(0x1333);
        description.attackerItem = attacker.item;
    } else if (attacker.item === move.type + "주얼") {
        bpMods.push(gen >= 6 ? 0x14CD : 0x1800);
        description.attackerItem = attacker.item;
    }
    
    if ((move.name === "객기" && ["화상","마비","독","맹독"].indexOf(attacker.status) !== -1) ||
            (move.name === "소금물" && defender.curHP <= defender.maxHP / 2) ||
            (move.name === "베놈쇼크" && (defender.status === "독" || defender.status === "맹독"))) {
        bpMods.push(0x2000);
        description.moveBP = move.bp * 2;
    } else if ((move.name === "솔라빔" || move.name == "솔라빔") && ["비","모래바람","싸라기눈","강한 비"].indexOf(field.weather) !== -1) {
        bpMods.push(0x800);
        description.moveBP = move.bp / 2;
        description.weather = field.weather;
    } else if (gen >= 6 && move.name === "탁쳐서떨구기" && !(defender.item === "" ||
            (defender.name === "기라티나-오리진" && defender.item === "백금옥") ||
            (defender.name.indexOf("아르세우스") !== -1 && defender.item.indexOf("플레이트") !== -1))) {
        bpMods.push(0x1800);
        description.moveBP = move.bp * 1.5;
    }
    
    if (field.isHelpingHand) {
        bpMods.push(0x1800);
        description.isHelpingHand = true;
    }
    
    if (!move.isZ && (isAerilate || isPixilate || isRefrigerate || isGalvanize)) {
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    } else if ((attacker.ability === "메가런처" && move.isPulse) ||
            (attacker.ability === "옹골찬턱" && move.isBite)) {
        bpMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    } else if (attacker.ability === "단단한발톱" && move.makesContact) { //boosts by 1.3x for contact moves, apparently
        bpMods.push(0x14CD);
        description.attackerAbility = attacker.ability;
    } else if(defender.ability === "복슬복슬" && move.makesContact){
        bpMods.push(0x800);
    }
    

    var isAttackerAura = (attacker.ability === (move.type + "오라")) || (attacker.ability == "다크오라" && move.type == "악"); //Special handling of 다크오라
    var isDefenderAura = (defAbility === (move.type + "오라")) || (attacker.ability == "다크오라" && move.type == "악"); //Special handling of 다크오라
    var auraActive = ($("input:checkbox[value='" + move.type + "오라']:checked").val() != undefined) || (($("input:checkbox[value='다크오라']:checked").val() != undefined) && (move.type == "악")); //Special handling of 다크오라
    var auraBreak = ($("input:checkbox[value='오라브레이크']:checked").val() != undefined);
    if (auraActive) {
        if (auraBreak) {
            bpMods.push(0x0C00);
            description.attackerAbility = attacker.ability;
            description.defenderAbility = defAbility;
        } else {
            bpMods.push(0x1547);
            if (isAttackerAura) {
                description.attackerAbility = attacker.ability;
            }
            if (isDefenderAura) {
                description.defenderAbility = defAbility;
            }
        }
    }
    
    if(move.type === "강철" && attacker.ability === "강철술사"){
        bpMods.push(0x1547);
    }
    
    basePower = Math.max(1, pokeRound(basePower * chainMods(bpMods) / 0x1000));
    basePower = attacker.isChild ? basePower / 4 : basePower;
    
    ////////////////////////////////
    ////////// (SP)ATTACK //////////
    ////////////////////////////////
    var attack;
    var attackSource = move.name === "속임수" ? defender : attacker;
    var attackStat = move.category === "물리" ? AT : SA;
    description.attackEVs = attacker.evs[attackStat] +
            (NATURES[attacker.nature][0] === attackStat ? "+" : NATURES[attacker.nature][1] === attackStat ? "-" : "") + " " +
            toSmogonStat(attackStat);
    if (attackSource.boosts[attackStat] === 0 || (isCritical && attackSource.boosts[attackStat] < 0)) {
        attack = attackSource.rawStats[attackStat];
    } else if (defAbility === "천진") {
        attack = attackSource.rawStats[attackStat];
        description.defenderAbility = defAbility;
    } else {
        attack = attackSource.stats[attackStat];
        description.attackBoost = attackSource.boosts[attackStat];
    }
    
    // unlike all other attack modifiers, 의욕 gets applied directly
    if (attacker.ability === "의욕" && move.category === "물리") {
        attack = pokeRound(attack * 3/2);
        description.attackerAbility = attacker.ability;
    }
    
    var atMods = [];
    if ((defAbility === "두꺼운지방" && (move.type === "불꽃" || move.type === "얼음")) || (defAbility === "수포" && move.type === "불꽃")) {
        atMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    if (defAbility === "복슬복슬" && move.type === "불꽃") {
        atMods.push(0x2000);
        description.defenderAbility = defAbility;
    }

    
    if ((attacker.ability === "근성" && attacker.status !== "정상" && move.category === "물리") ||
            (attacker.ability === "심록" && attacker.curHP <= attacker.maxHP / 3 && move.type === "풀") ||
            (attacker.ability === "맹화" && attacker.curHP <= attacker.maxHP / 3 && move.type === "불꽃") ||
            (attacker.ability === "급류" && attacker.curHP <= attacker.maxHP / 3 && move.type === "물") ||
            (attacker.ability === "벌레의알림" && attacker.curHP <= attacker.maxHP / 3 && move.type === "벌레")) {
        atMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    } else if (attacker.ability === "타오르는불꽃 (활성)" && move.type === "불꽃") {
        atMods.push(0x1800);
        description.attackerAbility = "타오르는불꽃";
    } else if ((attacker.ability === "선파워" && field.weather.indexOf("쾌청") > -1 && move.category === "특수") ||
            (attacker.ability === "플라워기프트" && field.weather.indexOf("쾌청") > -1 && move.category === "물리")) {
        atMods.push(0x1800);
        description.attackerAbility = attacker.ability;
        description.weather = field.weather;
    } else if ((attacker.ability === "무기력" && attacker.curHP <= attacker.maxHP / 2) ||
            (attacker.ability === "슬로스타트" && move.category === "물리")) {
        atMods.push(0x800);
        description.attackerAbility = attacker.ability;
    } else if ((attacker.ability === "수포" && move.type === "물") ||
        ((attacker.ability === "천하장사" || attacker.ability === "순수한힘") && move.category === "물리")) {
        atMods.push(0x2000);
        description.attackerAbility = attacker.ability;
    }
    
    if ((attacker.item === "굵은뼈" && (attacker.name === "탕구리" || attacker.name === "텅구리" || attacker.name === "알로라 텅구리") && move.category === "물리") ||
            (attacker.item === "심해의이빨" && attacker.name === "진주몽" && move.category === "특수") ||
            (attacker.item === "전기구슬" && attacker.name === "피카츄")) {
        atMods.push(0x2000);
        description.attackerItem = attacker.item;
    } else if ((attacker.item === "마음의물방울" && (attacker.name === "라티오스" || attacker.name === "라티아스") && move.category === "특수") ||
            (attacker.item === "구애머리띠" && move.category === "물리") ||
            (attacker.item === "구애안경" && move.category === "특수")) {
        atMods.push(0x1800);
        description.attackerItem = attacker.item;
    }
    
    attack = Math.max(1, pokeRound(attack * chainMods(atMods) / 0x1000));
    
    ////////////////////////////////
    ///////// (SP)DEFENSE //////////
    ////////////////////////////////
    var defense;
    var hitsPhysical = move.category === "물리" || move.dealsPhysicalDamage;
    var defenseStat = hitsPhysical ? DF : SD;
    description.defenseEVs = defender.evs[defenseStat] +
            (NATURES[defender.nature][0] === defenseStat ? "+" : NATURES[defender.nature][1] === defenseStat ? "-" : "") + " " +
            toSmogonStat(defenseStat);
    if (defender.boosts[defenseStat] === 0 || (isCritical && defender.boosts[defenseStat] > 0) || move.ignoresDefenseBoosts) {
        defense = defender.rawStats[defenseStat];
    } else if (attacker.ability === "천진") {
        defense = defender.rawStats[defenseStat];
        description.attackerAbility = attacker.ability;
    } else {
        defense = defender.stats[defenseStat];
        description.defenseBoost = defender.boosts[defenseStat];
    }
    
    // unlike all other defense modifiers, Sandstorm 특방 boost gets applied directly
    if (field.weather === "모래바람" && (defender.type1 === "바위" || defender.type2 === "바위") && !hitsPhysical) {
        defense = pokeRound(defense * 3/2);
        description.weather = field.weather;
    }
    
    var dfMods = [];
    if (defAbility === "이상한비늘" && defender.status !== "정상" && hitsPhysical) {
        dfMods.push(0x1800);
        description.defenderAbility = defAbility;
    } else if (defAbility === "플라워기프트" && field.weather.indexOf("쾌청") > -1 && !hitsPhysical) {
        dfMods.push(0x1800);
        description.defenderAbility = defAbility;
        description.weather = field.weather;
    }
    
    if ((defender.item === "심해의비늘" && defender.name === "진주몽" && !hitsPhysical) ||
            (defender.item === "금속파우더" && defender.name === "메타몽") ||
            (defender.item === "마음의물방울" && (defender.name === "라티오스" || defender.name === "라티아스") && !hitsPhysical) ||
            (defender.item === "돌격조끼" && !hitsPhysical) || defender.item === "진화의휘석") {
        dfMods.push(0x1800);
        description.defenderItem = defender.item;
    }
    
    defense = Math.max(1, pokeRound(defense * chainMods(dfMods) / 0x1000));
    
    ////////////////////////////////
    //////////// DAMAGE ////////////
    ////////////////////////////////
    var baseDamage = Math.floor(Math.floor((Math.floor((2 * attacker.level) / 5 + 2) * basePower * attack) / defense) / 50 + 2);
    if (field.format !== "싱글" && move.isSpread) {
        baseDamage = pokeRound(baseDamage * 0xC00 / 0x1000);
    }
    if ((field.weather.indexOf("쾌청") > -1 && move.type === "불꽃") || (field.weather.indexOf("비") > -1 && move.type === "물")) {
        baseDamage = pokeRound(baseDamage * 0x1800 / 0x1000);
        description.weather = field.weather;
    } else if ((field.weather === "쾌청" && move.type === "물") || (field.weather === "비" && move.type === "불꽃") ||
               (field.weather === "난기류" && (defender.type1 === "비행" || defender.type2 === "비행") &&
               typeChart[move.type]["비행"] > 1)) {
        baseDamage = pokeRound(baseDamage * 0x800 / 0x1000);
        description.weather = field.weather;
    }
    if (field.isGravity || (attacker.type1 !== "비행" && attacker.type2 !== "비행" &&
                attacker.item !== "풍선" && attacker.ability !== "부유")) {
        if (field.terrain === "일렉트릭" && move.type === "전기") {
            baseDamage = pokeRound(baseDamage * 0x1800 / 0x1000);
            description.terrain = field.terrain;
        } else if (field.terrain === "그래스" && move.type == "풀") {
            baseDamage = pokeRound(baseDamage * 0x1800 / 0x1000);
            description.terrain = field.terrain;
        }else if (field.terrain === "사이코" && move.type == "에스퍼") {
            baseDamage = pokeRound(baseDamage * 0x1800 / 0x1000);
            description.terrain = field.terrain;
        }
    }
    if (field.isGravity || (defender.type1 !== "비행" && defender.type2 !== "비행" &&
            defender.item !== "풍선" && defender.ability !== "부유")) {
        if (field.terrain === "미스트" && move.type === "드래곤") {
            baseDamage = pokeRound(baseDamage * 0x800 / 0x1000);
            description.terrain = field.terrain;
        }
    }
    if (isCritical) {
        baseDamage = Math.floor(baseDamage * (gen >= 6 ? 1.5 : 2));
        description.isCritical = isCritical;
    }
    // the random factor is applied between the crit mod and the stab mod, so don't apply anything below this until we're inside the loop
    var stabMod = 0x1000;
    if (move.type === attacker.type1 || move.type === attacker.type2) {
        if (attacker.ability === "적응력") {
            stabMod = 0x2000;
            description.attackerAbility = attacker.ability;
        } else {
            stabMod = 0x1800;
        }
    } else if (attacker.ability === "변환자재") {
        stabMod = 0x1800;
        description.attackerAbility = attacker.ability;
    }
    var applyBurn = (attacker.status === "화상" && move.category === "물리" && attacker.ability !== "근성" && !move.ignoresBurn);
    description.isBurned = applyBurn;
    var finalMods = [];
    if (field.isReflect && move.category === "물리" && !isCritical) {
        finalMods.push(field.format !== "싱글" ? 0xA8F : 0x800);
        description.isReflect = true;
    } else if (field.isLightScreen && move.category === "특수" && !isCritical) {
        finalMods.push(field.format !== "싱글" ? 0xA8F : 0x800);
        description.isLightScreen = true;
    }
    if ((defAbility === "멀티스케일" || defAbility == "스펙터가드") && defender.curHP === defender.maxHP) {
        finalMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    if (attacker.ability === "색안경" && typeEffectiveness < 1) {
        finalMods.push(0x2000);
        description.attackerAbility = attacker.ability;
    }
    if (field.isFriendGuard) {
        finalMods.push(0xC00);
        description.isFriendGuard = true;
    }
    if (attacker.ability === "스나이퍼" && isCritical) {
        finalMods.push(0x1800);
        description.attackerAbility = attacker.ability;
    }
    if ((defAbility === "하드록" || defAbility === "필터" || defAbility === "프리즘아머") && typeEffectiveness > 1) {
        finalMods.push(0xC00);
        description.defenderAbility = defAbility;
    }
    if (attacker.item === "달인의띠" && typeEffectiveness > 1) {
        finalMods.push(0x1333);
        description.attackerItem = attacker.item;
    } else if (attacker.item === "생명의구슬") {
        finalMods.push(0x14CC);
        description.attackerItem = attacker.item;
    }
    if (getBerryResistType(defender.item) === move.type && (typeEffectiveness > 1 || move.type === "노말") &&
            attacker.ability !== "긴장감") {
        finalMods.push(0x800);
        description.defenderItem = defender.item;
    }
    if (defAbility === "퍼코트" && hitsPhysical){
        finalMods.push(0x800);
        description.defenderAbility = defAbility;
    }
    var finalMod = chainMods(finalMods);
    
    var damage = [], pbDamage = [];
    var child, childDamage, j;
    if (attacker.ability === "부자유친" && move.hits === 1 && (field.format === "싱글" || !move.isSpread)) {
        child = JSON.parse(JSON.stringify(attacker));
        child.ability = '';
        child.isChild = true;
        if (move.name === '그로우펀치') {
            child.boosts[AT]++;
            child.stats[AT] = getModifiedStat(child.rawStats[AT], child.boosts[AT]);
        }
        childDamage = getDamageResult(child, defender, move, field).damage;
        description.attackerAbility = attacker.ability;
    }
    for (var i = 0; i < 16; i++) {
        damage[i] = Math.floor(baseDamage * (85 + i) / 100);
        damage[i] = pokeRound(damage[i] * stabMod / 0x1000);
        damage[i] = Math.floor(damage[i] * typeEffectiveness);
        if (applyBurn) {
            damage[i] = Math.floor(damage[i] / 2);
        }
        damage[i] = Math.max(1, damage[i]);
        damage[i] = pokeRound(damage[i] * finalMod / 0x1000);
        if (attacker.ability === "부자유친" && move.hits === 1 && (field.format === "싱글" || !move.isSpread)) {
            for (j = 0; j < 16; j++) {
                pbDamage[(16 * i) + j] = damage[i] + childDamage[j];
            }
        }
    }
    // REturn a bit more info if this is a 부자유친 usage.
    if (pbDamage.length) {
        return {
            "damage": pbDamage.sort(numericSort),
            "parentDamage": damage,
            "childDamage": childDamage,
            "description": buildDescription(description)
        };
    }
    return {"damage": pbDamage.length ? pbDamage.sort(numericSort) : damage, "description": buildDescription(description)};
}

function numericSort(a, b) {
    return a - b;
}

function buildDescription(description) {
    var output = "";
    if (description.attackBoost) {
        if (description.attackBoost > 0) {
            output += "+";
        }
        output += description.attackBoost + " ";
    }
    output = appendIfSet(output, description.attackEVs);
    output = appendIfSet(output, description.attackerItem);
    output = appendIfSet(output, description.attackerAbility);
    if (description.isBurned) {
        output += "화상 "; //TODO: Improve readability
    }
    output += description.attackerName + " ";
    if (description.isHelpingHand) {
        output += "도우미 "; //TODO: Improve readability
    }
    output += description.moveName + " ";
    if (description.moveBP && description.moveType) {
        output += "(" + description.moveBP + " BP " + description.moveType + ") ";
    } else if (description.moveBP) {
        output += "(" + description.moveBP + " BP) ";
    } else if (description.moveType) {
        output += "(" + description.moveType + ") ";
    }
    if (description.hits) {
        output += "(" + description.hits + "번 맞음) "; //TODO: Improve readability
    }
    output += "vs. ";
    if (description.defenseBoost) {
        if (description.defenseBoost > 0) {
            output += "+";
        }
        output += description.defenseBoost + " ";
    }
    output = appendIfSet(output, description.HPEVs);
    if (description.defenseEVs) {
        output += " / " + description.defenseEVs + " ";
    }
    output = appendIfSet(output, description.defenderItem);
    output = appendIfSet(output, description.defenderAbility);
    output += description.defenderName;
    if (description.weather) {
        output += " in " + description.weather; //TODO: Improve readability
    } else if (description.terrain) {
        output += " in " + description.terrain + "필드"; //TODO: Improve readability
    }
    if (description.isReflect) {
        output += " 리플렉터에 의한 데미지 감소"; //TODO: Improve readability
    } else if (description.isLightScreen) {
        output += " 빛의장막에 의한 데미지 감소"; //TODO: Improve readability
    }
    if (description.isCritical) {
        output += " 급소에 맞음"; //TODO: Improve readability
    }
    return output;
}

function appendIfSet(str, toAppend) {
    if (toAppend) {
        return str + toAppend + " ";
    }
    return str;
}

function toSmogonStat(stat) {
    return stat === AT ? "공격"
            : stat === DF ? "방어"
            : stat === SA ? "특공"
            : stat === SD ? "특방"
            : stat === SP ? "스핏"
            : "wtf";
}

function chainMods(mods) {
    var M = 0x1000;
    for(var i = 0; i < mods.length; i++) {
        if(mods[i] !== 0x1000) {
            M = ((M * mods[i]) + 0x800) >> 12;
        }
    }
    return M;
}

function getMoveEffectiveness(move, type, isGhostRevealed, isGravity) {
    if (isGhostRevealed && type === "고스트" && (move.type === "노말" || move.type === "격투")) {
        return 1;
    } else if (isGravity && type === "비행" && move.type === "땅") {
        return 1;
    } else if (move.name === "프리즈드라이" && type === "물") {
        return 2;
    } else if (move.name === "플라잉프레스") {
        return typeChart["격투"][type] * typeChart["비행"][type];
    } else {
        return typeChart[move.type][type];
    }
}

function getModifiedStat(stat, mod) {
    return mod > 0 ? Math.floor(stat * (2 + mod) / 2)
            : mod < 0 ? Math.floor(stat * 2 / (2 - mod))
            : stat;
}

function getFinalSpeed(pokemon, weather) {
    var speed = getModifiedStat(pokemon.rawStats[SP], pokemon.boosts[SP]);
    if (pokemon.item === "구애스카프") {
        speed = Math.floor(speed * 1.5);
    } else if (pokemon.item === "교정깁스" || pokemon.item === "검은철구") {
        speed = Math.floor(speed / 2);
    }
    if ((pokemon.ability === "엽록소" && weather.indexOf("쾌청") > -1) ||
            (pokemon.ability === "모래헤치기" && weather === "모래바람") ||
            (pokemon.ability === "쓱쓱" && weather.indexOf("비") > -1)) {
        speed *= 2;
    }
    return speed;
}

function checkAirLock(pokemon, field) {
    if (pokemon.ability === "에어록" || pokemon.ability === "날씨부정") {
        field.clearWeather();
    }
}
function checkForecast(pokemon, weather) {
    if (pokemon.ability === "기분파" && pokemon.name === "캐스퐁") {
        if (weather.indexOf("쾌청") > -1) {
            pokemon.type1 = "불꽃";
        } else if (weather.indexOf("비") > -1) {
            pokemon.type1 = "물";
        } else if (weather === "싸라기눈") {
            pokemon.type1 = "얼음";
        } else {
            pokemon.type1 = "노말";
        }
        pokemon.type2 = "";
    }
}
function checkKlutz(pokemon) {
    if (pokemon.ability === "서투름") {
        pokemon.item = "";
    }
}
function checkIntimidate(source, target) {
    if (source.ability === "괴력집게") {
        if (target.ability === "심술꾸러기" || target.ability === "오기") {
            target.boosts[AT] = Math.min(6, target.boosts[AT] + 1);
        } else if (["클리어바디", "하얀연기", "괴력집게", "메탈프로텍트"].indexOf(target.ability) !== -1) {
            // no effect
        } else if (target.ability === "단순") {
            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 2);
        } else {
            target.boosts[AT] = Math.max(-6, target.boosts[AT] - 1);
        }
    }
}
function checkDownload(source, target) {
    if (source.ability === "다운로드") {
        if (target.stats[SD] <= target.stats[DF]) {
            source.boosts[SA] = Math.min(6, source.boosts[SA] + 1);
        } else {
            source.boosts[AT] = Math.min(6, source.boosts[AT] + 1);
        }
    }
}
function checkInfiltrator(attacker, affectedSide) {
    if (attacker.ability === "틈새포착") {
        affectedSide.isReflect = false;
        affectedSide.isLightScreen = false;
    }
}

function countBoosts(boosts) {
    var sum = 0;
    for (var i = 0; i < STATS.length; i++) {
        if (boosts[STATS[i]] > 0) {
            sum += boosts[STATS[i]];
        }
    }
    return sum;
}

// GameFreak rounds DOWN on .5
function pokeRound(num) {
    return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
}
