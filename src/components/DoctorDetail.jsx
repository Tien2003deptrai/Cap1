import React, { useState, useEffect } from "react";
import { FiStar, FiMapPin, FiClock, FiPhone, FiMail, FiCalendar } from "react-icons/fi";
import { FaStethoscope, FaGraduationCap, FaLanguage, FaShieldAlt } from "react-icons/fa";

const DoctorDetail = () => {
    const [doctor, setDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Simulating API call to fetch doctor details
        const fetchDoctorDetails = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const data = await response.json();
            setDoctor({
                ...data,
                specialty: "Cardiologist",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                rating: 4.8,
                experience: 15,
                location: "New York",
                availability: ["Morning", "Afternoon"],
                consultationFee: 150,
                bio: "Dr. Jane Doe is a highly skilled cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She is known for her compassionate care and expertise in the latest cardiac treatments.",
                education: ["MD from Harvard Medical School", "Residency at Johns Hopkins Hospital"],
                languages: ["English", "Spanish"],
                insuranceAccepted: ["Medicare", "Blue Cross", "Aetna"],
                services: ["Echocardiography", "Stress Testing", "Cardiac Catheterization", "Preventive Cardiology"]
            });
        };
        fetchDoctorDetails();
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleBookAppointment = () => {
        if (selectedDate && selectedTime) {
            setShowModal(true);
        } else {
            alert("Please select both date and time for the appointment.");
        }
    };

    if (!doctor) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-64 object-cover md:h-full"
                        />
                    </div>
                    <div className="md:w-2/3 p-6">
                        <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                        <p className="text-xl text-gray-600 mb-4">{doctor.specialty}</p>
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, index) => (
                                <FiStar
                                    key={index}
                                    className={`${index < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"} w-5 h-5`}
                                />
                            ))}
                            <span className="ml-2 text-gray-600">{doctor.rating}/5</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <FaStethoscope className="text-blue-600 mr-2" />
                                <span>{doctor.experience} years experience</span>
                            </div>
                            <div className="flex items-center">
                                <FiMapPin className="text-blue-600 mr-2" />
                                <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center">
                                <FiClock className="text-blue-600 mr-2" />
                                <span>{doctor.availability.join(" & ")}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-600 font-bold">${doctor.consultationFee}</span>
                                <span className="ml-1">per consultation</span>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-6">{doctor.bio}</p>
                        <button
                            onClick={() => document.getElementById("booking-section").scrollIntoView({ behavior: "smooth" })}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Education & Qualifications</h2>
                    <ul className="space-y-2">
                        {doctor.education.map((edu, index) => (
                            <li key={index} className="flex items-center">
                                <FaGraduationCap className="text-blue-600 mr-2" />
                                <span>{edu}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Languages</h2>
                    <ul className="space-y-2">
                        {doctor.languages.map((lang, index) => (
                            <li key={index} className="flex items-center">
                                <FaLanguage className="text-blue-600 mr-2" />
                                <span>{lang}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Insurance Accepted</h2>
                <div className="flex flex-wrap gap-2">
                    {doctor.insuranceAccepted.map((insurance, index) => (
                        <span
                            key={index}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                            {insurance}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Services Offered</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                    {doctor.services.map((service, index) => (
                        <li key={index} className="flex items-center bg-gray-100 p-3 rounded">
                            <FaStethoscope className="text-blue-600 mr-2" />
                            <span>{service}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="booking-section" className="mt-12 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-gray-700 mb-2">Select Date</label>
                        <input
                            type="date"
                            id="date"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={handleDateChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-gray-700 mb-2">Select Time</label>
                        <select
                            id="time"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={handleTimeChange}
                        >
                            <option value="">Choose a time slot</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="15:00">03:00 PM</option>
                            <option value="16:00">04:00 PM</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleBookAppointment}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors w-full"
                >
                    Confirm Booking
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Appointment Confirmed!</h2>
                        <p className="mb-4">Your appointment with Dr. {doctor.name} has been booked for:</p>
                        <p className="font-bold mb-4">{selectedDate} at {selectedTime}</p>
                        <p className="mb-6">We will send you a confirmation email with further details.</p>
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

export default DoctorDetail;
