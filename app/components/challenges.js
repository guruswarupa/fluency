"use client"; // ✅ Mark as a client component

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // ✅ For dashboard navigation

// ✅ Button Component
function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

// ✅ Updated Challenges with target language clarity
const challenges = {
  English: [
    {
      type: "translate",
      question: "Translate to Spanish: The cat is on the roof.",
      answer: "El gato está en el tejado.",
      difficulty: "easy",
    },
    {
      type: "fill",
      question: "Fill in the blank: She ____ to the store yesterday.",
      answer: "went",
      difficulty: "easy",
    },
    {
      type: "rearrange",
      question: "Rearrange: best - the - is - learning - fun",
      answer: "The best learning is fun",
      difficulty: "medium",
    },
    {
      type: "translate",
      question: "Translate to German: The weather is beautiful today.",
      answer: "Das Wetter ist heute schön.",
      difficulty: "hard",
    },
    {
      type: "fill",
      question:
        "Fill in the blank: If I ___ (to be) rich, I would travel the world.",
      answer: "were",
      difficulty: "hard",
    },
  ],
  German: [
    {
      type: "translate",
      question: "Translate to English: Ich liebe Sprachen lernen.",
      answer: "I love to learn languages.",
      difficulty: "easy",
    },
    {
      type: "fill",
      question: "Fill in the blank: Ich ___ Fußball spielen.",
      answer: "mag",
      difficulty: "easy",
    },
    {
      type: "rearrange",
      question: "Rearrange: wunderbar - eine - Stadt - ist - Berlin",
      answer: "Berlin ist eine wunderbar Stadt",
      difficulty: "medium",
    },
    {
      type: "translate",
      question: "Translate to French: Die Aussicht von hier ist atemberaubend.",
      answer: "La vue d'ici est époustouflante.",
      difficulty: "hard",
    },
    {
      type: "fill",
      question: "Fill in the blank: Er ___ (haben) gestern ein Buch gelesen.",
      answer: "hat",
      difficulty: "hard",
    },
  ],
  Spanish: [
    {
      type: "translate",
      question: "Translate to French: Me gusta aprender idiomas.",
      answer: "J'aime apprendre les langues.",
      difficulty: "easy",
    },
    {
      type: "fill",
      question: "Fill in the blank: Ella ____ a la escuela temprano.",
      answer: "va",
      difficulty: "easy",
    },
    {
      type: "rearrange",
      question: "Rearrange: divertido - aprender - es - español",
      answer: "Aprender español es divertido",
      difficulty: "medium",
    },
    {
      type: "translate",
      question:
        "Translate to English: La vida es un misterio que hay que vivir.",
      answer: "Life is a mystery that must be lived.",
      difficulty: "hard",
    },
    {
      type: "fill",
      question:
        "Fill in the blank: Si yo ___ (tener) tiempo, aprendería más idiomas.",
      answer: "tuviera",
      difficulty: "hard",
    },
  ],
  French: [
    {
      type: "translate",
      question: "Translate to English: J'adore apprendre les langues.",
      answer: "I love to learn languages.",
      difficulty: "easy",
    },
    {
      type: "fill",
      question: "Fill in the blank: Nous ____ au cinéma hier soir.",
      answer: "sommes allés",
      difficulty: "easy",
    },
    {
      type: "rearrange",
      question: "Rearrange: français - le - est - intéressant",
      answer: "Le français est intéressant",
      difficulty: "medium",
    },
    {
      type: "translate",
      question: "Translate to Spanish: La vie est pleine de surprises.",
      answer: "La vida está llena de sorpresas.",
      difficulty: "hard",
    },
    {
      type: "fill",
      question:
        "Fill in the blank: Si j’___ (avoir) plus de temps, je voyagerais.",
      answer: "avais",
      difficulty: "hard",
    },
  ],
};

export default function LanguageChallenges() {
  const [selectedLang, setSelectedLang] = useState("English");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const router = useRouter(); // For navigating to the dashboard

  const currentChallenge = challenges[selectedLang][challengeIndex];

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === currentChallenge.answer.toLowerCase()) {
      setScore(
        score +
          (currentChallenge.difficulty === "easy"
            ? 10
            : currentChallenge.difficulty === "medium"
            ? 20
            : 30)
      );
      setFeedback("🎉 Correct! Well done!");
    } else {
      setFeedback(
        `❌ Incorrect. The correct answer is: "${currentChallenge.answer}"`
      );
    }
    setUserAnswer("");
  };

  const nextChallenge = () => {
    setChallengeIndex((prev) => (prev + 1) % challenges[selectedLang].length);
    setFeedback("");
    setUserAnswer("");
  };

  // Handle language selection without routing
  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
    setChallengeIndex(0);
    setFeedback("");
    setUserAnswer("");
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 p-8 pt-20">
      <div className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-lg p-8 text-center">
        <h2 className="text-3xl font-extrabold mb-6">🌍 Language Challenges</h2>

        {/* Score Display */}
        <div className="mb-4 text-lg font-semibold">
          Score: <span className="text-green-400">{score}</span>
        </div>

        {/* Language Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {Object.keys(challenges).map((lang) => (
            <Button
              key={lang}
              onClick={() => handleLanguageSelect(lang)}
              className={`px-4 py-2 rounded-lg text-white transition-all ${
                selectedLang === lang
                  ? "bg-blue-600 hover:bg-blue-700 shadow-md"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {lang}
            </Button>
          ))}
        </div>

        {/* Challenge Display */}
        <motion.div
          key={challengeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-semibold mb-6 p-4 bg-gray-700 rounded-lg shadow-md"
        >
          <p className="mb-2">[Difficulty: {currentChallenge.difficulty}]</p>
          <p>{currentChallenge.question}</p>
          <p className="text-sm text-gray-400 mt-2">
            Translate or answer in the language specified.
          </p>
        </motion.div>

        {/* User Input */}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-3 mb-4 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black bg-white"
        />

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`mb-4 p-2 rounded-lg ${
                feedback.includes("Correct") ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Submit Answer
          </Button>
          <Button
            onClick={nextChallenge}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Next Challenge ➡
          </Button>
        </div>

        {/* Back to Dashboard Button */}
        <div className="mt-6">
          <Button
            onClick={goToDashboard}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
