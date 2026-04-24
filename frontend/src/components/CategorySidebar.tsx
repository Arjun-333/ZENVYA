"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { 
  Shirt, 
  Smartphone, 
  Armchair, 
  Utensils, 
  Gamepad2, 
  Package, 
  BookOpen, 
  ChevronRight,
  Filter,
  Loader2
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  subcategories?: string[];
}

interface CategorySidebarProps {
  onSelect: (category: string) => void;
  activeCategory: string;
  isLoading?: boolean;
}

export default function CategorySidebar({ onSelect, activeCategory, isLoading = false }: CategorySidebarProps) {
  const categories: Category[] = useMemo(() => [
    { id: "fashion", name: "Fashion", icon: Shirt, subcategories: ["Men", "Women", "Kids"] },
    { id: "electronics", name: "Mobile & Accessories", icon: Smartphone },
    { id: "furniture", name: "Furniture", icon: Armchair },
    { id: "kitchen", name: "Home & Kitchen", icon: Utensils },
    { id: "toys", name: "Toys & Games", icon: Gamepad2 },
    { id: "essentials", name: "Daily Essentials", icon: Package },
    { id: "ebooks", name: "eBooks", icon: BookOpen },
  ], []);

  if (isLoading) {
    return (
      <div className="w-full md:w-72 shrink-0 bg-card/40 backdrop-blur-xl border-r border-border p-6 space-y-4">
        {Array(7).fill(0).map((_, i) => (
          <div key={i} className="h-12 bg-muted/40 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <aside className="w-full md:w-72 shrink-0 h-fit md:sticky md:top-32 bg-card/60 backdrop-blur-xl border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-primary" />
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Categories</p>
      </div>

      <nav className="space-y-1" role="navigation" aria-label="Product categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;

          return (
            <div key={cat.id}>
              <button 
                onClick={() => onSelect(cat.id)}
                aria-pressed={isActive}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group border-l-3 ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-l-primary shadow-sm' 
                    : 'hover:bg-muted/50 text-foreground/70 hover:text-foreground border-l-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-all ${isActive ? 'text-primary scale-110' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider">{cat.name}</span>
                </div>
                {cat.subcategories && (
                  <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-90 text-primary' : 'text-muted-foreground'}`} />
                )}
              </button>
              
              <AnimatePresence>
                {isActive && cat.subcategories && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-11 py-2 space-y-1">
                      {cat.subcategories.map(sub => (
                        <button 
                          key={sub}
                          onClick={() => onSelect(`${cat.id}-${sub.toLowerCase()}`)}
                          className="w-full text-left py-2 px-3 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
