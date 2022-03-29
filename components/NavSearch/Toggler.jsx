import React, { useState } from 'react';


export default function Toggler({navOpen,setNav}) {

    const [animate, setAnimation] = useState(false);
    const [crossIcon, setCloseBtn] = useState(false);

    const toggle = () => {
        if(!animate){
            setNav(!navOpen);
            setAnimation(!animate);
            setTimeout(() => {
                setCloseBtn(!crossIcon);
            }, 300);
        }else{
            setNav(!navOpen);
            setCloseBtn(!crossIcon);
            setTimeout(() => {
                setAnimation(!animate);
            }, 300);
        }
    }

    let animateClass , closeClass;

    if(animate){
        animateClass = 'animate';
    }

    if(crossIcon){
        closeClass = 'show';
    }

    return (
        <>
            <div className={"menu-toggler " + animateClass + " " + closeClass} onClick={toggle}>
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
        </>
    )
}
