import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styled from "./Nav.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CleanDetail } from "../../redux/actions";

export default function Nav(){

    const dispatch = useDispatch()

    const handleState = ()=>{
        dispatch(CleanDetail())
    }

    return (
        <div className={styled.navBar}>
            <p className={styled.pifood}>PI - FOOD</p>
            <Link to= "/">    <button  className={styled.btn} >Logout</button></Link>
            <Link to="/home"> <button  className={styled.btn} onClick={handleState}>Home</button> </Link>
            <Link to="/form"> <button className={styled.btn}>Create Recipe</button> </Link>
            <SearchBar />
        </div>
    )
}