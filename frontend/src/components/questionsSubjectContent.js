import React, {useState, useEffect} from "react";
import Post from "./PostQuestionsSubject";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import CloseIcon from "@material-ui/icons/Close";
import { selectUser } from "../feature/userSlice";
import { useSelector } from "react-redux";
import { Input } from "@material-ui/core";
import "./css/questionsSubjectContent.css";

function QuestionsSubjectContent() {
  const [posts, setPosts] = useState([]);
  const Close = <CloseIcon />;
  const [questionsSubject, setquestionsSubject] = useState("");
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async () => {
    if (questionsSubject !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionsSubject: questionsSubject,
        user: user,
      };
      await axios
        .post("/api/questionsSubject", body, config)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          window.location.href = "/";
        })
        .catch((e) => {
          console.log(e);
          alert("Error in adding questionsSubject");
        });
    }
  };
  
  useEffect(() => {
    axios
      .get("/api/questionsSubject")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="feed">
        <button onClick={() => setOpen(true)}>Add Question Subject</button>
    
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
              <h5>Add Question Subject</h5>
            </div>
            <div className="modal__info">
            
            </div>
            <div className="modal__Field">
              <Input
                value={questionsSubject}
                onChange={(e) => setquestionsSubject(e.target.value)}
                type=" text"
                placeholder="Question Subject..."
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
                Add Question Subject
              </button>
            </div>
          </Modal>
    </div>
  );
}

export default QuestionsSubjectContent;
