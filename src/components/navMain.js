import { Link } from 'react-router-dom'





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
    e.target.parentNode.nextElementSibling.classList.toggle("navLinks_hidden")

}

menuBtn.push(<li key={"mainNavDropdown"} onClick={toggleMainNav}>&#9776;</li>)
mainNavNames.forEach((item) => {
    linkItems.push(<li key={item.name}>
        <Link to={item.link}>{item.name}</Link>
        </li>);
})


export default function NavHeader(props) {
    if(props.location.pathname.includes('admin')){
        return
    }
    return(
        <nav id="mainNav">
            <ul>
                {menuBtn}
            </ul>
            <ul className="navLinks_hidden">
                {linkItems}
            </ul>
        </nav>
    );
}
