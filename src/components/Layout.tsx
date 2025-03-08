import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-gray-100 flex flex-col">
        <TopNav />
        <div className="flex-1 overflow-hidden p-6 border-t border-gray-300">
          {children}
        </div>
      </main>
    </div>
  );
}
