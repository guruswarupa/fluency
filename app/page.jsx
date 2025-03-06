"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white overflow-x-hidden relative">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <Image
          src="/assets/language-hero.png"
          alt="Language Learning Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 bg-white bg-opacity-60 p-12 rounded-xl shadow-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#1a365d]">
            Master Any Language with AI
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl mt-4 text-[#1a365d]"
          >
            Learn faster with AI-driven exercises, conversations, and
            personalized guidance.
          </motion.p>
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={() => scrollToSection("signup")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-lg hover:scale-105 transition-transform"
            >
              Start Learning for Free
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg hover:bg-blue-50 hover:scale-105 transition-all"
            >
              Explore Features
            </button>
          </div>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-gray-100 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#1a365d]"
        >
          Key Features
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          Unlock your language potential with cutting-edge AI tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-6">
          {[
            {
              title: "AI-Powered Conversations",
              desc: "Practice real-world scenarios with an intelligent chatbot.",
            },
            {
              title: "Personalized Exercises",
              desc: "Tailored grammar, vocabulary, and pronunciation drills.",
            },
            {
              title: "Speech Recognition",
              desc: "Improve your accent with real-time feedback.",
            },
            {
              title: "Cultural Insights",
              desc: "Learn language nuances and cultural contexts.",
            },
            {
              title: "Progress Tracking",
              desc: "Visualize your learning journey with detailed analytics.",
            },
            {
              title: "Multi-Language Support",
              desc: "Learn Spanish, French, Mandarin, and more—all in one platform.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#1a365d]">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 text-center">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#1a365d]"
        >
          How It Works
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          Three simple steps to fluency.
        </p>
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          {[
            "Sign Up & Choose Your Language",
            "Practice with AI Conversations",
            "Track Progress & Master Fluency",
          ].map((step, index) => (
            <motion.div
              key={index}
              className="p-8 bg-blue-100 shadow-lg rounded-lg w-full md:w-1/3 hover:scale-105 transition-transform"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-blue-800">
                Step {index + 1}
              </h3>
              <p className="text-gray-700 mt-2">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50 text-center">
        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#1a365d]"
        >
          Who We Help
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          From beginners to advanced learners, we’ve got you covered.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-6">
          {[
            {
              title: "Travel Enthusiasts",
              desc: "Speak confidently while exploring new countries.",
            },
            {
              title: "Students & Professionals",
              desc: "Boost your career with multilingual skills.",
            },
            {
              title: "Language Hobbyists",
              desc: "Learn for fun with engaging AI tools.",
            },
          ].map((useCase, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#1a365d]">
                {useCase.title}
              </h3>
              <p className="text-gray-600 mt-2">{useCase.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 text-center px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#1a365d]"
        >
          Why Choose Us?
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          Compare and see the difference.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto text-left">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4">Feature</th>
                <th className="p-4">Us</th>
                <th className="p-4">Others</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "AI Conversations", us: "✓", others: "✗" },
                { feature: "Speech Feedback", us: "✓", others: "✗" },
                { feature: "Cultural Insights", us: "✓", others: "✗" },
                { feature: "Personalized Learning", us: "✓", others: "✓" },
              ].map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="border-b"
                >
                  <td className="p-4 text-gray-700">{row.feature}</td>
                  <td className="p-4 text-green-600 font-bold">{row.us}</td>
                  <td className="p-4 text-red-600">{row.others}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Behind the Scenes: AI Tech */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Powered by Advanced AI Technology
        </motion.h2>
        <p className="text-lg text-gray-300 mt-4">
          Cutting-edge tech to accelerate your learning.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg"
        >
          <p className="text-gray-200">
            Our platform uses state-of-the-art AI to simulate real
            conversations, provide instant feedback, and personalize your
            learning experience. Speak, learn, and grow with confidence.
          </p>
          <button
            onClick={() => scrollToSection("signup")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Start Your Language Journey Now
          </button>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 text-center px-6">
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#1a365d]"
        >
          What Learners Say
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          Real stories from real users.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            "I’m speaking Spanish fluently after just 3 months!",
            "The AI conversations feel so real—it’s like having a tutor 24/7!",
            "Finally, a tool that makes learning fun and effective.",
          ].map((quote, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-lg text-gray-700">“{quote}”</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 text-center px-6 bg-gray-100">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#1a365d]"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4">
          Got questions? We’ve got answers.
        </p>
        <div className="mt-10 w-full md:w-4/5 mx-auto">
          {[
            {
              q: "How does the AI help me learn?",
              a: "Our AI simulates real conversations, corrects your speech, and tailors exercises to your level.",
            },
            {
              q: "Is it free to use?",
              a: "Yes! We offer a free tier with core features. Premium plans unlock advanced tools.",
            },
            {
              q: "Which languages can I learn?",
              a: "We support Spanish, French, Mandarin, German, and many more.",
            },
            {
              q: "How secure is my data?",
              a: "We prioritize privacy with end-to-end encryption and strict data policies.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <details className="group">
                <summary className="p-4 text-left text-lg font-semibold text-[#1a365d] cursor-pointer hover:bg-blue-50 transition-colors">
                  {faq.q}
                </summary>
                <p className="p-4 text-gray-700 text-left">{faq.a}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section
        id="signup"
        className="py-20 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-tight"
        >
          Start Speaking a New Language Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mt-4 max-w-2xl mx-auto"
        >
          Transform your language skills with AI-driven conversations and
          personalized exercises. Begin now.
        </motion.p>
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full text-lg shadow-lg hover:bg-opacity-90 transition-all"
        >
          Begin Your Journey
        </motion.button>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          ↑ Top
        </motion.button>
      )}
    </div>
  );
}