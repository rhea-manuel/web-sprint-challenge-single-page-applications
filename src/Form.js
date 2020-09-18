import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'

export default function Form({ pizzas, changePizzas }) {

    const toppings = ['Pepperoni', 'Sausage', 'Canadian Bacon', 'Spicy Italian Sausage']

    const [formData, changeData] = useState({
        name: '',
        size: '',
        'Pepperoni': false, 'Sausage': false, 'Canadian Bacon': false, 'Spicy Italian Sausage': false,
        specialInstructions: '',
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
    // useEffect(() => {
    //     console.log(errors)
    //     const values = Object.values(errors)

    //     values.forEach(element => {
    //         if (element===''){
    //             submitPermission(false)
    //             return
    //         }
    //     })
        
    //     submitPermission(true)
    //     // schema.isValid(formData).then(valid => {
    //     //     submitPermission(!valid)
    //     // })
    // }, [errors])

    // let defaultState = {};

    // toppings.forEach((item)=>{

    //     defaultState = {
    //         ...defaultState,
    //         item
    //     }
    // })

    // console.log(defaultState)



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

    // const specialInstructions = (event) => {
    //     const value = event.target.val()

    //     changeData({

    //         ...formData,
    //         [event.target.name]: value
    //     }
    //     )
    // }

    const topping = (event) => {
        console.log(event.target.checked)
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
                <label for="name" >Name</label>
                <input id="name" name="name" value={formData.name} onChange={change}></input>
                {errors.name.length > 0 ? (<span>{errors.name}</span>) : null}
                <br></br>
                <label>Toppings</label>
                <br></br>
                {
                    toppings.map((item) => {

                        return (
                            <label>
                                {item}
                                <input class="topping" value={formData.item} name={item} type="checkbox" onChange={topping}></input>
                                <br></br>
                            </label>
                        )
                    }
                    )
                }

                <br></br>
                <label>
                    Pizza Size
                    <select name="size" onChange={change}>
                        <option selected disabled hidden value="">Choose a Size</option>
                        <option>small</option>
                        <option>medium</option>
                        <option>large</option>
                    </select>
                </label>

                <br></br>
                <label for="specialInstructions" >Name</label>
                <textarea id="specialInstructions" name="specialInstructions" value={formData.specialInstructions} onChange={change}></textarea>
                <button disabled={canSubmit}>Add to order</button>
            </form>
        </div>
    )
}