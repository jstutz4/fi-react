import { Link } from 'react-router-dom'





const mainNavNames = 
[
    {name:"Getting Started", link:"/start"}, 
    {name:"Saving", link:`/save`},
    {name:"Investing", link:"/invest"},
    {name:"About", link:"/about"},
    {name:"Feedback", link:"/feedback"},
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

linkItems.push(<li key={"mainNavDropdown"}className="show" onClick={toggleMainNav}>&#9776;</li>)
mainNavNames.forEach((item) => {
    linkItems.push(<li key={item.name} className="hidden" onClick={toggleMainNav}>
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
                {linkItems}
            </ul>
        </nav>
    );
}
