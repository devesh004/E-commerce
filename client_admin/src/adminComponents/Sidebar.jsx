import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import {
  Assessment,
  AttachMoney,
  Feedback,
  LineStyle,
  Mail,
  Message,
  Person,
  ReportProblem,
  ShoppingBag,
  Timeline,
  TrendingUp,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: #efeff3;
  position: sticky;
  top: 50px;
  margin-left: -7.7px;
`;
const Wrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const SidebarMenu = styled.div`
  margin-top: -17px;
  margin-bottom: 5px;
`;
const Title = styled.h3`
  margin: 15px 5px;
  font-size: 14px;
`;
const SidebarList = styled.ul`
  margin-top: -15px;
  margin-left: -20px;
  .link {
    text-decoration: none;
    color: inherit;
  }
`;
const SidebarItem = styled.li`
  padding: 6px;
  margin-bottom: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #cccfd1;
  }
  /* background-color: ${({ isColor }) => (isColor ? "#cccfd1" : "")}; */
`;

// {"#cccfd1"}
const Sidebar = () => {
  // const [isColor, setIsColor] = useState(1);
  const location = useLocation();
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
  // console.log(ind);
  if (ind) {
    return null;
  } else {
    return (
      <Container>
        <Wrapper>
          <SidebarMenu>
            <Title>Dashboard</Title>
            <SidebarList>
              <Link to="/admin" className="link">
                <SidebarItem>
                  <LineStyle />
                  Home
                </SidebarItem>
              </Link>
              <SidebarItem>
                <Timeline />
                Analytics
              </SidebarItem>
              <SidebarItem>
                <TrendingUp />
                Sales
              </SidebarItem>
            </SidebarList>
          </SidebarMenu>

          <SidebarMenu>
            <Title>Quick Menu</Title>
            <SidebarList>
              <Link to="/users" className="link">
                <SidebarItem>
                  <Person />
                  Users
                </SidebarItem>
              </Link>
              <Link to="/adminProducts" className="link">
                <SidebarItem>
                  <ShoppingBag />
                  Products
                </SidebarItem>
              </Link>
              <Link to="/orders" className="link">
                <SidebarItem>
                  <Person />
                  Orders
                </SidebarItem>
              </Link>
              <SidebarItem>
                <AttachMoney />
                Transactions
              </SidebarItem>
              <SidebarItem>
                <Assessment />
                Reports
              </SidebarItem>
            </SidebarList>
          </SidebarMenu>
          <SidebarMenu>
            <Title>Notifications</Title>
            <SidebarList>
              <SidebarItem>
                <Mail />
                Mail
              </SidebarItem>
              <SidebarItem>
                <Feedback />
                Feedback
              </SidebarItem>
              <SidebarItem>
                <Message />
                Message
              </SidebarItem>
            </SidebarList>
          </SidebarMenu>
          <SidebarMenu>
            <Title>Staff</Title>
            <SidebarList>
              <SidebarItem>
                <WorkOutlineOutlined />
                Manage
              </SidebarItem>
              <SidebarItem>
                <Timeline />
                Analytics
              </SidebarItem>
              <SidebarItem>
                <ReportProblem />
                Report
              </SidebarItem>
            </SidebarList>
          </SidebarMenu>
        </Wrapper>
      </Container>
    );
  }
};

export default Sidebar;
