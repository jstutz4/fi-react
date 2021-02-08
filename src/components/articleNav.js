import React from 'react'

const absPos = {
    position: "absolute",    
}

const noBullets = {
    listStyleType: "none",
    backgroundColor: 'darkgrey',
    padding: '0',
}




export default function articleNav(props) {
    return (
        <nav style={absPos} className="articleNav">
            <ul style={noBullets}>
                <li>
                    {props.children}
                </li>
            </ul>
        </nav>
    )
}