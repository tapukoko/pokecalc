function getKOChanceText(damage, move, defender, field, isBadDreams) {
    if (isNaN(damage[0])) {
       return '뭔가 잘못됨; 제보해주세여';
    }
    if (damage[damage.length-1] === 0) {
        if (field.weather === "아주 강한 햇살" && move.type === "물") {
            return '물타입 기술이 아주 강한 햇살에 의해 증발'; //TODO: Replace with ORAS original string
        } else if (field.weather === "강한 비" && move.type === "불꽃") {
            return '불꽃타입 기술이 강한 비에 의해 꺼짐'; //TODO: Replace with ORAS original string
        }
        return '다음엔 뿔을 노려!';
    }
    var hasSitrus = defender.item === '자뭉열매';
    if ((damage.length !== 256 || !hasSitrus) && damage[0] >= defender.curHP) {
        return '확정 1타';
    } else if (damage.length === 256 && hasSitrus && damage[0] >= defender.curHP + Math.floor(defender.maxHP / 4)) {
        return '확정 1타';
    }

    var hazards = 0;
    var hazardText = [];
    if (field.isSR && defender.ability !== '매직가드') {
        var effectiveness = typeChart['바위'][defender.type1] * (defender.type2 ? typeChart['바위'][defender.type2] : 1);
        hazards += Math.floor(effectiveness * defender.maxHP / 8);
        hazardText.push('스텔스록');
    }
    if ([defender.type1, defender.type2].indexOf('비행') === -1 &&
            ['매직가드', '부유'].indexOf(defender.ability) === -1 && defender.item !== '풍선') {
        if (field.spikes === 1) {
            hazards += Math.floor(defender.maxHP / 8);
            if (gen === 2) {
                hazardText.push('압정');
            } else {
                hazardText.push('압정 1중첩');
            }
        } else if (field.spikes === 2) {
            hazards += Math.floor(defender.maxHP / 6);
            hazardText.push('압정 2중첩');
        } else if (field.spikes === 3) {
            hazards += Math.floor(defender.maxHP / 4);
            hazardText.push('압정 3중첩');
        }
    }
    if (isNaN(hazards)) {
        hazards = 0;
    }

    var eot = 0;
    var eotText = [];
    if (field.weather === '쾌청') {
        if (defender.ability === '건조피부' || defender.ability === '선파워') {
            eot -= Math.floor(defender.maxHP / 8);
            eotText.push(defender.ability + ' 데미지');
        }
    } else if (field.weather === '비') {
        if (defender.ability === '건조피부') {
            eot += Math.floor(defender.maxHP / 8);
            eotText.push('건조피부에 의한 회복');
        } else if (defender.ability === '젖은접시') {
            eot += Math.floor(defender.maxHP / 16);
            eotText.push('젖은접시에 의한 회복');
        }
    } else if (field.weather === '모래바람') {
        if (['바위', '땅', '강철'].indexOf(defender.type1) === -1 &&
                ['바위', '땅', '강철'].indexOf(defender.type2) === -1 &&
                ['매직가드', '방진', '모래의힘', '모래헤치기', '모래숨기'].indexOf(defender.ability) === -1 &&
                defender.item !== '방진고글') {
            eot -= Math.floor(defender.maxHP / 16);
            eotText.push('모래바람에 의한 데미지');
        }
    } else if (field.weather === '싸라기눈') {
        if (defender.ability === '아이스바디') {
            eot += Math.floor(defender.maxHP / 16);
            eotText.push('아이스바디에 의한 회복');
        } else if (defender.type1 !== '얼음' && defender.type2 !== '얼음' &&
                ['매직가드', '방진', '눈숨기'].indexOf(defender.ability) === -1 &&
                defender.item !== '방진고글') {
            eot -= Math.floor(defender.maxHP / 16);
            eotText.push('싸라기눈에 의한 데미지');
        }
    }
    if (defender.item === '먹다남은음식') {
        eot += Math.floor(defender.maxHP / 16);
        eotText.push('먹다남은음식에 의한 회복');
    } else if (defender.item === '검은진흙') {
        if (defender.type1 === '독' || defender.type2 === '독') {
            eot += Math.floor(defender.maxHP / 16);
            eotText.push('검은진흙에 의한 회복');
        } else if (defender.ability !== '매직가드' && defender.ability !== '서투름') {
            eot -= Math.floor(defender.maxHP / 8);
            eotText.push('검은진흙에 의한 데미지');
        }
    }
    if (field.terrain === "그래스") {
        if (field.isGravity || (defender.type1 !== "비행" && defender.type2 !== "비행" &&
                defender.item !== "풍선" && defender.ability !== "부유")) {
            eot += Math.floor(defender.maxHP / 16);
            eotText.push('그래스필드에 의한 회복');
        }
    }
    var toxicCounter = 0;
    if (defender.status === '독') {
        if (defender.ability === '포이즌힐') {
            eot += Math.floor(defender.maxHP / 8);
            eotText.push('포이즌힐');
        } else if (defender.ability !== '매직가드') {
            eot -= Math.floor(defender.maxHP / 8);
            eotText.push('독 데미지');
        }
    } else if (defender.status === '맹독') {
        if (defender.ability === '포이즌힐') {
            eot += Math.floor(defender.maxHP / 8);
            eotText.push('포이즌힐');
        } else if (defender.ability !== '매직가드') {
            eotText.push('맹독 데미지');
            toxicCounter = defender.toxicCounter;
        }
    } else if (defender.status === '화상') {
        if (defender.ability === '내열') {
            eot -= Math.floor(defender.maxHP / 16);
            eotText.push('감소된 화상 데미지');
        } else if (defender.ability !== '매직가드') {
            eot -= Math.floor(defender.maxHP / 8);
            eotText.push('화상 데미지');
        }
    } else if (defender.status === '잠듦' && isBadDreams && defender.ability !== '매직가드') {
        eot -= Math.floor(defender.maxHP / 8);
        eotText.push('나이트메어');
    }

    // multi-hit moves have too many possibilities for brute-forcing to work, so reduce it to an approximate distribution
    var qualifier = '';
    if (move.hits > 1) {
        qualifier = '대략 ';
        damage = squashMultihit(damage, move.hits);
    }

    var multihit = damage.length === 256 || move.hits > 1;
    var c = getKOChance(damage, multihit, defender.curHP - hazards, 0, 1, defender.maxHP, toxicCounter, hasSitrus);
    var afterText = hazardText.length > 0 ? ' after ' + serializeText(hazardText) : '';
    if (c === 1) {
        return '확정 1타' + afterText;
    } else if (c > 0) {
        return qualifier + Math.round(c * 1000) / 10 + '% 확률로 1타' + afterText;
    }

    if (hasSitrus && move.name !== '탁쳐서떨구기') {
        eotText.push('자뭉열매에 의한 회복');
    }
    afterText = hazardText.length > 0 || eotText.length > 0 ? ' after ' + serializeText(hazardText.concat(eotText)) : '';
    var i;
    for (i = 2; i <= 4; i++) {
        c = getKOChance(damage, multihit, defender.curHP - hazards, eot, i, defender.maxHP, toxicCounter, hasSitrus);
        if (c === 1) {
            return '확정 ' + i + '타' + afterText;
        } else if (c > 0) {
            var pct = Math.round(c * 1000) / 10;
            var chance = pct ? qualifier + pct + '%' : '매우 적은';
            return afterText + chance + ' 확률로 ' + i + '타';
        }
    }

    for (i = 5; i <= 9; i++) {
        if (predictTotal(damage[0], eot, i, toxicCounter, defender.curHP - hazards, defender.maxHP, hasSitrus) >= defender.curHP - hazards) {
            return '확정 ' + i + '타' + afterText;
        } else if (predictTotal(damage[damage.length-1], eot, i, toxicCounter, defender.curHP - hazards, defender.maxHP, hasSitrus) >= defender.curHP - hazards) {
            return '난수 ' + i + '타' + afterText; //possible
        }
    }

    return '거의 최악의 기술일 수 있음';
}

