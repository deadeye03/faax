// app/(client)/layout.js
import NavBar from "@/components/NavBar";
import Footer from "@/components/Desktop/Footer";
import { Toaster } from "react-hot-toast";
export default function ClientLayout({ children }) {
  return (
    <>
      <nav className="bg-slate-100 w-full z-[100] px-2 md:px-6 lg:px-10 xl:px-20 2xl:px-48 fixed top-0 left-0 text-black">
        <NavBar />
      </nav>
      <main className="mt-12 md:mt-14 bg-white text-black">
      <Toaster position="top-center" reverseOrder={false} />
        {children}
        </main>
      <Footer />
    </>
  );
}