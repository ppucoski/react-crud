/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";

const Product = ({ product, getProducts }) => {
    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: "Do you really want to delete the product?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`);
                toast.success("Deleted the product successfully");
                getProducts();
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="bg-white rounded shadow-lg">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-3/4 object-cover rounded-t" // Adjusted height for larger images
            />
            <div className="px-4 pt-2 pb-2">
                <h2 className="text font-semibold">{product.name}</h2>
                <div className="text-sm">Quantity: {product.quantity}</div>
                <div className="text-sm">Price: ${product.price}</div>
                <div className="mt-2 flex gap-4">
                    <Link 
                        to={`/edit/${product._id}`} 
                        className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-400 hover:cursor-pointer"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={() => deleteProduct(product._id)} 
                        className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-400 hover:cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
