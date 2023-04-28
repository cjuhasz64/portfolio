import React from 'react';
import logo from './logo.svg';
import { Component } from 'react';
import { Colour } from '../../config/enums';

interface Props { 
  options: string [],
  setSortCode: (args0: string) => void,
  isDisabled: boolean,
  color: string,
  darkColor: string,
  hoverColor: string,
  darkHoverColor: string,
}

interface State {
  focus: boolean,
  selectedOption: string
}

export default class DropDown extends Component<Props, State> {

  private wrapperRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false,
      selectedOption: ''
    };

    this.wrapperRef = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount(): void {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount(): void {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event : MouseEvent) {
    if (this.wrapperRef && !this.wrapperRef.current!.contains(event.target as Node)) {
      this.setIsFocus(false)
    }
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
    const { focus, selectedOption } = this.state;
    const { options, setSortCode, isDisabled, color, darkColor, hoverColor, darkHoverColor} = this.props

    
    const newOptionHoverDark = 'dark:hover:bg-blue-400' 
    const newOptionHoverLight = 'hover:bg-blue-200'
    const newDarkColor = 'dark:bg-blue-200'
    const newLightColor = 'bg-blue-400';

    const drawOptions = options.map((option, i) => {
      return  <div className={`py-3 duration-200 ${i + 1 === options.length ? 'rounded-b-md' : ''} ${newOptionHoverDark} ${newOptionHoverLight} ${newDarkColor} ${newLightColor}`} onClick={() => {this.setState({ selectedOption: option }); setSortCode(option)}}>
                <span className='text-xs font-semibold text-white dark:text-slate-800'>{ option === 'A Star' ? 'A Star (Unweighted)' : option }</span>
              </div>
    })
   
    const darkFocusColor = 'dark:bg-blue-200' //darkHoverColor.replace('hover:', '')
    const lightFocusColor = 'bg-blue-400'//hoverColor.replace('hover:', '')

    return (
      <div className="relative" ref={this.wrapperRef}>
        <div 
          className={`duration-200 select-none w-[11.5rem] h-14 absolute cursor-pointer text-center ${focus ? 'rounded-t-md' : 'rounded-md'} ${!focus ? darkColor + ' ' + color : darkFocusColor + ' ' + lightFocusColor} ${hoverColor} ${darkHoverColor}`}
          onClick={!isDisabled ? focus ? () => this.setIsFocus(false) : () => this.setIsFocus(true) : () => {}}
        >
            <div className={`h-14 text-md font-semibold dark:hover:text-slate-800 ${focus ? 'dark:text-slate-800 text-white' : 'text-white'} pt-4 ${isDisabled ? 'opacity-25' : ''}`} >{ selectedOption === '' ? 'Select an Algorithm!' : selectedOption === 'A Star' ? 'A Star (Unweighted)' : selectedOption}</div>
            {focus ? 
              <div className={`w-[11.5rem] absolute rounded-b-md cursor-pointer text-center divide-y dark:bg-slate-600 duration-200 z-10`}>
                { drawOptions }
              </div>
            :
              <div/>
            }
        </div>
      </div>
    )
  }
}



