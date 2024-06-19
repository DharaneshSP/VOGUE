import type { Metadata } from "next";
import "./globals.css";
import Footer from '@/components/footer'
//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VOGUE",
  description: "LIFESTYLE PARTNER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <body>
        {children}
        {/*<Footer/>*/}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
