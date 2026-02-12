type ButtonSmallProps = {
    title: string;
    onClick: () => void;
    disabled?: boolean;
};

export default function ButtonSmall({
    title,
    onClick,
    disabled,
}: ButtonSmallProps) {
    const disabledClass = disabled ? "opacity-50" : "";
    return (
        <button
            onClick={onClick}
            className={`bg-remiu-primary text-center border-2 border-remiu-primary py-1 px-1 rounded-md ${disabledClass}`}
            disabled={disabled}
        >
            <p className="text-white text-xl font-bold">
                {title}
            </p>
        </button>
    );
}
