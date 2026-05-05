import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';

const Navbar = ({ onCategoryChange, categories, activeCategory }) => {
  return (
    <motion.nav
      intial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="nav_brand">
        <FaCamera className="nav_icon" />
        <h1>PhotoGallery</h1>
      </div>

      <div className="nav-categories">
        <button
          className={`category-btn ${!activeCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange('')}
        >
          {' '}
          All{' '}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${
              activeCategory === cat.name ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(cat.name)}
          >
            {cat.name.replace('-', ' ')}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};
export default Navbar;
