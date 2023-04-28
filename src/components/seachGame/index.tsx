import { Component } from 'react';
import { Pages, SearchAction } from '../../config/enums';
import InteractableGridCell from '../interactableGridCell';
import GameCell from '../gameCell';
import DropDown from '../dropdown';

import sun from '../.././images/sun.png'
import moon from '../.././images/moon.png'

import back from '../.././images/back.png'
import back_dark from '../.././images/back_dark.png'


// search game
import star_gold from '../.././images/projects/game_search/star_gold.png' 

import bin from '../.././images/projects/game_search/bin.png' 
import bin_dark from '../.././images/projects/game_search/bin_dark.png'

import eraser_dark from '../.././images/projects/game_search/eraser_dark.png'

import wall from '../.././images/projects/game_search/wall.png'
import wall_dark from '../.././images/projects/game_search/wall.png'

import weight from '../.././images/projects/game_search/weight.png'

import play from '../.././images/projects/game_search/play.png'

import pause from '../.././images/projects/game_search/pause.png'

import reset from '../.././images/projects/game_search/reset.png'

import start from '../.././images/projects/game_search/start.png'

import { bfs, dfs, dijkstra, aStar, getShortestPath } from '../../resources/algorithms';

enum CellState {
  SOURCE,
  EMPTY,
  WALL,
  TARGET,
  WEIGHT
}

enum GameState {
  RUNNING,
  COMPLETE,
  PAUSED,
  IDLE,
}

interface Node {
  id: string,
  state: CellState,
  isVisited: boolean,
  isShortestPath: boolean
  distance: number,
  previousNode: Node | null,
  weight: number,
  score: number,
  direction: string
}

interface Props { 
  navigate: (arg0: Pages) => void,
  toggleDark: () => void,
  theme?: string,
}

interface State {
  currentAction: SearchAction,
  mouseDown: boolean,
  grid: Node[],
  startNode: string | null,
  goalNode: string | null
  gameState: GameState,
  sortCode: string | null
}


export default class SearchGame extends Component<Props, State> {
  WIDTH = 40;
  HEIGHT = 20
  
  constructor(props: Props) {
    super(props);
    this.state = {
      currentAction: SearchAction.IDLE,
      mouseDown: false,
      grid: [],
      startNode: null,
      goalNode: null,
      gameState: GameState.IDLE,
      sortCode: null
    }
    this.updateCellState = this.updateCellState.bind(this)
    this.setSortCode = this.setSortCode.bind(this)
    this.clearCellsOfState = this.clearCellsOfState.bind(this)
  }

  componentDidMount(): void {
    this.clearCellData() 
  }

  getGameCells (): JSX.Element[] {
    let gameGrid: JSX.Element[] = [];
    const {currentAction, mouseDown, grid} = this.state;
    for (let i = 0; i < grid.length; i++) {
      gameGrid.push(
        <GameCell 
          currentAction={currentAction}
          mouseDown={mouseDown}
          id={grid[i].id}
          updateCellState={this.updateCellState}
          cellState={grid[i].state}
          key={grid[i].id}
          isVisited={grid[i].isVisited}
          isShortestPath = {grid[i].isShortestPath}
          weight={grid[i].weight}
          direction={grid[i].direction}
        />
      )
    }
    return gameGrid;
  }

  updateCellState (id: string, state: CellState) {
    const { startNode, goalNode } = this.state;
 
    // handle single start pos
    if (state === CellState.SOURCE) {
      this.updateCellState(startNode!, CellState.EMPTY)
      this.setState({
        startNode: id
      })
    } 

    if (state === CellState.TARGET) {
      this.updateCellState(goalNode!, CellState.EMPTY)
      this.setState({
        goalNode: id
      })
    }

    // handle single end pos
    if (state === CellState.EMPTY && id === startNode) {
      this.setState({
        startNode: null
      })
    }

    if (state === CellState.EMPTY && id === goalNode) {
      this.setState({
        goalNode: null
      })
    }

    this.setState( prev => ({
      grid: prev.grid.map(x => {
        if (x.id === id) {
          if (state === CellState.WEIGHT) x.weight = 3
          else if (state === CellState.EMPTY) x.weight = 1
          x.state = state
        } 
        return x
      })
    }))
  }

