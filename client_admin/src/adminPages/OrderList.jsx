import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getOrders } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../redux/apiCalls";
import { format } from "timeago.js";

const Container = styled.div`
  flex: 4;
`;
const UserListUser = styled.div`
  display: flex;
  align-items: center;
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

const OrderList = () => {
  // const [data, setData] = useState(userRows);
  const orders = useSelector((state) => state.order.orders);
  // console.log(users);

  const dispatch = useDispatch();
  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(dispatch, id);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "order",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return <UserListUser>{params.row.userId}</UserListUser>;
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return format(params.row.createdAt);
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      width: 140,
      renderCell: (params) => {
        return params.row.address.city;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <UpdateHan>
            <Link to={"/adminOrder/" + params.row._id}>
              <Button>More</Button>
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
      <DataGrid
        rows={orders}
        columns={columns}
        id="_id"
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </Container>
  );
};

export default OrderList;
