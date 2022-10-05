import React from 'react';

function ErrorModal({ error, errorModal, setErrorModal }) {
  return errorModal ? (
    <div id="error-window" >
      <div id="error-modal" >
        <div onClick={() => setErrorModal((errorModal) => false)}>
          <i
            id="error-modal-icon"

            className="fak fa-square-xmark-light fa-lg"
          ></i>
        </div>
        <div id="error" >{`You must enter the following: ${error.current.toUpperCase()}`}</div>
        <div id="error-msg" >{'missing field or incorrect format'}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ErrorModal;
