
import StackNavigator from './navigation/StackNavigator';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Dummy from './dummies/Dummy';
import DummyFormData from './dummies/DummyFormData';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <StackNavigator />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>

    // <ThemeProvider>
    //   <DummyFormData />
    // </ThemeProvider>
  );
}