import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaStar, FaFilter, FaTrash, FaUndo, FaExclamationTriangle } from "react-icons/fa";

const ProductListingPage = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            title: "Stylish T-Shirt",
            price: 29.99,
            description: "Comfortable and trendy t-shirt for everyday wear.",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "Clothing",
            brand: "FashionBrand",
            rating: 4.5,
            stock: 50
        },
        {
            id: 2,
            title: "Wireless Headphones",
            price: 129.99,
            description: "High-quality wireless headphones with noise cancellation.",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "Electronics",
            brand: "AudioTech",
            rating: 4.8,
            stock: 30
        },
        {
            id: 3,
            title: "Smart Watch",
            price: 199.99,
            description: "Advanced smartwatch with fitness tracking and notifications.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "Electronics",
            brand: "TechWear",
            rating: 4.6,
            stock: 20
        },
        {
            id: 4,
            title: "Leather Wallet",
            price: 49.99,
            description: "Genuine leather wallet with multiple card slots and coin pocket.",
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            category: "Accessories",
            brand: "LeatherCraft",
            rating: 4.3,
            stock: 40
        },
        {
            id: 5,
            title: "Stylish T-Shirt",
            price: 29.99,
            description: "Comfortable and trendy t-shirt for everyday wear.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR64FTozvXH8XiAj420RaM3w49UJ-udeA-oqA&s",
            category: "Clothing",
            brand: "FashionBrand",
            rating: 4.5,
            stock: 50
        },
        {
            id: 6,
            title: "Wireless Headphones",
            price: 129.99,
            description: "High-quality wireless headphones with noise cancellation.",
            image: "https://genk.mediacdn.vn/k:thumb_w/640/2015/img20150917103241900/dang-vo-doi-batman-tu-phim-anh-den-game.jpg",
            category: "Electronics",
            brand: "AudioTech",
            rating: 4.8,
            stock: 30
        },
        {
            id: 7,
            title: "Smart Watch",
            price: 199.99,
            description: "Advanced smartwatch with fitness tracking and notifications.",
            image: "https://kenh14cdn.com/thumb_w/650/2016/6-1467219304411.jpg",
            category: "Electronics",
            brand: "TechWear",
            rating: 4.6,
            stock: 20
        },
        {
            id: 8,
            title: "Leather Wallet",
            price: 49.99,
            description: "Genuine leather wallet with multiple card slots and coin pocket.",
            image: "https://media.viez.vn/prod/2022/3/2/image_badc18ae91.png",
            category: "Accessories",
            brand: "LeatherCraft",
            rating: 4.3,
            stock: 40
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);
    const [sortOption, setSortOption] = useState("popularity");
    const [filters, setFilters] = useState({
        category: "",
        priceRange: "",
        brand: "",
        rating: "",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [showLowStockWarning, setShowLowStockWarning] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setProducts(products);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const lowStockProducts = products.filter(product => product.stock < 10);
        setShowLowStockWarning(lowStockProducts.length > 0);
    }, [products]);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return (
            matchesSearch &&
            (filters.category === "" || product.category === filters.category) &&
            (filters.brand === "" || product.brand === filters.brand) &&
            (filters.rating === "" || product.rating >= parseFloat(filters.rating)) &&
            (filters.priceRange === "" ||
                (filters.priceRange === "0-50" && product.price <= 50) ||
                (filters.priceRange === "51-100" &&
                    product.price > 50 &&
                    product.price <= 100) ||
                (filters.priceRange === "101+" && product.price > 100))
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-low-high":
                return a.price - b.price;
            case "price-high-low":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleAddToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        showNotificationMessage(`Added ${product.title} to cart`);
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        showNotificationMessage("Item removed from cart");
    };

    const handleUpdateCartQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
    };

    const handleAddToWishlist = (product) => {
        if (!wishlist.some(item => item.id === product.id)) {
            setWishlist([...wishlist, product]);
            showNotificationMessage(`Added ${product.title} to wishlist`);
        } else {
            showNotificationMessage(`${product.title} is already in your wishlist`);
        }
    };

    const handleRemoveFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        setWishlist(updatedWishlist);
        showNotificationMessage("Item removed from wishlist");
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleClearFilters = () => {
        setFilters({
            category: "",
            priceRange: "",
            brand: "",
            rating: "",
        });
        setSearchTerm("");
        setCurrentPage(1);
        showNotificationMessage("Filters cleared");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Product Listing</h1>

            {showNotification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notificationMessage}
                </div>
            )}

            {showLowStockWarning && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Low Stock Warning</p>
                    <p>Some products are running low on stock. Check inventory soon!</p>
                </div>
            )}

            <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
                <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 pl-10 border rounded"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={toggleFilters}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                    >
                        <FaFilter className="mr-2" />
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                    <button
                        onClick={handleClearFilters}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center"
                    >
                        <FaUndo className="mr-2" />
                        Clear Filters
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row mb-8">
                {showFilters && (
                    <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-8">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="category" className="block mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">All Categories</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="priceRange" className="block mb-2">
                                    Price Range
                                </label>
                                <select
                                    id="priceRange"
                                    name="priceRange"
                                    value={filters.priceRange}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">All Prices</option>
                                    <option value="0-50">$0 - $50</option>
                                    <option value="51-100">$51 - $100</option>
                                    <option value="101+">$101+</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="brand" className="block mb-2">
                                    Brand
                                </label>
                                <select
                                    id="brand"
                                    name="brand"
                                    value={filters.brand}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">All Brands</option>
                                    <option value="FashionBrand">FashionBrand</option>
                                    <option value="AudioTech">AudioTech</option>
                                    <option value="TechWear">TechWear</option>
                                    <option value="LeatherCraft">LeatherCraft</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="rating" className="block mb-2">
                                    Rating
                                </label>
                                <select
                                    id="rating"
                                    name="rating"
                                    value={filters.rating}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">All Ratings</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="3">3+ Stars</option>
                                    <option value="2">2+ Stars</option>
                                    <option value="1">1+ Stars</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`w-full ${showFilters ? "md:w-3/4" : ""}`}>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm">
                            Showing {indexOfFirstProduct + 1}-
                            {Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
                            {sortedProducts.length} products
                        </p>
                        <div className="flex items-center">
                            <label htmlFor="sort" className="mr-2">
                                Sort by:
                            </label>
                            <select
                                id="sort"
                                value={sortOption}
                                onChange={handleSortChange}
                                className="p-2 border rounded"
                            >
                                <option value="popularity">Popularity</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        <button
                                            onClick={() => handleAddToWishlist(product)}
                                            className="bg-white rounded-full p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                                            aria-label="Add to Wishlist"
                                        >
                                            <FaHeart />
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-white rounded-full p-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
                                            aria-label="Add to Cart"
                                        >
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {product.description}
                                    </p>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xl font-bold">${product.price}</span>
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {product.stock < 10 ? (
                                            <span className="text-red-500">
                                                <FaExclamationTriangle className="inline mr-1" />
                                                Low stock: Only {product.stock} left
                                            </span>
                                        ) : (
                                            `In stock: ${product.stock}`
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            {Array.from(
                                { length: Math.ceil(sortedProducts.length / productsPerPage) },
                                (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${i + 1 === currentPage
                                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                )
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b py-2 last:border-b-0">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-gray-600">${item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateCartQuantity(item.id, parseInt(e.target.value))}
                                        className="w-16 p-1 border rounded mr-2"
                                    />
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 text-right">
                            <p className="text-xl font-bold">
                                Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        <button
                                            onClick={() => handleRemoveFromWishlist(product.id)}
                                            className="bg-white rounded-full p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                                            aria-label="Remove from Wishlist"
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-white rounded-full p-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
                                            aria-label="Add to Cart"
                                        >
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {product.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold">${product.price}</span>
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListingPage;
