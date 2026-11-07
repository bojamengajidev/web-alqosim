import { Fragment, type ReactNode } from "react";
import Image from "next/image";

import { getStrapiMediaUrl } from "@/lib/strapi";
import type {
  StrapiBlockNode,
  StrapiBlocksContent,
  StrapiInlineNode,
  StrapiListNode,
} from "@/lib/strapi.d";

function isSafeUrl(url: string) {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url);
}

function renderInline(nodes?: StrapiInlineNode[]): ReactNode {
  if (!nodes || nodes.length === 0) return null;

  return nodes.map((node, index) => {
    if (node.type === "link") {
      const href = isSafeUrl(node.url) ? node.url : "#";
      const isExternal = /^https?:\/\//i.test(href);

      return (
        <a
          key={index}
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {renderInline(node.children)}
        </a>
      );
    }

    let content: ReactNode = node.text;

    if (node.code) content = <code>{content}</code>;
    if (node.bold) content = <strong>{content}</strong>;
    if (node.italic) content = <em>{content}</em>;
    if (node.underline) content = <u>{content}</u>;
    if (node.strikethrough) content = <del>{content}</del>;

    return <Fragment key={index}>{content}</Fragment>;
  });
}

function renderList(node: StrapiListNode, key: string | number) {
  const Tag = node.format === "ordered" ? "ol" : "ul";

  return (
    <Tag key={key}>
      {node.children.map((child, index) =>
        child.type === "list" ? (
          renderList(child, index)
        ) : (
          <li key={index}>{renderInline(child.children)}</li>
        ),
      )}
    </Tag>
  );
}

function renderBlock(block: StrapiBlockNode, index: number): ReactNode {
  switch (block.type) {
    case "paragraph":
      return <p key={index}>{renderInline(block.children)}</p>;

    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return <Tag key={index}>{renderInline(block.children)}</Tag>;
    }

    case "quote":
      return <blockquote key={index}>{renderInline(block.children)}</blockquote>;

    case "code":
      return (
        <pre key={index}>
          <code>
            {block.children
              .map((child) => (child.type === "text" ? child.text : ""))
              .join("")}
          </code>
        </pre>
      );

    case "list":
      return renderList(block, index);

    case "image": {
      const src = getStrapiMediaUrl(block.image);
      if (!src) return null;

      return (
        <figure key={index}>
          <Image
            src={src}
            alt={block.image.alternativeText ?? ""}
            width={block.image.width || 1200}
            height={block.image.height || 800}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full rounded-lg border border-border/60"
          />
          {block.image.caption ? (
            <figcaption>{block.image.caption}</figcaption>
          ) : null}
        </figure>
      );
    }

    default:
      return null;
  }
}

export function ArticleContent({ content }: { content?: StrapiBlocksContent | null }) {
  if (!content || content.length === 0) return null;

  return <>{content.map((block, index) => renderBlock(block, index))}</>;
}
