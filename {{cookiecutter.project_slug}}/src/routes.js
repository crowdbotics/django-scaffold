import React from "react";

const Home = React.lazy(() => import("./features/Home"));
const Login = React.lazy(() => import("./features/EmailAuth/Login"));
const Register = React.lazy(() => import("./features/EmailAuth/Register"));

const routes = [
  { path: "/", name: "Home", exact: true },
  { path: "/welcome", name: "Hello World", exact: true, component: Home },
  { path: "/login", name: "Login", exact: true, component: Login },
  { path: "/register", name: "Register", exact: true, component: Register },
];

export default routes;
