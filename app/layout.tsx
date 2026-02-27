import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/src/components/Providers";
import AuthMiddleware from "@/src/components/AuthMiddleware";
import SideMenu from "@/src/components/SideMenu";
import { ReduxProvider } from "@/src/store/provider";
import { ToastContainer } from "react-toastify";

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
                {/* <Providers> */}
                <ReduxProvider>
                    <AuthMiddleware>
                        <ToastContainer />
                        <main className="h-full">
                            {children}
                        </main>
                        <SideMenu />
                    </AuthMiddleware>
                </ReduxProvider>
                {/* </Providers> */}
            </body>
        </html>
    );
}
