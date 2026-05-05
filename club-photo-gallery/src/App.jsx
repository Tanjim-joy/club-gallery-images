import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import { fetchFolders } from './utils/githubApi';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const folders = await fetchFolders();
      setCategories(folders);
    };
    loadCategories();
  }, []);

  return (
    <div className="app">
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main>
        <Gallery activeCategory={activeCategory} />
      </main>
      <footer className="footer">
        <p>© 2026 আমাদের ক্লাব | স্মৃতি চিরন্তন</p>
      </footer>
    </div>
  );
}

export default App;
