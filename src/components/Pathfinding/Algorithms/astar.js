import React from "react";

const astar = (startNode, endNode) => {
  let openSet = [];
  let closedSet = [];
  let path = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }
    let current = openSet[leastIndex];

    if (current === endNode) {
      console.log("Path found");
    }
    openSet = openSet.filter((node) => node !== current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbor[i];
      if (!closedSet.includes(neighbor)) {
        let tempG = current.g + 1;
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
          neighbor.f = neighbor.h + neighbor.g;
          neighbor.previousNode = current;
        }
      }
    }
  }
};

const heruistic = (neighbor, endNode) => {
  let d = Math.abs(neighbor.x - neighbor.y) + Math.abs(endNode.x - endNode.y);
  return d;
};

export default astar;
