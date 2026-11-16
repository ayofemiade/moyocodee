import Link from "next/link";
import { breadcrumbs, JsonLd } from "@/lib/seo";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. The last item is the current page. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-text">
                    {it.name}
                  </span>
                ) : (
                  <Link href={it.path} className="underline-offset-4 transition hover:text-gold hover:underline">
                    {it.name}
                  </Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbs(items)} />
    </>
  );
}
