var MOVES_RBY = {
    '(기술 없음)': {
        bp: 0,
        type: '노말',
        category: '물리'
    },
    '용해액': {
        bp: 40,
        type: '독'
    },
    '조이기': {
        bp: 15,
        type: '노말'
    },
    '눈보라': {
        bp: 120,
        type: '얼음',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '누르기': {
        bp: 85,
        type: '노말',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '거품광선': {
        bp: 65,
        type: '물'
    },
    '껍질끼우기': {
        bp: 35,
        type: '물'
    },
    '찝게햄머': {
        bp: 90,
        type: '물',
        category: '물리',
        makesContact: true,
        alwaysCrit: true
    },
    '구멍파기': {
        bp: 100,
        type: '땅'
    },
    '두번치기': {
        bp: 30,
        type: '격투',
        category: '물리',
        makesContact: true,
        isTwoHit: true
    },
    '이판사판태클': {
        bp: 100,
        type: '노말',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '회전부리': {
        bp: 80,
        type: '비행',
        category: '물리',
        makesContact: true
    },
    '지진': {
        bp: 100,
        type: '땅',
        category: '물리',
        isSpread: true
    },
    '대폭발': {
        bp: 170,
        type: '노말',
        category: '물리',
        isSpread: true
    },
    '불대문자': {
        bp: 120,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true
    },
    '불꽃펀치': {
        bp: 75,
        type: '불꽃',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    '회오리불꽃': {
        bp: 15,
        type: '불꽃'
    },
    '화염방사': {
        bp: 95,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true
    },
    '무릎차기': {
        bp: 85,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '하이드로펌프': {
        bp: 120,
        type: '물',
        category: '특수'
    },
    '파괴광선': {
        bp: 150,
        type: '노말',
        category: '특수'
    },
    '냉동빔': {
        bp: 95,
        type: '얼음',
        category: '특수',
        hasSecondaryEffect: true
    },
    '냉동펀치': {
        bp: 75,
        type: '얼음',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    '메가드레인': {
        bp: 40,
        type: '풀'
    },
    '나이트헤드': {
        bp: 100,
        type: '고스트',
        category: '특수'
    },
    '바늘미사일': {
        bp: 14,
        type: '벌레',
        category: '물리',
        isMultiHit: true
    },
    '사이코키네시스': {
        bp: 90,
        type: '에스퍼',
        category: '특수',
        hasSecondaryEffect: true
    },
    '전광석화': {
        bp: 40,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '잎날가르기': {
        bp: 55,
        type: '풀',
        category: '특수',
        alwaysCrit: true
    },
    '스톤샤워': {
        bp: 75,
        type: '바위',
        category: '물리',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '지구던지기': {
        bp: 100,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '자폭': {
        bp: 130,
        type: '노말',
        category: '물리',
        isSpread: true
    },
    '불새': {
        bp: 140,
        type: '비행',
        category: '물리',
        hasSecondaryEffect: true
    },
    '베어가르기': {
        bp: 70,
        type: '노말',
        alwaysCrit: true
    },
    '오물공격': {
        bp: 65,
        type: '독'
    },
    '지옥의바퀴': {
        bp: 80,
        type: '격투'
    },
    '파도타기': {
        bp: 95,
        type: '물',
        category: '특수',
        isSpread: true
    },
    '몸통박치기': {
        bp: 35,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '번개': {
        bp: 120,
        type: '전기',
        category: '특수',
        hasSecondaryEffect: true
    },
    '번개펀치': {
        bp: 75,
        type: '전기',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    '10만볼트': {
        bp: 95,
        type: '전기',
        category: '특수',
        hasSecondaryEffect: true
    },
    '더블니들': {
        bp: 25,
        type: '벌레',
        isTwoHit: true
    },
    '김밥말이': {
        bp: 15,
        type: '노말'
    }
};

var MOVES_GSC = $.extend(true, {}, MOVES_RBY, {
    '에어로블라스트': {
        bp: 100,
        type: '비행',
        category: '특수'
    },
    '원시의힘': {
        bp: 60,
        type: '바위',
        category: '특수',
        hasSecondaryEffect: true
    },
    '물기': {
        bp: 60,
        type: '악',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    '찝게햄머': { alwaysCrit: false },
    '크로스촙': {
        bp: 100,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '깨물어부수기': {
        bp: 80,
        type: '악',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    '이판사판태클': { bp: 120 },
    '폭발펀치': {
        bp: 100,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    '대폭발': { bp: 250 },
    '신속': {
        bp: 80,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '속여때리기': {
        bp: 60,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '바둥바둥': {
        bp: 1,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '화염자동차': {
        bp: 60,
        type: '불꽃',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '화풀이': {
        bp: 102,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '기가드레인': {
        bp: 60,
        type: '풀',
        category: '특수'
    },
    '박치기': {
        bp: 70,
        type: '노말',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '잠재파워-벌레': {
        bp: 70,
        type: '벌레',
        category: '특수'
    },
    '잠재파워-악': {
        bp: 70,
        type: '악',
        category: '특수'
    },
    '잠재파워-드래곤': {
        bp: 70,
        type: '드래곤',
        category: '특수'
    },
    '잠재파워-전기': {
        bp: 70,
        type: '전기',
        category: '특수'
    },
    '잠재파워-격투': {
        bp: 70,
        type: '격투',
        category: '특수'
    },
    '잠재파워-불': {
        bp: 70,
        type: '불꽃',
        category: '특수'
    },
    '잠재파워-비행': {
        bp: 70,
        type: '비행',
        category: '특수'
    },
    '잠재파워-고스트': {
        bp: 70,
        type: '고스트',
        category: '특수'
    },
    '잠재파워-풀': {
        bp: 70,
        type: '풀',
        category: '특수'
    },
    '잠재파워-땅': {
        bp: 70,
        type: '땅',
        category: '특수'
    },
    '잠재파워-얼음': {
        bp: 70,
        type: '얼음',
        category: '특수'
    },
    '잠재파워-독': {
        bp: 70,
        type: '독',
        category: '특수'
    },
    '잠재파워-에스퍼': {
        bp: 70,
        type: '에스퍼',
        category: '특수'
    },
    '잠재파워-바위': {
        bp: 70,
        type: '바위',
        category: '특수'
    },
    '잠재파워-강철': {
        bp: 70,
        type: '강철',
        category: '특수'
    },
    '잠재파워-물': {
        bp: 70,
        type: '물',
        category: '특수'
    },
    '얼다바람': {
        bp: 55,
        type: '얼음',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '아이언테일': {
        bp: 100,
        type: '강철',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '마하펀치': {
        bp: 40,
        type: '격투',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '메가폰': {
        bp: 120,
        type: '벌레',
        category: '물리',
        makesContact: true
    },
    '따라가때리기': {
        bp: 40,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '고속스핀': {
        bp: 20,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '잎날가르기': { alwaysCrit: false },
    '은혜갚기': {
        bp: 102,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '기사회생': {
        bp: 1,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '성스러운불꽃': {
        bp: 100,
        type: '불꽃',
        category: '물리',
        hasSecondaryEffect: true
    },
    '자폭': { bp: 200 },
    '섀도볼': {
        bp: 80,
        type: '고스트',
        category: '특수',
        hasSecondaryEffect: true,
        isBullet: true
    },
    '오물폭탄': {
        bp: 90,
        type: '독',
        category: '특수',
        hasSecondaryEffect: true,
        isBullet: true
    },
    '솔라빔': {
        bp: 120,
        type: '풀',
        category: '특수'
    },
    '강철날개': {
        bp: 70,
        type: '강철',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '도둑질': {
        bp: 40,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '전자포': {
        bp: 100,
        type: '전기',
        category: '특수',
        hasSecondaryEffect: true
    }
});

delete MOVES_GSC['용해액'];
delete MOVES_GSC['조이기'];
delete MOVES_GSC['껍질끼우기'];
delete MOVES_GSC['구멍파기'];
delete MOVES_GSC['회오리불꽃'];
delete MOVES_GSC['메가드레인'];
delete MOVES_GSC['베어가르기'];
delete MOVES_GSC['오물공격'];
delete MOVES_GSC['김밥말이'];

var MOVES_ADV = $.extend(true, {}, MOVES_GSC, {
    '제비반환': {
        bp: 60,
        type: '비행',
        category: '물리',
        makesContact: true
    },
    '에어컷터': {
        bp: 55,
        type: '비행',
        category: '특수',
        isSpread: true
    },
    '브레이즈킥': {
        bp: 85,
        type: '불꽃',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '뻐다귀부메랑': {
        bp: 50,
        type: '땅',
        category: '물리',
        isTwoHit: true
    },
    '뛰어오르다': {
        bp: 85,
        type: '비행',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '깨뜨리다': {
        bp: 75,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '파멸의소원': {
        bp: 120,
        type: '강철',
        category: '특수'
    },
    '드래곤크루': {
        bp: 80,
        type: '드래곤',
        category: '물리',
        makesContact: true
    },
    '분화': {
        bp: 150,
        type: '불꽃',
        category: '특수',
        isSpread: true
    },
    '신통력': {
        bp: 80,
        type: '에스퍼',
        category: '특수',
        hasSecondaryEffect: true
    },
    '객기': {
        bp: 70,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '속이다': {
        bp: 40,
        type: '노말',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '힘껏펀치': {
        bp: 150,
        type: '격투',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '열풍': {
        bp: 100,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '탁쳐서떨구기': {
        bp: 20,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '리프블레이드': {
        bp: 70,
        type: '풀',
        category: '물리',
        makesContact: true
    },
    '안다리걸기': {
        bp: 1,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '라스트버지': {
        bp: 70,
        type: '에스퍼',
        category: '특수',
        hasSecondaryEffect: true
    },
    '코멧펀치': {
        bp: 100,
        type: '강철',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    '탁류': {
        bp: 95,
        type: '물',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '오버히트': {
        bp: 140,
        type: '불꽃',
        category: '특수'
    },
    '독엄니': {
        bp: 50,
        type: '독',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    '사이코부스트': {
        bp: 140,
        type: '에스퍼',
        category: '특수'
    },
    '리벤지': {
        bp: 120,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '락블레스트': {
        bp: 25,
        type: '바위',
        category: '물리',
        isMultiHit: true
    },
    '암석봉인': {
        bp: 50,
        type: '바위',
        category: '물리',
        hasSecondaryEffect: true
    },
    '섀도펀치': {
        bp: 60,
        type: '고스트',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '전격파': {
        bp: 60,
        type: '전기',
        category: '특수'
    },
    '시그널빔': {
        bp: 75,
        type: '벌레',
        category: '특수',
        hasSecondaryEffect: true
    },
    '스카이업퍼': {
        bp: 85,
        type: '격투',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '스파크': {
        bp: 65,
        type: '전기',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '엄청난힘': {
        bp: 120,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '볼트태클': {
        bp: 120,
        type: '전기',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        hasRecoil: true
    },
    '물의파동': {
        bp: 60,
        type: '물',
        category: '특수',
        hasSecondaryEffect: true,
        isPulse: true
    },
    '해수스파우팅': {
        bp: 150,
        type: '물',
        category: '특수',
        isSpread: true
    },
    '웨더볼': {
        bp: 50,
        type: '노말',
        category: '특수',
        isBullet: true
    }
});

delete MOVES_ADV['거품광선'];
delete MOVES_ADV['지옥의바퀴'];

var MOVES_DPP = $.extend(true, {}, MOVES_ADV, {
    '에어슬래시': {
        bp: 75,
        type: '비행',
        category: '특수',
        hasSecondaryEffect: true
    },
    '아쿠아제트': {
        bp: 40,
        type: '물',
        category: '물리',
        makesContact: true
    },
    '아쿠아테일': {
        bp: 90,
        type: '물',
        category: '물리',
        makesContact: true
    },
    '승부굳히기': {
        bp: 50,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '파동탄': {
        bp: 90,
        type: '격투',
        category: '특수',
        isBullet: true,
        isPulse: true
    },
    '눈사태': {
        bp: 120,
        type: '얼음',
        category: '물리',
        makesContact: true
    },
    '브레이브버드': {
        bp: 120,
        type: '비행',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '벌레먹음': {
        bp: 60,
        type: '벌레',
        category: '물리',
        makesContact: true
    },
    '벌레의야단법석': {
        bp: 90,
        type: '벌레',
        category: '특수',
        hasSecondaryEffect: true,
        isSound: true
    },
    '불릿펀치': {
        bp: 40,
        type: '강철',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '차지빔': {
        bp: 50,
        type: '전기',
        category: '특수',
        hasSecondaryEffect: true
    },
    '수다': {
        bp: 60,
        type: '비행',
        category: '특수',
        hasSecondaryEffect: true,
        isSound: true
    },
    '인파이트': {
        bp: 120,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '크로스포이즌': {
        bp: 70,
        type: '독',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '악의파동': {
        bp: 80,
        type: '악',
        category: '특수',
        hasSecondaryEffect: true,
        isPulse: true
    },
    '방전': {
        bp: 80,
        type: '전기',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '더블어택': {
        bp: 35,
        type: '노말',
        category: '물리',
        makesContact: true,
        isTwoHit: true
    },
    '용성군': {
        bp: 140,
        type: '드래곤',
        category: '특수'
    },
    '용의파동': {
        bp: 90,
        type: '드래곤',
        category: '특수',
        isPulse: true
    },
    '드래곤다이브': {
        bp: 100,
        type: '드래곤',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '드레인펀치': {
        bp: 60,
        type: '격투',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '대지의힘': {
        bp: 90,
        type: '땅',
        category: '특수',
        hasSecondaryEffect: true
    },
    '에너지볼': {
        bp: 80,
        type: '풀',
        category: '특수',
        hasSecondaryEffect: true,
        isBullet: true
    },
    '불꽃엄니': {
        bp: 65,
        type: '불꽃',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    '플레어드라이브': {
        bp: 120,
        type: '불꽃',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        hasRecoil: true
    },
    '러스터캐논': {
        bp: 80,
        type: '강철',
        category: '특수',
        hasSecondaryEffect: true
    },
    '내던지기': {
        bp: 1,
        type: '악',
        category: '물리'
    },
    '기합구슬': {
        bp: 120,
        type: '격투',
        category: '특수',
        hasSecondaryEffect: true,
        isBullet: true
    },
    '발경': {
        bp: 60,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '기가임팩트': {
        bp: 150,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '풀묶기': {
        bp: 1,
        type: '풀',
        category: '특수',
        makesContact: true
    },
    '더스트슈트': {
        bp: 120,
        type: '독',
        category: '물리',
        hasSecondaryEffect: true
    },
    '자이로볼': {
        bp: 1,
        type: '강철',
        category: '물리',
        makesContact: true,
        isBullet: true
    },
    '암해머': {
        bp: 100,
        type: '격투',
        category: '물리',
        makesContact: true,
        isPunch: true
    },
    '양날박치기': {
        bp: 150,
        type: '바위',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '무릎차기': { bp: 100 },
    '하이퍼보이스': {
        bp: 90,
        type: '노말',
        category: '특수',
        isSound: true,
        isSpread: true
    },
    '얼음엄니': {
        bp: 65,
        type: '얼음',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    '얼음뭉치': {
        bp: 40,
        type: '얼음',
        category: '물리'
    },
    '아이언헤드': {
        bp: 80,
        type: '강철',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '심판의뭉치': {
        bp: 100,
        type: '노말',
        category: '특수'
    },
    '점프킥': {
        bp: 85,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '분연': {
        bp: 80,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '리프블레이드': { bp: 90 },
    '리프스톰': {
        bp: 140,
        type: '풀',
        category: '특수'
    },
    '마그마스톰': {
        bp: 120,
        type: '불꽃',
        category: '특수'
    },
    '진흙폭탄': {
        bp: 65,
        type: '땅',
        category: '특수',
        hasSecondaryEffect: true
    },
    '자연의은혜': {
        bp: 1,
        type: '노말',
        category: '물리'
    },
    '자연의힘': {
        bp: 80,
        type: '노말',
        category: '특수',
        hasSecondaryEffect: true
    },
    '깜짝베기': {
        bp: 70,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '역린': {
        bp: 120,
        type: '드래곤',
        category: '물리',
        makesContact: true
    },
    '보복': {
        bp: 50,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '쪼아대기': {
        bp: 60,
        type: '비행',
        category: '물리',
        makesContact: true
    },
    '독찌르기': {
        bp: 80,
        type: '독',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '파워젬': {
        bp: 70,
        type: '바위',
        category: '특수'
    },
    '파워휩': {
        bp: 120,
        type: '풀',
        category: '물리',
        makesContact: true
    },
    '사이코커터': {
        bp: 70,
        type: '에스퍼',
        category: '물리'
    },
    '혼내기': {
        bp: 60,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '락클라임': {
        bp: 90,
        type: '노말',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '바위깨기': {
        bp: 40,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '씨폭탄': {
        bp: 80,
        type: '풀',
        category: '물리',
        isBullet: true
    },
    '시드플레어': {
        bp: 120,
        type: '풀',
        category: '특수',
        hasSecondaryEffect: true
    },
    '섀도크루': {
        bp: 70,
        type: '고스트',
        category: '물리',
        makesContact: true
    },
    '섀도다이브': {
        bp: 120,
        type: '고스트',
        category: '물리',
        makesContact: true
    },
    '야습': {
        bp: 40,
        type: '고스트',
        category: '물리',
        makesContact: true
    },
    '공간절단': {
        bp: 100,
        type: '드래곤',
        category: '특수'
    },
    '스톤에지': {
        bp: 100,
        type: '바위',
        category: '물리'
    },
    '기습': {
        bp: 80,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '스피드스타': {
        bp: 60,
        type: '노말',
        category: '특수',
        isSpread: true
    },
    '번개엄니': {
        bp: 65,
        type: '전기',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isBite: true
    },
    '트라이어택': {
        bp: 80,
        type: '노말',
        category: '특수',
        hasSecondaryEffect: true
    },
    '유턴': {
        bp: 70,
        type: '벌레',
        category: '물리',
        makesContact: true
    },
    '진공파': {
        bp: 40,
        type: '격투',
        category: '특수'
    },
    '잠깨움뺨치기': {
        bp: 60,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '폭포오르기': {
        bp: 80,
        type: '물',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '우드해머': {
        bp: 120,
        type: '풀',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '시저크로스': {
        bp: 80,
        type: '벌레',
        category: '물리',
        makesContact: true
    },
    '사념의박치기': {
        bp: 80,
        type: '에스퍼',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    }
});

delete MOVES_DPP['잎날가르기'];
delete MOVES_DPP['더블니들'];
delete MOVES_DPP['전자포'];

var MOVES_BW = $.extend(true, {}, MOVES_DPP, {
    '애시드봄': {
        bp: 40,
        type: '독',
        category: '특수',
        hasSecondaryEffect: true,
        isBullet: true
    },
    '애크러뱃': {
        bp: 55,
        type: '비행',
        category: '물리',
        makesContact: true
    },
    '공격지령': {
        bp: 90,
        type: '벌레',
        category: '물리'
    },
    '푸른불꽃': {
        bp: 130,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true
    },
    '뇌격': {
        bp: 130,
        type: '전기',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '땅고르기': {
        bp: 60,
        type: '땅',
        category: '물리',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '기관총': {
        bp: 25,
        type: '풀',
        category: '물리',
        isMultiHit: true,
        isBullet: true
    },
    '배대뒤치기': {
        bp: 60,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '클리어스모그': {
        bp: 50,
        type: '독',
        category: '특수'
    },
    '파멸의소원': { bp: 140 },
    '드래곤테일': {
        bp: 60,
        type: '드래곤',
        category: '물리',
        makesContact: true
    },
    '드레인펀치': { bp: 75 },
    '드릴라이너': {
        bp: 80,
        type: '땅',
        category: '물리',
        makesContact: true
    },
    '더블촙': {
        bp: 40,
        type: '드래곤',
        category: '물리',
        makesContact: true,
        isTwoHit: true
    },
    '일렉트릭볼': {
        bp: 1,
        type: '전기',
        category: '특수',
        isBullet: true
    },
    '페인트': {
        bp: 30,
        type: '노말',
        category: '물리'
    },
    '불꽃춤': {
        bp: 80,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true
    },
    '니트로차지': {
        bp: 50,
        type: '불꽃',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '속임수': {
        bp: 95,
        type: '악',
        category: '물리',
        makesContact: true
    },
    '프리즈볼트': {
        bp: 140,
        type: '얼음',
        category: '물리',
        hasSecondaryEffect: true
    },
    '얼음숨결': {
        bp: 40,
        type: '얼음',
        category: '특수',
        alwaysCrit: true
    },
    '크로스썬더': {
        bp: 100,
        type: '전기',
        category: '물리'
    },
    '크로스플레임': {
        bp: 100,
        type: '불꽃',
        category: '특수'
    },
    '기어소서': {
        bp: 50,
        type: '강철',
        category: '물리',
        isTwoHit: true
    },
    '기가드레인': { bp: 75 },
    '얼다세계': {
        bp: 65,
        type: '얼음',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '아프로브레이크': {
        bp: 120,
        type: '노말',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    },
    '헤비봄버': {
        bp: 1,
        type: '강철',
        category: '물리',
        makesContact: true
    },
    '병상첨병': {
        bp: 50,
        type: '고스트',
        category: '특수'
    },
    '무릎차기': { bp: 130 },
    '우드호른': {
        bp: 75,
        type: '풀',
        category: '물리',
        makesContact: true
    },
    '폭풍': {
        bp: 120,
        type: '비행',
        category: '특수',
        hasSecondaryEffect: true
    },
    '고드름떨구기': {
        bp: 85,
        type: '얼음',
        category: '물리',
        hasSecondaryEffect: true
    },
    '고드름침': {
        bp: 25,
        type: '얼음',
        category: '물리',
        isMultiHit: true
    },
    '불태우기': {
        bp: 30,
        type: '불꽃',
        category: '특수',
        isSpread: true
    },
    '연옥': {
        bp: 100,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true
    },
    '점프킥': { bp: 100 },
    '로킥': {
        bp: 60,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '자연의힘': {
        bp: 100,
        type: '땅',
        category: '물리',
        hasSecondaryEffect: false,
        isSpread: true
    },
    '나이트버스트': {
        bp: 85,
        type: '악',
        category: '특수',
        hasSecondaryEffect: true
    },
    '꽃잎댄스': {
        bp: 120,
        type: '풀',
        category: '특수',
        makesContact: true
    },
    '사이코쇼크': {
        bp: 80,
        type: '에스퍼',
        category: '특수',
        dealsPhysicalDamage: true
    },
    '사이코브레이크': {
        bp: 100,
        type: '에스퍼',
        category: '특수',
        dealsPhysicalDamage: true
    },
    '셸블레이드': {
        bp: 75,
        type: '물',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '옛노래': {
        bp: 75,
        type: '노말',
        category: '특수',
        hasSecondaryEffect: true,
        isSound: true,
        isSpread: true
    },
    '원수갚기': {
        bp: 70,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    '성스러운칼': {
        bp: 90,
        type: '격투',
        category: '물리',
        makesContact: true,
        ignoresDefenseBoosts: true
    },
    '열탕': {
        bp: 80,
        type: '물',
        category: '특수',
        hasSecondaryEffect: true
    },
    '화염탄': {
        bp: 100,
        type: '불꽃',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '신비의칼': {
        bp: 85,
        type: '격투',
        category: '특수',
        dealsPhysicalDamage: true
    },
    '프리폴': {
        bp: 60,
        type: '비행',
        category: '물리',
        makesContact: true,
    },
    '오물웨이브': {
        bp: 95,
        type: '독',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '떨어뜨리기': {
        bp: 50,
        type: '바위',
        category: '물리'
    },
    '바크아웃': {
        bp: 55,
        type: '악',
        category: '특수',
        hasSecondaryEffect: true,
        isSound: true,
        isSpread: true
    },
    '어시스트파워': {
        bp: 20,
        type: '에스퍼',
        category: '특수'
    },
    '업어후리기': {
        bp: 40,
        type: '격투',
        category: '물리',
        makesContact: true,
        alwaysCrit: true
    },
    '싱크로노이즈': {
        bp: 70,
        type: '에스퍼',
        category: '특수',
        isSpread: true
    },
    '몸통박치기': { bp: 50 },
    '스위프뺨치기': {
        bp: 25,
        type: '노말',
        category: '물리',
        makesContact: true,
        isMultiHit: true
    },
    '난동부리기': {
        bp: 120,
        type: '노말',
        category: '물리',
        makesContact: true
    },
    'V제너레이트': {
        bp: 180,
        type: '불꽃',
        category: '물리',
        makesContact: true
    },
    '볼트체인지': {
        bp: 70,
        type: '전기',
        category: '특수'
    },
    '와일드볼트': {
        bp: 90,
        type: '전기',
        category: '물리',
        makesContact: true,
        hasRecoil: true
    }
});

var MOVES_XY = $.extend(true, {}, MOVES_BW, {
    '에어컷터': { bp: 60 },
    '손바닥치기': {
        bp: 15,
        type: '격투',
        category: '물리',
        makesContact: true,
        isMultiHit: true
    },
    '승부굳히기': { bp: 60 },
    '파동탄': { bp: 80 },
    '눈보라': { bp: 110 },
    '폭음파': {
        bp: 140,
        type: '노말',
        category: '특수',
        isSound: true,
        isSpread: true
    },
    '수다': { bp: 65 },
    '찝게햄머': { bp: 100 },
    '매지컬샤인': {
        bp: 80,
        type: '페어리',
        category: '특수',
        isSpread: true
    },
    '다이아스톰': {
        bp: 100,
        type: '바위',
        category: '물리',
        hasSecondaryEffect: true,
        isSpread: true
    },
    '용성군': { bp: 130 },
    '화룡점정': {
        bp: 120,
        type: '비행',
        category: '물리',
        makesContact: true
    },
    '용의파동': { bp: 85 },
    '드레인키스': {
        bp: 50,
        type: '페어리',
        category: '특수',
        makesContact: true,
    },
    '에너지볼': { bp: 90 },
    '객기': { ignoresBurn: true },
    '불대문자': { bp: 110 },
    '화염방사': { bp: 90 },
    '플라잉프레스': {
        bp: 80,
        type: '격투',
        category: '물리',
        makesContact: true
    },
    '프리즈드라이': {
        bp: 70,
        type: '얼음',
        category: '특수',
        hasSecondaryEffect: true
    },
    '얼음숨결': { bp: 60 },
    '열풍': { bp: 95 },
    '병상첨병': { bp: 65 },
    '잠재파워-벌레': { bp: 60 },
    '잠재파워-악': { bp: 60 },
    '잠재파워-드래곤': { bp: 60 },
    '잠재파워-전기': { bp: 60 },
    '잠재파워-격투': { bp: 60 },
    '잠재파워-불': { bp: 60 },
    '잠재파워-비행': { bp: 60 },
    '잠재파워-고스트': { bp: 60 },
    '잠재파워-풀': { bp: 60 },
    '잠재파워-땅': { bp: 60 },
    '잠재파워-얼음': { bp: 60 },
    '잠재파워-독': { bp: 60 },
    '잠재파워-에스퍼': { bp: 60 },
    '잠재파워-바위': { bp: 60 },
    '잠재파워-강철': { bp: 60 },
    '잠재파워-물': { bp: 60 },
    '폭풍': { bp: 110 },
    '하이드로펌프': { bp: 110 },
    '냉동빔': { bp: 90 },
    '불태우기': { bp: 60 },
    '탁쳐서떨구기': { bp: 65 },
    '그라운드포스': {
        bp: 90,
        type: '땅',
        category: '물리',
        isSpread: true
    },
    '리프스톰': { bp: 130 },
    '파멸의빛': {
        bp: 140,
        type: '페어리',
        category: '특수',
        hasRecoil: true
    },
    '로킥': { bp: 65 },
    '마그마스톰': { bp: 100 },
    '코멧펀치': { bp: 90 },
    '문포스': {
        bp: 95,
        type: '페어리',
        category: '특수',
        hasSecondaryEffect: true
    },
    '탁류': { bp: 90 },
    '자연의힘': {
        bp: 80,
        type: '노말',
        category: '특수',
        hasSecondaryEffect: true,
        isSpread: false
    },
    '데스윙': {
        bp: 80,
        type: '비행',
        category: '특수'
    },
    '근원의파동': {
        bp: 110,
        type: '물',
        category: '특수',
        isSpread: true
    },
    '오버히트': { bp: 130 },
    '고스트다이브': {
        bp: 90,
        type: '고스트',
        category: '물리',
        makesContact: true
    },
    '바늘미사일': { bp: 25 },
    '치근거리기': {
        bp: 90,
        type: '페어리',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true
    },
    '파워젬': { bp: 80 },
    '그로우펀치': {
        bp: 40,
        type: '격투',
        category: '물리',
        makesContact: true,
        hasSecondaryEffect: true,
        isPunch: true
    },
    '단애의칼': {
        bp: 120,
        type: '땅',
        category: '물리',
        isSpread: 'true'
    },
    '암석봉인': { bp: 60 },
    '절대영도': {
        bp: 0,
        type: '얼음',
        category: '특수',
        isSpread: 'false',
        isMLG: 'true'
    },
    '업어후리기': { bp: 60 },
    '파도타기': { bp: 90 },    
    '싱크로노이즈': { bp: 120 },
    '도둑질': { bp: 60 },
    '번개': { bp: 110 },
    '10만볼트': { bp: 90 },
    '잠깨움뺨치기': { bp: 70 },
    '물수리검': {
        bp: 15,
        type: '물',
        category: '물리',
        isMultiHit: true
    },
    '오로라빔': {
        bp: 65,
        type: '얼음', 
        category: '특수'
    }
});

MOVES_XY['원시의힘'] = MOVES_XY['원시의힘'];
MOVES_XY['폭발펀치'] = MOVES_XY['폭발펀치'];
MOVES_XY['신속'] = MOVES_XY['신속'];
MOVES_XY['속여때리기'] = MOVES_XY['속여때리기'];
MOVES_XY['무릎차기'] = MOVES_XY['무릎차기'];
MOVES_XY['자폭'] = MOVES_XY['자폭'];
MOVES_XY['솔라빔'] = MOVES_XY['솔라빔'];
MOVES_XY['번개펀치'] = MOVES_XY['번개펀치'];
delete MOVES_XY['원시의힘'];
delete MOVES_XY['폭발펀치'];
delete MOVES_XY['신속'];
delete MOVES_XY['속여때리기'];
delete MOVES_XY['무릎차기'];
delete MOVES_XY['자폭'];
delete MOVES_XY['솔라빔'];
delete MOVES_XY['번개펀치'];

var ZMOVES_LOOKUP = {
    '노말':'울트라대시어택','불꽃':'다이내믹풀플레임','물':'슈퍼아쿠아토네이도',
    '전기':'스파킹기가볼트','풀':'블룸샤인엑스트라','고스트':'무한암야로의유인',
    '악':'블랙홀이클립스','에스퍼':'맥시멈사이브레이커','격투':'전격무쌍격렬권',
    '강철':'초월나선연격','얼음':'레이징지오프리즈','땅':'라이징랜드오버',
    '바위':'월즈엔드폴','벌레':'절대포식회전참','페어리':'러블리스타임팩트',
    '비행':'파이널다이브클래시','드래곤':'얼티메이트드래곤번','독':'애시드포이즌딜리트'};

var MOVES_SM = $.extend(true, {}, MOVES_XY, {
    '물수리검': {
        category: '특수',
        zp: 100
    },
    '흡혈': {
        category: '물리',
        type: '벌레',
        bp: 80,
        zp: 160
    },
    '찌리리따끔따끔': {
        category: '물리',
        type: '전기',
        bp: 80,
        zp: 160
    },
    '섀도레이': {
        category: '특수',
        type: '고스트',
        bp: 100,
        zp: 180
    },
    '메테오드라이브': {
        category: '물리',
        type: '강철',
        bp: 100,
        zp: 180
    },
    '섀도스틸': {
        category: '물리',
        type: '고스트',
        bp: 90,
        zp: 175
    },
    '프리즘레이저': {
        category: '특수',
        type: '에스퍼',
        bp: 160,
        zp: 200
    },
    '아쿠아브레이크': {
        category: '물리',
        type: '물',
        bp: 85,
        zp: 160
    },
    '액셀록': {
        category: '물리',
        type: '바위',
        bp: 40,
        zp: 100
    },
    '섀도본': {
        category: '물리',
        type: '고스트',
        bp: 85,
        zp: 160
    },
    '분함의발구르기': {
        category: '물리',
        type: '땅',
        bp: 75,
        zp: 140
    },
    '사이코팽': {
        category: '물리',
        type: '에스퍼',
        bp: 95,
        zp: 160
    },
    '플뢰르캐논': {
        category: '특수',
        type: '페어리',
        bp: 130,
        zp: 195
    },
    '트랩셸': {
        category: '특수',
        type: '불꽃',
        bp: 150,
        zp: 200
    },
    '오리진스슈퍼노바': {
        category: '특수',
        type: '에스퍼',
        bp: 185
    },
    '진심의공격': {
        category: '물리',
        type: '노말',
        bp: 210
    },
    '라이트닝서프라이드': {
        category: '특수',
        type: '전기',
        bp: 175
    },
    '칠성탈혼퇴': {
        category: '물리',
        type: '고스트',
        bp: 195
    },
    '바다의심포니': {
        category: '특수',
        type: '물',
        bp: 195
    },
    '하이퍼다크크러셔': {
        category: '물리',
        type: '악',
        bp: 180
    },
    '섀도애로우즈스트라이크': {
        category: '물리',
        type: '고스트',
        bp: 180
    },
    '세차게휘두르기': {
        category: '물리',
        type: '악',
        bp: 60,
        isSpread: true,
        zp: 120
    },
    '드래곤해머': {
        category: '물리',
        type: '드래곤',
        bp: 90,
        zp: 175
    },
    '스케일노이즈': {
        category: '특수',
        type: '드래곤',
        bp: 110,
        zp: 185
    },
    '부리캐논': {
        category: '물리',
        type: '비행',
        bp: 100,
        zp: 180
    },
    '트로피컬킥': {
        category: '물리',
        type: '풀',
        bp: 70,
        zp: 140
    },
    '코어퍼니셔': {
        category: '특수',
        type: '드래곤',
        bp: 100,
        isSpread: true,
        zp: 140
    },
    '잠재댄스':{
        category: '특수',
        type: '노말',
        bp: 90,
        zp: 175
    },
    '스마트호른':{
        category: '물리',
        type: '강철',
        bp: 70,
        zp: 140
    },
    '멀티어택': {
        category: '물리',
        type: '노말',
        bp: 90,
        zp: 185
    },
    '불사르기': {
        category: '특수',
        type: '불꽃',
        bp: 130,
        zp: 195
    },
    '기어오르기': {
        category: '물리',
        type: '악',
        bp: 20,
        zp: 160
    },
    '불꽃채찍': {
        category: '물리',
        type: '불꽃',
        bp: 80,
        zp: 160
    },
    '덤벼들기': {
        category: '물리',
        type: '벌레',
        bp: 80,
        zp: 160
    },
    '앵커숏': {
        category: '물리',
        type: '강철',
        bp: 80,
        zp: 160
    },
    '꽃가루경단': {
        category: '특수',
        type: '벌레',
        bp: 90,
        zp: 175
    },
    '지옥찌르기': {
        category: '물리',
        type: '악',
        bp: 80,
        zp: 160
    },
    '솔라블레이드': {
        category: '물리',
        type: '풀',
        bp: 125,
        zp: 190
    },
    '10만마력': {
        category: '물리',
        type: '땅',
        bp: 95,
        zp: 175
    },
    '아이스해머': {
        category: '물리',
        type: '얼음',
        bp: 100,
        zp: 180
    },
    '만나자마자': {
        category: '물리',
        type: '벌레',
        bp: '90',
        zp: '175',
    },
    '물거품아리아': {
         category: '특수',
         type: '물',
         bp: 90,
         isSpread: true,
         zp: 175
    },
    'DD래리어트': {
        category: '물리',
        type: '악',
        bp: 85,
        zp:160,
        ignoresDefenseBoosts: true
    },
    '그림자꿰매기': {
        category: '물리',
        type: '고스트',
        bp: 80,
        zp: 160
    },
    '필살피카슛': {
        category: '물리',
        type: '전기',
        bp: 210
    },
    '울트라대시어택': {
        type: '노말'
    },
    '다이내믹풀플레임': {
        type: '불꽃'
    },
    '레이징지오프리즈': {
        type: '얼음'
    },
    '슈퍼아쿠아토네이도': {
        type: '물'
    },
    '스파킹기가볼트': {
        type: '전기'
    },
    '전격무쌍격렬권': {
        type: '격투'
    },
    '블룸샤인엑스트라': {
        type: '풀'
    },
    '맥시멈사이브레이커': {
        type: '에스퍼'
    },
    '절대포식회전참': {
        type: '벌레'
    },
    '애시드포이즌딜리트': {
        type: '독'
    },
    '파이널다이브클래시': {
        type: '비행'
    },
    '얼티메이트드래곤번': {
        type: '드래곤'
    },
    '월즈엔드폴': {
        type: '바위'
    },
    '라이징랜드오버': {
        type: '땅'
    },
    '초월나선연격': {
        type: '강철'
    },
    '러블리스타임팩트': {
        type: '페어리'
    },
    '무한암야로의유인': {
        type: '고스트'
    },
    '블랙홀이클립스': {
        type: '악'
    },
    '불꽃펀치':{
        zp: 140
    },
    '냉동펀치':{
        zp: 140
    },
    '번개펀치':{
        zp: 140
    },
    '두번치기':{
        zp: 100
    },
    '점프킥':{
        zp: 180
    },
    '박치기':{
        zp: 140
    },
    '몸통박치기':{
        bp: 40,
        zp: 100
    },
    '누르기':{
        zp: 160
    },
    '난동부리기':{
        zp: 190
    },
    '이판사판태클':{
        zp: 190
    },
    '바늘미사일':{
        zp: 140
    },
    '물기':{
        zp: 120
    },
    '화염방사':{
        zp: 175
    },
    '하이드로펌프':{
        zp: 185
    },
    '파도타기':{
        zp: 175
    },
    '냉동빔':{
        zp: 175
    },
    '눈보라':{
        zp: 185
    },
    '오로라빔':{
        zp: 120
    },
    '파괴광선':{
        zp: 200
    },
    '회전부리':{
        zp: 160
    },
    '안다리걸기':{
        zp: 160
    },
    '지구던지기':{
        zp: 100
    },
    '솔라빔':{
        zp: 190
    },
    '꽃잎댄스':{
        zp: 190
    },
    '10만볼트':{
        zp: 175
    },
    '번개':{
        zp: 185
    },
    '지진':{
        zp: 180
    },
    '사이코키네시스':{
        zp: 175
    },
    '전광석화':{
        zp: 100
    },
    '나이트헤드':{
        zp: 100
    },
    '자폭':{
        zp: 200
    },
    '불대문자':{
        zp: 185
    },
    '폭포오르기':{
        zp: 160
    },
    '스피드스타':{
        zp: 120
    },
    '무릎차기':{
        zp: 195
    },
    '불새':{
        zp: 200
    },
    '찝게햄머':{
        zp: 180
    },
    '대폭발':{
        zp: 200
    },
    '뻐다귀부메랑':{
        zp: 100
    },
    '스톤샤워':{
        zp: 140
    },
    '트라이어택':{
        zp: 160
    },
    '분노의앞니':{
        type: "노말",
        category: "물리",
        zp: 100
    },
    '도둑질':{
        zp: 120
    },
    '화염자동차':{
        zp: 120
    },
    '바둥바둥':{
        zp: 160
    },
    '에어로블라스트':{
        zp: 180
    },
    '기사회생':{
        zp: 160
    },
    '마하펀치':{
        zp: 100
    },
    '속여때리기':{
        zp: 120
    },
    '오물폭탄':{
        zp: 175
    },
    '얼다바람':{
        zp: 100
    },
    '역린':{
        zp: 190
    },
    '기가드레인':{
        zp: 140
    },
    '스파크':{
        zp: 120
    },
    '강철날개':{
        zp: 140
    },
    '은혜갚기':{
        zp: 160
    },
    '화풀이':{
        zp: 160
    },
    '성스러운불꽃':{
        zp: 180
    },
    '폭발펀치':{
        zp: 180
    },
    '메가폰':{
        zp: 190
    },
    '따라가때리기':{
        zp: 100
    },
    '고속스핀':{
        zp: 100
    },
    '아이언테일':{
        zp: 180
    },
    '잠재파워':{
        zp: 120
    },
    '크로스촙':{
        zp: 180
    },
    '깨물어부수기':{
        zp: 160
    },
    '신속':{
        zp: 160
    },
    '원시의힘':{
        zp: 120
    },
    '섀도볼':{
        zp: 160
    },
    '바위깨기':{
        zp: 100
    },
    '속이다':{
        zp: 100
    },
    '열풍':{
        zp: 175
    },
    '객기':{
        zp: 140
    },
    '힘껏펀치':{
        zp: 200
    },
    '엄청난힘':{
        zp: 190
    },
    '리벤지':{
        zp: 120
    },
    '깨뜨리다':{
        zp: 140
    },
    '탁쳐서떨구기':{
        zp: 120
    },
    '죽기살기':{
        type: '노말',
        category: '물리',
        zp: 160
    },
    '분화':{
        zp: 200
    },
    '손바닥치기':{
        zp: 100
    },
    '라스트버지':{
        zp: 140
    },
    '브레이즈킥':{
        zp: 160
    },
    '하이퍼보이스':{
        zp: 175
    },
    '독엄니':{
        zp: 100
    },
    '코멧펀치':{
        zp: 175
    },
    '웨더볼':{
        zp: 160
    },
    '에어컷터':{
        zp: 120
    },
    '오버히트':{
        zp: 195
    },
    '암석봉인':{
        zp: 120
    },
    '해수스파우팅':{
        zp: 200
    },
    '시그널빔':{
        zp: 140
    },
    '섀도펀치':{
        zp: 120
    },
    '신통력':{
        zp: 160
    },
    '스카이업퍼':{
        zp: 160
    },
    '절대영도':{
        zp: 180
    },
    '탁류':{
        zp: 175
    },
    '기관총':{
        zp: 140
    },
    '제비반환':{
        zp: 120
    },
    '고드름침':{
        zp: 140
    },
    '드래곤크루':{
        zp: 160
    },
    '뛰어오르다':{
        zp: 160
    },
    '볼트태클':{
        zp: 190
    },
    '리프블레이드':{
        zp: 175
    },
    '락블레스트':{
        zp: 140
    },
    '전격파':{
        zp: 120
    },
    '물의파동':{
        zp: 120
    },
    '파멸의소원':{
        zp: 200
    },
    '사이코부스트':{
        zp: 200
    },
    '잠깨움뺨치기':{
        zp: 140
    },
    '암해머':{
        zp: 180
    },
    '자이로볼':{
        zp: 160
    },
    '자연의은혜':{
        zp: 160
    },
    '페인트':{
        zp: 100
    },
    '쪼아대기':{
        zp: 120
    },
    '유턴':{
        zp: 140
    },
    '인파이트':{
        zp: 190
    },
    '보복':{
        zp: 100
    },
    '승부굳히기':{
        zp: 120
    },
    '내던지기':{
        zp: 100
    },
    '혼내기':{
        zp: 160
    },
    '기습':{
        bp: 70,
        zp: 140
    },
    '플레어드라이브':{
        zp: 190
    },
    '발경':{
        zp: 120
    },
    '파동탄':{
        zp: 160
    },
    '독찌르기':{
        zp: 160
    },
    '악의파동':{
        zp: 160
    },
    '깜짝베기':{
        zp: 140
    },
    '아쿠아테일':{
        zp: 175
    },
    '씨폭탄':{
        zp: 160
    },
    '에어슬래시':{
        zp: 140
    },
    '시저크로스':{
        zp: 160
    },
    '벌레의야단법석':{
        zp: 175
    },
    '용의파동':{
        zp: 160
    },
    '드래곤다이브':{
        zp: 180
    },
    '파워젬':{
        zp: 160
    },
    '드레인펀치':{
        zp: 140
    },
    '진공파':{
        zp: 100
    },
    '기합구슬':{
        zp: 190
    },
    '에너지볼':{
        zp: 175
    },
    '브레이브버드':{
        zp: 190
    },
    '대지의힘':{
        zp: 175
    },
    '기가임팩트':{
        zp: 200
    },
    '불릿펀치':{
        zp: 100
    },
    '눈사태':{
        zp: 120
    },
    '얼음뭉치':{
        zp: 100
    },
    '섀도크루':{
        zp: 140
    },
    '번개엄니':{
        zp: 120
    },
    '얼음엄니':{
        zp: 120
    },
    '불꽃엄니':{
        zp: 120
    },
    '야습':{
        zp: 100
    },
    '진흙폭탄':{
        zp: 120
    },
    '사이코커터':{
        zp: 140
    },
    '사념의박치기':{
        zp: 160
    },
    '러스터캐논':{
        zp: 160
    },
    '락클라임':{
        zp: 175
    },
    '용성군':{
        zp: 195
    },
    '방전':{
        zp: 160
    },
    '분연':{
        zp: 160
    },
    '리프스톰':{
        zp: 195
    },
    '파워휩':{
        zp: 190
    },
    '크로스포이즌':{
        zp: 140
    },
    '더스트슈트':{
        zp: 190
    },
    '아이언헤드':{
        zp: 160
    },
    '스톤에지':{
        zp: 180
    },
    '풀묶기':{
        zp: 160
    },
    '수다':{
        zp: 120
    },
    '심판의뭉치':{
        zp: 180
    },
    '벌레먹음':{
        zp: 120
    },
    '차지빔':{
        zp: 100
    },
    '우드해머':{
        zp: 190
    },
    '아쿠아제트':{
        zp: 100
    },
    '공격지령':{
        zp: 175
    },
    '양날박치기':{
        zp: 200
    },
    '더블어택':{
        zp: 140
    },
    '공간절단':{
        zp: 180
    },
    '마그마스톰':{
        zp: 180
    },
    '시드플레어':{
        zp: 190
    },
    '섀도다이브':{
        zp: 190
    },
    '사이코쇼크':{
        zp: 160
    },
    '떨어뜨리기':{
        zp: 100
    },
    '오물웨이브':{
        zp: 175
    },
    '헤비봄버':{
        zp: 160
    },
    '싱크로노이즈':{
        zp: 190
    },
    '일렉트릭볼':{
        zp: 160
    },
    '니트로차지':{
        zp: 100
    },
    '로킥':{
        zp: 120
    },
    '애시드봄':{
        zp: 100
    },
    '속임수':{
        zp: 175
    },
    '클리어스모그':{
        zp: 100
    },
    '어시스트파워':{
        zp: 160
    },
    '열탕':{
        zp: 160
    },
    '병상첨병':{
        zp: 160
    },
    '프리폴':{
        zp: 120
    },
    '배대뒤치기':{
        zp: 120
    },
    '불태우기':{
        zp: 120
    },
    '애크러뱃':{
        zp: 100
    },
    '원수갚기':{
        zp: 140
    },
    '연옥':{
        zp: 180
    },
    '물의맹세':{
        zp: 160
    },
    '불꽃의맹세':{
        zp: 160
    },
    '풀의맹세':{
        zp: 160
    },
    '볼트체인지':{
        zp: 140
    },
    '땅고르기':{
        zp: 120
    },
    '얼음숨결':{
        zp: 120
    },
    '드래곤테일':{
        zp: 120
    },
    '와일드볼트':{
        zp: 175
    },
    '드릴라이너':{
        zp: 160
    },
    '더블촙':{
        zp: 100
    },
    '우드호른':{
        zp: 140
    },
    '성스러운칼':{
        zp: 175
    },
    '셸블레이드':{
        zp: 140
    },
    '나이트버스트':{
        zp: 160
    },
    '사이코브레이크':{
        zp: 180
    },
    '스위프뺨치기':{
        zp: 140
    },
    '폭풍':{
        zp: 185
    },
    '아프로브레이크':{
        zp: 190
    },
    '기어소서':{
        zp: 180
    },
    '화염탄':{
        zp: 180
    },
    '옛노래':{
        zp: 140
    },
    '신비의칼':{
        zp: 160
    },
    '얼다세계':{
        zp: 120
    },
    '불꽃춤':{
        zp: 160
    },
    '푸른불꽃':{
        zp: 195
    },
    '불꽃춤':{
        zp: 160
    },
    '프리즈볼트':{
        zp: 200
    },
    '바크아웃':{
        zp: 100
    },
    '고드름떨구기':{
        zp: 160
    },
    'V제너레이트':{
        zp: 220
    },
    '크로스플레임':{
        zp: 180
    },
    '크로스썬더':{
        zp: 180
    },
    '플라잉프레스':{
        zp: 170
    },
    '고스트다이브':{
        zp: 175
    },
    '프리즈드라이':{
        zp: 140
    },
    '드레인키스':{
        zp: 100
    },
    '치근거리기':{
        zp: 175
    },
    '문포스':{
        zp: 175
    },
    '폭음파':{
        zp: 200
    },
    '다이아스톰':{
        zp: 180
    },
    '매지컬샤인':{
        zp: 160
    },
    '볼부비부비':{
        category: '물리',
        type: '전기',
        bp: 20,
        zp: 100
    },
    '그로우펀치':{
        zp: 100
    },
    '데스윙':{
        zp: 160
    },
    '그라운드포스':{
        zp: 185
    },
    '파멸의빛':{
        zp: 200
    },
    '근원의파동':{
        zp: 185
    },
    '단애의칼':{
        zp: 190
    },
    '화룡점정':{
        zp: 190
    }
});
