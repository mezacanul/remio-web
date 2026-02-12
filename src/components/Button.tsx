export default function Button({
    title,
    icon,
    onClick,
    disabled,
    w,
    textSize,
    py,
}: {
    title?: string;
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    w?: string;
    textSize?: "sm" | "base" | "lg" | "xl";
    py?: string;
}) {
    const widthClass = w ? `w-${w}` : "w-full";
    const paddingYClass = py ? `py-${py}` : "py-3";
    const textSizeClass = textSize
        ? `text-[${textSize}]`
        : "text-base";

    return (
        <button
            onClick={onClick}
            className={`px-2 ${widthClass} ${paddingYClass} ${textSizeClass} disabled:opacity-50 rounded-md text-center bg-remiu-primary text-white font-bold flex items-center justify-center`}
            disabled={disabled}
        >
            {icon && (
                <span className="text-white py-0">
                    {icon}
                </span>
            )}
            {title && (
                <span
                    className={`text-white ${
                        icon ? "pl-2" : ""
                    }`}
                >
                    {title}
                </span>
            )}
        </button>
    );
}
