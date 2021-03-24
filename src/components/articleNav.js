import React from 'react'






export default function articleNav(props) {
    return (
        <nav className="articleNav">
            <ul>
                <li>
                    {props.children}
                </li>
            </ul>
        </nav>
    )
}