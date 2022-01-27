import React from "react";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  .link {
    text-decoration: none;
  }
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1px;
  margin-left: 25px;
  font-weight: 600;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  position: relative;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandle = () => {
    logoutUser(dispatch);
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Mannar.</Logo>
        </Center>
        <Right>
          {currentUser && (
            <MenuItem>
              <Link to={`/user/${currentUser._id}`}>
                <Image src={currentUser.img} />
              </Link>
            </MenuItem>
          )}
          {currentUser && currentUser.isAdmin && (
            <MenuItem>
              <Link className="link" to="/admin">
                Admin
              </Link>
            </MenuItem>
          )}
          {currentUser && <MenuItem onClick={logoutHandle}>Logout</MenuItem>}
          {!currentUser && (
            <>
              <MenuItem>
                <Link className="link" to="/register">
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="link" to="/login">
                  Login
                </Link>
              </MenuItem>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
