let stripeKey = require('./config.js'),
    stripe = require('stripe')(stripeKey.secretKey);
module.exports = {
    processPayment: (req, res) => {
        let chargeAmt = req.body.amount,
            amountArray = chargeAmt.toString().split(''),
            pennies = [];
        for (var i = 0; i < amountArray.length; i++) {
            if (amountArray[i] === ".") {
                if (typeof amountArray[i + 1] === "string") {
                    pennies.push(amountArray[i + 1]);
                } else {
                    pennies.push("0");
                }
                if (typeof amountArray[i + 2] === "string") {
                    pennies.push(amountArray[i + 2]);
                } else {
                    pennies.push("0");
                }
                break;
            } else {
                pennies.push(amountArray[i])
            }
        }
        const convertedAmt = parseInt(pennies.join(''));

        let charge = stripe.charges.create({
            amount: convertedAmt, // amount in cents, again
            currency: 'usd',
            source: req.body.token,
            description: 'Test charge for Go.com'
        }, (err, charge) => {
            res.sendStatus(200);
        });
    }
}

