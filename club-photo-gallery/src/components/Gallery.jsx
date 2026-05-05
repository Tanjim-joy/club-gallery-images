import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPhotos, fetchFolders } from '../utils/githubApi';
import PhotoCard from './PhotoCard';

const Gallery = ({ activeCategory }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const data = await fetchPhotos(activeCategory);
      setPhotos(data);
      setLoading(false);
    };

    loadPhotos();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="loader"
        />
        <p>ছবি লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {photos.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="no-photos"
        >
          এই ক্যাটাগরিতে কোনো ছবি নেই 🥺
        </motion.p>
      ) : (
        <motion.div className="gallery-grid" layout>
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.sha}
              photo={photo}
              index={index}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </motion.div>
      )}

      {/* লাইটবক্স */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lightbox"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.img
            src={selectedPhoto.download_url}
            alt={selectedPhoto.name}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="lightbox-image"
          />
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
