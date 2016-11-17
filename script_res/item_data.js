var ITEMS_GSC = [
    '나무열매',
    '나무열매쥬스',
    '검은띠',
    '검은안경',
    '목탄',
    '용의이빨',
    '황금 열매',
    '딱딱한돌',
    '왕의징표석',
    '먹다남은음식',
    '전기구슬',
    '자석',
    '금속코트',
    '금속파우더',
    '기적의씨',
    '신비의물방울',
    '녹지않는얼음',
    '핑크리본',
    '독바늘',
    '물방울리본',
    '예리한부리',
    '은빛가루',
    '부드러운모래',
    '저주의부적',
    '대파',
    '굵은뼈',
    '휘어진스푼'
];

var ITEMS_ADV = ITEMS_GSC.concat([
    '구애머리띠',
    '심해의비늘',
    '심해의이빨',
    '오랭열매',
    '실크스카프',
    '자뭉열매',
    '마음의물방울'
]);

ITEMS_ADV.splice(ITEMS_ADV.indexOf('나무열매'), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf('황금 열매'), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf('핑크리본'), 1);
ITEMS_ADV.splice(ITEMS_ADV.indexOf('물방울리본'), 1);

var ITEMS_DPP = ITEMS_ADV.concat([
    '금강옥',
    '규살열매',
    '바리비열매',
    '루베열매',
    '검은진흙',
    '루미열매',
    '유루열매',
    '카리열매',
    '구애스카프',
    '구애안경',
    '로플열매',
    '바코열매',
    '마코열매',
    '애슈열매',
    '용의플레이트',
    '공포플레이트',
    '두리열매',
    '대지플레이트',
    '의문열매',
    '달인의띠',
    '주먹플레이트',
    '화염구슬',
    '불구슬플레이트',
    '용아열매',
    '백금옥',
    '하반열매',
    '고드름플레이트',
    '비단벌레플레이트',
    '검은철구',
    '강철플레이트',
    '자보열매',
    '수불열매',
    '으름열매',
    '느림보꼬리',
    '랑사열매',
    '과사열매',
    '치리열매',
    '생명의구슬',
    '리샘열매',
    '백옥',
    '교정깁스',
    '초록플레이트',
    '미클열매',
    '이상한플레이트',
    '힘의머리띠',
    '오카열매',
    '괴상한향로',
    '꼬시개열매',
    '야파열매',
    '야타비열매',
    '복분열매',
    '예리한이빨',
    '린드열매',
    '암석향로',
    '꽃향로',
    '애터열매',
    '캄라열매',
    '바닷물향로',
    '슈캐열매',
    '푸른하늘플레이트',
    '물방울플레이트',
    '원령플레이트',
    '스타열매',
    '암석플레이트',
    '리체열매',
    '맹독구슬',
    '맹독플레이트',
    '초나열매',
    '슈박열매',
    '잔물결향로',
    '박식안경',
    '플카열매',
    '우뢰플레이트'
]);

var ITEMS_BW = ITEMS_DPP.concat([
    '풍선',
    '벌레주얼',
    '악주얼',
    '드래곤주얼',
    '전기주얼',
    '진화의휘석',
    '격투주얼',
    '불꽃주얼',
    '비행주얼',
    '고스트주얼',
    '풀주얼',
    '땅주얼',
    '얼음주얼',
    '노말주얼',
    '독주얼',
    '에스퍼주얼',
    '바위주얼',
    '강철주얼',
    '물주얼'
]);

var ITEMS_XY = ITEMS_BW.concat([
    '돌격조끼',
    '악키열매',
    '타라프열매',
    '정령플레이트',
    '로셀열매',
    '방진고글'
]);

