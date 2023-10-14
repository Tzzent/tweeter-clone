import AuthModal from "../modals/AuthModal";
import Footer from "./Footer";
import Header from "./header/Header";

interface LayoutProps {
  children: React.ReactNode,
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <>
      <AuthModal />
      <div
        className="
        flex
        flex-col
        min-h-screen
        relative
        "
      >
        <Header />
        <main
          className="
          mt-14
          flex-1
          h-full
          w-full
          "
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
