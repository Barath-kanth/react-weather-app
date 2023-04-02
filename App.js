import { useState } from 'react';
import './App.css';
import './index.css';

const api = {
  key : "8891dcdfcb365fd7f47799e06cf326af",
  base : "https://api.openweathermap.org/data/2.5/",

}

function App() {
  const[query,setQuery] = useState("");
  const[weather,setWeather] = useState({});

  const search = e =>{
    if(e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result=>{
        setWeather(result)
        console.log(result)
      setQuery('')})
    }
  }

  const dateBuilder = (d) =>{

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

  return (

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    
    <main>
      <div className='search-box'>
        <input type='text'
        placeholder='Search...'
        className='search-bar'
        onChange = {(event)=>setQuery(event.target.value)}
        value={query}
        onKeyDown={search}/>

      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
    </main>
</div>
  );
}




export default App;
