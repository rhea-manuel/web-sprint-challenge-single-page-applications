import React from 'react'

export default function GlutenFree({topping}) {
    // <label>Gluten Free</label>
    return (
        <div>
            <label for="glutenFree">Gluten free?</label>
            <label class="switch">
                <input id="glutenFree" type="checkbox" name="glutenFree" onChange={topping} />
                <span class="slider round"></span>
                {/* <input type="checkbox" name="glutenFree" onChange={topping} ></input> */}
                {/* <Toggle name="glutenFree" onChange={topping} ></Toggle> */}
                {/* <ToggleSwitch onChange={topping} checked={formData.glutenFree}></ToggleSwitch> */}
            </label>
        </div>
    )
}