import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import "./App.css";
import { useMoralis } from "react-moralis";
import { ConnectButton, Icon } from "web3uikit";
import socialradio from "./socialradiologo.png";

const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();

  return (
    <>
    {isAuthenticated ? (
      <div className="page">
        <div className="sideBar">
          <Sidebar />
          <div
              className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              Logout
            </div>
        </div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
      ) : (
        <div className="loginPage">
          <img src={socialradio} width="200px"/>
          <ConnectButton />
        </div>

      )}
    </>
  );
};

export default App;
