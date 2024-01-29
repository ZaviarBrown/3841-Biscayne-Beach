import { useRef, useState, useContext, createContext, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProviderProps {
    children: React.ReactNode;
}

interface ModalContextType {
    modalRef: React.RefObject<HTMLDivElement>;
    modalContent: React.ReactNode | null;
    isOpen: boolean;
    bgColor: string;
    setBgColor: React.Dispatch<React.SetStateAction<string>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<
        React.SetStateAction<React.ReactNode | null>
    >;
    setOnModalClose: React.Dispatch<React.SetStateAction<(() => void) | null>>;
    setOnModalSubmit: React.Dispatch<React.SetStateAction<(() => void) | null>>;
    closeModal: () => void;
    submitModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider: React.FC<ModalProviderProps> = ({
    children,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [bgColor, setBgColor] = useState("white");
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(
        null
    );
    const [onModalClose, setOnModalClose] = useState<(() => void) | null>(null);
    const [onModalSubmit, setOnModalSubmit] = useState<(() => void) | null>(
        null
    );

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => setModalContent(null), 300);
        if (typeof onModalClose === "function") {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const submitModal = () => {
        setIsOpen(false);
        setTimeout(() => setModalContent(null), 300);
        if (typeof onModalSubmit === "function") {
            setOnModalSubmit(null);
            onModalSubmit();
        }
    };

    const contextValue = {
        modalRef,
        modalContent,
        isOpen,
        bgColor,
        setIsOpen,
        setBgColor,
        setModalContent,
        setOnModalClose,
        setOnModalSubmit,
        closeModal,
        submitModal,
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
};

export const Modal = () => {
    const { isOpen, setIsOpen, modalRef, modalContent, closeModal, bgColor } =
        useContext(ModalContext) as ModalContextType;

    useEffect(() => {
        if (modalContent) {
            setIsOpen(true);
        }
    }, [modalContent, setIsOpen]);

    if (!modalRef || !modalRef.current || !modalContent) return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                isOpen ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
        >
            <div
                className="fixed inset-0 bg-black bg-opacity-70"
                onClick={closeModal}
            />
            <div
                className={`absolute m-5 flex flex-col rounded-2xl bg-${bgColor} ${
                    isOpen ? "translate-y-0" : "-translate-y-20"
                } transition-transform duration-500`}
            >
                {modalContent}
            </div>
        </div>,
        modalRef.current
    );
};

export const useModalContext = () =>
    useContext(ModalContext) as ModalContextType;
