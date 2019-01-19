// part 1 works for both input
// working for sample input on part 2
const fs = require('fs')

function buildGraph (data) {
  let adjacencyList = {}
  let incomingEdges = {}
  data.split('\n').forEach(line => {
    let nodes = line.match(/Step\s(\w+).*step\s(\w{1})/).slice(1,3)
    if (adjacencyList[nodes[0]]) {
      adjacencyList[nodes[0]].push(nodes[1])
    } else {
      adjacencyList[nodes[0]] = [ nodes[1] ]
    }
    if (!adjacencyList[nodes[1]]) {
      adjacencyList[nodes[1]] = []
    }
    if (!incomingEdges[nodes[0]]) {
      incomingEdges[nodes[0]] = 0
    }
    incomingEdges[nodes[1]] = setIncomingEdges(nodes[1], incomingEdges)
  })
  return { adjacencyList, incomingEdges }
}

function setIncomingEdges (node, incomingEdges) {
  if (incomingEdges[node]) {
    return incomingEdges[node] + 1
  }
  return 1
}

function getStartingNodes (incomingEdges, allNodes) {
  let startingNodes = []
  for (let node of allNodes) {
    if (!incomingEdges[node]) {
      startingNodes.push(node)
    }
  }
  return startingNodes
}

function doBFSTraversal (graphData) {
  let output = []
  let graph = graphData.adjacencyList
  let incomingEdges = graphData.incomingEdges
  let allNodes = Object.keys(graphData.adjacencyList)
  let startingNodes = getStartingNodes(incomingEdges, allNodes)
  let unvisitedNodes = startingNodes.sort() // best option to use Min Binary Heap
  while (unvisitedNodes.length) {
    let currentNode = unvisitedNodes.shift()
    // console.log(unvisitedNodes, currentNode)
    output.push(currentNode)
    let outgoingEdges = graph[currentNode]
    // console.log(currentNode, 'out', outgoingEdges)
    for (let edge of outgoingEdges) {
      incomingEdges[edge]--;
      if (!incomingEdges[edge]) {
        unvisitedNodes.push(edge)
      }
    }
    unvisitedNodes = unvisitedNodes.sort()
  }
  return output.join('')
}

let t = 0;
let EV = [];
let Q = [];

function part2({ adjacencyList, incomingEdges}) {
  console.log(adjacencyList)
  incomingEdges = Object.assign(incomingEdges)
  let nodes = Object.keys(adjacencyList)
  for (let node of nodes) { // sorting to maintain alphabetical order
    adjacencyList[node] = adjacencyList[node].sort()
  }
  for (let node of nodes) {
    if (incomingEdges[node] === 0) {
      addTask(node)
    }
  }
  start_work()
  while(EV.length || Q.length) {
    let min = EV[0]
    for (let item of EV) {
      if (min[0] > item[0]) {
        min = item
      } else if (min[0] === item[0] && min[1] > item[1]) {
        min = item
      }
    }
    t = min[0];
    let x = min[1];
    console.log(t, x)
    EV = EV.filter(item =>  {
      return item[0] !== t && item[1] !== x
    })
    for (let node of adjacencyList[x]) {
      incomingEdges[node] -= 1
      if (incomingEdges[node] === 0) {
        addTask(node)
      }
    }
    start_work()
  }

  return t
}

function addTask(x) {
  Q.push(x)
}

function start_work () {
  while (EV.length < 2 && Q.length) {
    //  let xx = Q.sort()[0]
     let min = Q[0]
     for (let qItem of Q) {
       if (min > qItem) {
         min = qItem
       }
     }
     let xx = min
     Q = Q.filter(item => {
       return item !== xx
     })
     console.log('Starting ' + xx + ' at ' + t)
     EV.push([t + 1 + (xx.charCodeAt() - 'A'.charCodeAt()), xx])
  }
}

function getOrderOfSteps () {
  fs.readFile('./input.txt', 'utf8', (err, data) => {
      let graphData = buildGraph(data)
      // let orderOfSteps = doBFSTraversal(graphData)
      // console.log('Part 1:', orderOfSteps)
      console.log('Part 2:', part2(graphData))
  })
}
getOrderOfSteps()