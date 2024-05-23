import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

import CustomerProductsPage from "../pages/customer/products";
import Login from "../pages/auth";
import CartPage from "../pages/customer/cart";
import PaymentPage from "../pages/customer/payment-method";
import AdminProductsPage from "../pages/admin/products";
import HistoryPage from "../pages/admin/history";
import NewProductPage from "../pages/admin/new-product";
import { UnprotectedRoute } from "./UnprotectedRoute";
import SuccessOrderPage from "pages/customer/success-payment";
import PixBillPage from "pages/customer/pix-bill";

const AppRoutes: React.FC = () => {
  const { user, verifyToken } = useAuth();
  verifyToken();
  return (
    <Routes>
      <Route element={<UnprotectedRoute user={user} />}>
        <Route path="/auth" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/" element={<CustomerProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/success" element={<SuccessOrderPage />} />
        <Route path="/finish-payment/:id" element={<PixBillPage />} />
      </Route>
      <Route element={<ProtectedRoute user={user} onlyAdmin />}>
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/history" element={<HistoryPage />} />
        <Route path="/admin/new-product/:id" element={<NewProductPage />} />
        <Route path="/admin/new-product/" element={<NewProductPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
