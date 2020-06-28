import mapChecking from '..//Resources/Map/mapChecking';

const map1 = [
    2, 17, 16, 18, 14, 7, 15, 19, 
    13, 14, 13, 14, 15, 16, 17, 18, 
    8, 13, 12, 3, 10, 19, 18, 19, 
    4, 12, 11, 10, 9, 10, 11, 20, 
    9, 17, 13, 15, 8, 10, 12, 19,
    14, 8, 9, 6, 7, 6, 13, 16,      
    5, 3, 4, 5, 8, 14, 14, 17,
    1, 2, 7, 3, 12, 19, 15, 16
];

const map2 = [
    1,2,3,4,5,6,7,8,
    2,15,14,13,12,11,10,9,
    2,2,15,16,17,18,19,20,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2
];

const map3 = [];

const map4 = [
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1
];

const map5 = [
    1,2,3,4,5,6,7,8,
    2,15,14,13,12,11,10,9,
    2,2,15,16,17,18,19,20,
    2,2,2,21,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2
];

describe('mapChecking', () => {
    it ('mapChecking not-enough-array', () => {
        expect(mapChecking(map3)).toBe("Not enough 64 numbers");
    });

    it ('mapChecking correct-array-1', () => {
        expect(mapChecking(map1)).toBe(true);
    });

    it ('mapChecking correct-array-2', () => {
        expect(mapChecking(map2)).toBe(true);
    });

    it ('mapChecking out-range-array', () => {
        expect(mapChecking(map5)).toBe("All number must be between 1 and 20");
    });

    it ('mapChecking column-error', () => {
        expect(mapChecking(map4)).toBe("The table must have exactly 1 number 1 in the first column and 1 number 20 in the last column");
    });
})