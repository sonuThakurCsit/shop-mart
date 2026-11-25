import { createContext, useState, useEffect } from "react";

export const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [review, setReview] = useState(() => {
    try {
      const savedReview = localStorage.getItem("review");

      const parsedReview = savedReview ? JSON.parse(savedReview) : [];

      return Array.isArray(parsedReview) ? parsedReview : [];
    } catch (error) {
      console.log("Error loading reviews:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("review", JSON.stringify(review));
  }, [review]);

  return (
    <ReviewContext.Provider value={{ review, setReview }}>
      {children}
    </ReviewContext.Provider>
  );
}
