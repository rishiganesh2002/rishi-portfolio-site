"use client";
import React, { useState, useEffect } from "react";

interface IntroductionProps {
  header: string;
  text: string;
}

const Introduction: React.FC<IntroductionProps> = ({ header, text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Start typing animation after a short delay
    const startDelay = setTimeout(() => {
      setIsTyping(true);
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Adjust typing speed here (milliseconds per character)

      return () => clearTimeout(typingTimer);
    }
  }, [isTyping, currentIndex, text]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        {header}
      </h1>
      <div className="text-lg md:text-xl text-center leading-relaxed">
        <span>{displayedText}</span>
        {currentIndex < text.length && <span className="animate-pulse">|</span>}
      </div>
    </div>
  );
};

export default Introduction;
