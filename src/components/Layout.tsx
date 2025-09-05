import { Home, ShoppingCart, Briefcase, Menu, User, Bell } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isTopUpScreen = location.pathname === "/topup";
  const isWithdrawScreen = location.pathname === "/withdraw";

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
        {/* Top Bar - Apple-style header */}
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between px-5 py-4">
            <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
              <Menu className="w-5 h-5 text-foreground/80" strokeWidth={1.5} />
            </button>

            <div className="flex items-center space-x-1">
              <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95 relative">
                <Bell
                  className="w-5 h-5 text-foreground/80"
                  strokeWidth={1.5}
                />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></div>
              </button>
              <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                <User
                  className="w-5 h-5 text-foreground/80"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 pb-20">
          <Outlet />
        </div>

        {!isTopUpScreen && !isWithdrawScreen && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/30">
            <div className="max-w-md mx-auto flex justify-around py-2 safe-area-inset-bottom">
              <NavLink
                to="/"
                children={({ isActive }) => (
                  <div
                    className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <Home
                      className="w-5 h-5 mb-1.5"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className="text-xs font-medium">Home</span>
                  </div>
                )}
              />

              <NavLink
                to="/market"
                children={({ isActive }) => (
                  <div
                    className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <ShoppingCart
                      className="w-5 h-5 mb-1.5"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className="text-xs font-medium">Market</span>
                  </div>
                )}
              />

              <NavLink
                to="/portfolio"
                children={({ isActive }) => (
                  <div
                    className={`flex flex-col items-center py-3 px-6 rounded-2xl transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <Briefcase
                      className="w-5 h-5 mb-1.5"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    <span className="text-xs font-medium">Portfolio</span>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
