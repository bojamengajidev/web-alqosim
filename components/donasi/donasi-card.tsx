import Image from "next/image";
import Link from "next/link";
import { MessageCircle, TriangleAlert } from "lucide-react";

import { bankList } from "@/lib/bank";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BankItem from "./bank-item";

export default function DonasiCard() {
  return (
    <Card className="overflow-hidden border-border/60 shadow-soft">
      <CardHeader className="border-b border-border/60 bg-muted/40">
        <Badge variant="soft" className="w-fit">
          Donasi Online
        </Badge>
        <CardTitle>Salurkan kebaikan Anda</CardTitle>
        <CardDescription>
          Pilih metode donasi yang paling mudah. Setelah transfer, mohon
          konfirmasi bukti transfer kepada admin.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        <Tabs defaultValue="transfer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transfer">Transfer Bank</TabsTrigger>
            <TabsTrigger value="qris">QRIS</TabsTrigger>
          </TabsList>

          <TabsContent value="transfer" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Silakan transfer ke salah satu rekening berikut.
            </p>

            <div className="space-y-3">
              {bankList.map((bank) => (
                <BankItem key={bank.id} bank={bank} />
              ))}
            </div>

            <Alert variant="warning">
              <TriangleAlert className="size-4" />
              <AlertTitle>Perhatian</AlertTitle>
              <AlertDescription>
                Setelah melakukan donasi, dimohon untuk melakukan konfirmasi
                dengan mengirim bukti transfer melalui WhatsApp Admin.
              </AlertDescription>
            </Alert>

            <Button asChild variant="outline" className="w-full rounded-full">
              <Link
                href="https://api.whatsapp.com/send/?phone=6285156245768&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4" />
                Konfirmasi via WhatsApp
              </Link>
            </Button>
          </TabsContent>

          <TabsContent value="qris" className="space-y-4">
            <div className="flex justify-center rounded-xl border border-border/60 bg-background p-4">
              <Image
                src="/images/qris.png"
                alt="Kode QRIS donasi Masjid Muhammad Al Qosim"
                width={640}
                height={1280}
                sizes="(min-width: 640px) 320px, 80vw"
                className="h-auto w-full max-w-xs object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Gunakan aplikasi e-wallet atau mobile banking apa saja untuk
              memindai QRIS di atas.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
