import React from 'react';
import './styles/App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'

function App() {
  return (
    <div className="app">
    {/*Header */}
    <div className="app__header">
      <h1>&#10009;CoVid19 Tracker&#10009;</h1>

    {/*Title + Select Dropdown Field */}
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="abc">
          <MenuItem value="worldwide">WorldWide</MenuItem>
          <MenuItem value="worldwide">Option 1</MenuItem>
          <MenuItem value="worldwide">Option 2</MenuItem>
          <MenuItem value="worldwide">Option 3</MenuItem>
        </Select>
      </FormControl>
      </div>
      

      

      {/*InfoBox*/}

      {/*InfoBox*/}

      {/*InfoBox*/}

      {/*Table*/}

      {/*Graph*/}

      {/*Map*/}
    </div>
  );
}

export default App;
