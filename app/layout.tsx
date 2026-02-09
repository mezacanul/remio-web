import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/src/components/Providers";
import AuthMiddleware from "@/src/components/AuthMiddleware";
import SideMenu from "@/src/components/SideMenu";

export const metadata: Metadata = {
    title: "Remiu App",
    description: "Divide tus cuentas y consumos facilmente",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased bg-gray-100 dark:bg-gray-950 position-relative`}
            >
                <Providers>
                    <AuthMiddleware>
                        <main className="h-full">
                            {children}
                        </main>
                        <SideMenu />
                    </AuthMiddleware>
                </Providers>
            </body>
        </html>
    );
}
