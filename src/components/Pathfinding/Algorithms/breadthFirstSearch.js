const breadthFirstSearch = (grid, startNode, endNode) => {
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];

  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;

    if (closestNode === endNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);

    closestNode.isVisited = true;
    let unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (let unvisitedNeighbor of unvisitedNeighbors) {
      unvisitedNeighbor.previousNode = closestNode;
      if (neighborNotInUnvisitedNodes(unvisitedNeighbor, unvisitedNodes)) {
        unvisitedNodes.push(unvisitedNeighbor);
      }
    }
  }
  return visitedNodesInOrder;
};

const getUnvisitedNeighbors = (node, grid) => {
  let neighbors = [];
  let { x, y } = node;
  if (x !== 0) neighbors.push(grid[x - 1][y]);
  if (y !== grid[0].length - 1) neighbors.push(grid[x][y + 1]);
  if (x !== grid.length - 1) neighbors.push(grid[x + 1][y]);
  if (y !== 0) neighbors.push(grid[x][y - 1]);
  console.log(neighbors);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const neighborNotInUnvisitedNodes = (neighbor, unvisitedNodes) => {
  for (let node of unvisitedNodes) {
    if (node.x === neighbor.x && node.y === neighbor.y) {
      return false;
    }
  }
  return true;
};

export const getNodesInShortestPathOrderBFS = (endNode) => {
  let nodesInShortestPathOrder = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export default breadthFirstSearch;