function getKOChance(damage, multihit, hp, eot, hits, maxHP, toxicCounter, hasSitrus) {
    var n = damage.length;
    var minDamage = damage[0];
    var maxDamage = damage[n-1];
    var i;
    if (hits === 1) {
        if ((!multihit || !hasSitrus) && maxDamage < hp) {
            return 0;
        } else if (multihit && hasSitrus && maxDamage < hp + Math.floor(maxHP / 4)) {
            return 0;
        }
        for (i = 0; i < n; i++) {
            if ((!multihit || !hasSitrus) && damage[i] >= hp) {
                return (n-i)/n;
            } else if (multihit && hasSitrus && damage[i] >= hp + Math.floor(maxHP / 4)) {
                return (n-i)/n;
            }
        }
    }
    /*
    if (predictTotal(maxDamage, eot, hits, toxicCounter, hp, maxHP, hasSitrus) < hp) {
        return 0;
    } else if (predictTotal(minDamage, eot, hits, toxicCounter, hp, maxHP, hasSitrus) >= hp) {
        return 1;
    }*/
    var toxicDamage = 0;
    if (toxicCounter > 0) {
        toxicDamage = Math.floor(toxicCounter * maxHP / 16);
        toxicCounter++;
    }
    var sum = 0;
    var lastC = 0;
    for (i = 0; i < n; i++) {
        if ((hp - damage[i] <= maxHP / 2) && hasSitrus) {
            hp += Math.floor(maxHP / 4);
            hasSitrus = false;
        }
        var c;
        if (i === 0 || damage[i] !== damage[i-1]) {
            c = getKOChance(damage, multihit, hp - damage[i] + eot - toxicDamage, eot, hits - 1, maxHP, toxicCounter, hasSitrus);
        } else {
            c = lastC;
        }
        if (c === 1) {
            sum += (n-i);
            break;
        } else {
            sum += c;
        }
        lastC = c;
    }
    return sum/n;
}

