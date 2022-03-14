import React, { useState, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
  AssignmentTurnedInOutlined,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
} from "@material-ui/icons";
import { Avatar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Select from 'react-select'
import axios from "axios";
import { Modal } from "react-responsive-modal";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from 'react-hook-form';
import "react-responsive-modal/styles.css";
import "./css/BoosterHeader.css";
import './css/custom_animation.css'
import { async } from "@firebase/util";


function BoosterHeader() {
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [project, setProject] = useState([]);
  const [questionsSubject, setquestionsSubject] = useState([]);
  const Close = <CloseIcon />;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const { register, handleSubmit, errors, control } = useForm({
    mode: "onBlur"
  });

  const handleRegistration = (data) => {
    console.log(data);
    // await axios
    //     .post("/api/questions", data)
    //     .then((res) => {
    //       window.location.href = "/";
    //     })
    //     .catch((e) => {
    //       alert("Error in adding question");
    //     });
  }
  
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    question: { required: true },
    questionSubject: { required: true },
    projectName: {required: true},
    role: { required: "Role is required" },
  };

  const projectNames = project.map(projectData => {
    return {
      value: projectData.projectName,
      label: projectData.projectName,
    }
  })

  const questionSubjectNames = questionsSubject.map(questionData => {
    return {
      value: questionData.questionsSubject,
      label: questionData.questionsSubject,
    }
  })


  // const handleSubmit = async () => {
  //   if (question !== "") {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const body = {
  //       questionName: question,
  //       questionProject: document.getElementById("dropProject").selectedIndex.value,
  //       questionsSubject: Question,
  //       questionUrl: inputUrl,
  //       user: user,
  //     };
 
  //     await axios
  //       .post("/api/questions", body, config)
  //       .then((res) => {
  //         console.log(res.data);
  //         alert(res.data.message);
  //         window.location.href = "/";
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         alert("Error in adding question");
  //       });
  //   }
  // };

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((res) => {
        setProject(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/questionsSubject")
      .then((res) => {
        setquestionsSubject(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure to logout ?")) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
          console.log("Logged out");
        })
        .catch(() => {
          console.log("error in logout");
        });
    }
  };

  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://media.giphy.com/media/uHEqSttWHv476/giphy.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlined />
          </div>
          <div className="qHeader__icon">
            <NotificationsOutlined />
          </div>
        </div>
        <div className="qHeader__input">
          <Search />
          <input type="text" placeholder="Search questions" />
        </div>
        <div className="qHeader__Rem">
          <span>
            <Avatar src={user?.photo} />
          </span>

          <button onClick={() => setOpen(true)}>Add Question</button>
          <button onClick={handleLogout}>Log out</button>
          
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
           <form onSubmit={handleSubmit(handleRegistration, handleError)}>
              <div className="modal__title">
                <h5>Add Question</h5>
                <h5>Share Link</h5>
              </div>
              <div className="modal__info">
                <Avatar src={user?.photo} className="avatar" />
              
                <Controller
                  name="ReactSelect"
                  control={control}
                  render={() => (
                    <Select
                      placeholder={<PeopleAltOutlined />}
                    />
                  )}
                />

                <Controller
                  name="ReactSelect"
                  control={control}
                  render={() => (
                    <Select {...register("projectName", registerOptions.projectName)}
                      placeholder="Select project name *"
                      options={projectNames}
                    />
                  )}
                />
                
                <Controller
                  name="ReactSelect"
                  control={control}
                  render={() => (
                    <Select {...register("questionSubject", registerOptions.questionSubject)}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Select question subject *"
                      options={questionSubjectNames}
                    />
                  )}
                />
                
              </div>
            <div className="modal__Field">
              <textarea name="question" type="text" {...register('question', registerOptions.question) }
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "100px",
                    outline: "2px solid #000",
                  }}
                placeholder="Start your question here..."
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <textarea
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: inclue a link that gives context"
                />
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Question
              </button>
            </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default BoosterHeader
