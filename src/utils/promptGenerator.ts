import { MediaCategory, PromptFormData } from '../types';

export const RAW_LKPD_TEMPLATE_PROMPT = `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern. Tugas Anda adalah buat gambar dengan mengubah isi LKPD yang saya lampirkan menjadi LKPD bergambar yang lebih menarik, modern, estetik, dan nyaman digunakan siswa tanpa mengurangi isi materi asli sedikit pun.

Buat tampilan LKPD dalam format A4 portrait dengan desain full color yang clean, edukatif, student friendly, dan profesional seperti workbook sekolah modern. Gunakan tata letak yang rapi dengan perpaduan teks, gambar, dan ruang kosong yang seimbang agar tidak terlalu padat dan tetap mudah dibaca siswa.

Tambahkan ilustrasi edukatif yang relevan dengan materi, ikon modern, elemen visual sederhana, highlight box, header menarik, dan variasi desain pada setiap halaman agar tidak monoton. Jika terdapat soal cerita, tambahkan ilustrasi kontekstual. Jika terdapat langkah kegiatan, ubah menjadi tampilan step visual yang lebih interaktif. Jika terdapat tabel atau latihan, ubah menjadi desain yang lebih modern dan menarik namun tetap jelas dibaca.

Sesuaikan desain, ilustrasi, dan tata letak dengan jenis aktivitas pada LKPD, sehingga setiap aktivitas terlihat lebih interaktif, kontekstual, dan sesuai dengan karakter pembelajaran yang digunakan.

Gunakan gaya visual modern, fun learning, semi infografis, dan workbook edukasi premium. Hindari desain terlalu ramai, seperti poster, atau ornamen berlebihan. Pastikan hasil akhir tetap fokus sebagai media belajar yang fungsional sekaligus estetik.

Hasil akhir harus langsung berupa desain LKPD lengkap yang siap cetak, beresolusi tinggi, dan terlihat seperti workbook pendidikan profesional.

Buat Gambar
Anda berperan sebagai guru profesional, perancang LKPD, dan ilustrator pendidikan yang mampu membuat LKPD menarik, edukatif, dan sesuai dengan karakter peserta didik.
Tugas Anda adalah membuat LKPD bergambar lengkap berdasarkan materi dan jenis/bentuk LKPD yang ditentukan oleh pengguna.

SPESIFIKASI DESAIN
Ukuran kertas : A4 (21 cm × 29,7 cm)
Orientasi : Portrait
Layout : rapi, proporsional, dan siap cetak
Gaya desain : ramah anak dan menarik
Warna : cerah, pastel, dan edukatif
Sesuaikan dengan jenjang : TK/SD/SMP/SMA 
Sisakan ruang untuk jawaban siswa
Gunakan ilustrasi edukatif seperlunya
Mudah dibaca dan hindari desain terlalu ramai

MATERI PEMBELAJARAN
ISI MATERI DI SINI :
[ TULIS DISINI ]

JENIS / BENTUK LKPD
Pilih atau isi sesuai kebutuhan, misalnya:
LKPD Observasi
LKPD Eksperimen
LKPD Eksplorasi
LKPD Berbasis Gambar
LKPD Cerita Bergambar
LKPD Mencocokkan
LKPD Menjodohkan
LKPD Pilihan Ganda
LKPD Benar/Salah
LKPD Isian
LKPD Studi Kasus
LKPD Investigasi
LKPD Pemecahan Masalah (HOTS)
LKPD Berbasis Proyek (PjBL)
LKPD Diskusi Kelompok
LKPD Analisis Data
LKPD Refleksi
LKPD Diagnostik
LKPD Pengayaan
LKPD Remedial
LKPD Proyek
LKPD Campuran
JENIS LKPD YANG DIINGINKAN :
[ TULIS DISINI ]



IDENTITAS LKPD
Nama : ________________________
Kelas : ________________________
Tanggal : ________________________
Nilai : 


TUGAS ANDA
Berdasarkan materi dan jenis LKPD yang dipilih:
Menyusun kegiatan LKPD sesuai bentuk yang diminta
Membuat soal/tugas berbasis gambar atau aktivitas
Membuat ilustrasi yang relevan dengan materi
Menyesuaikan tingkat kesulitan dengan jenjang
Menggunakan bahasa sederhana, komunikatif, dan mudah dipahami siswa

TUJUAN PEMBELAJARAN (Opsional)
[ TULIS DISINI ]
Tuliskan tujuan pembelajaran yang:
jelas,
sesuai materi,
sederhana,
dan mudah dipahami peserta didik.

PETUNJUK PENGERJAAN
Buat petunjuk pengerjaan yang:
sederhana,
jelas,
bertahap,
dan mudah dipahami siswa.
Gunakan maksimal 3–5 langkah.

KEGIATAN BERGAMBAR
Sesuaikan dengan jenis LKPD yang dipilih.
Contoh aktivitas:
Mengamati gambar
Mencocokkan gambar
Mengisi jawaban
Memberi label pada gambar
Mengurutkan gambar
Menghubungkan konsep dengan ilustrasi
Mewarnai (khusus jenjang tertentu)
Diskusi sederhana
Bermain sambil belajar
Setiap aktivitas harus:
interaktif,
menarik,
sesuai usia siswa,
dan memiliki ruang jawaban.

LATIHAN (Opsional)
Buat soal tambahan yang:
relevan dengan materi,
bervariasi,
tidak terlalu sulit,
dan tetap berbasis ilustrasi atau aktivitas.
Boleh berupa:
pilihan ganda,
isian,
menjodohkan,
atau uraian singkat.

REFLEKSI SISWA
Buat 2–3 pertanyaan refleksi sederhana seperti:
Apa hal baru yang kamu pelajari hari ini?
Bagian mana yang paling kamu sukai?
Apa yang masih ingin kamu pelajari?

KETENTUAN ILUSTRASI
Gunakan ilustrasi:
kartun edukatif,
warna cerah dan menarik,
tidak terlalu ramai,
mendukung pemahaman materi,
dan diletakkan dekat soal atau aktivitas terkait.

OUTPUT
Hasil akhir harus:
berupa LKPD lengkap siap cetak,
full color,
rapi dan profesional,
menggunakan heading yang jelas,
memiliki perpaduan teks dan ilustrasi yang seimbang,
dan cocok digunakan dalam pembelajaran di kelas maupun tugas rumah.`;

export const RAW_INFOGRAFIS_TEMPLATE_PROMPT = `Anda adalah desainer poster profesional, ahli komunikasi visual, dan spesialis infografis modern. Tugas Anda adalah BUAT GAMBAR POSTER JADI secara utuh yang langsung siap digunakan dan dicetak, sesuai dengan Nama / Jenis Media Visual yang diinginkan TANPA menghilangkan elemen dan struktur infografis di dalam posternya.

Buat Gambar Poster Infografis Utuh
SPESIFIKASI DESAIN POSTER & INFOGRAFIS
Nama / Jenis Media Visual : [ TULIS JENIS MEDIA VISUAL / POSTER DI SINI ]
Kategori Penggunaan : [ Pembelajaran Sekolah / Poster Umum / Kampanye / Acara / Pengumuman / SOP ]
Ukuran Kertas / Rasio : [ A3 Portrait / A4 Portrait / 4:5 / 9:16 ]
Gaya Visual & Warna : [ TULIS GAYA ILUSTRASI & WARNA DI SINI ]
Target Pembaca / Sasaran : [ Siswa / Masyarakat Umum / Warga Sekolah ]
Resolusi : Tinggi (300 DPI), tajam, proporsional, siap cetak & publikasi digital

TEMA / JUDUL UTAMA POSTER
[ TULIS JUDUL ATAU MATERI POSTER DI SINI ]

ISI MATERI / POIN INFOGRAFIS UTAMA
[ TULIS POIN-POIN PENTING ATAU MATERI DI SINI ]

ATURAN WAJIB: POSTER JADI DENGAN ELEMEN INFOGRAFIS UTUH
1. Hasil akhir HARUS berupa desain POSTER JADI UTUH sesuai nama/jenis media visual yang diminta, bukan sekadar gambar dekoratif kosong tanpa informasi.
2. JANGAN MENGHILANGKAN INFOGRAFIS DARI POSTER: Wajib menampilkan struktur infografis yang jelas di dalam poster meliputi:
   - Judul Utama (Headline) besar, kontras, dan langsung terbaca dari jarak jauh
   - Sub-judul ringkas yang menjelaskan konteks utama
   - Pembagian zona / kartu informasi (callout boxes) yang rapi dan berimbang
   - Alur nomor, diagram proses, bagan perbandingan, atau panah penghubung antar-konsep
   - Ikon visual modern dan ilustrasi kontekstual di setiap poin materi
   - Kotak highlight fakta penting / data kunci / rangkuman inti
3. Seluruh teks Bahasa Indonesia di dalam poster harus tereja rapi, jelas, proporsional, tidak bertumpuk, dan memiliki ruang kosong (whitespace) yang nyaman dilihat.
4. Sesuaikan tata letak anatomi poster secara akurat dengan karakter Nama / Jenis Media Visual yang dipilih.`;

