
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
 
export function Markdown({ children }: { children: string }) {
  return (
    <div
      className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400
        [&>*:first-child]:mt-0
        [&_h2]:mb-2 [&_h2]:mt-10 [&_h2]:text-sm [&_h2]:font-medium [&_h2]:text-neutral-900 dark:[&_h2]:text-neutral-100
        [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-[13px] [&_h3]:font-medium [&_h3]:text-neutral-900 dark:[&_h3]:text-neutral-100
        [&_p]:mb-4
        [&_strong]:font-medium [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100
        [&_a]:underline [&_a]:transition-colors hover:[&_a]:text-neutral-900 dark:hover:[&_a]:text-neutral-100
        [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-4
        [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-4
        [&_li]:marker:text-neutral-300 dark:[&_li]:marker:text-neutral-700
        [&_blockquote]:mb-4 [&_blockquote]:border-l [&_blockquote]:border-neutral-200 [&_blockquote]:pl-4 [&_blockquote]:italic dark:[&_blockquote]:border-neutral-800
        [&_hr]:my-10 [&_hr]:border-neutral-200 dark:[&_hr]:border-neutral-800
        [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:text-neutral-900 dark:[&_code]:text-neutral-100
        [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-neutral-200 [&_pre]:p-4 dark:[&_pre]:border-neutral-800
        [&_pre_code]:text-neutral-500 dark:[&_pre_code]:text-neutral-400"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
 