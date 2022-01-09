const Skiplist = require('./skiplist');

const ErrBadParam = new Error('param must be an array with two numbers like [1,5]')
const ErrRange = new Error('range end must be bigger than range start')

class RangeList {
  constructor() {
    this.skipList = new Skiplist()
  }


  /** 
   * 
   *  new range is on the right 
   *  1--------5  start--------end
   * 
   *  new range's end is on the most right
   *  start is in the current range or between ranges 
   *  A  1--------5 start 11--------15 end
   *  B  1--------5  11---start-----15 end
   * 
   * new range's start and end is both in the current range or between ranges
   *  A  1----start----5  11----end----15  21--------25
   *  B  1--------5 start 11----end----15  21--------25
   *  C  1----start----5  11--------15 end 21--------25
   *  D  1--------5 start 11--------15 end 21--------25
   *  E  1-- star---- end--5 11--------15 21--------25
   */ 

  add(range) {
    this.validateParam(range)
    const [start, end] = range;
    if(start === end) return
    const startNode = this.skipList.findNode(start)

    if(startNode.next[0] === null) {
      this.skipList.add(start, true)
      this.skipList.add(end, false)
      return
    }
    const endNode = this.skipList.findNode(end)
    if(endNode.next[0] === null) {
      if(startNode.isStart) {
        this.deleteValues(startNode)
        // while(startNode.next[0] !== null) {
        //   this.skipList.delete(startNode.next[0].value)
        // }
        this.skipList.add(end, false)
        return
      } else {
        while(startNode.next[0] !== null) {
          this.skipList.delete(startNode.next[0].value)
        }
        this.skipList.add(start, true)
        this.skipList.add(end, false)
        return
      }
    }

    if (startNode === endNode) {
      return
    }

    if(startNode.isStart && endNode.isStart) {
      this.deleteValues(startNode, endNode)
      return
    }

    if(startNode.isStart && !endNode.isStart) {
      const nextStartValue = endNode.next[0].value;
      this.deleteValues(startNode, endNode)
      if(nextStartValue === end) {
        this.skipList.delete(end)
      } else {
        this.skipList.add(end, false)
      }
    }

    if(!startNode.isStart && endNode.isStart) {
      this.deleteValues(startNode, endNode)
      this.skipList.add(start, true)
      return
    }

    if(!startNode.isStart && !endNode.isStart) {
      const nextStartValue = endNode.next[0].value;
      this.deleteValues(startNode, endNode)
      this.skipList.add(start, true)
      if (nextStartValue === end) {
        this.skipList.delete(end)
      } else {
        this.skipList.add(end, false)
      }
      return
    }
  }
  remove(range) {
    this.validateParam(range)
    const [start, end] = range;
    if(start === end) return
    const startNode = this.skipList.findNode(start)

    if(startNode.next[0] === null) {
      return
    }

    const endNode = this.skipList.findNode(end)
    if(endNode.next[0] === null) {
      if(startNode.isStart) {
        while(startNode.next[0] !== null) {
          this.skipList.delete(startNode.next[0].value)
        }
        this.skipList.add(start, false)
        return
      } else {
        while(startNode.next[0] !== null) {
          this.skipList.delete(startNode.next[0].value)
        }
        return
      }
    }

    if (startNode === endNode) {
      const nextValue = startNode.next[0].value
      this.skipList.add(start, false)
      if(nextValue === end) {
        this.skipList.delete(end)
      } else {
        this.skipList.add(end, true)
      }
      return
    }

    if(startNode.isStart && endNode.isStart) {
      const nextNodeValue = endNode.next[0].value;
      this.deleteValues(startNode, endNode)
      if(nextNodeValue === end) {
        this.skipList.delete(end)
      } else {
        this.skipList.add(end, true);
      }
      this.skipList.add(start, false)
      return
    }

    if(startNode.isStart && !endNode.isStart) {
      this.deleteValues(startNode, endNode)
      this.skipList.add(start, false)
    }

    if(!startNode.isStart && endNode.isStart) {
      const nextNodeValue = endNode.next[0].value;
      this.deleteValues(startNode, endNode)
      if(nextNodeValue === end) {
        this.skipList.delete(end)
      } else {
        this.skipList.add(end, true)
      }
      
      return
    }

    if(!startNode.isStart && !endNode.isStart) {
      this.deleteValues(startNode, endNode)
      return
    }
  }
  print() {
    let head = this.skipList.dummyHead.next[0];
    let output = '';
    while(head !== null) {
      output += `[${head.value} ${head.next[0].value}) `
      head = head.next[0].next[0]
    }
    return output.slice(0, output.length - 1);
  }
  // delete values in [startNode.next, endNode]
  deleteValues(startNode, endNode = null) {
    const values = [];
    if(endNode === null) {
      while(startNode.next !== null && startNode.next[0]!== null) {
        values.push(startNode.next[0].value)
        startNode = startNode.next[0];
      }
    } else {
      while(startNode.next[0].value !== endNode.value) {
        values.push(startNode.next[0].value)
        startNode = startNode.next[0];
      }
      values.push(endNode.value)
    }
    values.forEach(value => this.skipList.delete(value))
  }

  // range must be array with 2 number
  validateParam(range) {
    if(Object.prototype.toString.call(range) !== '[object Array]') {
      throw ErrBadParam
    }
    if(range.length !== 2) {
      throw ErrBadParam
    }
    const [start, end] = range
    if(typeof start !== 'number' || typeof end !== 'number') {
      throw ErrBadParam
    }
    if(start > end) {
      throw ErrRange
    }
  }
}

module.exports = RangeList