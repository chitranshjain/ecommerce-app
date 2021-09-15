import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import authh from "../../Assets/auth.svg";
import auth2 from "../../Assets/auth2.svg";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "@firebase/auth";

import "./AuthModal.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router";
import { reactLocalStorage } from "reactjs-localstorage";

function AuthModal(props) {
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const auth = getAuth();
  const history = useHistory();

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user.emailVerified) {
          const firebaseId = user.uid;
          console.log(firebaseId);
          axios({
            method: "get",
            url: `https://ecommerceappcj.herokuapp.com/api/users/firebase/${firebaseId}`,
          })
            .then((response) => {
              const loggedInUser = {
                firebaseId: firebaseId,
                user: response.data.user,
              };

              reactLocalStorage.setObject("loggedInUser", loggedInUser);

              history.push("/");
              props.onHide();
            })
            .catch(() => {
              history.push(`/user/${firebaseId}`);
              props.onHide();
            });
        } else {
          toast.error("Please verify your email first.");
          signOut(auth);
        }
      })
      .catch((err) => {
        console.log(err.code + " " + err.message);
      });
  };

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          toast.success("Successfully signed up, verification email sent!");
          signOut(auth);
          setLoginMode(true);
        });
      })
      .catch((err) => {
        console.log(err.code + " " + err.message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="auth-modal-body">
        <VscChromeClose
          onClick={() => {
            props.onHide();
          }}
          className="auth-modal-close-button"
        />
        <ToastContainer position="bottom-center" />
        {loginMode ? (
          <Row className="auth-modal-row">
            <Col className="auth-modal-info-col" lg={5}>
              <div className="auth-info-div">
                <h5>Login</h5>
                <p>Get access to your Orders and Wishlist.</p>
                <img src={authh} alt="Authentication" />
              </div>
            </Col>
            <Col className="auth-modal-form-col" lg={7}>
              <div className="auth-form-div">
                <div className="auth-form-input-div">
                  <input
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="auth-form-input-div">
                  <input
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type={passwordShow ? "text" : "password"}
                    placeholder="Password"
                  />
                </div>
                <Row className="auth-form-row">
                  <Col>
                    <p>Forgot Password?</p>
                  </Col>
                  <Col>
                    {passwordShow ? (
                      <p
                        onClick={(e) => {
                          setPasswordShow((prev) => !prev);
                        }}
                      >
                        <RiEyeOffLine className="password-icon" /> Hide Password
                      </p>
                    ) : (
                      <p
                        onClick={(e) => {
                          setPasswordShow((prev) => !prev);
                        }}
                      >
                        {" "}
                        <RiEyeLine className="password-icon" />
                        Show Password
                      </p>
                    )}
                  </Col>
                </Row>
                <button onClick={signIn}>Login</button>
                <p
                  onClick={() => {
                    setLoginMode((prev) => !prev);
                  }}
                  className="change-mode"
                >
                  New Here? Create an account instead.
                </p>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="auth-modal-row">
            <Col className="auth-modal-info-col" lg={5}>
              <div className="auth-info-div">
                <h5>Looks like you're new here!</h5>
                <p>Sign up with your email to get started.</p>
                <img src={auth2} alt="Authentication" />
              </div>
            </Col>
            <Col className="auth-modal-form-col" lg={7}>
              <div className="auth-form-div">
                <div className="auth-form-input-div">
                  <input
                    name="email"
                    type="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div className="auth-form-input-div">
                  <input
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type={passwordShow ? "text" : "password"}
                    placeholder="Password"
                  />
                </div>
                <Row className="auth-form-row">
                  <Col>
                    <p>Forgot Password?</p>
                  </Col>
                  <Col>
                    {passwordShow ? (
                      <p
                        onClick={(e) => {
                          setPasswordShow((prev) => !prev);
                        }}
                      >
                        <RiEyeOffLine className="password-icon" /> Hide Password
                      </p>
                    ) : (
                      <p
                        onClick={(e) => {
                          setPasswordShow((prev) => !prev);
                        }}
                      >
                        {" "}
                        <RiEyeLine className="password-icon" />
                        Show Password
                      </p>
                    )}
                  </Col>
                </Row>
                <button onClick={signUp}>Sign Up</button>
                <p
                  onClick={() => {
                    setLoginMode((prev) => !prev);
                  }}
                  className="change-mode"
                >
                  Existing User? Log in.
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
