import React from 'react'

export default function Instructions({ formData, change, canSubmit }) {
    return (
        <div>
            <label for="specialInstructions" >Special Instructions</label>
            <textarea id="specialInstructions" name="specialInstructions" value={formData.specialInstructions} onChange={change}></textarea>
            <button disabled={canSubmit}>Add to order</button>
        </div>
    )
}