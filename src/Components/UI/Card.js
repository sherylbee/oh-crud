import {React} from "react";
import "./Card.css";

const Card = ({className, children})=>{
    const classes = className ? className :""
    return (
        <div className={`card ${classes}`}>
            {children}
        </div>
    )
}

export default Card;