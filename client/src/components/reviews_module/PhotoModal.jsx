import React from 'react';

function PhotoModal({ photoURL, viewPhoto, closePhotoModal, setViewPhoto }) {
  return !viewPhoto ? (
    ''
  ) : (
    <div id="photo-window" >
      <div id="modal-photo" >
        <div onClick={() => closePhotoModal(setViewPhoto)}>
          <i
            id="photo-window-icon"

            className="fak fa-square-xmark-light fa-2xl"
          ></i>
        </div>
        <img
          className="modal-photo"

          src={photoURL}
          alt="Photo Not Available"
        ></img>
      </div>
    </div>
  );
}

export default PhotoModal;
