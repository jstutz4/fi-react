import React from 'react'

const absPos = {
    position: "absolute",
    top: '98px',
    
}

const noBullets = {
    listStyleType: "none",
    backgroundColor: 'darkgrey',
    padding: '0',
    marginLeft: '16px',

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