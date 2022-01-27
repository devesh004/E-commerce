import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { emptyCard } from "../redux/cartRedux";
import { newNotification } from "../redux/orderRedux";

const Success = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  // console.log(cart.products);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products,
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(emptyCard());
        dispatch(newNotification());
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser, dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b1ede8",
        fontSize: "20px",
        fontWeight: "600",
        letterSpacing: "1px",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId} ..Happy Shopping`
        : `Successfull. Your order is being prepared...`}
      <Link style={{ marginTop: "40px" }} to="/">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Success;
