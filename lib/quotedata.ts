const quotesData = [
  {
    source: "dari Abu Hurairah radhiyallahu 'anhu,",
    arabic:
      "وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    translation:
      "Siapa yang menempuh jalan untuk mencari ilmu, maka Allah akan mudahkan baginya jalan menuju surga.",
    reference: "HR. Muslim no. 2699",
  },
  {
    source: "dari Mu'awiyah radhiyallahu 'anhu,",
    arabic:
      "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
    translation:
      "Barangsiapa yang Allah kehendaki kebaikan baginya, maka Allah akan pahamkan dia dalam urusan agama.",
    reference: "HR. Bukhari no.71 & Muslim no.98",
  },
   {
    source: "Dari Abu ‘Amr—ada yang menyebut pula Abu ‘Amrah—Sufyan bin ‘Abdillah radhiyallahu ‘anhu, ia berkata,",
    arabic:"عَنْ أَبِيْ عَمْرٍو، وَقِيْلَ، أَبِيْ عَمْرَةَ سُفْيَانَ بْنِ عَبْدِ اللهِ رَضِيَ اللهُ عَنْهُ قَالَ: قُلْتُ يَارَسُوْلَ اللهِ قُلْ لِيْ فِي الإِسْلامِ قَوْلاً لاَ أَسْأَلُ عَنْهُ أَحَدَاً غَيْرَكَ؟ قَالَ: “قُلْ آمَنْتُ باللهِ ثُمَّ استَقِمْ” رَوَاهُ مُسْلِمٌ",
    translation:
      "Aku berkata: Wahai Rasulullah katakanlah kepadaku suatu perkataan dalam Islam yang aku tidak perlu bertanya tentangnya kepada seorang pun selainmu.” Beliau bersabda, “Katakanlah: aku beriman kepada Allah, kemudian istiqamahlah.",
    reference: "HR. Muslim no.38",
  },
  {
    source: "Utsman bin ‘Affan radhiyallahu ‘anhu berkata bahwa Rasulullah shallallahu ‘alaihi wa sallam bersabda,",
    arabic: "عَنْ عُثْمَانَ بْنِ عَفَّانَ – رَضِيَ اللهُ عَنْهُ – ، قَالَ : قَالَ رَسُوْلُ اللهِ – صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ – : (( خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ )) رَوَاهُ البُخَارِيُّ",
    translation:
      "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya.",
    reference: "HR. Bukhari no.5027",
  },
{
    source: "Dari ‘Abdullah bin ‘Amr bin Al ‘Ash, Rasulullah shallallahu ‘alaihi wa sallam bersabda,",
    arabic: "صَوْمُ ثَلاَثَةِ أَيَّامٍ صَوْمُ الدَّهْرِ كُلِّهِ",
    translation:"Puasa pada tiga hari setiap bulannya adalah seperti puasa sepanjang tahun.",
    reference: "HR. Bukhari no.1979",
}
  
];

export const getQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  return quotesData[randomIndex];
};

export default quotesData;
