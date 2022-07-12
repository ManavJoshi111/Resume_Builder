import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();
  //promises
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          props.setToggle(false);
          navigate("../", {
            replace: true,
          });
        }
        console.log(res);
        if (res.status !== 200) throw new Error();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <div>Logout</div>;
};

export default Logout;
