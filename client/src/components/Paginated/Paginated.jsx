import Cards from "../Cards/Cards";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {currentPageHandler, getHomeCards, Loading} from "../../redux/actions";
import Loader from "../Loading/Loading";
import styled from "./Paginated.module.css"
const {useSelector} = require("react-redux");

export default function Paginated() {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    const loader = useSelector(state => state.loader)
    const foods = useSelector(state => state.foods)
    const page = []

// eslint-disable-next-line 
    useEffect( async () => {
    if (!foods.length){
     await dispatch (getHomeCards()) 
    setTimeout(()=>{dispatch(Loading())}, 0 ) }
        // eslint-disable-next-line
    },[currentPage, foods, loader])

    for (let i = 0; i < foods.length; i = i + 9) {
        page.push(foods.slice(i, i + 9 || foods.length))
    }

    const handlePage = (event) => {
        dispatch(currentPageHandler(parseInt(event.target.value)))
    }

    const handlePrevClick = () => {

        currentPage > 0 && dispatch(currentPageHandler(currentPage - 1))
    };

    const handleNextClick = () => {

        currentPage < page.length - 1 && dispatch(currentPageHandler(currentPage + 1))
    }

    if (loader) {
        return (<Loader/>
        )
    } else {
        return (
            <div>
                <button className={styled.buttons} onClick={handlePrevClick}> Back</button>
                {
                    page.map((p, index) => <button className={styled.btn12}
                                                   onClick={handlePage}
                                                   value={index}
                                                   key={index} >{index + 1}</button>)
                }
                <button className={styled.buttons} onClick={handleNextClick}> Next</button>
                <Cards foods={page[currentPage]}/>
            </div>
        )
    }
}