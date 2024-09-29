import React, { useState, useEffect, Fragment } from "react";
import { FaSearch, FaBars, FaShoppingCart, FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdArrowUp } from "react-icons/io";

// Header Component
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            // Simulated API call for search suggestions
            const dummySuggestions = ["Product A", "Product B", "Product C"].filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(dummySuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    return (
        <header className="sticky top-0 z-50 bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-2xl font-bold">Logo</div>
                <div className="hidden md:flex space-x-4">
                    <a href="#" className="hover:text-gray-300">Home</a>
                    <a href="#" className="hover:text-gray-300">Products</a>
                    <a href="#" className="hover:text-gray-300">About</a>
                    <a href="#" className="hover:text-gray-300">Contact</a>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute right-3 top-3 text-gray-400" />
                    {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white text-gray-800 mt-1 rounded shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaBars />
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-700 px-4 py-2">
                    <a href="#" className="block py-2 hover:text-gray-300">Home</a>
                    <a href="#" className="block py-2 hover:text-gray-300">Products</a>
                    <a href="#" className="block py-2 hover:text-gray-300">About</a>
                    <a href="#" className="block py-2 hover:text-gray-300">Contact</a>
                </div>
            )}
        </header>
    );
};

// Footer Component
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <p>123 Main St, City, Country</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 234 567 890</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-2xl hover:text-blue-500"><FaFacebook /></a>
                            <a href="#" className="text-2xl hover:text-blue-400"><FaTwitter /></a>
                            <a href="#" className="text-2xl hover:text-pink-500"><FaInstagram /></a>
                            <a href="#" className="text-2xl hover:text-blue-700"><FaLinkedin /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                </div>
            </div>
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
                <IoMdArrowUp size={24} />
            </button>
        </footer>
    );
};

// Product List Component
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [view, setView] = useState("grid");
    const [filters, setFilters] = useState({
        category: "all",
        priceRange: "all",
        sortBy: "popularity"
    });

    useEffect(() => {
        // Simulated API call to fetch products
        const fetchProducts = async () => {
            const dummyProducts = [
                { id: 1, name: "Product A", price: 19.99, rating: 4.5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", category: "electronics" },
                { id: 2, name: "Product B", price: 29.99, rating: 4.0, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", category: "clothing" },
                { id: 3, name: "Product C", price: 39.99, rating: 4.8, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80", category: "accessories" },
            ];
            setProducts(dummyProducts);
        };
        fetchProducts();
    }, []);

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    const filteredProducts = products.filter(product => {
        if (filters.category !== "all" && product.category !== filters.category) return false;
        if (filters.priceRange !== "all") {
            const [min, max] = filters.priceRange.split("-").map(Number);
            if (product.price < min || product.price > max) return false;
        }
        return true;
    }).sort((a, b) => {
        if (filters.sortBy === "price-low-high") return a.price - b.price;
        if (filters.sortBy === "price-high-low") return b.price - a.price;
        return b.rating - a.rating; // Default: sort by popularity (rating)
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-wrap items-center justify-between">
                <div className="space-x-4 mb-4 sm:mb-0">
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="accessories">Accessories</option>
                    </select>
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                    >
                        <option value="all">All Prices</option>
                        <option value="0-25">$0 - $25</option>
                        <option value="25-50">$25 - $50</option>
                        <option value="50-100">$50 - $100</option>
                    </select>
                    <select
                        className="border p-2 rounded"
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    >
                        <option value="popularity">Sort by Popularity</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                    </select>
                </div>
                <div className="space-x-2">
                    <button
                        className={`p-2 ${view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
                        onClick={() => setView("grid")}
                    >
                        Grid
                    </button>
                    <button
                        className={`p-2 ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
                        onClick={() => setView("list")}
                    >
                        List
                    </button>
                </div>
            </div>
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}>
                {filteredProducts.map(product => (
                    <div key={product.id} className={view === "grid" ? "bg-white rounded-lg shadow-md overflow-hidden" : "bg-white rounded-lg shadow-md overflow-hidden flex"}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className={view === "grid" ? "w-full h-48 object-cover" : "w-1/3 h-48 object-cover"}
                        />
                        <div className={view === "grid" ? "p-4" : "p-4 flex-grow"}>
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        className={index < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                                <span className="ml-2 text-gray-600">({product.rating})</span>
                            </div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Product Detail Component
const ProductDetail = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const product = {
        name: "Awesome Product",
        price: 99.99,
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
        ],
        description: "This is an awesome product with amazing features. It's perfect for your needs and will exceed your expectations.",
        specifications: [
            { name: "Color", value: "Black" },
            { name: "Size", value: "Medium" },
            { name: "Weight", value: "500g" },
            { name: "Material", value: "Premium quality" }
        ],
        reviews: [
            { id: 1, user: "John Doe", rating: 5, comment: "Great product, highly recommended!" },
            { id: 2, user: "Jane Smith", rating: 4, comment: "Good value for money." }
        ]
    };

    const handleImageChange = (index) => {
        setCurrentImage(index);
        setIsZoomed(false);
    };

    const handleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={product.images[currentImage]}
                            alt={product.name}
                            className={`w-full h-auto transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
                            onClick={handleZoom}
                        />
                    </div>
                    <div className="mt-4 flex space-x-2">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.name} thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${index === currentImage ? "ring-2 ring-blue-500" : ""}`}
                                onClick={() => handleImageChange(index)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl text-blue-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={index < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                            />
                        ))}
                        <span className="ml-2 text-gray-600">({product.rating})</span>
                    </div>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 flex items-center">
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                    </button>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
                        <table className="w-full">
                            <tbody>
                                {product.specifications.map((spec, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td className="py-2 px-4 font-semibold">{spec.name}</td>
                                        <td className="py-2 px-4">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                        {product.reviews.map(review => (
                            <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <span className="font-semibold mr-2">{review.user}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className={index < review.rating ? "text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const EcommercePetWebsite = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <ProductList />
                <ProductDetail />
            </main>
            <Footer />
        </div>
    )
}

export default EcommercePetWebsite;