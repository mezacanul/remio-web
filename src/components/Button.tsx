export default function Button({
    title,
    onClick,
    disabled,
}: {
    title: string;
    onClick: () => void;
    disabled: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full disabled:opacity-50 p-2 rounded-md text-center bg-purple-700 text-white font-bold"
            disabled={disabled}
        >
            {title}
        </button>
    );
}
