import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleDown, FaAngleUp, FaTrashAlt } from 'react-icons/fa';
import { IoCaretDownSharp } from "react-icons/io5";
import { AiOutlineCaretUp } from "react-icons/ai";
import { GrFormPrevious } from "react-icons/gr";
import { removeFromCart } from '../redux/productCartSlice'; // Action to remove items
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaArrowRightLong } from 'react-icons/fa6';
import masterCard from '../assets/cardsPics/matercard.png'
import visaCard from '../assets/cardsPics/visacard.png'
import rupyCard from '../assets/cardsPics/rupycard.png'

const Cart = () => {
  const cart = useSelector(state => state.productCart.cart);
  const dispatch = useDispatch();

  // State to manage the quantity for each cart item
  const [quantities, setQuantities] = useState(cart.map(item => item.quantity || 1));

  // Function to handle quantity change
  const handleQuantityChange = (index, delta) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = Math.max(1, updatedQuantities[index] + delta); // Ensure quantity doesn't go below 1
    setQuantities(updatedQuantities);
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Product removed from cart');
  };

  return (
    <div className="flex h-screen bg-white border rounded-xl">
      {/* Cart items on the left */}
      <div className="w-2/3 p-6">
        <div className='flex gap-2'>
          <Link to={'/dashboard'} className='mt-2'>
            <GrFormPrevious />
          </Link>
          <div>
            <h2 className="text-xl mb-4">Shopping Continue</h2>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          <p>You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={item.id} className="flex items-center justify-between border rounded-xl p-4 mb-4 ">
              <div className='flex gap-4'>
                <img src={item.image} alt={item.name} className="w-24 h-24 p-2 object-cover bg-gray-100 rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold">{item.brand} {item.model}</h3>
                  <p className="text-sm italic">Running</p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                {/* Quantity controllers */}
                <div className="flex items-center ">

                  <input
                    type="number"
                    value={quantities[index]}
                    readOnly
                    className='w-10 text-center font-bold '
                  />
                  <div className='flex flex-col gap-0'>

                  <button
                    onClick={() => handleQuantityChange(index, 1)}
                    className=" rounded m-0 p-0"
                  >
                    <AiOutlineCaretUp />
                  </button>
                  <button
                    onClick={() => handleQuantityChange(index, -1)}
                    className=" rounded m-0 p-0"
                    disabled={quantities[index] <= 1}
                  >
                    <IoCaretDownSharp />
                  </button>
                  </div>
                </div>

                <p className="text-sm font-bold">${item.price}.00</p>

                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-gray-800"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment card on the right */}
      <div className="w-1/3 p-10">
       <div className='bg-[#89089F] p-5 rounded-xl text-white'>
       <div className='flex justify-between'>
            <h2 className="text-xl  mb-4">Card Details</h2>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s" alt="" className="h-10 w-10 rounded-md object-cover" />
       </div>
       <div className='flex gap-2'>
        <div className='bg-[#BA68C8] w-16  p-2 rounded-md '>
          <img src={masterCard} alt="" className='w-full' />
        </div>
        <div className='bg-[#BA68C8]  w-16  p-2 rounded-md'>
          <img src={visaCard} alt="" className='w-full' />
        </div>
        <div className='bg-[#BA68C8]  w-16  p-2 rounded-md'>
          <img src={rupyCard} alt="" className='w-full' />
        </div>

       </div>
        <form className="space-y-4 my-4">
          <div>
            <label className="block text-gray-300">Name on Card</label>
            <input type="text" className="w-full text-white p-2 bg-[#BA68C8]  rounded placeholder-white" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-gray-300">Card Number</label>
            <input type="text" className="w-full p-2  bg-[#BA68C8]  rounded placeholder-white" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="flex justify-between gap-2">
            <div>
              <label className="block text-gray-300">Expiration Date</label>
              <input type="text" className="w-full p-2  bg-[#BA68C8]  rounded placeholder-white" placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-gray-300">CVV</label>
              <input type="text" className="w-full p-2  bg-[#BA68C8] placeholder-white  rounded" placeholder="123" />
            </div>
          </div>

          <div className='h-[2px] bg-[#BA68C8]'/>
          <div className='py-4'>
              <div className='flex justify-between text-white text-sm'>
                 <h1>SubTotal</h1>
                 <p>$1,668</p>
              </div>

              <div className='flex justify-between text-white text-sm'>
                 <h1>Shipping</h1>
                 <p>$4</p>
              </div>
              <div className='flex justify-between text-white text-sm'>
                 <h1>Total (Tax Incl.) </h1>
                 <p>$1,668</p>
              </div>
          </div>
         <div className=' bg-[#BA68C8] flex justify-between p-2  items-center rounded-xl'>
         <p>$1,668</p>
         <button type="submit" className=" flex justify-center items-center gap-3 text-white px-2 py-1  ">Checkout <FaArrowRightLong /></button>
         </div>
        </form>
       </div>
      </div>
    </div>
  );
};

export default Cart;
