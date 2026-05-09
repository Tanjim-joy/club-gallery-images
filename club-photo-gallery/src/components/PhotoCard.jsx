import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react';

const PhotoCard = ({photo, index, onClick  }) => {

  const [isLoad, setIsLoad] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(photo)}
    >
      
      <div style={{
        position: "relative",
        aspectRatio: index % 3 === 0 ? "3/4" : "4/3",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        borderRadius: 16, overflow: "hidden"
      }}>
        {!isLoaded && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)"
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.1)",
                borderTopColor: "#6366f1"
              }}
            />
          </div>
        )}
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            display: isLoaded ? "block" : "none",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
        />
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
            display: "flex", flexDirection: "column",
            justifyContent: "flex-end", padding: 20
          }}
        >
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <span style={{
              display: "inline-block", padding: "4px 12px",
              borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: "rgba(99,102,241,0.3)", color: "#a5b4fc",
              marginBottom: 8, border: "1px solid rgba(99,102,241,0.3)"
            }}>
              {photo.category}
            </span>
          </motion.div>
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700 }}>
              {photo.title}
            </h3>
          </motion.div>
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.5 }}>
              {photo.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PhotoCard



