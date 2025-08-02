import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-base">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      <Footer />
    </div>
  );
}
