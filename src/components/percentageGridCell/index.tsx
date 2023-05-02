import { Component } from 'react';

interface Props {
  symbol: string,
  title: JSX.Element,
  exactPercentHeight: string,
  percentColor: string,
  scale?: string,
  customTranslate?: string,
  delayMultiple: number
}

interface State {
  showPercentage: boolean,
  hover: boolean
}


export default class PercentageGridCell extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showPercentage: false,
      hover: false
    };
  }

  componentDidMount(): void {
    const { delayMultiple } = this.props;

    setTimeout(() => {
      this.setShowPercentage(true)
    }, 200 * delayMultiple)

  }

  setShowPercentage (isFocus: boolean): void {
    if (isFocus){
      this.setState({
        showPercentage: true
      })
    } else {
      this.setState({
        showPercentage: false
      })
    } 
  }

  // 3.5rem

  setIsHover (isFocus: boolean): void {
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

  render() {

    const { symbol, title, exactPercentHeight, percentColor, scale, customTranslate } = this.props;
    const { showPercentage, hover } = this.state;



    return (
      <div className={`relative`}
        onMouseEnter={() => {this.setIsHover(true)}}
        onMouseLeave={() => {this.setIsHover(false)}}
        >
        <div className={`w-14 h-14 rounded-md duration-200 absolute z-30`}>
          <img src={symbol} alt='Italian Trulli' className={`${scale ? scale : 'scale-[0.80]'} duration-500 ${showPercentage ? 'opacity-100' : 'translate-y-5 opacity-0'}`}></img>
        </div>

        <div className={`w-14 ${showPercentage ? `${exactPercentHeight} opacity-100` : 'h-0 opacity-0'} transition-height duration-500 ease-in-out absolute text-center z-20 select-none ${percentColor} bottom-0 rounded-b-md`} /> 

        <div className={`w-14 h-14 rounded-md duration-200 absolute dark:bg-slate-600 bg-blue-300 z-10`} />

        <div className={`w-14 h-8 rounded-md ${hover && showPercentage ? customTranslate ? customTranslate + ' z-10' : 'translate-y-6 z-10' : 'z-0'} text-center duration-200 absolute bottom-0`}>
          <div className={`text-xs font-bold text-white bottom-0 left-0 right-0 absolute pb-2 ${percentColor} rounded-b-md p-1`}> {title} </div>
        </div>
      </div>
    )
  }
}



