import TopNav from "./TopNav";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <TopNav />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
