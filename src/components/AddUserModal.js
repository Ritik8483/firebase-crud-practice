import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UsersFireStoreService from "../firestore/userFireStore.js";
import Alert from "react-bootstrap/Alert";

const AddUserModal = (props) => {
  const {
    userModal,
    onHide,
    updateId,
    setName,
    setEmail,
    getAllUsersList,
    setPhone,
    name,
    email,
    phone,
  } = props;

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
    };
    try {
      if (updateId) {
        await UsersFireStoreService.updateUser(updateId,formData);
        getAllUsersList();
        onHide();
      } else {
        await UsersFireStoreService.addUsers(formData);
        getAllUsersList();
        onHide();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Modal show={userModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{updateId ? "Edit" : "Add"} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitDetails}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
            <Form.Label className="mt-2">Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Label className="mt-2">Phone Number</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Enter phone number"
            />
            <div className="d-flex justify-content-end m-2">
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {updateId ? "Update user" : "Save user"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserModal;
