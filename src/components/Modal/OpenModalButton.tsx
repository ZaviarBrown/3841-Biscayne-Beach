import { useModalContext } from "~/context/ModalContext";

interface OpenModalButtonProps {
    className: string;
    disabled?: boolean;
    buttonText: string;
    modalComponent: React.ReactNode;
    onModalClose?: React.SetStateAction<() => void>;
    onModalSubmit?: React.SetStateAction<() => void>;
}

export default function OpenModalButton({
    modalComponent,
    buttonText,
    onModalSubmit,
    onModalClose,
    disabled,
    className,
}: OpenModalButtonProps) {
    const {
        bgColor,
        setBgColor,
        setModalContent,
        setOnModalClose,
        setOnModalSubmit,
    } = useModalContext();

    const handleClick = () => {
        if (bgColor !== "white") setBgColor("white");
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
