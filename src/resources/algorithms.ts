import { get } from "http";



enum CellState {
  SOURCE,
  EMPTY,
  WALL,
  TARGET
} 

interface Node {
  id: string,
  state: CellState,
  isVisited: boolean,
  distance: number,
  previousNode: Node | null
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
    
    let neighbours = getValidNeighbours(grid, width, visited, currentNode!)

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
    let currentNodeID = stack.pop();

    let neighbours = getValidNeighbours(grid, width, visited, currentNodeID!)

    for (let i = 0; i < neighbours.length; i++) {
      let currentNeighbour = neighbours[i]
      currentNeighbour!.previousNode = currentNodeID!
      stack.push(currentNeighbour);
    }

    visited.push(currentNodeID!);

    if (currentNodeID!.state === CellState.TARGET) {
      return visited;
    }
  }
  return visited
}  

export function aStar (grid: Node [], gridWidth: number, startNode: string): Node [] {
  return []
}


export function dijkstra(grid: Node [], gridWidth: number, startNode: Node) {
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

  // return []
}

function setNewDistances(grid: Node[], closestNode: Node, neighbourIDs: string []) {
  neighbourIDs.forEach(id => {
    getNode(grid, id)!.previousNode = closestNode
    getNode(grid, id)!.distance = closestNode.distance + 1
  });
}

export function getShortestPath(final: Node): Node[] {
  const output: Node [] = []
  let currentNode: Node | null = final;
  console.log(final)

  while (currentNode !== null) {
    output.push(currentNode);
    currentNode = currentNode.previousNode
  }
  return output
}

function sortNodesByDistance(nodes: Node []) {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getValidNeighbours (grid: Node [], gridWidth: number, visted: Node [], currentNode: Node): Node[] {

  const width = gridWidth;
  const height = grid.length / width;

  let output: Node[] = [];
  let x = currentNode.id.split(',')[0]
  let y = currentNode.id.split(',')[1]

  let left = getNode(grid, `${Number(x) - 1},${y}`.trim())
  console.log(left)
  if (left && left.state != CellState.WALL && !visted.includes(left)) {
    output.push(left)
  }

  let up = getNode(grid, `${x},${Number(y) - 1}`.trim())
  if (up && up.state != CellState.WALL && !visted.includes(up)) {
    output.push(up)
  }

  let right = getNode(grid, `${Number(x) + 1},${y}`.trim())
  if (right && right.state != CellState.WALL && !visted.includes(right)) {
    output.push(right)
  }
  
  let down = getNode(grid, `${x},${Number(y) + 1}`.trim())
  if (down && down.state != CellState.WALL && !visted.includes(down)) {
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

// //processing all the neighbours of v  
// for all neighbours w of v in Graph G
// if w is not visited 
//          Q.enqueue( w )             //Stores w in Q to further visit its neighbour
//          mark w as visited.