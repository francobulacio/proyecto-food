import styled from "styled-components";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";


const CardDiv = styled.div`
  width: 25%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #040404ba;
  img {
    border-radius: 30px;
    margin: 15px;
    border: solid #ffffff;
    display: flex;
    width: 200px;
    height: 140px;
  }
  :hover {
    transition: 1s;
    background:  #00000000;
    img {
      transition: 1s;
      width: 290px;
      height: 212px;
      border-radius: 200px;
      filter: drop-shadow(0 0 5px  #e5eaec );
    }
  }
`
const NameP = styled.p`
  color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, sans-serif;
  width: 350px;
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DietP = styled.p`
  color: rgb(255, 255, 255);
  font-family: Verdana, Geneva, sans-serif;
  width: 300px;
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Card = (props) => {

    return (
        <CardDiv>
                <Link to={`/detail/${props.id}`}>
            <img src={props.image} alt="Imag no encontrada"/>
                </Link>
                    <NameP>{props.title}</NameP>
            <div className={styles.hscore}>
                <NameP>Health Score: {props.healthScore}</NameP>
            </div>
            <DietP>Diets: {
                props.diet.map((d, index)=>{  
                  d = d.charAt(0).toUpperCase() + d.slice(1);
                    return <span key={index}> {d} </span>
                })
            } </DietP>

        </CardDiv>
    )
}

export default Card;