import React from 'react';
import RoundsMode  from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'
import PopUpModal from './PopUpModal.js'
import NotificationToast from './NotificationToast.js';

class RoundsPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: RoundsMode.ROUNDSTABLE,
                          deleteToastOpen: false,
                          deleteModalOpen: false,
                          deleteId: -1,
                          editId: -1};        
    }


    deleteRound = () => {
        this.props.deleteRound(this.state.deleteId);
        this.setState({deleteToastOpen: true});
        this.setState({deleteModalOpen: false});
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }
    closeToast = () => {
        this.setState({deleteToastOpen: false});
    }

    closeModal = () => {
        this.setState({deleteModalOpen: false}); 
    }
    initiateEditRound = (val) => {
        this.setState({editId: val,
                       mode: RoundsMode.EDITROUND}, 
                       this.props.toggleModalOpen);
    }
    
    initiateDeleteRound = (val) => {
        this.setState({deleteId: val,
                       deleteModalOpen: true}); 
    }

    render() {
        switch (this.state.mode) {
        case RoundsMode.ROUNDSTABLE: 
            return (
                <>
                    <RoundsTable rounds={this.props.rounds}
                                initiateDeleteRound={this.initiateDeleteRound}
                                deleteRound={this.props.deleteRound} 
                                deleteId={this.state.deleteId}
                                initiateEditRound= {this.initiateEditRound}
                                updateRound= {this.props.updateRound}
                                setMode={this.setMode} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    <FloatingButton
                        icon="calendar"
                        label={"Log Round"}
                        menuOpen={this.props.menuOpen}
                        action={()=>this.setState({mode: RoundsMode.LOGROUND},
                                    this.props.toggleModalOpen)} />
                    <PopUpModal deleteModalOpen={this.state.deleteModalOpen}
                                deleteId={this.state.deleteId}
                                closeModal={this.closeModal}
                                deleteRound={this.deleteRound}></PopUpModal>

                    <NotificationToast deleteToastOpen={this.state.deleteToastOpen}
                                        closeToast={this.closeToast}
                                        deleteId={this.state.deleteId}></NotificationToast>
            </>
            );
        case RoundsMode.LOGROUND:
            return (
            <RoundForm mode={this.state.mode}
                    roundData={null}
                    saveRound={this.props.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.EDITROUND:
            let i;
            for (i = 0; i < this.props.rounds.length; ++i) {
                if (this.props.rounds[i].roundNum === this.state.editId) {
                    //console.log(this.props.rounds[i].roundNum,this.state.editId,i);
                    break;
                }
            }
            //console.log(this.state.editId,i)
            return (
            <RoundForm mode={this.state.mode}
                editId = {this.state.editId}
                roundData={this.props.rounds[i]}
                saveRound={this.props.updateRound}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default RoundsPage;