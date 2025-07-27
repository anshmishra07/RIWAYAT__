import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="p-4 border rounded shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-semibold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-sm text-gray-500">By: {product.artist}</p>
            <p className="font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;