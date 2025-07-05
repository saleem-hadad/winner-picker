import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawalSans = Tajawal({
  variable: "--font-geist-sans",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Winner Picker",
  description: "Winner Picker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${tajawalSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
