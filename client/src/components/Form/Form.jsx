import styled from "./Form.module.css"
import axios from "axios";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { createRecipe } from "../../redux/actions";
import { useHistory } from "react-router-dom";

export default function Form() {
    const dietTypes = useSelector(state => state.diet)
    const dispatch = useDispatch()
    const history = useHistory()

    const [form, setForm] = useState({
        title: "",
        summary: "",
        image: "",
        healthScore: "",
        step: "",
        diet: []
    })

    const [errors, setErrors] = useState({
        title: "",
        summary: "",
        healthScore: "",
        step: ""
    })

    const validate = (form) => {
        const regTitle = /^[^0-9]{1,100}$/
        // console.log("pasando por validate")
        let errors = {}

        if (regTitle.test(form.title)) {
            // console.log("pasando por validate              if")
            errors = {...errors, title: ""}
        } else {
            // console.log("pasando por validate              else")
            errors = {...errors, title: "There are errors in the title."}
        }

        if (form.summary.length > 30) {
            errors = {...errors, summary: "There are errors in the summary"}
        } else {
            errors = {...errors, summary: ""}
        }

        const floatRegex = /^[0-9]+(\.[0-9]{1,1})?$|^10(\.[0]{1,1})?$/
        if (floatRegex.test(form.healthScore)) {
            errors = {...errors, healthScore: ""}
        } else {
            errors = {...errors, healthScore: "Invalid value entered."}
        }
        if (form.step.length) {
            errors = {...errors, step: ""}
        } else {
            errors = {...errors, step: "There are errors in the steps entered."}
        }

        return errors


    }
    function inputHandleChangue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors(
          validate({
            ...form,
            [e.target.name]: e.target.value,
          })
        );
      }

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        setErrors(validate({...form, [property]: value}))
        setForm({...form, [property]: value})
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try{
        const result = await axios.post("http://localhost:3001/api/recipe", form)
        dispatch(createRecipe(result.data))
        alert("Your recipe has been created successfully!✅");
        history.push('/home')
    } catch (error) {
        alert("The recipe could not be created due to an error in the information")
    }
    }

    const handleCheck = (event) => {
        const check = event.target.value
        let arrayDiet = [...form.diet]

        if (arrayDiet.length) {
            const aux = arrayDiet.filter((diet) => diet !== check)
            aux.length === arrayDiet.length //si da verdadera significa que no estaba check dentro de arrayDiet, por lo tanto lo pusheamos
                ? arrayDiet.push(check)
                : arrayDiet = [...aux] // si estaba adentro devolvemos el array filtrado

        } else {
            arrayDiet.push(check)
        }
        setForm({...form, diet: arrayDiet})
    }
    return (
<div>
            <div className={styled.enc}>

                <div>
                    <h1 className={styled.title}>
                        Create Recipe
                    </h1>
                </div>

                <div>
                    <hr className={styled.hr}></hr>
                </div>

            </div>
        <form onSubmit={submitHandler} className={styled.form}>
            <div className={styled.div1}>
                <div>
                    <div><label>Title : </label></div>
                    <input type="text" value={form.title} onChange={changeHandler} name="title"/>
                    {errors.title && <span className={styled.err}>{errors.title}</span>}
                </div>
                <div>
                   <div className={styled.txt}><label>Summary: </label></div>
                    <input type="text" value={form.summary.replace(/<[^>]+>/g, '')} onChange={changeHandler}
                           name="summary"/>
                    {errors.summary && <span className={styled.err}>{errors.summary}</span>}
                </div>
                <div>
                <div className={styled.txt}><label>Health Score: </label></div>
                    <input type="text" value={form.healthScore} onChange={changeHandler} name="healthScore"/>
                    {errors.healthScore && <span className={styled.err}>{errors.healthScore}</span>}
                </div>
                <div>
                <div className={styled.txt}><label>URL Image: </label></div>
                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={inputHandleChangue}
                  />
                </div>
                <div>
                <div className={styled.txt}><label>Steps: </label></div>
                    <input type="text" value={form.step} onChange={changeHandler} name="step"/>
                    {errors.step && <span className={styled.err}>{errors.step}</span>}
                </div>
            </div>
            <div>
            <div className={styled.txt}><label>Diets Types: </label></div>
                {
                    dietTypes.map((diet, index) => {
                        
                        return (
                            <div className={styled.list} key={index}>
                                <label>{diet}</label>
                                <input type="checkbox" name={diet}
                                       value={diet}
                                       onChange={handleCheck}/>
                            </div>
                        )
                    })
                }
        <br></br>
        </div>
        <button className={styled.btn1} type="create">Create</button>
        <div>
        <br></br>
        <div>
        <Link to="/home"><button className={styled.btn2}>Cancel</button></Link>
        </div>
         <br></br>
                </div>
        </form>

        </div>
  )
 }
