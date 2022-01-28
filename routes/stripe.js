const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);
// console.log(KEY);

router.post("/payment", async (req, res) => {
  try {
    const { id } = req.body.token;

    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: id,
      description: "5% off on each product",
    });
    // console.log("CHARGE IS ", charge);
    res.status(200).json(charge);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
