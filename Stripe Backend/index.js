const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51QDHBvDAfQwQ4eQ5yMoiMPoLxSeDrr9qOINbZIuVxohTYjPuFfLsp2rWIHtpLWAIRj1BSG7Y0dt9qaQyoGhSKFhi00r5HRN69F");
const { v4: uuid } = require("uuid");


const app = express();

app.use(express.json());
app.use(cors());

app.post('/Payment', (req, res)=>{
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then(customer=> {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            receipt_email: token.email,
            descreption: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country,

                }
            }
        }, {idempotencyKey});
    })
    .then(result=> res.status(200).json(result))
    .catch(err=> console.log(err));
 
})


app.listen(8282, ()=> {console.log("Server is running on port 8282")});