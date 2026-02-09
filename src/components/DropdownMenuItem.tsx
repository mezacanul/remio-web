type DropdownMenuItemProps = {
    title: string;
    icon?: React.ReactNode;
    onClick: () => void;
};

export default function DropdownMenuItem({
    title,
    icon,
    onClick,
}: DropdownMenuItemProps) {
    return (
        <div className="cursor-pointer" onClick={onClick}>
            <h1 className="font-bold">{title}</h1>
        </div>
    );
}
