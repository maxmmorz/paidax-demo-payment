import {
  Home,
  ShoppingCart,
  Briefcase,
  Menu,
  User,
  Bell,
  ArrowLeft,
} from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTopUpScreen = location.pathname === "/topup";
  const isWithdrawScreen = location.pathname === "/withdraw";
  const isModalScreen = isTopUpScreen || isWithdrawScreen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-foreground relative flex items-center justify-center">
      {/* Mobile Phone Frame */}
      <div className="relative">
        {/* Phone Shadow */}
        <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-4 scale-105 rounded-[3rem] hidden sm:block"></div>

        {/* Phone Body */}
        <div className="phone-frame hidden sm:block">
          {/* Phone Screen */}
          <div className="phone-screen">
            {/* Dynamic Island / Notch */}
            <div className="phone-notch"></div>

            {/* Screen Content Container */}
            <div className="w-full h-full bg-background flex flex-col relative">
              {/* Top Bar - Icons in safe area */}
              <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center">
                    {isModalScreen ? (
                      <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95"
                      >
                        <ArrowLeft
                          className="w-5 h-5 text-foreground/80"
                          strokeWidth={1.5}
                        />
                      </button>
                    ) : (
                      <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                        <Menu
                          className="w-5 h-5 text-foreground/80"
                          strokeWidth={1.5}
                        />
                      </button>
                    )}
                  </div>

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

              <div className={`flex-1 overflow-y-auto ${isModalScreen ? "pb-4" : "pb-12"}`}>
                <Outlet />
              </div>

              {!isModalScreen && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/30">
                  <div className="flex justify-around py-2 safe-area-inset-bottom">
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
        </div>

        {/* Mobile Layout (shown on small devices only) */}
        <div className="sm:hidden w-screen mx-auto bg-background min-h-screen flex flex-col">
          {/* Top Bar - Icons in safe area */}
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center">
                {isModalScreen ? (
                  <button
                    onClick={() => navigate(-1)}
                    className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <ArrowLeft
                      className="w-5 h-5 text-foreground/80"
                      strokeWidth={1.5}
                    />
                  </button>
                ) : (
                  <button className="p-2.5 hover:bg-muted/50 rounded-xl transition-all duration-200 active:scale-95">
                    <Menu
                      className="w-5 h-5 text-foreground/80"
                      strokeWidth={1.5}
                    />
                  </button>
                )}
              </div>

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

          <div className={`flex-1 ${isModalScreen ? "pb-8" : "pb-20"}`}>
            <Outlet />
          </div>

          {!isModalScreen && (
            <div className="sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/30">
              <div className="flex justify-around py-2 safe-area-inset-bottom">
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
    </div>
  );
}
