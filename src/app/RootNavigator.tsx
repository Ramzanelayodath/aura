import React, { useState } from 'react';
import { useAuthViewModel } from '../features/auth/useAuthViewModel';
import SplashScreen from '../features/splash/SplashScreen';
import LoginScreen from '../features/auth/LoginScreen';
import HomeScreen from '../features/home/HomeScreen';
import ProductDetailScreen from '../features/product/ProductDetailScreen';
import CartScreen from '../features/cart/CartScreen';

/**
 * Chooses Splash / Login / Home based on auth state.
 * Splash also owns the one-time session restore (see useSplashViewModel).
 * Once authenticated, also owns the Home <-> Product detail <-> Cart
 * selection, since the app has no navigation library installed yet.
 */
function RootNavigator() {
  const { isAuthenticated, isBootstrapping } = useAuthViewModel();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  if (isBootstrapping) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  if (selectedProductId !== null) {
    return (
      <ProductDetailScreen
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  if (cartOpen) {
    return <CartScreen onShopNow={() => setCartOpen(false)} />;
  }

  return (
    <HomeScreen
      onSelectProduct={setSelectedProductId}
      onOpenCart={() => setCartOpen(true)}
    />
  );
}

export default RootNavigator;
