enum CellState {
  SOURCE,
  EMPTY,
  WALL,
  TARGET,
  WEIGHT
} 

interface Node {
  id: string,
  state: CellState,
  isVisited: boolean,
  distance: number,
  previousNode: Node | null,
  weight: number,
  score: number,
  direction: string
}

function getNode (grid: Node [], id: string): Node | null {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].id === id) return grid[i]
  }
  return null;
}

export function bfs (grid: Node [], gridWidth: number, startNode: Node): Node [] {
  const width = gridWidth;

  let queue: Node [] = [];
  let visited: Node [] = [];

  queue.push(startNode);
  visited.push(startNode);

  while (queue.length > 0) {
    let currentNode = queue.shift();
    
    let neighbours = getValidNeighbours(grid, width, currentNode!, visited)

    for (let i = 0; i < neighbours.length; i++) {
      let currentNeighbour = neighbours[i]

      currentNeighbour.previousNode = currentNode!
      
      queue.push(currentNeighbour);
      visited.push(currentNeighbour);

      if (neighbours[i]?.state === CellState.TARGET) {
        return visited
      }
    }
  }
 
  return visited
}  

export function dfs (grid: Node [], gridWidth: number, startNode: Node): Node [] {
  const width = gridWidth;

  let stack: Node [] = [];
  let visited: Node [] = [];

  stack.push(startNode);
  visited.push(startNode);

  while (stack.length > 0) {
    let currentNode = stack.pop();

    let neighbours = getValidNeighbours(grid, width, currentNode!, visited)

    for (let i = 0; i < neighbours.length; i++) {
      let currentNeighbour = neighbours[i]
      currentNeighbour!.previousNode = currentNode!
      stack.push(currentNeighbour);
    }

    visited.push(currentNode!);

    if (currentNode!.state === CellState.TARGET) {
      return visited;
    }
  }
  return visited
}  

export function aStar (grid: Node [], gridWidth: number, startNode: Node, targetNode: Node): Node [] {
  const width = gridWidth;

  let visited: Node [] = [];

  visited.push(startNode);

  let openList: Node [] = [];
  let closedList: Node [] = [];

  openList.push(startNode)
  startNode.score = 0 + getDistance(startNode, targetNode)
  console.log(startNode.score)

  while (openList.length > 0) {
    sortNodesByScore(openList);
    let currentNode = openList.shift();
    visited.push(currentNode!)

    if (currentNode!.state === CellState.TARGET) {
      return visited;
    }

    closedList.push(currentNode!)

    let neighbours = getValidNeighbours(grid, width, currentNode!, closedList)

    for (let i = 0; i < neighbours.length; i++) {
      let currentNeighbour = neighbours[i]
      let cost = getDistance(startNode, currentNode!) + getDistance(currentNode!, currentNeighbour);

      if (openList.includes(currentNeighbour) && cost < getDistance(startNode, currentNeighbour)) {
        // remove current neighbour from openList
        openList = openList.filter(item => {
          return item.id !== currentNeighbour.id ? true : false 
        })
      }

      if (closedList.includes(currentNeighbour) && cost < getDistance(startNode, currentNeighbour)) {
        console.log(currentNeighbour.id)
        // remove current neighbour from closed list
        closedList = closedList.filter(item => {
          return item.id !== currentNeighbour.id ? true : false 
        })
      }

      if (!openList.includes(currentNeighbour) && !closedList.includes(currentNeighbour)) {
        currentNeighbour!.previousNode = currentNode!
        currentNeighbour.score = getDistance(startNode, currentNeighbour) + getDistance(currentNeighbour, targetNode);
        openList.push(currentNeighbour);
      }
    }
  }
  return visited
}


// export function aStar (grid: Node [], gridWidth: number, startNode: Node, targetNode: Node): Node [] {
//   const width = gridWidth;

//   let visited: Node [] = [];

//   let openList: Node [] = [];
//   let closedList: Node [] = [];

//   openList.push(startNode)

//   startNode.distance = 0;

//   startNode.score = startNode.distance + getDistance(startNode, targetNode)

