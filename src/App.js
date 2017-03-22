import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import SlideIndex from './Components/SlideIndex';

//import SlideShow from './Components/SlideShow';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get startedsdfsdf, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        {/*<Screen>
          <ScreenSlice>
            <h1>First Screen</h1>
          </ScreenSlice>
          <ScreenSlice>
            <h1>Second Screen</h1>
          </ScreenSlice>
          <ScreenSlice>
            <h1>Third Screen</h1>
          </ScreenSlice>
        </Screen>*/}
        
          

            <SlideIndex/>
          

      </div>
    );
  }
}

export default App;
