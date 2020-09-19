import React from 'react'

export default function ({ formData, change, errors }) {

    return (

        <div>
            <label for="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={change}></input>
            {errors.name.length > 0 ? (<span>{errors.name}</span>) : null}
        </div>
    )
}