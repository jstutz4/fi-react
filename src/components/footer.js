import React from 'react'
import {Link} from 'react-router-dom'

const NoBulletPoints = {
    listStyleType: "none",
}

const footerCSS = {
    backgroundColor: 'rgba(1 100 32 / 1)',
    margin: '50px 0',
    color: 'white',
    textAlign: 'center',
    borderRadius: '50px',
}

export default function footer(props){
    return(
        <footer style={footerCSS}>
            <p>
                2021 | Jon Stutz
            </p>
            <ul style={NoBulletPoints}>
                <li><Link to="/">Getting Started</Link>
                <Link to="/save">Save</Link>
                <Link to="/invest">Invest</Link>
                <Link to="/about">About</Link></li>
            </ul>
        </footer>
    )
}