function predictTotal(damage, eot, hits, toxicCounter, hp, maxHP, hasSitrus) {
    var total = 0;
    for (var i = 0; i < hits; i++) {
        total += damage;
        if ((hp - total <= maxHP / 2) && hasSitrus) {
            total -= Math.floor(maxHP / 4);
            hasSitrus = false;
        }
        if (i < hits - 1) {
            total -= eot;
            if (toxicCounter > 0) {
                total += Math.floor((toxicCounter + i) * maxHP / 16);
            }
        }
    }
    return total;
}

function squashMultihit(d, hits) {
    if (d.length === 1) {
        return [d[0] * hits];
    } else if (gen === 1) {
        var r = [];
        for (var i = 0; i < d.length; i++) {
            r[i] = d[i] * hits;
        }
        return r;
    } else if (d.length === 16) {
        switch (hits) {
            case 2:
                return [
                    2*d[0], d[2]+d[3], d[4]+d[4], d[4]+d[5],
                    d[5]+d[6], d[6]+d[6], d[6]+d[7], d[7]+d[7],
                    d[8]+d[8], d[8]+d[9], d[9]+d[9], d[9]+d[10],
                    d[10]+d[11], d[11]+d[11], d[12]+d[13], 2*d[15]
                ];
            case 3:
                return [
                    3*d[0], d[3]+d[3]+d[4], d[4]+d[4]+d[5], d[5]+d[5]+d[6],
                    d[5]+d[6]+d[6], d[6]+d[6]+d[7], d[6]+d[7]+d[7], d[7]+d[7]+d[8],
                    d[7]+d[8]+d[8], d[8]+d[8]+d[9], d[8]+d[9]+d[9], d[9]+d[9]+d[10],
                    d[9]+d[10]+d[10], d[10]+d[11]+d[11], d[11]+d[12]+d[12], 3*d[15]
                ];
            case 4:
                return [
                    4*d[0], 4*d[4], d[4]+d[5]+d[5]+d[5], d[5]+d[5]+d[6]+d[6],
                    4*d[6], d[6]+d[6]+d[7]+d[7], 4*d[7], d[7]+d[7]+d[7]+d[8],
                    d[7]+d[8]+d[8]+d[8], 4*d[8], d[8]+d[8]+d[9]+d[9], 4*d[9],
                    d[9]+d[9]+d[10]+d[10], d[10]+d[10]+d[10]+d[11], 4*d[11], 4*d[15]
                ];
            case 5:
                return [
                    5*d[0], d[4]+d[4]+d[4]+d[5]+d[5], d[5]+d[5]+d[5]+d[5]+d[6], d[5]+d[6]+d[6]+d[6]+d[6],
                    d[6]+d[6]+d[6]+d[6]+d[7], d[6]+d[6]+d[7]+d[7]+d[7], 5*d[7], d[7]+d[7]+d[7]+d[8]+d[8],
                    d[7]+d[7]+d[8]+d[8]+d[8], 5*d[8], d[8]+d[8]+d[8]+d[9]+d[9], d[8]+d[9]+d[9]+d[9]+d[9],
                    d[9]+d[9]+d[9]+d[9]+d[10], d[9]+d[10]+d[10]+d[10]+d[10], d[10]+d[10]+d[11]+d[11]+d[11], 5*d[15]
                ];
            default:
                console.log("예기치 못한 공격: " + hits);
                return d;
        }
    } else if (d.length === 39) {
        switch (hits) {
            case 2:
                return [
                    2*d[0], 2*d[7], 2*d[10], 2*d[12],
                    2*d[14], d[15]+d[16], 2*d[17], d[18]+d[19],
                    d[19]+d[20], 2*d[21], d[22]+d[23], 2*d[24],
                    2*d[26], 2*d[28], 2*d[31], 2*d[38]
                ];
            case 3:
                return [
                    3*d[0], 3*d[9], 3*d[12], 3*d[13],
                    3*d[15], 3*d[16], 3*d[17], 3*d[18],
                    3*d[20], 3*d[21], 3*d[22], 3*d[23],
                    3*d[25], 3*d[26], 3*d[29], 3*d[38]
                ];
            case 4:
                return [
                    4*d[0], 2*d[10]+2*d[11], 4*d[13], 4*d[14],
                    2*d[15]+2*d[16], 2*d[16]+2*d[17], 2*d[17]+2*d[18], 2*d[18]+2*d[19],
                    2*d[19]+2*d[20], 2*d[20]+2*d[21], 2*d[21]+2*d[22], 2*d[22]+2*d[23],
                    4*d[24], 4*d[25], 2*d[27]+2*d[28], 4*d[38]
                ];
            case 5:
                return [
                    5*d[0], 5*d[11], 5*d[13], 5*d[15],
                    5*d[16], 5*d[17], 5*d[18], 5*d[19],
                    5*d[19], 5*d[20], 5*d[21], 5*d[22],
                    5*d[23], 5*d[25], 5*d[27], 5*d[38]
                ];
            default:
                console.log("예기치 못한 공격: " + hits);
                return d;
        }
    } else {
        console.log("예기치 못한 데미지: " + d.length);
        return d;
    }
}

function serializeText(arr) {
    if (arr.length === 0) {
        return '';
    } else if (arr.length === 1) {
        return arr[0];
    } else if (arr.length === 2) {
        return arr[0] + " and " + arr[1];
    } else {
        var text = '';
        for (var i = 0; i < arr.length-1; i++) {
            text += arr[i] + ', ';
        }
        return text + 'and ' + arr[arr.length-1];
    }
}
