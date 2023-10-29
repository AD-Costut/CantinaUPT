import React, { useState, useRef } from "react";
import "./meniuStyles.css";
import { updateDailyMenuItemPicture } from "./helperFunctions/apiRequest/putDailyMenuPicture";

export const Card = ({
  title,
  description,
  priceForUPT,
  priceOutsidersUPT,
  cardPrimaryKey,
  isUserUPT,
  foodImage,
}) => {
  const token = localStorage.getItem("accessToken");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef();

  const handleImageUpload = async () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const picture = event.target.files[0];
    if (picture) {
      try {
        await updateDailyMenuItemPicture(token, cardPrimaryKey, {
          title,
          description,
          priceForUPT,
          priceOutsidersUPT,
          isUserUPT,
          picture,
        });
        const imageUrl = URL.createObjectURL(picture);
        setImage(imageUrl);
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
  };

  return (
    <div className="card">
      <div style={{ maxWidth: "20rem", paddingRight: "1rem" }}>
        <h2>{title}</h2>
        <p className="description">{description}</p>
        <div className="price-in-card">
          <b>Preț: </b>
          <p
            className={
              isUserUPT
                ? "price-upt available-price"
                : "price-upt not-available-price"
            }
          >
            {priceForUPT} RON
          </p>
          <p
            className={
              isUserUPT
                ? "price-outsiders not-available-price"
                : "price-outsiders available-price"
            }
          >
            {priceOutsidersUPT} RON
          </p>
        </div>
      </div>
      <div>
        <img
          src={`data:image/png;base64,${foodImage}`}
          className="food-picture"
          style={{
            minWidth: "15rem",
            minHeight: "10rem",
            maxWidth: "15rem",
            maxHeight: "10rem",
            backgroundColor: "blue",
            borderRadius: "5%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          alt="NO_IMAGE_FOUND"
          onClick={handleImageUpload}
        />
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
