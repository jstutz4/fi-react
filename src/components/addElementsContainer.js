import React, { useEffect, useState } from 'react';

export default function AddElementsContainer(props){
   

    // let { data, loading, error }  = useQuery(props.query);
    const [ElementNumber, setElementNumber] = useState(props.initState ? props.initState : 1)

    var buttons =[]
    
    if(props.buttonGroup){
        buttons = props.buttonGroup.map((button, index) => {
            const type = index    
            return (
                <button key={type+index} className={type}  onClick={addElement} {...button.props}>{button.value}</button>
            )
        })
    }
    //const [quoteNum, setQuoteNum] = useState(0); // since we dont start with a quote
    const emptyParContainer = props.elementConstructor({id: ElementNumber})
    const [elementGroup, setElementGroup] = useState([emptyParContainer])
    const [buttonGroup, setButtonGroup] = useState(buttons)

    function addElement(e) {
        const newElementNumber = ElementNumber + 1
        let newElementProps = {...props.elementProps, id: newElementNumber}

        //NOTE apparently this does not update 
        setElementNumber(newElementNumber)
        setElementGroup(oldArray => [...oldArray, props.elementConstructor(newElementProps)])
    }

    useEffect(() => {
            setButtonGroup(buttons) 
    }, [props.elementProps.data]);
    
    useEffect(() => {
        if(props.elementProps.data){
           setElementGroup([props.elementConstructor(props.elementProps)])
        }
    }, [props.elementProps.data]);


    return (
    <section className="parDisplay">
        {elementGroup}
        <section className="groupSelect">
            {buttonGroup}
        </section>
    </section>
    )
}