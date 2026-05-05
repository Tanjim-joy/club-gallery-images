import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';

const PhotoCard = ({ photo, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(photo.download_url);
    alert('লিংক কপি হয়েছে!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="photo-card"
      whileHover={{ y: -10 }}
    >
      <div className="photo-wrapper">
        <img
          src={photo.download_url}
          alt={photo.name}
          onLoad={() => setIsLoaded(true)}
          className={isLoaded ? 'loaded' : 'loading'}
        />
        {!isLoaded && <div className="skeleton" />}
      </div>

      <div className="photo-info">
        <p className="photo-name">{photo.name.split('.')[0]}</p>
        <div className="photo-actions">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="action-btn"
          >
            <FaHeart color={isLiked ? '#ff6b6b' : '#fff'} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyLink}
            className="action-btn"
          >
            <FaShare />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
