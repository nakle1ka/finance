import "./MyModal.css"

const MyModal = ({ children, setStates, isClose }) => {

    if(isClose) {
        var [setState, setParam] = setStates
    }
    
    return (
        <>
            {isClose && (
                <div className="my-modal" onClick={() => setState(prev => ({ ...prev, [setParam]: false }))}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
            {!isClose && (
                <div className="my-modal" >
                    <div className="modal-content" >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default MyModal;