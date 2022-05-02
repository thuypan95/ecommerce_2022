import React from 'react';
import ReactDOM from 'react-dom';
import classes from './PortalSearch.module.css';

const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />
}
const ModalOverlay = props => {
    const modalStyle = {
        position: "fixed",
        top: props.top,
        width: props.width,
        left: props.left,
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: '14px',
        boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)',
        zIndex: 30,
        animation: 'slide-down 300ms ease-out forwards'
    };
    return <div style={modalStyle} className={classes.modal}>
        <div className={classes.content}>{props.children} </div>
    </div>
}
const portalElement = document.getElementById('overlays');
const PortalSearch = (props) => {
    return <React.Fragment>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay top={props.top} left={props.left} width={props.width}>
            {props.children}
        </ModalOverlay>, portalElement)}
    </React.Fragment>
}
export default PortalSearch;