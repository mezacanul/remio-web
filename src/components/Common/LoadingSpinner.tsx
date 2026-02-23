import { ImSpinner2 } from "react-icons/im";

type SpinnerProps = {
    size?: "sm" | "md" | "lg" | "xl";
};

export default function LoadingSpinner({
    size = "sm",
}: SpinnerProps) {
    const sizeClass = {
        sm: "text-2xl",
        md: "text-3xl",
        lg: "text-4xl",
        xl: "text-5xl",
    };
    return (
        <span
            className={`${sizeClass[size]} p-2 animate-spin text-remiu-primary dark:text-white`}
        >
            <ImSpinner2 />
        </span>
    );
}
