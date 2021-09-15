import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

import { FaCamera } from "react-icons/fa";

import "./Registration.css";
import "../../Components/Shared/AuthModal.css";
import { getAuth } from "@firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router";

function Registration(props) {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    state: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const history = useHistory();

  function handleImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImage(null);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const auth = getAuth();

  useEffect(() => {
    getUserEmail();
  }, []);

  const getUserEmail = () => {
    auth.onAuthStateChanged((user) => {
      const email = user.email;
      const values = { ...user };
      values.email = email;
      setUser(values);
    });
  };

  const registerUser = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", user.fname + " " + user.lname);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("city", user.city);
    formData.append("pin", parseInt(user.pin));
    formData.append("state", user.state);
    formData.append("firebaseId", props.match.params.firebaseId);
    formData.append("image", image);
    axios({
      method: "post",
      url: `https://ecommerceappcj.herokuapp.com/api/users`,
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registered Successfully!");
          const loggedInUser = {
            firebaseId: props.match.params.firebaseId,
            user: response.data.createdUser,
          };

          reactLocalStorage.setObject("loggedInUser", loggedInUser);

          history.push("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="registration-parent-div">
      <Card className="user-registration-card">
        <div className="image-picker-div">
          <div
            onClick={() => {
              imageButtonRef.current.click();
            }}
            className="image-div"
          >
            <Form.Control
              ref={imageButtonRef}
              style={{ display: "none" }}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <img src={imagePreview} alt={user.fname + " " + user.lname} />
            ) : (
              <FaCamera className="image-pick-btn" />
            )}
          </div>
        </div>
        <div className="registration-form-div">
          <Row className="registration-form-row">
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="fname"
                  value={user.fname}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
            </Col>
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="lname"
                  value={user.lname}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
            </Col>
          </Row>
          <Row className="registration-form-row">
            <Col>
              <div className="registration-input-div">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly={true}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </div>
            </Col>
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </Col>
          </Row>
          <Row className="registration-form-row">
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
              </div>
            </Col>
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
            </Col>
          </Row>
          <Row className="registration-form-row">
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="pin"
                  value={user.pin}
                  onChange={handleChange}
                  placeholder="PIN Code"
                />
              </div>
            </Col>
            <Col>
              <div className="registration-input-div">
                <input
                  type="text"
                  name="state"
                  value={user.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
            </Col>
          </Row>
          <button onClick={registerUser} className="register-button">
            SAVE
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Registration;
