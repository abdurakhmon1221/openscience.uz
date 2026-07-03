"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// metadata moved to layout, not used in client components

export default function EditorialBoardPage() {
  const [photoError, setPhotoError] = useState(false);
  const chiefEditors = [
    {
      name: "Rishat Anvari",
      role: "BOSH MUHARRIR",
      institution: "Toshkent Kimyo Xalqaro Universiteti",
      degree: "DSc",
      hasPhoto: true,
      // Photo should be placed at /public/chief-editor.jpg
      photo: "/chief-editor.jpg",
    },
    {
      name: "Qozoqboyeva Dilfuza Ilhomjon qizi",
      role: "BOSH MUHARRIR O'RINBOSARI",
      institution: "Andijan State Institute of Foreign Languages",
      degree: "PhD",
      hasPhoto: false,
      photo: null,
    }
  ];

  const editorialTeam = [
    { name: "Zulunova Iqbolkhon Bakhtiyorovna", institution: "Andijan State Medical Institute", degree: "DSc", extra: "+998 93 780 10 90" },
    { name: "Ahmedov Shamshod Shavkatovich", institution: "Bukhara Medical University, Department of Traumatology and Neurosurgery", degree: "PhD in Philology", extra: "Fadasa_1987@mail.ru | +998(90) 512-49-99" },
    { name: "Qo‘ldashev Qaxramonjon Abduxalilovich", institution: "Andijon Davlat Tibbiyot Instituti", degree: "DSc, Professor", extra: "Bolalar travmatologiyasi, ortopediyasi va neyrojarroxlik kafedrasi mudiri" },
    { name: "Teshayev Azamat A’zamovich", institution: "Bukhara State medical University", degree: "PhD", extra: "Teshayev A.A.@bsmi.uz | +998(93) 67-7-37" },
    { name: "Yadgarova Nargiza Faxritdinovna", institution: "Toshkent Tibbiyot Akademiyasi", degree: "PhD", extra: "7619911@mail.ru | 909216660" },
    { name: "Shamaksudova Saodat Xidoyatovna", institution: "O'zbekistan jurnalistika va Ommaviy Kommunikatsiyalar Universiteti", degree: "PhD, Dotsent", extra: "O'zbek tili va adabiyoti kafedrasi" },
    { name: "Israil Mukaddas Irgashevna", institution: "O'zbekiston Davlat Jahon Tillari Universiteti", degree: "Professor", extra: "Media va Kommunikatsiyalar Fakulteti" },
    { name: "Ravshanova Rano Khandamovna", institution: "-", degree: "PhD in Philology", extra: "" },
    { name: "Sirojiddinova Shahribonu Sirojiddinovna", institution: "Samarqand davlat chet tillar instituti", degree: "", extra: "" },
    { name: "Musayev Akmalbek İbragimdjanovich", institution: "Andijon davlat chet tillari instituti", degree: "PhD in Philology", extra: "" },
    { name: "Shukurova Madina Askarovna", institution: "-", degree: "PhD in Philology", extra: "" },
    { name: "Mamedov Buxar", institution: "Ichki Ishlar Vazirligi Akademiyasi", degree: "DSc in Philology", extra: "" },
    { name: "Нуритдинова Раъно Севдиевна", institution: "Навоий давлат педагогика институти", degree: "Ph.D.", extra: "Ўзбек тили кафедраси мудири" },
    { name: "Yuldashev Jurabek Uralovich", institution: "Navoiy Davlat Pedagogika Instituti", degree: "PhD in Philology", extra: "" },
    { name: "Ernazarova Gulnoza Murodovna", institution: "Navoiy Davlat Pedagogika Instituti", degree: "PhD in Philology", extra: "" },
    { name: "Xolisova Gavharoy Mannobjon qizi", institution: "Andijon davlat chet tillari instituti", degree: "PhD in Philology", extra: "gavharxolisova@gmail.ru | +998(88) 1656262" },
    { name: "Keldiyarova Gulchexra Saydiyevna", institution: "O'zbekiston Milliy universiteti", degree: "Dosent", extra: "O'zbek filologiyasi fakul'teti" },
    { name: "Davlatova Hulkaroy Uktamovna", institution: "Andijon davlat chet tillari instituti", degree: "PhD in Philology", extra: "dhulkaroy@inbox.ru | +998975816655" },
    { name: "Umirzaqov Qodirjon Toyirjonovich", institution: "Andijon davlat chet tillari instituti", degree: "PhD in Philology", extra: "qodiriy777@gmail.com | +998902114394" },
    { name: "Ahunov Muqimjon Muhammadaminovich", institution: "Andijon davlat chet tillari instituti", degree: "PhD in Philology", extra: "muqumjon.axunov.@bk.ru | +998979977443" },
    { name: "Abdurazzakova Shoxida Raximovna", institution: "Guliston Davlat Universiteti", degree: "PhD, Dotsent", extra: "Fakultetlar aro chet tillari kafedrasi mudiri" },
    { name: "Sobirova Ra'noxon Xakimovna", institution: "Andijon Davlat Chet Tillari instituti", degree: "PhD, Dotsent", extra: "sobirovaranohon@gmail.com" },
    { name: "Yaxshiboyeva Gulbaxor Oybek qizi", institution: "Andijon davlat tibbiyot instituti", degree: "PhD", extra: "daminovamubina@inbox.ru" },
    { name: "Isroiljon qizi Gavharoy", institution: "Andijon davlat chet tillari instituti", degree: "PhD in Philology", extra: "gavharoy7575@mail.ru" },
    { name: "Suvankulov Baxtiyor Mamarasulovich", institution: "-", degree: "PhD in Philology", extra: "" },
    { name: "Omonov Nabijon Normamatovich", institution: "Toshkent davlat texnika universiteti", degree: "PhD, Dotsent", extra: "Yer usti transport tizimlari kafedrasi mudiri" },
    { name: "Shuhrat Batirovich Djabbarov", institution: "Toshkent Davlat Transport Universiteti", degree: "PhD, Dotsent", extra: "" },
    { name: "Xakberdiyev Shuxrat Mahramovich", institution: "Jizzax politexnika instituti", degree: "PhD, Dotsent", extra: "Kimyo kafedrasi mudiri | +998 93 650 91 99" },
    { name: "Qobilov Hasan Xalilovich", institution: "Buxoro muhandistlik - texnalogiya instituti", degree: "Docent", extra: "" },
    { name: "Djuraev Khayrullo Fayziyevich", institution: "Bukhara Institute of engineering and technology", degree: "Professor", extra: "Department of information and communication systems" },
    { name: "Сирожиддинов Фазлиддин Насриддинович", institution: "Самарқанд давлат университетининг Каттақўрғон филиали", degree: "PhD", extra: "Илмий ишлар ва инновациялар бўйича директор ўринбосари" },
    { name: "Элмонов Сирожиддин Мамадиярович", institution: "Самарқанд давлат университетининг Каттақўрғон филиали", degree: "PhD", extra: "Директорнинг ўқув ишлари бўйича ўринбосари" },
    { name: "Saliyeva Olima Kamalovna", institution: "Buxoro muhandislik texnologiya instituti", degree: "Dotsent, PhD", extra: "" },
    { name: "Dr. Dinh Tran Ngoc Huy", institution: "Banking University, HCM city, Viet Nam", degree: "PhD candidate", extra: "MBA (Finance and Management)" },
    { name: "Kasimov Baxtiyorjon Murat o'g'li", institution: "-", degree: "PhD in technical sciences", extra: "" },
    { name: "Hikmatov Doniyor Nematovich", institution: "Buxoro muhandislik-texnologiya instituti", degree: "PhD in technical sciences", extra: "Oʻzik-ovkat va kimyo sanoati mashina va jihozlari kafedrasi dotsenti" },
    { name: "Ikramova Muqaddam Madaminovna", institution: "Andijon davlat universiteti", degree: "Ph.D. Dosent", extra: "Zoologiya va biokimyo kafedrasi | +998 90 573 96 55" },
    { name: "Mamatova Irodaxon Yusupovna", institution: "Andijon Davlat Tibbiyot Instituti", degree: "PhD, Dotsent", extra: "Biologik kimyo kafedrasi | +998 99 692 23 39" },
    { name: "Dr. Bogdan Constantin Ungurean", institution: "“Al. I. Cuza” University, Romania", degree: "PhD Biology", extra: "Faculty of Physical Education and Sport" },
    { name: "Islomov Akmal Xushvakovich", institution: "O‘zbekiston Respublikasi Fanlar akademiyasi", degree: "DSc", extra: "Bioorganik kimyo instituti etakchi ilmiy xodimi" },
    { name: "Massoud Kaykhaii", institution: "University of Sistan and Baluchestan, Iran", degree: "PhD, Professor", extra: "Department of Chemistry, Faculty of Sciences" },
    { name: "Khaitbaev Alisher", institution: "Ўзбекистон Миллий университети", degree: "DSc, Professor", extra: "" },
    { name: "Chernyshova Olga Andreevna", institution: "Institute of Management and Socio-Economic Development LLC", degree: "-", extra: "Direktor" },
    { name: "Azizova Kholida Mumin qizi", institution: "Tashkent State Technical University (Almalyk branch)", degree: "PhD in chemical sciences", extra: "Senior teacher" },
    { name: "Нарзикулова Фируза Ботировна", institution: "Самаркандский Государственный Университет им. Ш. Рашидова", degree: "DSc, профессор", extra: "Кафедра «Психология»" },
    { name: "Djuraev Tashpulat Saxievich", institution: "Termiz Davlat universiteti", degree: "PhD, dotsent", extra: "" },
    { name: "Ruziyeva Dilshoda Mavlonovna", institution: "Navoiy Davlat Pedagogika Instituti", degree: "PhD in History", extra: "+998 91 339 21 33" },
    { name: "Abdukhalimov Abdurakhmon Abdumo'minovich", institution: "Andijon Davlat Tibbiyot Instituti", degree: "Dotsent", extra: "+998 93 442 52 00" },
    { name: "Berdiyev Jamshid Panjiyevich", institution: "Qarshi davlat universiteti", degree: "PhD", extra: "Jahon tarixi kafedrasi" },
    { name: "Isroilova Dildora Muxtarovna", institution: "Andijon Davlat Pedagogika Instituti", degree: "DSc", extra: "+9989510556364" },
    { name: "Pulatova Durdona Ravshanovna", institution: "O'zbekistan milliy pedagogika universiteti", degree: "PhD in Pedagogy", extra: "Ingliz tili kafedrasi" },
    { name: "Axmedova Shaira Bilalxanovna", institution: "National Center for teaching educators of Andijan region", degree: "Ph.D", extra: "shoira.ahmedova.66@mail.ru" },
    { name: "Salimov G'ayrat Muxamedovich", institution: "Bukhara State University", degree: "PhD, Professor", extra: "+998(97) 280-41-40" },
    { name: "Nazarova Zulayxa Tolibovna", institution: "Samarqand davlat universitetining kattaqurg‘on filiali", degree: "-", extra: "Maktabgacha ta’lim va pedagogika kafedrasi" },
    { name: "Dr. Ernest-Ehibudu, Ijeoma Regina", institution: "University of Port Harcourt, Nigeria", degree: "PhD", extra: "Senior Lecturer" },
    { name: "Karimov Baxromali Tojimatovich", institution: "Toshkent Davlat texnika universiteti", degree: "PhD", extra: "" },
    { name: "Sultanova Aydin Menlibaevna", institution: "Nukus Davlat Pedagogika Instituti", degree: "PhD", extra: "" },
    { name: "Mustafayev Shomurod Normo'minovich", institution: "Samarqand Davlat Universititeti , Kattaqo'rg'on filiali", degree: "DSc, Docent", extra: "" },
    { name: "Sobirov Furqat Baxromboy O'g'li", institution: "Academy of Ministry of Internal Affairs", degree: "PhD in Law", extra: "farhodsobirov6602@gmail.com | +9989 98 000 66 02" },
    { name: "Razokov Davron Xoliqovich", institution: "Ichki ishlar Vazirligi akademiyasi", degree: "PhD", extra: "+998 90 323 97 28" },
    { name: "Jabborov Zokirjon Qodirjonovich", institution: "IIV Akademiyasi", degree: "PhD, Podpolkovnik", extra: "Jazoni ijro etish faoliyati kafedrasi boshlig'i" },
    { name: "Тўраев Мухаммади", institution: "Самарқанд давлат университети Каттақўрғон филиали", degree: "Ph.D.", extra: "Физика-математика фанлари номзоди" },
    { name: "Orziyev Sardor Samandar o‘g‘li", institution: "Buxoro davlat texnika universiteti", degree: "PhD in technical sciences, Dotsent", extra: "" },
    { name: "Ibragimov Umidjon Xikmatullayevich", institution: "Qarshi davlat texnika universiteti", degree: "DSc, Professor", extra: "" },
    { name: "Eshbekov Bahodir Nurullayevich", institution: "Samarqand davlat tibbiyot universiteti", degree: "PhD", extra: "" },
    { name: "Xolboyeva Gulxayo Xolboyevna", institution: "Samarqand davlat pedagogika instituti", degree: "DSc, Professor v.b.", extra: "" },
    { name: "Xaydarov Baxtiyar Tojiyevich", institution: "Samarqand davlat pedagogika instituti", degree: "DSc, Professor", extra: "" },
    { name: "Inoyatov Ikrom Shahrillayevich", institution: "Buxoro davlat texnika universiteti", degree: "PhD, Dotsent", extra: "" },
    { name: "Eshquvvatov To‘lqinjon Eshquvvatovich", institution: "Samarqand davlat universitetining Kattaqo‘rg‘on filiali", degree: "PhD", extra: "" },
    { name: "Xalbayeva Gulnoza Arshidinovna", institution: "Samarqand davlat universiteti Kattaqo'rg'on filiali", degree: "PhD in Psychology", extra: "" },
    { name: "O‘ktamov Dilyorbek Tojiboevich", institution: "Andijon davlat Universiteti", degree: "PhD, Dotsent", extra: "" },
    { name: "Kazakboyeva Dilfuza Ilxomjon qizi", institution: "Andijan State Institute of Foreign Languages", degree: "PhD, Associate Professor", extra: "" }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-serif text-slate-900 dark:text-white mb-4">
            Tahririyat Hay'ati
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Jurnalimizning yuqori saviyasini ta'minlash va maqolalarni sifatli ko'rib chiqish maqsadida shakllantirilgan xalqaro ekspertlar jamoasi.
          </p>
        </div>

        {/* Chief Editors */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold font-serif text-center mb-10 text-blue-600 dark:text-blue-400">
            Boshqaruv
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {chiefEditors.map((editor, i) => (
              <div key={i} className="liquid-glass-card p-8 flex flex-col items-center text-center">
                {editor.hasPhoto && !photoError ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow-lg mb-4">
                    <Image
                      src={editor.photo!}
                      alt={editor.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      onError={() => setPhotoError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-700">
                    <User size={36} />
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{editor.name}</h3>
                <span className="text-sm font-semibold text-amber-500 mb-3">{editor.role}</span>
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">{editor.institution}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{editor.degree}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Team Grid */}
        <div>
          <h2 className="text-2xl font-bold font-serif text-center mb-10 text-slate-900 dark:text-white">
            Tahririyat A'zolari (Editorial Team)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorialTeam.map((member, i) => (
              <div key={i} className="liquid-glass p-5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{member.name}</h4>
                {member.degree && (
                  <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded mb-2 font-medium">
                    {member.degree}
                  </span>
                )}
                {member.institution !== "-" && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                    {member.institution}
                  </p>
                )}
                {member.extra && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2 mt-2 break-all">
                    {member.extra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