export const RAW_AUDIO_TEMPLATE_PROMPT = `Anda adalah komposer musik edukasi profesional, produser audio pembelajaran, dan pencipta lagu anak/pelajar Indonesia. Tugas Anda adalah MEMBUAT LAGU PEMBELAJARAN DALAM BENTUK AUDIO UTUH YANG BISA LANGSUNG DIPUTAR DAN DIDENGAR (lengkap vokal penyanyi dan aransemen musik iringan), bukan sekadar teks puisi biasa.

Buat Audio Lagu Pembelajaran Siap Putar & Didengar
SPESIFIKASI PRODUKSI AUDIO
Judul / Topik Materi Lagu : [ TULIS MATERI / JUDUL LAGU DI SINI ]
Sasaran Pendengar : [ PAUD / SD / SMP / SMA / Umum ]
Format Audio : Lagu Pembelajaran Utuh Lengkap Vokal & Musik Iringan (Siap Putar)
Gaya Musik & Instrumen : [ Ceria Akustik / Pop Edukatif / Ritmis Hafalan / Tradisional Nusantara ]
Tempo & Suasana : [ 110–120 BPM, Ceria, Hangat, Mudah Diikuti ]
Durasi Audio : [ 2 – 3 Menit ]

INSTRUKSI RENDER AUDIO & VOKAL
1. Hasilkan langsung output dalam bentuk AUDIO LAGU UTUH yang dapat diputar (play) dan didengar dengan kualitas suara jernih.
2. Gunakan vokal Bahasa Indonesia dengan artikulasi pelafalan sangat jelas agar setiap kata konsep materi terdengar tegas dan mudah dihafal pendengar.
3. Atur keseimbangan suara (mixing) agar vokal utama lebih menonjol di atas musik pengiring.

TAG GAYA MUSIK (UNTUK GENERATOR AUDIO / SUNO / UDIO / MUSIC AI)
Style of Music: Upbeat Indonesian educational song, clear warm vocals, acoustic guitar, bright piano, light percussion, catchy melody, studio quality, 115 BPM

STRUKTUR LAGU & LIRIK YANG DINYANYIKAN
[Intro - Musik Pembuka Ceria]
[Verse 1 - Pengenalan Konsep]
[ TULIS LIRIK BAIT 1 ATAU MINTA AI MENYUSUN OTOMATIS ]

[Chorus / Reff - Inti Materi Catchy & Mudah Dihafal]
[ TULIS LIRIK REFF ATAU MINTA AI MENYUSUN OTOMATIS ]

[Verse 2 - Contoh & Penjelasan Materi]
[ TULIS LIRIK BAIT 2 ATAU MINTA AI MENYUSUN OTOMATIS ]

[Chorus / Reff - Pengulangan Penguatan Memori]
[Outro - Penutup Semangat Belajar]`;

export const RAW_VIDEO_TEMPLATE_PROMPT = `Anda adalah sutradara video edukasi profesional, animator pembelajaran, dan kreator konten audio-visual sekolah modern. Tugas Anda adalah MEMBUAT VIDEO PEMBELAJARAN UTUH YANG BISA LANGSUNG DIPUTAR DAN DILIHAT BERDURASI 1–3 MENIT lengkap dengan visual bergerak/animasi, suara narasi (voiceover), teks layar, dan musik latar.

Buat Video Pembelajaran Siap Putar (Durasi 1–3 Menit)
SPESIFIKASI VIDEO
Topik / Materi Video : [ TULIS TOPIK MATERI DI SINI ]
Jenjang & Sasaran Siswa : [ PAUD / SD / SMP / SMA / SMK ]
Durasi Target : [ 1 – 3 Menit (60 s.d. 180 Detik) ]
Format & Gaya Visual : [ Animasi 2D / Animasi 3D / Motion Infografis / Simulasi Sains ]
Rasio Layar & Resolusi : [ 16:9 Full HD 1080p Layar Kelas / 9:16 Vertikal ]
Bahasa Narasi & Teks : Bahasa Indonesia jernih, ramah, dan ekspresif

INSTRUKSI PEMBUATAN VIDEO SIAP PUTAR
1. Render dan hasilkan VIDEO UTUH berdurasi 1–3 menit yang dapat langsung diputar (play) dan ditonton dari awal hingga akhir secara berkesinambungan.
2. Setiap adegan wajib menampilkan visual bergerak/animasi yang selaras dengan kalimat narasi voiceover, dilengkapi teks poin kunci (on-screen text), subtitle Bahasa Indonesia yang akurat, serta musik latar edukatif yang lembut.
3. Susun dan tampilkan dalam alur 5 adegan utuh:
   - Adegan 1 (00:00–00:20): Hook Visual Pembuka & Pertanyaan Pemantik
   - Adegan 2 (00:20–00:55): Pengenalan Konsep Inti Materi
   - Adegan 3 (00:55–01:45): Visualisasi Proses / Penjelasan Utama Secara Bertahap
   - Adegan 4 (01:45–02:25): Contoh Nyata dalam Kehidupan Sehari-hari
   - Adegan 5 (02:25–03:00): Kuis Singkat Interaktif di Layar & Rangkuman Penutup`;

export const RAW_CETAK_TEMPLATE_PROMPT = `Anda adalah desainer alat peraga pendidikan profesional dan ilustrator media cetak sekolah. Tugas Anda adalah BUAT GAMBAR / DESAIN LEMBAR CETAK JADI secara langsung sesuai Jenis Media Cetak & Alat Peraga yang dipilih dengan UKURAN KERTAS A4 ATAU A3 yang presisi dan siap print.

Buat Gambar Media Cetak & Alat Peraga Siap Print (A4 / A3)
SPESIFIKASI KERTAS & PERCETAKAN
Jenis Media Cetak / Alat Peraga : [ TULIS JENIS MEDIA CETAK / ALAT PERAGA DI SINI ]
Ukuran Kertas Cetak : [ Kertas A4 (21 × 29,7 cm) / Kertas A3 (29,7 × 42 cm) ]
Orientasi Kertas : [ Portrait / Landscape ]
Jumlah Kartu / Komponen : [ TULIS JUMLAH KOMPONEN DI SINI ]
Resolusi & Latar : 300 DPI siap cetak, latar bersih ramah printer, margin tepi aman minimal 1 cm

MATERI & SASARAN PENGGUNA
Materi / Topik Utama : [ TULIS MATERI DI SINI ]
Jenjang / Kelas : [ PAUD / SD / SMP / SMA / SMK ]

INSTRUKSI DESAIN VISUAL ALAT PERAGA SIAP CETAK
1. Hasilkan langsung TAMPILAN VISUAL LEMBAR CETAK UTUH dalam proporsi kertas A4/A3 sesuai jenis media cetak & alat peraga yang diminta (misal: lembar kartu flashcard, papan permainan edukasi, roda putar siklus, kartu domino/kuartet, lembar potong-tempel, atau jaring-jaring 3D).
2. Tampilkan garis potong putus-putus (✂ - - - -) dan garis lipat secara rapi dan presisi di sekeliling komponen agar mudah digunting dan dirakit guru maupun siswa.
3. Setiap komponen wajib memuat ilustrasi full color yang edukatif dan teks label Bahasa Indonesia yang tajam, kontras, serta mudah dibaca.
4. Sertakan judul identitas media cetak di bagian atas serta petunjuk singkat cara merakit/menggunakan di sudut lembar tanpa memotong area komponen utama.`;

export type PromptOutputVariant = 'filled' | 'raw' | 'blueprint';

