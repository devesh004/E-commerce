import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { emptyNotification } from "../redux/orderRedux";
const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: white;
  position: sticky;
  top: 0px;
  margin-left: -7.7px;
  z-index: 3;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  position: relative;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  color: #555;
`;

const Lang = styled.div`
  display: flex;
  position: relative;
  margin-right: 10px;
  top: 5px;
  font-weight: 600;
  color: teal;
  letter-spacing: 1px;
  :hover {
    box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    padding: 2px 2px;
  }
`;
const Setting = styled.div`
  display: flex;
  position: relative;
  margin-right: 10px;
  top: 5px;
`;

const Notification = styled.div`
  display: flex;
  position: relative;
  margin-right: 10px;
  top: 5px;
`;

const Badge = styled.span`
  display: flex;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: -8px;
  right: -3.5px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  position: relative;
  margin-right: 3px;
  top: -4.5px;
  :hover {
    box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  }
`;
const Button = styled.button`
  height: 30px;
  margin-left: 5px;
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  :hover {
    box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
    -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  }
`;
const Topbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let noti = useSelector((state) => state.order.notification);
  const handleClick = () => {
    dispatch(emptyNotification());
  };

  const { currentUser } = useSelector((state) => state.user);
  let admin;
  if (currentUser && currentUser.isAdmin) {
    admin = currentUser;
  }
  const logoutHandle = () => {
    logoutUser(dispatch);
    navigate("/");
  };
  const home = location.pathname;
  const path = home.split("/")[1].toString();
  const prohibtedPaths = [
    "products",
    "product",
    "cart",
    "success",
    "login",
    "user",
  ];
  let ind = prohibtedPaths.find((probh) => probh === path);
  ind = ind || home === "/";
  if (ind) {
    return null;
  } else {
    return (
      <Container>
        <Wrapper>
          <Left>
            <Logo>mannarAdmin</Logo>
          </Left>
          <Right>
            <Link style={{ textDecoration: "none" }} to="/">
              <Lang>Shop</Lang>
            </Link>
            <Link to="/orders">
              <Notification onClick={() => handleClick()}>
                <NotificationsNone />
                <Badge>{noti || 0}</Badge>
              </Notification>
            </Link>
            <Setting>
              <Settings />
            </Setting>
            <Link to={`/adminUser/${admin._id}`}>
              <Image src={admin.img} />
            </Link>
            <Button onClick={logoutHandle}>Logout</Button>
          </Right>
        </Wrapper>
      </Container>
    );
  }
};

export default Topbar;