//   while (openList.length > 0) {
//     sortNodesByScore(openList);
//     let currentNode = openList.shift();
//     visited.push(currentNode!)

//     if (currentNode!.state === CellState.TARGET) {
//       console.log(visited)
//       return visited; /// !!!!!!
//     }

//     let neighbours = getValidNeighbours(grid, width, currentNode!, [])

//     for (let i = 0; i < neighbours.length; i++) {
//       let currentNeighbour = neighbours[i]

//       let neighbour_current_cost = currentNode!.distance + getDistance(currentNode!, currentNeighbour)

//       if (openList.includes(currentNeighbour) && getDistance(startNode, currentNeighbour) <= neighbour_current_cost) {
//         continue;
//       } else if (closedList.includes(currentNeighbour) && getDistance(startNode, currentNeighbour) <= neighbour_current_cost) {
//         openList.push(currentNeighbour);
//         closedList = closedList.filter(item => {
//           return item.id !== currentNeighbour.id ? true : false 
//         })
//       } else {
//         openList.push(currentNeighbour);
//       }
//       currentNeighbour.distance = neighbour_current_cost
//       currentNeighbour.previousNode = currentNode!
//       currentNeighbour.score = neighbour_current_cost + getDistance(currentNeighbour, targetNode)
//     }
  
//     closedList.push(currentNode!)

   
//   }
  
//   return visited
// }

export function dijkstra(grid: Node [], gridWidth: number, startNode: Node): Node [] {
  const width = gridWidth;

  let queue: Node [] = [];
  let visited: Node [] = [];

  grid.forEach(node => {
    queue.push(node)
  })

  visited.push(startNode);

  startNode.distance = 0

  while (queue.length > 0) {
    sortNodesByDistance(queue);

    let currentNode = queue.shift();
    visited.push(currentNode!)

    let neighbours = getValidNeighbours(queue, width, currentNode!, visited)

    for (let i = 0; i < neighbours.length; i++) {
      let currentNeighbour = neighbours[i]

      let temp = currentNode!.distance + currentNeighbour.weight
      if (temp < currentNeighbour.distance) {
        currentNeighbour.distance = temp
        currentNeighbour.previousNode = currentNode!
      }

      if (currentNeighbour.distance === Infinity) return visited

      if (currentNode!.state === CellState.TARGET) {
        return visited;
      }
    }
  }
  return visited
  
  // const width = gridWidth;

  // let visited: Node [] = []

  // startNode.distance = 0
  
  // while (grid.length > 0) {
    
  //   sortNodesByDistance(grid);
  //   const closestNode: Node = grid.shift()!;

  //   if (closestNode.state === CellState.WALL) {
  //     continue;
  //   }

  //   if (closestNode.distance === Infinity) {
  //     return visited
  //   }

  //   visited.push(closestNode.id)

  //   if (closestNode.state === CellState.TARGET) {
  //     // return getShortestPath(closestNode)
  //     return getShortestPath(closestNode)
  //   }
    
  //   setNewDistances(grid, closestNode, getValidNeighbours(grid, width, visited, closestNode.id))
  // }
}

function getDistance (node1: Node, node2: Node): number {
  const node1X = parseInt(node1.id.split(',')[0]);
  const node1Y = parseInt(node1.id.split(',')[1]);
  const node2X = parseInt(node2.id.split(',')[0]);
  const node2Y = parseInt(node2.id.split(',')[1]);

  const diffX = Math.abs(node2X - node1X);
  const diffY = Math.abs(node2Y - node1Y);
  // return diffX + diffY
  return Math.sqrt(diffX ** 2 + diffY ** 2);
}

