import React from 'react'
import Chartdata from './components/Chartdata';
import Navbar from './components/Navbar';
import Listcontainer from './components/Listcontainer';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
         <Chartdata />
         <Listcontainer />
      </div>
    )
  }
}

export default App;
