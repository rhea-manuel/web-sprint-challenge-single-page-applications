import React from 'react'

export default function Size({change}) {
    return (
        <div>
            <label>
                Pizza Size
                <select name="size" onChange={change}>
                    <option selected disabled hidden value="">Choose a Size</option>
                    <option>small</option>
                    <option>medium</option>
                    <option>large</option>
                </select>
            </label>
        </div>
    )
}