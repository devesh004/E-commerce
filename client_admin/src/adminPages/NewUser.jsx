import { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
  padding: 0px 20px;
`;
const NewUserTitle = styled.h1``;
const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const FormItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;
const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #9c9797;
`;
const Input = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  font-weight: 600;
  color: #868282;
  border-radius: 5px;
`;

const UserGender = styled.div``;
const GenInput = styled.input`
  margin-top: 15px;
`;
const GenLabel = styled.label`
  margin: 10px;
  font-size: 18px;
  color: #555;
  font-weight: 600;
`;
const NewUserSelect = styled.select`
  height: 40px;
  border-radius: 5px;
  font-weight: 600;
  color: #868282;
`;
const Option = styled.option`
  font-weight: 600;
  color: #868282;
`;
const Button = styled.button`
  width: 200px;
  border: none;
  background-color: #23a5d8;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;
const ProfileUpload = styled.div`
  display: flex;
`;
const UploadInput = styled.input`
  margin-left: 5px;
`;
const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChanges = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
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
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = { ...inputs, img: downloadURL };
          addUser(user, dispatch);
        });
      }
    );
  };
  // console.log(inputs);

  return (
    <Container>
      <NewUserTitle>New User</NewUserTitle>
      <NewUserForm>
        <FormItem>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="mota"
            name="username"
            onChange={handleChanges}
          />
        </FormItem>
        <FormItem>
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Mota Singh"
            name="name"
            onChange={handleChanges}
          />
        </FormItem>
        <FormItem>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="mota@gmail.com"
            name="email"
            onChange={handleChanges}
          />
        </FormItem>
        <FormItem>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChanges}
          />
        </FormItem>
        <FormItem>
          <Label>Phone Number</Label>
          <Input
            type="text"
            placeholder="+91 9411013214"
            name="phoneNo"
            onChange={handleChanges}
          />
        </FormItem>
        <FormItem>
          <Label>Address</Label>
          <Input
            type="text"
            placeholder="Kanpur | India"
            name="address"
            onChange={handleChanges}
          />
        </FormItem>
        <FormItem>
          <Label>Gender</Label>
          <UserGender>
            <GenInput
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChanges}
            />
            <GenLabel htmlFor="male">Male</GenLabel>
            <GenInput
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChanges}
            />
            <GenLabel htmlFor="female">Female</GenLabel>
            <GenInput
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChanges}
            />
            <GenLabel htmlFor="other">Other</GenLabel>
          </UserGender>
        </FormItem>
        <FormItem>
          <Label>Active</Label>
          <NewUserSelect name="active" id="active" onChange={handleChanges}>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </NewUserSelect>
        </FormItem>
        <FormItem>
          <ProfileUpload>
            <Label htmlfor="file">Upload Profile Photo</Label>
            <UploadInput
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </ProfileUpload>
        </FormItem>
        <Button onClick={submitHandler}>Create</Button>
      </NewUserForm>
    </Container>
  );
};

export default NewUser;
