import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import AddUserModal from "./AddUserModal";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import UsersFireStoreService from "../firestore/userFireStore";

const Dashboard = () => {
  const [userModal, setUserModal] = useState(false);
  const [userList, setUserList] = useState();
  const [updateId, seUpdateId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const getAllUsersList = async () => {
    try {
      const userData = await UsersFireStoreService.getUsers();
      setUserList(userData?.docs?.map((i) => ({ ...i.data(), id: i.id })));
      console.log("da", userData?.docs);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("userList", userList);

  useEffect(() => {
    getAllUsersList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await UsersFireStoreService.deleteUsers(id);
      getAllUsersList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    seUpdateId(id);
    try {
      const handlUpdateDetail = await UsersFireStoreService.getSingleUser(id);
      console.log("handlUpdateDetail", handlUpdateDetail?.data());
      setName(handlUpdateDetail?.data().name);
      setEmail(handlUpdateDetail?.data().email);
      setPhone(handlUpdateDetail?.data().phone);
      setUserModal(true);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleAddUser = () => {
    seUpdateId();
    setUserModal(true);
    setName();
    setEmail();
    setPhone();

  };

  return (
    <div>
      <div className="d-flex gap-3 justify-content-center align-items-center bg-light">
        <Button className="my-4" onClick={() => handleAddUser()}>
          Add user
        </Button>
        <Button
          variant="secondary"
          className="my-4"
          onClick={() => getAllUsersList()}
        >
          Refresh List
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((userItem, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{userItem.name}</td>
              <td>{userItem.email}</td>
              <td>{userItem.phone}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Action
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleUpdate(userItem.id)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(userItem.id)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item>View</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {userModal && (
        <AddUserModal
          name={name}
          setName={setName}
          email={email}
          phone={phone}
          setEmail={setEmail}
          setPhone={setPhone}
          updateId={updateId}
          userModal={userModal}
          onHide={() => setUserModal(false)}
          getAllUsersList={getAllUsersList}
        />
      )}
    </div>
  );
};

export default Dashboard;
