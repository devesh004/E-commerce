import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import { changeOrderStatus } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
`;
const Wrapper = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #555;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.8px;
`;
const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const OrderTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
`;
const Info = styled.div`
  padding: 5px 0px;
  display: flex;
  height: 50vh;
  width: 80%;
  background-color: #c8e9e6;
  box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -webkit-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  -moz-box-shadow: 0px 6px 22px -6px rgba(77, 73, 73, 0.75);
  padding: 20px;
`;
const InfoLeft = styled.div`
  flex: 1;
`;
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductId = styled.span``;
const InfoRight = styled.div`
  flex: 1;
`;
const Amount = styled.span``;

const Address = styled.div`
  margin: 10px 0px;
`;
const AddressItem = styled.span`
  margin: 0px 5px;
`;
const Title = styled.span``;
const User = styled.span`
  margin-top: 10px;
`;
const Status = styled.div`
  margin: 10px 0px;
`;
const Button = styled.button`
  border: none;
  color: #555;
  font-weight: 600;
  background-color: #c8e9e6;
`;
const ChangeStatus = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Confirm = styled.button`
  flex: 1;
  border: none;
  font-weight: 600;
  font-size: 15px;
  background-color: #81db81;
`;
const Cancel = styled.button`
  flex: 1;
  border: none;
  font-weight: 600;
  font-size: 15px;
  background-color: #e07b7b;
`;

const Order = () => {
  const dispatch = useDispatch();
  const orderId = useLocation().pathname.split("/")[2];
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  const [currStatus, setCurrStatus] = useState(order.status);

  const setStatus = (status) => {
    changeOrderStatus(dispatch, orderId, status);
    setCurrStatus(status);
  };
  console.log("out  ", currStatus);
  return (
    <Container>
      <OrderDetails>
        <OrderTitle>Order details for order number {orderId}</OrderTitle>
      </OrderDetails>
      <Wrapper>
        <Info>
          <InfoLeft>
            <ProductDetails>
              Product Ids-
              {order.products.map((productId) => {
                return <ProductId key={productId}>{productId}</ProductId>;
              })}
            </ProductDetails>
            <Address>
              <Title>Shipping Address-</Title>
              <AddressItem>{order.address.country},</AddressItem>
              <AddressItem>{order.address.city},</AddressItem>
              <AddressItem>{order.address.line1},</AddressItem>
              <AddressItem>{order.address.postal_code}</AddressItem>
            </Address>
            <User>From User-{order.userId}</User>
          </InfoLeft>
          <InfoRight>
            <Amount>Paid amount-{order.amount}</Amount>
            <Status>
              Status- <Button>{currStatus}</Button>
            </Status>
          </InfoRight>
        </Info>
        <ChangeStatus>
          {currStatus === "pending" && (
            <Confirm onClick={() => setStatus("confirm")}>Confirm</Confirm>
          )}
          <Cancel onClick={() => setStatus("cancel")}>Cancel</Cancel>
        </ChangeStatus>
      </Wrapper>
    </Container>
  );
};

export default Order;
