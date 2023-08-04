const { error, success } = require("./response");

const stripe = require("stripe")(
  "sk_test_51NbHnuSG9WVEqhGVYG0dgDb45pjjeb3V818JYvVfTm1Dsg95fm8EzApsT17EOOL56g7ZifI8QMgDldMFOZ4SY3UV00tRcPT4WY"
);

exports.createPayment = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json(
      success(res.statusCode, "Success", {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey:
          "pk_test_51NbHnuSG9WVEqhGVzuMIANpKAShBwpIeOVUiMB5Ks0MorO5PyHKkutYA9rrOphTjOFCCXVw4d4pRntoyukDb9coV00JcgBrVwz",
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
