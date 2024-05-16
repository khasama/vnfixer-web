import Chat from "./components/ChatForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Providers } from "./redux/provider";

export const metadata = {
  title: "VNFIXER | Home",
  description: "Nền tảng hỗ trợ sửa chữa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-[#ffff]">
            <Navbar />
            {children}
            <Chat></Chat>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
