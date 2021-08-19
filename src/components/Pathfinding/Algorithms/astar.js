const astar = (startNode, endNode) => {
  let openSet = []; // Nodes have to visit
  let closedSet = []; // Nodes already visited
  let path = [];
  let visitedNodes = [];

  openSet.push(startNode);

  // While there are still nodes that need to be visited
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        // Will get the node with the lowest f value
        leastIndex = i;
      }
    }

    let currentNode = openSet[leastIndex];
    visitedNodes.push(currentNode);

    if (currentNode === endNode) {
      let temp = currentNode;
      path.push(temp);
      while (temp.previousNode) {
        path.push(temp.previousNode);
        temp = temp.previousNode;
      }
      return path;
    }

    // If current node isn't end node, remove it from openSet and push to closed set
    openSet = openSet.filter((elt) => elt !== currentNode);
    closedSet.push(currentNode);

    let neighbors = currentNode.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor)) {
        let tempG = currentNode.g + 1;
        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heruistic(neighbor, endNode);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previousNode = currentNode;
        }
      }
    }
  }
  return { path, visitedNodes, error: "No path found" };
};

const heruistic = (neighbor, endNode) => {
  let d = Math.abs(neighbor.x - neighbor.y) + Math.abs(endNode.x - endNode.y);
  return d;
};

export default astar;
