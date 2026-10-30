import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { BookOpen, Heart, Users, HandCoins } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Belajar Al-Qur’an",
    desc: "Program pembelajaran terstruktur dan berkelanjutan",
  },
  {
    icon: Heart,
    title: "Sedekah Mudah",
    desc: "Salurkan kebaikan dengan proses yang cepat",
  },
  {
    icon: Users,
    title: "Komunitas",
    desc: "Bersama membangun generasi berakhlak",
  },
  {
    icon: HandCoins,
    title: "Transparan",
    desc: "Laporan donasi dapat diakses kapan saja",
  },
]

export default function FeatureCards() {
  return (
    <section className="py-12">
         <div className="grid grid-cols-4 gap-6">
        {features.map((item, i) => (
          <Card
            key={i}
            className="
              h-full
              rounded-2xl
              border
              hover:shadow-md
              transition
            "
          >
            <CardContent
              className="
                flex flex-col items-center
                text-center
                gap-4
                p-6
              "
            >
              <div
                className="
                  flex h-12 w-12 items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
