import { useModalContext } from "~/context/ModalContext";

interface OpenModalContainerProps {
    className: string;
    children: React.ReactNode;
    modalComponent: React.ReactNode;
}

export default function OpenModalContainer({
    children,
    className,
    modalComponent,
}: OpenModalContainerProps) {
    const { bgColor, setModalContent, setBgColor } = useModalContext();

    const handleClick = () => {
        if (bgColor !== "transparent") setBgColor("transparent");
        setModalContent(modalComponent);
    };

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    );
}
