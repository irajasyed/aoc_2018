/*
- get input from File
- linked list
     - add
     - traverse
     - delete
- cancel out polarities of same char
   - mark change happened
- run in loop until no changes made in single loop happen
- print length of what remains
*/
const fs = require('fs')
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor (value) {
    this.head = new Node(value);
    this.tail = this.head;
    this.numberOfNodes = 1;
  }
  add (value) {
    let newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = this.tail.next;
    this.numberOfNodes++;
  }
  delete (prevNode, currentNode) {
    if (currentNode.next === null) { //tail
      this.tail = prevNode
    }
    if (!prevNode) { // Head
      this.head = currentNode.next;
    } else {
      prevNode.next = currentNode.next;
    }
    this.numberOfNodes--;
  }
}

function part1 (data, returnLength) {
  let linkedList = new LinkedList(data[0])
  for (let i=1; i < data.length; i++) {
    linkedList.add(data[i])
  }
  startReaction(linkedList)
  return linkedList.numberOfNodes
}

function part2 (data) {
  let unitLengths = {}
  data.split('').map(char => {
    let x = char.toLowerCase()
    if (!unitLengths.hasOwnProperty(x)) {
      unitLengths[x] = -1
    }
  })
  let units = Object.keys(unitLengths)
  let smallLength = Number.MAX_SAFE_INTEGER
  units.forEach(key => {
    let re = new RegExp(key, 'gi')
    unitLengths[key] = part1(data.replace(re, ''), true)
    if (smallLength > unitLengths[key]) {
      smallLength = unitLengths[key]
    }
  })
  return smallLength;
}

function scanPolymer () {
  fs.readFile('./input.txt', 'utf8', (err, data) => {
    console.log(part1(data, false))
    console.log(part2(data, true))
  })
}

function startReaction (linkedList) {
  let reactionHappened = true
  while (reactionHappened) {
    reactionHappened = false
    let currentNode = linkedList.head;
    let prevNode = null;
    while(currentNode) {
      let nextNode = currentNode.next;
      if (!nextNode) {
        break;
      }
      if (Math.abs(currentNode.value.charCodeAt() - nextNode.value.charCodeAt()) === 32) {
        reactionHappened = true;
        // Remove currentNode and NextNode
        linkedList.delete(prevNode, currentNode);
        linkedList.delete(currentNode, nextNode);
        if (nextNode) {
          if (prevNode) {
            prevNode.next = nextNode.next;
          }
          currentNode = nextNode.next;
        }
      } else {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
    }
  }

}
scanPolymer()