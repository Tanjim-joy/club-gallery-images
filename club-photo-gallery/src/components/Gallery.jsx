import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchPhotos, fetchFolders } from "../utils/githubApi";
import PhotoCard from "./PhotoCard";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  /* ================== LOAD FOLDERS (CATEGORY) ================== */
  useEffect(() => {
    const loadFolders = async () => {
      try {
        const folderData = await fetchFolders();

        // Folder name -> category
        const folderNames = [
          "All",
          ...folderData.map(folder => folder.name),
        ];

        setCategories(folderNames);
        setActiveCategory("All");
        // console.log("Folders:", folderNames);
      } catch (error) {
        console.error("Folder load failed:", error);
      }
    };

    loadFolders();
  }, []);

  /* ================== LOAD PHOTOS ================== */
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photoData = await fetchPhotos();
        setPhotos(photoData);
        setFilteredPhotos(photoData);

        console.log("Photos:", photoData);
      } catch (error) {
        console.error("Photo load failed:", error);
      }
    };

    loadPhotos();
  }, []);

  /* ================== FILTER PHOTOS ================== */
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos.filter(
        photo =>
          photo.category?.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredPhotos(filtered);      
    }
  }, [activeCategory, photos]);

  return (
    <section
      id="gallery"
      style={{
        padding: "100px 2px",
        background: "linear-gradient(180deg, #16213e 0%, #0f0f1a 100%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        {/* ================== HEADER ================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            আমাদের ক্লাবের সব মজার মুহূর্ত এক জায়গায়। ক্যাটাগরি সিলেক্ট করে দেখুন!
          </p>
        </motion.div>

        {/* ================== CATEGORY BUTTONS ================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 22px",
                borderRadius: 12,
                border:
                  activeCategory === cat
                    ? "1px solid rgba(99,102,241,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                background:
                  activeCategory === cat
                    ? "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(168,85,247,0.35))"
                    : "rgba(255,255,255,0.05)",
                color:
                  activeCategory === cat
                    ? "#fff"
                    : "rgba(255,255,255,0.6)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ================== PHOTO GRID ================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))
          ) : (
            <p style={{ color: "#fff", textAlign: "center", gridColumn: "1/-1" }}>
              কোনো ছবি পাওয়া যায়নি
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;