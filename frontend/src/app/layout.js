import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import MainProvider from "@/contexts/MainProvider";

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
                <Header />
                    {children}
                </body>
            </html>
        </MainProvider>
    );
}
