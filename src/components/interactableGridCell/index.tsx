import React from 'react';
import logo from './logo.svg';
import { Component } from 'react';

interface Props { 
  theme?: string,
  lightSymbolLink: string,
  darkSymbolLink: string,
  title?: JSX.Element,
  scale?: string,
  focusHeight?: string,
  color: string,
  darkColor?: string,
  focusColor?: string,
  darkFocusColor?: string,
  onClick?: () => void
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
    const { darkSymbolLink, lightSymbolLink, title, scale, focusHeight, theme, onClick} = this.props;

    const {
      color,
      darkColor,
      focusColor,
      darkFocusColor
    } = this.props

    const { focus } = this.state;

    return (
      <div className="relative">
        <div 
          onClick={onClick} 
          className={`${color} ${darkColor} ${focusColor} ${darkFocusColor} w-14 h-14 ${title ? focusHeight ? 'hover:h-24' : 'hover:h-20' : null} duration-200 cursor-pointer absolute hover:drop-shadow-lg text-center rounded-md z-20`}
          onMouseEnter={() => this.setIsFocus(true)}
          onMouseLeave={() => this.setIsFocus(false)}
          >
            <img src={ theme === 'dark' ? darkSymbolLink : lightSymbolLink} alt="Italian Trulli" className={`${scale ? scale : 'scale-90'} fill-red-400` } />
            <p className='text-xs font-semibold text-white dark:text-slate-800'>{ focus ? title : ''}</p>
        </div>
        {/* <div 
          className={`animate-pulse ${color} ${darkColor} ${focusColor} ${darkFocusColor} w-14 h-14 ${title ? focusHeight ? 'hover:h-24' : 'hover:h-20' : null} duration-200 cursor-pointer absolute hover:drop-shadow-lg text-center rounded-md z-10`}
          ></div> */}
      </div>
    )
  }
}



