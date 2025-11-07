

"use client";
import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import BackButton from "../component/backbutton";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setSubmitted(true);
      else alert(data.error);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 w-full max-w-5xl px-4 md:px-0">
        <BackButton />
        <h1 className="text-4xl font-bold text-gray-800 flex-1 text-center hover:text-gray-600 transition">
          Contact Us
        </h1>
        <div className="w-24"></div>
      </div>

      <p className="text-center text-gray-600 mb-12 max-w-xl">
        We'd love to hear from you! Share your queries about Indore tourism, hotels, or food.
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6  ">
          <div className="flex items-start space-x-4">
            <MapPin className="text-gray-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p>123 Indore Street, Indore, MP, India</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Phone className="text-gray-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p>+91 12345 67890</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Mail className="text-gray-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p>support@indoretourism.com</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">Instagram</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">Facebook</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition">Twitter</a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-xl shadow-lg space-y-4 border border-gray-200" onSubmit={handleSubmit}>
          {submitted ? (
            <p className="text-green-600 font-semibold text-center text-lg">Thank you! Your message has been sent.</p>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                rows="5"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-700  hover:bg-gray-600  text-white font-semibold py-3 rounded-md flex items-center justify-center space-x-2 transition-shadow shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" /> <span>Send Message</span>
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
