import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'
import Form from './Form'
import Axios from 'axios'

const App = () => {

  // const [isHome, changeIsHome] = useState(true) 

  // function changePage(){
  //   changeIsHome(!isHome)
  // }

  const [pizzas, changePizzas] = useState([])


  return (
    <>
      <header>
        <h1>Lambda Eats</h1>
      </header>

      <Switch>
        <Route path="/pizza">
          <Form pizzas={pizzas} changePizzas={changePizzas} />
          {
            // const pizzaEntried
            pizzas.map((item) => {

              const keys = Object.keys(item)
              const values = Object.values(item)
              console.log(values)

              // const allValues = keys.map((item,index)=>{

              // })

              return (
                <div>{keys.map((item, index) => {
                  console.log(item)

                  if (item==='id' || item==='createdAt'){
                    return
                  }

                  if (item != 'name' && item != 'size' && item != 'specialInstructions') {

                    return (<div>{item}: {values[index] ? 'Yes' : 'No'}</div>)
                  }

                  else {
                    return (<div>{item}: {values[index]}</div>)
                  }

                })}
                  <br></br>
                </div>
              )

            })
          }
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
      {/* { isHome ? <Home click={changePage} /> : <div> Not home</div> } */}
    </>
  );
};
export default App;
