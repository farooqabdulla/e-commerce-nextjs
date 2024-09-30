"use client";

import { useState, useEffect, useId, useCallback } from 'react';

const slides = [
    { color: "bg-red-500", content: "First Slide" },
    { color: "bg-blue-500", content: "Second Slide" },
    { color: "bg-green-500", content: "Third Slide" },
    { color: "bg-yellow-500", content: "Fourth Slide" },
    { color: "bg-purple-500", content: "Fifth Slide" },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselId = useId();

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const goToSlide = useCallback((slideIndex) => {
        setCurrentIndex(slideIndex);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isPaused) {
                goToNext();
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [goToNext, isPaused]);

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative h-[70vh] overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full ${slide.color} flex items-center justify-center transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <h2 className="text-4xl font-bold text-white">{slide.content}</h2>
                    </div>
                ))}
            </div>
            <button
                className="absolute top-1/2 left-4 h-[70%] -translate-y-1/2  p-2 rounded-full"
                onClick={() => {
                    goToPrevious();
                    setIsPaused(true);
                }}
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                className="absolute top-1/2 right-4 h-[70%] -translate-y-1/2  p-2 rounded-full"
                onClick={() => {
                    goToNext();
                    setIsPaused(true);
                }}
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-secondary'}`}
                        onClick={() => {
                            goToSlide(index);
                            setIsPaused(true);
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-controls={carouselId}
                    />
                ))}
            </div>
        </div>
    );
}
