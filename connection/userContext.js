import React from "react";
const UserContext = React.createContext({
  loggedIn: false,
  setLoggedin: () => {},
  type: "hello",
  settype: () => {},
});
const UserLogContext = React.createContext({});

export default UserContext;
