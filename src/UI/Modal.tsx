import React from "react";

type ModalProps = {
    open: boolean;
    children: React.ReactNode;
};
const Modal: React.FC<ModalProps> = ({ open, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-4 rounded">{children}</div>
        </div>
    );
}

export default Modal;