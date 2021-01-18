import React from 'react'
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
    backgroundColor: "rgba(0,200,0, .3)",
    padding: "3px",
    marginTop: "5vh",
}

const mainNavNames = 
[
    {name:"Getting Started", link:"#"}, 
    {name:"Saving", link:"#"},
    {name:"Investing", link:"#"},
    {name:"About", link:"#"},
]

const linkItems = [];

mainNavNames.forEach((item) => {
    linkItems.push(<li key={item.name} style={navHorizontal}><a href={item.link}>{item.name}</a></li>);
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
