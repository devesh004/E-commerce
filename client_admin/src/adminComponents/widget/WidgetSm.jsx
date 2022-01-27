import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiCalls";

const Container = styled.div`
  flex: 1;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  padding: 20px;
  margin-right: 20px;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
`;
const MemberList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const MemberItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;
const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Username = styled.span`
  font-weight: 600;
`;
// const UserTitle = styled.span`
//   font-weight: 300;
// `;
const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #efeff3;
  color: #555;
  cursor: pointer;
  .visibility {
    font-size: 16px;
    margin-right: 5px;
  }
`;
const WidgetSm = () => {
  const users = useSelector((state) => state.user.users).slice(0, 5);
  const dispatch = useDispatch();
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  return (
    <Container>
      <Title>New Joined Members</Title>
      <MemberList>
        {users.map((user) => (
          <MemberItem key={user._id}>
            <Image
              src={
                user.img ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
            />
            <UserInfo>
              <Username>{user.username}</Username>
            </UserInfo>
            <Link
              style={{ textDecoration: "none" }}
              to={`/adminUser/${user._id}`}
            >
              <Button>
                <Visibility className="visibility" />
                Display
              </Button>
            </Link>
          </MemberItem>
        ))}
      </MemberList>
    </Container>
  );
};

export default WidgetSm;
