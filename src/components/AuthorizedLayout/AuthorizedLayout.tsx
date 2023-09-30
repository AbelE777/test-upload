import { motion, AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { ComplexNavbar, Sidebar, ToggleMenuButton } from "../.";
import { useEffect, useRef, useState } from "react";

const AuthorizedLayout = () => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      !sidebarRef.current?.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsSidenavOpen(false);
    }
  };

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <motion.div
        className="fixed top-20 left-0 p-2 z-50"
        initial={{ x: 0 }}
        animate={{ x: isSidenavOpen ? 260 : 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        ref={buttonRef}
      >
        <ToggleMenuButton
          handleToggleSidenav={handleToggleSidenav}
          isSidenavOpen={isSidenavOpen}
        />
      </motion.div>

      <div className="flex-grow">
        <ComplexNavbar />
        <div className={`fixed top-0 left-0 h-screen mt-14`} style={{zIndex:'40'}}>
          <AnimatePresence>
            {isSidenavOpen && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: isSidenavOpen ? 0 : -300 }}
                transition={{ duration: 0.3 }}
                exit={{ x: -300 }}
                className="absolute top-0 left-0 shadow-xl h-screen"
                ref={sidebarRef}
              >
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          className="mx-auto"
          style={{ marginLeft: 0 }}
          initial={{ marginLeft: 0 }}
          animate={{ marginLeft: isSidenavOpen && isLargeScreen ? 290 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </main>
  );
};

export default AuthorizedLayout;
