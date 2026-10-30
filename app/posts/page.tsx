import type { Metadata } from "next";

import {
  getAllAuthors,
  getAllCategories,
  getAllTags,
  getCategoryBySlug,
  getPostsPaginated,
  searchAuthors,
  searchCategories,
  searchTags,
} from "@/lib/wordpress";

import { Container, Section } from "@/components/craft";
import { EmptyState } from "@/components/shared/empty-state";
import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Artikel & Berita",
  description:
    "Baca artikel dan berita terbaru seputar kegiatan, kajian, dan informasi dari Masjid Muhammad Al Qosim.",
};

export const dynamic = "auto";
export const revalidate = 3600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { author, tag, category, page: pageParam, search } = params;

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;

  let categoryId = category;

  if (category && isNaN(Number(category))) {
    const cat = await getCategoryBySlug(category);
    categoryId = cat?.id?.toString();
  }

  const [postsResponse, authors, tags, categories] = await Promise.all([
    getPostsPaginated(page, postsPerPage, {
      author,
      tag,
      category: categoryId,
      search,
    }),
    search ? searchAuthors(search) : getAllAuthors(),
    search ? searchTags(search) : getAllTags(),
    search ? searchCategories(search) : getAllCategories(),
  ]);

  const { data: posts, headers } = postsResponse;
  const { total, totalPages } = headers;

  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <Badge variant="soft">Blog</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Artikel & Berita
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Baca artikel dan berita terbaru seputar kegiatan, kajian, dan
              informasi dari Masjid Muhammad Al Qosim dan Boja Mengaji.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-5">
            <SearchInput defaultValue={search} />
            <FilterPosts
              authors={authors}
              tags={tags}
              categories={categories}
              selectedAuthor={author}
              selectedTag={tag}
              selectedCategory={category}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? "artikel" : "artikel"} ditemukan
              {search ? ` untuk "${search}"` : ""}
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Artikel tidak ditemukan"
              description="Coba ubah kata kunci pencarian atau reset filter untuk melihat semua artikel."
            />
          )}

          {totalPages > 1 ? (
            <div className="flex justify-center py-6">
              <Pagination>
                <PaginationContent>
                  {page > 1 ? (
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPaginationUrl(page - 1)}
                      />
                    </PaginationItem>
                  ) : null}

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - page) <= 1
                      );
                    })
                    .map((pageNum, index, array) => {
                      const showEllipsis =
                        index > 0 && pageNum - array[index - 1] > 1;

                      return (
                        <div key={pageNum} className="flex items-center">
                          {showEllipsis ? (
                            <span className="px-2 text-muted-foreground">
                              ...
                            </span>
                          ) : null}
                          <PaginationItem>
                            <PaginationLink
                              href={createPaginationUrl(pageNum)}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        </div>
                      );
                    })}

                  {page < totalPages ? (
                    <PaginationItem>
                      <PaginationNext href={createPaginationUrl(page + 1)} />
                    </PaginationItem>
                  ) : null}
                </PaginationContent>
              </Pagination>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
