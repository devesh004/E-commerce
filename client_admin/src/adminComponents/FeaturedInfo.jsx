import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FeaturedItem = styled.div`
  flex: 1;
  height: 15vh;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
`;

const Title = styled.span`
  font-size: 20px;
`;

const MoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const MoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  .arrow {
    font-size: 15px;
    color: green;
  }
  .arrow.down {
    color: red;
  }
`;
const FeaturedSubtitle = styled.span`
  font-size: 15px;
  color: gray;
`;
const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const getIncome = async () => {
    try {
      const res = await userRequest.get("/orders/income");
      setIncome(res.data);
      // console.log("DATA", res.data);
      {
        res.data[1] &&
          setPercentage(
            ((res.data[1].total - res.data[0].total) / 100) * res.data[0].total
          );
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIncome();
  }, []);

  // console.log("HELLO", income);
  return (
    <Container>
      <FeaturedItem>
        <Title>Revanue</Title>
        <MoneyContainer>
          <FeaturedMoney>${income[1]?.total}</FeaturedMoney>
          <MoneyRate>
            %{Math.floor(percentage)}
            {percentage < 0 ? (
              <ArrowDownward className="arrow down" />
            ) : (
              <ArrowUpward className="arrow" />
            )}
          </MoneyRate>
        </MoneyContainer>
        <FeaturedSubtitle>Compared to last month</FeaturedSubtitle>
      </FeaturedItem>
      <FeaturedItem>
        <Title>Sales</Title>
        <MoneyContainer>
          <FeaturedMoney>$2,843</FeaturedMoney>
          <MoneyRate>
            -1.5
            <ArrowDownward className="arrow down" />
          </MoneyRate>
        </MoneyContainer>
        <FeaturedSubtitle>Compared to last month</FeaturedSubtitle>
      </FeaturedItem>
      <FeaturedItem>
        <Title>Cost</Title>
        <MoneyContainer>
          <FeaturedMoney>$2,843</FeaturedMoney>
          <MoneyRate>
            +9.5
            <ArrowUpward className="arrow" />
          </MoneyRate>
        </MoneyContainer>
        <FeaturedSubtitle>Compared to last month</FeaturedSubtitle>
      </FeaturedItem>
    </Container>
  );
};

export default FeaturedInfo;
