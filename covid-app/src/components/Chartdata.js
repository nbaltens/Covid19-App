// import React, { Component } from 'react';
// import axios from 'axios';
// import CountUp from 'react-countup';


// export default class App extends Component {

//   state = {
//     confirmed: 0,
//     recovered: 0,
//     deaths: 0,
//     countries: []
//   }

  
//   componentDidMount() {
//     axios.get('https://api.covid19api.com/summary')
//     .then(response => {
//       const countries = response.data.Countries.slug;
//       console.log(countries)
      
      

//       this.setState({
//         confirmed: response.data.Global.TotalConfirmed,
//         recovered: response.data.Global.TotalRecovered,
//         deaths: response.data.Global.TotalDeaths,
//         countries
//       })
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   }

// //   selectCountry() {
// //     return this.state.countries.map( (country, i) => {
// //         return <option key={i}>{country}</option>
// //     })
// //   }

//   render() {
//     return (
//       <div>
//           <h1>Corona Update</h1>

//           <select>
//              <option>Helo</option>
//               {/* {this.selectCountry()} */}
//           </select>

//           <div>
//     confirmed: 
//     <CountUp start={0} end={this.state.confirmed} duration={4} separator="," />
//           </div>

//           <div>
//    recovered:
//    <CountUp start={0} end={this.state.recovered} duration={4} separator="," />

//           </div>

//           <div>
//     deaths:
//     <CountUp start={0} end={this.state.deaths} duration={4} separator="," />

//           </div>

//       </div>
//     )
//   }
// }


import React from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import styles from '../App.css'


export default class Chartdata extends React.Component {
    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const info = await axios.get("https://api.covid19api.com/summary");
        const countries = info.data.Countries
        console.log(countries)
        this.setState( {
            confirmed: info.data.Global.TotalConfirmed,
            recovered: info.data.Global.TotalRecovered,
            deaths: info.data.Global.TotalDeaths,
            countries
        });
    }

    countrySelector() {
        return this.state.countries.map( (country, i) => {
            return <option key={i}>{country.Country}</option>
        });
    }

    async countryInput(e) {
        // const info = await axios.get("https://api.covid19api.com/summary");
        // let hello = info.data.Countries
        // let maxSize = hello.map(item => item.Country)
        // console.log(maxSize)
        console.log(e.target.value)

        // console.log(e.target.value)
        
        

    }

    render() {
        return(
            <div>
                <select onChange={this.countryInput}>
                    {this.countrySelector()}
                </select>
            <div className="boxContainer">
                
                <div className="box">
                    <h4>Confirmed</h4>
                    <CountUp start={0} end={this.state.confirmed} duration={4} separator="," />

                </div>

                <div className="box">
                <h4>Recovered</h4>
                <CountUp start={0} end={this.state.recovered} duration={4} separator="," />
                </div>

                <div className="box">
                    <h4>Deaths</h4>
                    <CountUp start={0} end={this.state.deaths} duration={4} separator="," />

                </div>
            </div>
            </div>
        )
    }
}
