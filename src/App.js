import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import "leaflet/dist/leaflet.css"



function App() {
const [countries, setCountries] = useState([])
const [country, setCountry] = useState('worldwide')
// https://disease.sh/v3/covid-19/countries

useEffect(() => {
  const getCountriesData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
        {
          name: country.country,
          value: country.countryInfo.iso2,
        }
      ))
      setCountries(countries)
    })
  }
  getCountriesData()
}, [])

const onCountryChange = async (e) => {
  const countryCode = e.target.value

  setCountry(countryCode)
}

  return (
    <div className="app">
    {/*Header */}
    <div className="app__header">
      <h1>&#10009;CoVid19 Tracker&#10009;</h1>

    {/*Title + Select Dropdown Field */}
      <FormControl className="app__dropdown">
        <Select variant="outlined" 
        onChange={onCountryChange}
        value={country}>
        <MenuItem value="worldwide">WorldWide</MenuItem>
        { countries.map((country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
          {/* <MenuItem value="worldwide">WorldWide</MenuItem>
          <MenuItem value="worldwide">Option 1</MenuItem>
          <MenuItem value="worldwide">Option 2</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem> */}
        </Select>
      </FormControl>
      </div>

      {/*InfoBox*/}
        <div className="app__stats">
          <InfoBox title='CoronaVirus Cases' cases={123} total={123} />
          <InfoBox title='Recovered' cases={123} total={123} />
          <InfoBox title='Deaths' cases={123} total={123} />
        </div>

      {/*Table*/}

      {/*Graph*/}

      {/*Map*/}
      <Map />
    </div>
  );
}

export default App;
