import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaSort, FaStar, FaComment, FaPercent, FaTimes } from "react-icons/fa";

const PetWebsite = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredClinics, setFilteredClinics] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCart, setShowCart] = useState(false);

    const products = [
        { id: 1, name: "Premium Dog Food", price: 29.99, discountedPrice: 24.99, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", description: "High-quality dog food for your furry friend", rating: 4.5, comments: [{ user: "John", text: "My dog loves it!" }, { user: "Sarah", text: "Great quality food" }] },
        { id: 2, name: "Cat Scratching Post", price: 39.99, discountedPrice: 34.99, image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", description: "Durable scratching post for cats", rating: 4.2, comments: [{ user: "Emma", text: "My cat can't stop using it!" }] },
        { id: 3, name: "Pet Carrier", price: 49.99, discountedPrice: 44.99, image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80", description: "Comfortable carrier for small pets", rating: 4.7, comments: [{ user: "Mike", text: "Very sturdy and easy to carry" }] },
    ];

    const clinics = [
        { id: 1, name: "Happy Paws Clinic", address: "123 Pet St, Anytown", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" },
        { id: 2, name: "Furry Friends Hospital", address: "456 Animal Ave, Petville", image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    ];

    const medicines = [
        { id: 1, name: "Flea Treatment", price: 15.99, discountedPrice: 13.99, image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", description: "Effective flea treatment for dogs and cats", rating: 4.3, comments: [{ user: "Lisa", text: "Works great!" }] },
        { id: 2, name: "Joint Supplement", price: 24.99, discountedPrice: 21.99, image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", description: "Support joint health in older pets", rating: 4.6, comments: [{ user: "David", text: "Noticed improvement in my dog's mobility" }] },
    ];

    useEffect(() => {
        filterItems();
    }, [searchQuery]);

    const filterItems = () => {
        const query = searchQuery.toLowerCase();
        setFilteredProducts(products.filter(item => item.name.toLowerCase().includes(query)));
        setFilteredClinics(clinics.filter(item => item.name.toLowerCase().includes(query) || item.address.toLowerCase().includes(query)));
        setFilteredMedicines(medicines.filter(item => item.name.toLowerCase().includes(query)));
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const sortItems = (items) => {
        return items.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const openProductDetails = (product) => {
        setSelectedProduct(product);
    };

    const closeProductDetails = () => {
        setSelectedProduct(null);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.discountedPrice, 0).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">PetCare Hub</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#" className="hover:text-blue-200">Home</a></li>
                            <li><a href="#" className="hover:text-blue-200">Products</a></li>
                            <li><a href="#" className="hover:text-blue-200">Clinics</a></li>
                            <li><a href="#" className="hover:text-blue-200">Medicines</a></li>
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="py-1 px-2 rounded-md text-black"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FaSearch className="absolute right-2 top-2 text-gray-500" />
                        </div>
                        <div className="relative cursor-pointer" onClick={() => setShowCart(true)}>
                            <FaShoppingCart className="text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto mt-8">
                <section className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Special Offer!</h2>
                    <p className="mb-4">Get 20% off on all pet food products. Limited time offer!</p>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 flex items-center">
                        <FaPercent className="mr-2" />
                        Claim Discount
                    </button>
                </section>

                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Featured Products</h2>
                        <button onClick={toggleSortOrder} className="flex items-center bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded-md transition duration-300">
                            <FaSort className="mr-2" />
                            Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sortItems(filteredProducts).map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-gray-600 line-through">${product.price.toFixed(2)}</p>
                                        <p className="text-red-600 font-bold">${product.discountedPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{product.rating}</span>
                                        </div>
                                        <div className="flex items-center cursor-pointer" onClick={() => openProductDetails(product)}>
                                            <FaComment className="text-blue-600 mr-1" />
                                            <span>{product.comments.length} comments</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-300 w-full"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Book a Clinic</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredClinics.map((clinic) => (
                            <div key={clinic.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={clinic.image} alt={clinic.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{clinic.name}</h3>
                                    <p className="text-gray-600 mb-2">{clinic.address}</p>
                                    <button className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition duration-300">
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Pet Medicines</h2>
                        <button onClick={toggleSortOrder} className="flex items-center bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded-md transition duration-300">
                            <FaSort className="mr-2" />
                            Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sortItems(filteredMedicines).map((medicine) => (
                            <div key={medicine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{medicine.name}</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-gray-600 line-through">${medicine.price.toFixed(2)}</p>
                                        <p className="text-red-600 font-bold">${medicine.discountedPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{medicine.rating}</span>
                                        </div>
                                        <div className="flex items-center cursor-pointer" onClick={() => openProductDetails(medicine)}>
                                            <FaComment className="text-blue-600 mr-1" />
                                            <span>{medicine.comments.length} comments</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addToCart(medicine)}
                                        className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-300 w-full"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                            <button onClick={closeProductDetails} className="text-gray-600 hover:text-gray-800">
                                <FaTimes />
                            </button>
                        </div>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400 mr-1" />
                                <span>{selectedProduct.rating}</span>
                            </div>
                            <p className="text-red-600 font-bold">${selectedProduct.discountedPrice.toFixed(2)}</p>
                        </div>
                        <h3 className="font-bold mb-2">Comments:</h3>
                        <ul className="mb-4">
                            {selectedProduct.comments.map((comment, index) => (
                                <li key={index} className="mb-2">
                                    <strong>{comment.user}:</strong> {comment.text}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                addToCart(selectedProduct);
                                closeProductDetails();
                            }}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 w-full"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            {showCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Your Cart</h2>
                            <button onClick={() => setShowCart(false)} className="text-gray-600 hover:text-gray-800">
                                <FaTimes />
                            </button>
                        </div>
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                <ul className="mb-4">
                                    {cart.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center mb-2">
                                            <span>{item.name}</span>
                                            <div>
                                                <span className="mr-4">${item.discountedPrice.toFixed(2)}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold">Total:</span>
                                    <span className="font-bold">${calculateTotal()}</span>
                                </div>
                                <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 w-full">
                                    Proceed to Checkout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 PetCare Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PetWebsite;
