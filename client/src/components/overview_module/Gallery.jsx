import React, { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Expanded from './Expanded.jsx';

function Gallery(props) {
  const [selectedStyle, setSelectedStyle] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState('default');

  useEffect(() => {
    setSelectedStyle(props.style);
  }, [props.style]);

  useEffect(() => {
    const testAsync = async () => {
      const photos = await selectedStyle.photos;
      if (photos) {
        setSelectedPhoto(photos[selectedIndex].url);
      }
    };
    testAsync();
  }, [selectedStyle.photos]);

  const handleChangePhoto = (e) => {
    e.preventDefault();
    setSelectedPhoto(e.target.src);
    setSelectedIndex(Number(e.target.getAttribute('index')));
  };

  const handleChangeViewExpanded = () => {
    setView('expanded');
  };

  const handleChangeViewDefault = () => {
    setView('default');
  };

  let minRange = 0;
  let maxRange = 2;

  const previousPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      const newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
      if (selectedIndex <= maxRange) {
        console.log('SCROLL UP');
        const container = document.getElementById('photo-container');
        if (container) {
          container.scrollBy({ top: -40, left: 0, behaviour: 'smooth' });
          maxRange--;
          minRange--;
        }
      }
    }
  };

  const nextPhoto = (e) => {
    e.preventDefault();
    if (selectedIndex < selectedStyle.photos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      const newPhoto = selectedStyle.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
      if (selectedIndex > maxRange) {
        const container = document.getElementById('photo-container');
        container.scrollBy({ top: 40, left: 0, behaviour: 'smooth' });
        maxRange++;
        minRange++;
      }
    }
  };

  if (Object.keys(selectedStyle).length) {
    if (
      view === 'default' &&
      Object.keys(selectedStyle.photos).length &&
      selectedPhoto !== null
    ) {
      return (
        <div className="gallery-container">
          <img
            className="main-img"
            src={selectedPhoto}
            onClick={handleChangeViewExpanded}
          />
          <div className="sidebar">
            {/* <button className="arrow-up">UP</button> */}
            {selectedIndex !== 0 ? (
              <KeyboardArrowUpIcon
                className="arrow-up"
                onClick={previousPhoto}
              />
            ) : null}
            <div className="photo-container" id="photo-container">
              {selectedStyle.photos.map((photo, index) => {
                if (index === selectedIndex) {
                  return (
                    <img
                      onClick={(e) => {
                        handleChangePhoto(e);
                      }}
                      className="style-other-imgs-selected"
                      src={photo.url}
                      index={index}
                      key={index}
                    />
                  );
                }
                return (
                  <img
                    onClick={(e) => {
                      handleChangePhoto(e);
                    }}
                    className="style-other-imgs"
                    src={photo.url}
                    index={index}
                    key={index}
                  />
                );
              })}
            </div>
            {selectedIndex < selectedStyle.photos.length - 1 ? (
              <KeyboardArrowDownIcon
                className="arrow-down"
                onClick={nextPhoto}
              />
            ) : null}
          </div>
        </div>
      );
    }
    if (view === 'expanded') {
      return (
        <Expanded
          nextPhoto={nextPhoto}
          previousPhoto={previousPhoto}
          changeViewDefault={handleChangeViewDefault}
          photos={selectedStyle.photos}
          selectedPhoto={selectedPhoto}
          changeSelectedPhoto={handleChangePhoto}
          selectedIndex={selectedIndex}
        />
      );
    }
  }
}

export default Gallery;
