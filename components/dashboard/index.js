import Tabs from "./tabs";
import Sidebar from "./sidebar";

export default function Library() {
  return (
    <div className="flex gap-8 px-2 md:pl-0 justify-center xl:justify-start">
      <main className="w-[700px]">
        <Tabs />
      </main>
      <aside className="hidden xl:block w-[448px]">
        <Sidebar />
      </aside>
    </div>
  );
}
