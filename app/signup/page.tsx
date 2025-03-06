'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState({ message: '', type: '' });
  const { login } = useAuth();
  const router = useRouter();

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    if (!userDetails.email || !userDetails.password || !userDetails.confirmPassword) {
      setValidated(true);
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to sign up');

      setShowToast({ message: 'Sign-up successful!', type: 'success' });
      login(userDetails.email);
      const redirectPath = Cookies.get('redirectPath') || '/dashboard';
      router.push(redirectPath);
      Cookies.remove('redirectPath');
      setUserDetails({ email: '', password: '', confirmPassword: '' });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-blue-100 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a365d] drop-shadow-lg">
          Unlock Your Language Learning Journey
        </h1>
        <p className="text-md md:text-lg text-gray-700 mt-2">Join Fluency to speak, understand, and immerse yourself in a new language.</p>
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#1a365d] mb-5">
              Master New Languages, Anytime, Anywhere
            </h2>
            <ul className="space-y-4 text-gray-800">
              {[
                "Interactive Lessons for All Levels",
                "Real-time Conversations with Native Speakers",
                "Customizable Learning Paths",
              ].map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-sm md:text-md font-medium flex items-center"
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" /> {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border-t-4 border-blue-600">
            <form className="space-y-4">
              <div className="relative">
                <label className="block text-left text-gray-700 font-semibold text-xs mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={handleUserDetailsChange}
                  className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black text-sm ${validated && !userDetails.email ? 'border-red-500' : ''}`}
                />
                {validated && !userDetails.email && <p className="text-red-400 text-sm mt-1">Please provide your email.</p>}
              </div>

              <div className="relative">
                <label className="block text-left text-gray-700 font-semibold text-xs mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={userDetails.password}
                  onChange={handleUserDetailsChange}
                  className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black text-sm ${validated && !userDetails.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-8 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-left text-gray-700 font-semibold text-xs mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={userDetails.confirmPassword}
                  onChange={handleUserDetailsChange}
                  className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black text-sm ${validated && !userDetails.confirmPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-8 text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-sm"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </motion.button>
            </form>

            {errorMessage && <div className="mt-4 text-sm text-red-400"><p>{errorMessage}</p></div>}
          </div>
        </motion.div>
      </div>

      {showToast.message && (
        <div
          className={`fixed bottom-4 right-4 text-white text-sm py-2 px-4 rounded-md shadow-md ${showToast.type === 'success' ? 'bg-blue-600' : 'bg-red-600'}`}
          role="alert"
        >
          {showToast.message}
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