ITEMS_XY.splice(ITEMS_XY.indexOf('검은안경'), 1, '검은안경');
ITEMS_XY.splice(ITEMS_XY.indexOf('심해의비늘'), 1, '심해의비늘');
ITEMS_XY.splice(ITEMS_XY.indexOf('심해의이빨'), 1, '심해의이빨');
ITEMS_XY.splice(ITEMS_XY.indexOf('녹지않는얼음'), 1, '녹지않는얼음');
ITEMS_XY.splice(ITEMS_XY.indexOf('은빛가루'), 1, '은빛가루');
ITEMS_XY.splice(ITEMS_XY.indexOf('휘어진스푼'), 1, '휘어진스푼');
ITEMS_XY.splice(ITEMS_XY.indexOf('벌레주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('악주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('드래곤주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('전기주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('격투주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('불꽃주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('비행주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('고스트주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('풀주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('땅주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('얼음주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('독주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('에스퍼주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('바위주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('강철주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('물주얼'), 1);
ITEMS_XY.splice(ITEMS_XY.indexOf('마음의물방울'), 1);


var ITEMS_SM = ITEMS_XY.concat([
    
]);

function getItemBoostType(item) {
    switch (item) {
        case '용의플레이트':
        case '용의이빨':
            return '드래곤';
        case '공포플레이트':
        case '검은안경':
        case '검은안경':
            return '악';
        case '대지플레이트':
        case '부드러운모래':
            return '땅';
        case '주먹플레이트':
        case '검은띠':
            return '격투';
        case '불구슬플레이트':
        case '목탄':
            return '불꽃';
        case '고드름플레이트':
        case '녹지않는얼음':
        case '녹지않는얼음':
            return '얼음';
        case '비단벌레플레이트':
        case '은빛가루':
        case '은빛가루':
            return '벌레';
        case '강철플레이트':
        case '금속코트':
            return '강철';
        case '초록플레이트':
        case '꽃향로':
        case '기적의씨':
            return '풀';
        case '이상한플레이트':
        case '괴상한향로':
        case '휘어진스푼':
        case '휘어진스푼':
            return '에스퍼';
        case '정령플레이트':
            return '페어리';
        case '푸른하늘플레이트':
        case '예리한부리':
            return '비행';
        case '물방울플레이트':
        case '바닷물향로':
        case '잔물결향로':
        case '신비의물방울':
            return '물';
        case '원령플레이트':
        case '저주의부적':
            return '고스트';
        case '암석플레이트':
        case '암석향로':
        case '딱딱한돌':
            return '바위';
        case '맹독플레이트':
        case '독바늘':
            return '독';
        case '우뢰플레이트':
        case '자석':
            return '전기';
        case '실크스카프':
        case '핑크리본':
        case '물방울리본':
            return '노말';
        default:
            return '';
    }
}

function getBerryResistType(berry) {
    switch (berry) {
        case '카리열매':
            return '노말';
        case '오카열매':
            return '불꽃';
        case '꼬시개열매':
            return '물';
        case '초나열매':
            return '전기';
        case '린드열매':
            return '풀';
        case '플카열매':
            return '얼음';
        case '로플열매':
            return '격투';
        case '으름열매':
            return '독';
        case '슈캐열매':
            return '땅';
        case '바코열매':
            return '비행';
        case '야파열매':
            return '에스퍼';
        case '리체열매':
            return '벌레';
        case '루미열매':
            return '바위';
        case '수불열매':
            return '고스트';
        case '하반열매':
            return '드래곤';
        case '마코열매':
            return '악';
        case '바리비열매':
            return '강철';
        case '로셀열매':
            return '페어리';
        default:
            return '';
    }
}

function getFlingPower(item) {
    return item === '검은철구' ? 130
        : item === '딱딱한돌' ? 100
        : item.indexOf('플레이트') !== -1 || ['심해의이빨','굵은뼈'].indexOf(item) !== -1 ? 90
        : ['돌격조끼','약점보험'].indexOf(item) !== -1 ? 80
        : ['독바늘','용의이빨'].indexOf(item) !== -1 ? 70
        : ['금강옥','백옥','교정깁스','대파'].indexOf(item) !== -1 ? 60
        : item === '예리한부리' ? 50
        : item === '진화의휘석' ? 40
        : ['검은띠','검은진흙','검은안경','목탄','심해의비늘','화염구슬',"왕의징표석",
            '생명의구슬','전기구슬','자석','금속코트','기적의씨','신비의물방울','녹지않는얼음',
            '예리한이빨','마음의물방울','저주의부적','맹독구슬','휘어진스푼'].indexOf(item) !== -1 ? 30
        : 10;
}

function getNaturalGift(item) {
    var gift = {
        '규살열매' : {'t':'땅','p':100},
        '바리비열매' : {'t':'강철','p':80},
        '루베열매' : {'t':'전기','p':100},
        '루미열매' : {'t':'바위','p':80},
        '유루열매' : {'t':'물','p':80},
        '카리열매' : {'t':'노말','p':80},
        '로플열매' : {'t':'격투','p':80},
        '바코열매' : {'t':'비행','p':80},
        '마코열매' : {'t':'악','p':80},
        '애슈열매' : {'t':'고스트','p':100},
        '두리열매' : {'t':'물','p':100},
        '의문열매' : {'t':'벌레','p':100},
        '용아열매' : {'t':'얼음','p':100},
        '하반열매' : {'t':'드래곤','p':80},
        '자보열매' : {'t':'드래곤','p':100},
        '수불열매' : {'t':'고스트','p':80},
        '으름열매' : {'t':'독','p':80},
        '악키열매' : {'t':'페어리','p':100},
        '랑사열매' : {'t':'비행','p':100},
        '과사열매' : {'t':'격투','p':80},
        '치리열매' : {'t':'풀','p':100},
        '리샘열매' : {'t':'비행','p':80},
        '타라프열매' : {'t':'악','p':100},
        '미클열매' : {'t':'바위','p':100},
        '오카열매' : {'t':'불꽃','p':80},
        '오랭열매' : {'t':'독','p':80},
        '꼬시개열매' : {'t':'물','p':80},
        '야파열매' : {'t':'에스퍼','p':80},
        '야타비열매' : {'t':'독','p':100},
        '복분열매' : {'t':'풀','p':80},
        '린드열매' : {'t':'풀','p':80},
        '로셀열매' : {'t':'페어리','p':80},
        '애터열매' : {'t':'악','p':100},
        '캄라열매' : {'t':'격투','p':100},
        '슈캐열매' : {'t':'땅','p':80},
        '자뭉열매' : {'t':'에스퍼','p':80},
        '스타열매' : {'t':'에스퍼','p':100},
        '리체열매' : {'t':'벌레','p':80},
        '초나열매' : {'t':'전기','p':80},
        '슈박열매' : {'t':'불꽃','p':100},
        '플카열매' : {'t':'얼음','p':80}
    }[item];
    if (gift) {
        if (gen < 6) {
            gift.p -= 20;
        }
        return gift;
    }
    return {'t':'노말','p':1};


}
