import Link from "next/link";
import { HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GradientButton() {
  return (
    <Button
      asChild
      variant="accent"
      size="sm"
      className="hidden rounded-full sm:inline-flex"
    >
      <Link href="/wakaf/peluang-jariyah">
        <HeartHandshake className="size-4" />
        Wakaf
      </Link>
    </Button>
  );
}
