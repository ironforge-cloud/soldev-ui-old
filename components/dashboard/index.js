import Tabs from "./tabs";
import Sidebar from "./sidebar";

export default function Library() {
  return (
    <div className="flex gap-6 px-2 md:pl-0 justify-center">
      <main className="w-[700px]">
        <Tabs />
      </main>
      <aside className="hidden xl:block">
        <Sidebar />
      </aside>
    </div>
  );
}
