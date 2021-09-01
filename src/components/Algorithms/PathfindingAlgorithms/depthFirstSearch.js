/* IMPLEMENTATION
1. Add root node to stack
2. Loop on the stack as long it's not empty
  1. Get node at top of the stack (current), mark as visited and remove it
  2. For every unvisited child of current node:
    1. Check if it's the endNode, if so return the childNode
    2. Otherwise, push it to the stack
3. If stack is empty, then endNode was not found.
*/

const depthFirstSearch = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }

  let unvisitedNodes = []; // Stack
  let visitedNodesInOrder = [];

  unvisitedNodes.push(startNode); // Add root node to stack

  // Loop on stack as long as it's not empty
  while (unvisitedNodes.length !== 0) {
    // Removes startNode and assigns closestNode to it's value
    let closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    if (closestNode === endNode) return visitedNodesInOrder;

    // Mark as visited
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;

    // Get unvisited child nodes (Neighbors)
    let unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (let unvisitedNeighbor of unvisitedNeighbors) {
      unvisitedNeighbor.previousNode = closestNode;
      unvisitedNodes.unshift(unvisitedNeighbor); // Push to stack
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

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getNodesInShortestPathOrderDFS = (endNode) => {
  let nodesInsShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInsShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInsShortestPathOrder;
};

export default depthFirstSearch;
