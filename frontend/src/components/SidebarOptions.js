import React, {useState, useEffect} from "react";
import "./css/SidebarOptions.css";
import axios from "axios";
import Post from "./PostProject";
import { Modal } from "react-responsive-modal";
import CloseIcon from "@material-ui/icons/Close";
import { selectUser } from "../feature/userSlice";
import { useSelector } from "react-redux";
import { Input } from "@material-ui/core";


function SidebarOptions() {
  const [posts, setPosts] = useState([]);
  const Close = <CloseIcon />;
  const [project, setproject] = useState("");
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async () => {
    if (project !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        projectName: project,
        user: user,
      };
      await axios
        .post("/api/projects", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
          alert("Error in adding project");
        });
    }
  };
  
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="feed">
        <button onClick={() => setOpen(true)}>Add Project</button>
    
      {posts.map((post, index) => (
        <Post key={index} post={post} />
        
      ))}
      <Modal
             open={open}
             onClose={() => setOpen(false)}
             closeIcon={Close}
             closeOnOverlayClick={false}
           
             classNames={{
               modalAnimationIn: 'customEnterModalAnimation',
               modalAnimationOut: 'customLeaveModalAnimation',
             }}

             animationDuration={800}
             styles={{
                overlay: {
                height: "auto",
                },
              }}
           >
           
           <div className="modal__title">
              <h5>Add Project</h5>
            </div>
            <div className="modal__info">
            
            </div>
            <div className="modal__Field">
              <Input
                value={project}
                onChange={(e) => setproject(e.target.value)}
                type=" text"
                placeholder="Project Name..."
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Project
              </button>
            </div>
          </Modal>
    </div>
  );
}

export default SidebarOptions;
