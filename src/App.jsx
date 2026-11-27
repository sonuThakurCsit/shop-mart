import AppRouter from "./routes/AppRouter";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ReviewProvider } from "./context/ReviewContext";
import { OrderProvider } from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ReviewProvider>
            <OrderProvider>
              <AppRouter />
            </OrderProvider>
          </ReviewProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


