export function Aplus(grid, startNode, finishNode) {
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
    updateUnvisitedNeighborsinOrder(closestNode, grid, finishNode);
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

function updateUnvisitedNeighborsinOrder(node, grid, finishNode) {
  const UnvistedNeighbors = getUnivistedNeighbors(node, grid);
  let score = 0;
  //let minscore = Infinity;
  //let closeNeighbor;
  for (const Neighbor of UnvistedNeighbors) {
    score =
      //node.distance +
      //1 +
      Math.abs(Neighbor.row - finishNode.row) +
      Math.abs(Neighbor.col - finishNode.col);
    if (score <= Neighbor.distance) {
      Neighbor.distance = score;
      Neighbor.previousNode = node;
    }
    //if (score <= minscore) {
    //minscore = score;
    //closeNeighbor = Neighbor;
    //}
  }
  //closeNeighbor.distance = minscore;
  //closeNeighbor.previousNode = node;
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
