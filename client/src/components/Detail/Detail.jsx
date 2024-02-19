import { useDispatch, useSelector } from "react-redux";
import { getFoodId } from "../../redux/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css"



export default function Detail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => 
    dispatch(getFoodId(id)), 
    // eslint-disable-next-line
    [])

    const {image, title, diet, dishTypes, summary, steps, healthScore} = useSelector(state => state.foodDetail)
    return (
        <div className={styles.enc} >
            <h1>{title}</h1>
            <img className={styles.imgdetail} src={image} alt="Imagen no encontrada"/>
            <p>DIETS: {diet}</p>
            <p>DISH TYPES: {dishTypes}</p>
            <p>SUMMARY: {summary}</p> 
            <p>STEPS: {steps}</p>   
            <h2>HEALTH SCORE: {healthScore}</h2>
            <Link to="/home"><button className={styles.btn1}>Back</button></Link>
            {/* className={styles.summary} className={styles.steps} */}
        </div>)
}