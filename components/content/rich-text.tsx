import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Article } from "@/components/craft";
import { cn } from "@/lib/utils";
import { isHtmlContent } from "@/lib/strapi";

interface RichTextProps {
  content?: string | null;
  className?: string;
}

/**
 * Renders article content from Strapi.
 *
 * Strapi's default rich text editor stores Markdown, while some editors
 * (e.g. CKEditor) store HTML. Both formats are supported.
 */
export function RichText({ content, className }: RichTextProps) {
  if (!content?.trim()) return null;

  if (isHtmlContent(content)) {
    return (
      <Article
        className={cn("prose max-w-none", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Article className={cn("prose max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Article>
  );
}
