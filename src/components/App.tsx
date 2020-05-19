import React from 'react';
import styles from '../index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../common/components/AddModal'
interface State {
    hideModal: boolean
}
class App extends React.Component {
    state: State;
    constructor(props: any) {
        super(props);
        this.state = {
            hideModal: false
        }
    }

    _openAddModal = () => {
        this.setState({ hideModal: true })
    }

    onConfirm = () => {
        alert('confirme called');
        this.setState({ hideModal: false })
    }

    _onClose = () => {
        alert('close called');
        this.setState({ hideModal: false })
    }

    render() {
        const { hideModal } = this.state;
        return (
            <>
                {hideModal ? <AddModal onConfirm={this.onConfirm} onClose={this._onClose} /> : ""}
                <div className={styles.bottomRightAlign}>
                    <FontAwesomeIcon icon={faPlus} onClick={this._openAddModal} />
                </div>

            </>
        )
    }
}


export default App;