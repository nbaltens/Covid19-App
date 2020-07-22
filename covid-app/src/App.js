import React from 'react'
import Chartdata from './components/Chartdata';
import Navbar from './components/Navbar';
import Listdata from './components/Listdata';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
         <Chartdata />
         <Listdata />
      </div>
    )
  }
}

export default App;
