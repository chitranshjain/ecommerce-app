import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import CategoriesSubHeader from "../../Components/Shared/CategoriesSubHeader";

import "./Dashboard.css";
import Sidebar from "../../Components/User Dashboard/Sidebar";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { FaCamera } from "react-icons/fa";

function Dashboard(props) {
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

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/users/${props.match.params.userId}`,
    }).then((response) => {
      const responseData = response.data.user;
      const currentUser = {
        fname: responseData.name.substr(0, responseData.name.indexOf(" ")),
        lname: responseData.name.substr(responseData.name.indexOf(" ") + 1),
        phone: responseData.phone,
        address: responseData.address,
        email: responseData.email,
        city: responseData.city,
        pin: responseData.pin,
        state: responseData.state,
      };
      setImagePreview(
        `https://ecommerceappcj.herokuapp.com/${responseData.image}`
      );
      setUser(currentUser);
    });
  };

  const updateUserDetails = (event) => {
    event.preventDefault();
    console.log(user);
    axios({
      method: "patch",
      url: `https://ecommerceappcj.herokuapp.com/api/users/${props.match.params.userId}`,
      data: {
        name: user.fname + " " + user.lname,
        email: "work.chitransh@gmail.com",
        phone: user.phone,
        address: user.address,
        city: user.city,
        pin: user.pin,
        state: user.state,
      },
    }).then((response) => {
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);
        axios({
          method: "patch",
          url: `https://ecommerceappcj.herokuapp.com/api/users/image/${props.match.params.userId}`,
          data: imageFormData,
        }).then(() => {
          toast.success("Personal details updated successfully!");
          getUserInfo();
        });
      } else {
        toast.success("Personal details updated successfully!");
        getUserInfo();
      }
    });
  };

  return (
    <div className="dashboard-parent-div">
      <CategoriesSubHeader />
      <Row className="dashboard-parent-row">
        <Sidebar image={imagePreview} />
        <Col lg={9}>
          <Card className="dashboard-form-card">
            <h6>Personal Information</h6>
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
              <button onClick={updateUserDetails} className="register-button">
                SAVE
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
