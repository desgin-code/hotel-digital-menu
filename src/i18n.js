import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      loading: "Loading...",
      loadingText: "Please wait while we fetch the hotel details.",
      welcomeTo: "Welcome to",
      exploreMenu: "Explore our menu or share your thoughts with us.",
      digitalMenu: "Digital Menu",
      digitalMenuText: "Browse and order your favorite dishes effortlessly.",
      feedback: "Feedback",
      feedbackText: "Share your thoughts and help us improve your stay.",
      hotelNotFound: "Hotel Not Found",
      hotelNotFoundText:
        "The hotel you are trying to access does not exist or is unavailable.",
      language: "Language",
      allRightsReserved: "All Rights Reserved",

      bannerDescription: "Discover delicious flavors, fresh dishes, and unforgettable dining experiences.",
      loginToContinue: "Log in to continue",
    },
  },
  hi: {
    translation: {
      loading: "लोड हो रहा है...",
      loadingText: "कृपया प्रतीक्षा करें जबकि हम होटल विवरण ला रहे हैं।",
      welcomeTo: "स्वागत है",
      exploreMenu: "हमारे मेनू का अन्वेषण करें या हमें अपनी राय साझा करें।",
      digitalMenu: "डिजिटल मेनू",
      digitalMenuText: "अपने पसंदीदा व्यंजनों को आसानी से ब्राउज़ और ऑर्डर करें।",
      feedback: "प्रतिपुष्टि",
      feedbackText: "अपनी राय साझा करें और अपने प्रवास को बेहतर बनाने में मदद करें।",
      hotelNotFound: "होटल नहीं मिला",
      hotelNotFoundText:
        "आप जिस होटल तक पहुँचने का प्रयास कर रहे हैं वह उपलब्ध नहीं है।",
      language: "भाषा",
      allRightsReserved: "सर्वाधिकार सुरक्षित",

      bannerDescription: "स्वादिष्ट व्यंजन, ताज़ा भोजन और अविस्मरणीय खाने का अनुभव खोजें।",
      loginToContinue: "जारी रखने के लिए लॉगिन करें",
    }
  },
  sw: {
    translation: {
      loading: "Inapakia...",
      loadingText: "Tafadhali subiri wakati tunapopakua maelezo ya hoteli.",
      welcomeTo: "Karibu",
      exploreMenu: "Chunguza menyu yetu au shiriki maoni yako nasi.",
      digitalMenu: "Menyu ya Kidijitali",
      digitalMenuText: "Pitia na agiza vyakula unavyopenda kwa urahisi.",
      feedback: "Maoni",
      feedbackText: "Shiriki maoni yako na utusaidie kuboresha huduma.",
      hotelNotFound: "Hoteli Haikupatikana",
      hotelNotFoundText:
        "Hoteli unayojaribu kufikia haipo au haipatikani.",
      language: "Lugha",
      allRightsReserved: "Haki Zote Zimehifadhiwa",

      bannerDescription: "Gundua ladha tamu, vyakula vya freshi, na uzoefu wa kula usiosahaulika.",
      loginToContinue: "Ingia ili Kuendelea",
    },
  },
  ar: {
    translation: {
      loading: "جار التحميل...",
      loadingText: "يرجى الانتظار أثناء جلب تفاصيل الفندق.",
      welcomeTo: "مرحبًا بك في",
      exploreMenu: "استكشف قائمتنا أو شارك أفكارك معنا.",
      digitalMenu: "القائمة الرقمية",
      digitalMenuText: "تصفح واطلب أطباقك المفضلة بسهولة.",
      feedback: "التعليقات",
      feedbackText: "شارك أفكارك وساعدنا في تحسين إقامتك.",
      hotelNotFound: "الفندق غير موجود",
      hotelNotFoundText:
        "الفندق الذي تحاول الوصول إليه غير موجود أو غير متاح.",
      language: "اللغة",
      allRightsReserved: "جميع الحقوق محفوظة",

      bannerDescription: "اكتشف النكهات اللذيذة والأطباق الطازجة وتجارب تناول الطعام التي لا تُنسى.",
      loginToContinue: "تسجيل الدخول للمتابعة",
    },
  },


  bn: {
    translation: {
      loading: "লোড হচ্ছে...",
      loadingText: "অনুগ্রহ করে অপেক্ষা করুন, আমরা হোটেলের তথ্য আনছি।",
      welcomeTo: "স্বাগতম",
      exploreMenu: "আমাদের মেনু দেখুন বা আপনার মতামত শেয়ার করুন।",
      digitalMenu: "ডিজিটাল মেনু",
      digitalMenuText: "সহজেই আপনার পছন্দের খাবার ব্রাউজ এবং অর্ডার করুন।",
      feedback: "মতামত",
      feedbackText: "আপনার মতামত শেয়ার করুন এবং আমাদের উন্নত করতে সাহায্য করুন।",
      hotelNotFound: "হোটেল পাওয়া যায়নি",
      hotelNotFoundText: "আপনি যে হোটেলটি খুঁজছেন তা পাওয়া যায়নি বা উপলব্ধ নয়।",
      language: "ভাষা",
      allRightsReserved: "সমস্ত অধিকার সংরক্ষিত",
      bannerDescription: "সুস্বাদু খাবার, তাজা পদ এবং অবিস্মরণীয় ডাইনিং অভিজ্ঞতা আবিষ্কার করুন।",
      loginToContinue: "চালিয়ে যেতে লগইন করুন",
    },
  },

  fr: {
    translation: {
      loading: "Chargement...",
      loadingText: "Veuillez patienter pendant que nous récupérons les détails de l'hôtel.",
      welcomeTo: "Bienvenue à",
      exploreMenu: "Explorez notre menu ou partagez vos avis avec nous.",
      digitalMenu: "Menu numérique",
      digitalMenuText: "Parcourez et commandez vos plats préférés.",
      feedback: "Retour",
      feedbackText: "Partagez vos avis et aidez-nous à améliorer votre séjour.",
      hotelNotFound: "Hôtel introuvable",
      hotelNotFoundText: "L'hôtel que vous essayez d'accéder n'existe pas ou n'est pas disponible.",
      language: "Langue",
      allRightsReserved: "Tous droits réservés",
      bannerDescription: "Découvrez des saveurs délicieuses, des plats frais et des expériences culinaires inoubliables.",
      loginToContinue: "Connectez-vous pour continuer",
    },
  },

  he: {
    translation: {
      loading: "טוען...",
      loadingText: "אנא המתן בזמן שאנו טוענים את פרטי המלון.",
      welcomeTo: "ברוכים הבאים ל",
      exploreMenu: "חקור את התפריט שלנו או שתף את דעתך איתנו.",
      digitalMenu: "תפריט דיגיטלי",
      digitalMenuText: "עיין והזמן את המנות האהובות עליך בקלות.",
      feedback: "משוב",
      feedbackText: "שתף את דעתך ועזור לנו לשפר את השירות.",
      hotelNotFound: "המלון לא נמצא",
      hotelNotFoundText: "המלון שאתה מנסה לגשת אליו אינו קיים או אינו זמין.",
      language: "שפה",
      allRightsReserved: "כל הזכויות שמורות",
      bannerDescription: "גלה טעמים טעימים, מנות טריות וחוויות אוכל בלתי נשכחות.",
      loginToContinue: "התחבר כדי להמשיך",
    },
  },

  ja: {
    translation: {
      loading: "読み込み中...",
      loadingText: "ホテルの詳細を取得しています。しばらくお待ちください。",
      welcomeTo: "ようこそ",
      exploreMenu: "メニューをご覧いただくか、ご意見をお聞かせください。",
      digitalMenu: "デジタルメニュー",
      digitalMenuText: "お気に入りの料理を簡単に閲覧して注文できます。",
      feedback: "フィードバック",
      feedbackText: "ご意見を共有して、サービス向上にご協力ください。",
      hotelNotFound: "ホテルが見つかりません",
      hotelNotFoundText: "アクセスしようとしているホテルは存在しないか利用できません。",
      language: "言語",
      allRightsReserved: "全著作権所有",
      bannerDescription: "美味しい料理、新鮮な料理、忘れられない食体験を発見してください。",
      loginToContinue: "続行するにはログインしてください",
    },
  },


};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
