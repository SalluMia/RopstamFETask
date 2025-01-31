import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/productCartSlice";

const Dashboard = () => {
  const products = useSelector(state => state.productCart.products);
  const dispatch = useDispatch();

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow-lg">
          <img src={product.image} alt={product.name} className="w-full" />
          <h2 className="text-xl">{product.name}</h2>
          <p>${product.price}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
