import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
`;

const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  color: white;
  background-color: #7676ee;
  cursor: pointer;
  margin-right: 20px;
`;
const UpdateHan = styled.div`
  display: flex;
  align-items: center;
  .deleteIcon {
    color: red;
    cursor: pointer;
  }
`;

const AddProduct = styled.button`
  height: 30px;
  border: none;
  padding: 5px;
  background-color: teal;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  // console.log(products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <Image src={params.row.img} />
            {params.row.title}
          </ProductListItem>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <UpdateHan>
            <Link to={"/adminProduct/" + params.row._id}>
              <Button>Edit</Button>
            </Link>
            <DeleteOutline
              className="deleteIcon"
              onClick={() => handleDelete(params.row._id)}
            />
          </UpdateHan>
        );
      },
    },
  ];

  return (
    <Container>
      <Link to="/newProduct">
        <AddProduct>Add Product</AddProduct>
      </Link>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  );
};

export default ProductList;
