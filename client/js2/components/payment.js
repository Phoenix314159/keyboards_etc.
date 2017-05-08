angular.module('ecom').component('payment', {

    templateUrl: './views/payment.html',

    controller: function () {
        let vm = this;
        const stripe = Stripe('pk_test_YCIPURTU6ePqrjERaHH1AHMN'),
            elements = stripe.elements(),
            // card = elements.create('card'),
            style = {
                base: {
                    fontSize: '16px',
                    lineHeight: '24px',
                },
            };
        const card = elements.create('card', {style});

        card.mount('#card-element');
        card.addEventListener('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });

        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const {token, error} = await stripe.createToken(card);

            if (error) {
                // Inform the user if there was an error
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
            } else {
                // Send the token to your server
                stripeTokenHandler(token);
            }
        });
        const stripeTokenHandler = (token) => {
            // Insert the token ID into the form so it gets submitted to the server
            const form = document.getElementById('payment-form');
            const hiddenInput = document.createElement('input');
            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('value', token.id);
            form.appendChild(hiddenInput);

            // Submit the form
            form.submit();
        }
    }
})
