import React from "react";
import "./homepage.css";
import { useHistory } from "react-router-dom";

export default function Homepage() {
  const history = useHistory();

  const navigate = () => {
    history.push("/uploadbatches");
  };

  const navigateUpdate = () => {
    history.push("/updatequality");
  };

  return (
    <div>
      <h1>Homepage</h1>
      <ul className="list">
        <li onClick={navigate}>Upload Batches</li>
        <br />
        <li onClick={navigateUpdate}>Update Quality Info</li>
      </ul>
    </div>
  );
}
