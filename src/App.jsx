import AppRouter from "./routes/AppRouter";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ReviewProvider } from "./context/ReviewContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ReviewProvider>
          <OrderProvider>
            <AppRouter />
          </OrderProvider>
        </ReviewProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
