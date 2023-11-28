import React from 'react';


class NotificationToast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {deleteMessage: "",
                      deleteBackgroundColor: "gray",
                      deleteTextColor: "black"};
    }

       
    render() {
        return (
            (this.props.deleteToastOpen) ?
                <div id="roundsDeletedToast" className={"toast-container" } 
                     role="alert" aria-atomic="true" aria-live="assertive">
                <div className="toast-text">
                   {"Round was deleted!"}
                </div>
                  <button id="accountCreatedClose" 
                          type="button" 
                          className="btn-close toast-close" 
                          aria-label="Close"
                          onClick={()=> this.props.closeToast()}>
                  </button>
                </div> : null
        )

    }
}

export default NotificationToast;