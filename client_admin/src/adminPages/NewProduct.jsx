import React, { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;

  padding: 0px 20px;
`;
const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProductTitle = styled.h1``;

const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
`;

const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Select = styled.select``;
const Option = styled.option``;
const Label = styled.label`
  margin-bottom: 10px;
  color: gray;
`;
const Input = styled.input`
  margin-bottom: 10px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
`;
const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`;
const UploadImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;
const UploadLabel = styled.label``;
const UploadInput = styled.input``;
const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #23a5d8;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const UploadTitle = styled.span`
  margin-bottom: -20px;
  color: gray;
`;

const Product = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [col, setCol] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleCol = (e) => {
    setCol(e.target.value.split(","));
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
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
            color: col,
          };
          addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <Container>
      <ProductTitleContainer>
        <ProductTitle>New Product</ProductTitle>
      </ProductTitleContainer>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              placeholder="Pepe Jeans"
              onChange={handleChange}
            />
            <Label>Description</Label>
            <Input
              name="desc"
              type="text"
              placeholder="description.."
              onChange={handleChange}
            />
            <Label>Categories</Label>
            <Input
              type="text"
              placeholder="jeans,coat.."
              onChange={handleCat}
            />
            <Label>Colors</Label>
            <Input
              type="text"
              placeholder="black,pink.."
              onChange={handleCol}
            />
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              placeholder="100"
              onChange={handleChange}
            />

            <Label>Stock</Label>
            <Select name="inStock" onChange={handleChange}>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </ProductFormLeft>
          <ProductFormRight>
            <UploadTitle>Upload Image</UploadTitle>
            <ProductUpload>
              <UploadImage src="https://thumbs.dreamstime.com/b/camera-icon-isolated-white-background-symbol-vector-185770595.jpg" />
              <UploadLabel htmlfor="file"></UploadLabel>
              <UploadInput
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </ProductUpload>
            <ProductButton onClick={submitHandler}>Add Product</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </Container>
  );
};

export default Product;
