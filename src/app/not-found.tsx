"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU } from "./(features)/sidebar/sidebar-content-data";


export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-24 sm:px-6">
      <p className="text-sm text-accent-muted">
        xandre@sh:~ $ <span className="text-accent">cd {pathname}</span>
      </p>

      <p className="mt-4 text-sm">
        <span className="text-negative">bash:</span>{" "}
        <span className="text-text-primary">cd: {pathname}:</span>{" "}
        <span className="text-text-secondary">No such file or directory</span>
      </p>

      <div className="mt-8 text-sm leading-7">
        <p className="text-accent-muted"># directories that do exist:</p>
        {SIDEBAR_MENU.map((item, i) => (
          <p key={item.text}>
            <span className="text-accent-muted">
              {i === SIDEBAR_MENU.length - 1 ? "└──" : "├──"}
            </span>{" "}
            <Link
              href={item.href ?? "/"}
              className="lowercase text-text-secondary transition-colors hover:text-accent"
            >
              {item.text}/
            </Link>
          </p>
        ))}
      </div>

      <p className="mt-10 text-sm">
        <Link
          href="/"
          className="text-accent transition-colors hover:text-accent-hover"
        >
          cd ~
        </Link>
        <span className="cursor-block ml-2" aria-hidden="true" />
      </p>

      <p className="mt-12 text-xs text-text-secondary">
        <span className="text-accent-muted">process exited 127</span>
        {" · "}command not found
      </p>
    </div>
  );
}
