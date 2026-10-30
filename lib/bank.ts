export interface Bank {
  id: string;
  title: string;
  name: string;
  rekening: string;
  atasNama: string;
}

export const bankList: Bank[] = [
  {
    id: "bca",
    title: "Rekening Wakaf Jariyah",
    name: "Bank Central Asia Syariah (BCA Syariah)",
    rekening: "0579898990",
    atasNama: "Masjid Muhammad Al Qosim",
  },
  {
    id: "bri",
    title: "Rekening Operasional Dakwah",
    name: "Bank Rakyat Indonesia (BRI)",
    rekening: "591401020771536",
    atasNama: "Kajian Boja Mengaji",
  },
];
