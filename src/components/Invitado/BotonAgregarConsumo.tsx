type BotonAgregarConsumoProps = {
    title: string;
    onClick: () => void;
};

export default function BotonAgregarConsumo({
    title,
    onClick,
}: BotonAgregarConsumoProps) {
    return (
        <button
            onClick={onClick}
            className="bg-remiu-primary px-4 flex items-center justify-center border-2 border-remiu-primary p-2 rounded-md"
        >
            <p className="text-white font-bold">{title}</p>
        </button>
    );
}
