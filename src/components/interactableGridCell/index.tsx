import { Component } from 'react';
import { CellState } from '../../config/enums';

interface Props { 
  theme?: string,
  lightSymbolLink: string,
  darkSymbolLink: string,
  title?: JSX.Element,
  scale?: string,
  customTranslate?: string,
  color: string,
  darkColor?: string,
  hoverColor?: string,
  darkHoverColor?: string,
  onClick?: () => void
  isDisabled?: boolean,
  secondaryFunction?: (args1: CellState) => void,
  cellState?: CellState,
  getAttention?: boolean,
  popup?: string
}

interface State {
  hover: boolean,
  showPopup: boolean
}


export default class InteractableGridCell extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      hover: false,
      showPopup: false
    };
  }

  setIsFocus (isFocus: boolean): void {
    if (isFocus){
      this.setState({
        hover: true
      })
    } else {
      this.setState({
        hover: false
      })
    } 
  }

  triggerPopup () {
    this.setState({ showPopup: true })
    setTimeout(() => {
      this.setState({ showPopup: false })
    }, 1000)
  }

  render () {
    const { darkSymbolLink, lightSymbolLink, title, scale, customTranslate, theme, onClick, isDisabled, secondaryFunction, cellState, getAttention, popup} = this.props;

    const {
      color,
      darkColor,
      hoverColor,
      darkHoverColor
    } = this.props

    const { hover, showPopup } = this.state;


    return (
      <div className={`relative ${getAttention ? 'delay-300 animate-wiggle' : ''} z-20`}
        onMouseEnter={() => this.setIsFocus(true)}
        onMouseLeave={() => this.setIsFocus(false)}
        onClick={() => this.triggerPopup()}
      >
         <div className={`absolute w-14 text-center bg-slate-300 -translate-y-7 rounded-md pointer-events-none text-xs font-bold p-1 ${ showPopup && popup ? '' : 'opacity-0'} duration-300`}>{ popup }</div>
        {
          secondaryFunction && !isDisabled ? 
          <div className={`bg-red-400 hover:bg-red-500 w-14 h-14 rounded-md ${hover ? '-translate-y-6' : ''} text-center duration-200 absolute cursor-pointer`}>
            <span className='text-xs font-bold text-red-600 hover:text-red-400' onClick={() => secondaryFunction(cellState!)}>CLEAR</span>
          </div> :
          null
        }
        <div 
          onClick={onClick} 
          className={`${hover ? hoverColor + ' ' + darkHoverColor : color + ' ' +  darkColor} w-14 duration-200 cursor-pointer absolute drop text-center rounded-md z-10 select-none`}
          >
            <img src={ theme === 'dark' ? darkSymbolLink : lightSymbolLink} alt="Italian Trulli" className={`${scale ? scale : 'scale-90'} fill-red-400 ${ isDisabled ? 'opacity-25' : ''}`} />
        </div>
        {
          !isDisabled ? 
          <div className={`${hover ? hoverColor + ' ' + darkHoverColor : color + ' ' +  darkColor} w-14 h-14 rounded-md ${hover && title ? customTranslate ? customTranslate : 'translate-y-6' : ''} text-center duration-200 absolute cursor-pointer`}>
            <div className='text-xs font-bold text-white bottom-0 left-0 right-0 absolute pb-2'> {title} </div>
          </div> :
        null
        }
      </div>
  
    )
  }
}



