import React, { Component } from 'react';
import './App.css';

function CitySearchField(props){
  return(
    <div className="container">
      <div className="city-name-header">
          <label>
            City:
            <input type="text" onChange={props.cityChanged}/>
          </label>
       </div>
      <div className="city-name-body">
        
            <button onClick={props.searchCity}>Search</button>
       
      </div>
    </div>
  );
}

function ZipCodes(props){
  return(
    <div className="city-bar">
          <p>{props.data}</p>
            
    </div>
  );
}

class App extends Component {
  state = {
    city: "",
    zipResults: [],
  }

  handleCityChange(e){
    const city = e.target.value.toUpperCase();
    this.setState({city: city});

  }

  handleSearchCity(e){
    fetch("http://ctp-zip-api.herokuapp.com/city/" + this.state.city)
    .then(res => res.json())
    .then(jsonData => {
      this.setState({
        zipResults: jsonData,
      })
    })
    .catch(err => {
      this.setState({zipResults: [] })
    })
  }

  render(){
    console.log(this.state.zipResults);
    return (
        <div className="App">
          <div className="App-header">
            <h2>City Search</h2>
          </div>
          <CitySearchField cityChanged={e => this.handleCityChange(e)} searchCity={e => this.handleSearchCity(e)} cityValue={this.state.city}/>
          <div>
            {this.state.zipResults.map(
              (item, index) => {return <ZipCodes data={item} key={index}/>}

            )}

          </div>
          
        </div>
        
    );
  }
}

export default App;
