function CALCULATE_ALL_MOVES_GSC(p1, p2, field) {
    p1.stats[AT] = Math.min(999, Math.max(1, getModifiedStat(p1.rawStats[AT], p1.boosts[AT])));
    p1.stats[DF] = Math.min(999, Math.max(1, getModifiedStat(p1.rawStats[DF], p1.boosts[DF])));
    p1.stats[SA] = Math.min(999, Math.max(1, getModifiedStat(p1.rawStats[SA], p1.boosts[SA])));
    p1.stats[SD] = Math.min(999, Math.max(1, getModifiedStat(p1.rawStats[SD], p1.boosts[SD])));
    p2.stats[AT] = Math.min(999, Math.max(1, getModifiedStat(p2.rawStats[AT], p2.boosts[AT])));
    p2.stats[DF] = Math.min(999, Math.max(1, getModifiedStat(p2.rawStats[DF], p2.boosts[DF])));
    p2.stats[SA] = Math.min(999, Math.max(1, getModifiedStat(p2.rawStats[SA], p2.boosts[SA])));
    p2.stats[SD] = Math.min(999, Math.max(1, getModifiedStat(p2.rawStats[SD], p2.boosts[SD])));
    var side1 = field.getSide(1);
    var side2 = field.getSide(0);
    var results = [[],[]];
    for (var i = 0; i < 4; i++) {
        results[0][i] = CALCULATE_DAMAGE_GSC(p1, p2, p1.moves[i], side1);
        results[1][i] = CALCULATE_DAMAGE_GSC(p2, p1, p2.moves[i], side2);
    }
    return results;
}

function CALCULATE_DAMAGE_GSC(attacker, defender, move, field) {
    var description = {
        "attackerName": attacker.name,
        "moveName": move.name,
        "defenderName": defender.name
    };
    
    if (move.bp === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    var typeEffect1 = getMoveEffectiveness(move, defender.type1, field.isForesight);
    var typeEffect2 = defender.type2 ? getMoveEffectiveness(move, defender.type2, field.isForesight) : 1;
    var typeEffectiveness = typeEffect1 * typeEffect2;

    if (typeEffectiveness === 0) {
        return {"damage":[0], "description":buildDescription(description)};
    }
    
    var lv = attacker.level;
    if (move.name === "지구던지기" || move.name === "나이트헤드") {
        return {"damage":[lv], "description":buildDescription(description)};
    }
    
    if (move.hits > 1) {
        description.hits = move.hits;
    }
    
    // 바둥바둥 and 기사회생 are variable BP and never crit
    if (move.name === "바둥바둥" || move.name === "기사회생") {
        move.isCrit = false;
        var p = Math.floor(48 * attacker.curHP / attacker.maxHP);
        move.bp = p <= 1 ? 200 : p <= 4 ? 150 : p <= 9 ? 100 : p <= 16 ? 80 : p <= 32 ? 40 : 20;
        description.moveBP = move.bp;
    }
    
    var isPhysical = typeChart[move.type].category === "물리";
    var attackStat = isPhysical ? AT : SA;
    var defenseStat = isPhysical ? DF : SD;
    var at = attacker.stats[attackStat];
    var df = defender.stats[defenseStat];
    
    // ignore Reflect, Light Screen, stat stages, and burns if attack is a crit and attacker does not have stat stage advantage
    var ignoreMods = move.isCrit && attacker.boosts[attackStat] <= defender.boosts[defenseStat];
    
    if (ignoreMods) {
        at = attacker.rawStats[attackStat];
        df = defender.rawStats[defenseStat];
    } else {
        if (attacker.boosts[attackStat] !== 0) {
            description.attackBoost = attacker.boosts[attackStat];
        }
        if (defender.boosts[defenseStat] !== 0) {
            description.defenseBoost = defender.boosts[defenseStat];
        }
        if (isPhysical && attacker.status === "화상") {
            at = Math.floor(at / 2);
            description.isBurned = true;
        }
    }
    
    if (move.name === "대폭발" || move.name === "자폭") {
        df = Math.floor(df / 2);
    }
    
    if (!ignoreMods) {
        if (isPhysical && field.isReflect) {
            df *= 2;
            description.isReflect = true;
        } else if (!isPhysical && field.isLightScreen) {
            df *= 2;
            description.isLightScreen = true;
        }
    }
    
    if ((attacker.name === "피카츄" && attacker.item === "전기구슬" && !isPhysical) ||
            ((attacker.name === "탕구리" || attacker.name === "텅구리") && attacker.item === "굵은뼈" && isPhysical)) {
        at *= 2;
        description.attackerItem = attacker.item;
    }
    
    if (at > 255 || df > 255) {
        at = Math.floor(at / 4) % 256;
        df = Math.floor(df / 4) % 256;
    }
    
    if (defender.name === "메타몽" && defender.item === "금속파우더") {
        df = Math.floor(df * 1.5);
        description.defenderItem = defender.item;
    }
    
    var baseDamage = Math.floor(Math.floor(Math.floor(2 * lv / 5 + 2) * Math.max(1, at) * move.bp / Math.max(1, df)) / 50);
    
    if (move.isCrit) {
        baseDamage *= 2;
        description.isCritical = true;
    }
    
    if (getItemBoostType(attacker.item) === move.type) {
        baseDamage = Math.floor(baseDamage * 1.1);
        description.attackerItem = attacker.item;
    }
    
    baseDamage = Math.min(997, baseDamage) + 2;
    
    if ((field.weather === "쾌청" && move.type === "불꽃") || (field.weather === "비" && move.type === "물")) {
        baseDamage = Math.floor(baseDamage * 1.5);
        description.weather = field.weather;
    } else if ((field.weather === "쾌청" && move.type === "물") || (field.weather === "비" && (move.type === "불꽃" || move.name === "솔라빔"))) {
        baseDamage = Math.floor(baseDamage / 2);
        description.weather = field.weather;
    }
    
    if (move.type === attacker.type1 || move.type === attacker.type2) {
        baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    baseDamage = Math.floor(baseDamage * typeEffectiveness);
    
    // 바둥바둥 and 기사회생 don't use random factor
    if (move.name === "바둥바둥" || move.name === "기사회생") {
        return {"damage":[baseDamage], "description":buildDescription(description)};
    }
    
    var damage = [];
    for (var i = 217; i <= 255; i++) {
        damage[i-217] = Math.floor(baseDamage * i / 255);
    }
    return {"damage":damage, "description":buildDescription(description)};
}
