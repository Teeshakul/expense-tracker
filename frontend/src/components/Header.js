// NavbarComponent.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleShowLogin = () => navigate("/login");

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar-wrapper">
      <Navbar
        className="navbarCSS"
        collapseOnSelect
        expand="lg"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Navbar.Brand href="/" className="text-white navTitle">
          Expense Management System
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
            }}
          ></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {user ? (
              <Button onClick={handleShowLogout} className="ml-2 logout-btn">
                Logout
              </Button>
            ) : (
              <Button onClick={handleShowLogin} className="ml-2 login-btn">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
