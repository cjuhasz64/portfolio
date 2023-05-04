import { Component } from 'react';
import { SearchAction, CellState  } from '../../config/enums';

import star_gold from '../.././images/projects/game_search/star_gold.png' 
import start from '../.././images/projects/game_search/start.png' 
import weight from '../.././images/projects/game_search/weight.png' 


interface Props { 
  currentAction: SearchAction,
  mouseDown: boolean,
  id: string,
  updateCellState: (args0: string, args1: CellState) => void,
  cellState: CellState,
  isVisited: boolean,
  isShortestPath: boolean,
  weight: number,
  direction: string
}

interface State {
  focus: boolean
}

export default class GameCell extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  componentDidMount(): void {
  }

  setCellState (): void {
    const {currentAction, updateCellState, id} = this.props;

    if (currentAction === SearchAction.TARGET) {
      updateCellState(id, CellState.TARGET)
    } else if (currentAction === SearchAction.CLEAR) {
      updateCellState(id, CellState.EMPTY)
    } else if (currentAction === SearchAction.WALL) {
      updateCellState(id, CellState.WALL)
    } else if (currentAction === SearchAction.SOURCE) {
      updateCellState(id, CellState.SOURCE)
    } else if (currentAction === SearchAction.WEIGHT) {
      updateCellState(id, CellState.WEIGHT)
    }
  }

  getShortestPathSVG (direction: string): JSX.Element | null {
    const { isShortestPath } = this.props;
    if (!isShortestPath) return null;

    if (direction === 'y'){
      return  <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" transform='rotate(90)' className='relative'>
                <line x1="14" y1="0" x2="14" y2="28" stroke="rgb(168 85 247)" strokeWidth="12"/>
              </svg>
    } else if (direction === 'x'){
      return  <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" className='relative'>
                <line x1="14" y1="0" x2="14" y2="28" stroke="rgb(168 85 247)" strokeWidth="12" />
              </svg> 
    } else if (direction === 'bl'){
      return  <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)' className='relative'>
                <line x1="14" y1="0" x2="14" y2="20" stroke="rgb(168 85 247)" strokeWidth="12"/>
                <line x1="8" y1="14" x2="28" y2="14" stroke="rgb(168 85 247)" strokeWidth="12"/>
              </svg>
    } else if (direction === 'tl'){
      return  <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" transform='rotate(270)' className='relative'>
                <line x1="14" y1="0" x2="14" y2="20" stroke="rgb(168 85 247)" strokeWidth="12"/>
                <line x1="8" y1="14" x2="28" y2="14" stroke="rgb(168 85 247)" strokeWidth="12"/>
              </svg>
    } else if (direction === 'tr'){
      return  <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" transform='' className='relative'>
                <line x1="14" y1="0" x2="14" y2="20" stroke="rgb(168 85 247)" strokeWidth="12"/>
                <line x1="8" y1="14" x2="28" y2="14" stroke="rgb(168 85 247)" strokeWidth="12"/>
              </svg>
    } else if (direction === 'br'){
      return  <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" transform='rotate(90)' className='relative'>
                <line x1="14" y1="0" x2="14" y2="20" stroke="rgb(168 85 247)" strokeWidth="12"/>
                <line x1="8" y1="14" x2="28" y2="14" stroke="rgb(168 85 247)" strokeWidth="12"/>
              </svg>
    }
    return null;
  }

  render () {
    const { currentAction, mouseDown, id, cellState, isVisited, isShortestPath, direction } = this.props;
   
     return (
        <div 
            id={id}
            className={`w-[1.745rem] h-[1.745rem] ${cellState === CellState.WALL ? 'bg-black' : isVisited === true ? isShortestPath ? 'bg-purple-400' : 'bg-red-400' : 'bg-blue-300 dark:bg-slate-600 hover:bg-blue-400 hover:dark:bg-blue-200'} duration-200 rounded-md ${currentAction !== SearchAction.IDLE ? 'cursor-pointer' : ''} select-none ${isShortestPath ? 'animate-pulse' : ''} relative`}
            onClick={() => this.setCellState()}
            onMouseOver={() => mouseDown && currentAction !== SearchAction.SOURCE && currentAction !== SearchAction.TARGET ? this.setCellState() : null} // does the job
          >
            
          {
            cellState === CellState.TARGET ?
            <img src={star_gold} alt="Italian Trulli" className={'scale-50'}/> :
            null
          }

          {
            cellState === CellState.SOURCE ?
            <img src={start} alt="Italian Trulli" className={'scale-50'}/> :
            null
          } 

          { 
            cellState === CellState.WEIGHT ?
            <img src={weight} alt="Italian Trulli" className={'scale-[.6] absolute z-20'}/> :
            null
          }
          { this.getShortestPathSVG(direction) }
        </div>
    )
  }
}



