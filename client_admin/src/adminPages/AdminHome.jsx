import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "../adminComponents/Chart";
import FeaturedInfo from "../adminComponents/FeaturedInfo";
import WidgetLg from "../adminComponents/widget/WidgetLg";
import WidgetSm from "../adminComponents/widget/WidgetSm";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;

const AdminHome = () => {
  const [userStats, setUserStats] = useState([]);
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
    const getUserStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        // console.log(res.data);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUserStats();
  }, [MONTHS]);

  // console.log(userStats);
  return (
    <Container className="container">
      <FeaturedInfo />
      <Chart
        graphData={userStats}
        title={"User Analytics"}
        dataKey={"Active User"}
        grid
      />
      <HomeWidgets>
        <WidgetSm />
        <WidgetLg />
      </HomeWidgets>
    </Container>
  );
};

export default AdminHome;
