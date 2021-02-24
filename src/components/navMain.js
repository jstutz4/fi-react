import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const ulCSS = {
    listStyleType: "none",
    margin: "0",
    paddingLeft: "0",
}

const navHorizontal = {
    
}

const navColor = {
    border: "3px green solid",
    borderRadius: "6px",
    // float: "left",
    backgroundColor: "rgba(1,100,32, .9)",
    padding: "3px",
    marginTop: "5vh",
}

const mainNavNames = 
[
    {name:"Getting Started", link:"/start"}, 
    {name:"Saving", link:`/save`},
    {name:"Investing", link:"/invest"},
    {name:"About", link:"/about"},
]

const linkItems = [];

function toggleMainNav(item){
    let i = 0

    // so we will always get the nav and hidden children
    if(item.nativeEvent.path.length > 9) {
        i++
    }

    item.nativeEvent.path[i].parentElement.childNodes.forEach((child, index)=> {if(index != 0){child.classList.toggle('hidden')}})

}

linkItems.push(<li key={"mainNavDropdown"}style={navHorizontal} className="show" onClick={toggleMainNav}>&#9776;</li>)
mainNavNames.forEach((item) => {
    linkItems.push(<li key={item.name} style={navHorizontal} className="hidden" onClick={toggleMainNav}>
        <Link to={item.link}>{item.name}</Link>
        </li>);
})


export default function NavHeader(props) {
    if(props.location.pathname.includes('admin')){
        return
    }
    return(
        <nav style={navColor} id="mainNav">
            <ul style={ulCSS}>
                {linkItems}
            </ul>
        </nav>
    );
}
