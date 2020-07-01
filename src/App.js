import React, { Component } from 'react';
import './App.css';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import 'bulma/css/bulma.css';

class App extends Component {

  state = {
    FoodList: foods,
    FilterFoods:foods,
    showForm: false,
    name: '',
    calories: '',
    image: '',
  };

  displayFood = () => {
    let arr = this.state.FilterFoods.map((foods) => {
      return (
        <FoodBox
          key={foods.name}
          name={foods.name}
          calories={foods.calories}
          image={foods.image}
        />
      );
    });
    return arr;
  };

  // Adds new food item to the list of foods
  addFood = (event) => {
    event.preventDefault();
    let newFoodObj = {
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.image,
      quantity: 0,
    };

    let FoodListCopy = [...this.state.FoodList];
    FoodListCopy.unshift(newFoodObj);

    this.setState({
      FoodList: FoodListCopy,
      showForm: false,
    });
  };

  searchList = (event) => {

    let FoodListCopy = this.state.FoodList.filter((eachFood) => {
      return eachFood.name.toLowerCase().includes(event.target.value.toLowerCase()) 
    });

    this.setState({
      
      FilterFoods: FoodListCopy,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Shows and hides form
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  render() {
    return (
      <div className="App">

      <h1>Iron Nutrition</h1>

        <button onClick={this.toggleForm}> Add Food</button>
        {this.state.showForm ? (
          <form onSubmit={this.addFood}>
            <label>Food:</label>
            <input onChange={this.handleChange} type="text" name="name"></input>
            <label>Calories:</label>
            <input
              onChange={this.handleChange}
              type="nummber"
              name="calories"
            ></input>
            <label>Image Url:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="image"
            ></input>
            <input type="submit" />
          </form>
        ) : (
          ''
        )}

        {/* Break */}
        <br /> 

        <form className = "is-half column">
          <input style = {{width:"850px"}} onChange={this.searchList} placeholder="Search"></input>
        </form>
        
        {this.displayFood()}

      </div>
    );
  }
}

export default App;
