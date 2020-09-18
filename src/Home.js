import React from 'react'
import './Styles.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

export default function Home({click}) {
    return (
        <div class="hero-image"> 
        <h2>Your favorite food, delivered while coding.</h2>
        <Link class="link" to={'/pizza'}>Pizza?</Link>
        </div>
    )
}