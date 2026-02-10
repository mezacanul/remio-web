import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

type HeaderProps = {
    title: string;
    onBack: () => void;
};

export default function Header({
    title,
    onBack,
}: HeaderProps) {
    const navigation = useRouter();
    return (
        <div className="flex gap-2 items-center">
            <span onClick={onBack}>
                <FaArrowLeft size={20} />
            </span>
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}
