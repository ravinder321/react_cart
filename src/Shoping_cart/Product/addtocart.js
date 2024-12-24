import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductItem({ product }) {
    const [loading, setLoading] = useState(false);
    const { productId, email } = useParams();
    console.log(productId)
    useEffect(() => {
        if (!productId) {
            console.error('Product ID is missing:', {productId});
            return;
        }

        const addToCart = async () => {
                console.log('Adding to cart...');
        
                // Retrieve the token from localStorage (or wherever you are storing it)
                const token = localStorage.getItem('token');
        
                if (!token) {
                    // If the token is not available, notify the user that they need to be logged in
                    Swal.fire({
                        title: "Error",
                        text: "You need to be logged in to add items to your cart.",
                        icon: "error",
                    });
                    return;
                }
                    const response = await axios.post(
                    `http://localhost:8000/api/cart/${productId}`,
                    { email, quantity: 1 },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Send token in headers
                            'Content-Type': 'application/json', // Ensure proper content type
                        },
                    }
                );
                console.log('Response:', response);    
                if (response.data.success) {
                    setLoading(true);
                    Swal.fire({
                        title: "Success",
                        text: response.data.message || "Item added to cart successfully!",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "Something went wrong.",
                        icon: "error",
                    });
                }          
        };
        addToCart();
    }, [productId]); 

    return (
        <div className="product-item">
            {loading ? (
                <Navigate to="/shop" />
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}

export default ProductItem;
