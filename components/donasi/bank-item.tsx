"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Bank } from "@/lib/bank";

export default function BankItem({ bank }: { bank: Bank }) {
  const copyRekening = async () => {
    try {
      await navigator.clipboard.writeText(bank.rekening);

      toast.success("Berhasil disalin", {
        description: `Rekening ${bank.name}`,
        duration: 2000,
      });
    } catch {
      toast.error("Gagal menyalin rekening");
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {bank.title}
        </p>
        <p className="text-sm font-semibold text-foreground">{bank.name}</p>
        <p className="font-mono text-base font-semibold tracking-wide text-foreground">
          {bank.rekening}
        </p>
        <p className="text-xs text-muted-foreground">a.n. {bank.atasNama}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={copyRekening}
        className="shrink-0 rounded-full"
        aria-label={`Salin nomor rekening ${bank.name}`}
      >
        <Copy className="size-3.5" />
        Salin
      </Button>
    </div>
  );
}
