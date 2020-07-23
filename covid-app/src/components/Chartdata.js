import React from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2';
import Listdata from './Listcontainer';


export default class Chartdata extends React.Component {
    constructor(props) {
        super(props)
        //Binds countryInput to class
        this.countryInput = this.countryInput.bind(this);
    }
    // Create State
    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        newConfirmed: 0,
        newDeaths: 0,
        newRecovered: 0,
        countries: [],
        date: null,
        country: ""
    }

    // Get data onload
    componentDidMount() {
        this.getData();
    }

    // Get data from api and set as state
    async getData() {
        const info = await axios.get("https://api.covid19api.com/summary");
        const countries = info.data.Countries
        const global = info.data.Global
        this.setState( {
            confirmed: global.TotalConfirmed,
            recovered: global.TotalRecovered,
            deaths: global.TotalDeaths,
            newConfirmed: global.NewConfirmed,
            newRecovered: global.NewRecovered,
            newDeaths: global.NewDeaths,
            date: null,
            country: "Global",
            countries
        });
    }

    // Push country names to selector
    countrySelector() {
        return this.state.countries.map( (country) => {
            return <option>{country.Country}</option>
        });
    }

    // Switch chart data depending on which country is selected
    async countryInput(e) {
        if(e.target.value === "Global") {
            this.getData();
            return;
            }
            let selectInput = e.target.value;
            const info = await axios.get("https://api.covid19api.com/summary");
            const data= info.data.Countries;
            let countries = data.filter( data => data.Country === selectInput);
            let country = countries[0];
            this.setState( {
                confirmed: country.TotalConfirmed,
                recovered: country.TotalRecovered,
                deaths: country.TotalDeaths,
                newConfirmed: country.NewConfirmed,
                newRecovered: country.NewRecovered,
                newDeaths: country.NewDeaths,
                date: country.Date,
                country: country.Country
            });
            this.getDate();     
        }

    // Set data for doughnut graph
    getGraphData() {
        let newConfirmed = this.state.newConfirmed;
        let newRecovered = this.state.newRecovered;
        let newDeaths = this.state.newDeaths
        const data = {
            labels: [
                'Confirmed Cases: ' + newConfirmed,
                'Recovered Cases: ' + newRecovered,
                'Death Cases: ' + newDeaths
            ],
            datasets: [{
                data: [newConfirmed, newRecovered, newDeaths],
                backgroundColor: [
                '#6ba9ff',
                '#63ffb6',
                '#FF6384'
                ], 
            }]   
        };
        return data;
    }

    // Create cleaner date for new cases
    getDate() {
        let date = this.state.date;
        if( date === null) {
            return
        } else {
            let dateData = String(date)
        let cleanDate = new Date(dateData).toDateString();
        return cleanDate;  
         
    }
             
    }

    render() {
        return(
// Selector
            <div className="chartDataContainerWhole">
            <h1 className="locationTitle">{this.state.country}</h1>
            <div className="dataSelector">
                <select onChange={this.countryInput}>
                    <option>Global</option>
                    {this.countrySelector()}
                </select>
            </div>

{/* Chart Box Container */}

            <div className="chartDataContainer">
                <div className="boxContainer">
                    <div className="box confirmedBox">
                        <h2>Total</h2>
                        <h4 className="boxChartTitle">Confirmed Cases</h4>
                        <CountUp className="boxDataNumber" start={0} end={this.state.confirmed} duration={2} separator="," />
                    </div>

                    <div className="box recoveredBox">
                        <h2>Total</h2>
                        <h4 className="boxChartTitle">Recovered Cases</h4>
                        <CountUp className="boxDataNumber" start={0} end={this.state.recovered} duration={2} separator="," />
                    </div>

                    <div className="box">
                        <h2>Total</h2>
                        <h4 className="boxChartTitle deathBox">Death Cases</h4>
                        <CountUp className="boxDataNumber" start={0} end={this.state.deaths} duration={2} separator="," />
                    </div>
                </div>

{/* Doughnut Chart Container */}

                <div className="chartContainer">
                    <h2>New Covid-19 Cases</h2>
                    <h4>Last Update: {this.getDate()}</h4>
                    <Doughnut data={this.getGraphData()} />
                </div>
            </div>
        </div>
        )
    }
}
