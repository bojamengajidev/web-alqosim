import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogCard() {
  return (
    <Card className="overflow-hidden border-border/60 shadow-soft">
      <CardHeader>
        <Badge variant="accent" className="w-fit">
          PPDB
        </Badge>
        <CardTitle>Penerimaan Peserta Didik Baru</CardTitle>
        <CardDescription>
          Informasi pendaftaran TK & SD Islam Boja Mengaji untuk tahun ajaran
          baru.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-xl border border-border/60 bg-muted">
          <Image
            src="/images/ppdb.webp"
            alt="Poster penerimaan peserta didik baru"
            width={720}
            height={1280}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full rounded-full">
          <Link href="/posts">
            Lihat Selengkapnya
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
