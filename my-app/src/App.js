import React from 'react';
//import GridContainer from './components/GridContainer';
//import RulesContainer from './components/RulesContainer';
import Title from './components/Title';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Title />
      <div className="mid_section_container">
        <h1>Responsive Grid</h1>
        {/* <GridContainer />
         <RulesContainer /> */}
      </div>
      <About />
    </div>
  );
}

export default App;
