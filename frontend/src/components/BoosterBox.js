import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import "./css/BoosterBox.css";

function BoosterBox() {
  const user = useSelector(selectUser);
  return (
    <div className="BoosterBox">
      <div className="BoosterBox__info">
        <Avatar src={user?.photo} />
      </div>
      <div className="BoosterBox__Booster">
        <h5>What is your question or link?</h5>
      </div>
    </div>
  );
}

export default BoosterBox;
