import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import { getUsers } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
`;
const UserListUser = styled.div`
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

const UserList = () => {
  // const [data, setData] = useState(userRows);
  const users = useSelector((state) => state.user.users);
  // console.log(users);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   getUsers(dispatch);
  // }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <Image
              src={
                params.row.img ||
                "https://image.pngaaa.com/569/2189569-middle.png"
              }
            />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <UpdateHan>
            <Link to={"/adminUser/" + params.row._id}>
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
      <DataGrid
        rows={users}
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

export default UserList;
