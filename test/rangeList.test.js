const assert = require('assert');
const RangeList = require('../src/rangeList')

const ErrBadParam = new Error('param must be an array with two numbers like [1,5]')
const ErrRange = new Error('range end must be bigger than range start')

describe('validateParam', () => {
  const list = new RangeList()
  const badParams = [{}, "", 1, [], [1], ["1"], [1, "2"]]
  badParams.forEach(item => {
    it('unvalid param', done => {
      try {
        list.validateParam(item)
      } catch (error) {
        if (error.message !== ErrBadParam.message) {
          done(error);
        } else {
          done();
        }
      }
    })
  })
  it('unvalid param', done => {
    try {
      list.validateParam([3,2])
    } catch (error) {
      if (error.message !== ErrRange.message) {
        done(error);
      } else {
        done();
      }
    }
  })
})

/** 
 * new range is on the right 
 *  1--------5  start--------end
 */
describe('Add range on the right', () => {
  const list = new RangeList()
  it('should print right string', () => {
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
    list.add([5,5])
    assert.equal(list.print(), '[1 5)')
  })
  it('should print right string', () => {
    list.add([11,15])
    assert.equal(list.print(), '[1 5) [11 15)')
  })
  it('should print right string', () => {
    list.add([21,25])
    assert.equal(list.print(), '[1 5) [11 15) [21 25)')
  })
})

/** 
 * new range's end is on the most right
 *  start is in the current range or between ranges 
 *  A  1--------5 start 11--------15 end
 *  B  1--------5  11---start-----15 end
 */
describe("Add new range's end is on the most right", () => {
  let list;
  beforeEach(() => {
    list = new RangeList()
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
    list.add([11,15])
    assert.equal(list.print(), '[1 5) [11 15)')
  })
  describe("A test", () => {
    it('should print right string', () => {
      list.add([13,17])
      assert.equal(list.print(), '[1 5) [11 17)')
    })
  })

  describe("B test", () => {
    it('should print right string', () => {
      list.add([8,17])
      assert.equal(list.print(), '[1 5) [8 17)')
    })
  })
})

/** new range's start and end is both in the current range or between ranges
 *  A  1----start----5  11----end----15  21--------25
 *  B  1--------5 start 11----end----15  21--------25
 *  C  1----start----5  11--------15 end 21--------25
 *  D  1--------5 start 11--------15 end 21--------25
 *  E  1--------5 11--start---end---15  21--------25
 */  
describe("Add new range's start and end is both in the current range or between ranges", () => {
  let list;
  beforeEach(() => {
    list = new RangeList()
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
    list.add([11,15])
    assert.equal(list.print(), '[1 5) [11 15)')
    list.add([21,25])
    assert.equal(list.print(), '[1 5) [11 15) [21 25)')
  })
  describe("A test", () => {
    it('should print right string', () => {
      list.add([3,13])
      assert.equal(list.print(), '[1 15) [21 25)')
    })
  })
  describe("B test", () => {
    it('should print right string', () => {
      list.add([8,13])
      assert.equal(list.print(), '[1 5) [8 15) [21 25)')
    })
  })
  describe("C1 test", () => {
    it('should print right string', () => {
      list.add([3,18])
      assert.equal(list.print(), '[1 18) [21 25)')
    })
  })
  describe("C2 test", () => {
    it('should print right string', () => {
      list.add([3,21])
      assert.equal(list.print(), '[1 25)')
    })
  })
  describe("D1 test", () => {
    it('should print right string', () => {
      list.add([8,18])
      assert.equal(list.print(), '[1 5) [8 18) [21 25)')
    })
  })
  describe("D2 test", () => {
    it('should print right string', () => {
      list.add([8,21])
      assert.equal(list.print(), '[1 5) [8 25)')
    })
  })
  describe("E test", () => {
    it('should print right string', () => {
      list.add([12,15])
      assert.equal(list.print(), '[1 5) [11 15) [21 25)')
    })
  })
})

/** new range is on the right 
 *  1--------5  start--------end
 */
describe('Remove range on the right', () => {
  const list = new RangeList()
  it('should print right string', () => {
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
    list.remove([11,15])
    assert.equal(list.print(), '[1 5)')
  })
})

