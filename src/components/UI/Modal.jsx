import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, onClose, className=''}){
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if(open){
            //dialog.current.showModal();
            modal.showModal();
        }
        
        //Solution #1 to close the modal when open is false
        // else{
        //     dialog.current.close();
        // }

        //Solution #2 to use clean function 
        // return () => dialog.current.close();
        return () => modal.close();        

    }, [open]);

    return(
        createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>
        , document.getElementById('modal'))
    );
}