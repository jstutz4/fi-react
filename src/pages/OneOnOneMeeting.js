import React from 'react'

export default function OneOnOneMeeting(props){
    function openSchedule (e) {
        document.getElementsByTagName("a")[0].click
        console.log("there was a click")
    }

    return(
        <React.Fragment>
            <header className="background_color margin_top padding_box">
                <h1>I am here for Personalize help</h1>
            </header>
            {/* use a hard value for the height since height 100% wont work with iframe  */}
            <a href="https://m.supersaas.com/schedule/EmpowerFIu/One_on_One_Meeting" target="_blank" rel="noopener noreferrer" className="background_color schedule" style={{height: '1000px'}} >
                <iframe width="100%" height="100%" src="https://m.supersaas.com/schedule/EmpowerFIu/One_on_One_Meeting" onClick={openSchedule}>
                </iframe>
            </a>
            
            
        </React.Fragment>
    )
}