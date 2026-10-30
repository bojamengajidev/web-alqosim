import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { HijriCalendar } from "@/components/calender/hijriyah-calender";
import { QuotesRotator } from "@/components/section/quotes";

export default function CalendarAndHadith() {
  return (
    <Section className="pt-0">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Kalender"
              title="Kalender & pengingat ibadah"
              description="Kalender hijriyah dilengkapi pengingat Ayyamul Bidh pada tanggal 13, 14, dan 15 setiap bulan hijriyah."
            />

            <div className="mt-6">
              <HijriCalendar />
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Gunakan kalender ini untuk membantu merencanakan puasa sunnah dan
              amalan lain di bulan hijriyah.
            </p>
          </div>

          <div>
            <SectionHeader
              eyebrow="Kutipan Hadits"
              title="Kumpulan Hadits Pilihan"
              description="Sesungguhnya sebaik-baik perkataan adalah Kitabullah (Al-Qur'an) dan sebaik-baik petunjuk adalah petunjuk Muhammad shallallahu 'alaihi wa sallam."
            />

            <div className="mt-6">
              <QuotesRotator />
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Menyajikan hadits-hadits shahih pilihan sebagai pengingat jiwa,
              semoga kita memperoleh pelajaran serta kemudahan dalam meneladani
              dan mengikuti beliau Shalallahu &apos;Alaihi Wasalam.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
