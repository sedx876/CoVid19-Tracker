import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import "leaflet/dist/leaflet.css"
import Table from './components/Table'
import { sortData } from './components/util'



function App() {
const [countries, setCountries] = useState([])
const [country, setCountry] = useState('worldwide')
const [countryInfo, setCountryInfo] = useState({})
const [tableData, setTableData] = useState([])


useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
}, []);

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
      const sortedData = sortData(data)
      setTableData(sortedData)
      setCountries(countries)
    })
  }
  getCountriesData()
}, [])

const onCountryChange = async (e) => {
  const countryCode = e.target.value

  const url = countryCode === 'worldwide'
  ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then((response) => response.json())
  .then((data) => {
    //setInputCountry(countryCode);
    setCountry(countryCode);
    setCountryInfo(data);
    //setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    //setMapZoom(4);
  })

  
}

  return (
    <div className="app">
    {/*Header */}
    <div className="app__left">
    <div className="app__header">
      <h1>&#10009; CoVid19 Tracker &#10009;</h1>

    {/*Title + Select Dropdown Field */}
      <FormControl className="app__dropdown">
        <Select variant="outlined" 
        onChange={onCountryChange}
        value={country}>
        <MenuItem value="worldwide">WorldWide</MenuItem>
        { countries.map((country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
        </Select>
      </FormControl>
      </div>

      {/*InfoBox*/}
        <div className="app__stats">
          <InfoBox title='CoronaVirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>


      {/*Map*/}
      <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>WorldWide New Cases</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
