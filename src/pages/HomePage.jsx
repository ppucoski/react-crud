import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../component/Product";
import { Link } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async() => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}/api/products`);
            setProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            <header className="bg-gray-200 py-5">
                <h2 className="text-center text-3xl font-bold text-gray-700">Products</h2>
            </header>

            <main className="container mx-auto p-5">
                <div className="text-center mb-5">
                    <Link to="/create" className="inline-block mt-5 shadow-md bg-orange-400 text-black rounded-sm px-4 py-2 font-bold hover:bg-orange-300 hover:cursor-pointer">
                        Add a new product
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                    {isLoading ? (
                        "Loading, please wait"
                    ) : (
                        <>
                            {products.length > 0 ? (
                                <>
                                    {products.map((product, index) => (
                                        <Product key={index} product={product} getProducts={getProducts} />
                                    ))}
                                </>
                            ) : (
                                <div>There is no product</div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <footer className="bg-gray-200 py-10">
                <div className="text-center text-gray-700">
                    <p>Струмица</p>
                    <p>ДООЕЛ</p>
                    <p>ул.Гоце Делчев бр.12</p>
                    <p>Телефон: 070000000</p>
                    <p><a href="mailto:example@yahoo.com" className="text-blue-500 hover:underline">email: example@yahoo.com</a></p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
