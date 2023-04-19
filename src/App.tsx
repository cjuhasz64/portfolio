import React from 'react';
import logo from './logo.svg';
import { Component } from 'react';
import { JsxElement } from 'typescript';

import about from './images/about.png'
import projects from './images/projects.png'
import skills from './images/skills.png'
import github from './images/github.png'

import about_dark from './images/about_dark.png'
import projects_dark from './images/projects_dark.png'
import skills_dark from './images/skills_dark.png'
import github_dark from './images/github_dark.png'

import sun from './images/sun.png'
import moon from './images/moon.png'

import back from './images/back.png'
import back_dark from './images/back_dark.png'

import profile from './images/profile.jpg'


import InteractableGridCell from './components/interactableGridCell';


enum Pages {
  HOME,
  SKILLS,
  ABOUT,
  PROJECTS
}

interface Props { 

}

interface State {
  posX: number,
  posY: number,
  fullBackground: boolean,
  theme?: string,
  currentPage: Pages
}


export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      posX: 0,
      posY: 0,
      fullBackground: window.innerWidth < 768 ? false : true,
      currentPage: Pages.HOME
    };
    this.toggleDarkMode = this.toggleDarkMode.bind(this)
    this.setBackgroundSize = this.setBackgroundSize.bind(this)
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.setBackgroundSize);
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      this.setState({
        theme:'dark'
      })
    } else {
      document.documentElement.classList.remove('dark')
      this.setState({
        theme:'light'
      })
    }
  }

  toggleDarkMode (): void {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      this.setState({
        theme:'light'
      })
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      this.setState({
        theme:'dark'
      })
      localStorage.theme = 'dark'
    }
  }

  setBackgroundSize () {
    this.setState({
      fullBackground: window.innerWidth < 768 ? false : true
    })
  }

  getLayerPos (index: number, gridWidth: number, gridHeight: number): number {
    const distanceFromLeft: number = index % gridWidth === 0 ? gridWidth : index % gridWidth;
    const distanceFromTop: number = Math.ceil(index / gridHeight)
    const distanceFromSides: number = distanceFromLeft > gridWidth / 2 ? gridWidth / 2 - (distanceFromLeft - (gridWidth / 2) - 1) : distanceFromLeft;
    const distanceFromTopBottom: number = distanceFromTop > gridHeight / 2 ? gridHeight / 2 - (distanceFromTop - (gridHeight/ 2) - 1) : distanceFromTop;
    return distanceFromTopBottom < distanceFromSides ? distanceFromTopBottom : distanceFromSides;
  }

  redirectGithub () {
    window.open('https://github.com/cjuhasz64', "_blank", "noreferrer");
  }

  navigate (targetPage: Pages) {
    this.setState({
      currentPage: targetPage
    })
  }

  drawGrid () {
    const {currentPage} = this.state

    const height = 12;
    const width = 12;
    const firstLayerChance = 30;
    const secondLayerChance = 50;
    const thirdLayerChance = 70;

    const { fullBackground, theme } = this.state;

    const redElement: JSX.Element = <div className="bg-blue-300 dark:bg-slate-600 w-14 h-14 hover:bg-blue-400 hover:dark:bg-blue-200 duration-200 rounded-md"></div>
    const testElement: JSX.Element = <div className="bg-red-600 duration-200 rounded-md"></div>
    const clearElement: JSX.Element = <div className="w-14 h-14"></div>

    let output: JSX.Element[] = [];
    for (let i = 1; i <= height * width; i++) {

      // night mode toggle
      if (fullBackground ? i === 2 : i === 21) {
        output.push(
        <InteractableGridCell 
          onClick={this.toggleDarkMode} 
          theme={ theme } 
          lightSymbolLink={ sun } 
          darkSymbolLink={ moon } 
          color='bg-blue-300'
          darkColor='dark:bg-black'
          scale='scale-75'
          />)
        continue;
      }

      switch (currentPage) {
        case Pages.HOME:
          // skills
          if (fullBackground ? i === 45 : i === 31) {
            output.push(
            <InteractableGridCell 
            onClick={() => this.navigate(Pages.SKILLS)}
              title={<span>Skills</span>} 
              theme={ theme } 
              lightSymbolLink={ skills } 
              darkSymbolLink={skills_dark} 
              color='bg-red-400' 
              darkColor='dark:bg-green-500'
              focusColor='hover:bg-red-500'
              darkFocusColor='dark:hover:bg-green-300'
              scale='scale-75'
            />)
            continue;
          }

          // about
          if (fullBackground ? i === 54 : i === 41) {
            output.push(
            <InteractableGridCell 
              onClick={() => this.navigate(Pages.ABOUT)}
              title={<span>About<br/>Me</span>} 
              theme={ theme } 
              lightSymbolLink={ about } 
              darkSymbolLink={about_dark} 
              color='bg-red-400'  
              darkColor='dark:bg-green-500'
              focusColor='hover:bg-red-500'
              darkFocusColor='dark:hover:bg-green-300' 
              focusHeight='28'
            />)
            continue;
          }

          // github
          if (fullBackground ? i === 100 : i === 69) {
            output.push(
            <InteractableGridCell 
              onClick={this.redirectGithub} 
              title={<span>GitHub</span>} 
              theme={ theme } lightSymbolLink={ github } 
              darkSymbolLink={github_dark} 
              color='bg-purple-300' 
              focusColor='hover:bg-purple-400' 
              darkColor='hover:bg-purple-400'
              darkFocusColor='bg-purple-300'
              scale='scale-75' 
            />)
            continue;
          }

          // projects
          if (fullBackground ? i === 104 : i === 113) {
            output.push(
            <InteractableGridCell 
            onClick={() => this.navigate(Pages.PROJECTS)}
              title={<span>Projects</span>} 
              theme={ theme } 
              lightSymbolLink={ projects } 
              darkSymbolLink={projects_dark} 
              color='bg-red-400' 
              darkColor='dark:bg-green-500'
              focusColor='hover:bg-red-500'
              darkFocusColor='dark:hover:bg-green-300'
              scale='scale-75'
            />)
            continue;
          }
          
          if (fullBackground) {
            if (i > 77 && i < 83 || i > 65 && i < 71) {
              output.push(clearElement)
              continue;
            }
          } else {
            if (i > 76 && i < 81) {
              output.push(<div className="bg-blue-300 dark:bg-slate-600 w-14 h-3/4 hover:bg-blue-400 hover:dark:bg-blue-200 duration-200 rounded-md"></div>)
              continue;
            }
            if (i > 88 && i < 93) {
              output.push(clearElement)
              continue;
            }
            if (i > 100 && i < 105) {
              output.push(
                <div className="relative">
                  <div className="bg-blue-300 dark:bg-slate-600 w-14 h-3/4 hover:bg-blue-400 hover:dark:bg-blue-200 duration-200 absolute bottom-0 rounded-md"></div>
                </div>
                )
              continue;
            }
          }
          break;
        case Pages.ABOUT:

          // back
          if (fullBackground ? i === 33 : i === 33) {
            output.push(
            <InteractableGridCell 
              onClick={() => this.navigate(Pages.HOME)}
              theme={theme} 
              lightSymbolLink={back} 
              darkSymbolLink={back_dark} 
              color='bg-blue-500' 
              focusColor='hover:bg-blue-600'
              scale='scale-75'
            />)
            continue;
          }

          // half cube
            if (
              i > 41 && i < 46 ||
              i > 51 && i < 58 ||
              i > 63 && i < 70
              ) {
              output.push(clearElement)
              continue;
            }

            if (i > 75 && i < 80) {
              output.push(
                <div className="relative">
                  <div className="bg-blue-300 dark:bg-slate-600 w-14 h-1/3 hover:bg-blue-400 hover:dark:bg-blue-200 duration-200 absolute bottom-0 rounded-md"></div>
                </div>
                )
              continue;
            }

            if (i > 79 && i < 82) {
              output.push(
                <div className="relative">
                  <div className="bg-blue-300 dark:bg-slate-600 w-14 h-3/4 hover:bg-blue-400 hover:dark:bg-blue-200 duration-200 absolute bottom-0 rounded-md"></div>
                </div>
                )
              continue;
            }
          break;
        case Pages.PROJECTS:
          if (fullBackground ? i === 33 : i === 33) {

            // back
            output.push(
            <InteractableGridCell 
              onClick={() => this.navigate(Pages.HOME)}
              theme={theme} 
              lightSymbolLink={back} 
              darkSymbolLink={back_dark} 
              color='bg-blue-500' 
              focusColor='hover:bg-blue-600'
              scale='scale-75'
            />)
            continue;
          }

          if (fullBackground ? i === 41 : i === 41) {
            output.push(
            <InteractableGridCell 
              onClick={() => this.navigate(Pages.PROJECTS)}
              title={<span>Projects</span>} 
              theme={ theme } 
              lightSymbolLink={ projects } 
              darkSymbolLink={projects_dark} 
              color='bg-red-400' 
              darkColor='dark:bg-green-500'
              focusColor='hover:bg-red-500'
              darkFocusColor='dark:hover:bg-green-300'
              scale='scale-75'
            />)
            continue;
          }
          break;
        case Pages.SKILLS:
          if (fullBackground ? i === 33 : i === 33) {
            output.push(
            <InteractableGridCell 
              onClick={() => this.navigate(Pages.HOME)}
              theme={theme} 
              lightSymbolLink={back} 
              darkSymbolLink={back_dark} 
              color='bg-blue-500' 
              focusColor='hover:bg-blue-600'
              scale='scale-75'
            />)
            continue;
          }
          break;
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
        if (Math.floor(Math.random() * 100) > thirdLayerChance) {
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
    const {posX, posY, currentPage} = this.state
    return (
      <>
      <div className="grid h-screen place-items-center dark:bg-slate-800 relative overflow-hidden">
        <div className="grid gap-2 grid-cols-12 grid-rows-12 w-max absolute">
          {this.drawGrid()}
        </div>
        <div className="max-w-md mx-auto overflow-hidden md:max-w-2xl absolute pointer-events-none">
          <div className="md:flex">
            { currentPage === Pages.HOME ? 
              <>
                <div className="md:shrink-0">
                  <img className="h-48 w-48 md:max-h-48 mx-auto object-cover rounded-full" src={ profile } alt="Italian Trulli"/>
                </div>
                <div className="p-6 md:p-8 md:pt-12 text-center md:text-left">
                  <p className="uppercase text-2xl text-black dark:text-white font-semibold ">CAMERON JUHASZ</p>
                  <p className="text-lg text-black dark:text-white font-semibold">Bacholar of Computer Science</p>
                  <p className="text-md text-black dark:text-white">Software Development</p>
                </div>
              </>
              :
              null
            }


            {/*

            Recent Graduate from Swinburne Institute of Technology receiving a Bacholars Degree in Computer Science

            
            */}

            { currentPage === Pages.ABOUT ? 
              <>
                <div className="h-96 w-96 relative">

                  <span className='text-[46px] text-black dark:text-white inline-block font-poppins font-thin w-64 absolute right-0 text-center'>
                    WELCOME
                  </span>
                  <span className='text-lg text-black dark:text-white inline-block font-poppins text-justify pt-16 p-2'>
                    I'm Cameron, a Recent Graduate from Swinburne Institute of Technology receiving a Bacholar's Degree in Computer Science.
                    I have a very strong passion for software development and am extremely eager to get into the industry of software. 
                  </span>
                </div> 
              </>
              :
              null
            }   

            { currentPage === Pages.SKILLS ? 
              <>
                <div className="md:shrink-0">
                  skills
                </div>
              </>
              :
              null
            } 

            { currentPage === Pages.PROJECTS ? 
              <>
                <div className="md:shrink-0">
                  projects
                </div>
              </>
              :
              null
            } 
          </div>
        </div>
      </div>
      </>
    )
  }
}



