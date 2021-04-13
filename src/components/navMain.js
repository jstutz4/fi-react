import { NavLink } from 'react-router-dom'





const mainNavNames = 
[
    {name:"Getting Started", link:"/start"}, 
    {name:"Saving", link:`/save`},
    {name:"Investing", link:"/invest"},
    {name:"About", link:"/about"},
    {name:"Feedback", link:"/feedback"}
]

const linkItems = [];
const menuBtn = []

function toggleMainNav(e){
    console.log(e.target)
    document.querySelector(".coreNavSelector").classList.toggle("navLinks_hidden")

}

menuBtn.push(<li key={"mainNavDropdown"} onClick={toggleMainNav}>&#9776;</li>)
mainNavNames.forEach((item) => {
    linkItems.push(<li key={item.name} onClick={toggleMainNav}>
        <NavLink to={item.link}>{item.name}</NavLink>
        </li>);
})


export default function NavHeader() {

    return(
        <nav id="mainNav">
            <ul>
                {menuBtn}
            </ul>
            <ul className="coreNavSelector navLinks_hidden">
                {linkItems}
            </ul>
        </nav>
    );
}
