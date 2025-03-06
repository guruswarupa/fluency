'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const { userEmail, login } = useAuth();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState({ message: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userEmail) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        email: userEmail,
      }));
    }
  }, [userEmail]);

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!userDetails.email || !userDetails.password) {
      setValidated(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to log in');

      setShowToast({ message: 'Login successful!', type: 'success' });
      login(userDetails.email);
      const redirectPath = Cookies.get('redirectPath') || '/dashboard';
      router.push(redirectPath);
      Cookies.remove('redirectPath');
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
          Log In to Fluency
        </h1>
        <p className="text-md md:text-lg text-gray-700 mt-2">Access your language learning journey</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-600"
      >
        <form className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-sm"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </motion.button>
        </form>

        {errorMessage && <div className="mt-4 text-sm text-red-400"><p>{errorMessage}</p></div>}
      </motion.div>

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

export default LoginPage;
