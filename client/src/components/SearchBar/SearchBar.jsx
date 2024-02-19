import React from "react";
import {useDispatch} from "react-redux";
import {putFoodByName, deleteState, Loading} from "../../redux/actions";
import {Link, useHistory} from "react-router-dom";
import styled from "./SearchBar.module.css";

// import {useHistory} from "react-router-dom";

export default function SearchBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [recipeName, setRecipeName] = React.useState("")

    const handleInput = (event) => {
        setRecipeName(event.target.value)
    }
    const handleClick = (event) => {
        event.preventDefault()
        dispatch(putFoodByName(recipeName))
        setRecipeName("")
        history.push("/home")
    }
    const reset = () => {
        dispatch(Loading())
        dispatch(deleteState())
    }
    return (
        <div>
            <input type='search' placeholder="Search recipe..." value={recipeName} onChange={handleInput}/>
            <Link to="/home">
                <button type='submit' className={styled.btn} onClick={handleClick}>Search</button>
            </Link>
            <Link to="/home">
                <button onClick={reset} className={styled.btn} >Delete</button>
            </Link>

        </div>
    );
}