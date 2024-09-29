import React, { useState } from "react";
import { FaShoppingCart, FaStar, FaUser, FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const EcommerceComponent = () => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("popularity");

    const products = [
        { id: 1, name: "Smartphone X", price: 799, rating: 4.5, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
        { id: 2, name: "Laptop Pro", price: 1299, rating: 4.8, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
        { id: 3, name: "Wireless Earbuds", price: 149, rating: 4.3, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
        { id: 4, name: "Smart Watch", price: 299, rating: 4.6, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const CartItem = ({ item }) => (
        <div className="flex items-center justify-between p-2 border-b">
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <span className="flex-grow mx-2">{item.name}</span>
            <span className="font-bold">${item.price}</span>
            <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
            >
                Remove
            </button>
        </div>
    );

    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">${product.price}</span>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{product.rating}</span>
                    </div>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );

    const DiscountBanner = () => (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p className="font-bold">Limited Time Offer!</p>
            <p>Use code SUMMER20 for 20% off on all products. Hurry, offer ends soon!</p>
        </div>
    );

    const AdBanner = () => (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg mb-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">New Arrivals!</h2>
            <p className="mb-4">Check out our latest tech gadgets and accessories.</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                Shop Now
            </button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">E-Commerce Store</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setShowCart(!showCart)}
                        className="relative p-2 text-gray-600 hover:text-gray-900"
                    >
                        <FaShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cart.length}
                            </span>
                        )}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                        <FaUser size={24} />
                    </button>
                </div>
            </header>

            <DiscountBanner />

            <div className="flex mb-6 space-x-4">
                <div className="flex-grow">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-gray-200 rounded-lg flex items-center hover:bg-gray-300 transition-colors"
                >
                    <FaFilter className="mr-2" /> Filters
                </button>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none px-4 py-2 bg-gray-200 rounded-lg pr-8 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="popularity">Popularity</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="newest">Newest Arrivals</option>
                    </select>
                    <FaSortAmountDown className="absolute right-3 top-3 text-gray-600" />
                </div>
            </div>

            {showFilters && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Filters</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">Category</label>
                            <select className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Books</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Brand</label>
                            <select className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Brands</option>
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Sony</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Price Range</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Rating</label>
                            <select className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Ratings</option>
                                <option>4 Stars & Above</option>
                                <option>3 Stars & Above</option>
                                <option>2 Stars & Above</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <AdBanner />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {showCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                    <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Your Cart</h2>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            {cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <>
                                    {cart.map((item) => (
                                        <CartItem key={item.id} item={item} />
                                    ))}
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center font-bold text-lg">
                                            <span>Total:</span>
                                            <span>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
                                        </div>
                                        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EcommerceComponent;
