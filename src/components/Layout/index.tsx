import Header from "./Header";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col px-6 h-screen">
            <Header />
            <main className="h-full">
                {children}
            </main>
        </div>
    );
}
