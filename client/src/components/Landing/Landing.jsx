import {Link} from "react-router-dom";
import styled from "./Landing.module.css"

export default function Landing() {
    return (<div className={styled.contenedor}>
            <h1 className={styled.title}>FOOD</h1>
          <p className={styled.info}>Enter the largest food community in the world!</p>
        <Link to="/home">
            <button className={styled.button}>Welcome!</button>
        </Link>
        <p className={styled.credits}></p>
    </div>)
}



