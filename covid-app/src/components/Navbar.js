import React from 'react'
import { FaGlobeAmericas } from 'react-icons/fa'

export default function Navbar() {
    return (
        <div className="navbar">
            <h2>
                <FaGlobeAmericas className="navIcon" />
                <span className="navTitle">Covid Tracker</span>
            </h2>
        </div>
    )
}