  setCellVisited (id: string) {
    this.setState( prev => ({
      grid: prev.grid.map(x => {
        if (x.id === id) {
          x.isVisited = true;
        } 
        return x
      })
    }))
  }

  setCellShortestPath (id: string, direction: string) {
    this.setState( prev => ({
      grid: prev.grid.map(x => {
        if (x.id === id) {
          x.isShortestPath = true;
          x.direction = direction;
        } 
        return x
      })
    }))
  }

  clearCellsOfState (state: CellState) {
    this.setState( prev => ({
      grid: prev.grid.map(x => {
        if (x.state === state) {
          if (state === CellState.WEIGHT) x.weight = 1
          x.state = CellState.EMPTY
        } 
        return x
      })
    }))
  }
  
  clearCellData () {
    let temp: Node [] = []
    for (let row = 0; row < this.HEIGHT; row ++) {
      for (let col = 0; col < this.WIDTH; col++) {
        temp.push(this.createNode(col, row))
      }
    }
    this.setState({
      grid: temp
    })
  }

  setSortCode (code: string) {
    this.setState({
      sortCode: code
    })
  }

  resetCellData () {
    this.setState( prev => ({
      grid: prev.grid.map(x => {
        x.isShortestPath = false;
        x.isVisited = false;
        x.distance = Infinity;
        x.previousNode = null;
        x.score = Infinity
        x.direction = ''
        return x
      })
    }))
  }

  createNode (col: number, row: number) {
    return {
      id: `${col},${row}`,
      state: CellState.EMPTY,
      isVisited: false,
      isShortestPath: false,
      distance: Infinity,
      previousNode: null,
      weight: 1,
      score: Infinity,
      direction: ''
    }
  }

  getVisted (code: string) {
    const { grid, startNode, goalNode } = this.state;
    switch (code) {
      case 'Breadth First Search':
        return bfs(grid, this.WIDTH, this.getNode(grid, startNode!)!);
      case 'Depth First Search':
        return dfs(grid, this.WIDTH, this.getNode(grid, startNode!)!);
      case 'A Star':
        return aStar(grid, this.WIDTH, this.getNode(grid, startNode!)!, this.getNode(grid, goalNode!)!)
      case 'Dijkstra`s':
        return dijkstra(grid, this.WIDTH, this.getNode(grid, startNode!)!);
    }
    return [];
  }

