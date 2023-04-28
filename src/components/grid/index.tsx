import { Component } from 'react';
import { Pages, Links } from '../../config/enums';
import InteractableGridCell from '../interactableGridCell';

import about from '../.././images/about.png'
import projects from '../.././images/projects.png'
import skills from '../.././images/skills.png'
import github from '../.././images/github.png'

import about_dark from '../.././images/about_dark.png'
import projects_dark from '../.././images/projects_dark.png'
import skills_dark from '../.././images/skills_dark.png'
import github_dark from '../.././images/github_dark.png'

import sun from '../.././images/sun.png'
import moon from '../.././images/moon.png'

import back from '../.././images/back.png'
import back_dark from '../.././images/back_dark.png'

import search from '../.././images/projects/search.png'
import search_dark from '../.././images/projects/search_dark.png'


interface Props { 
  currentPage: Pages,
  fullBackground: boolean,
  height: number,
  width: number,
  toggleDark: () => void,
  navigate: (arg0: Pages) => void,
  extNavigate: (arg0: Links) => void,
  theme?: string
}

interface State {
  currentPage: Pages
}


export default class Grid extends Component<Props, State> {

  // constructor(props: Props) {
  //   super(props);
  // }

  componentDidMount(): void {
  }

  getLayerPos (index: number, gridWidth: number, gridHeight: number): number {
    const distanceFromLeft: number = index % gridWidth === 0 ? gridWidth : index % gridWidth;
    const distanceFromTop: number = Math.ceil(index / gridHeight)
    const distanceFromSides: number = distanceFromLeft > gridWidth / 2 ? gridWidth / 2 - (distanceFromLeft - (gridWidth / 2) - 1) : distanceFromLeft;
    const distanceFromTopBottom: number = distanceFromTop > gridHeight / 2 ? gridHeight / 2 - (distanceFromTop - (gridHeight/ 2) - 1) : distanceFromTop;
    return distanceFromTopBottom < distanceFromSides ? distanceFromTopBottom : distanceFromSides;
  }

  render () {
    const {height, width, currentPage, fullBackground, navigate, extNavigate, theme, toggleDark} = this.props;

    const firstLayerChance = 30;
    const secondLayerChance = 50;
    const thirdLayerChance = 70;

    const redElement: JSX.Element = <div className="bg-blue-300 dark:bg-slate-600 w-14 h-14 hover:bg-blue-400 hover:dark:bg-blue-200 duration-200 rounded-md"></div>
    // const testElement: JSX.Element = <div className="bg-red-600 duration-200 rounded-md"></div>
    const clearElement: JSX.Element = <div className="w-14 h-14"></div>

    let output: JSX.Element[] = [];

    for (let i = 1; i <= height * width; i++) {
      switch (currentPage) {
        case Pages.HOME:

          // skills
          if (fullBackground ? i === 45 : i === 31) {
            output.push(
            <InteractableGridCell 
              onClick={() => navigate(Pages.SKILLS)}
              title={<span>Skills</span>} 
              theme={ theme } 
              lightSymbolLink={ skills } 
              darkSymbolLink={ skills_dark } 
              color='bg-red-400' 
              darkColor='dark:bg-green-500'
              hoverColor='hover:bg-red-500'
              darkHoverColor='dark:hover:bg-green-300'
              scale='scale-75'
            />)
            continue;
          }

          // about
          if (fullBackground ? i === 54 : i === 41) {
            output.push(
            <InteractableGridCell 
              onClick={() => navigate(Pages.ABOUT)}
              title={<span>About<br/>Me</span>} 
              theme={ theme } 
              lightSymbolLink={ about } 
              darkSymbolLink={about_dark} 
              color='bg-red-400'  
              darkColor='dark:bg-green-500'
              hoverColor='hover:bg-red-500'
              darkHoverColor='dark:hover:bg-green-300' 
              focusHeight='28'
            />)
            continue;
          }

          // github
          if (fullBackground ? i === 100 : i === 69) {
            output.push(
            <InteractableGridCell 
              onClick={() => extNavigate(Links.GITHUB)} 
              title={<span>GitHub</span>} 
              theme={ theme } 
              lightSymbolLink={ github } 
              darkSymbolLink={github_dark} 
              color='bg-purple-300' 
              hoverColor='hover:bg-purple-400' 
              darkColor='hover:bg-purple-400'
              darkHoverColor='bg-purple-300'
              scale='scale-75' 
            />)
            continue;
          }

          // projects
          if (fullBackground ? i === 104 : i === 113) {
            output.push(
            <InteractableGridCell 
            onClick={() => navigate(Pages.PROJECTS)}
              title={<span>Projects</span>} 
              theme={ theme } 
              lightSymbolLink={ projects } 
              darkSymbolLink={projects_dark} 
              color='bg-red-400' 
              darkColor='dark:bg-green-500'
              hoverColor='hover:bg-red-500'
              darkHoverColor='dark:hover:bg-green-300'
              scale='scale-75'
            />)
            continue;
          }
          
          if (fullBackground) {
            if ((i > 77 && i < 83) || (i > 65 && i < 71)) {
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
          if (fullBackground ? i === 33 : i === 33) {
            // back
            output.push(
            <InteractableGridCell 
              onClick={() => navigate(Pages.HOME)}
              theme={theme} 
              lightSymbolLink={back} 
              darkSymbolLink={back_dark} 
              color='bg-blue-500' 
              hoverColor='hover:bg-blue-600'
              scale='scale-75'
            />)
            continue;
          }

          if (
            (i > 41 && i < 46) ||
            (i > 51 && i < 58) ||
            (i > 63 && i < 70)
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
              onClick={() => navigate(Pages.HOME)}
              theme={theme} 
              lightSymbolLink={back} 
              darkSymbolLink={back_dark} 
              color='bg-blue-500' 
              hoverColor='hover:bg-blue-600'
              scale='scale-75'
            />)
            continue;
          }

          if (fullBackground ? i === 41 : i === 41) {
            // sorting navigate
            output.push(
            <InteractableGridCell 
              title={<span>Search<br/>Visual</span>}
              focusHeight='28'
              onClick={() => navigate(Pages.SEARCHING)}
              theme={theme} 
              lightSymbolLink={search} 
              darkSymbolLink={search_dark} 
              color='bg-orange-400' 
              hoverColor='hover:bg-orange-500'
              scale='scale-75'
            />)
            continue;
          }

          break;
        case Pages.SKILLS:
          if (fullBackground ? i === 33 : i === 33) {
            // back
            output.push(
            <InteractableGridCell 
              onClick={() => navigate(Pages.HOME)}
              theme={theme} 
              lightSymbolLink={back} 
              darkSymbolLink={back_dark} 
              color='bg-blue-500' 
              hoverColor='hover:bg-blue-600'
              scale='scale-75'
            />)
            continue;
          }
          break; 
      }
      
      if (fullBackground ? i === 2 : i === 21) {
        output.push(
        <InteractableGridCell 
          onClick={toggleDark} 
          theme={ theme } 
          lightSymbolLink={ sun } 
          darkSymbolLink={ moon } 
          color='bg-blue-300'
          darkColor='dark:bg-black'
          scale='scale-75'
          />)
        continue;
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
    
    
    return (
      <div className={`grid gap-2 grid-cols-12 grid-rows-12 w-max absolute`}>
        {output}
      </div>
    )
  }
}



