import React from 'react';
//import GridContainer from './components/GridContainer';
import RulesContainer from './components/RulesContainer';
import Title from './components/Title';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Title />
      <div className="mid_section_container">
         {/* <GridContainer /> */}
         <RulesContainer />
      </div>
      <About />
    </div>
  );
}

export default App;
