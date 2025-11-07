"use client";

import { useRouter,usePathname } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

   // Pages where back button should appear
  const showBack = pathname !== "/" && pathname !== "/footer";

  if (!showBack) return null;

  return (
    <div className="p-0">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-gray-800 font-semibold  hover:text-gray-600 hover:text-sm px-4 py-2 rounded-lg shadow-md transition"
      >
        <FiArrowLeft size={20} />
        <span>  Back</span>
      </button>
    </div>
  );
}
