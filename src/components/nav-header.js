import React from 'react'
import { Link } from 'react-router-dom'
// { Component, PropTypes } 

const ulCSS = {
    listStyleType: "none",
    margin: "0",
    paddingLeft: "0",
    textAlign: 'center',
}

const navHorizontal = {
    display: 'inline-block',
    padding: "0 7px",
}

const navColor = {
    border: "3px green solid",
    borderRadius: "6px",
    float: "left",
    backgroundColor: "rgba(1,100,32, .9)",
    padding: "3px",
    marginTop: "5vh",
}

const defaultSave = "1"

const mainNavNames = 
[
    {name:"Getting Started", link:"/start/1"}, 
    {name:"Saving", link:`/save/${defaultSave}`},
    {name:"Investing", link:"/invest"},
    {name:"About", link:"/about"},
]

const linkItems = [];

mainNavNames.forEach((item) => {
    linkItems.push(<li key={item.name} style={navHorizontal}><Link to={item.link}>{item.name}</Link></li>);
})

export default function NavHeader(props) {
    return(
        <nav style={navColor}>
            <ul style={ulCSS}>
                {linkItems}
            </ul>
        </nav>
    );
}
