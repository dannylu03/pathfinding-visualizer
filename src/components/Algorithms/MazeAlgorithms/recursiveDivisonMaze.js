/*
1. Begin with empty field
2. Bisect field with wall (either horizontal or vertical) and add a single passage through the wall
3. Repeat step #2 with the areas on either side of the wall
4. continue recursively until maze reaches desired resolution
*/

let walls;
const recursiveDivisionMaze = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }

  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);

  walls = [];
  getRecursiveWalls(vertical, horizontal, grid, startNode, endNode);
};

const getRecursiveWalls = (vertical, horizontal, grid, startNode, endNode) => {
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
};

export default recursiveDivisionMaze;
