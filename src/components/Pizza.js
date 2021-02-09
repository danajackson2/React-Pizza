import React from "react"

const Pizza = (props) => {
  const {topping, size, vegetarian} = props.pizza
  return(
    <tr >
      <td onClick={() => props.toggleFav(props.pizza)}>{topping}</td>
      <td onClick={() => props.toggleFav(props.pizza)}>{size}</td>
      <td onClick={() => props.toggleFav(props.pizza)}>{vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.selectPizza(props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
