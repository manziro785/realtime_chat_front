import { Hash, Menu } from "lucide-react";

export default function NoChat({ setShowSidebar }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-4">
      <button
        onClick={() => setShowSidebar(true)}
        className="lg:hidden absolute top-4 left-4 p-2 hover:bg-[#2b2d31] rounded transition"
      >
        <Menu className="w-6 h-6" />
      </button>
      <Hash className="w-16 h-16 sm:w-20 sm:h-20 mb-4" />
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
        Select a channel to start
      </h2>
      <p className="text-xs sm:text-sm text-center">
        Choose a channel from the sidebar
      </p>
    </div>
  );
}
