"use client";

import { useEffect, useState } from "react";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { TextScramble } from "@/components/ui/text-scramble";
import { SplineScene } from "@/components/ui/splite";
import ProductCard from "@/components/ProductCard";
import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import AuthView from "@/components/AuthView";
import ProfileView from "@/components/ProfileView";
import SimulatedPayment from "@/components/SimulatedPayment";
import StylistView from "@/components/StylistView";
import NeuralAssistant from "@/components/NeuralAssistant";
import CategorySidebar from "@/components/CategorySidebar";
import OrdersView from "@/components/OrdersView";
import CartView from "@/components/CartView";
import { motion, AnimatePresence } from "framer-motion";
import SplineSceneBasic from "@/components/ui/spline-demo";
import { Search, ShoppingBag, User as UserIcon, Sun, Moon, Package, Loader2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

type ViewState = "intro" | "landing" | "results" | "dashboard" | "auth" | "profile" | "checkout" | "stylist" | "orders" | "cart";

// Page transition loading overlay
function PageTransition({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[150] bg-background/80 backdrop-blur-md flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs uppercase tracking-widest font-bold text-primary">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { user, theme, toggleTheme, cart, clearCart, placeOrder } = useAppContext();
  const [view, setView] = useState<ViewState>("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("electronics");
  const [viewHistory, setViewHistory] = useState<ViewState[]>([]);

  // Navigate with browser history + loading transition
  const navigateTo = (newView: ViewState) => {
    setIsTransitioning(true);
    setViewHistory(prev => [...prev, view]);
    window.history.pushState({ view: newView }, "");
    setTimeout(() => {
      setView(newView);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 300);
  };

  const goBack = () => {
    if (viewHistory.length > 0) {
      setIsTransitioning(true);
      const prev = viewHistory[viewHistory.length - 1];
      setViewHistory(h => h.slice(0, -1));
      setTimeout(() => {
        setView(prev);
        setIsTransitioning(false);
      }, 200);
    } else {
      setView("results");
    }
  };

  useEffect(() => {
    const handlePop = () => goBack();
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [viewHistory]);

  // Intro sequence
  useEffect(() => {
    if (view === "intro") {
      const timer = setTimeout(() => {
        if (!user) setView("auth");
        else { setView("results"); if (searchResults.length === 0) triggerInitialFetch(); }
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [view, user]);

  const triggerInitialFetch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/search?q=electronics`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) { console.error("Fetch failed:", err); }
    finally { setIsLoading(false); }
  };

  const handleSearch = async (e: React.FormEvent, manualQuery?: string) => {
    if (e) e.preventDefault();
    const query = manualQuery || searchQuery;
    if (!query.trim()) return;
    setIsLoading(true);
    setView("results");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch { setSearchResults([]); }
    finally { setIsLoading(false); }
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    handleSearch({ preventDefault: () => {} } as any, categoryId);
  };

  const handleCheckoutComplete = () => {
    placeOrder(cart, cart.reduce((a, i) => a + i.price * (i.quantity || 1), 0));
    clearCart();
    setViewHistory([]); // Clear history so back doesn't go to payment
    navigateTo("orders");
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <main className="relative min-h-screen bg-background transition-colors duration-500 overflow-hidden font-sans text-foreground">
      <PageTransition show={isTransitioning} />

      {/* INTRO */}
      <AnimatePresence>
        {view === "intro" && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black">
            <SpiralAnimation />
            <div className="absolute inset-0 flex items-center justify-center">
              <TextScramble duration={2} className="text-6xl md:text-8xl font-display font-black tracking-[0.5em] text-[#C2A884]">ZENVYA</TextScramble>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LANDING */}
      <AnimatePresence>
        {view === "landing" && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-0 bg-[#050505]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-6xl md:text-8xl font-display uppercase tracking-[0.4em] text-[#C2A884] mb-6">ZENVYA</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1 }}
                className="text-base font-light tracking-widest uppercase text-[#EAE0D5] mb-8">Buy Smart. Save Always.</motion.p>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                onClick={() => { navigateTo("results"); if (searchResults.length === 0) triggerInitialFetch(); }}
                className="px-8 py-3 border border-[#C2A884] text-[#C2A884] rounded-full text-sm uppercase tracking-widest hover:bg-[#C2A884] hover:text-black transition-all">
                Enter Marketplace
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN APP */}
      <div className={`fixed inset-0 w-full h-full z-50 transition-all duration-700 overflow-y-auto ${
        (view !== "landing" && view !== "intro") ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}>
        {/* Navbar */}
        <header className="w-full max-w-7xl mx-auto mt-4 md:mt-6 sticky top-4 bg-card/80 backdrop-blur-2xl border border-border rounded-full flex items-center justify-between px-4 md:px-8 py-3 md:py-4 relative z-50 shadow-lg">
          <span onClick={() => navigateTo("landing")} className="text-xl md:text-2xl font-display font-bold tracking-tighter text-foreground cursor-pointer hover:text-primary transition-all">Zenvya</span>

          <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-md mx-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." 
              className="w-full bg-background/50 border border-border rounded-full pl-11 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground" />
          </form>

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={toggleTheme} className="hover:text-primary transition-all p-2 rounded-full border border-border" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => navigateTo("orders")} className="hover:text-primary transition-all p-2 relative" aria-label="Orders">
              <Package className="w-4 h-4" />
            </button>
            <button onClick={() => navigateTo(user ? "profile" : "auth")} className="hover:text-primary transition-all flex items-center gap-2" aria-label="Profile">
              <UserIcon className="w-4 h-4" />
              {user && <span className="text-xs font-semibold hidden lg:inline">{user.name.split(' ')[0]}</span>}
            </button>
            <button onClick={() => navigateTo("cart")}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full border border-primary hover:bg-transparent hover:text-primary transition-all"
              aria-label={`Bag ${cart.length} items`}>
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Bag ({cart.length})</span>
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* RESULTS */}
          {view === "results" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="min-h-screen pt-20 md:pt-28 pb-24 px-4 md:px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
                <CategorySidebar activeCategory={activeCategory} onSelect={handleCategorySelect} />
                <div className="flex-1 space-y-8">
                  <SplineSceneBasic />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 border-b border-border pb-6">
                    <div>
                      <p className="text-primary uppercase tracking-widest text-xs font-bold mb-1">Marketplace</p>
                      <h2 className="text-2xl md:text-3xl font-display text-foreground tracking-tight">
                        Browse <span className="italic text-primary">{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</span>
                      </h2>
                    </div>
                    <div className="text-right">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                          <span className="text-xs font-semibold text-primary">Searching platforms...</span>
                        </div>
                      ) : (
                        <p className="text-sm font-display text-primary">{searchResults.length} products found</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                      Array(6).fill(0).map((_, i) => (
                        <div key={i} className="aspect-[4/5] bg-card animate-pulse rounded-lg border border-border" />
                      ))
                    ) : searchResults.length > 0 ? (
                      searchResults.map((p) => (
                        <ProductCard key={p.id} {...p} onClick={() => { setSelectedProduct(p); navigateTo("dashboard"); }} />
                      ))
                    ) : (
                      <div className="col-span-full py-24 text-center">
                        <p className="text-lg text-muted-foreground">No products found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* DASHBOARD */}
          {view === "dashboard" && selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20 md:pt-28 min-h-screen">
              <IntelligenceDashboard productTitle={selectedProduct.title} productId={selectedProduct.id} onBack={goBack} />
            </motion.div>
          )}

          {/* ORDERS */}
          {view === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <OrdersView onBack={goBack} />
            </motion.div>
          )}

          {/* CART */}
          {view === "cart" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CartView onBack={goBack} onCheckout={() => navigateTo("checkout")} />
            </motion.div>
          )}

          {view === "auth" && <AuthView onComplete={() => { navigateTo("results"); triggerInitialFetch(); }} />}
          {view === "profile" && <ProfileView />}
          {view === "stylist" && <StylistView onBack={goBack} />}
        </AnimatePresence>
      </div>

      {view === "checkout" && <SimulatedPayment total={cartTotal} onComplete={handleCheckoutComplete} />}
      
      <NeuralAssistant onSearch={(q) => { setSearchQuery(q); handleSearch({ preventDefault: () => {} } as any, q); }} />
    </main>
  );
}
