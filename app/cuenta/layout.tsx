export default function CuentaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>Cuenta layout</h1>
            {children}
        </div>
    );
}
