import { Component } from 'react';

enum CellState {
  SOURCE,
  EMPTY,
  WALL,
  TARGET,
  WEIGHT
}

interface Props { 
  theme?: string,
  lightSymbolLink: string,
  darkSymbolLink: string,
  title?: JSX.Element,
  scale?: string,
  focusHeight?: string,
  color: string,
  darkColor?: string,
  hoverColor?: string,
  darkHoverColor?: string,
  onClick?: () => void
  isDisabled?: boolean,
  secondaryFunction?: (args1: CellState) => void,
  cellState?: CellState
}

interface State {
  focus: boolean
}


export default class InteractableGridCell extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false
    };
  }

  componentDidMount(): void {
    // console.log(this.props.focusHeight)
  }

  setIsFocus (isFocus: boolean): void {
    if (isFocus){
      this.setState({
        focus: true
      })
    } else {
      this.setState({
        focus: false
      })
    } 
  }

  render () {
    const { darkSymbolLink, lightSymbolLink, title, scale, focusHeight, theme, onClick, isDisabled, secondaryFunction, cellState} = this.props;

    const {
      color,
      darkColor,
      hoverColor,
      darkHoverColor
    } = this.props

    const { focus } = this.state;

    return (
      <div className="relative"
        onMouseEnter={() => this.setIsFocus(true)}
        onMouseLeave={() => this.setIsFocus(false)}
      >
        {
          secondaryFunction && !isDisabled ? 
          <div className={`bg-red-400 hover:bg-red-500 w-14 h-14 rounded-md ${focus ? '-translate-y-6' : ''} text-center duration-200 absolute cursor-pointer`}><span className='text-xs font-bold text-red-600 hover:text-red-400' onClick={() => secondaryFunction(cellState!)}>CLEAR</span></div> :
          null
        }
      
        <div 
          onClick={onClick} 
          className={`${focus ? hoverColor + ' ' + darkHoverColor : color + ' ' +  darkColor} w-14 ${focus ? title && !isDisabled ? focusHeight ? 'h-24' : 'h-20' : null : 'h-14'} duration-200 cursor-pointer absolute hover:drop-shadow-lg text-center rounded-md z-10`}
          >
            <img src={ theme === 'dark' ? darkSymbolLink : lightSymbolLink} alt="Italian Trulli" className={`${scale ? scale : 'scale-90'} fill-red-400 ${ isDisabled ? 'opacity-25' : ''}`} />
            <p className='text-xs font-semibold text-white dark:text-slate-800'>{ focus && !isDisabled ? title : ''}</p>
        </div>
      </div>
    )
  }
}



