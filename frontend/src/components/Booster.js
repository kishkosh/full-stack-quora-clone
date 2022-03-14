import React from "react";
import Feed from "./Feed";
import BoosterHeader from "./BoosterHeader";
import Sidebar from "./Sidebar";
import Widget from "./questionsSubject";
import "./css/Booster.css";

function Booster() {
  return (
    <div className="Booster">
      <BoosterHeader />
      <div className="Booster__contents">
        <div className="Booster__content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Booster;
