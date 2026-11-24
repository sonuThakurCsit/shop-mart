import { createContext, useState , useEffect} from "react";


export const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");

    const parsedWishlist = savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

    return Array.isArray(parsedWishlist) ? parsedWishlist : [];

  } catch (error) {
    console.error("Error loading wishlist:", error);
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}