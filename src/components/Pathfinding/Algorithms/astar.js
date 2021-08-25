// const astar = (grid, startNode, endNode) => {
//   if (!startNode || !endNode || startNode === endNode) {
//     return false;
//   }

//   let unvisitedNodes = []; // Open list
//   let visitedNodesInOrder = []; // Closed list
//   startNode.distance = 0;
//   unvisitedNodes.push(startNode);

//   // While there are still nodes to visit
//   while (unvisitedNodes.length !== 0) {
//     unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);

//     // Gets the first unvisited node
//     let closestNode = unvisitedNodes.shift();
//     if (closestNode === endNode) return visitedNodesInOrder;

//     closestNode.isVisited = true;
//     visitedNodesInOrder.push(closestNode);

//     let neighbors = closestNode.neighbors;
//     console.log(neighbors);
//     for (let neighbor of neighbors) {
//       let distance = closestNode.distance + 1;

//       if (neighborNotInUnvisitedNodes(neighbor, unvisitedNodes)) {
//         unvisitedNodes.unshift(neighbor);
//         neighbor.distance = distance;
//         neighbor.totalDistance =
//           distance + manhattenDistance(neighbor, endNode);
//         neighbor.previousNode = closestNode;
//       } else if (distance < neighbor.distance) {
//         neighbor.distance = distance;
//         neighbor.totalDistance =
//           distance + manhattenDistance(neighbor, endNode);
//         neighbor.previousNode = closestNode;
//       }
//     }
//   }
//   console.log(visitedNodesInOrder);
//   return visitedNodesInOrder;
// };

// const neighborNotInUnvisitedNodes = (neighbor, unvisitedNodes) => {
//   for (let node of unvisitedNodes) {
//     if (node.x === neighbor.x && node.y === neighbor.y) {
//       return false;
//     }
//   }
//   return true;
// };

// const manhattenDistance = (node, endNode) => {
//   return Math.abs(node.x - endNode.x) + Math.abs(node.y - endNode.y);
// };

// export const getNodesInShortestPathOrderAstar = (endNode) => {
//   let nodesInsShortestPathOrder = [];
//   let currentNode = endNode;
//   while (currentNode !== null) {
//     // End node -> endnode.previousNode -> endnode.previousNode.previousNode
//     // Continue this loop until no more nodes
//     nodesInsShortestPathOrder.unshift(currentNode);
//     currentNode = currentNode.previousNode;
//   }
//   return nodesInsShortestPathOrder;
// };

// export default astar;

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

      return { path, visitedNodes };
    }

    // If current node isn't end node, remove it from openSet and push to closed set
    openSet = openSet.filter((elt) => elt !== currentNode);
    closedSet.push(currentNode);

    let neighbors = currentNode.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.isWall) {
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
