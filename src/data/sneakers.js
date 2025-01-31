// src/data/sneakers.js
import sneaker1 from '../assets/sneakersImages/sneaker1.png';
import sneaker2 from '../assets/sneakersImages/sneaker2.png';
import sneaker3 from '../assets/sneakersImages/sneaker3.png';
import sneaker4 from '../assets/sneakersImages/sneaker4.png';
import sneaker5 from '../assets/sneakersImages/sneaker5.png';
import sneaker6 from '../assets/sneakersImages/sneaker6.png';
import sneaker7 from '../assets/sneakersImages/sneaker7.png';
import sneaker8 from '../assets/sneakersImages/sneaker8.png';
import sneaker9 from '../assets/sneakersImages/sneaker9.png';
import sneaker10 from '../assets/sneakersImages/sneaker10.png';
import sneaker11 from '../assets/sneakersImages/sneaker11.png';

// Array of sneaker objects
const sneakers = [
  {
    id: 1,
    brand: "Nike",
    model: "Air",
    color: "Black/White",
    price: 150,
    image: sneaker1,
    rating: 4.5, // Add rating property
  },
  {
    id: 2,
    brand: "Adidas",
    model: "Ultra",
    color: "Core Black",
    price: 180,
    image: sneaker2,
    rating: 4.0,
  },
  {
    id: 3,
    brand: "Puma",
    model: "RS-X",
    color: "White/Black",
    price: 120,
    image: sneaker3,
    rating: 3.5,
  },
  {
    id: 4,
    brand: "New Bala",
    model: "990v5",
    color: "Grey",
    price: 175,
    image: sneaker4,
    rating: 4.8,
  },
  {
    id: 5,
    brand: "Reebok",
    model: "Club",
    color: "White/Green",
    price: 75,
    image: sneaker5,
    rating: 4.1,
  },
  {
    id: 6,
    brand: "Asics",
    model: "Gel",
    color: "Black/Red",
    price: 160,
    image: sneaker6,
    rating: 4.3,
  },
  {
    id: 7,
    brand: "Converse",
    model: "Chuck",
    color: "Black",
    price: 55,
    image: sneaker7,
    rating: 4.0,
  },
  {
    id: 8,
    brand: "Vans",
    model: "Old Skool",
    color: "Black/White",
    price: 60,
    image: sneaker8,
    rating: 4.2,
  },
  {
    id: 9,
    brand: "Hoka One",
    model: "Bondi",
    color: "Blue/White",
    price: 160,
    image: sneaker9,
    rating: 4.5,
  },
  {
    id: 10,
    brand: "On",
    model: "Cloudstratus",
    color: "Black/White",
    price: 170,
    image: sneaker10,
    rating: 4.7,
  },
  {
    id: 11,
    brand: "Nike",
    model: "Air",
    color: "White",
    price: 90,
    image: sneaker11,
    rating: 4.0,
  },
];

// Export the sneakers array for use in other components
export default sneakers;
