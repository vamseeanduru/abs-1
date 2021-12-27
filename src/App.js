import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import UploadBatches from "./components/UploadBatches/UploadBatches";
import UpdateQualityInfo from "./components/UpdateQuality/UpdateQualityInfo";
// import { useState } from 'react';

function App() {
  // const [ users, setUsers ] = useState([]);

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* {users && users._id ? <Homepage /> : <Login setUsers={setUsers}/>} */}
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/uploadbatches">
            <UploadBatches />
          </Route>
          <Route path="/updatequality">
            <UpdateQualityInfo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
