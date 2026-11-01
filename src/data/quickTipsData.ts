export interface QuickTipStep {
  stepNumber: string;
  phase: string;
  title: string;
  detail: string;
}

export interface CategoryQuickTip {
  categoryId: string;
  shortLabel: string;
  headline: string;
  summary: string;
  bestTiming: string;
  idealDuration: string;
  classGrouping: string;
  steps: QuickTipStep[];
  avoidMistake: string;
  bestPractice: string;
  teacherNote: string;
}

export const QUICK_LEARNING_TIPS: Record<string, CategoryQuickTip> = {
  presentasi: {
    categoryId: 'presentasi',
    shortLabel: 'Presentasi & Canva',
    headline: 'Terapkan Aturan 1 Ide per Slide dengan Jeda Interaksi Tiap 5 Menit',
    summary:
      'Slide presentasi paling efektif ketika berfungsi sebagai jangkar visual diskusi, bukan pengganti buku teks yang dibacakan kata demi kata di depan kelas.',
    bestTiming: 'Apersepsi & Eksplorasi Konsep',
    idealDuration: '15–20 Menit Paparan Interaktif',
    classGrouping: 'Klasikal & Diskusi Sebangku',
    steps: [
      {
        stepNumber: '01',
        phase: 'Persiapan 3 Menit',
        title: 'Uji Keterbacaan dari Kursi Belakang',
        detail:
          'Gunakan ukuran huruf minimal 24pt untuk isi dan kontras tinggi agar tetap terbaca jelas meski pencahayaan ruang kelas terang.',
      },
      {
        stepNumber: '02',
        phase: 'Pembuka Kelas',
        title: 'Mulai dengan Gambar Misteri atau Fenomena',
        detail:
          'Tampilkan 1 visual kontekstual tanpa judul di slide pertama, lalu minta 2–3 murid menebak hubungannya dengan kehidupan sehari-hari.',
      },
      {
        stepNumber: '03',
        phase: 'Saat Menjelaskan',
        title: 'Sisipkan Slide Jeda Think-Pair-Share',
        detail:
          'Setiap 3–4 slide materi, pasang 1 slide pertanyaan pemantik singkat agar murid berdiskusi 60 detik dengan teman sebangku.',
      },
      {
        stepNumber: '04',
        phase: 'Diferensiasi & Penutup',
        title: 'Tutup dengan Cek Pemahaman Cepat',
        detail:
          'Akhiri slide dengan 3 pernyataan Benar/Salah menggunakan isyarat tangan murid sebelum beralih ke penugasan mandiri atau LKPD.',
      },
    ],
    avoidMistake:
      'Menyalin paragraf panjang ke dalam satu slide lalu membacakannya membelakangi siswa.',
    bestPractice:
      'Batasi maksimal 3–4 poin kunci per slide dan padukan dengan ilustrasi, diagram alur, atau studi kasus singkat.',
    teacherNote:
      'Gunakan gaya desain Karton, 2D Ilustratif, atau 3D Ceria untuk jenjang PAUD–SD, serta Infografis Minimalis atau Bento Grid untuk SMP–SMA/SMK.',
  },

  kuis: {
    categoryId: 'kuis',
    shortLabel: 'Kuis & Evaluasi',
    headline: 'Ubah Kuis dari Ujian Menegangkan Menjadi Umpan Balik Belajar Seketika',
    summary:
      'Soal evaluasi HOTS bekerja optimal saat murid diajak membedah alasan di balik pilihan pengecoh, bukan sekadar menghafal kunci jawaban.',
    bestTiming: 'Akhir Materi & Review Formatif',
    idealDuration: '10–25 Menit Asesmen',
    classGrouping: 'Individu atau Tim Cepat Tepat',
    steps: [
      {
        stepNumber: '01',
        phase: 'Penyusunan Soal',
        title: 'Susun Berjenjang dari Mudah ke Penalaran',
        detail:
          'Letakkan 2 soal pemanasan di awal untuk membangun rasa percaya diri murid sebelum masuk ke soal analisis studi kasus (HOTS).',
      },
      {
        stepNumber: '02',
        phase: 'Pelaksanaan',
        title: 'Gunakan Stimulus Kontekstual Dekat Siswa',
        detail:
          'Awali soal dengan cerita pendek, tabel pengamatan, atau situasi nyata di lingkungan sekolah agar siswa melatih literasi dan numerasi.',
      },
      {
        stepNumber: '03',
        phase: 'Pembahasan Aktif',
        title: 'Bedah Opsi Pengecoh Bersama Kelas',
        detail:
          'Setelah kuis selesai, tanyakan mengapa opsi B salah dan konsep apa yang sering tertukar, sehingga miskonsepsi langsung lurus.',
      },
      {
        stepNumber: '04',
        phase: 'Tindak Lanjut',
        title: 'Kelompokkan Hasil untuk Remedial & Pengayaan',
        detail:
          'Gunakan sebaran skor kuis untuk memetakan murid yang butuh pendampingan konsep dasar dan murid yang siap menerima tantangan lanjutan.',
      },
    ],
    avoidMistake:
      'Hanya mengumumkan nilai akhir tanpa membahas letak kekeliruan logika pada soal yang paling banyak salah.',
    bestPractice:
      'Luangkan 5 menit terakhir khusus membedah 2 soal tersulit bersama perwakilan murid yang menjawab benar.',
    teacherNote:
      'Untuk kelas tanpa gawai per siswa, tampilkan soal di proyektor dan gunakan kartu jawaban warna A-B-C-D dari kertas lipat.',
  },

  game: {
    categoryId: 'game',
    shortLabel: 'Game & Ice Breaking',
    headline: 'Kunci Aturan Main dalam 60 Detik dan Hubungkan Kembali ke Inti Materi',
    summary:
      'Permainan edukasi menjaga fokus dan energi belajar siswa, terutama pada jam rawan mengantuk setelah istirahat siang, bila aturannya ringkas dan terarah.',
    bestTiming: 'Transisi Jam Siang & Review Materi',
    idealDuration: '5–15 Menit Terukur',
    classGrouping: 'Regu 4–5 Siswa atau Klasikal',
    steps: [
      {
        stepNumber: '01',
        phase: 'Sebelum Mulai',
        title: 'Contohkan 1 Putaran Percobaan',
        detail:
          'Daripada menjelaskan aturan panjang lebar, langsung peragakan 1 contoh putaran bersama 2 siswa di depan kelas selama 1 menit.',
      },
      {
        stepNumber: '02',
        phase: 'Manajemen Kelas',
        title: 'Sepakati Isyarat Henti Sejak Awal',
        detail:
          'Tentukan satu tepuk kode atau hitungan mundur agar suasana kelas yang seru bisa langsung tenang kembali dalam 5 detik.',
      },
      {
        stepNumber: '03',
        phase: 'Inklusivitas',
        title: 'Beri Peran Beragam di Dalam Regu',
        detail:
          'Bagi tugas sebagai juru bicara, pencatat strategi, dan penjaga waktu agar siswa yang pendiam tetap terlibat aktif tanpa tertekan.',
      },
      {
        stepNumber: '04',
        phase: 'Jembatan Konsep',
        title: 'Tarik Kesimpulan Singkat Seusai Bermain',
        detail:
          'Tanyakan satu hal baru atau strategi kerja sama yang mereka temukan selama permainan lalu kaitkan langsung dengan topik pelajaran.',
      },
    ],
    avoidMistake:
      'Membiarkan permainan berlangsung terlalu lama tanpa batas waktu hingga waktu inti pembelajaran habis.',
    bestPractice:
      'Pasang penghitung waktu mundur di layar dan batasi jumlah babak agar antusiasme siswa tetap tinggi hingga akhir.',
    teacherNote:
      'Pilih format Game Tanpa Alat saat waktu terbatas, atau Estafet Pengetahuan saat ingin melatih kolaborasi aktif.',
  },

  modul: {
    categoryId: 'modul',
    shortLabel: 'Modul Ajar & RPPM',
    headline: 'Selaraskan Tujuan, Aktivitas Inti, dan Asesmen dalam Satu Benang Merah',
    summary:
      'Modul ajar yang kuat bukan diukur dari tebalnya halaman administrasi, melainkan dari kejelasan langkah fasilitasi yang mudah dieksekusi guru di kelas.',
    bestTiming: 'Perencanaan Mingguan & Supervisi',
    idealDuration: 'Sesuai JP Jenjang & Fase',
    classGrouping: 'Fleksibel (Klasikal, Regu, Mandiri)',
    steps: [
      {
        stepNumber: '01',
        phase: 'Pemetaan Awal',
        title: 'Sesuaikan Alokasi Waktu dengan Fase Siswa',
        detail:
          'Pastikan pembagian menit Pendahuluan (15%), Inti (70%), dan Penutup (15%) realistis dengan durasi JP jenjang PAUD, SD, SMP, atau SMA/SMK.',
      },
      {
        stepNumber: '02',
        phase: 'Pemilihan Model',
        title: 'Cocokkan Sintaks Model dengan Karakter Topik',
        detail:
          'Gunakan PBL untuk kasus pemecahan masalah nyata, PjBL untuk karya produk bertahap, atau Discovery Learning untuk penemuan konsep sains.',
      },
      {
        stepNumber: '03',
        phase: 'Diferensiasi Praktis',
        title: 'Siapkan 2–3 Opsi Dukungan Belajar (TaRL)',
        detail:
          'Cantumkan bantuan panduan bertahap bagi kelompok pemula serta tantangan analisis terbuka bagi siswa yang sudah melampaui target.',
      },
      {
        stepNumber: '04',
        phase: 'Refleksi Guru',
        title: 'Catat 2 Hal yang Berhasil Seusai Mengajar',
        detail:
          'Sisakan ruang catatan singkat di akhir modul untuk merekam respons siswa sebagai bahan perbaikan pertemuan berikutnya.',
      },
    ],
    avoidMistake:
      'Menulis tujuan pembelajaran yang tidak diukur sama sekali pada instrumen asesmen formatif maupun sumatif.',
    bestPractice:
      'Pastikan setiap indikator Tujuan Pembelajaran memiliki pasangan aktivitas di Kegiatan Inti dan bukti ukur di Rubrik Penilaian.',
    teacherNote:
      'Gunakan checklist komponen detail pada generator untuk memilih struktur ringkas 3 komponen atau paket lengkap beserta lampiran.',
  },

  lkpd: {
    categoryId: 'lkpd',
    shortLabel: 'LKM / LKPD',
    headline: 'Rancang Lembar Kerja Bertahap dari Mengamati Visual hingga Menalar Mandiri',
    summary:
      'LKPD terbaik menuntun murid menemukan konsep secara bertahap lewat aktivitas mengamati gambar, berdiskusi, dan menyimpulkan dengan bahasa sendiri.',
    bestTiming: 'Kegiatan Inti Eksplorasi & Diskusi',
    idealDuration: '20–35 Menit Pengerjaan',
    classGrouping: 'Kelompok Kecil 3–4 Siswa atau Individu',
    steps: [
      {
        stepNumber: '01',
        phase: 'Tata Letak',
        title: 'Sesuaikan Jumlah Halaman & Soal dengan Waktu',
        detail:
          'Untuk 1 pertemuan (2 JP), kombinasi 2 halaman A4 dengan 5–8 soal berjenjang sudah ideal agar siswa tuntas mengerjakan hingga tahap kesimpulan.',
      },
      {
        stepNumber: '02',
        phase: 'Instruksi Ramah Siswa',
        title: 'Gunakan Kalimat Perintah Aktif & Visual',
        detail:
          'Awali lembar kerja dengan aktivitas mengamati ilustrasi atau tabel sederhana sebelum masuk ke pertanyaan uraian analitis.',
      },
      {
        stepNumber: '03',
        phase: 'Pendampingan',
        title: 'Kelilingi Kelompok dengan Pertanyaan Pancingan',
        detail:
          'Saat kelompok menemui jalan buntu, berikan pertanyaan penuntun ke petunjuk gambar di LKPD alih-alih langsung mendiktekan jawaban.',
      },
      {
        stepNumber: '04',
        phase: 'Presentasi & Refleksi',
        title: 'Lakukan Kunjuangan Karya (Gallery Walk) Singkat',
        detail:
          'Minta tiap kelompok menempelkan hasil LKPD dan saling memberi apresiasi sebelum mengisi kotak refleksi diri di bagian bawah lembar.',
      },
    ],
    avoidMistake:
      'Menjadikan LKPD sekadar kumpulan soal pilihan ganda fotokopian tanpa alur eksplorasi atau ruang kerja visual.',
    bestPractice:
      'Padukan pengamatan gambar kontekstual, tabel pencatatan hasil diskusi, soal penalaran bertahap, dan kolom refleksi perasaan siswa.',
    teacherNote:
      'Manfaatkan fitur pratinjau Lembar Kerja A4 di aplikasi ini untuk mengatur jumlah halaman, jumlah soal, serta mengunduh ke Word atau PDF.',
  },

  infografis: {
    categoryId: 'infografis',
    shortLabel: 'Visual & Infografis',
    headline: 'Sederhanakan Materi Rumit Menjadi Peta Alur Visual yang Mudah Diingat',
    summary:
      'Poster dan infografis membantu memori jangka panjang siswa karena memadukan struktur ruang, pengelompokan warna, dan kata kunci ringkas.',
    bestTiming: 'Pengantar Bab Baru & Rangkuman Akhir',
    idealDuration: '10–15 Menit Pengamatan Terpadu',
    classGrouping: 'Pajangan Kelas & Diskusi Kelompok',
    steps: [
      {
        stepNumber: '01',
        phase: 'Hierarki Visual',
        title: 'Fokuskan pada 1 Pesan Utama per Poster',
        detail:
          'Pilih format yang tepat: Diagram Alir untuk urutan proses, Infografis Versus untuk perbandingan, atau Peta Konsep untuk cabang materi.',
      },
      {
        stepNumber: '02',
        phase: 'Aktivitas Membaca Data',
        title: 'Latih Siswa Menemukan Informasi Tersirat',
        detail:
          'Ajak murid mengamati poster selama 2 menit secara hening, lalu ajukan 3 pertanyaan cepat seputar hubungan sebab-akibat pada gambar.',
      },
      {
        stepNumber: '03',
        phase: 'Kreasi Ulang Siswa',
        title: 'Jadikan Contoh untuk Proyek Sketchnotes',
        detail:
          'Setelah memahami infografis guru, tantang murid membuat versi catatan visual sederhana mereka sendiri di buku gambar atau kertas A4.',
      },
      {
        stepNumber: '04',
        phase: 'Pemanfaatan Berkelanjutan',
        title: 'Pajang di Sudut Belajar sebagai Referensi',
        detail:
          'Cetak dalam ukuran A3 dan tempel di dinding kelas agar murid dapat meninjau ulang rumus atau siklus materi setiap hari secara alami.',
      },
    ],
    avoidMistake:
      'Memakai terlalu banyak jenis huruf dekoratif dan warna mencolok sehingga alur baca mata menjadi membingungkan.',
    bestPractice:
      'Gunakan maksimal 2 jenis font, 3 warna utama yang konsisten per kategori informasi, serta nomor urut alur yang jelas.',
    teacherNote:
      'Aktifkan opsi Palet Warna HEX dan Kata Kunci Elemen Canva pada generator agar proses desain poster jauh lebih cepat.',
  },

  audio: {
    categoryId: 'audio',
    shortLabel: 'Audio & Lagu',
    headline: 'Gunakan Irama Lagu Akrab dan Gerakan Tubuh untuk Mengunci Hafalan Konsep',
    summary:
      'Media lagu pembelajaran dan narasi audio mengaktifkan kecerdasan musikal serta kinestetik, sangat ampuh untuk menghafal urutan konsep atau kosakata.',
    bestTiming: 'Pembuka Pagi, Transisi, & Penutup',
    idealDuration: '5–10 Menit Bernyanyi & Gerak',
    classGrouping: 'Klasikal Serempak atau Bersahutan',
    steps: [
      {
        stepNumber: '01',
        phase: 'Pemilihan Nada',
        title: 'Gunakan Melodi Lagu yang Sudah Dikenal Siswa',
        detail:
          'Memakai nada lagu daerah atau lagu anak populer membuat murid langsung fokus pada isi materi lirik tanpa kesulitan menghafal nada baru.',
      },
      {
        stepNumber: '02',
        phase: 'Latihan Bertahap',
        title: 'Tampilkan Lirik Sambil Peragakan Gerak Kunci',
        detail:
          'Padukan setiap baris lirik penting dengan 1 gerakan tangan sederhana agar memori otot membantu siswa mengingat urutan konsep.',
      },
      {
        stepNumber: '03',
        phase: 'Variasi Interaktif',
        title: 'Mainkan Pola Sambung Lirik Antarbaris Meja',
        detail:
          'Minta barisan kiri menyanyikan baris pertanyaan konsep dan barisan kanan menyahut baris jawabannya agar seluruh kelas menyimak aktif.',
      },
      {
        stepNumber: '04',
        phase: 'Uji Ingatan',
        title: 'Kosongkan Kata Kunci di Layar pada Putaran Ketiga',
        detail:
          'Setelah 2 kali bernyanyi bersama, sembunyikan istilah penting pada lirik di papan tulis untuk menguji apakah konsep sudah melekat.',
      },
    ],
    avoidMistake:
      'Memaksakan kalimat definisi panjang ke dalam satu baris lirik sehingga ketukan lagu menjadi terburu-buru dan sulit dinyanyikan.',
    bestPractice:
      'Potong kalimat menjadi kata kunci pendek bersajak (AABB/ABAB) yang pas dengan jumlah suku kata lagu aslinya.',
    teacherNote:
      'Untuk jenjang SMP–SMA, format Podcast 2 Karakter atau Rap Edukatif berirama ketukan meja sangat disukai siswa.',
  },

  video: {
    categoryId: 'video',
    shortLabel: 'Video Pembelajaran',
    headline: 'Terapkan Teknik Tonton Aktif dengan Pertanyaan Misi Sebelum Memutar Video',
    summary:
      'Video pembelajaran berdurasi singkat (mikro-learning) mampu menghadirkan fenomena sains, sejarah, atau proses industri langsung ke ruang kelas.',
    bestTiming: 'Stimulus Awal atau Kelas Terbalik',
    idealDuration: '2–5 Menit Durasi Video + Diskusi',
    classGrouping: 'Klasikal Proyektor atau Mandiri di Rumah',
    steps: [
      {
        stepNumber: '01',
        phase: 'Sebelum Putar',
        title: 'Beri 2 Pertanyaan Misi Pengamatan',
        detail:
          'Tuliskan 2 hal spesifik yang harus dicari siswa di papan tulis sebelum tombol putar ditekan agar mereka menonton secara sadar dan fokus.',
      },
      {
        stepNumber: '02',
        phase: 'Saat Menonton',
        title: 'Jeda di Titik Krusial untuk Tebak Kelanjutan',
        detail:
          'Hentikan video sejenak tepat sebelum hasil eksperimen muncul, lalu minta siswa memprediksi apa yang akan terjadi beserta alasannya.',
      },
      {
        stepNumber: '03',
        phase: 'Produksi Guru',
        title: 'Rekam dalam Potongan Segmen Pendek 2–3 Menit',
        detail:
          'Saat membuat video sendiri dari skrip 3 kolom, batasi 1 topik spesifik per video dengan kalimat pembuka pemancing rasa ingin tahu di 5 detik pertama.',
      },
      {
        stepNumber: '04',
        phase: 'Pasca-Tonton',
        title: 'Minta Siswa Merangkum dalam 3 Kalimat Sendiri',
        detail:
          'Lanjutkan segera dengan diskusi pasangan atau pencatatan poin inti agar tontonan visual berubah menjadi pemahaman bermakna.',
      },
    ],
    avoidMistake:
      'Memutar video berdurasi lebih dari 10 menit tanpa jeda interaksi sehingga siswa berubah menjadi penonton pasif.',
    bestPractice:
      'Gunakan video pendek 2–4 menit lalu alokasikan porsi waktu lebih besar untuk tanya jawab, simulasi, atau praktik langsung.',
    teacherNote:
      'Skrip 3 kolom (Visual, Narasi, Teks Layar) dari generator ini dapat langsung dipakai merekam di Canva maupun CapCut.',
  },

  chatbot: {
    categoryId: 'chatbot',
    shortLabel: 'Chatbot AI Kelas',
    headline: 'Arahkan AI Sebagai Tutor Socratic yang Menuntun Logika, Bukan Pemberi Contekan',
    summary:
      'Chatbot asisten kelas melatih kemandirian berpikir kritis siswa apabila dibekali instruksi sistem yang ketat untuk bertanya balik secara bertahap.',
    bestTiming: 'Latihan Terbimbing & Konsultasi Mandiri',
    idealDuration: '15–20 Menit Sesi Eksplorasi',
    classGrouping: 'Berpasangan di Lab Komputer atau Proyektor Guru',
    steps: [
      {
        stepNumber: '01',
        phase: 'Pengaturan Sistem',
        title: 'Aktifkan Aturan Anti-Contekan Sejak Awal',
        detail:
          'Pasang prompt instruksi sistem pada Gemini Gem atau ChatGPT agar AI hanya memberi petunjuk bertahap dan menolak memberi jawaban akhir instan.',
      },
      {
        stepNumber: '02',
        phase: 'Literasi AI Siswa',
        title: 'Ajarkan Cara Mengajukan Pertanyaan Spesifik',
        detail:
          'Bimbing siswa menuliskan bagian mana yang sudah mereka coba dan di langkah mana mereka bingung, bukan sekadar menyalin soal mentah.',
      },
      {
        stepNumber: '03',
        phase: 'Verifikasi Kritis',
        title: 'Biasakan Cek Silang Jawaban AI dengan Buku',
        detail:
          'Jadikan momen belajar kritis dengan meminta siswa memvalidasi apakah penjelasan analogi dari chatbot sudah sesuai konsep ilmiah.',
      },
      {
        stepNumber: '04',
        phase: 'Mode Tanpa Gawai Siswa',
        title: 'Tampilkan Chatbot di Proyektor Sebagai Tamu Kelas',
        detail:
          'Bila siswa tidak membawa gawai, guru dapat mengoperasikan chatbot di layar depan untuk simulasi wawancara tokoh sejarah atau ilmuwan.',
      },
    ],
    avoidMistake:
      'Membiarkan siswa menggunakan AI umum tanpa batasan peran sehingga mereka langsung menyalin jawaban tugas tanpa berpikir.',
    bestPractice:
      'Gunakan persona Tutor Socratic dan wajibkan siswa menuliskan kesimpulan akhir menggunakan kalimat tulisan tangan sendiri.',
    teacherNote:
      'Uji coba prompt chatbot buatan Anda terlebih dahulu dengan berpura-pura menjadi murid yang meminta jawaban langsung.',
  },

  cetak: {
    categoryId: 'cetak',
    shortLabel: 'Cetak & Alat Peraga',
    headline: 'Hadirkan Pengalaman Belajar Taktil Tanpa Layar yang Awet Dipakai Lintas Kelas',
    summary:
      'Flashcard, kartu domino materi, kuartet, dan roda putar melatih motorik halus sekaligus interaksi tatap muka langsung antarsiswa di meja kelompok.',
    bestTiming: 'Pos Rotasi Belajar & Penguatan Konsep',
    idealDuration: '15–25 Menit Aktivitas Meja',
    classGrouping: 'Kelompok Meja 4 Siswa atau Stasiun Belajar',
    steps: [
      {
        stepNumber: '01',
        phase: 'Produksi Hemat & Awet',
        title: 'Cetak di Kertas Tebal atau Laminasi Bening',
        detail:
          'Gunakan kertas Brief Card/Art Carton 210 gsm atau lapisi lakban bening lebar agar satu set kartu awet dipakai berulang kali di kelas lain.',
      },
      {
        stepNumber: '02',
        phase: 'Pengorganisasian',
        title: 'Beri Kode Warna di Sudut Setiap Set Kelompok',
        detail:
          'Beri tanda titik warna berbeda untuk tiap amplop kelompok agar kartu yang terjatuh tidak tertukar saat dirapikan kembali.',
      },
      {
        stepNumber: '03',
        phase: 'Libatkan Siswa Merakit',
        title: 'Jadikan Proses Gunting-Lipat Sebagai Bagian Belajar',
        detail:
          'Untuk media Flipbook, Diorama Pop-Up, atau Jaring-Jaring 3D, biarkan siswa merakit sendiri sambil memberi label konsep di tiap sisi.',
      },
      {
        stepNumber: '04',
        phase: 'Variasi Permainan',
        title: 'Gunakan 1 Set Kartu untuk 3 Cara Bermain',
        detail:
          'Satu set flashcard yang sama bisa dipakai untuk tebak cepat berpasangan, susun kategori di meja, maupun estafet mencocokkan definisi.',
      },
    ],
    avoidMistake:
      'Mencetak ukuran teks terlalu kecil dan garis potong terlalu rapat sehingga menyulitkan siswa saat merakit atau membaca kartu.',
    bestPractice:
      'Gunakan batas tepi potong yang tegas, kontras warna jelas, dan simpan setiap set bersama kartu aturan main ringkas di dalam amplop.',
    teacherNote:
      'Pilih opsi Versi Hemat Tinta pada generator bila ingin mencetak lembar potong-tempel hitam-putih untuk diwarnai langsung oleh murid.',
  },

  literasi: {
    categoryId: 'literasi',
    shortLabel: 'Bacaan & Literasi',
    headline: 'Hidupkan Budaya Membaca Lewat Prediksi Cerita, Intonasi, dan Pertanyaan Berjenjang',
    summary:
      'Teks cerita kontekstual dan artikel populer membantu siswa mengaitkan konsep mata pelajaran dengan empati, kosakata baru, dan daya nalar literasi.',
    bestTiming: '15 Menit Literasi Awal & Pengantar Materi',
    idealDuration: '15–20 Menit Membaca & Diskusi',
    classGrouping: 'Membaca Nyaring, Berpasangan, atau Mandiri',
    steps: [
      {
        stepNumber: '01',
        phase: 'Pra-Membaca',
        title: 'Pancing Rasa Penasaran Lewat Judul & Kosakata Kunci',
        detail:
          'Perkenalkan 3 kosakata baru yang akan muncul di cerita dan ajak siswa menebak konflik cerita hanya dari judulnya.',
      },
      {
        stepNumber: '02',
        phase: 'Saat Membaca',
        title: 'Padukan Membaca Nyaring Berintonasi & Membaca Senyap',
        detail:
          'Untuk kelas rendah gunakan teknik Read Aloud ekspresif, sedangkan kelas tinggi beri penanda garis bawah untuk kalimat fakta penting.',
      },
      {
        stepNumber: '03',
        phase: 'Pemahaman Berjenjang',
        title: 'Urutkan Pertanyaan dari Tersurat ke Reflektif (AKM)',
        detail:
          'Mulai dari menemukan fakta di teks (L1), menyimpulkan hubungan peristiwa (L2), hingga menilai tindakan tokoh dalam situasi nyata (L3).',
      },
      {
        stepNumber: '04',
        phase: 'Ekspresi Kreatif',
        title: 'Tantang Siswa Mengubah Akhir Cerita',
        detail:
          'Minta murid menuliskan 3 kalimat solusi alternatif seandainya mereka menjadi tokoh utama di dalam bacaan tersebut.',
      },
    ],
    avoidMistake:
      'Memberikan teks bacaan yang terlalu panjang dengan kalimat majemuk rumit yang tidak sesuai fase keterbacaan usia siswa.',
    bestPractice:
      'Sesuaikan jumlah kata dengan jenjang (100–350 kata untuk PAUD/SD awal, 400–1.000+ kata untuk kelas lanjut) lengkap dengan glosarium mini.',
    teacherNote:
      'Manfaatkan 30 pilihan genre di generator—mulai dari Fabel, Cerita Rakyat Nusantara, Detektif Sains, hingga Teks Stimulus AKM.',
  },

  projek: {
    categoryId: 'projek',
    shortLabel: 'Projek Kokurikuler & P5',
    headline: 'Utamakan Proses Inkuiri dan Refleksi Karakter di Atas Kemewahan Produk Akhir',
    summary:
      'Projek kokurikuler (P5) bertujuan menumbuhkan dimensi Profil Lulusan melalui pemecahan masalah nyata di lingkungan sekitar sekolah secara kolaboratif.',
    bestTiming: 'Blok Waktu Kokurikuler Mingguan / Bulanan',
    idealDuration: 'Bertahap 4 Alur (Pengenalan – Refleksi)',
    classGrouping: 'Tim Kolaboratif Lintas Minat (4–6 Siswa)',
    steps: [
      {
        stepNumber: '01',
        phase: 'Tahap Pengenalan',
        title: 'Mulai dari Pengamatan Masalah Nyata di Sekolah',
        detail:
          'Ajak siswa berkeliling lingkungan sekolah selama 15 menit untuk mencatat isu nyata (sampah, kantin sehat, hemat energi, atau budaya antre).',
      },
      {
        stepNumber: '02',
        phase: 'Kontekstualisasi & Aksi',
        title: 'Gunakan Bahan Sederhana yang Ramah Biaya',
        detail:
          'Rancang aksi nyata dan purwarupa karya dari bahan daur ulang atau sumber daya lokal agar tidak membebani biaya orang tua murid.',
      },
      {
        stepNumber: '03',
        phase: 'Asesmen Proses',
        title: 'Pantau Perkembangan Karakter Lewat Jurnal Singkat',
        detail:
          'Nilai bagaimana siswa berbagi tugas, menyelesaikan perbedaan pendapat, dan menjaga komitmen tim menggunakan rubrik BB, MB, BSH, dan SB.',
      },
      {
        stepNumber: '04',
        phase: 'Gelar Karya & Refleksi',
        title: 'Rayakan Proses Belajar Fokus pada Cerita Perubahan',
        detail:
          'Saat pameran sederhana di kelas, minta tim menceritakan kendala yang berhasil mereka atasi dan kebiasaan baik baru yang berlanjut.',
      },
    ],
    avoidMistake:
      'Berfokus membuat pameran produk megah buatan instan orang tua/guru tanpa keterlibatan proses berpikir dan refleksi murid.',
    bestPractice:
      'Dokumentasikan perjalanan belajar dari sketsa gagal hingga solusi berhasil, lalu jadikan bahan refleksi bersama di akhir projek.',
    teacherNote:
      'Susun jadwal 4 tahapan (Pengenalan, Kontekstualisasi, Aksi, Refleksi) sejak awal agar pelaksanaan projek terukur setiap pekannya.',
  },
};
