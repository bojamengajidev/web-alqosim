"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Author, Category, Tag } from "@/lib/wordpress.d";
import { ClientOnly } from "../utils/client-only";

interface FilterPostsProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
}

export function FilterPosts({
  authors,
  tags,
  categories,
  selectedAuthor,
  selectedTag,
  selectedCategory,
}: FilterPostsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (type: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("page");
    newParams.delete("search");
    if (value === "all") {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }

    router.push(`/posts?${newParams.toString()}`);
    router.refresh();
  };

  const handleResetFilters = () => {
    router.push("/posts");
  };

  const hasTags = tags.length > 0;
  const hasCategories = categories.length > 0;
  const hasAuthors = authors.length > 0;

  return (
    <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Tag</Label>
        <ClientOnly>
          <Select
            value={selectedTag || "all"}
            onValueChange={(value) => handleFilterChange("tag", value)}
          >
            <SelectTrigger disabled={!hasTags} aria-label="Filter tag">
              {hasTags ? <SelectValue placeholder="Semua tag" /> : "Tag belum tersedia"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tag</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id.toString()}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ClientOnly>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Kategori</Label>
        <ClientOnly>
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger disabled={!hasCategories} aria-label="Filter kategori">
              {hasCategories ? (
                <SelectValue placeholder="Semua kategori" />
              ) : (
                "Kategori belum tersedia"
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ClientOnly>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Penulis</Label>
        <ClientOnly>
          <Select
            value={selectedAuthor || "all"}
            onValueChange={(value) => handleFilterChange("author", value)}
          >
            <SelectTrigger disabled={!hasAuthors} aria-label="Filter penulis">
              {hasAuthors ? (
                <SelectValue placeholder="Semua penulis" />
              ) : (
                "Penulis belum tersedia"
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Penulis</SelectItem>
              {authors.map((author) => (
                <SelectItem key={author.id} value={author.id.toString()}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ClientOnly>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="hidden text-xs text-muted-foreground md:block">
          &nbsp;
        </span>
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="rounded-xl"
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
