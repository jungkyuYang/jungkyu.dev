"use client";

import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "./loading-indicator";
import DarkModeToggle from "./DarkModeToggle";

export const Navigation = () => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const searchParams = useSearchParams();
  const customUsername = searchParams.get("customUsername");

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          <Link
            href={
              "/" + (customUsername ? `?customUsername=${customUsername}` : "")
            }
            className="duration-200 !text-zinc-900 dark:!text-zinc-300 hover:!text-zinc-700 dark:hover:!text-zinc-100"
          >
            <GoArrowLeft className="w-6 h-6" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={
                "/projects" +
                (customUsername ? `?customUsername=${customUsername}` : "")
              }
              className="duration-200 !text-zinc-900 dark:!text-zinc-400 hover:!text-zinc-700 dark:hover:!text-zinc-100 relative block px-3 py-1"
            >
              <span className="inline-flex items-center">
                Projects <LoadingIndicator />
              </span>
            </Link>
            <Link
              href={
                "/contact" +
                (customUsername ? `?customUsername=${customUsername}` : "")
              }
              className="duration-200 !text-zinc-900 dark:!text-zinc-400 hover:!text-zinc-700 dark:hover:!text-zinc-100 relative block px-3 py-1"
            >
              <span className="inline-flex items-center">
                Contact <LoadingIndicator />
              </span>
            </Link>
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
