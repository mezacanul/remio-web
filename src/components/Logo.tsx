import { FaMartiniGlassEmpty } from "react-icons/fa6";

export default function Logo({
    size,
}: {
    size: "sm" | "md" | "lg";
}) {
    const sizeClass = {
        text: {
            sm: "text-xl",
            md: "text-2xl",
            lg: "text-3xl",
        },
        icon: {
            sm: "text-lg",
            md: "text-xl",
            lg: "text-2xl",
        },
    };
    return (
        <div className="flex gap-2 items-center">
            <span className={`${sizeClass.icon[size]} text-purple-700 dark:text-white`}>
                <FaMartiniGlassEmpty />
            </span>
            <h1
                className={`${sizeClass.text[size]} font-bold text-purple-700 dark:text-white`}
            >
                REMIU
            </h1>
        </div>
    );
}
