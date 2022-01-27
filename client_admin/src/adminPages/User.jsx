import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  ToggleOff,
  ToggleOn,
  Wc,
} from "@mui/icons-material";

const Container = styled.div`
  flex: 4;
  flex-wrap: wrap;
  padding: 20px 30px;
`;
const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserTitle = styled.h1``;
const CreateUser = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;
const UserContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;
const UserShow = styled.div`
  flex: 1;
  padding: 20px;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
`;
const UserUpdate = styled.div`
  flex: 2;
  padding: 20px;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  margin-left: 20px;
`;
const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserShowTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const Username = styled.span`
  font-weight: 600;
`;
// const UserShowUserTitle = styled.span`
//   font-weight: 300;
// `;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: gray;
`;

const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;
  color: #444;
  .userShowIcon {
    font-size: 16px;
  }
`;
const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;
const UserUpdateTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const UpdateForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const UserUpdateLeft = styled.div``;
const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: gray;
`;
const Input = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;
const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;
const UploadImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;
const UploadInput = styled.input`
  display: none;
`;
const UploadLabel = styled.label`
  .userUpdateIcon {
    cursor: pointer;
  }
`;

const ActiveSelect = styled.select`
  height: 30px;
  border-radius: 5px;
  font-weight: 600;
  color: #868282;
`;

const Option = styled.option`
  font-weight: 600;
  color: #868282;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  padding: 5px;
  background-color: #23a5d8;
  font-weight: 600;
`;
const User = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  let userId = location.pathname.split("/")[2];
  let user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );
  const { currentUser } = useSelector((state) => state.user);
  // console.log(path);
  if (path === "user") {
    user = currentUser;
    userId = currentUser._id;
  }

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const inputChange = (e) => {
    setInputs((prevInp) => {
      return { ...prevInp, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    setInputs({ ...user });
  }, []);

  // console.log(inputs);
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("GOT ERROR   ", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, img: downloadURL };
          const id = userId;
          updateUser(user, id, dispatch);
          navigate(`/user/${id}`);
        });
      }
    );
  };
  return (
    <Container>
      <UserTitleContainer>
        <UserTitle>Edit User</UserTitle>
        <Link to="/newUser">
          <CreateUser>Create</CreateUser>
        </Link>
      </UserTitleContainer>
      <UserContainer>
        <UserShow>
          <UserShowTop>
            <Image
              src={
                user.img || "https://image.pngaaa.com/569/2189569-middle.png"
              }
            />
            <UserShowTopTitle>
              <Username>{user.name || user.username}</Username>
            </UserShowTopTitle>
          </UserShowTop>
          <UserShowBottom>
            <UserShowTitle>Account Details</UserShowTitle>
            <UserShowInfo>
              <PermIdentity className="userShowIcon" />
              <UserShowInfoTitle>{user.username}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              {/* <CalendarToday className="userShowIcon" />
              <UserShowInfoTitle>{user.dob || "Not there"}</UserShowInfoTitle> */}
              {user.active ? (
                <>
                  {" "}
                  <ToggleOn className="userShowIcon" />{" "}
                  <UserShowInfoTitle>Active</UserShowInfoTitle>
                </>
              ) : (
                <>
                  <ToggleOff className="userShowIcon" />{" "}
                  <UserShowInfoTitle>Not Active</UserShowInfoTitle>
                </>
              )}
            </UserShowInfo>
            <UserShowInfo>
              <Wc className="userShowIcon" />
              <UserShowInfoTitle>
                {user.gender || "not provided"}
              </UserShowInfoTitle>
            </UserShowInfo>
            <UserShowTitle>Contact Details</UserShowTitle>
            <UserShowInfo>
              <PhoneAndroid className="userShowIcon" />
              <UserShowInfoTitle>
                {user.phoneNo || "Add a phone number"}
              </UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <MailOutline className="userShowIcon" />
              <UserShowInfoTitle>{user.email}</UserShowInfoTitle>
            </UserShowInfo>
            <UserShowInfo>
              <LocationSearching className="userShowIcon" />
              <UserShowInfoTitle>
                {user.address || "Add your address now"}
              </UserShowInfoTitle>
            </UserShowInfo>
          </UserShowBottom>
        </UserShow>
        <UserUpdate>
          <UserUpdateTitle>Edit</UserUpdateTitle>
          <UpdateForm>
            <UserUpdateLeft>
              <UserUpdateItem>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  value={inputs.username}
                  onChange={inputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder={user.name}
                  value={inputs.name}
                  onChange={inputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  value={inputs.email}
                  onChange={inputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Phone</Label>
                <Input
                  type="text"
                  name="phoneNo"
                  placeholder={user.phoneNo}
                  value={inputs.phoneNo}
                  onChange={inputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder={user.address}
                  value={inputs.address}
                  onChange={inputChange}
                />
              </UserUpdateItem>
              <UserUpdateItem>
                <Label>Active</Label>
                <ActiveSelect name="active" id="active" onChange={inputChange}>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </ActiveSelect>
              </UserUpdateItem>
            </UserUpdateLeft>
            <UserUpdateRight>
              <UserUpdateUpload>
                <UploadImage
                  src={
                    user.img ||
                    "https://image.pngaaa.com/569/2189569-middle.png"
                  }
                />
                <UploadLabel htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </UploadLabel>
                <UploadInput
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </UserUpdateUpload>
              <Button onClick={handleClick}>Update</Button>
            </UserUpdateRight>
          </UpdateForm>
        </UserUpdate>
      </UserContainer>
    </Container>
  );
};

export default User;
