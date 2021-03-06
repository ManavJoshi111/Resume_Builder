import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import signin from "../Images/sign_in.png";

const Signup = (props) => {
  const Authenticate = async () => {
    try {
      const res = await fetch("/makecv", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log("Response in Mainpage ", res);
      const resJson = await res.json();
      console.log(resJson);
      if (resJson.message === "Authenticated") props.setToggle(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Authenticate();
  }, []);
  let navigate = useNavigate();
  const initialvalue = {
    name: "",
    username: "",
    email: "",
    number: "",
    password: "",
    image: null,
  };
  const [Data, setData] = useState(initialvalue);
  const handleonchange = (e) => {
    console.log("In handleonchange", e.target.name);
    if (e.target.name !== "image") {
      setData({
        ...Data,
        [e.target.name]: e.target.value,
      });
    }
    else {
      setData({
        ...Data,
        [e.target.name]: e.target.files[0],
      });
    }
    console.log("Data in handleonchange : ", Data);
  };

  const sendData = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (let key in Data) {
      formdata.append(key, Data[key]);
    }
    // formdata.append(id, props.)
    console.log("Formdata is : ", ...formdata);
    const res = await fetch("/signup", {
      method: "POST",
      body: formdata,
    });
    const resJson = await res.json();
    console.log(resJson);
    if (resJson.message) {
      toast.success(resJson.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      props.setToggle(true);
      navigate("../makecv", { replace: true });
    }
    if (resJson.error) {
      toast.error(resJson.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="content ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <center>
                <img
                  src={signin}
                  alt="Image"
                  className="img-fluid cvimage mt-5 pt-5"
                />
              </center>
            </div>
            <div className="col-md-6 contents mt-3">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3 id="color" className="fw-bold h1">
                      Sign Up
                    </h3>
                  </div>
                  <form action="#" method="post">
                    <div className="form-group first">
                      <label for="image" className="form-label">Upload Your Photo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="firstinput"
                        placeholder="Image"
                        required={true}
                        name="image"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-4"
                        placeholder="Name"
                        id="name"
                        name="name"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-4"
                        placeholder="Usename"
                        id="uname"
                        name="username"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Email"
                        id="email"
                        name="email"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Contact No"
                        id="contact"
                        name="number"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="form-group first">
                      <input
                        type="text"
                        className="form-control mt-3"
                        placeholder="Password"
                        id="pswd"
                        name="password"
                        onChange={handleonchange}
                      />
                    </div>
                    <div className="d-flex mb-3 mt-1 align-items-center">
                      <span className="ml-auto">
                        <NavLink
                          to="/login"
                          className="loginredirect text-decoration-none"
                        >
                          Already Have Account ?
                        </NavLink>
                      </span>
                    </div>
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn btn-primary mb-3"
                      id="lbtn"
                      onClick={sendData}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
