
import StackNavigator from './navigation/StackNavigator';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Dummy from './dummies/Dummy';
import DummyFormData from './dummies/DummyFormData';
import Netcontext from './context/Netcontext';

export default function App() {
  return (
    <Netcontext>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <StackNavigator />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Netcontext>



    // <ThemeProvider>
    //   <DummyFormData />
    // </ThemeProvider>
  );
}