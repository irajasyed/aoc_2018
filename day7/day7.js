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

function getOrderOfSteps () {
  fs.readFile('./input.txt', 'utf8', (err, data) => {
      let graphData = buildGraph(data)
      let orderOfSteps = doBFSTraversal(graphData)
      console.log('Part 1:', orderOfSteps)
  })
}
getOrderOfSteps()