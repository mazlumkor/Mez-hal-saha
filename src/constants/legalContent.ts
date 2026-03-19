export const LEGAL_CONTENT = {
  about: {
    title: "HAKKINDA",
    content: `
      Mez Halısaha Kompleksi, sporun ve dostluğun buluşma noktası olarak İstanbul Büyükçekmece'de hizmet vermektedir. 
      Modern tesisimiz, profesyonel standartlardaki zemin kalitesi, kesintisiz aydınlatma sistemi ve konforlu sosyal alanları ile futbolseverlere en iyi deneyimi sunmayı amaçlamaktadır.

      Vizyonumuz:
      Teknolojiyi sporla birleştirerek, rezervasyon süreçlerinden maç deneyimine kadar her aşamada dijital ve modern bir hizmet sunmak.

      Misyonumuz:
      Her yaştan sporcuya güvenli, temiz ve profesyonel bir ortam sağlayarak spor kültürünün yaygınlaşmasına katkıda bulunmak.

      Tesis Özellikleri:
      - Profesyonel Suni Çim Zemin
      - Gece Maçları İçin Yüksek Standartlı Aydınlatma
      - Modern Soyunma Odaları ve Duşlar
      - Kafeterya ve Sosyal Alanlar
      - 7/24 Güvenlik ve Otopark
    `
  },
  privacy: {
    title: "GİZLİLİK POLİTİKASI",
    content: `
      Mez Halısaha olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. 
      Bu politika, web sitemizi ve uygulamamızı kullandığınızda toplanan verilerin nasıl işlendiğini açıklar.

      1. Toplanan Veriler:
      Rezervasyon ve üyelik işlemleri sırasında adınız, soyadınız, telefon numaranız ve e-posta adresiniz gibi bilgiler toplanmaktadır.

      2. Verilerin Kullanımı:
      Toplanan bilgiler sadece rezervasyon yönetimi, üyelik doğrulaması ve size daha iyi hizmet sunabilmek amacıyla kullanılmaktadır.

      3. Veri Paylaşımı:
      Kişisel verileriniz, yasal zorunluluklar haricinde üçüncü şahıslarla kesinlikle paylaşılmamaktadır.

      4. Çerezler (Cookies):
      Sitemizde kullanıcı deneyimini artırmak amacıyla teknik çerezler kullanılmaktadır.
    `
  },
  terms: {
    title: "KULLANIM ŞARTLARI",
    content: `
      Mez Halısaha platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız:

      1. Rezervasyon:
      Yapılan rezervasyonlar tesis kurallarına tabidir. Belirlenen saatten en az 24 saat önce iptal edilmeyen rezervasyonlarda ücret iadesi yapılmayabilir.

      2. Tesis Kuralları:
      Tesis içerisinde diğer kullanıcıları rahatsız edecek davranışlardan kaçınılmalıdır. Tesis ekipmanlarına verilen zararlardan kullanıcı sorumludur.

      3. Güvenlik:
      Spor yaparken oluşabilecek yaralanmalardan tesisimiz sorumlu tutulamaz. Kullanıcılar kendi sağlık durumlarını gözeterek spor yapmalıdır.

      4. Üyelik:
      Üyelik bilgileri kişiye özeldir ve başkalarıyla paylaşılmamalıdır.
    `
  },
  clarification: {
    title: "AYDINLATMA METNİ",
    content: `
      6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, Mez Halısaha olarak veri sorumlusu sıfatıyla kişisel verilerinizi işlemekteyiz.

      İşleme Amaçları:
      - Rezervasyon süreçlerinin yürütülmesi
      - İletişim faaliyetlerinin sürdürülmesi
      - Hizmet kalitesinin artırılması ve analiz çalışmaları

      Veri Aktarımı:
      Kişisel verileriniz, kanunen yetkili kamu kurumları ve yargı mercileri dışında aktarılmamaktadır.

      Haklarınız:
      KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini isteme ve silinmesini talep etme haklarına sahipsiniz.
    `
  },
  distanceSelling: {
    title: "MESAFELİ SATIŞ SÖZLEŞMESİ",
    content: `
      Bu sözleşme, Mez Halısaha üzerinden yapılan dijital rezervasyon ve ödeme işlemlerini kapsar.

      1. Taraflar:
      Hizmet Sağlayıcı: Mez Halısaha (Türkoba Mah. Ezel Sk. No:21 Büyükçekmece/İstanbul)
      Alıcı: Platform üzerinden rezervasyon yapan kullanıcı.

      2. Hizmetin Konusu:
      Belirlenen tarih ve saatte halısaha kullanım hizmetinin sağlanmasıdır.

      3. İptal ve İade:
      - Maç saatine 24 saat kalaya kadar yapılan iptallerde tam iade yapılır.
      - 24 saatten az kalan sürelerde yapılan iptallerde tesisin insiyatifi doğrultusunda işlem yapılır.

      4. Ödeme:
      Ödemeler kredi kartı veya banka kartı ile güvenli ödeme altyapısı üzerinden tahsil edilir.
    `
  }
};

export type LegalType = keyof typeof LEGAL_CONTENT;
