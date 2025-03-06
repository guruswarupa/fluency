"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// LanguageExercises Component
function LanguageExercises({ progress, setProgress, streak, setStreak }) {
  const [languages] = useState(["English", "German", "French"]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubLevel, setSelectedSubLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [vocabReview, setVocabReview] = useState([]);

  const quizData = {
    English: {
      Beginner: {
        Level1: [
          {
            question: "Translate 'Hello' to Spanish",
            options: ["Hola", "Bonjour", "Hallo"],
            answer: "Hola",
            explanation: "In Spanish, 'Hello' translates to 'Hola'.",
            vocab: { word: "Hello", translation: "Hola", language: "Spanish" },
          },
          {
            question: "What is the opposite of 'hot'?",
            options: ["Cold", "Warm", "Cool"],
            answer: "Cold",
            explanation: "'Cold' is the opposite of 'Hot' in English.",
            vocab: {
              word: "Hot",
              translation: "Cold (opposite)",
              language: "English",
            },
          },
          {
            question: "What is the plural of 'child'?",
            options: ["Childs", "Children", "Childes"],
            answer: "Children",
            explanation: "The plural of 'child' in English is 'children'.",
            vocab: {
              word: "Child",
              translation: "Children (plural)",
              language: "English",
            },
          },
          {
            question: "Which word means 'small'?",
            options: ["Big", "Tiny", "Large"],
            answer: "Tiny",
            explanation: "'Tiny' means 'small' in English.",
            vocab: { word: "Tiny", translation: "Small", language: "English" },
          },
          {
            question: "What is the past tense of 'run'?",
            options: ["Runned", "Ran", "Running"],
            answer: "Ran",
            explanation: "The past tense of 'run' is 'ran'.",
            vocab: {
              word: "Run",
              translation: "Ran (past)",
              language: "English",
            },
          },
        ],
        Level2: [
          {
            question: "What is the plural form of 'cat'?",
            options: ["Cats", "Cat", "Cates"],
            answer: "Cats",
            explanation: "In English, the plural of 'cat' is 'cats'.",
            vocab: {
              word: "Cat",
              translation: "Cats (plural)",
              language: "English",
            },
          },
          {
            question: "Which word means 'happy'?",
            options: ["Sad", "Joyful", "Angry"],
            answer: "Joyful",
            explanation: "'Joyful' means 'happy' in English.",
            vocab: {
              word: "Joyful",
              translation: "Happy",
              language: "English",
            },
          },
          {
            question: "What is the opposite of 'fast'?",
            options: ["Slow", "Quick", "Rapid"],
            answer: "Slow",
            explanation: "'Slow' is the opposite of 'fast' in English.",
            vocab: {
              word: "Fast",
              translation: "Slow (opposite)",
              language: "English",
            },
          },
          {
            question: "What is the past tense of 'eat'?",
            options: ["Eated", "Ate", "Eaten"],
            answer: "Ate",
            explanation: "The past tense of 'eat' is 'ate'.",
            vocab: {
              word: "Eat",
              translation: "Ate (past)",
              language: "English",
            },
          },
          {
            question: "Which word means 'pretty'?",
            options: ["Ugly", "Beautiful", "Plain"],
            answer: "Beautiful",
            explanation: "'Beautiful' means 'pretty' in English.",
            vocab: {
              word: "Beautiful",
              translation: "Pretty",
              language: "English",
            },
          },
        ],
        Level3: [
          {
            question: "What is the past tense of 'go'?",
            options: ["Goed", "Gone", "Went"],
            answer: "Went",
            explanation: "The past tense of 'go' is 'went'.",
            vocab: {
              word: "Go",
              translation: "Went (past)",
              language: "English",
            },
          },
          {
            question: "What is the plural of 'dog'?",
            options: ["Doges", "Dogs", "Dog"],
            answer: "Dogs",
            explanation: "The plural of 'dog' in English is 'dogs'.",
            vocab: {
              word: "Dog",
              translation: "Dogs (plural)",
              language: "English",
            },
          },
          {
            question: "What is the opposite of 'big'?",
            options: ["Small", "Large", "Huge"],
            answer: "Small",
            explanation: "'Small' is the opposite of 'big' in English.",
            vocab: {
              word: "Big",
              translation: "Small (opposite)",
              language: "English",
            },
          },
          {
            question: "Which word means 'tall'?",
            options: ["Short", "High", "Low"],
            answer: "High",
            explanation: "'High' can mean 'tall' in English.",
            vocab: { word: "High", translation: "Tall", language: "English" },
          },
          {
            question: "What is the past tense of 'see'?",
            options: ["Seed", "Saw", "Seen"],
            answer: "Saw",
            explanation: "The past tense of 'see' is 'saw'.",
            vocab: {
              word: "See",
              translation: "Saw (past)",
              language: "English",
            },
          },
        ],
      },
      Intermediate: {
        Level1: [
          {
            question: "Which word means the same as 'difficult'?",
            options: ["Easy", "Hard", "Simple"],
            answer: "Hard",
            explanation: "'Hard' is a synonym for 'difficult'.",
            vocab: {
              word: "Hard",
              translation: "Difficult",
              language: "English",
            },
          },
          {
            question:
              "Choose the correct preposition: 'I am good ___ singing.'",
            options: ["At", "In", "On"],
            answer: "At",
            explanation: "The correct phrase is 'good at singing'.",
            vocab: {
              word: "Good at",
              translation: "Skilled in",
              language: "English",
            },
          },
          {
            question: "What is the comparative form of 'good'?",
            options: ["Gooder", "Better", "Best"],
            answer: "Better",
            explanation: "The comparative form of 'good' is 'better'.",
            vocab: {
              word: "Good",
              translation: "Better (comparative)",
              language: "English",
            },
          },
          {
            question: "Which sentence is correct?",
            options: [
              "She go to school.",
              "She goes to school.",
              "She going to school.",
            ],
            answer: "She goes to school.",
            explanation: "'She goes to school.' is grammatically correct.",
            vocab: {
              word: "Goes",
              translation: "Third person singular of go",
              language: "English",
            },
          },
          {
            question: "What is the superlative form of 'bad'?",
            options: ["Worse", "Worst", "Badder"],
            answer: "Worst",
            explanation: "The superlative form of 'bad' is 'worst'.",
            vocab: {
              word: "Bad",
              translation: "Worst (superlative)",
              language: "English",
            },
          },
        ],
        Level2: [
          {
            question: "What is the comparative form of 'big'?",
            options: ["Biggest", "Bigger", "Bigly"],
            answer: "Bigger",
            explanation: "The comparative form of 'big' is 'bigger'.",
            vocab: {
              word: "Big",
              translation: "Bigger (comparative)",
              language: "English",
            },
          },
          {
            question: "Which sentence is correct?",
            options: [
              "She don't like it.",
              "She doesn't likes it.",
              "She doesn't like it.",
            ],
            answer: "She doesn't like it.",
            explanation: "'She doesn't like it' is grammatically correct.",
            vocab: {
              word: "Doesn't",
              translation: "Does not",
              language: "English",
            },
          },
          {
            question: "What does 'vivid' mean?",
            options: ["Dull", "Bright", "Faint"],
            answer: "Bright",
            explanation: "'Vivid' means bright or intense.",
            vocab: {
              word: "Vivid",
              translation: "Bright",
              language: "English",
            },
          },
          {
            question:
              "Choose the correct word: 'I ___ to the store yesterday.'",
            options: ["Go", "Went", "Gone"],
            answer: "Went",
            explanation: "The correct past tense is 'went'.",
            vocab: {
              word: "Went",
              translation: "Past tense of go",
              language: "English",
            },
          },
          {
            question: "What is the opposite of 'narrow'?",
            options: ["Wide", "Slim", "Thin"],
            answer: "Wide",
            explanation: "'Wide' is the opposite of 'narrow'.",
            vocab: {
              word: "Narrow",
              translation: "Wide (opposite)",
              language: "English",
            },
          },
        ],
        Level3: [
          {
            question: "What does 'benevolent' mean?",
            options: ["Kind", "Angry", "Sad"],
            answer: "Kind",
            explanation: "'Benevolent' means kind or generous.",
            vocab: {
              word: "Benevolent",
              translation: "Kind",
              language: "English",
            },
          },
          {
            question:
              "Choose the correct verb form: 'He ___ to school every day.'",
            options: ["Go", "Goes", "Going"],
            answer: "Goes",
            explanation:
              "The correct form is 'goes' for third person singular.",
            vocab: {
              word: "Goes",
              translation: "Third person singular of go",
              language: "English",
            },
          },
          {
            question: "What is the past participle of 'write'?",
            options: ["Writed", "Wrote", "Written"],
            answer: "Written",
            explanation: "The past participle of 'write' is 'written'.",
            vocab: {
              word: "Write",
              translation: "Written (past participle)",
              language: "English",
            },
          },
          {
            question: "What does 'ambiguous' mean?",
            options: ["Clear", "Uncertain", "Simple"],
            answer: "Uncertain",
            explanation: "'Ambiguous' means unclear or uncertain.",
            vocab: {
              word: "Ambiguous",
              translation: "Uncertain",
              language: "English",
            },
          },
          {
            question:
              "Choose the correct preposition: 'She is interested ___ learning.'",
            options: ["In", "On", "At"],
            answer: "In",
            explanation: "The correct phrase is 'interested in learning'.",
            vocab: {
              word: "Interested in",
              translation: "Curious about",
              language: "English",
            },
          },
        ],
      },
      Advanced: {
        Level1: [
          {
            question: "Identify the passive voice sentence.",
            options: [
              "She wrote a book.",
              "A book was written by her.",
              "She is writing a book.",
            ],
            answer: "A book was written by her.",
            explanation:
              "Passive voice focuses on the object receiving the action.",
            vocab: {
              word: "Passive voice",
              translation: "Action done to subject",
              language: "English",
            },
          },
          {
            question:
              "What is the subjunctive form: 'I suggest that he ___ on time.'",
            options: ["Is", "Be", "Was"],
            answer: "Be",
            explanation:
              "The subjunctive mood uses 'be' for hypothetical situations.",
            vocab: {
              word: "Subjunctive",
              translation: "Hypothetical mood",
              language: "English",
            },
          },
          {
            question: "What does 'ubiquitous' mean?",
            options: ["Rare", "Everywhere", "Hidden"],
            answer: "Everywhere",
            explanation: "'Ubiquitous' means present everywhere.",
            vocab: {
              word: "Ubiquitous",
              translation: "Everywhere",
              language: "English",
            },
          },
          {
            question:
              "Choose the correct word: 'The ___ of the situation was evident.'",
            options: ["Complexity", "Simple", "Easy"],
            answer: "Complexity",
            explanation: "'Complexity' fits the context of the sentence.",
            vocab: {
              word: "Complexity",
              translation: "Intricacy",
              language: "English",
            },
          },
          {
            question: "What is the opposite of 'meticulous'?",
            options: ["Careful", "Sloppy", "Detailed"],
            answer: "Sloppy",
            explanation:
              "'Meticulous' means careful; 'sloppy' is the opposite.",
            vocab: {
              word: "Meticulous",
              translation: "Sloppy (opposite)",
              language: "English",
            },
          },
        ],
        Level2: [
          {
            question: "Which word is an antonym of 'ephemeral'?",
            options: ["Temporary", "Lasting", "Brief"],
            answer: "Lasting",
            explanation:
              "'Ephemeral' means short-lived; 'lasting' is the opposite.",
            vocab: {
              word: "Ephemeral",
              translation: "Lasting (opposite)",
              language: "English",
            },
          },
          {
            question:
              "Identify the correct indirect speech: She said, 'I am tired.'",
            options: [
              "She said that she was tired.",
              "She said that she is tired.",
              "She says she was tired.",
            ],
            answer: "She said that she was tired.",
            explanation:
              "In indirect speech, the tense shifts to past ('was').",
            vocab: {
              word: "Indirect speech",
              translation: "Reported speech",
              language: "English",
            },
          },
          {
            question: "What does 'pragmatic' mean?",
            options: ["Idealistic", "Practical", "Dreamy"],
            answer: "Practical",
            explanation: "'Pragmatic' means practical and realistic.",
            vocab: {
              word: "Pragmatic",
              translation: "Practical",
              language: "English",
            },
          },
          {
            question: "Choose the correct word: 'His argument was very ___.'",
            options: ["Convincing", "Weak", "Boring"],
            answer: "Convincing",
            explanation: "'Convincing' means persuasive and fits here.",
            vocab: {
              word: "Convincing",
              translation: "Persuasive",
              language: "English",
            },
          },
          {
            question: "What is the past participle of 'drink'?",
            options: ["Drinked", "Drank", "Drunk"],
            answer: "Drunk",
            explanation: "The past participle of 'drink' is 'drunk'.",
            vocab: {
              word: "Drink",
              translation: "Drunk (past participle)",
              language: "English",
            },
          },
        ],
        Level3: [
          {
            question: "What does 'ameliorate' mean?",
            options: ["Worsen", "Improve", "Ignore"],
            answer: "Improve",
            explanation:
              "'Ameliorate' means to make something better or improve it.",
            vocab: {
              word: "Ameliorate",
              translation: "Improve",
              language: "English",
            },
          },
          {
            question: "Choose the correct word: 'Her speech was very ___.'",
            options: ["Eloquent", "Boring", "Quiet"],
            answer: "Eloquent",
            explanation:
              "'Eloquent' means well-spoken and is appropriate here.",
            vocab: {
              word: "Eloquent",
              translation: "Well-spoken",
              language: "English",
            },
          },
          {
            question: "What does 'fortuitous' mean?",
            options: ["Planned", "Accidental", "Deliberate"],
            answer: "Accidental",
            explanation: "'Fortuitous' means happening by chance.",
            vocab: {
              word: "Fortuitous",
              translation: "Accidental",
              language: "English",
            },
          },
          {
            question:
              "Identify the correct conditional: 'If I ___ rich, I would travel.'",
            options: ["Am", "Were", "Was"],
            answer: "Were",
            explanation:
              "The subjunctive 'were' is used for hypothetical scenarios.",
            vocab: {
              word: "Were",
              translation: "Subjunctive form",
              language: "English",
            },
          },
          {
            question: "What is the opposite of 'verbose'?",
            options: ["Wordy", "Concise", "Long"],
            answer: "Concise",
            explanation: "'Verbose' means wordy; 'concise' is the opposite.",
            vocab: {
              word: "Verbose",
              translation: "Concise (opposite)",
              language: "English",
            },
          },
        ],
      },
    },
    German: {
      Beginner: {
        Level1: [
          {
            question: "What is 'thank you' in German?",
            options: ["Danke", "Gracias", "Merci"],
            answer: "Danke",
            explanation: "'Danke' means 'thank you' in German.",
            vocab: {
              word: "Danke",
              translation: "Thank you",
              language: "German",
            },
          },
          {
            question: "How do you say 'good morning' in German?",
            options: ["Guten Morgen", "Guten Abend", "Guten Nacht"],
            answer: "Guten Morgen",
            explanation: "'Guten Morgen' is German for 'good morning'.",
            vocab: {
              word: "Guten Morgen",
              translation: "Good morning",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'yes'?",
            options: ["Nein", "Ja", "Vielleicht"],
            answer: "Ja",
            explanation: "'Ja' means 'yes' in German.",
            vocab: { word: "Ja", translation: "Yes", language: "German" },
          },
          {
            question: "What is 'one' in German?",
            options: ["Eins", "Zwei", "Drei"],
            answer: "Eins",
            explanation: "The number 'one' in German is 'eins'.",
            vocab: { word: "Eins", translation: "One", language: "German" },
          },
          {
            question: "How do you say 'hello' in German?",
            options: ["Hallo", "Tschüss", "Bitte"],
            answer: "Hallo",
            explanation: "'Hallo' means 'hello' in German.",
            vocab: { word: "Hallo", translation: "Hello", language: "German" },
          },
        ],
        Level2: [
          {
            question: "What is the German word for 'no'?",
            options: ["Ja", "Nein", "Vielleicht"],
            answer: "Nein",
            explanation: "'Nein' means 'no' in German.",
            vocab: { word: "Nein", translation: "No", language: "German" },
          },
          {
            question: "What is 'two' in German?",
            options: ["Zwei", "Eins", "Drei"],
            answer: "Zwei",
            explanation: "The number 'two' in German is 'zwei'.",
            vocab: { word: "Zwei", translation: "Two", language: "German" },
          },
          {
            question: "How do you say 'goodbye' in German?",
            options: ["Hallo", "Tschüss", "Danke"],
            answer: "Tschüss",
            explanation: "'Tschüss' means 'goodbye' in German.",
            vocab: {
              word: "Tschüss",
              translation: "Goodbye",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'please'?",
            options: ["Bitte", "Danke", "Tschüss"],
            answer: "Bitte",
            explanation: "'Bitte' means 'please' in German.",
            vocab: { word: "Bitte", translation: "Please", language: "German" },
          },
          {
            question: "What is 'good night' in German?",
            options: ["Guten Morgen", "Guten Abend", "Guten Nacht"],
            answer: "Guten Nacht",
            explanation: "'Guten Nacht' means 'good night' in German.",
            vocab: {
              word: "Guten Nacht",
              translation: "Good night",
              language: "German",
            },
          },
        ],
        Level3: [
          {
            question: "What is 'three' in German?",
            options: ["Drei", "Zwei", "Vier"],
            answer: "Drei",
            explanation: "The number 'three' in German is 'drei'.",
            vocab: { word: "Drei", translation: "Three", language: "German" },
          },
          {
            question: "What is the German word for 'dog'?",
            options: ["Hund", "Katze", "Maus"],
            answer: "Hund",
            explanation: "'Hund' means 'dog' in German.",
            vocab: { word: "Hund", translation: "Dog", language: "German" },
          },
          {
            question: "What is the German word for 'cat'?",
            options: ["Hund", "Katze", "Maus"],
            answer: "Katze",
            explanation: "'Katze' means 'cat' in German.",
            vocab: { word: "Katze", translation: "Cat", language: "German" },
          },
          {
            question: "What is 'good evening' in German?",
            options: ["Guten Morgen", "Guten Abend", "Guten Nacht"],
            answer: "Guten Abend",
            explanation: "'Guten Abend' means 'good evening' in German.",
            vocab: {
              word: "Guten Abend",
              translation: "Good evening",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'book'?",
            options: ["Buch", "Tisch", "Stuhl"],
            answer: "Buch",
            explanation: "'Buch' means 'book' in German.",
            vocab: { word: "Buch", translation: "Book", language: "German" },
          },
        ],
      },
      Intermediate: {
        Level1: [
          {
            question: "What is the plural form of 'Haus' (house)?",
            options: ["Häuse", "Häuser", "Hausen"],
            answer: "Häuser",
            explanation: "The plural of 'Haus' in German is 'Häuser'.",
            vocab: {
              word: "Haus",
              translation: "Häuser (plural)",
              language: "German",
            },
          },
          {
            question:
              "Which article is correct for 'Mädchen' (girl) in the nominative case?",
            options: ["Der", "Die", "Das"],
            answer: "Das",
            explanation:
              "'Mädchen' is a neuter noun, so it takes 'das' as its article.",
            vocab: {
              word: "Mädchen",
              translation: "Girl (neuter)",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'table'?",
            options: ["Tisch", "Stuhl", "Bett"],
            answer: "Tisch",
            explanation: "'Tisch' means 'table' in German.",
            vocab: { word: "Tisch", translation: "Table", language: "German" },
          },
          {
            question: "What is the past tense of 'gehen' (to go)?",
            options: ["Ging", "Gehe", "Gegangen"],
            answer: "Ging",
            explanation: "The simple past tense of 'gehen' is 'ging'.",
            vocab: {
              word: "Gehen",
              translation: "Ging (past)",
              language: "German",
            },
          },
          {
            question: "How do you say 'I am happy' in German?",
            options: [
              "Ich bin traurig.",
              "Ich bin glücklich.",
              "Ich bin müde.",
            ],
            answer: "Ich bin glücklich.",
            explanation: "'Ich bin glücklich.' means 'I am happy' in German.",
            vocab: {
              word: "Glücklich",
              translation: "Happy",
              language: "German",
            },
          },
        ],
        Level2: [
          {
            question: "What is the past tense of 'sehen' (to see)?",
            options: ["Sah", "Sehe", "Gesehen"],
            answer: "Sah",
            explanation: "The simple past tense of 'sehen' is 'sah'.",
            vocab: {
              word: "Sehen",
              translation: "Sah (past)",
              language: "German",
            },
          },
          {
            question: "How do you say 'I am learning German' in German?",
            options: [
              "Ich lerne Deutsch.",
              "Ich spreche Deutsch.",
              "Ich verstehe Deutsch.",
            ],
            answer: "Ich lerne Deutsch.",
            explanation: "'Ich lerne Deutsch.' means 'I am learning German.'",
            vocab: { word: "Lerne", translation: "Learn", language: "German" },
          },
          {
            question: "What is the German word for 'school'?",
            options: ["Schule", "Haus", "Auto"],
            answer: "Schule",
            explanation: "'Schule' means 'school' in German.",
            vocab: {
              word: "Schule",
              translation: "School",
              language: "German",
            },
          },
          {
            question: "What is the plural of 'Buch' (book)?",
            options: ["Bücher", "Buchs", "Büch"],
            answer: "Bücher",
            explanation: "The plural of 'Buch' in German is 'Bücher'.",
            vocab: {
              word: "Buch",
              translation: "Bücher (plural)",
              language: "German",
            },
          },
          {
            question:
              "What is the correct article for 'Auto' (car) in the nominative case?",
            options: ["Der", "Die", "Das"],
            answer: "Das",
            explanation:
              "'Auto' is a neuter noun, so it takes 'das' as its article.",
            vocab: {
              word: "Auto",
              translation: "Car (neuter)",
              language: "German",
            },
          },
        ],
        Level3: [
          {
            question: "What is the German word for 'friend'?",
            options: ["Freund", "Feind", "Familie"],
            answer: "Freund",
            explanation: "'Freund' means 'friend' in German.",
            vocab: {
              word: "Freund",
              translation: "Friend",
              language: "German",
            },
          },
          {
            question:
              "What is the correct article for 'Hund' (dog) in the nominative case?",
            options: ["Der", "Die", "Das"],
            answer: "Der",
            explanation:
              "'Hund' is a masculine noun, so it takes 'der' as its article.",
            vocab: {
              word: "Hund",
              translation: "Dog (masculine)",
              language: "German",
            },
          },
          {
            question: "What is the past tense of 'essen' (to eat)?",
            options: ["Aß", "Esse", "Gegessen"],
            answer: "Aß",
            explanation: "The simple past tense of 'essen' is 'aß'.",
            vocab: {
              word: "Essen",
              translation: "Aß (past)",
              language: "German",
            },
          },
          {
            question: "How do you say 'I like to read' in German?",
            options: [
              "Ich mag lesen.",
              "Ich mag schreiben.",
              "Ich mag sprechen.",
            ],
            answer: "Ich mag lesen.",
            explanation: "'Ich mag lesen.' means 'I like to read' in German.",
            vocab: { word: "Mag", translation: "Like", language: "German" },
          },
          {
            question: "What is the German word for 'mother'?",
            options: ["Mutter", "Vater", "Schwester"],
            answer: "Mutter",
            explanation: "'Mutter' means 'mother' in German.",
            vocab: {
              word: "Mutter",
              translation: "Mother",
              language: "German",
            },
          },
        ],
      },
      Advanced: {
        Level1: [
          {
            question:
              "What is the correct dative form of 'der Mann' (the man)?",
            options: ["Dem Mann", "Den Mann", "Der Mann"],
            answer: "Dem Mann",
            explanation: "In the dative case, 'der Mann' becomes 'dem Mann'.",
            vocab: {
              word: "Dative",
              translation: "Indirect object case",
              language: "German",
            },
          },
          {
            question: "Which sentence uses the Konjunktiv II correctly?",
            options: [
              "Wenn ich reich wäre, würde ich reisen.",
              "Wenn ich reich bin, reise ich.",
              "Wenn ich reich war, reiste ich.",
            ],
            answer: "Wenn ich reich wäre, würde ich reisen.",
            explanation:
              "Konjunktiv II is used for hypothetical situations, like 'wäre' and 'würde'.",
            vocab: {
              word: "Konjunktiv II",
              translation: "Subjunctive II",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'hope'?",
            options: ["Hoffnung", "Zweifel", "Angst"],
            answer: "Hoffnung",
            explanation: "'Hoffnung' means 'hope' in German.",
            vocab: {
              word: "Hoffnung",
              translation: "Hope",
              language: "German",
            },
          },
          {
            question:
              "What is the correct accusative form of 'die Frau' (the woman)?",
            options: ["Die Frau", "Der Frau", "Den Frau"],
            answer: "Die Frau",
            explanation:
              "In the accusative case, 'die Frau' remains 'die Frau' as it is feminine.",
            vocab: {
              word: "Accusative",
              translation: "Direct object case",
              language: "German",
            },
          },
          {
            question: "How do you say 'I have finished' in German?",
            options: [
              "Ich habe fertig.",
              "Ich bin fertig.",
              "Ich bin gemacht.",
            ],
            answer: "Ich bin fertig.",
            explanation: "'Ich bin fertig.' means 'I have finished' in German.",
            vocab: {
              word: "Fertig",
              translation: "Finished",
              language: "German",
            },
          },
        ],
        Level2: [
          {
            question: "What does 'sich freuen auf' mean?",
            options: [
              "To look forward to",
              "To be sad about",
              "To forget about",
            ],
            answer: "To look forward to",
            explanation:
              "'Sich freuen auf' means 'to look forward to' in German.",
            vocab: {
              word: "Sich freuen auf",
              translation: "To look forward to",
              language: "German",
            },
          },
          {
            question:
              "What is the correct passive form: 'Das Haus ___ gebaut.'",
            options: ["Wird", "Wurde", "War"],
            answer: "Wurde",
            explanation:
              "The correct passive form here is 'wurde gebaut' (was built).",
            vocab: {
              word: "Passive",
              translation: "Action done to subject",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'freedom'?",
            options: ["Freiheit", "Gefangenschaft", "Regel"],
            answer: "Freiheit",
            explanation: "'Freiheit' means 'freedom' in German.",
            vocab: {
              word: "Freiheit",
              translation: "Freedom",
              language: "German",
            },
          },
          {
            question: "What is the past participle of 'schreiben' (to write)?",
            options: ["Schrieb", "Geschrieben", "Schreiben"],
            answer: "Geschrieben",
            explanation: "The past participle of 'schreiben' is 'geschrieben'.",
            vocab: {
              word: "Schreiben",
              translation: "Geschrieben (past participle)",
              language: "German",
            },
          },
          {
            question: "How do you say 'I would like to learn' in German?",
            options: [
              "Ich möchte lernen.",
              "Ich mag lernen.",
              "Ich will lernen.",
            ],
            answer: "Ich möchte lernen.",
            explanation:
              "'Ich möchte lernen.' means 'I would like to learn' in German.",
            vocab: {
              word: "Möchte",
              translation: "Would like",
              language: "German",
            },
          },
        ],
        Level3: [
          {
            question: "What does 'zweifelhaft' mean?",
            options: ["Certain", "Doubtful", "Hopeful"],
            answer: "Doubtful",
            explanation:
              "'Zweifelhaft' means 'doubtful' or 'questionable' in German.",
            vocab: {
              word: "Zweifelhaft",
              translation: "Doubtful",
              language: "German",
            },
          },
          {
            question: "What is the German word for 'beauty'?",
            options: ["Schönheit", "Hässlichkeit", "Traurigkeit"],
            answer: "Schönheit",
            explanation: "'Schönheit' means 'beauty' in German.",
            vocab: {
              word: "Schönheit",
              translation: "Beauty",
              language: "German",
            },
          },
          {
            question:
              "What is the correct genitive form of 'das Kind' (the child)?",
            options: ["Des Kindes", "Dem Kind", "Den Kind"],
            answer: "Des Kindes",
            explanation:
              "In the genitive case, 'das Kind' becomes 'des Kindes'.",
            vocab: {
              word: "Genitive",
              translation: "Possessive case",
              language: "German",
            },
          },
          {
            question: "What does 'vermeiden' mean?",
            options: ["To avoid", "To include", "To accept"],
            answer: "To avoid",
            explanation: "'Vermeiden' means 'to avoid' in German.",
            vocab: {
              word: "Vermeiden",
              translation: "To avoid",
              language: "German",
            },
          },
          {
            question: "How do you say 'It is important' in German?",
            options: ["Es ist wichtig.", "Es ist schlecht.", "Es ist einfach."],
            answer: "Es ist wichtig.",
            explanation: "'Es ist wichtig.' means 'It is important' in German.",
            vocab: {
              word: "Wichtig",
              translation: "Important",
              language: "German",
            },
          },
        ],
      },
    },
    French: {
      Beginner: {
        Level1: [
          {
            question: "What is 'hello' in French?",
            options: ["Bonjour", "Hola", "Hallo"],
            answer: "Bonjour",
            explanation: "'Bonjour' means 'hello' in French.",
            vocab: {
              word: "Bonjour",
              translation: "Hello",
              language: "French",
            },
          },
          {
            question: "What is 'thank you' in French?",
            options: ["Merci", "Danke", "Gracias"],
            answer: "Merci",
            explanation: "'Merci' means 'thank you' in French.",
            vocab: {
              word: "Merci",
              translation: "Thank you",
              language: "French",
            },
          },
          {
            question: "What is 'yes' in French?",
            options: ["Oui", "Non", "Peut-être"],
            answer: "Oui",
            explanation: "'Oui' means 'yes' in French.",
            vocab: { word: "Oui", translation: "Yes", language: "French" },
          },
          {
            question: "What is 'one' in French?",
            options: ["Un", "Deux", "Trois"],
            answer: "Un",
            explanation: "The number 'one' in French is 'un'.",
            vocab: { word: "Un", translation: "One", language: "French" },
          },
          {
            question: "What is 'goodbye' in French?",
            options: ["Au revoir", "Bonjour", "Merci"],
            answer: "Au revoir",
            explanation: "'Au revoir' means 'goodbye' in French.",
            vocab: {
              word: "Au revoir",
              translation: "Goodbye",
              language: "French",
            },
          },
        ],
        Level2: [
          {
            question: "What is 'no' in French?",
            options: ["Oui", "Non", "Peut-être"],
            answer: "Non",
            explanation: "'Non' means 'no' in French.",
            vocab: { word: "Non", translation: "No", language: "French" },
          },
          {
            question: "What is 'two' in French?",
            options: ["Deux", "Un", "Trois"],
            answer: "Deux",
            explanation: "The number 'two' in French is 'deux'.",
            vocab: { word: "Deux", translation: "Two", language: "French" },
          },
          {
            question: "What is 'please' in French?",
            options: ["S'il vous plaît", "Merci", "Au revoir"],
            answer: "S'il vous plaît",
            explanation: "'S'il vous plaît' means 'please' in French.",
            vocab: {
              word: "S'il vous plaît",
              translation: "Please",
              language: "French",
            },
          },
          {
            question: "What is 'good night' in French?",
            options: ["Bonne nuit", "Bonsoir", "Bonjour"],
            answer: "Bonne nuit",
            explanation: "'Bonne nuit' means 'good night' in French.",
            vocab: {
              word: "Bonne nuit",
              translation: "Good night",
              language: "French",
            },
          },
          {
            question: "What is 'good evening' in French?",
            options: ["Bonsoir", "Bonne nuit", "Bonjour"],
            answer: "Bonsoir",
            explanation: "'Bonsoir' means 'good evening' in French.",
            vocab: {
              word: "Bonsoir",
              translation: "Good evening",
              language: "French",
            },
          },
        ],
        Level3: [
          {
            question: "What is 'three' in French?",
            options: ["Trois", "Deux", "Quatre"],
            answer: "Trois",
            explanation: "The number 'three' in French is 'trois'.",
            vocab: { word: "Trois", translation: "Three", language: "French" },
          },
          {
            question: "What is 'dog' in French?",
            options: ["Chien", "Chat", "Souris"],
            answer: "Chien",
            explanation: "'Chien' means 'dog' in French.",
            vocab: { word: "Chien", translation: "Dog", language: "French" },
          },
          {
            question: "What is 'cat' in French?",
            options: ["Chien", "Chat", "Souris"],
            answer: "Chat",
            explanation: "'Chat' means 'cat' in French.",
            vocab: { word: "Chat", translation: "Cat", language: "French" },
          },
          {
            question: "What is 'book' in French?",
            options: ["Livre", "Tableau", "Chaise"],
            answer: "Livre",
            explanation: "'Livre' means 'book' in French.",
            vocab: { word: "Livre", translation: "Book", language: "French" },
          },
          {
            question: "What is 'good morning' in French?",
            options: ["Bonjour", "Bonsoir", "Bonne nuit"],
            answer: "Bonjour",
            explanation: "'Bonjour' can also mean 'good morning' in French.",
            vocab: {
              word: "Bonjour",
              translation: "Good morning",
              language: "French",
            },
          },
        ],
      },
      Intermediate: {
        Level1: [
          {
            question: "What is the French word for 'house'?",
            options: ["Maison", "Château", "Appartement"],
            answer: "Maison",
            explanation: "'Maison' means 'house' in French.",
            vocab: { word: "Maison", translation: "House", language: "French" },
          },
          {
            question:
              "What is the correct article for 'fille' (girl) in French?",
            options: ["Le", "La", "L'"],
            answer: "La",
            explanation:
              "'Fille' is feminine, so it takes 'la' as its article.",
            vocab: {
              word: "Fille",
              translation: "Girl (feminine)",
              language: "French",
            },
          },
          {
            question: "What is the French word for 'school'?",
            options: ["École", "Maison", "Voiture"],
            answer: "École",
            explanation: "'École' means 'school' in French.",
            vocab: { word: "École", translation: "School", language: "French" },
          },
          {
            question: "What is the past tense of 'aller' (to go)?",
            options: ["Suis allé", "Va", "Allais"],
            answer: "Suis allé",
            explanation:
              "The past tense of 'aller' in present perfect is 'suis allé'.",
            vocab: {
              word: "Aller",
              translation: "Suis allé (past)",
              language: "French",
            },
          },
          {
            question: "How do you say 'I am happy' in French?",
            options: [
              "Je suis heureux.",
              "Je suis triste.",
              "Je suis fatigué.",
            ],
            answer: "Je suis heureux.",
            explanation: "'Je suis heureux.' means 'I am happy' in French.",
            vocab: {
              word: "Heureux",
              translation: "Happy",
              language: "French",
            },
          },
        ],
        Level2: [
          {
            question: "What is the past tense of 'voir' (to see)?",
            options: ["Ai vu", "Vois", "Voyais"],
            answer: "Ai vu",
            explanation:
              "The past tense of 'voir' in present perfect is 'ai vu'.",
            vocab: {
              word: "Voir",
              translation: "Ai vu (past)",
              language: "French",
            },
          },
          {
            question: "How do you say 'I am learning French' in French?",
            options: [
              "J'apprends le français.",
              "Je parle français.",
              "Je comprends français.",
            ],
            answer: "J'apprends le français.",
            explanation:
              "'J'apprends le français.' means 'I am learning French.'",
            vocab: {
              word: "Apprends",
              translation: "Learn",
              language: "French",
            },
          },
          {
            question: "What is the French word for 'table'?",
            options: ["Tableau", "Chaise", "Lit"],
            answer: "Tableau",
            explanation: "'Tableau' means 'table' in French.",
            vocab: {
              word: "Tableau",
              translation: "Table",
              language: "French",
            },
          },
          {
            question: "What is the plural of 'livre' (book)?",
            options: ["Livres", "Livrs", "Livrez"],
            answer: "Livres",
            explanation: "The plural of 'livre' in French is 'livres'.",
            vocab: {
              word: "Livre",
              translation: "Livres (plural)",
              language: "French",
            },
          },
          {
            question:
              "What is the correct article for 'chien' (dog) in French?",
            options: ["Le", "La", "L'"],
            answer: "Le",
            explanation:
              "'Chien' is masculine, so it takes 'le' as its article.",
            vocab: {
              word: "Chien",
              translation: "Dog (masculine)",
              language: "French",
            },
          },
        ],
        Level3: [
          {
            question: "What is the French word for 'friend'?",
            options: ["Ami", "Ennemi", "Famille"],
            answer: "Ami",
            explanation: "'Ami' means 'friend' in French.",
            vocab: { word: "Ami", translation: "Friend", language: "French" },
          },
          {
            question: "What is the correct article for 'chat' (cat) in French?",
            options: ["Le", "La", "L'"],
            answer: "Le",
            explanation:
              "'Chat' is masculine, so it takes 'le' as its article.",
            vocab: {
              word: "Chat",
              translation: "Cat (masculine)",
              language: "French",
            },
          },
          {
            question: "What is the past tense of 'manger' (to eat)?",
            options: ["Ai mangé", "Mange", "Mangeais"],
            answer: "Ai mangé",
            explanation:
              "The past tense of 'manger' in present perfect is 'ai mangé'.",
            vocab: {
              word: "Manger",
              translation: "Ai mangé (past)",
              language: "French",
            },
          },
          {
            question: "How do you say 'I like to read' in French?",
            options: ["J'aime lire.", "J'aime écrire.", "J'aime parler."],
            answer: "J'aime lire.",
            explanation: "'J'aime lire.' means 'I like to read' in French.",
            vocab: { word: "Aime", translation: "Like", language: "French" },
          },
          {
            question: "What is the French word for 'mother'?",
            options: ["Mère", "Père", "Sœur"],
            answer: "Mère",
            explanation: "'Mère' means 'mother' in French.",
            vocab: { word: "Mère", translation: "Mother", language: "French" },
          },
        ],
      },
      Advanced: {
        Level1: [
          {
            question:
              "What is the correct past participle of 'écrire' (to write)?",
            options: ["Écrit", "Écris", "Écrivais"],
            answer: "Écrit",
            explanation: "The past participle of 'écrire' is 'écrit'.",
            vocab: {
              word: "Écrire",
              translation: "Écrit (past participle)",
              language: "French",
            },
          },
          {
            question: "Which sentence uses the subjunctive correctly?",
            options: [
              "Il faut que tu sois ici.",
              "Il faut que tu es ici.",
              "Il faut que tu étais ici.",
            ],
            answer: "Il faut que tu sois ici.",
            explanation: "The subjunctive 'sois' is used after 'il faut que'.",
            vocab: {
              word: "Subjunctive",
              translation: "Hypothetical mood",
              language: "French",
            },
          },
          {
            question: "What is the French word for 'hope'?",
            options: ["Espoir", "Doute", "Peur"],
            answer: "Espoir",
            explanation: "'Espoir' means 'hope' in French.",
            vocab: { word: "Espoir", translation: "Hope", language: "French" },
          },
          {
            question:
              "What is the correct article for 'amour' (love) in French?",
            options: ["Le", "La", "L'"],
            answer: "L'",
            explanation:
              "'Amour' starts with a vowel sound, so it takes 'l'' as its article.",
            vocab: { word: "Amour", translation: "Love", language: "French" },
          },
          {
            question: "How do you say 'I have finished' in French?",
            options: ["J'ai fini.", "Je suis fini.", "Je fais fini."],
            answer: "J'ai fini.",
            explanation: "'J'ai fini.' means 'I have finished' in French.",
            vocab: {
              word: "Fini",
              translation: "Finished",
              language: "French",
            },
          },
        ],
        Level2: [
          {
            question: "What does 'se réjouir de' mean?",
            options: ["To rejoice in", "To be sad about", "To forget about"],
            answer: "To rejoice in",
            explanation: "'Se réjouir de' means 'to rejoice in' in French.",
            vocab: {
              word: "Se réjouir de",
              translation: "To rejoice in",
              language: "French",
            },
          },
          {
            question: "What is the correct passive form: 'Le livre ___ écrit.'",
            options: ["Est", "Était", "Sera"],
            answer: "Est",
            explanation:
              "The correct passive form is 'est écrit' (is written).",
            vocab: {
              word: "Passive",
              translation: "Action done to subject",
              language: "French",
            },
          },
          {
            question: "What is the French word for 'freedom'?",
            options: ["Liberté", "Prison", "Règle"],
            answer: "Liberté",
            explanation: "'Liberté' means 'freedom' in French.",
            vocab: {
              word: "Liberté",
              translation: "Freedom",
              language: "French",
            },
          },
          {
            question: "What is the past participle of 'prendre' (to take)?",
            options: ["Pris", "Prend", "Prenais"],
            answer: "Pris",
            explanation: "The past participle of 'prendre' is 'pris'.",
            vocab: {
              word: "Prendre",
              translation: "Pris (past participle)",
              language: "French",
            },
          },
          {
            question: "How do you say 'I would like to learn' in French?",
            options: [
              "J'aimerais apprendre.",
              "J'aime apprendre.",
              "Je veux apprendre.",
            ],
            answer: "J'aimerais apprendre.",
            explanation:
              "'J'aimerais apprendre.' means 'I would like to learn' in French.",
            vocab: {
              word: "aimerais",
              translation: "Would like",
              language: "French",
            },
          },
        ],
        Level3: [
          {
            question: "What does 'douteux' mean?",
            options: ["Certain", "Doubtful", "Hopeful"],
            answer: "Doubtful",
            explanation: "'Douteux' means 'doubtful' in French.",
            vocab: {
              word: "Douteux",
              translation: "Doubtful",
              language: "French",
            },
          },
          {
            question: "What is the French word for 'beauty'?",
            options: ["Beauté", "Laideur", "Tristesse"],
            answer: "Beauté",
            explanation: "'Beauté' means 'beauty' in French.",
            vocab: {
              word: "Beauté",
              translation: "Beauty",
              language: "French",
            },
          },
          {
            question:
              "What is the correct past participle of 'vivre' (to live)?",
            options: ["Vécu", "Vis", "Vivais"],
            answer: "Vécu",
            explanation: "The past participle of 'vivre' is 'vécu'.",
            vocab: {
              word: "Vivre",
              translation: "Vécu (past participle)",
              language: "French",
            },
          },
          {
            question: "What does 'éviter' mean?",
            options: ["To avoid", "To include", "To accept"],
            answer: "To avoid",
            explanation: "'Éviter' means 'to avoid' in French.",
            vocab: {
              word: "Éviter",
              translation: "To avoid",
              language: "French",
            },
          },
          {
            question: "How do you say 'It is important' in French?",
            options: ["C'est important.", "C'est mauvais.", "C'est simple."],
            answer: "C'est important.",
            explanation:
              "'C'est important.' means 'It is important' in French.",
            vocab: {
              word: "Important",
              translation: "Important",
              language: "French",
            },
          },
        ],
      },
    },
  };

  const startQuiz = (language, level, subLevel) => {
    setSelectedLanguage(language);
    setSelectedLevel(level);
    setSelectedSubLevel(subLevel);
    setQuestions(quizData[language][level][subLevel] || []);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setShowExplanation(false);
    setVocabReview([]);
  };

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setVocabReview([...vocabReview, questions[currentQuestionIndex].vocab]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      const newProgress = { ...progress };
      if (!newProgress[selectedLanguage]) {
        newProgress[selectedLanguage] = {};
      }
      if (!newProgress[selectedLanguage][selectedLevel]) {
        newProgress[selectedLanguage][selectedLevel] = {};
      }
      newProgress[selectedLanguage][selectedLevel][selectedSubLevel] = {
        completed: true,
        score:
          score +
          (questions[currentQuestionIndex].answer === selectedOption ? 1 : 0),
        totalQuestions: questions.length,
      };
      setProgress(newProgress);
      setStreak(streak + 1);
    }
  };

  const canAccessLevel = (level) => {
    if (level === "Beginner") return true;
    if (level === "Intermediate") {
      return (
        progress[selectedLanguage]?.Beginner?.Level1?.completed &&
        progress[selectedLanguage]?.Beginner?.Level2?.completed &&
        progress[selectedLanguage]?.Beginner?.Level3?.completed
      );
    }
    if (level === "Advanced") {
      return (
        progress[selectedLanguage]?.Intermediate?.Level1?.completed &&
        progress[selectedLanguage]?.Intermediate?.Level2?.completed &&
        progress[selectedLanguage]?.Intermediate?.Level3?.completed
      );
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-6">
      <AnimatePresence>
        {!selectedLanguage ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
              Choose Your Language 🌍
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((language) => (
                <motion.button
                  key={language}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-colors"
                  onClick={() => setSelectedLanguage(language)}
                >
                  {language}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !selectedLevel ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
              Select Your Level 📚
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg text-white shadow-md transition-colors ${
                    canAccessLevel(level)
                      ? progress[selectedLanguage]?.[level]?.Level1
                          ?.completed &&
                        progress[selectedLanguage]?.[level]?.Level2
                          ?.completed &&
                        progress[selectedLanguage]?.[level]?.Level3?.completed
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    canAccessLevel(level) && setSelectedLevel(level)
                  }
                  disabled={!canAccessLevel(level)}
                >
                  {level}
                  {progress[selectedLanguage]?.[level]?.Level1?.completed &&
                  progress[selectedLanguage]?.[level]?.Level2?.completed &&
                  progress[selectedLanguage]?.[level]?.Level3?.completed ? (
                    <span className="ml-2">✔</span>
                  ) : null}
                  {!canAccessLevel(level) && <span className="ml-2">🔒</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !selectedSubLevel ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
              Select a Sub-Level 🚀
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {["Level1", "Level2", "Level3"].map((subLevel) => (
                <motion.button
                  key={subLevel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg text-white shadow-md transition-colors ${
                    progress[selectedLanguage]?.[selectedLevel]?.[subLevel]
                      ?.completed
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-purple-500 hover:bg-purple-600"
                  }`}
                  onClick={() =>
                    startQuiz(selectedLanguage, selectedLevel, subLevel)
                  }
                >
                  {subLevel}
                  {progress[selectedLanguage]?.[selectedLevel]?.[subLevel]
                    ?.completed ? (
                    <span className="ml-2">✔</span>
                  ) : null}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !quizFinished ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {questions[currentQuestionIndex]?.question}
            </h2>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-3 border rounded-lg mb-3 text-gray-800 ${
                  selectedOption
                    ? option === questions[currentQuestionIndex].answer
                      ? "bg-green-200 border-green-500"
                      : option === selectedOption
                      ? "bg-red-200 border-red-500"
                      : "bg-gray-50"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => handleAnswerSelection(option)}
                disabled={!!selectedOption}
              >
                {option}
              </motion.button>
            ))}
            {showExplanation && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-gray-600"
              >
                {questions[currentQuestionIndex].explanation}
              </motion.p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <h1 className="text-3xl font-extrabold text-gray-800">
              🎉 Quiz Finished!
            </h1>
            <p className="text-lg mt-4 text-gray-600">
              Your Score:{" "}
              {score +
                (questions[currentQuestionIndex].answer === selectedOption
                  ? 1
                  : 0)}{" "}
              / {questions.length}
            </p>
            <h2 className="text-2xl font-semibold mt-6 text-gray-800">
              Vocabulary Review 📝
            </h2>
            <div className="mt-4 text-left">
              {vocabReview.map((vocab, index) => (
                <p key={index} className="text-gray-600">
                  <strong>{vocab.word}</strong>: {vocab.translation} (
                  {vocab.language})
                </p>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
              onClick={() => {
                setSelectedLanguage(null);
                setSelectedLevel(null);
                setSelectedSubLevel(null);
              }}
            >
              Restart
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Page Component with Progress Tracking
function Dashboard() {
  const [progress, setProgress] = useState({});
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem("quizProgress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quizProgress", JSON.stringify(progress));
    localStorage.setItem("streak", streak.toString());
  }, [progress, streak]);

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Language Learning Adventure 🎓
        </h1>

        {/* Streak and Progress Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 p-6 bg-white rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Your Progress
          </h2>
          <p className="text-gray-600 mb-4">Current Streak: {streak} 🔥</p>
          {Object.keys(progress).length === 0 ? (
            <p className="text-gray-600">
              Start a quiz to track your progress!
            </p>
          ) : (
            <div className="space-y-4">
              {Object.entries(progress).map(([language, levels]) => (
                <div key={language}>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {language}
                  </h3>
                  {Object.entries(levels).map(([level, subLevels]) => (
                    <div key={level} className="ml-4 mt-2">
                      <h4 className="text-lg font-medium text-gray-700">
                        {level}
                      </h4>
                      {Object.entries(subLevels).map(([subLevel, data]) => (
                        <p key={subLevel} className="ml-4 text-gray-600">
                          {subLevel}: {data.score}/{data.totalQuestions} 🎯
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Language Exercises Component */}
        <LanguageExercises
          progress={progress}
          setProgress={setProgress}
          streak={streak}
          setStreak={setStreak}
        />
      </div>
    </div>
  );
}

export default Dashboard;
