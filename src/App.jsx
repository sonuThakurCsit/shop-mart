
import AppRouter from "./routes/AppRouter";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ReviewProvider } from "./context/ReviewContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ReviewProvider>
          <AppRouter />
        </ReviewProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;