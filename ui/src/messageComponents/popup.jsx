import React from 'react'



function PopUp({ msg }) {


    const styles = {
        width: '100%',
        maxHeight: '50px',
        position: 'fixed',
        bottom: '6%',
        display: "flex",
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: '100'

    }
    const styleP = {
        height: '100%',
        minWidth: '100px',
        padding: "7px",
        background: "#fff",
        textAlign: 'center',
        textTransform: 'capitalize',
        border: '2px groove #000',
        borderRadius: '.5rem',
        fontWeight: '900',
        fontSize: '1rem',
        color: '#000',
    }


    return (
        <div style={styles}>
            <p style={styleP}>{msg}</p>
        </div>
    )
}

export default PopUp