export function generateEducationalPrompt(
  category: MediaCategory,
  data: PromptFormData,
  customAnswers: Record<string, string>,
  variantOrRaw: PromptOutputVariant | boolean = 'filled'
): string {
  const resolvedVariant: PromptOutputVariant =
    typeof variantOrRaw === 'boolean'
      ? variantOrRaw
        ? 'raw'
        : 'filled'
      : variantOrRaw;

  if (resolvedVariant === 'raw') {
    if (category.id === 'lkpd') return RAW_LKPD_TEMPLATE_PROMPT;
    if (category.id === 'infografis') return RAW_INFOGRAFIS_TEMPLATE_PROMPT;
    if (category.id === 'audio') return RAW_AUDIO_TEMPLATE_PROMPT;
    if (category.id === 'video') return RAW_VIDEO_TEMPLATE_PROMPT;
    if (category.id === 'cetak') return RAW_CETAK_TEMPLATE_PROMPT;
  }
  const {
    educationLevel,
    subject,
    topic,
    targetAI,
    learningObjectives,
    difficulty,
    pancasilaDimensions,
    differentiation,
    additionalNotes,
  } = data;

  const levelLabel = getLevelLabel(educationLevel);
  const targetAIName = getTargetAIName(targetAI);

  let categorySpecificInstructions = '';

  switch (category.id) {
    case 'presentasi': {
      const slides = customAnswers.slideCount || '8 Slide (Standar Tatap Muka)';
      const style = customAnswers.presentationStyle || 'Canva Edukasi (Ceria, Ilustratif, Ramah Anak)';
      const interactive = customAnswers.interactiveElement || 'Pertanyaan Pemantik';
      const platformGuidance =
        targetAI === 'canva'
          ? `- Optimasi Khusus Canva Magic Design & Canva Code:
  * Sediakan struktur teks per slide yang siap ditempel ke Canva Docs-to-Deck / Bulk Create
  * Sertakan Kata Kunci Elemen Grafis Canva (Canva Elements Search Keywords) di setiap slide
  * Rekomendasikan kombinasi Font Canva & Palet Warna Kode HEX yang selaras dengan gaya "${style}"`
          : targetAI === 'gamma'
          ? `- Optimasi Khusus Gamma App AI:
  * Susun dengan pemisah kartu slide (---) yang rapi agar otomatis terbagi menjadi deck presentasi di Gamma
  * Sertakan prompt visual ilustrasi pada tiap kartu dengan gaya "${style}"`
          : targetAI === 'copilot'
          ? `- Optimasi Khusus Microsoft Copilot / PowerPoint:
  * Susun kerangka Heading 1 (Judul Slide) dan Heading 2/Bullet (Isi Slide) serta Speaker Notes yang siap diekspor ke PowerPoint`
          : `- Optimasi Platform ${targetAIName}:
  * Sajikan struktur slide siap salin ke PowerPoint / Canva lengkap dengan deskripsi prompt ilustrasi bergaya "${style}"`;

      categorySpecificInstructions = `
[DETAIL STRUKTUR PRESENTASI INTERAKTIF]
- Alokasi Jumlah Slide: ${slides}
- Gaya Desain / Format Visual: ${style}
- Elemen Interaktif di Kelas: ${interactive}
${platformGuidance}
- Panduan Format Output Tiap Slide:
  * Slide [Nomor]: [Judul Slide yang Menarik & Singkat]
  * Konten Utama: 3–4 poin ringkas (bullet points padat, mudah dibaca dari jarak jauh di kelas)
  * Panduan Visual & Gaya Seni (${style}): Deskripsi detail tata letak, karakter/objek visual, warna, dan ilustrasi yang sesuai gaya desain terpilih
  * Narasi Guru (Speaker Notes): Kalimat penjelasan komunikatif yang dibacakan guru saat slide tampil
  * Aktivitas Interaktif Siswa: Instruksi keterlibatan siswa (${interactive}) pada slide terkait`;
      break;
    }

    case 'kuis': {
      const qType = customAnswers.quizType || 'Pilihan Ganda HOTS';
      const qCount = customAnswers.questionCount || '10 Butir Soal';
      const answerKey = customAnswers.includeAnswerKey || 'Lengkap Kunci + Pembahasan';
      categorySpecificInstructions = `
[DETAIL SPESIFIKASI SOAL & KUIS]
- Bentuk / Tipe Soal: ${qType}
- Jumlah Soal: ${qCount}
- Tingkat Kesulitan: ${difficulty || 'HOTS (Higher Order Thinking Skills - C4, C5, C6 Bloom)'}
- Kelengkapan Asesmen: ${answerKey}
- Format Penulisan:
  1. Sajikan stimulus kontekstual berupa cerita singkat, data, atau diagram nyata
  2. Pertanyaan yang menguji nalar, bukan sekadar hafalan fakta
  3. Opsi pilihan ganda A, B, C, D (atau E untuk SMA/SMK) dengan pengecoh (distractor) yang logis
  4. Bagian Kunci Jawaban & Pembahasan Mendalam (jelaskan mengapa jawaban tersebut benar dan mengapa opsi lain salah)`;
      break;
    }

    case 'game': {
      const gFormat = customAnswers.gameFormat || 'Game Tanpa Alat';
      const gDuration = customAnswers.duration || '10-15 Menit';
      const gEnergy = customAnswers.classEnergy || 'Meningkatkan Fokus & Konsentrasi';
      categorySpecificInstructions = `
[DETAIL PERMAINAN EDUKASI & ICE BREAKING]
- Jenis Game: ${gFormat}
- Estimasi Durasi: ${gDuration}
- Target Suasana Kelas: ${gEnergy}
- Struktur Penyusunan:
  * Nama Game yang Unik & Menarik bagi Siswa
  * Filosofi & Kaitan Materi dengan Game
  * Alat & Bahan (jika ada, utamakan yang ramah lingkungan / tanpa alat)
  * Aturan Main & Langkah Pelaksanaan Langkah Demi Langkah (Step-by-Step)
  * Kalimat Aba-Aba / Seruan Pembuka Guru untuk Memancing Antusiasme
  * Variasi Adaptasi untuk Siswa yang Pemalu atau Memerlukan Bantuan
  * Pertanyaan Refleksi Singkat (Debriefing 2 Menit) setelah game selesai`;
      break;
    }

    case 'modul': {
      const model = customAnswers.teachingModel || 'Problem Based Learning (PBL) - Pembelajaran Berbasis Masalah';
      const comp = customAnswers.curriculumComponents || 'Paket Super Komplit + Lampiran LKPD, Bahan Bacaan, Media, Rubrik Analitik, Glosarium & Daftar Pustaka';
      const meet = customAnswers.meetingCount || '1 Pertemuan (2 JP x 35 Menit = 70 Menit)';
      const detailedList =
        data.modulComponentsList && data.modulComponentsList.length > 0
          ? data.modulComponentsList.map((item, idx) => `   ${idx + 1}. ${item}`).join('\n')
          : `   1. Identitas Modul Lengkap & Kompetensi Awal
   2. Dimensi Profil Pelajar Pancasila, Sarana Prasarana & Target Peserta Didik
   3. Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP) & KKTP/IKTP
   4. Pemahaman Bermakna & Pertanyaan Pemantik
   5. Kegiatan Pembelajaran Detail (Pendahuluan, Inti sesuai Sintaks Model, Penutup)
   6. Asesmen Diagnostik, Formatif, Sumatif + Rubrik Penilaian
   7. Pengayaan, Remedial, Refleksi Guru & Siswa
   8. Lampiran LKPD, Bahan Bacaan, Glosarium & Daftar Pustaka`;

      categorySpecificInstructions = `
[DETAIL KOMPONEN MODUL AJAR KURIKULUM MERDEKA]
- Model Pembelajaran Utama: ${model}
- Paket Struktur Modul: ${comp}
- Alokasi Waktu (Sesuai Jenjang & Fase ${data.gradeLevel || levelLabel}): ${meet}
- Daftar Komponen Wajib yang Harus Dihasilkan Secara Lengkap & Berurutan:
${detailedList}
- Ketentuan Penting Penyusunan:
  * Rincikan pembagian menit pada Kegiatan Pendahuluan, Kegiatan Inti, dan Kegiatan Penutup agar total waktunya akurat sesuai alokasi "${meet}".
  * Pada Kegiatan Inti, tuliskan secara eksplisit setiap tahapan/sintaks resmi dari model "${model}" beserta aktivitas guru dan aktivitas murid yang konkret.
  * Sertakan instrumen penilaian beserta rubrik kriteria skor dan contoh butir soal HOTS lengkap kunci jawaban.`;
      break;
    }

    case 'lkpd': {
      const selectedLkpdType = data.lkpdType || customAnswers.lkpdStyle || '[ TULIS DISINI ]';
      const pageCount = data.lkpdPageCount && data.lkpdPageCount > 0 ? data.lkpdPageCount : 2;
      const questionCount = data.lkpdQuestionCount && data.lkpdQuestionCount > 0 ? data.lkpdQuestionCount : 10;
      const pictureActs =
        data.pictureActivities && data.pictureActivities.length > 0
          ? data.pictureActivities.join(', ')
          : '';
      const exercises =
        data.includeExercises && data.includeExercises.length > 0
          ? data.includeExercises.join(', ')
          : '';
      const styleArt = (data.illustrationStyle || 'Kartun Edukatif').trim();
      const materiValue =
        topic && topic.trim()
          ? `${topic.trim()}${subject ? ` (Mata Pelajaran: ${subject})` : ''}`
          : '[ TULIS DISINI ]';
      const tujuanValue =
        learningObjectives && learningObjectives.trim()
          ? learningObjectives.trim()
          : '[ TULIS DISINI ]';
      const jenjangValue = data.gradeLevel
        ? `${data.gradeLevel} (${levelLabel})`
        : 'TK/SD/SMP/SMA';
      const kelasValue = data.gradeLevel || '________________________';
      const extraNote =
        additionalNotes && additionalNotes.trim()
          ? `\n\nCATATAN TAMBAHAN\n${additionalNotes.trim()}`
          : '';

      return `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern. Tugas Anda adalah buat gambar dengan mengubah isi LKPD yang saya lampirkan menjadi LKPD bergambar yang lebih menarik, modern, estetik, dan nyaman digunakan siswa tanpa mengurangi isi materi asli sedikit pun.

Buat tampilan LKPD dalam format A4 portrait dengan desain full color yang clean, edukatif, student friendly, dan profesional seperti workbook sekolah modern. Gunakan tata letak yang rapi dengan perpaduan teks, gambar, dan ruang kosong yang seimbang agar tidak terlalu padat dan tetap mudah dibaca siswa.

Tambahkan ilustrasi edukatif yang relevan dengan materi, ikon modern, elemen visual sederhana, highlight box, header menarik, dan variasi desain pada setiap halaman agar tidak monoton. Jika terdapat soal cerita, tambahkan ilustrasi kontekstual. Jika terdapat langkah kegiatan, ubah menjadi tampilan step visual yang lebih interaktif. Jika terdapat tabel atau latihan, ubah menjadi desain yang lebih modern dan menarik namun tetap jelas dibaca.

Sesuaikan desain, ilustrasi, dan tata letak dengan jenis aktivitas pada LKPD, sehingga setiap aktivitas terlihat lebih interaktif, kontekstual, dan sesuai dengan karakter pembelajaran yang digunakan.

Gunakan gaya visual modern, fun learning, semi infografis, dan workbook edukasi premium. Hindari desain terlalu ramai, seperti poster, atau ornamen berlebihan. Pastikan hasil akhir tetap fokus sebagai media belajar yang fungsional sekaligus estetik.

Hasil akhir harus langsung berupa desain LKPD lengkap yang siap cetak, beresolusi tinggi, dan terlihat seperti workbook pendidikan profesional.

Buat Gambar
Anda berperan sebagai guru profesional, perancang LKPD, dan ilustrator pendidikan yang mampu membuat LKPD menarik, edukatif, dan sesuai dengan karakter peserta didik.
Tugas Anda adalah membuat LKPD bergambar lengkap berdasarkan materi dan jenis/bentuk LKPD yang ditentukan oleh pengguna.

SPESIFIKASI DESAIN
Ukuran kertas : A4 (21 cm × 29,7 cm)
Orientasi : Portrait
Jumlah halaman : ${pageCount} Halaman A4
Jumlah soal : ${questionCount} Soal
Layout : rapi, proporsional, dan siap cetak
Gaya desain : ramah anak dan menarik
Warna : cerah, pastel, dan edukatif
Sesuaikan dengan jenjang : ${jenjangValue}
Sisakan ruang untuk jawaban siswa
Gunakan ilustrasi edukatif seperlunya
Mudah dibaca dan hindari desain terlalu ramai

MATERI PEMBELAJARAN
ISI MATERI DI SINI :
${materiValue}

JENIS / BENTUK LKPD
Pilih atau isi sesuai kebutuhan, misalnya:
LKPD Observasi
LKPD Eksperimen
LKPD Eksplorasi
LKPD Berbasis Gambar
LKPD Cerita Bergambar
LKPD Mencocokkan
LKPD Menjodohkan
LKPD Pilihan Ganda
LKPD Benar/Salah
LKPD Isian
LKPD Studi Kasus
LKPD Investigasi
LKPD Pemecahan Masalah (HOTS)
LKPD Berbasis Proyek (PjBL)
LKPD Diskusi Kelompok
LKPD Analisis Data
LKPD Refleksi
LKPD Diagnostik
LKPD Pengayaan
LKPD Remedial
LKPD Proyek
LKPD Campuran
JENIS LKPD YANG DIINGINKAN :
${selectedLkpdType}



IDENTITAS LKPD
Nama : ________________________
Kelas : ${kelasValue}
Tanggal : ________________________
Nilai : 


TUGAS ANDA
Berdasarkan materi dan jenis LKPD yang dipilih:
Menyusun kegiatan LKPD sesuai bentuk yang diminta
Membuat soal/tugas berbasis gambar atau aktivitas
Membuat ilustrasi yang relevan dengan materi
Menyesuaikan tingkat kesulitan dengan jenjang
Menggunakan bahasa sederhana, komunikatif, dan mudah dipahami siswa

TUJUAN PEMBELAJARAN (Opsional)
${tujuanValue}
Tuliskan tujuan pembelajaran yang:
jelas,
sesuai materi,
sederhana,
dan mudah dipahami peserta didik.

PETUNJUK PENGERJAAN
Buat petunjuk pengerjaan yang:
sederhana,
jelas,
bertahap,
dan mudah dipahami siswa.
Gunakan maksimal 3–5 langkah.

KEGIATAN BERGAMBAR
Sesuaikan dengan jenis LKPD yang dipilih.${pictureActs ? `\nAktivitas yang diutamakan : ${pictureActs}` : ''}
Contoh aktivitas:
Mengamati gambar
Mencocokkan gambar
Mengisi jawaban
Memberi label pada gambar
Mengurutkan gambar
Menghubungkan konsep dengan ilustrasi
Mewarnai (khusus jenjang tertentu)
Diskusi sederhana
Bermain sambil belajar
Setiap aktivitas harus:
interaktif,
menarik,
sesuai usia siswa,
dan memiliki ruang jawaban.

LATIHAN (Opsional)
Buat soal tambahan (${questionCount} soal${exercises ? ` — ${exercises}` : ''}) yang:
relevan dengan materi,
bervariasi,
tidak terlalu sulit,
dan tetap berbasis ilustrasi atau aktivitas.
Boleh berupa:
pilihan ganda,
isian,
menjodohkan,
atau uraian singkat.

REFLEKSI SISWA
Buat 2–3 pertanyaan refleksi sederhana seperti:
Apa hal baru yang kamu pelajari hari ini?
Bagian mana yang paling kamu sukai?
Apa yang masih ingin kamu pelajari?

KETENTUAN ILUSTRASI
Gunakan ilustrasi:
${styleArt.toLowerCase()},
warna cerah dan menarik,
tidak terlalu ramai,
mendukung pemahaman materi,
dan diletakkan dekat soal atau aktivitas terkait.

OUTPUT
Hasil akhir harus:
berupa LKPD lengkap siap cetak,
full color,
rapi dan profesional,
menggunakan heading yang jelas,
memiliki perpaduan teks dan ilustrasi yang seimbang,
dan cocok digunakan dalam pembelajaran di kelas maupun tugas rumah.${extraNote}`;
    }

    case 'infografis': {
      const selectedVisualType =
        data.customVisualTypeName && data.customVisualTypeName.trim()
          ? data.customVisualTypeName.trim()
          : customAnswers.visualType || 'Poster Edukasi Dinding Kelas (Ukuran A3 / A2)';
      const vSize =
        customAnswers.visualSize ||
        'Poster A3 Portrait (29,7 × 42 cm — Resolusi Tinggi Siap Cetak)';
      const vTone =
        customAnswers.visualTone || 'Kartun Ceria & Ramah Anak (Flat 2D Vector Cerah)';
      const vExtra =
        customAnswers.canvaPromptIncluded ||
        'Buat Poster Jadi Utuh Lengkap Elemen Infografis Terstruktur • Ikon Visual Modern & Ilustrasi Pendukung di Setiap Poin • Alur Nomor, Panah Penghubung & Kotak Highlight Informasi';
      const isGeneralMode = data.visualScope === 'umum';
      const generalCategoryLabel =
        data.generalPosterCategory || 'Poster & Media Visual Umum';
      const generalAudience =
        data.generalPosterAudience || 'Semua Kalangan / Masyarakat Umum';
      const generalPoints =
        data.generalPosterPoints && data.generalPosterPoints.trim()
          ? data.generalPosterPoints.trim()
          : '';
      const generalCta =
        data.generalPosterCta && data.generalPosterCta.trim()
          ? data.generalPosterCta.trim()
          : '';
      const extraTeacherNote =
        additionalNotes && additionalNotes.trim()
          ? `\n\nCATATAN KHUSUS TAMBAHAN\n${additionalNotes.trim()}`
          : '';

      if (resolvedVariant === 'blueprint') {
        const contextBlock = isGeneralMode
          ? `- Mode Media Visual: Poster & Media Visual Umum (${generalCategoryLabel})
- Judul / Tema Poster: ${topic}
- Sasaran Pembaca / Audiens: ${generalAudience}${generalPoints ? `\n- Poin Materi / Pesan Utama:\n${generalPoints}` : ''}${generalCta ? `\n- Kalimat Ajakan / Slogan / Info Penutup: ${generalCta}` : ''}`
          : `- Mode Media Visual: Media Visual Pembelajaran (${levelLabel})
- Kelas & Mata Pelajaran: ${data.gradeLevel || levelLabel} — ${subject}
- Materi / Topik Utama: ${topic}${learningObjectives && learningObjectives.trim() ? `\n- Tujuan Pembelajaran: ${learningObjectives.trim()}` : ''}`;

        return `Kamu adalah Desainer Komunikasi Visual Senior, Spesialis Poster Infografis, dan Kreator Media Visual Profesional untuk ${targetAIName}.

TUGAS UTAMA:
Susunkan rancangan konten teks poster lengkap, anatomi tata letak infografis, serta panduan desain siap eksekusi untuk membuat **${selectedVisualType}** yang memadukan estetika poster jadi dengan kelengkapan struktur infografis secara utuh.

[PROFIL & KONTEKS POSTER]
${contextBlock}
- Nama / Jenis Media Visual: ${selectedVisualType}
- Ukuran / Rasio Poster: ${vSize}
- Gaya Ilustrasi & Palet Warna: ${vTone}
- Fitur & Elemen Infografis Wajib: ${vExtra}

[STRUKTUR OUTPUT RANCANGAN POSTER & INFOGRAFIS]
1. **Judul Utama (Headline) & Sub-Headline Memikat**: Teks singkat, kuat, dan terbaca jelas dari jarak jauh.
2. **Zona & Alur Konten Infografis di Dalam Poster**: Bagi isi poster menjadi 4–6 blok/zona infografis terstruktur sesuai bentuk "${selectedVisualType}" (lengkap nomor urut/panah alur, teks padat per blok, fakta kunci, dan rekomendasi ikon tiap poin).
3. **Panduan Komposisi Visual & Ilustrasi (${vTone})**: Deskripsi ilustrasi utama (centerpiece), tata letak grid proporsional (${vSize}), pasangan font, serta palet warna beserta kode HEX.
4. **Prompt Gambar Siap Pakai**: Sertakan 1 paragraf prompt pembuatan gambar poster jadi utuh yang mempertahankan seluruh bagian infografisnya.${extraTeacherNote}`;
      }

      if (isGeneralMode) {
        return `Anda adalah desainer grafis profesional, ahli komunikasi visual, dan spesialis poster infografis modern. Tugas Anda adalah BUAT GAMBAR POSTER JADI secara utuh dan siap pakai sesuai dengan Nama / Jenis Media Visual yang ditentukan pengguna TANPA mengurangi atau menghilangkan elemen infografis dari posternya sedikit pun.

Buat Gambar Poster Infografis Jadi
SPESIFIKASI MEDIA VISUAL & POSTER UMUM
Nama / Jenis Media Visual : ${selectedVisualType}
Kategori Poster Umum : ${generalCategoryLabel}
Judul / Tema Poster : ${topic}
Sasaran Pembaca / Audiens : ${generalAudience}
Ukuran Kertas / Rasio : ${vSize}
Gaya Ilustrasi & Palet Warna : ${vTone}
Elemen & Fitur Wajib : ${vExtra}
Platform AI Sasaran : ${targetAIName}

ISI PESAN & KONTEN INFOGRAFIS DI DALAM POSTER
${
  generalPoints
    ? `Muat dan visualisasikan poin-poin informasi utama berikut secara rapi di dalam infografis poster:\n${generalPoints}`
    : `Susun otomatis 4–6 poin informasi infografis yang paling akurat, padat, sistematis, dan bermanfaat mengenai "${topic}" untuk audiens ${generalAudience}.`
}${generalCta ? `\nKalimat Ajakan (Call-to-Action) / Slogan Penutup : ${generalCta}` : ''}

KETENTUAN UTAMA: POSTER JADI SESUAI NAMA MEDIA VISUAL + INFOGRAFIS UTUH
1. Sesuaikan bentuk tata letak dengan Nama Media Visual: Desain harus benar-benar merepresentasikan "${selectedVisualType}" secara autentik (baik tata letak, hierarki pembacaan, maupun pembagian ruangnya).
2. Jangan menghilangkan infografis dari poster: Poster TIDAK BOLEH hanya berisi gambar ilustrasi besar dengan satu judul saja, melainkan WAJIB memuat anatomi infografis yang utuh, terstruktur, dan informatif meliputi:
   - Header / Judul Utama (Headline) yang tegas, kontras, dan menarik perhatian
   - Sub-judul ringkas penjelas konteks topik "${topic}"
   - Zona kartu informasi (highlight boxes), diagram alur/tahapan bernomor, bagan terstruktur, atau panah penghubung antar-poin
   - Ikon visual modern dan ilustrasi pendukung kontekstual di setiap poin informasi
   - Kotak sorotan fakta kunci / tips utama / kesimpulan penting
3. Keterbacaan & Estetika Profesional: Gunakan gaya "${vTone}" dengan komposisi teks, ilustrasi, dan ruang kosong (whitespace) yang seimbang dalam ukuran "${vSize}". Pastikan seluruh ejaan Bahasa Indonesia di dalam poster tertulis rapi, tajam, dan nyaman dibaca.

OUTPUT AKHIR
Hasil akhir harus langsung berupa DESAIN POSTER INFOGRAFIS JADI yang utuh, full color, beresolusi tinggi, proporsional, dan siap cetak maupun dibagikan secara digital.${extraTeacherNote}`;
      }

      const jenjangPoster = data.gradeLevel
        ? `${data.gradeLevel} (${levelLabel})`
        : levelLabel;
      const tujuanPoster =
        learningObjectives && learningObjectives.trim()
          ? `\nTujuan Pembelajaran Acuan : ${learningObjectives.trim()}`
          : '';

      return `Anda adalah desainer pembelajaran visual profesional, ilustrator pendidikan modern, dan ahli poster infografis sekolah. Tugas Anda adalah BUAT GAMBAR POSTER JADI secara utuh dan siap cetak sesuai dengan Nama / Jenis Media Visual yang dipilih TANPA menghilangkan struktur maupun elemen infografis dari posternya sedikit pun.

Buat Gambar Poster Infografis Pembelajaran Jadi
SPESIFIKASI MEDIA VISUAL & DESAIN POSTER
Nama / Jenis Media Visual : ${selectedVisualType}
Ukuran Kertas / Rasio : ${vSize}
Gaya Ilustrasi & Palet Warna : ${vTone}
Mata Pelajaran : ${subject}
Materi / Topik Utama : ${topic}
Sasaran Peserta Didik : ${jenjangPoster}${tujuanPoster}
Elemen Infografis & Fitur Tambahan : ${vExtra}
Platform AI Sasaran : ${targetAIName}

KETENTUAN WAJIB: POSTER JADI SESUAI JENIS MEDIA VISUAL + INFOGRAFIS TETAP UTUH
1. Sesuaikan penuh dengan Nama Media Visual: Tata letak dan struktur visual wajib dirancang persis mengikuti karakter "${selectedVisualType}" sehingga tepat guna untuk pembelajaran "${topic}" bagi siswa ${jenjangPoster}.
2. Pertahankan seluruh elemen infografis di dalam poster: Jangan mengubahnya menjadi sekadar poster dekoratif minim teks. Poster jadi WAJIB memuat struktur infografis edukatif yang lengkap dan mudah dipahami siswa:
   - Judul Utama (Headline) besar, jelas, dan memikat tentang "${topic}"
   - Sub-headline pengantar konsep secara singkat dan ramah siswa
   - Pembagian 4–6 zona / kartu materi infografis terstruktur (lengkap penomoran tahapan, skema/diagram konsep, perbandingan, atau panah penghubung logis)
   - Ikon edukatif modern serta ilustrasi visual relevan di setiap bagian konsep
   - Kotak highlight "Tahukah Kamu?" / poin kata kunci penting agar mudah diingat siswa
3. Tata Letak Bersih & Ramah Siswa: Terapkan gaya "${vTone}" pada format "${vSize}" dengan perpaduan teks ringkas, gambar ilustratif, dan ruang kosong yang proporsional (tidak terlalu padat/menumpuk). Pastikan seluruh tulisan Bahasa Indonesia tajam, akurat secara keilmuan "${subject}", dan mudah dibaca dari jarak dekat maupun dinding kelas.

OUTPUT AKHIR
Hasil akhir harus langsung berupa DESAIN POSTER & INFOGRAFIS PEMBELAJARAN JADI yang lengkap, full color, beresolusi tinggi (siap cetak 300 DPI maupun tampil di proyektor kelas), estetik, dan fungsional.${extraTeacherNote}`;
    }

    case 'audio': {
      const medium =
        customAnswers.audioMedium ||
        'Lagu Pembelajaran Utuh Lengkap Vokal & Musik (File Audio Siap Putar)';
      const rhyme =
        customAnswers.rhymeScheme ||
        'Vokal Ceria Jernih + Gitar Akustik, Piano & Ukulele (Tempo 110 BPM, Artikulasi Jelas)';
      const audioDur =
        customAnswers.audioDuration ||
        '2 – 3 Menit (Lagu Pembelajaran Utuh Standar Siap Putar)';
      const movement =
        customAnswers.movementPrompt ||
        'Hasilkan Audio Lagu Utuh yang Bisa Langsung Diputar & Didengar • Vokal Bahasa Indonesia Artikulasi Sangat Jelas & Mudah Diikuti • Sertakan Tag Style of Music Siap Pakai (Suno AI / Udio / Music AI)';
      const jenjangAudio = data.gradeLevel
        ? `${data.gradeLevel} (${levelLabel})`
        : levelLabel;
      const tujuanAudio =
        learningObjectives && learningObjectives.trim()
          ? `\nTujuan Pembelajaran : ${learningObjectives.trim()}`
          : '';
      const extraAudioNote =
        additionalNotes && additionalNotes.trim()
          ? `\n\nCATATAN TAMBAHAN GURU\n${additionalNotes.trim()}`
          : '';

      return `Anda adalah komposer musik pendidikan profesional, produser audio lagu anak/pelajar Indonesia, dan kreator lagu pembelajaran interaktif. Tugas Anda adalah MEMBUAT LAGU PEMBELAJARAN DALAM BENTUK AUDIO UTUH YANG BISA LANGSUNG DIPUTAR DAN DIDENGAR (lengkap dengan suara vokal penyanyi dan iringan aransemen musik penuh), sehingga guru dan siswa dapat langsung memutar serta mendengarkannya di kelas.

Buat Audio Lagu Pembelajaran Siap Putar & Didengar
SPESIFIKASI KARYA AUDIO & MUSIK
Format Lagu / Audio : ${medium}
Karakter Vokal, Instrumen & Tempo : ${rhyme}
Target Durasi Audio : ${audioDur}
Mata Pelajaran : ${subject}
Topik / Materi Lagu : ${topic}
Sasaran Pendengar : Siswa ${jenjangAudio}${tujuanAudio}
Kelengkapan Output Audio : ${movement}
Platform AI Sasaran : ${targetAIName}

INSTRUKSI WAJIB PEMBUATAN AUDIO YANG BISA DIPUTAR & DIDENGAR
1. Render Audio Utuh (Playable Audio): Jika Anda memiliki fitur pembangkit suara/musik (Audio / Music / Voice Generation), LANGSUNG hasilkan dan render file/pemutar audio lagu utuh berdurasi ${audioDur} lengkap dengan melodi vokal yang menyanyikan lirik serta iringan instrumen musik sesuai spesifikasi "${rhyme}".
2. Kejernihan Vokal & Artikulasi Materi: Pastikan vokal menyanyikan lirik Bahasa Indonesia dengan artikulasi sangat jelas, ekspresif, tidak tertutup musik latar, dan menggunakan melodi yang catchy agar siswa ${data.gradeLevel || levelLabel} mudah menghafal konsep inti "${topic}".
3. Paket Lengkap Siap Render Musik AI (Suno AI / Udio / Lyria / Audio Studio): Sertakan pula dalam tampilan terstruktur:
   - **Judul Lagu Pembelajaran** yang ceria dan mudah diingat
   - **Prompt Style of Music (Audio Style Tags)**: Deskripsi genre, instrumen, karakter vokal, kunci nada, dan BPM dalam 1 baris padat siap tempel ke generator musik AI
   - **Lirik Lagu Berpenanda Struktur Audio Lengkap**:
     * \`[Intro]\` (Iringan pembuka ceria & sapaan semangat)
     * \`[Verse 1]\` (Pengenalan konsep dasar "${topic}")
     * \`[Chorus / Reff]\` (Bagian inti paling catchy, berima kuat, mudah dinyanyikan berulang bersama seisi kelas)
     * \`[Verse 2]\` (Penjelasan urutan/contoh konkret materi "${topic}")
     * \`[Bridge]\` (Tanya-jawab interaktif / penguatan kata kunci)
     * \`[Chorus / Reff Final]\` & \`[Outro]\` (Penutup ceria)
   - **Panduan Ketukan & Gerakan Tubuh Siswa**: Instruksi tepuk tangan atau gerakan sederhana di tiap bagian lagu agar suasana kelas hidup dan menyenangkan.${extraAudioNote}`;
    }

    case 'video': {
      const vFormat =
        customAnswers.videoFormat ||
        'Video Pembelajaran Utuh Siap Putar & Dilihat (Visual Bergerak, Voiceover & Musik)';
      const duration =
        customAnswers.videoDuration ||
        '1 – 3 Menit (Standar Video Pembelajaran Utuh Siap Putar & Dilihat)';
      const vStyle =
        customAnswers.videoVisualStyle ||
        'Animasi Kartun 2D Cerah Full HD 16:9 (Layar Proyektor / TV Kelas)';
      const hook =
        customAnswers.hookType ||
        'Hasilkan Video Utuh 1–3 Menit yang Bisa Langsung Diputar & Dilihat • Narasi Suara (Voiceover) Bahasa Indonesia Jernih & Komunikatif • Teks Poin Kunci & Subtitle Terbaca Jelas di Layar';
      const jenjangVideo = data.gradeLevel
        ? `${data.gradeLevel} (${levelLabel})`
        : levelLabel;
      const tujuanVideo =
        learningObjectives && learningObjectives.trim()
          ? `\nTujuan Pembelajaran : ${learningObjectives.trim()}`
          : '';
      const extraVideoNote =
        additionalNotes && additionalNotes.trim()
          ? `\n\nCATATAN TAMBAHAN GURU\n${additionalNotes.trim()}`
          : '';

      return `Anda adalah sutradara video edukasi profesional, animator pembelajaran modern, dan produser media audio-visual sekolah. Tugas Anda adalah MEMBUAT VIDEO PEMBELAJARAN UTUH YANG BISA LANGSUNG DIPUTAR DAN DILIHAT BERDURASI 1–3 MENIT, lengkap dengan rangkaian adegan visual bergerak/animasi, narasi suara (voiceover) Bahasa Indonesia, teks poin kunci di layar, serta musik latar edukatif.

Buat Video Pembelajaran Siap Putar & Dilihat (Durasi 1–3 Menit)
SPESIFIKASI PRODUKSI VIDEO
Jenis Video Pembelajaran : ${vFormat}
Target Durasi Video : ${duration} (Rentang wajib 1 sampai 3 menit / 60–180 detik)
Gaya Visual & Rasio Layar : ${vStyle}
Mata Pelajaran : ${subject}
Materi / Topik Video : ${topic}
Sasaran Penonton : Siswa ${jenjangVideo}${tujuanVideo}
Komponen Audio-Visual Wajib : ${hook}
Platform AI Sasaran : ${targetAIName}

INSTRUKSI WAJIB PEMBUATAN VIDEO SIAP PUTAR (1–3 MENIT)
1. Render Video Utuh yang Bisa Diputar & Dilihat: Apabila platform mendukung pembuatan video (AI Video Generator / Canva Video / InVideo / Veo / CapCut AI), LANGSUNG buat dan gabungkan seluruh adegan menjadi satu video pembelajaran utuh berdurasi ${duration} dengan gaya "${vStyle}" yang siap diputar (play) dan ditonton siswa di kelas.
2. Keselarasan Visual Bergerak, Suara & Teks Layar:
   - Setiap detik harus menampilkan visual bergerak/animasi kontekstual yang menjelaskan "${topic}" secara konkret (bukan slide teks statis yang membosankan).
   - Gunakan narasi suara (Voiceover) Bahasa Indonesia yang ramah, antusias, bertempo jelas, dan sesuai usia siswa ${data.gradeLevel || levelLabel}.
   - Tampilkan label teks kata kunci (on-screen callouts) dan subtitle Bahasa Indonesia yang bersih serta mudah dibaca.
   - Padukan musik latar (backsound) ceria-edukatif ber-volume lembut beserta efek suara (SFX) transisi halus.
3. Susunan Adegan Video Utuh Berdurasi 1–3 Menit (Wajib Berkesinambungan):
   - **Adegan 1 [00:00 – 00:20] — Hook Visual Pembuka**: Fenomena/pertanyaan pemantik mengejutkan tentang "${topic}" untuk memikat fokus siswa sejak 5 detik pertama.
   - **Adegan 2 [00:20 – 00:55] — Pengenalan Konsep Inti**: Visualisasi definisi dan ide pokok "${topic}" secara sederhana dan bertahap.
   - **Adegan 3 [00:55 – 01:45] — Animasi Proses / Penjelasan Mendalam**: Ilustrasi bergerak langkah demi langkah, cara kerja, atau bagian penting materi "${topic}".
   - **Adegan 4 [01:45 – 02:25] — Contoh Nyata di Kehidupan Sehari-hari**: Penerapan materi di sekitar siswa sehingga terasa dekat dan bermakna.
   - **Adegan 5 [02:25 – 03:00] — Kuis Interaktif Cepat & Kesimpulan**: 1–2 pertanyaan tebak cepat di layar (dengan jeda hitung mundur 3 detik lalu jawaban benar) diikuti rangkuman poin kunci penutup.
4. Sertakan pula detail **Prompt Visual Motion per Adegan**, **Naskah Voiceover Lengkap**, dan **Teks Layar** agar video ter-render akurat dari detik awal hingga akhir.${extraVideoNote}`;
    }

    case 'chatbot': {
      const persona = customAnswers.botPersona || 'Tutor Ramah Socratic';
      const antiCheat = customAnswers.antiCheatRules || 'Ketat: Beri petunjuk, bukan jawaban langsung';
      const promptStyle = customAnswers.systemInstructionOutput || 'System Instructions Siap Pasang';
      categorySpecificInstructions = `
[DETAIL CHATBOT AI ASISTEN KELAS]
- Persona AI: ${persona}
- Aturan Anti-Contekan: ${antiCheat}
- Format Instruksi: ${promptStyle}
- Buat System Prompt Lengkap Meliputi:
  * Identitas & Nada Suara: Ramah, sabar, memuji usaha murid, tidak menghakimi
  * Batasan Operasional: Jangan pernah memberi jawaban PR secara instan; gunakan metode dialog Socratic (tanyakan balik pemahaman murid)
  * Format Respon: Pendek (maksimal 2-3 paragraf), beri contoh konkret dengan analogi anak-anak
  * Contoh Percakapan (Few-Shot Examples): 2 contoh dialog tanya-jawab murid vs bot saat murid mentok belajar`;
      break;
    }

    case 'cetak': {
      const pType =
        customAnswers.printableType ||
        'Flashcard 2 Sisi (Sisi Depan Gambar & Kata, Sisi Belakang Definisi & Contoh)';
      const pPaperSize =
        customAnswers.paperSize ||
        'Kertas A4 Portrait (21 × 29,7 cm — Standar Printer Sekolah & Rumah)';
      const pCount =
        customAnswers.cardQuantity ||
        '1 Set Utuh Siap Rakit dalam 1–2 Lembar A4/A3';
      const pLayout =
        customAnswers.printLayout ||
        'Buat Gambar Lembar Cetak Utuh Siap Print Ukuran A4/A3 • Tampilkan Garis Potong Putus-Putus (✂) & Garis Lipat Presisi • Margin Tepi Kertas Aman (Tidak Terpotong Printer)';
      const jenjangCetak = data.gradeLevel
        ? `${data.gradeLevel} (${levelLabel})`
        : levelLabel;
      const tujuanCetak =
        learningObjectives && learningObjectives.trim()
          ? `\nTujuan Pembelajaran : ${learningObjectives.trim()}`
          : '';
      const extraCetakNote =
        additionalNotes && additionalNotes.trim()
          ? `\n\nCATATAN TAMBAHAN GURU\n${additionalNotes.trim()}`
          : '';

      return `Anda adalah desainer alat peraga pendidikan profesional, ahli tata letak percetakan sekolah, dan ilustrator media belajar fisik. Tugas Anda adalah LANGSUNG MEMBUATKAN DESAIN VISUAL JADI untuk jenis media cetak & alat peraga yang dipilih dalam UKURAN KERTAS A4 / A3 yang presisi, siap cetak (print-ready), siap gunting/rakit, dan langsung siap dipakai mengajar di kelas.

Buat Gambar / Desain Lembar Media Cetak & Alat Peraga Siap Print (Ukuran A4 / A3)
SPESIFIKASI MEDIA CETAK & UKURAN KERTAS
Jenis Media Cetak & Alat Peraga : ${pType}
Ukuran Kertas Cetak Wajib : ${pPaperSize}
Jumlah Kartu / Komponen : ${pCount}
Mata Pelajaran : ${subject}
Materi / Topik Alat Peraga : ${topic}
Sasaran Peserta Didik : ${jenjangCetak}${tujuanCetak}
Kelengkapan Desain Cetak & Rakit : ${pLayout}
Platform AI Sasaran : ${targetAIName}

KETENTUAN WAJIB PEMBUATAN LANGSUNG MEDIA CETAK UKURAN A4 / A3
1. Buat Langsung Bentuk Media Cetaknya (Bukan Sekadar Uraian Teori): Hasilkan secara langsung desain lembar kerja cetak / template fisik dari "${pType}" untuk materi "${topic}" yang tertata rapi di atas kanvas ukuran "${pPaperSize}" beresolusi tinggi (300 DPI).
2. Presisi Ukuran Kertas A4 / A3 & Margin Printer:
   - Ikuti proporsi ukuran kertas "${pPaperSize}" secara akurat (A4 = 21 × 29,7 cm; A3 = 29,7 × 42 cm).
   - Berikan batas tepi aman (safe print margin) minimal 1 cm di keempat sisi kertas agar tidak ada gambar atau huruf yang terpotong saat dicetak di printer sekolah/rumah.
3. Panduan Potong, Lipat & Rakit yang Jelas:
   - Gambarkan garis potong putus-putus (\`✂ - - - -\`) dengan rapi di sekeliling setiap kartu/komponen serta garis lipat/lem bila "${pType}" memerlukan perakitan.
   - Susun grid komponen sesuai "${pCount}" dengan ukuran proporsional agar nyaman dipegang dan dimainkan siswa ${data.gradeLevel || levelLabel}.
4. Kualitas Visual Edukatif & Keterbacaan Tinggi:
   - Setiap kartu, petak papan permainan, juring roda putar, atau bagian alat peraga WAJIB memiliki ilustrasi full color yang menarik dan relevan dengan materi "${topic}" (${subject}), dipadukan dengan teks/label Bahasa Indonesia yang tajam, kontras, dan mudah dibaca.
   - Sertakan header identitas singkat di tepi atas lembar serta kotak instruksi mini cara merakit & aturan penggunaannya di kelas.

OUTPUT AKHIR
Hasil akhir harus langsung berupa LEMBAR DESAIN MEDIA CETAK & ALAT PERAGA (${pType}) UKURAN A4/A3 yang utuh, full color, rapi, profesional, dan siap langsung di-print oleh guru.${extraCetakNote}`;
    }

    case 'literasi': {
      const genre = customAnswers.storyGenre || 'Fabel Edukatif Fiksi Karakter Pancasila';
      const length = customAnswers.wordCount || '400 - 600 Kata (Pembaca Sedang • Standar Cerita Kelas)';
      const assess = customAnswers.readingAssessment || '5 Soal Pemahaman Berjenjang Literasi AKM (L1, L2, L3)';
      categorySpecificInstructions = `
[DETAIL BACAAN LITERASI & CERITA EDUKATIF]
- Genre & Bentuk Bacaan: ${genre}
- Estimasi Panjang & Keterbacaan: ${length}
- Fitur Pemahaman & Pendamping Bacaan: ${assess}
- Struktur Karya Literasi Lengkap:
  * Judul Bacaan / Cerita yang Memikat & Sesuai Genre "${genre}"
  * Naskah Bacaan Utuh sesuai target panjang "${length}" dengan bahasa kaya imajinasi, komunikatif, dan sesuai perkembangan usia ${data.gradeLevel || levelLabel}
  * Integrasi Nilai Karakter, Konteks Nyata, atau Kearifan Lokal secara alami (tidak menggurui)
  * Seluruh Fitur Pendamping Bacaan yang dipilih (${assess}) disusun lengkap di bawah teks bacaan`;
      break;
    }

    case 'projek': {
      const p5 = customAnswers.p5Theme || 'Gaya Hidup Berkelanjutan';
      const flow = customAnswers.stageFlow || 'Lengkap 4 Tahap';
      const assess = customAnswers.p5Assessment || 'Rubrik 4 Kategori (BB, MB, BSH, SB)';
      categorySpecificInstructions = `
[DETAIL MODUL PROJEK KOKURIKULER (P5)]
- Tema Projek: ${p5}
- Alur Pelaksanaan: ${flow}
- Instrumen Asesmen: ${assess}
- Struktur Lengkap Projek P5:
  * Judul Projek Aksi Nyata yang Inspiratif
  * Latar Belakang Masalah Kontekstual di Lingkungan Sekolah / Masyarakat
  * Dimensi, Elemen, dan Subelemen Profil Pelajar Pancasila yang Dikembangkan
  * Rencana Aktivitas Per Tahap:
    1. Tahap Pengenalan (Membangun kesadaran murid)
    2. Tahap Kontekstualisasi (Riset & wawancara di lingkungan sekitar)
    3. Tahap Aksi (Pembuatan karya / solusi nyata)
    4. Tahap Refleksi & Tindak Lanjut (Pameran karya / Gelar karya & evaluasi)
  * Rubrik Penilaian dengan Indikator Jelas`;
      break;
    }

    default:
      break;
  }

  const dimensionsText = pancasilaDimensions && pancasilaDimensions.length > 0
    ? pancasilaDimensions.map(d => `- ${d}`).join('\n')
    : '- Bernalar Kritis\n- Kreatif\n- Bergotong Royong';

  const diffText = differentiation
    ? `\n[PENDEKATAN BERDIFERENSIASI]
- Sediakan variasi aktivitas untuk 3 kelompok kesiapan belajar:
  1. Murid Butuh Bimbingan: Instruksi lebih visual & bertahap dengan scaffolding
  2. Murid Reguler: Aktivitas sesuai standar Capaian Pembelajaran
  3. Murid Mahir: Tantangan pengayaan / eksplorasi tingkat lanjut`
    : '';

  const objText = learningObjectives && learningObjectives.trim()
    ? `\n[TUJUAN PEMBELAJARAN KHUSUS]\n${learningObjectives.trim()}`
    : '';

  const noteText = additionalNotes && additionalNotes.trim()
    ? `\n[CATATAN TAMBAHAN DARI GURU]\n${additionalNotes.trim()}`
    : '';

  return `Kamu adalah seorang Konsultan Kurikulum Merdeka senior, Ahli Desain Instruksional, dan Pengembang Media Pembelajaran Interaktif terkemuka di Indonesia.

TUGAS UTAMA:
Buatkan rancangan dan konten menyeluruh untuk: "${category.title}" yang siap pakai, berkualitas tinggi, dan interaktif untuk guru di kelas.

[PROFIL KELAS & SASARAN]
- Jenjang Pendidikan & Fase: ${levelLabel}
- Mata Pelajaran: ${subject}
- Materi / Topik Utama: ${topic}
- Model AI Sasaran: ${targetAIName}

[INTEGRASI DIMENSI PROFIL PELAJAR PANCASILA]
${dimensionsText}
${diffText}
${objText}
${categorySpecificInstructions}
${noteText}

[PEDOMAN BAHASA & KUALITAS]
1. Gunakan Bahasa Indonesia yang baku, edukatif, inspiratif, hangat, dan ramah terhadap dunia anak/remaja.
2. Hindari teori yang terlalu berbelit-belit; prioritaskan instruksi praktis, interaktif, dan langsung bisa dieksekusi di ruang kelas.
3. Gunakan formatting Markdown yang rapi (headings, bold, lists, tabel) agar mudah dibaca dan disalin ke dokumen atau slide.

Mulailah hasil karyamu langsung dengan judul yang menarik, tanpa basa-basi pengantar klise seperti "Tentu, ini adalah...".`;
}

