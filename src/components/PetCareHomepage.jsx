import React, { useState, useEffect } from "react";
import { FiStar, FiMapPin, FiClock, FiPhone, FiMail, FiCalendar } from "react-icons/fi";
import { FaStethoscope, FaGraduationCap, FaLanguage, FaShieldAlt, FaPaw, FaClinicMedical, FaPills, FaPercent, FaGift, FaAd } from "react-icons/fa";

const PetCareHomepage = () => {
    const [doctor, setDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const data = await response.json();
            setDoctor({
                ...data,
                specialty: "Bác sĩ thú y",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                rating: 4.8,
                experience: 15,
                location: "Thành phố Hồ Chí Minh",
                availability: ["Sáng", "Chiều"],
                consultationFee: 150,
                bio: "Bác sĩ Nguyễn Văn A là một bác sĩ thú y có kỹ năng cao với hơn 15 năm kinh nghiệm trong việc chẩn đoán và điều trị các tình trạng của thú cưng. Anh ấy nổi tiếng với sự chăm sóc đầy lòng trắc ẩn và chuyên môn trong các phương pháp điều trị thú y mới nhất.",
                education: ["Tiến sĩ Thú y từ Đại học Nông nghiệp Việt Nam", "Thực tập tại Trung tâm Y tế Động vật, New York"],
                languages: ["Tiếng Việt", "Tiếng Anh"],
                insuranceAccepted: ["Bảo hiểm Thú cưng A", "Bảo hiểm Thú cưng B", "Bảo hiểm Thú cưng C"],
                services: ["Kiểm tra tổng quát", "Tiêm phòng", "Phẫu thuật", "Chăm sóc răng miệng"]
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
            alert("Vui lòng chọn cả ngày và giờ cho cuộc hẹn.");
        }
    };

    const petProducts = [
        { name: "Thức ăn cao cấp cho thú cưng", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", price: 29.99, discount: 20 },
        { name: "Giường thú cưng thoải mái", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80", price: 49.99, discount: 15 },
        { name: "Đồ chơi tương tác cho thú cưng", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", price: 19.99, discount: 10 },
    ];

    const petServices = [
        { name: "Cắt tỉa lông", icon: <FaPaw />, description: "Dịch vụ cắt tỉa lông chuyên nghiệp", discount: 25 },
        { name: "Trông giữ thú cưng", icon: <FaClinicMedical />, description: "Cơ sở trông giữ thú cưng an toàn và thoải mái", discount: 20 },
        { name: "Huấn luyện", icon: <FaGraduationCap />, description: "Các buổi huấn luyện thú cưng chuyên nghiệp", discount: 30 },
    ];

    const petMedications = [
        { name: "Thuốc phòng chống bọ chét & ve", image: "https://images.unsplash.com/photo-1626465889435-c74d8ec8e33e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", price: 39.99, discount: 15 },
        { name: "Thuốc bổ khớp", image: "https://images.unsplash.com/photo-1631376557281-2acea60d5cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", price: 24.99, discount: 10 },
        { name: "Thuốc an thần", image: "https://images.unsplash.com/photo-1622227922682-56c92e523e58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", price: 29.99, discount: 20 },
    ];

    const promotions = [
        { title: "Khuyến mãi mùa hè", description: "Giảm giá 30% cho tất cả các dịch vụ trong tháng 6", image: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
        { title: "Gói chăm sóc toàn diện", description: "Tiết kiệm 20% khi đặt gói chăm sóc toàn diện cho thú cưng", image: "https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" },
        { title: "Giới thiệu bạn bè", description: "Nhận voucher 50% cho lần khám tiếp theo khi giới thiệu bạn bè", image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1586&q=80" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-12">Chào mừng đến với Trung tâm Chăm sóc Thú cưng</h1>

            {/* Promotions */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center"><FaGift className="mr-2 text-red-500" /> Khuyến mãi Đặc biệt</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {promotions.map((promo, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                                <p className="text-gray-600">{promo.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center"><FaAd className="mr-2 text-blue-500" /> Sản phẩm Nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {petProducts.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-600 line-through">${product.price.toFixed(2)}</p>
                                    <p className="text-red-600 font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                                </div>
                                <p className="text-green-600 font-semibold mb-2">Giảm {product.discount}%</p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors w-full">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Doctor */}
            {doctor && (
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center"><FaStethoscope className="mr-2 text-green-500" /> Bác sĩ Thú y Nổi bật</h2>
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
                                <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
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
                                <p className="text-gray-700 mb-6">{doctor.bio}</p>
                                <button
                                    onClick={() => document.getElementById("booking-section").scrollIntoView({ behavior: "smooth" })}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                                >
                                    Đặt lịch hẹn
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Pet Services */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center"><FaPaw className="mr-2 text-purple-500" /> Dịch vụ Thú cưng</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {petServices.map((service, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="text-4xl text-blue-600 mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <p className="text-green-600 font-semibold">Giảm giá {service.discount}%</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pet Medications */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center"><FaPills className="mr-2 text-red-500" /> Thuốc cho Thú cưng</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {petMedications.map((medication, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <img src={medication.image} alt={medication.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{medication.name}</h3>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-600 line-through">${medication.price.toFixed(2)}</p>
                                    <p className="text-red-600 font-bold">${(medication.price * (1 - medication.discount / 100)).toFixed(2)}</p>
                                </div>
                                <p className="text-green-600 font-semibold mb-2">Giảm {medication.discount}%</p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors w-full">Thêm vào giỏ hàng</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Booking Section */}
            <div id="booking-section" className="mt-12 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Đặt lịch hẹn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="date" className="block text-gray-700 mb-2">Chọn ngày</label>
                        <input
                            type="date"
                            id="date"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={handleDateChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-gray-700 mb-2">Chọn giờ</label>
                        <select
                            id="time"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={handleTimeChange}
                        >
                            <option value="">Chọn khung giờ</option>
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
                    Xác nhận đặt lịch
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Đã xác nhận lịch hẹn!</h2>
                        <p className="mb-4">Lịch hẹn của bạn với Bác sĩ {doctor.name} đã được đặt vào:</p>
                        <p className="font-bold mb-4">{selectedDate} lúc {selectedTime}</p>
                        <p className="mb-6">Chúng tôi sẽ gửi email xác nhận với các chi tiết thêm.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors w-full"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetCareHomepage;
