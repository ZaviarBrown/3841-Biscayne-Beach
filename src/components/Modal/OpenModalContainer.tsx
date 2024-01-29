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
    const { setModalContent, setBgColor } = useModalContext();

    const handleClick = () => {
        setModalContent(modalComponent);
        setBgColor("transparent");
    };

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    );
}
