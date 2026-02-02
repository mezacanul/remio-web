import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/src/components/Providers";
import AuthMiddleware from "@/src/components/AuthMiddleware";

export const metadata: Metadata = {
    title: "Remiu - Cuentas claras, amistades largas",
    description: "Divide tus cuentas facilmente",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <Providers>
                    <AuthMiddleware>
                        {children}
                    </AuthMiddleware>
                </Providers>
            </body>
        </html>
    );
}
