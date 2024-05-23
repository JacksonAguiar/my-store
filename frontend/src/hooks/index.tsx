import { AuthProvider } from "./useAuth";
import { CartProvider } from "./useCart";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const AppProvider = ({ children }:any) => (
  <AuthProvider>
    <Theme>
      <CartProvider>{children}</CartProvider>
    </Theme>
  </AuthProvider>
);
export default AppProvider;
