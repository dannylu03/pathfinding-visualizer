const dijkstras = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }

  startNode.distance = 0; // Initial cost
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];

  for (let row of grid) {
    for (let node of row) {
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let closestNode = unvisitedNodes.shift(); // Removes first node in array and assigns value to closestNode

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === endNode) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    let unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (let unvisitedNeighbor of unvisitedNeighbors) {
      unvisitedNeighbor.distance = closestNode.distance + 1;
      unvisitedNeighbor.previousNode = closestNode;
    }
  }
};

const getUnvisitedNeighbors = (node, grid) => {
  let neighbors = [];
  let { x, y } = node;

  if (x !== 0) neighbors.push(grid[x - 1][y]);
  if (y !== grid[0].length - 1) neighbors.push(grid[x][y + 1]);
  if (x !== grid.length - 1) neighbors.push(grid[x + 1][y]);
  if (y !== 0) neighbors.push(grid[x][y - 1]);

  return neighbors.filter(
    (neighbor) => !neighbor.isWall && !neighbor.isVisited
  );
};

const neighborNotInUnvisitedNodes = (neighbor, unvisitedNodes) => {
  for (let node of unvisitedNodes) {
    if (node.x === neighbor.x && node.y === neighbor.y) {
      return false;
    }
  }
  return true;
};

export const getNodesInShortestPathOrderDijkstra = (endNode) => {
  let nodesInShortestPathOrder = [];
  let currentNode = endNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export default dijkstras;
