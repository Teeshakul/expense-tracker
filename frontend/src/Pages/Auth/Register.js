// SignupPage.js
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    setLoading(true);

    try {
      const { data } = await axios.post(registerAPI, { name, email, password }, { timeout: 15000 });

      if (data.success === true) {
        delete data.user?.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
      }

    } catch (err) {
      if (err.code === "ECONNABORTED") {
        toast.error("Server is taking too long to respond. Please try again shortly.", toastOptions);
      } else {
        toast.error(err?.response?.data?.message || "Something went wrong", toastOptions);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <Container className="mt-5" style={{ color: "white" }}>
        <Row>
          <h1 className="text-center">
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          </h1>
          <h1 className="text-center text-white">Welcome to Expense Tracker</h1>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-white text-center mt-5">Registration</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Full name" value={values.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
              </Form.Group>
              <div className="mt-4 text-center d-flex flex-column align-items-center">
                <Link to="/forgotPassword" className="text-white lnk">Forgot Password?</Link>
                <Button
                  type="submit"
                  className="mt-3 btnStyle"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>
                <p className="mt-3" style={{ color: "#9d9494" }}>
                  Already have an account? <Link to="/login" className="text-white lnk">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Register;
