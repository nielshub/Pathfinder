export function Dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const UnvistedNeighbors = getUnivistedNeighbors(node, grid);
  for (const Neighbor of UnvistedNeighbors) {
    if (node.distance + 1 <= Neighbor.distance) {
      Neighbor.distance = node.distance + 1;
      Neighbor.previousNode = node;
    }
  }
}

function getUnivistedNeighbors(node, grid) {
  const Neighbors = [];
  const { col, row } = node;
  if (row > 0) Neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) Neighbors.push(grid[row + 1][col]);
  if (col > 0) Neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) Neighbors.push(grid[row][col + 1]);
  return Neighbors.filter((Neighbor) => !Neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
