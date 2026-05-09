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
      // console.log('Folders:', folders);
      setCategories(folders);
      if (!activeCategory && folders.length > 0) {
        setActiveCategory(folders[0].name);
      }
    };
    loadCategories();
  }, [activeCategory]);

  return (
    <div className="app">
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {/* <main>
        <Gallery activeCategory={activeCategory} />
      </main>       */}
      {/* <PhotoCard /> */}
      <Gallery />

    </div>
  );
}

export default App;
