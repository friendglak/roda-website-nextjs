import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roda - Financiamos la movilidad eléctrica en LatAm",
  description: "Roda ayuda a los trabajadores de la economía digital y a los repartidores de última milla a moverse más rápido, aumentar sus ingresos y acceder a crédito para adquirir vehículos eléctricos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceMono.variable}`}>
      <head>
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

