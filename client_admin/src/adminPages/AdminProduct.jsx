import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Chart from "../adminComponents/Chart";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { updateProduct } from "../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";

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
const AddProduct = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

const ProductTop = styled.div`
  display: flex;
`;
const ProductTopLeft = styled.div`
  flex: 1;
`;
const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
`;
const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const ProductName = styled.span`
  font-weight: 600;
`;
const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;
const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;
const ProductInfoKey = styled.span``;
const ProductInfoValue = styled.span`
  font-weight: 300;
`;
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
  margin-bottom: 5px;
`;
const UploadLabel = styled.label``;
const UploadInput = styled.input`
  display: none;
`;
const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #23a5d8;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getProductStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid=", +productId);
        // console.log(res.data);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getProductStats();
  }, [MONTHS, productId]);

  //EDIT
  const [inputs, setInputs] = useState({
    title: product.title,
    price: product.price,
    desc: product.desc,
    inStock: product.inStock,
  });
  const [file, setFile] = useState(product.img);
  const [cat, setCat] = useState(product.categories);
  const [col, setCol] = useState(product.color);

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
        console.log("GOT ERROR   ", error);
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
          const id = productId;
          updateProduct(product, id, dispatch);
        });
      }
    );
  };

  return (
    <Container>
      <ProductTitleContainer>
        <ProductTitle>Product</ProductTitle>
        <Link to="/newProduct">
          <AddProduct>Create</AddProduct>
        </Link>
      </ProductTitleContainer>
      <ProductTop>
        <ProductTopLeft>
          <Chart
            graphData={productStats}
            dataKey="Sales"
            title="Sales Performance"
          />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoTop>
            <Image src={product.img} />
            <ProductName>{product.title}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <ProductInfoKey>id:</ProductInfoKey>
              <ProductInfoValue>{productId}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>sales</ProductInfoKey>
              <ProductInfoValue>2344</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>in stock:</ProductInfoKey>
              <ProductInfoValue>{product.inStock}</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <Label>Product Name</Label>
            <Input
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleChange}
            />
            <Label>Product Description</Label>
            <Input
              name="desc"
              type="text"
              value={inputs.desc}
              onChange={handleChange}
            />
            <Label>Categories</Label>
            <Input
              type="text"
              value={cat.map((cat) => cat)}
              onChange={handleCat}
            />
            <Label>Colors</Label>
            <Input
              type="text"
              value={col.map((col) => col)}
              onChange={handleCol}
            />
            <Label>Price</Label>
            <Input
              name="price"
              type="text"
              value={inputs.price}
              onChange={handleChange}
            />
            <Label>In Stock</Label>
            <Select
              name="inStock"
              id="idStock"
              onChange={handleChange}
              value={inputs.inStock}
            >
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <UploadImage src={product.img} />
              <UploadLabel htmlFor="file">
                <Publish />
              </UploadLabel>
              <UploadInput
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </ProductUpload>
            <ProductButton onClick={submitHandler}>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </Container>
  );
};

export default Product;
