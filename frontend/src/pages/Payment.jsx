import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const paymentMethods = [
  { value: 'visa', label: 'Visa', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmFfOlhWAYsihPTeJy8phAfPDYq905ZQKag&s' },
  { value: 'mobile', label: 'Mobile', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZw9oFjL619-q-UGLAN3GNtvWyZJRkrnWuFQ&s' },
  { value: 'cash', label: 'Cash', img: 'https://t4.ftcdn.net/jpg/05/74/30/17/360_F_574301734_d8THltMAdIqZXRuokrqVTV4pR2Xv4Z30.jpg' }
];

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const user = useSelector((state) => state.auth.user);


  const handlePayment = async () => {
    const res = await axios.post(`http://localhost:3000/api/cart/payment/${user._id}`);
    if (res.data.success) {
      toast.success("Payment Successful");
    } else {
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen pt-1 px-5">
      <h1 className="md:text-3xl text-xl font-semibold text-center mt-20 my-5 opacity-75">
        Payment
      </h1>

      <div className="flex flex-col items-center">
        <label className="text-lg font-medium mb-2" htmlFor="payment-method">
          Select Payment Method
        </label>
        <div className="flex justify-center items-center mb-5">
          {paymentMethods.map((method) => (
            <button
              key={method.value}
              className={`p-2 m-2 border border-gray-300 rounded-md focus:outline-none ${paymentMethod === method.value ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => setPaymentMethod(method.value)}
            >
              <img src={method.img} alt={method.label} className="h-12 w-12 mb-1 mx-auto" />
              <span>{method.label}</span>
            </button>
          ))}
        </div>

        {paymentMethod && (
          <>
            <label className="text-lg font-medium mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="p-2 border border-gray-300 rounded-md mb-5 w-full max-w-sm"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <label className="text-lg font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="p-2 border border-gray-300 rounded-md mb-5 w-full max-w-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {paymentMethod === 'visa' && (
              <>
                <label className="text-lg font-medium mb-2" htmlFor="card-number">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  className="p-2 border border-gray-300 rounded-md mb-5 w-full max-w-sm"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />

                <label className="text-lg font-medium mb-2" htmlFor="expiry-date">
                  Expiry Date
                </label>
                <input
                  type="month"
                  id="expiry-date"
                  className="p-2 border border-gray-300 rounded-md mb-5 w-full max-w-sm"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />

                <label className="text-lg font-medium mb-2" htmlFor="cvv">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="p-2 border border-gray-300 rounded-md mb-5 w-full max-w-sm"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </>
            )}

            {paymentMethod === 'mobile' && (
              <>
                <label className="text-lg font-medium mb-2" htmlFor="mobile-number">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile-number"
                  className="p-2 border border-gray-300 rounded-md mb-5 w-full max-w-sm"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </>
            )}
          </>
        )}

        <button
          className="p-2 bg-blue-500 text-white rounded-md mt-5 w-full max-w-sm"
          onClick={handlePayment}
        >
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
