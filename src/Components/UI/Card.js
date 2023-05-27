import {React, useEffect, useState} from "react";
import "./Card.css";

const Card = ({className, msg, children})=>{
    const classes = className ? className :""
    const [displayMsg, updateDisplayMsg] = useState(msg)
    useEffect(()=>{
        updateDisplayMsg(msg)
    }, [msg])
    console.log(msg);
    return (
        <div className={`card ${classes}`}>
            {
                classes.indexOf('modal') === -1 &&
                <section className="message">
                {
                    !displayMsg&&
                    <p>Create a User</p>
                }
                    <p className='warning'>{displayMsg}</p>
                </section>
            }
   
            {children}
        </div>
    )
}

export default Card;