import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./component/nav/NavBar";
import Footer from "./component/footer/Footer";
import { CartProvider } from "@/providers/CartProviders";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/actions/getCurrentUser";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E-shop",
  description: "Ecommerce app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  console.log("currentUser <<<<", currentUser);
  return (
    <html lang="en">
      <body className={`${poppins.className}text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85",
              color: "#fff",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex-grow ">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
//https://chatgpt.com/share/681cbb46-1a58-8002-9a49-0c1e9f9b1789
//https://chatgpt.com/share/681cbb70-0d30-8001-92a8-90355079e74e