function getLevelLabel(level: string): string {
  switch (level) {
    case 'PAUD': return 'PAUD / TK (Usia 4-6 Tahun)';
    case 'SD_FASE_A': return 'SD Kelas 1-2 (Fase A - Membaca Dasar & Konkret)';
    case 'SD_FASE_B': return 'SD Kelas 3-4 (Fase B - Pemahaman Konsep & Eksplorasi)';
    case 'SD_FASE_C': return 'SD Kelas 5-6 (Fase C - Berpikir Kritis & Mandiri)';
    case 'SMP_FASE_D': return 'SMP Kelas 7-9 (Fase D - Kolaborasi & Penalaran)';
    case 'SMA_FASE_E': return 'SMA Kelas 10 (Fase E - Eksplorasi Minat & Analisis)';
    case 'SMA_FASE_F': return 'SMA Kelas 11-12 (Fase F - Pendalaman Konsep & HOTS)';
    case 'SMK': return 'SMK (Kejuruan & Keterampilan Praktik Kerja Nyata)';
    default: return level;
  }
}

function getTargetAIName(ai: string): string {
  switch (ai) {
    case 'dola': return 'Dola AI (Asisten Edukasi Web & WhatsApp)';
    case 'chatgpt': return 'ChatGPT (OpenAI)';
    case 'gemini': return 'Google Gemini (Google AI)';
    case 'claude': return 'Claude (Anthropic)';
    case 'canva': return 'Canva Magic Studio / Canva Code';
    case 'deepseek': return 'DeepSeek AI';
    case 'copilot': return 'Microsoft Copilot';
    case 'perplexity': return 'Perplexity AI';
    case 'quizizz': return 'Quizizz AI';
    case 'gamma': return 'Gamma App AI';
    case 'suno': return 'Suno AI Music (Generator Lagu & Audio Siap Putar)';
    case 'invideo': return 'InVideo / Video AI (Generator Video Pembelajaran Siap Putar)';
    case 'poe': return 'Poe AI';
    default: return ai;
  }
}
