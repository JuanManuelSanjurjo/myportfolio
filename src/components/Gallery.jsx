import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Gallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="experience-img-container">
      <button
        className="next-btn"
        onClick={() =>
          setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }
      >
        &#10095;
      </button>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="experience-image"
          src={`./assets/projects/${images[currentImage]}`}
          alt={images[currentImage].split("/").pop()}
        ></motion.img>
      </AnimatePresence>
    </div>
  );
}
