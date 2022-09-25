import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isEmpty } from 'lodash';
import { getSelfProfile, logoutUser } from './redux/actions';
import { AUTH_SUCCESS } from './redux/types';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import store from "./redux/";
import { Token } from "./redux/types/types";

const HomePage = lazy(() => import("./pages/Homepage"));
const Header =lazy(()=>import('./components/Header'));
const Login = lazy(()=>import("./pages/Login"));
const Signup = lazy(()=>import("./pages/Signup"));
const Profile = lazy(()=>import("./pages/Profile"));
const Footer = lazy(()=>import("./components/Footer"));
const VerifyEmail = lazy(()=>import("./pages/VerifyEmail"));
const Forget = lazy(()=>import("./pages/Forgot"));
const Reset = lazy(()=>import("./pages/Reset"));

const token = localStorage.IdToken;

(async () => {
  try {
    if (isEmpty(token)) {
      store.dispatch(logoutUser());
      return;
    }

    const decodedToken = jwtDecode<Token>(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
      window.location.reload();
    } else {
      store.dispatch({
        type: AUTH_SUCCESS,
        payload: { message: '' },
      });
      axios.defaults.headers.common['token'] = token;
      store.dispatch(getSelfProfile());
    }
  } catch (err) {
    store.dispatch(logoutUser());
    window.location.reload();
    return;
  }
})();


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/verify" element={<VerifyEmail/>}/>
          <Route path="/forget" element={<Forget/>}/>
          <Route path="/reset" element={<Reset/>}/>
        </Routes>
        <Footer/>
      </Suspense>
    </Router>
  );
}

export default App;
