import React from "react";
import styled from "./Loading.module.css";

export default function Loader() {

    return (
        <div className={styled.conteinerLoader}>
            <div>
                <span className={styled.egg}></span>
                <span className={styled.loader}></span>
            </div>
        </div>
    )

}