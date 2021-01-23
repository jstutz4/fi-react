import React from 'react'

const absPos = {
    position: "absolute",
    top: '95px',
    
}

const noBullets = {
    listStyleType: "none",
    backgroundColor: 'darkgrey',
    padding: '0',
    marginLeft: '16px',

}




export default function articleNav(props) {
    console.log(props)
    return (
        <nav style={absPos} className="articleNav">
            <ul style={noBullets}>
                <li>
                    {props.articleLinks}
                </li>
            </ul>
        </nav>
    )
}