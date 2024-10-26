import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'

function App() {

  const [product, setProduct] = useState();

  const makePayment = (token)=>{
    const body ={
      token,
      product
    }
    const header = {
      "Content-Type": "application/json"
    }

    return fetch(`http:localhost:8282/payment`,{
      method: {
        method: "POST",
        header,
        body: JSON.stringify(body)
      }
    }).then(response=> {
      console.log("RESPONSE", response);
      const {status} = response;
      console.log("STATUS", status);
    })
    .catch(err=> console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout 
        stripeKey={process.env.REACT_APP_KEY} 
        token={makePayment}
        name='Payment'
        >
          <button className='btn-large blue'>
            Payment via card
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
