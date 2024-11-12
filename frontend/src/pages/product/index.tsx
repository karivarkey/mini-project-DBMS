import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toy } from "../../types/Toy";
const Product = () => {
  const { productID } = useParams<{ productID: string }>(); // Get productID from route parameters
  const [toy, setToy] = useState<Toy | null>(null); // Initialize state with Toy type or null

  useEffect(() => {
    if (productID) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/toys/${productID}`)
        .then((response) => {
          setToy(response.data); // Set toy data from the API response
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [productID]); // Add productID as a dependency

  return (
    <div>
      <h2>Product ID: {productID}</h2>
      {toy ? (
        <div>
          <h3>{toy.productName}</h3>
          <p>Price: ${toy.price}</p>

          <p>Age Group: {toy.ageGroup}</p>
          <p>Stock Left: {toy.stockLeft}</p>
        </div>
      ) : (
        <p>Loading toy details...</p>
      )}
    </div>
  );
};

export default Product;
