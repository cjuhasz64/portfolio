import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { JsxElement } from 'typescript';

import image from './images/jack.jpg'
import info from './images/info.png'
import projects from './images/projects.png'
import skills from './images/skills.png'
import github from './images/github.png'

interface Props { 

}

interface State {
  posX: number,
  posY: number,
  fullBackground: boolean
}


export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      posX: 0,
      posY: 0,
      fullBackground: window.innerWidth < 768 ? false : true
    };
    this.setBackgroundSize = this.setBackgroundSize.bind(this)
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.setBackgroundSize);
    // remove event listener
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
  }

  setBackgroundSize () {
    this.setState({
      fullBackground: window.innerWidth < 768 ? false : true
    })
  }


  // getLayerPos (index: number, gridWidth: number, flag: number): number {
  //   // console.log(index)
  //   //top row

  //   // console.log(Math.floor(index/gridWidth))

  //   console.log(flag)
  //   if (index < gridWidth * (flag + 1)) {
  //     return flag + 1;
  //   }

  //   // bottom row
  //   if (index > (gridWidth * gridWidth) - (gridWidth * (flag + 1))) {
  //     return flag + 1;
  //   }

  //   // left side
  //   if (index % gridWidth === 0 + flag) {
  //     return flag + 1;
  //   }

  //   // right side
  //   if (index % gridWidth === gridWidth - 1 - flag) {
  //     return flag + 1;
  //   }
    
  //   return this.getLayerPos(index, gridWidth, flag+1)
    
  // }

  getLayerPos (index: number, gridWidth: number, gridHeight: number): number {
    const distanceFromLeft: number = index % gridWidth === 0 ? gridWidth : index % gridWidth;
    const distanceFromTop: number = Math.ceil(index / gridHeight)
    const distanceFromSides: number = distanceFromLeft > gridWidth / 2 ? gridWidth / 2 - (distanceFromLeft - (gridWidth / 2) - 1) : distanceFromLeft;
    const distanceFromTopBottom: number = distanceFromTop > gridHeight / 2 ? gridHeight / 2 - (distanceFromTop - (gridHeight/ 2) - 1) : distanceFromTop;
    return distanceFromTopBottom < distanceFromSides ? distanceFromTopBottom : distanceFromSides;
  }

  drawGrid () {
    const height = 12;
    const width = 12;
    const firstLayerChance = 20;
    const secondLayerChance = 50;
    const thirdLayerChange = 70;

    const { fullBackground } = this.state;

    const redElement: JSX.Element = <div className="bg-blue-300 w-14 h-14 hover:bg-blue-500 duration-200 rounded-md"></div>
    const clearElement: JSX.Element = <div className="bg-white w-14 h-14"></div>

    let output: JSX.Element[] = [];
    for (let i = 1; i <= height * width; i++) {

      if (fullBackground ? i === 45 : i === 31) {
        output.push(
          <div className="relative">
          <div onClick={() => {console.log('skills')}} className="bg-yellow-200 w-14 h-14 hover:h-20 duration-200 cursor-pointer absolute hover:bg-yellow-300 hover:drop-shadow-lg text-center rounded-md">
            <img src={skills} alt="Italian Trulli" className="scale-75"/>
            <p className='text-xs font-semibold text-white'>Skills</p>
          </div>
        </div>
        )
        continue;
      }

      if (fullBackground ? i === 54 : i === 41) {
        output.push(
          <div className="relative">
            <div onClick={() => {console.log('about')}} className="bg-yellow-200 w-14 h-14 hover:h-24 duration-200 cursor-pointer absolute hover:bg-yellow-300 hover:drop-shadow-lg text-center hover:z-10 rounded-md">
              <img src={info} alt="Italian Trulli" className="scale-90"/>
              <p className='text-xs font-semibold text-white'>About<br/>Me</p>
            </div>
          </div>
          )
        continue;
      }

      if (fullBackground ? i === 100 : i === 69) {
        output.push(
          <div className="relative">
            <div onClick={() => {console.log('github')}} className="bg-purple-300 w-14 h-14 hover:h-20 duration-200 cursor-pointer absolute hover:bg-purple-400 hover:drop-shadow-lg text-center rounded-md">
              <img src={github} alt="Italian Trulli" className="scale-90"/>
              <p className='text-xs font-semibold text-white'>Github</p>
            </div>
          </div>
          )
        continue;
      }

      if (fullBackground ? i === 104 : i === 113) {
        output.push(
          <div className="relative">
            <div onClick={() => {console.log('projects')}} className="bg-yellow-200 w-14 h-14 hover:h-20 duration-200 cursor-pointer absolute hover:bg-yellow-300 hover:drop-shadow-lg text-center rounded-md">
              <img src={projects} alt="Italian Trulli" className="scale-75"/>
              <p className={`text-xs font-semibold text-white transperant`}>Projects</p>
            </div>
          </div>
          )
        continue;
      }

      if (fullBackground) {
        if (i > 77 && i < 83 || i > 65 && i < 71) {
          output.push(clearElement)
          continue;
        }
      } else {
        if (i > 76 && i < 81) {
          output.push(<div className="bg-blue-300 w-14 h-3/4 hover:bg-blue-500 duration-200 rounded-md"></div>)
          continue;
        }
        if (i > 88 && i < 93) {
          output.push(clearElement)
          continue;
        }
        if (i > 100 && i < 105) {
          output.push(
            <div className="relative">
              <div className="bg-blue-300 w-14 h-3/4 hover:bg-blue-500 duration-200 absolute bottom-0 rounded-md"></div>
            </div>
            )
          continue;
        }
      }

      if (this.getLayerPos(i, width, height) === 1) {
        if (Math.floor(Math.random() * 100) > firstLayerChance) {
          output.push(clearElement)
          continue;
        } else {
          output.push(redElement)
          continue;
        }
      } 
       
      if (this.getLayerPos(i, width, height) === 2) {
        if (Math.floor(Math.random() * 100) > secondLayerChance) {
          output.push(clearElement)
          continue;
        } else {
          output.push(redElement)
          continue;
        }
      } 
      
      if (this.getLayerPos(i, width, height) === 3) {
        if (Math.floor(Math.random() * 100) > thirdLayerChange) {
          output.push(clearElement)
          continue;
        } else {
          output.push(redElement)
          continue;
        }
      }
      output.push(redElement)
    }
    return output;
  }

  render () {
    const {posX, posY} = this.state
    return (
      <>
      <div className="grid h-screen place-items-center">
        <div className="grid gap-2 grid-cols-12 grid-rows-12 w-max absolute">
          {this.drawGrid()}
        </div>
        
        {/* <div className='bg-blue-600 w-10 h-10'></div> */}
        <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl absolute pointer-events-none">
          <div className="md:flex">
          <div className="md:shrink-0">
              <img className="h-48 w-48 md:max-h-48 mx-auto object-cover rounded-full" src={ image } alt="Italian Trulli"/>
            </div>
            <div className="p-6 md:p-8 md:pt-12 text-center md:text-left">
              <p className="uppercase text-2xl text-black font-semibold">CAMERON JUHASZ</p>
              <p className="text-lg text-black font-semibold">Bacholar of Computer Science</p>
              <p className="text-md text-black">Software Development</p>
              {/* <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p> */}
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}



