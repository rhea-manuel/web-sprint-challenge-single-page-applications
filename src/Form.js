import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import './Styles.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Name from './Components/Name'
import FoodOptions from './Components/FoodOptions'
import Size from './Components/Size'
import GlutenFree from './Components/GlutenFree'
import Instructions from './Components/Instructions'

export default function Form({ pizzas, changePizzas }) {

    const toppings = ['Pepperoni', 'Sausage', 'Canadian Bacon', 'Spicy Italian Sausage']
    const [page, changePage] = useState('Form')

    const [formData, changeData] = useState({
        name: '',
        size: '',
        'Pepperoni': false, 'Sausage': false, 'Canadian Bacon': false, 'Spicy Italian Sausage': false,
        specialInstructions: '',
        glutenFree: false
    })

    // The errors have to have the same keys as the data, so I just spread it.
    const [errors, setErrors] = useState({ name: '', size: '' })

    // Finally, a state that manages whether the form can be submitted or not.
    const [canSubmit, submitPermission] = useState(false)

    const schema = Yup.object().shape({
        name: Yup
            .string()
            .required()
            .min(2),

        size: Yup
            .string()
            .required("Choose a role")
    })

    useEffect(() => {
        schema.isValid(formData).then(valid => {
            submitPermission(!valid)
        })
    }, [formData])




    const change = (event) => {

        event.persist()

        if (event.target.name === 'name' || event.target.name === 'size') {
            checkValid(event.target.name, event.target.value)
        }

        changeData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }

    function checkValid(name, type) {
        Yup.reach(schema, name).validate(type)
            .then(valid => {
                setErrors({ ...errors, [name]: '' })
            })

            // Otherwise, changes the error string to the first error message
            .catch(error => {
                console.log(error.errors[0])
                setErrors({ ...errors, [name]: error.errors[0] })
            })

    }

    const topping = (event) => {
        // console.log(event.target.checked)
        changeData({
            ...formData,
            [event.target.name]: event.target.checked
        })
    }

    const submit = (event) => {
        event.preventDefault()


        Axios.post("https://reqres.in/api/users", formData).then(response => {

            const curPizzas = [...pizzas]
            curPizzas.push(response.data)
            changePizzas(curPizzas)
        })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <form onSubmit={submit} >

                {/* <Route path="/">

                    <Name formData={formData} change={change} errors={errors}></Name>

                </Route> */}

                <Route path="/pizza" exact>

                    <Name formData={formData} change={change} errors={errors}></Name>
                    <Instructions formData={formData} change={change} canSubmit={canSubmit}></Instructions>

                </Route>

                {page === 'Form' ? <Link id="goToToppings"to={'/pizza/options'} onClick={() => changePage('Toppings')}>Choose toppings</Link> : <Link id="goBack" to={'/pizza'} onClick={() => changePage('Form')}>Go back</Link>}

                <Route path="/pizza/options">
                    <FoodOptions formData={formData} topping={topping} toppings={toppings}></FoodOptions>
                    <Size change={change}></Size>
                    <GlutenFree topping={topping}></GlutenFree>
                    
                </Route>



                


            </form>
        </div>
    )
}