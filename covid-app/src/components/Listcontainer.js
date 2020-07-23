import React, { Component } from 'react';
import axios from 'axios';
import Listdata from './Listdata';

export default class Listcontainer extends Component {

    // Define State for Component
    state = {
        countries: []
    }

    // Load data on Mount
    componentDidMount() {
        this.getData()
    }

    // Get Data and Set new state
    async getData() {
        const info = await axios.get("https://api.covid19api.com/summary");
        console.log(info)
        this.setState( {
            countries: info.data.Countries,        
        })
    };


    render() {
        return (
            <div className="listContainer">
                <h2 className="listTitle">Covid-19 Global List</h2>
                <table>
                    <thead>
                        <tr className="listLabels"> 
                            <th>Country</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.countries.map(country => (
                            <Listdata countries={country} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