/** new range's end is on the most right
 *  start is in the current range or between ranges 
 *  A  1--------5 start 11--------15 end
 *  B  1--------5  11---start-----15 end
 */
describe("Remove new range's end is on the most right", () => {
  let list;
  beforeEach(() => {
    list = new RangeList()
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
    list.add([11,15])
    assert.equal(list.print(), '[1 5) [11 15)')
  })
  describe("A test", () => {
    it('should print right string', () => {
      list.remove([8,18])
      assert.equal(list.print(), '[1 5)')
    })
  })

  describe("B test", () => {
    it('should print right string', () => {
      list.remove([13,18])
      assert.equal(list.print(), '[1 5) [11 13)')
    })
  })
})

/** new range's start and end is both in the current range or between ranges
 *  A  1----start----5  11----end----15  21--------25
 *  B  1--------5 start 11----end----15  21--------25
 *  C  1----start----5  11--------15 end 21--------25
 *  D  1--------5 start 11--------15 end 21--------25
 *  E  1--------5 11--start---end---15  21--------25
 */  
describe("Remove new range's start and end is both in the current range or between ranges", () => {
  let list;
  beforeEach(() => {
    list = new RangeList()
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
    list.add([11,15])
    assert.equal(list.print(), '[1 5) [11 15)')
    list.add([21,25])
    assert.equal(list.print(), '[1 5) [11 15) [21 25)')
  })
  describe("start equal to end should return", () => {
    it('should print right string', () => {
      list.remove([3,3])
      assert.equal(list.print(), '[1 5) [11 15) [21 25)')
    })
  })
  describe("A1 test", () => {
    it('should print right string', () => {
      list.remove([3,13])
      assert.equal(list.print(), '[1 3) [13 15) [21 25)')
    })
  })
  describe("A2 test", () => {
    it('should print right string', () => {
      list.remove([3,15])
      assert.equal(list.print(), '[1 3) [21 25)')
    })
  })
  describe("B test", () => {
    it('should print right string', () => {
      list.remove([3,18])
      assert.equal(list.print(), '[1 3) [21 25)')
    })
  })
  describe("C1 test", () => {
    it('should print right string', () => {
      list.remove([8,13])
      assert.equal(list.print(), '[1 5) [13 15) [21 25)')
    })
  })
  describe("C2 test", () => {
    it('should print right string', () => {
      list.remove([8,15])
      assert.equal(list.print(), '[1 5) [21 25)')
    })
  })
  describe("D test", () => {
    it('should print right string', () => {
      list.remove([8,18])
      assert.equal(list.print(), '[1 5) [21 25)')
    })
  })
  describe("E1 test", () => {
    it('should print right string', () => {
      list.remove([13,14])
      assert.equal(list.print(), '[1 5) [11 13) [14 15) [21 25)')
    })
  })
  describe("E2 test", () => {
    it('should print right string', () => {
      list.remove([13,15])
      assert.equal(list.print(), '[1 5) [11 13) [21 25)')
    })
  })
})

describe("Test add and remove", () => {
  const list = new RangeList()
  it('should print right string', () => {
    list.add([1,5])
    assert.equal(list.print(), '[1 5)')
  })
  it('should print right string', () => {
    list.add([10,20])
    assert.equal(list.print(), '[1 5) [10 20)')
  })
  it('should print right string', () => {
    list.add([20,20])
    assert.equal(list.print(), '[1 5) [10 20)')
  })
  it('should print right string', () => {
    list.add([20,21])
    assert.equal(list.print(), '[1 5) [10 21)')
  })

  it('should print right string', () => {
    list.add([2,4])
    assert.equal(list.print(), '[1 5) [10 21)')
  })
  it('should print right string', () => {
    list.add([3,8])
    assert.equal(list.print(), '[1 8) [10 21)')
  })
  it('should print right string', () => {
    list.remove([10,10])
    assert.equal(list.print(), '[1 8) [10 21)')
  })
  it('should print right string', () => {
    list.remove([10,11])
    assert.equal(list.print(), '[1 8) [11 21)')
  })
  it('should print right string', () => {
    list.remove([15,17])
    assert.equal(list.print(), '[1 8) [11 15) [17 21)')
  })
  it('should print right string', () => {
    list.remove([3,19])
    assert.equal(list.print(), '[1 3) [19 21)')
  })
})