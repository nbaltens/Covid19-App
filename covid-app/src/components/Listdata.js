import React, { Component } from 'react'

export default class Listdata extends Component {

    render() {
        // Deconstrust values in props
        const {countries} = this.props;
        return (
            // Create Table with Maped out data
            <tr className="listDetails">
                <td>{countries.Country}</td>
                <td>{countries.TotalConfirmed}</td>
                <td>{countries.TotalRecovered}</td>
                <td>{countries.TotalDeaths}</td>               
            </tr>
            
        )
    }
}
