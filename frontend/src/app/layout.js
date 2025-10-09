import "./globals.css";

import { Montserrat } from "next/font/google";

import MainProvider from "@/contexts/MainProvider";
import ConditionalHeader from "@/components/layout/ConditionalHeader";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todolist",
  description: "Simple todo tracker.",
};

export default function RootLayout({ children }) {
    return (
        <MainProvider>
            <html lang="en">
                <body
                    className={`${montserrat.className} antialiased`}
                >
                    <ConditionalHeader />
                    {children}
                </body>
            </html>
        </MainProvider>
    );
}
