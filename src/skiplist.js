const MaxLevel = 16;
const Factor = 0.25;

class Node {
  constructor(value = 0, size = 0, isStart = true) {
    this.isStart = isStart;
    this.value = value;
    this.next = new Array(size).fill(null)
  }
}

class Skiplist {
  constructor(maxLevel = MaxLevel, factor = Factor) {
    this.maxLevel = maxLevel;
    this.factor = factor;
    this.dummyHead = new Node(0, maxLevel)
    this.currentLevel = 1;  // range from 1 to maxLevel
  }

  // return the node where node.next >= value
  findNode(value) {
    let current = this.dummyHead;
    for (let i = this.currentLevel - 1; i >= 0; i--) {
      current = this.findClosest(current, i, value);
    }
    return current
  }

  add(val, isStart) {
    let level = this.randomLevel();
    let newNode = new Node(val, level, isStart)
    let updateNode = this.dummyHead

    for(let i = this.currentLevel - 1; i >= 0; i--) {
      updateNode = this.findClosest(updateNode, i, val);

      if (i < level) {
        if (updateNode.next[i] == null) {
          updateNode.next[i] = newNode;
        } else {
          let temp = updateNode.next[i]
          updateNode.next[i] =newNode
          newNode.next[i] = temp
        }
      }
    }

    if (level > this.currentLevel) {
      for(let i = this.currentLevel; i < level; i++) {
        this.dummyHead.next[i] = newNode;
      }
      this.currentLevel = level
    }
  }

  delete(val) {
    let flag = false;
    let searchNode = this.dummyHead;
    for(let i = this.currentLevel - 1; i >= 0; i--) {
      searchNode = this.findClosest(searchNode, i, val);
      if(searchNode.next[i] != null && searchNode.next[i].value === val) {
        searchNode.next[i] = searchNode.next[i].next[i];
        flag = true;
      }
    }
    return flag;
  }
  // randomLevel return level range from 1 to maxLevel
  randomLevel() {
    let level = 1;
    while(Math.random() < this.factor && level < this.maxLevel) {
      level++;
    }
    // return 1;
    return level;
  }

  findClosest(node, level, target) {
    while(node.next[level] != null && node.next[level].value < target) {
      node = node.next[level];
    }
    return node;
  }
}

module.exports = Skiplist;


// const s = new Skiplist();
// s.add(1)
// s.add(2)
// s.add(3)
// console.log(s.findNode(3))