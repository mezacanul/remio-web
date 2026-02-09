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
            sm: "text-base",
            md: "text-xl",
            lg: "text-2xl",
        },
        gap: {
            sm: "gap-1",
            md: "gap-2",
            lg: "gap-2",
        },
    };
    return (
        <div
            className={`flex ${sizeClass.gap[size]} items-center`}
        >
            <span
                className={`${sizeClass.icon[size]} text-remiu-secondary`}
            >
                <FaMartiniGlassEmpty />
            </span>
            <h1
                className={`${sizeClass.text[size]} font-bold text-remiu-primary dark:text-remiu-primary`}
            >
                REMIU
            </h1>
        </div>
    );
}
