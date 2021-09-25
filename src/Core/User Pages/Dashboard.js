import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import CategoriesSubHeader from "../../Components/Shared/CategoriesSubHeader";

import "./Dashboard.css";
import Sidebar from "../../Components/User Dashboard/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import $ from "jquery";

function Dashboard(props) {
  const { userDetails, userImagePreview, getUserDetails, setUserDetails } =
    useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(userImagePreview);
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

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
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateUserDetails = (event) => {
    event.preventDefault();
    axios({
      method: "patch",
      url: `https://ecommerceappcj.herokuapp.com/api/users/${props.match.params.userId}`,
      data: {
        name: userDetails.fname + " " + userDetails.lname,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        city: userDetails.city,
        pin: userDetails.pin,
        state: userDetails.state,
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
          getUserDetails();
        });
      } else {
        toast.success("Personal details updated successfully!");
        getUserDetails();
      }
    });
  };

  return (
    <div className="dashboard-parent-div">
      <CategoriesSubHeader />
      <Row className="dashboard-parent-row">
        <Sidebar
          image={imagePreview}
          name={userDetails.fname}
          id={userDetails.id}
        />
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
                  <img
                    src={imagePreview}
                    alt={userDetails.fname + " " + userDetails.lname}
                  />
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
                      value={userDetails.fname}
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
                      value={userDetails.lname}
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
                      value={userDetails.email}
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
                      value={userDetails.phone}
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
                      value={userDetails.address}
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
                      value={userDetails.city}
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
                      value={userDetails.pin}
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
                      value={userDetails.state}
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
