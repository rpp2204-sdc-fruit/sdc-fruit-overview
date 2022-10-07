import React, { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Expanded from './Expanded.jsx';

function Gallery({ style, current }) {
  // const [style, setstyle] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState('default');

  useEffect(() => {
    console.log('gallery style: ', style);
    console.log('gallery current: ', current.current);
    const testAsync = async () => {
      const photos = await style.photos;
      if (photos) {
        setSelectedPhoto(photos[selectedIndex].url);
      }
    };
    testAsync();
  }, [style]);

  // useEffect(() => {
  //   if (current.current.name !== '') {
  //     setSelectedPhoto(current.current.photos[selectedIndex].url);
  //   }
  // }, [current.current]);

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
      const newPhoto = style.photos[newIndex].url;
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
    if (selectedIndex < style.photos.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      const newPhoto = style.photos[newIndex].url;
      setSelectedPhoto(newPhoto);
      if (selectedIndex > maxRange) {
        const container = document.getElementById('photo-container');
        container.scrollBy({ top: 40, left: 0, behaviour: 'smooth' });
        maxRange++;
        minRange++;
      }
    }
  };

  if (Object.keys(style).length) {
    if (
      view === 'default' &&
      Object.keys(style.photos).length &&
      selectedPhoto !== null
    ) {
      return (
        <div className="gallery-container">
          <img
            className="main-img"
            src={selectedPhoto}
            onClick={handleChangeViewExpanded}
            alt={"Not Available"}
          />
          <div className="sidebar">
            {selectedIndex !== 0 ? (
              <KeyboardArrowUpIcon
                className="arrow-up"
                onClick={previousPhoto}
              />
            ) : null}
            <div className="photo-container" id="photo-container">
              {style.photos.map((photo, index) => {
                if (index === selectedIndex) {
                  return (
                    <img
                      onClick={(e) => {
                        handleChangePhoto(e);
                      }}
                      className="style-other-imgs-selected"
                      src={photo.thumbnail_url}
                      index={index}
                      key={index}
                      alt={"Not vailable"}
                    />
                  );
                }
                return (
                  <img
                    onClick={(e) => {
                      handleChangePhoto(e);
                    }}
                    className="style-other-imgs"
                    src={photo.thumbnail_url}
                    index={index}
                    key={index}
                  />
                );
              })}
            </div>
            {selectedIndex < style.photos.length - 1 ? (
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
          photos={style.photos}
          selectedPhoto={selectedPhoto}
          changeSelectedPhoto={handleChangePhoto}
          selectedIndex={selectedIndex}
        />
      );
    }
  }
}

export default Gallery;


// import React, { useState, useEffect, useRef } from 'react';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import Expanded from './Expanded.jsx';

// function Gallery({ style }) {
//   // const [style, setstyle] = useState({});
//   // const [selectedPhoto, setSelectedPhoto] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState('');
//   const [view, setView] = useState('default');

//   const selectedPhoto = useRef(0);

//   useEffect(() => {
//     if (style.current.photos) {
//       if (style.current.photos[0].url !== '') {
//         selectedPhoto.current = style.current.photos[0].url;
//       }
//     }
//   }, [style.current]);

//   const handleChangePhoto = (e) => {
//     e.preventDefault();
//     selectedPhoto.current = e.target.src;
//     setSelectedIndex(Number(e.target.getAttribute('index')));
//   };

//   const handleChangeViewExpanded = () => {
//     setView('expanded');
//   };

//   const handleChangeViewDefault = () => {
//     setView('default');
//   };

//   let minRange = 0;
//   let maxRange = 2;

//   const previousPhoto = (e) => {
//     e.preventDefault();
//     if (selectedIndex > 0) {
//       const newIndex = selectedIndex - 1;
//       setSelectedIndex(newIndex);
//       const newPhoto = style.current.photos[newIndex].url;
//       selectedPhoto.current = newPhoto;
//       if (selectedIndex <= maxRange) {
//         console.log('SCROLL UP');
//         const container = document.getElementById('photo-container');
//         if (container) {
//           container.scrollBy({ top: -40, left: 0, behaviour: 'smooth' });
//           maxRange--;
//           minRange--;
//         }
//       }
//     }
//   };

//   const nextPhoto = (e) => {
//     e.preventDefault();
//     if (selectedIndex < style.current.photos.length - 1) {
//       const newIndex = selectedIndex + 1;
//       setSelectedIndex(newIndex);
//       const newPhoto = style.current.photos[newIndex].url;
//       selectedPhoto.current(newPhoto);
//       if (selectedIndex > maxRange) {
//         const container = document.getElementById('photo-container');
//         container.scrollBy({ top: 40, left: 0, behaviour: 'smooth' });
//         maxRange++;
//         minRange++;
//       }
//     }
//   };

//   if (style.current._id) {
//     if (
//       view === 'default' &&
//       style.current.photos.length &&
//       selectedPhoto !== ''
//     ) {
//       return (
//         <div className="gallery-container">
//           <img
//             className="main-img"
//             src={selectedPhoto}
//             onClick={handleChangeViewExpanded}
//             alt={"Not Available"}
//           />
//           <div className="sidebar">
//             {selectedIndex !== 0 ? (
//               <KeyboardArrowUpIcon
//                 className="arrow-up"
//                 onClick={previousPhoto}
//               />
//             ) : null}
//             <div className="photo-container" id="photo-container">
//               {style.current.photos.map((photo, index) => {
//                 if (index === selectedIndex) {
//                   return (
//                     <img
//                       onClick={(e) => {
//                         handleChangePhoto(e);
//                       }}
//                       className="style-other-imgs-selected"
//                       src={photo.thumbnail_url}
//                       index={index}
//                       key={index}
//                       alt={"Not vailable"}
//                     />
//                   );
//                 }
//                 return (
//                   <img
//                     onClick={(e) => {
//                       handleChangePhoto(e);
//                     }}
//                     className="style-other-imgs"
//                     src={photo.thumbnail_url}
//                     index={index}
//                     key={index}
//                   />
//                 );
//               })}
//             </div>
//             {selectedIndex < style.current.photos.length - 1 ? (
//               <KeyboardArrowDownIcon
//                 className="arrow-down"
//                 onClick={nextPhoto}
//               />
//             ) : null}
//           </div>
//         </div>
//       );
//     }
//     if (view === 'expanded') {
//       return (
//         <Expanded
//           nextPhoto={nextPhoto}
//           previousPhoto={previousPhoto}
//           changeViewDefault={handleChangeViewDefault}
//           photos={style.current.photos}
//           selectedPhoto={selectedPhoto}
//           changeSelectedPhoto={handleChangePhoto}
//           selectedIndex={selectedIndex}
//         />
//       );
//     }
//   }
// }

// export default Gallery;

