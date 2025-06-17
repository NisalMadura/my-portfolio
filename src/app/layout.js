// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "Nisal's Portfolio",
  description: "Crafted with Next.js & TailwindCSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
