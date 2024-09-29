import React, { useState } from "react";
import { FaShoppingCart, FaStar, FaStarHalf, FaClock, FaCommentAlt } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const ProductDetail2 = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState(0);

    const product = {
        name: "Premium Wireless Headphones",
        price: 199.99,
        discountPrice: 149.99,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b",
            "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3"
        ],
        description: "Experience premium sound quality with our wireless headphones. Featuring noise-cancellation technology and long battery life.",
        specs: [
            "Bluetooth 5.0",
            "40mm drivers",
            "Up to 30 hours battery life",
            "Active Noise Cancellation"
        ]
    };

    const reviews = [
        { user: "John D.", rating: 5, comment: "Excellent sound quality and comfort!" },
        { user: "Sarah M.", rating: 4.5, comment: "Great value for the price. Battery life is impressive." }
    ];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const addToCart = () => {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
                {/* Product Images */}
                <div className="w-full md:w-1/2 px-4 mb-8">
                    <div className="relative">
                        <img
                            src={product.images[currentImage]}
                            alt={product.name}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                        <button
                            onClick={prevImage}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                        >
                            <BsArrowLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                        >
                            <BsArrowRight />
                        </button>
                    </div>
                    <div className="flex mt-4 space-x-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.name} thumbnail`}
                                className={`w-20 h-20 object-cover rounded cursor-pointer ${index === currentImage ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={() => setCurrentImage(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 px-4">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-red-600 mr-2">${product.discountPrice}</span>
                        <span className="text-lg text-gray-500 line-through">${product.price}</span>
                        <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <ul className="list-disc list-inside mb-4">
                        {product.specs.map((spec, index) => (
                            <li key={index} className="text-gray-600">{spec}</li>
                        ))}
                    </ul>
                    <button
                        onClick={addToCart}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                    >
                        Add to Cart
                    </button>

                    {/* Discount Timer */}
                    <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Limited Time Offer!</h3>
                        <div className="flex items-center">
                            <FaClock className="text-yellow-600 mr-2" />
                            <span className="text-yellow-800">Ends in: 23:59:59</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">{review.user}</span>
                            <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>

            {/* Comment Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                        <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block mb-1 font-medium">Rating</label>
                        <select id="rating" className="w-full px-3 py-2 border rounded-lg">
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block mb-1 font-medium">Comment</label>
                        <textarea id="comment" rows="4" className="w-full px-3 py-2 border rounded-lg"></textarea>
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                        Submit Review
                    </button>
                </form>
            </div>

            {/* Advertisement Banner */}
            <div className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg overflow-hidden shadow-lg">
                <div className="p-8 text-white">
                    <h2 className="text-3xl font-bold mb-4">Summer Sale!</h2>
                    <p className="text-xl mb-6">Get up to 50% off on all audio products. Limited time offer.</p>
                    <button className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Cart Widget */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">${item.discountPrice} x {item.quantity}</p>
                            </div>
                            <button className="text-red-500 hover:text-red-700">
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>${cartItems.reduce((total, item) => total + item.discountPrice * item.quantity, 0).toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Cart Toggle Button */}
            <button
                onClick={toggleCart}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
            >
                <FaShoppingCart size={24} />
            </button>

            {/* Checkout Process */}
            {checkoutStep > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                        {checkoutStep === 1 && (
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
                                    <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                                    <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-1 font-medium">Shipping Address</label>
                                    <textarea id="address" rows="3" className="w-full px-3 py-2 border rounded-lg" required></textarea>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCheckoutStep(2)}
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                                >
                                    Continue to Payment
                                </button>
                            </form>
                        )}
                        {checkoutStep === 2 && (
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="card" className="block mb-1 font-medium">Card Number</label>
                                    <input type="text" id="card" className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="expiry" className="block mb-1 font-medium">Expiry Date</label>
                                        <input type="text" id="expiry" placeholder="MM/YY" className="w-full px-3 py-2 border rounded-lg" required />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="cvv" className="block mb-1 font-medium">CVV</label>
                                        <input type="text" id="cvv" className="w-full px-3 py-2 border rounded-lg" required />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCheckoutStep(3)}
                                    className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                                >
                                    Complete Order
                                </button>
                            </form>
                        )}
                        {checkoutStep === 3 && (
                            <div className="text-center">
                                <FaCommentAlt className="text-green-500 text-5xl mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
                                <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been received and is being processed.</p>
                                <button
                                    onClick={() => setCheckoutStep(0)}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                                >
                                    Back to Shop
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail2;