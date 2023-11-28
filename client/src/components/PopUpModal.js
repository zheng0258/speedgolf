/*************************************************************************
 * File: PopUpModal.js
 * This file defines a React component that implements a pop up dialog.
 ************************************************************************/

import React from 'react';

/*************************************************************************
 * @class PopUpModal 
 * @Desc 
 * This React component is a pop up dialog.
 *************************************************************************/

class PopUpmodal extends React.Component {


    constructor(props) {
        super(props);
        this.state = {deleteMessage: "",
                      deleteBackgroundColor: "gray",
                      deleteTextColor: "black"};
    }

   
    render() {
        return (
            (this.props.deleteModalOpen) ? 
                <div id="roundsDeletedModal" className="modal-container" 
                     role="alert" aria-atomic="true" aria-live="assertive">
                <div className="toast-text">
                   {"Are you sure you want to delete this round?"}
                </div>
                  <button id="deleteRoundClose" 
                          type="button" 
                          className="btn-close modal-container-closeBtn" 
                          aria-label="Close"
                          onClick={()=> this.props.closeModal()}>
                  </button>
                  <button id="roundDeleteBtn" 
                          type="button" 
                          className="modal-container-dBtn" 
                          onClick={()=> this.props.deleteRound()}>Yes, Delete round
                  </button>
                  <button id="accountCreatedClose" 
                          type="button" 
                          className="modal-container-cBtn" 
                          onClick={()=> this.props.closeModal()}>No, Do not delete round
                  </button>
                </div> : null
        )

    }
}
export default PopUpmodal;