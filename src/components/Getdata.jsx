// app/components/ProductList.jsx

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list flexlayout flex-wrap ">
      {products.map((product) => (
        <div key={product.id} className="product-card relative w-[24%] shadow-lg p-[20px] h-[70vh] rounded-md">
            <img src={product.thumbnail} className="w-[90%]" alt={product.title}/>
          <h2 className="text-[1.4vw]">{product.title}</h2>
          <p className="text-[1.1vw] text-blue-600">Price: ${product.price}</p>
          <p className="text-[1.1vw]">Category: {product.category}</p>
          <p className="text-[1.1vw]">Brand: {product.brand}</p>
          <p className="text-[0.9vw] absolute top-10 bg-red-600 text-white p-1 rounded-md">Rating : {product.rating}</p>
          <p className="text-[1.1vw]">Stock: {product.stock}</p>
          <p className="text-[1.1vw]">Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} (W x H x D)</p>
          <button>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
