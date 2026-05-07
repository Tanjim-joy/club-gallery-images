import { motion } from "framer-motion";
import { FaCamera, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = ({ onCategoryChange, categories, activeCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(15, 15, 25, 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 0",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 12,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 800, color: "#fff"
          }}>
            ক
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            ক্লাব গ্যালারি
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["হোম", "গ্যালারি", "আমাদের সম্পর্কে"].map((item) => (
            <a key={item} href="#" style={{
              color: "rgba(255,255,255,0.7)", textDecoration: "none",
              fontSize: 15, fontWeight: 500, transition: "color 0.3s",
              cursor: "pointer"
            }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}


export default Navbar;