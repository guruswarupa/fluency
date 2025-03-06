"use client";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="pt-20 p-10 bg-white text-gray-900 min-h-screen flex flex-col items-center">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        📞 Contact Us
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg max-w-2xl text-center mb-10"
      >
        Have any questions or feedback? We'd love to hear from you! Connect with
        us and let's create something amazing together. ✨
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col gap-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            📍 Contact Information
          </h2>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-blue-500 text-xl" />
            <span className="text-lg">+9353238992</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-blue-500 text-xl" />
            <span className="text-lg">contact@fluency.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-blue-500 text-xl" />
            <span className="text-lg">Cambridge Institute of Technology</span>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex gap-6 text-2xl">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-600 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col gap-4 bg-gray-100 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">📩 Send Us a Message</h2>
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="p-3 rounded-md bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            required
          ></textarea>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg text-lg font-semibold text-white shadow-lg hover:opacity-90"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}