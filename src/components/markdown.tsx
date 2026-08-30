import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div
      className="text-[15px] leading-relaxed text-text-secondary
        [&>*:first-child]:mt-0
        [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-mono [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-text-primary
        [&_h2]:before:mr-2 [&_h2]:before:text-accent-muted [&_h2]:before:content-['##']
        [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:font-mono [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-text-primary
        [&_h3]:before:mr-2 [&_h3]:before:text-accent-muted [&_h3]:before:content-['###']
        [&_p]:mb-4
        [&_strong]:font-semibold [&_strong]:text-text-primary
        [&_a]:text-accent-muted [&_a]:underline [&_a]:decoration-accent-muted/40 [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-accent
        [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-4
        [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-4
        [&_li]:marker:text-accent-muted
        [&_blockquote]:mb-4 [&_blockquote]:border-l-2 [&_blockquote]:border-accent-muted [&_blockquote]:pl-4 [&_blockquote]:text-text-secondary [&_blockquote]:italic
        [&_hr]:my-10 [&_hr]:border-dashed [&_hr]:border-border
        [&_code]:rounded-none [&_code]:bg-secondary-background [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-accent
        [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border [&_pre]:border-l-2 [&_pre]:border-l-accent-muted [&_pre]:bg-secondary-background [&_pre]:p-4
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-text-primary
        [&_table]:mb-4 [&_table]:w-full [&_table]:border-collapse [&_table]:font-mono [&_table]:text-[13px]
        [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left [&_th]:text-text-primary
        [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-1.5"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}