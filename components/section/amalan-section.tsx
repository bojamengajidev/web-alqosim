import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";

export default function ClosingHadith() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Badge
            variant="outline"
            className="border-primary-foreground/25 text-primary-foreground/80"
          >
            Hadits
          </Badge>

          <h2 className="text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
            Tiga Amal Jariyah Tak Terputus
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
            Dari Abu Hurairah radhiyallahu &apos;anhu, ia berkata bahwa
            Rasulullah shallallahu &apos;alaihi wa sallam bersabda,
          </p>

          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-xl leading-loose text-primary-foreground sm:text-2xl md:text-3xl"
          >
            إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ
            مِنْ صَدَقَةٍ جَارِيَةٍ وَعِلْمٍ يُنْتَفَعُ بِهِ وَوَلَدٍ صَالِحٍ
            يَدْعُو لَهُ
          </p>

          <p className="max-w-2xl text-sm italic leading-relaxed text-primary-foreground/80 sm:text-base">
            &ldquo;Apabila manusia telah meninggal dunia, maka terputuslah
            amalannya kecuali dari tiga perkara; sedekah jariyah, ilmu yang
            bermanfaat, atau anak shalih yang mendoakannya.&rdquo; (HR. Muslim)
          </p>
        </div>
      </Container>
    </Section>
  );
}
