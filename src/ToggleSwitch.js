import React from 'react'
import Switch from 'react-switch'

export default function ToggleSwitch({onChange, checked}){
    return (
            <Switch name="glutenFree" checked={checked} onChange={onChange} ></Switch>
    )
//     if (enabled){
//         return(
//             // <div>
//             //     {/* <input></input> */}
//             // </div>
//             <div>

// <span><input type= "checkbox" class="circle"></input>On</span>
//             </div>
//         )
//     }

//     else {
//         return(
//             <div>

// <span><input type="checkbox" class="circle"></input>Off</span>
//             </div>
//         )
//     }
}