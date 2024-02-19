import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dishTypes, orderRecipes, OrderTitle } from "../../redux/actions";
import Paginated from "../Paginated/Paginated"
import styled from "./Home.module.css"

export default function Home() {
    const dispatch = useDispatch()
    const diets = useSelector(state => state.diet)
    const handleOrder = (event) => {
        dispatch(orderRecipes(event.target.value))
    }
    
    const handleOrderTitle = (event) => {
        dispatch(OrderTitle(event.target.value))
    }
    const handleFilter = (event) => {
        dispatch(dishTypes(event.target.value))
    }

    return (<>

        <div className={styled.div}>
        <div>
            <select className={styled.filter} onChange={handleOrderTitle}>
                <option  disabled selected>Order by Title</option>
                <option  value="A-Z">Title (A-Z)</option>
                <option  value="Z-A">Title (Z-A)</option>
            </select>
            <select className={styled.filter} onChange={handleOrder}>
                <option disabled selected>Order by Health</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>
            <select className={styled.filter} onChange={handleFilter}>
                <option disabled selected>Order by Diets</option>
                {
                    diets.map((d, index) => {
                        return <option value={d} key={index}>{d}</option>
                    })
                }
            </select>
        </div>
     </div>
        <Paginated />
    </>)

}