  animate (): void {
    const {startNode, goalNode, sortCode } = this.state;
    
    if (startNode === null) {
      alert('add start node')
      return
    }

    if (goalNode === null) {
      alert('add goal node')
      return
    }

    if (!sortCode) {
      alert('select sort')
      return
    }

    this.setState({
      gameState: GameState.RUNNING
    })

    const visistedInOrder = this.getVisted(sortCode)
    // get visted order, and display it
    for (let i = 0; i < visistedInOrder!.length; i++) {
      setTimeout(() => {
        this.setCellVisited(visistedInOrder[i].id)
      }, i * 10)
    }
  
    const shortestPath = getShortestPath(visistedInOrder[visistedInOrder.length - 1])

    if (visistedInOrder[visistedInOrder.length - 1].state === CellState.TARGET) {
      // target was reached
      // get shortest path, and display it
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          this.setCellShortestPath(shortestPath[i].id, shortestPath[i].direction)
          
        }, (visistedInOrder!.length * 10) + (i * 20))
      }
    } else {
      // nothing yet
    }
    //set complete, timeout to trigger after animation
    setTimeout(() => {
      this.setState({ gameState: GameState.COMPLETE })
    }, (visistedInOrder!.length * 10) + (visistedInOrder[visistedInOrder.length - 1].state === CellState.TARGET ? shortestPath!.length * 20 : 0))
  }

  getNode (grid: Node [], id: string): Node | null {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].id === id) return grid[i]
    }
    return null;
  }

  render () {
    const {navigate, theme, toggleDark} = this.props;
    const { currentAction, gameState } = this.state;
    let controls: JSX.Element[] = []
    const redElement: JSX.Element = <div className={`${'bg-blue-300'} ${'hover:bg-blue-400'} ${'dark:bg-slate-600'} ${'hover:dark:bg-blue-200'} w-14 h-14 duration-200 rounded-md`}></div>

    for (let i = 0; i < 20; i++) {
      // dark toggle
      if (i === 0) {
        controls.push(
        <InteractableGridCell 
          onClick={toggleDark} 
          theme={theme} 
          lightSymbolLink={sun} 
          darkSymbolLink={moon} 
          color='bg-blue-300'
          darkColor='dark:bg-black'
          hoverColor='bg-blue-400'
          darkHoverColor='dark:bg-zinc-800'
          scale='scale-75'
          />)
        continue;
      }

      // start 
      if (i === 1) {
        controls.push(
        <InteractableGridCell 
          title={<span>Source</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.setState( {currentAction: SearchAction.SOURCE} )
            }
          }}
          theme={theme} 
          lightSymbolLink={start} 
          darkSymbolLink={start} 
          color={currentAction === SearchAction.SOURCE ? 'bg-red-300' : 'bg-blue-300'}
          hoverColor={'hover:bg-blue-400'}
          darkColor={currentAction === SearchAction.SOURCE ? 'bg-red-300' : 'dark:bg-slate-600'}
          darkHoverColor={'hover:dark:bg-blue-200'}
          scale='scale-75'
          isDisabled={ gameState !== GameState.IDLE }
        />)
        continue;
      }

      // target
      if (i === 2) {
        // target
        controls.push(
        <InteractableGridCell 
          title={<span>Target</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.setState( {currentAction: SearchAction.TARGET} )
            }
          }}
          theme={theme} 
          lightSymbolLink={star_gold} 
          darkSymbolLink={star_gold} 
          color={currentAction === SearchAction.TARGET ? 'bg-red-300' : 'bg-blue-300'}
          hoverColor={'hover:bg-blue-400'}
          darkColor={currentAction === SearchAction.TARGET ? 'bg-red-300' : 'dark:bg-slate-600'}
          darkHoverColor={'hover:dark:bg-blue-200'}
          scale='scale-75'
          isDisabled={gameState !== GameState.IDLE }
        />)
        continue;
      }


      //
      //    ADDITIONAL TARGETS
      //
      //

      // wall
      if (i === 4) {
        controls.push(
        <InteractableGridCell 
          title={<span>Wall</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.setState( {currentAction: SearchAction.WALL} )
            }
          }}
          theme={theme} 
          lightSymbolLink={wall} 
          darkSymbolLink={wall_dark} 
          color={currentAction === SearchAction.WALL ? 'bg-red-300' : 'bg-blue-300'}
          hoverColor={'bg-blue-400'}
          darkColor={currentAction === SearchAction.WALL ? 'bg-red-300' : 'dark:bg-slate-600'}
          darkHoverColor={'dark:bg-blue-200'}
          scale='scale-[0.65]'
          isDisabled={gameState !== GameState.IDLE }
          secondaryFunction={this.clearCellsOfState}
          cellState={CellState.WALL}
        />)
        continue;
      }

      // weight
      if (i === 5) {
        controls.push(
        <InteractableGridCell 
          title={<span>Weight</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.setState( {currentAction: SearchAction.WEIGHT} )
            }
          }}
          theme={theme} 
          lightSymbolLink={weight} 
          darkSymbolLink={weight} 
          color={currentAction === SearchAction.WEIGHT ? 'bg-red-300' : 'bg-blue-300'}
          hoverColor={'bg-blue-400'}
          darkColor={currentAction === SearchAction.WEIGHT ? 'bg-red-300' : 'dark:bg-slate-600'}
          darkHoverColor={'dark:bg-blue-200'}
          scale='scale-[0.65]'
          isDisabled={gameState !== GameState.IDLE }
          secondaryFunction={this.clearCellsOfState}
          cellState={CellState.WEIGHT}
        />)
        continue;
      }
      
      // erase
      if (i === 6) {
        controls.push(
        <InteractableGridCell 
          title={<span>Erase</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.setState( {currentAction: SearchAction.CLEAR} )
            }
          }}
          theme={theme} 
          lightSymbolLink={eraser_dark} 
          darkSymbolLink={eraser_dark} 
          color={currentAction === SearchAction.CLEAR ? 'bg-red-300' : 'bg-blue-300'}
          hoverColor='hover:bg-red-500'
          darkColor={currentAction === SearchAction.CLEAR ? 'bg-red-300' : 'dark:bg-slate-600'}
          darkHoverColor='hover:dark:bg-red-500'
          scale='scale-75'
          isDisabled={gameState !== GameState.IDLE }
        />)
        continue;
      }

      // start_game
      if (i === 7) {
        controls.push(
        <InteractableGridCell 
          title={<span>Start</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.setState({ currentAction:SearchAction.IDLE })
              this.animate()
            }
          }}
          theme={theme} 
          lightSymbolLink={gameState === GameState.IDLE || gameState === GameState.COMPLETE ? play : pause} 
          darkSymbolLink={gameState === GameState.IDLE || gameState === GameState.COMPLETE ? play : pause} 
          color='bg-green-300'
          hoverColor='hover:bg-green-400'
          darkColor='dark:bg-green-400'
          darkHoverColor='hover:dark:bg-green-300'
          scale='scale-75'
          isDisabled={ gameState === GameState.COMPLETE }
        />)
        continue;
      }

      // reset
      if (i === 8) {
        controls.push(
        <InteractableGridCell 
          title={<span>Reset</span>}
          onClick={() => {
            if (gameState === GameState.COMPLETE) {
              this.resetCellData(); this.setState({ gameState: GameState.IDLE }) 
            }
          }}
          theme={theme} 
          lightSymbolLink={reset} 
          darkSymbolLink={reset} 
          color='bg-blue-300'
          hoverColor='hover:bg-blue-400'
          darkColor='dark:bg-blue-400'
          darkHoverColor='hover:dark:bg-blue-300'
          scale='scale-75'
          isDisabled={ gameState !== GameState.COMPLETE }
        />)
        continue;
      }

      if (i === 12) {
        controls.push(
          <DropDown
            options={['Breadth First Search', 'Depth First Search', 'A Star', 'Dijkstra`s']}
            setSortCode={this.setSortCode}
            isDisabled={ gameState !== GameState.IDLE}
            color='bg-blue-300'
            hoverColor='hover:bg-blue-400'
            darkColor='dark:bg-slate-600'
            darkHoverColor='hover:dark:bg-blue-200'
          />
        )
        continue;
      }
      
      // clear 
      if (i === 18) {
        // clear
        controls.push(
        <InteractableGridCell 
          title={<span>CLEAR<br/>ALL</span>}
          onClick={() => {
            if (gameState === GameState.IDLE) {
              this.clearCellData()
            }
          }}
          theme={theme} 
          lightSymbolLink={bin} 
          darkSymbolLink={bin_dark} 
          color='bg-red-400' 
          hoverColor='hover:bg-red-500'
          darkColor='dark:bg-red-400'
          darkHoverColor='hover:dark:bg-red-500'
          scale='scale-75'
          focusHeight='24'
          isDisabled={ gameState !== GameState.IDLE }
        />)
        continue;
      }

      // exit
      if (i === 19) {
      controls.push(
      <InteractableGridCell 
        title={<span>Exit</span>}
        onClick={() => navigate(Pages.PROJECTS)}
        theme={theme} 
        lightSymbolLink={back} 
        darkSymbolLink={back_dark} 
        color='bg-blue-500' 
        hoverColor='hover:bg-blue-600'
        scale='scale-75'
      />)
      continue;
      } 
      controls.push(
        redElement
      )
    }

    return (
      <div className='h-max'
        onMouseDown={() => this.setState({mouseDown: true})}
        onMouseUp={() => this.setState({mouseDown: false})}
        onMouseLeave={() => this.setState({mouseDown: false})}
      >
        <div className={`grid gap-2 grid-cols-20 grid-rows-1 w-max`}>
          {controls}
        </div>
        <div className={`grid gap-1 grid-cols-40 grid-rows-1 w-max pt-1`}>
          { this.getGameCells() }
        </div>
      </div>
    )
    
    
  }
} 



