import React, { useState, useEffect } from "react";
import { FiSearch, FiCalendar, FiUser, FiHeart, FiStar, FiClock, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaStethoscope, FaHospital, FaFilter, FaChevronDown, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const MedicalPortal = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [selectedRating, setSelectedRating] = useState(0);
    const [sortBy, setSortBy] = useState("name");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [selectedAvailability, setSelectedAvailability] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            setDoctors(data.map(user => ({
                ...user,
                specialty: ["Cardiologist", "Dermatologist", "Pediatrician", "Neurologist"][Math.floor(Math.random() * 4)],
                image: `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80`,
                rating: Math.floor(Math.random() * 5) + 1,
                experience: Math.floor(Math.random() * 20) + 1,
                location: ["New York", "Los Angeles", "Chicago", "Houston"][Math.floor(Math.random() * 4)],
                availability: ["Morning", "Afternoon", "Evening"][Math.floor(Math.random() * 3)],
                consultationFee: Math.floor(Math.random() * 200) + 50,
                bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                education: ["MD from Harvard Medical School", "Residency at Johns Hopkins Hospital"],
                languages: ["English", "Spanish"],
                insuranceAccepted: ["Medicare", "Blue Cross", "Aetna"],
            })));
        };
        fetchDoctors();
    }, []);

    const bookAppointment = (doctor) => {
        setAppointments([...appointments, doctor]);
        setShowModal(true);
        setSelectedDoctor(doctor);
    };

    const filteredDoctors = doctors.filter((doctor) =>
        (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedSpecialty === "All" || doctor.specialty === selectedSpecialty) &&
        (selectedLocation === "All" || doctor.location === selectedLocation) &&
        (selectedAvailability === "All" || doctor.availability === selectedAvailability) &&
        doctor.rating >= selectedRating
    );

    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "experience") return b.experience - a.experience;
        if (sortBy === "consultationFee") return a.consultationFee - b.consultationFee;
        return 0;
    });

    // Get current doctors for the current page
    const indexOfLastDoctor = currentPage * productsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - productsPerPage;
    const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalPages = Math.ceil(sortedDoctors.length / productsPerPage);

    const specialties = ["All", ...new Set(doctors.map(doctor => doctor.specialty))];
    const locations = ["All", ...new Set(doctors.map(doctor => doctor.location))];
    const availabilities = ["All", "Morning", "Afternoon", "Evening"];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-gray-500 hover:text-gray-700 md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <AiOutlineMenu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-blue-600">MedCare</h1>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Doctors</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Clinics</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search doctors or specialties..."
                                className="w-full md:w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
                        </div>
                        <button className="text-gray-600 hover:text-blue-600 transition-colors">
                            <FiHeart size={24} />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 transition-colors relative">
                            <FiCalendar size={24} />
                            {appointments.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {appointments.length}
                                </span>
                            )}
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 transition-colors">
                            <FiUser size={24} />
                        </button>
                    </div>
                </div>
            </header>

            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
                <div className="container mx-auto px-4 py-2">
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors">Doctors</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors">Clinics</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Featured Doctors</h2>
                    <div className="flex space-x-2">
                        <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                            <FaStethoscope />
                            <span>Find Doctors</span>
                        </button>
                        <button className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                            <FaHospital />
                            <span>Find Clinics</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Filter and Sort</h3>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <FaFilter />
                            <span>Filters</span>
                            <FaChevronDown className={`transform ${showFilters ? 'rotate-180' : ''} transition-transform`} />
                        </button>
                    </div>
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                                <select
                                    value={selectedSpecialty}
                                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition-all"
                                >
                                    {specialties.map((specialty) => (
                                        <option key={specialty} value={specialty}>{specialty}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition-all"
                                >
                                    {locations.map((location) => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                                <select
                                    value={selectedAvailability}
                                    onChange={(e) => setSelectedAvailability(e.target.value)}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition-all"
                                >
                                    {availabilities.map((availability) => (
                                        <option key={availability} value={availability}>{availability}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                                <select
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 transition-all"
                                >
                                    <option value={0}>All</option>
                                    <option value={1}>1+ Star</option>
                                    <option value={2}>2+ Stars</option>
                                    <option value={3}>3+ Stars</option>
                                    <option value={4}>4+ Stars</option>
                                    <option value={5}>5 Stars</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentDoctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 truncate">{doctor.name}</h3>
                                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FiStar
                                            key={index}
                                            className={`${index < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">{doctor.rating}/5</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{doctor.experience} years experience</p>
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <FiMapPin className="mr-1" />
                                    <span>{doctor.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <FiClock className="mr-1" />
                                    <span>{doctor.availability}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-blue-600 font-bold">${doctor.consultationFee}</span>
                                    <button
                                        onClick={() => bookAppointment(doctor)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-l-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 bg-white border-t border-b border-gray-300">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">About MedCare</h3>
                            <p className="text-gray-300">We are committed to providing the best medical care by connecting patients with top-rated doctors and clinics.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQs</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Our Services</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <FiMapPin className="mr-2" />
                                    <span>123 Medical St, Health City, 12345</span>
                                </li>
                                <li className="flex items-center">
                                    <FiPhone className="mr-2" />
                                    <span>+1 (123) 456-7890</span>
                                </li>
                                <li className="flex items-center">
                                    <FiMail className="mr-2" />
                                    <span>contact@medcare.com</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                            <p className="text-gray-300 mb-4">Subscribe to our newsletter for health tips and updates.</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-300">&copy; 2023 MedCare. All rights reserved.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white transition-colors"><FaFacebookF /></a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors"><FaTwitter /></a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors"><FaLinkedinIn /></a>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors"><FaInstagram /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {showModal && selectedDoctor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Appointment Booked!</h2>
                        <p className="mb-4">You have successfully booked an appointment with:</p>
                        <div className="flex items-center mb-4">
                            <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                            <div>
                                <h3 className="font-semibold">{selectedDoctor.name}</h3>
                                <p className="text-gray-600">{selectedDoctor.specialty}</p>
                            </div>
                        </div>
                        <p className="mb-4">We will contact you shortly with further details about your appointment.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalPortal;
