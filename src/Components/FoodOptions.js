import React from 'react'

export default function FoodOptions({toppings, formData, topping}) {
    return (
        <div>
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
                // < label > G
            }
        </div>
    )
}