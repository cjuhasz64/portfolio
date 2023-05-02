import { Component } from 'react';

import profile from './images/profile.jpg'

import Grid from './components/grid';
import SearchGame from './components/seachGame';

import { Pages, Links } from './config/enums';

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
    this.navigate = this.navigate.bind(this)
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

  navigate (targetPage: Pages) {
    this.setState({
      currentPage: targetPage
    })
  }

  extNavigate (targetLink: Links) {
    if (targetLink === Links.GITHUB) {
      window.open('https://github.com/cjuhasz64', "_blank", "noreferrer");
    }
  }

  render () {
    const {currentPage, fullBackground, theme} = this.state
    return (
      <>
      <div className="grid h-screen place-items-center dark:bg-slate-800 relative overflow-hidden">
        { 
        currentPage === Pages.SEARCHING ?
          <SearchGame 
            navigate={this.navigate}
            theme={theme}
            toggleDark={this.toggleDarkMode}
          />

          :
          <Grid 
            currentPage={currentPage} 
            fullBackground={fullBackground} 
            height={12} 
            width={12} 
            toggleDark={this.toggleDarkMode}
            navigate={this.navigate}
            extNavigate={this.extNavigate}
            theme={theme}
          />
        }
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
            { currentPage === Pages.ABOUT ? 
              <>
                <div className="h-96 w-96 relative">

                  <span className='text-[46px] text-black dark:text-white inline-block font-poppins font-thin w-64 absolute right-0 text-center'>
                    WELCOME
                  </span>
                  <span className='text-lg text-black dark:text-white inline-block font-poppins text-justify pt-16 p-2'>
                    I'm Cameron, a recent Graduate from Swinburne Institute of Technology receiving a Bacholar's Degree in Computer Science.
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
        
                </div>
              </>
              :
              null
            } 

            { currentPage === Pages.PROJECTS ? 
              <>
                <div className="md:shrink-0">
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



