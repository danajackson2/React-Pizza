import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
import Favorites from './containers/Favorites'
class App extends Component {
  state={
    pizzas: [],
    selectedPizza: {},
    favorites: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas}))
  }

  updatePizza = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizza.id}`,{
      method:'PATCH',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(this.state.selectedPizza)
    })
    .then(res => res.json())
    .then(updatedPizza => {
      this.setState(prevState => {
        let oldPizza = prevState.pizzas.find(p => p.id === updatedPizza.id)
        Object.assign(oldPizza, updatedPizza)
        return {
          pizzas: prevState.pizzas
        }})
    })
  }

  selectPizza = pizza => {this.setState({selectedPizza:pizza})}

  handleVegChange = e => {
    console.log(e.target.value)
    if (e.target.value === "Vegetarian") {
      this.setState({selectedPizza: {...this.state.selectedPizza, vegetarian: true}})
    } else {
      this.setState({selectedPizza: {...this.state.selectedPizza, vegetarian: false}})
    }
  }
  
  changeSize = (e) => {
    this.setState({selectedPizza: {...this.state.selectedPizza, size: e.target.value}})
  }

  changeTopping = (e) => {
    this.setState({selectedPizza: {...this.state.selectedPizza, topping: e.target.value}})
  }

  toggleFav = (pizza) => {
    if (this.state.favorites.map(p => p.id).includes(pizza.id)) {
      //remove from favorites
      let newFaves = this.state.favorites.filter(p => p.id !== pizza.id)
      this.setState({favorites: newFaves})
      //add to pizzas
      this.setState({pizzas: [...this.state.pizzas, pizza]})
    } else{
      //add to favorites
      this.setState({favorites: [...this.state.favorites, pizza]})
      //remove from pizzas
      let newPizzas = this.state.pizzas.filter(p => p.id !== pizza.id)
      this.setState({pizzas: newPizzas})
    }
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm updatePizza={this.updatePizza} changeTopping={this.changeTopping} changeSize={this.changeSize} handleVegChange={this.handleVegChange} pizza={this.state.selectedPizza}/>
        <PizzaList selectPizza={this.selectPizza} pizzas={this.state.pizzas} toggleFav={this.toggleFav}/>
        <Favorites favorites={this.state.favorites} toggleFav={this.toggleFav} selectPizza={this.selectPizza}/>
      </Fragment>
    );
  }
}

export default App;
