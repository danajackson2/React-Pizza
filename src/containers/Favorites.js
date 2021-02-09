import React, { Component, Fragment } from 'react'
import PizzaList from './PizzaList'

function Favorites(props){
    return(
        <Fragment>
            <h1>Favorite Pizzas</h1>
            <PizzaList pizzas={props.favorites} toggleFav={props.toggleFav} selectPizza={props.selectPizza}/>
        </Fragment>
    )
}

export default Favorites