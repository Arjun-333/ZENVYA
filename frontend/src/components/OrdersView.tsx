"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Truck, Clock, ArrowLeft, ShoppingBag, Filter } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group-1";

export default function OrdersView({ onBack }: { onBack: () => void }) {
  const { orders } = useAppContext();
  const [filter, setFilter] = useState<string>("all");

  const statusConfig = {
    processing: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Processing" },
    shipped: { icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10", label: "Shipped" },
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-8 pt-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-primary uppercase tracking-widest text-xs font-bold mb-1">Order History</p>
            <h2 className="text-2xl md:text-3xl font-display text-foreground tracking-tight">My Orders</h2>
          </div>
        </div>

        {orders.length > 0 && (
          <div className="flex items-center gap-3 bg-card border border-border p-1.5 rounded-lg self-start md:self-center">
            <div className="px-3 text-muted-foreground">
              <Filter className="w-4 h-4" />
            </div>
            <ToggleGroup type="single" value={filter} onValueChange={(val) => val && setFilter(val)} variant="default" size="sm">
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="processing">Processing</ToggleGroupItem>
              <ToggleGroupItem value="shipped">Shipped</ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 border border-dashed border-border rounded-lg"
        >
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground mt-1">Start shopping to see your orders here!</p>
          <button onClick={onBack} className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all">
            Browse Products
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                <p className="text-muted-foreground">No {filter} orders found.</p>
              </motion.div>
            ) : (
              filteredOrders.map((order, i) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="border border-border bg-card rounded-lg overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-5 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-bold text-foreground">Order #{order.id}</p>
                          <p className="text-xs text-muted-foreground">Placed on {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg}`}>
                          <StatusIcon className={`w-4 h-4 ${status.color}`} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${status.color}`}>{status.label}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Est. Delivery</p>
                          <p className="text-sm font-bold text-foreground">{order.estimatedDelivery}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-5 space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg border border-border" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex justify-between items-center px-5 py-4 bg-muted/30 border-t border-border">
                      <p className="text-xs text-muted-foreground">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                      <p className="text-sm font-bold text-primary">Total: ₹{order.total.toLocaleString()}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-5 py-6 bg-muted/10">
                      <div className="flex items-center gap-2 max-w-md mx-auto">
                        <div className="relative flex-1 flex items-center">
                          <div className={`w-3 h-3 rounded-full z-10 ${order.status === 'processing' || order.status === 'shipped' ? 'bg-primary' : 'bg-border'}`} />
                          <div className={`absolute left-0 w-full h-0.5 ${order.status === 'shipped' ? 'bg-primary' : 'bg-border'}`} />
                          <div className={`w-3 h-3 rounded-full z-10 ml-auto ${order.status === 'shipped' ? 'bg-primary' : 'bg-border'}`} />
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 max-w-md mx-auto px-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'processing' ? 'text-primary' : 'text-muted-foreground'}`}>Placed</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'shipped' ? 'text-primary' : 'text-muted-foreground'}`}>Shipped</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
