// Define the menu items
export type MenuItem = {
  label: string;
  href: string;
  items?: Array<{ label: string; href: string }>;
};

export const mainMenu: MenuItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  {
    label: "Kegiatan",
    href: "/kegiatan",
    items: [{ label: "Program", href: "/kegiatan" },{ label: "Jadwal Kajian", href: "/jadwal-kajian" }],
  },
  { label: "Blog", href: "/posts" },
];

export const contentMenu: MenuItem[] = [
  { label: "Categories", href: "/posts/categories" },
  { label: "Tags", href: "/posts/tags" },
  { label: "Authors", href: "/posts/authors" },
];