export function getShortestPath(final: Node): Node[] {
  let path: Node [] = []
  let currentNode: Node | null = final;

  while (currentNode !== null) {
    let temp = currentNode;
    path.push(temp);
    currentNode = currentNode.previousNode
  }

  for (let i = 0; i < path.length; i++) {
    
    if (path[i].state !== CellState.TARGET && path[i].state !== CellState.SOURCE) {
      let previousX = parseInt(path[i-1].id.split(',')[0].trim());
      let previousY = parseInt(path[i-1].id.split(',')[1].trim());
      let currentX = parseInt(path[i].id.split(',')[0].trim());
      let currentY = parseInt(path[i].id.split(',')[1].trim());
      let nextX = parseInt(path[i+1].id.split(',')[0].trim());
      let nextY = parseInt(path[i+1].id.split(',')[1].trim());

      if (currentX === previousX && currentX === nextX) {
        path[i].direction = 'x'
      } else if (currentY === previousY && currentY === nextY) {
        path[i].direction = 'y'
      } else if ((currentX < previousX && currentX === nextX) && (currentY === previousY && currentY < nextY)) {      
        // right to bottom
        path[i].direction = 'br'
      } else if ((currentX === previousX && currentX < nextX) && (currentY < previousY && currentY === nextY)) {      
        // bottom to right
        path[i].direction = 'br'
      } else if ((currentX > previousX && currentX === nextX) && (currentY === previousY && currentY < nextY)) {
        // left to bottom
        path[i].direction = 'bl'
      } else if ((currentX === previousX && currentX > nextX) && (currentY < previousY && currentY === nextY)) {
        // bottom to left
        path[i].direction = 'bl'
      } else if ((currentX > previousX && currentX === nextX) && (currentY === previousY && currentY > nextY)) {
        // left to top
        path[i].direction = 'tl'
      } else if ((currentX === previousX && currentX > nextX) && (currentY > previousY && currentY === nextY)) {
        // top to left
        path[i].direction = 'tl'
      } else if ((currentX < previousX && currentX === nextX) && (currentY === previousY && currentY > nextY)) {
        // right to top
        path[i].direction = 'tr'
      } else if ((currentX === previousX && currentX < nextX) && (currentY > previousY && currentY === nextY)) {
        // top to right
        path[i].direction = 'tr'
      }
    }
  }
  return path
}

function sortNodesByDistance(nodes: Node []) {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function sortNodesByScore(nodes: Node []) {
  nodes.sort((nodeA, nodeB) => nodeA.score - nodeB.score);
}

function getValidNeighbours (grid: Node [], gridWidth: number, currentNode: Node, visted?: Node []): Node[] {
  let output: Node[] = [];
  let x = currentNode.id.split(',')[0]
  let y = currentNode.id.split(',')[1]

  let left = getNode(grid, `${Number(x) - 1},${y}`.trim())
  if (left && left.state !== CellState.WALL && !visted!.includes(left)) {
    output.push(left)
  }

  let up = getNode(grid, `${x},${Number(y) - 1}`.trim())
  if (up && up.state !== CellState.WALL && !visted!.includes(up)) {
    output.push(up)
  }

  let right = getNode(grid, `${Number(x) + 1},${y}`.trim())
  if (right && right.state !== CellState.WALL && !visted!.includes(right)) {
    output.push(right)
  }
  
  let down = getNode(grid, `${x},${Number(y) + 1}`.trim())
  if (down && down.state !== CellState.WALL && !visted!.includes(down)) {
    output.push(down)
  }

  return output;
}

// export function breadthFirstSearch (graph: {[key: string]: CellState}, startNode: string, height: number, width: number): void {
//   let queue: string[] = [];
//   let visited: string [] = [];

//   queue.push(startNode);
//   visited.push(startNode);

//   while (queue.length > 0) {
//     let currentNode = queue.shift();
//     let neighbours = getNeighbours(currentNode)

//     for (let i = 0; i < neighbours.length; i++) {
//       let currentNeighbour = neighbours[i].trim()
//       if (currentNeighbour.includes('-')) {
//         continue;
//       } 
//       if (currentNeighbour.split(',')[0] === height.toString()) {
//         continue;
//       } 

//       if (currentNeighbour.split(',')[1] === width.toString()) {
//         continue;
//       } 

//       if (visited.includes(currentNeighbour)) {

//         continue;
//       }
//       if (graph[currentNeighbour] === CellState.WALL) { 
//         continue;
//       }

//       if (graph[currentNeighbour] === CellState.GOAL) {
        
//       }
     
//       queue.push(currentNeighbour);
//       visited.push(currentNeighbour);
//     }
//   }
// }
