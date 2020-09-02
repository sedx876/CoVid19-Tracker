import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import "leaflet/dist/leaflet.css"
import Table from './components/Table'
import { sortData } from './components/util'
import LineGraph from './components/LineGraph'
import numeral from "numeral";



function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);


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
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        let sortedData = sortData(data);
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortedData);
      });
  };

  getCountriesData();
}, []);

const onCountryChange = async (e) => {
  const countryCode = e.target.value

  const url = countryCode === 'worldwide'
  ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setInputCountry(countryCode);
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
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
      <Map 
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>WorldWide New Cases</h3>
            <LineGraph casesType={casesType}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
