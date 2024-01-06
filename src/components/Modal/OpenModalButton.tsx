import type { ReactNode } from "react";
import { useModalContext } from "~/context/ModalContext";

interface OpenModalButtonProps {
    modalComponent: ReactNode;
    buttonText: string;
    onModalSubmit: React.SetStateAction<(() => void) | null>;
    onModalClose: React.SetStateAction<(() => void) | null>;
    disabled?: boolean;
    className: string;
}

export default function OpenModalButton({
    modalComponent,
    buttonText,
    onModalSubmit,
    onModalClose,
    disabled,
    className,
}: OpenModalButtonProps) {
    const { setModalContent, setOnModalClose, setOnModalSubmit } =
        useModalContext();

    const handleClick = () => {
        if (onModalClose) setOnModalClose(() => onModalClose);
        if (onModalSubmit) setOnModalSubmit(() => onModalSubmit);
        setModalContent(modalComponent);
    };

    return (
        <button disabled={disabled} className={className} onClick={handleClick}>
            {buttonText}
        </button>
    );
}
