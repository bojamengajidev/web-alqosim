"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import quotesData from "@/lib/quotedata";

export function QuotesRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % quotesData.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const quote = quotesData[index];

  return (
    <Card className="overflow-hidden border-border/60 bg-primary text-primary-foreground shadow-soft">
      <CardContent className="relative flex flex-col gap-4 p-6 sm:p-8">
        <Quote className="absolute right-6 top-6 size-10 text-primary-foreground/10" />

        <div key={index} className="animate-fade-in flex flex-col gap-4">
          <p className="text-sm italic leading-relaxed text-primary-foreground/70">
            {quote.source}
          </p>

          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-right text-xl leading-loose text-primary-foreground sm:text-2xl"
          >
            {quote.arabic}
          </p>

          <p className="text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
            {quote.translation}
          </p>

          <div>
            <Badge
              variant="outline"
              className="border-primary-foreground/25 text-primary-foreground/80"
            >
              {quote.reference}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
