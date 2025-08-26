//-- What's supported by Deepgram STT, Language.IO Translation, Vonage API TTS
//----------------------------------------------------------------------------

let langSetting = {}; // dictionary

function addToLangSetting (info) {
  langSetting[info[0]] = {};  // e.g. "ar", "eu-ES"
  langSetting[info[0]]["commonName"] = info[1];  // e.g. "English (United States)"
  langSetting[info[0]]["vapiTtsLanguageCode"] = info[2];  // Voice API TTS language code, e.g. "bg-BG"
  langSetting[info[0]]["vapiTtsStyle0"] = info[3];  // preferred Voice API TTS style
  langSetting[info[0]]["vapiTtsStyle1"] = info[4];  
  langSetting[info[0]]["vapiTtsStyle2"] = info[5];
  langSetting[info[0]]["vapiTtsStyle3"] = info[6]; 
  langSetting[info[0]]["standardGreeting"] = info[7];  
  langSetting[info[0]]["shortGreeting"] = info[8]; 
  langSetting[info[0]]["speakNow"] = info[9]; 
  langSetting[info[0]]["enterNumber"] = info[10];
  langSetting[info[0]]["wait"] = info[11]; 
  langSetting[info[0]]["selectLang"] = info[12];
  langSetting[info[0]]["custom1"] = info[13];
  langSetting[info[0]]["custom2"] = info[14];
}

//--

const bgBG = [
  "bg-BG",
  "български (Bulgarian)",
  "bg-BG",
  "0", // female
  "",
  "",
  "",
  "Здравейте, другият човек в този разговор говори на друг език, ще чуете гласа на другия човек и превода на речта му. Тази функция е възможна чрез програмируемите комуникационни услуги на Vonage. Благодаря ви!", // standard greeting
  "здравей", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (bgBG);

const caES = [
  "ca-ES",
  "Català - Valencià (Catalan)",
  "ca-ES",
  "2", // preferred Voice API TTS style, female
  "3", // female
  "",
  "",
  "Hola, l'altra persona en aquesta trucada parla un altre idioma, sentireu la veu de l'altra persona i la traducció del seu discurs. Aquesta característica és possible mitjançant l'ús de serveis de comunicacions programables de Vonage. Gràcies!", // standard greeting
  "Hola", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (caES);

const yueCN = [
  "yue-CN",
  "中国大陆粤语 (Chinese Cantonese - Mainland)",
  "yue-CN",
  "1", // female
  "",
  "",
  "",
  "您好，此通话中的对方说另一种语言，您将听到对方的声音和他们讲话的翻译。使用 Vonage 的可编程通信服务可以实现此功能。谢谢",
  "您好",  // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (yueCN);

const yueHK = [
  "yue-HK",
  "香港華人粵語 (Chinese Cantonese - Hong Kong)",
  "yue-HK",
  "0", // preferred Voice API TTS style, female
  "3", // male
  "1", // female
  "2", // male
  "您好，此通话中的对方说另一种语言，您将听到对方的声音和他们讲话的翻译。使用 Vonage 的可编程通信服务可以实现此功能。谢谢",
  "您好",  // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (yueHK);

const zhCN = [
  "zh-CN",
  "中文普通话 (Chinese Mandarin)",
  "cmn-CN",
  "4", // preferred Voice API TTS style - male
  "2", // female
  "5", // male
  "1", // female
  "您好，此通话中的对方说另一种语言，您将听到对方的声音和他们讲话的翻译。使用 Vonage 的可编程通信服务可以实现此功能。谢谢",
  "您好",  // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (zhCN);

const zhTW = [
  "zh-TW",
  "台灣國語 (Chinese Mandarin - Taiwan)",
  "cmn-TW",
  "2", // preferred Voice API TTS style - male
  "1", // female
  "3", // male
  "",
  "您好，此通话中的对方说另一种语言，您将听到对方的声音和他们讲话的翻译。使用 Vonage 的可编程通信服务可以实现此功能。谢谢",
  "您好",  // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (zhTW);

const csCZ = [
  "cs-CZ",
  "Čeština (Czech)",
  "cs-CZ",
  "0", // female
  "",
  "",
  "",
  "Dobrý den, druhá osoba v tomto hovoru mluví jiným jazykem, uslyšíte hlas druhé osoby a překlad její řeči. Tato funkce je možná pomocí programovatelných komunikačních služeb Vonage. Děkuji!", // standard greeting
  "Ahoj", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (csCZ);

const daDK = [
  "da-DK",
  "Dansk (Danish)",
  "da-DK",
  "1", // preferred Voice API TTS style - female
  "5", // male
  "4", // female
  "3", // female
  "Hej, den anden person på dette opkald taler et andet sprog, du vil høre den andens stemme og oversættelsen af deres tale. Denne funktion er mulig ved at bruge Vonage programmerbare kommunikationstjenester. Tak skal du have!", // standard greeting
  "Hej", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (daDK);

const nlNL = [
  "nl-NL",
  "Nederlands (Dutch)",
  "nl-NL",
  "1", // preferred Voice API TTS style - female
  "5", // male
  "3", // female
  "6", // male
  "Hallo, de andere persoon in dit gesprek spreekt een andere taal, u hoort de stem van de andere persoon en de vertaling van hun spraak. Deze functie is mogelijk door gebruik te maken van programmeerbare communicatiediensten van Vonage. Bedankt!", // standard greeting
  "Hallo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (nlNL);

const enAU = [
  "en-AU",
  "English - Australia",
  "en-AU",
  "4", // preferred Voice API TTS style, male
  "1", // female
  "5", // male
  "2", // female
  "Hello, the other person on this call is speaking another language, you will hear the other person's voice, and the translation of their speech.  This feature is possible by using Vonage programmable communications services. Thank you!",
  "Hello", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (enAU);

const enIN = [
  "en-IN",
  "English - India",
  "en-IN",
  "4", // preferred Voice API TTS style, male
  "2", // female
  "3", // male
  "5", // female
  "Hello, the other person on this call is speaking another language, you will hear the other person's voice, and the translation of their speech.  This feature is possible by using Vonage programmable communications services. Thank you!",
  "Hello", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (enIN);

const enNZ = [
  "en-NZ",
  "English - New Zealand",
  "en-NZ",
  "0", // female
  "",
  "",
  "",
  "Hello, the other person on this call is speaking another language, you will hear the other person's voice, and the translation of their speech.  This feature is possible by using Vonage programmable communications services. Thank you!",
  "Hello", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (enNZ);

const enZA = [
  "en-ZA",
  "English - South Africa",
  "en-ZA",
  "0", // female
  "1", // female
  "",
  "",
  "Hello, the other person on this call is speaking another language, you will hear the other person's voice, and the translation of their speech.  This feature is possible by using Vonage programmable communications services. Thank you!",
  "Hello", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (enZA);

const enGB = [
  "en-GB",
  "English - United Kingdom",
  "en-GB",
  "7", // preferred Voice API TTS style, female
  "5", // male
  "3", // female
  "6", // male
  "Hello, the other person on this call is speaking another language, you will hear the other person's voice, and the translation of their speech.  This feature is possible by using Vonage programmable communications services. Thank you!",
  "Hello", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (enGB);

const enUS = [
  "en-US",
  "English - United States",
  "en-US",
  "11", // preferred Voice API TTS style
  "6", // female
  "10", // male
  "5", // female
  "Hello, the other person on this call is speaking another language, you will hear the other person's voice, and the translation of their speech.  This feature is possible by using Vonage programmable communications services. Thank you!",
  "Hello", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "You have reached the maximum allowed duration for this call. This call is now going to be terminated. Thank you for previewing this new Vonage Communications Platfom feature. Good bye!", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (enUS);

const filPH = [
  "fil-PH",
  "Pilipino (Filipino)",
  "fil-PH",
  "2", // preferred Voice API TTS style, male
  "0", // female
  "1", // female
  "3", // male
  "Kumusta, ang ibang tao sa tawag na ito ay nagsasalita ng ibang wika, maririnig mo ang tinig ng ibang tao, at ang pagsasalin ng kanilang pagsasalita. Ang tampok na ito ay posible sa pamamagitan ng paggamit ng Vonage programmable na mga serbisyo sa komunikasyon. Salamat!", // standard greeting
  "Kumusta", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (filPH);

const fiFI = [
  "fi-FI",
  "Suomalainen (Finnish)",
  "fi-FI",
  "0", // female
  "",
  "", 
  "", 
  "Hei, toinen tämän puhelun henkilö puhuu toista kieltä, kuulet toisen henkilön äänen ja hänen puheensa käännöksen. Tämä ominaisuus on mahdollista käyttämällä Vonage -ohjelmoitavia viestintäpalveluja. Kiitos!", // standard greeting
  "Hei", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (fiFI);

const nlBE = [
  "nl-BE",
  "Vlaams (Flemish)",
  "nl-BE",
  "2", // preferred Voice API TTS style - male
  "0", // female
  "", 
  "",
  "Hallo, de andere persoon in dit gesprek spreekt een andere taal, u hoort de stem van de andere persoon en de vertaling van hun spraak. Deze functie is mogelijk door gebruik te maken van programmeerbare communicatiediensten van Vonage. Bedankt!", // standard greeting
  "Hallo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (nlBE);

const frCA = [
  "fr-CA",
  "Français - Canada (French - Canada)",
  "fr-CA",
  "3", // preferred Voice API TTS style, male
  "2", // female
  "1", // female
  "4", // male
  "Bonjour, l'autre personne sur cet appel parle une autre langue, vous entendrez la voix de l'autre personne et la traduction de leur discours. Cette fonctionnalité est possible en utilisant les services de communications programmables de Vonage. Merci!",
  "Bonjour", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (frCA);

const frFR = [
  "fr-FR",
  "Français - France (French - France)",
  "fr-FR",
  "6", // preferred Voice API TTS style, male
  "2", // female
  "4", // female
  "7", // male
  "Bonjour, l'autre personne sur cet appel parle une autre langue, vous entendrez la voix de l'autre personne et la traduction de leur discours. Cette fonctionnalité est possible en utilisant les services de communications programmables de Vonage. Merci!",
  "Bonjour", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (frFR);

const deDE = [
  "de-DE",
  "Deutsch - Deutschland (German - Germany)",
  "de-DE",
  "4", // preferred Voice API TTS style, male
  "5", // female
  "6", // male
  "2", // female
  "Hallo, die andere Person in diesem Anruf spricht eine andere Sprache, Sie hören die Stimme der anderen Person und die Übersetzung ihrer Sprache. Diese Funktionalität ist mit den programmierbaren Kommunikationsdiensten von Vonage möglich. Vielen Dank!",
  "Hallo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (deDE);

const deCH = [
  "de-CH",
  "Deutsch – Schweiz (German - Switzerland)",
  "de-DE",
  "4", // preferred Voice API TTS style, male
  "5", // female
  "6", // male
  "2", // female
  "Hallo, die andere Person in diesem Anruf spricht eine andere Sprache, Sie hören die Stimme der anderen Person und die Übersetzung ihrer Sprache. Diese Funktionalität ist mit den programmierbaren Kommunikationsdiensten von Vonage möglich. Vielen Dank!",
  "Hallo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (deCH);

const elGR = [
  "el-GR",
  "Ελληνικά (Greek)",
  "el-GR",
  "0", // female
  "",
  "",
  "", 
  "Γεια σας, το άλλο άτομο σε αυτήν την κλήση μιλά άλλη γλώσσα, θα ακούσετε τη φωνή του άλλου και τη μετάφραση της ομιλίας του. Αυτή η δυνατότητα είναι δυνατή με τη χρήση προγραμματιζόμενων υπηρεσιών επικοινωνίας Vonage. Σας ευχαριστώ!", // standard greeting
  "γεια σας", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (elGR);

const hiIN = [
  "hi-IN",
  "हिंदी (Hindi)",
  "hi-IN",
  "1", // preferred Voice API TTS style, female
  "4", // male
  "5", // female 
  "3", // male 
  "नमस्ते, इस कॉल पर दूसरा व्यक्ति दूसरी भाषा बोल रहा है, आप दूसरे व्यक्ति की आवाज़ और उनके भाषण का अनुवाद सुनेंगे। Vonage प्रोग्रामयोग्य संचार सेवाओं का उपयोग करके यह सुविधा संभव है। शुक्रिया!", // standard greeting
  "नमस्ते", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (hiIN);

const huHU = [
  "hu-HU",
  "Magyar (Hungarian)",
  "hu-HU",
  "0", // female
  "",
  "", 
  "", 
  "Helló! A hívásban résztvevő másik személy egy másik nyelvet beszél, hallja a másik személy hangját és beszédének fordítását. Ez a funkció a Vonage programozható kommunikációs szolgáltatások használatával lehetséges. Köszönöm!", // standard greeting
  "Helló!", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (huHU);

const idID = [
  "id-ID",
  "Indonesia (Indonesian)",
  "id-ID",
  "3", // preferred Voice API TTS style, male
  "4", // female
  "2", // male
  "0", // female
  "Halo, orang lain dalam panggilan ini berbicara bahasa lain, Anda akan mendengar suara orang lain, dan terjemahan pidato mereka. Fitur ini dimungkinkan dengan menggunakan layanan komunikasi yang dapat diprogram Vonage. Terima kasih!", // standard greeting
  "Halo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (idID);

const itIT = [
  "it-IT",
  "Italiano (Italian)",
  "it-IT",
  "5", // preferred Voice API TTS style, male
  "2", // female
  "6", // male
  "3", // female
  "Ciao, l'altra persona in questa chiamata parla un'altra lingua, sentirai la voce dell'altra persona e la traduzione del suo discorso. Questa funzionalità è possibile utilizzando i servizi di comunicazione programmabili di Vonage. Grazie!",
  "Ciao", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (itIT);

const jaJP = [
  "ja-JP",
  "日本 (Japanese)",
  "ja-JP",
  "1", // preferred Voice API TTS style, male
  "5", // male
  "2", // female
  "4", // male
  "こんにちは、この通話の他の人は別の言語を話します。あなたは他の人の声と彼らのスピーチの翻訳を聞くでしょう。この機能は、Vonageのプログラム可能な通信サービスを使用して可能です。ありがとうございました！",
  "こんにちは", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (jaJP);

const koKR = [
  "ko-KR",
  "한국인 (Korean)",
  "ko-KR",
  "1", // preferred Voice API TTS style, female
  "4", // male
  "5", // male
  "2", // female
  "안녕하세요, 이 통화의 상대방은 다른 언어를 사용하고 있습니다. 상대방의 음성과 음성 번역을 들을 수 있습니다. 이 기능은 Vonage 프로그래밍 가능한 통신 서비스를 사용하여 가능합니다. 감사합니다!", // standard greeting
  "안녕하십니까", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (koKR);

const lvLV = [
  "lv-LV",
  "Latviešu (Latvian)",
  "lv-LV",
  "0", // male
  "",
  "",
  "",
  "Sveiki! Otra persona šajā zvanā runā citā valodā. Jūs dzirdēsiet otras personas balsi un runas tulkojumu. Šī funkcija ir pieejama, izmantojot Vonage programmējamos sakaru pakalpojumus. Paldies!", // standard greeting
  "Sveiki", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (lvLV);

const ltLT = [
  "lt-LT",
  "Lietuvių (Lithuanian)",
  "lt-LT",
  "0", // male
  "",
  "",
  "",
  "Sveiki, kitas šio skambučio dalyvis kalba kita kalba, girdėsite kito asmens balsą ir jo kalbos vertimą. Ši funkcija įmanoma naudojant Vonage programuojamas ryšio paslaugas. Ačiū!", // standard greeting
  "Sveiki", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (ltLT);

const msMY = [
  "ms-MY",
  "Melayu (Malay)",
  "ms-MY",
  "1", // preferred Voice API TTS style, female
  "2", // male
  "0", // female
  "3", // male
  "Helo, orang lain dalam panggilan ini bercakap bahasa lain, anda akan mendengar suara orang lain dan terjemahan ucapan mereka. Ciri ini boleh dilakukan dengan menggunakan perkhidmatan komunikasi boleh atur cara Vonage. terima kasih!", // standard greeting
  "Helo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (msMY);

const nbNO = [
  "nb-NO",
  "Norsk (Norwegian)",
  "nb-NO",
  "5", // preferred Voice API TTS style, male
  "3", // female
  "4", // male
  "2", // female
  "Hei, den andre personen i denne samtalen snakker et annet språk, du vil høre den andre personens stemme og oversettelsen av talen. Denne funksjonen er mulig ved å bruke Vonage programmerbare kommunikasjonstjenester. Takk skal du ha!", // standard greeting
  "Hallo", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (nbNO);

const plPL = [
  "pl-PL",
  "Polskie (Polish)",
  "pl-PL",
  "7", // preferred Voice API TTS style, male
  "4", // female
  "8", // male
  "2", // female
  "Witaj, druga osoba rozmawiająca mówi w innym języku, usłyszysz głos drugiej osoby i tłumaczenie jej mowy. Ta funkcja jest możliwa dzięki programowalnym usługom komunikacyjnym Vonage. Dziękuję Ci!", // standard greeting
  "Dzień dobry", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (plPL);

const ptBR = [
  "pt-BR",
  "Português - Brasil (Portuguese - Brazil)",
  "pt-BR",
  "1", // preferred Voice API TTS style, female
  "6", // male
  "3", // male
  "",
  "Olá, a outra pessoa nesta chamada está falando outro idioma. Você ouvirá a voz da outra pessoa e a tradução de sua fala. Este recurso é possível usando os serviços de comunicação programáveis Vonage. Obrigado!", // standard greeting
  "Olá", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (ptBR);

const ptPT = [
  "pt-PT",
  "Português - Portugal (Portuguese - Portugal)",
  "pt-PT",
  "7", // preferred Voice API TTS style, male
  "1", // female
  "2", // female
  "",
  "Olá, a outra pessoa nesta chamada está falando outro idioma. Você ouvirá a voz da outra pessoa e a tradução de sua fala. Este recurso é possível usando os serviços de comunicação programáveis Vonage. Obrigado!", // standard greeting
  "Olá", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (ptPT);

const roRO = [
  "ro-RO",
  "Română (Romanian)",
  "ro-RO",
  "2", // preferred Voice API TTS style, female
  "0", // female
  "", 
  "", 
  "Bună ziua, cealaltă persoană din acest apel vorbește o altă limbă, veți auzi vocea celeilalte persoane și traducerea discursului său. Această caracteristică este posibilă prin utilizarea serviciilor de comunicații programabile Vonage. Mulțumesc!", // standard greeting
  "Bună ziua", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (roRO);

const ruRU = [
  "ru-RU",
  "Pусский (Russian)",
  "ru-RU",
  "6", // preferred Voice API TTS style, male
  "3", // female
  "5", // male
  "1", // or "2", female
  "Здравствуйте, собеседник по этому вызову говорит на другом языке, вы услышите его голос и перевод его речи. Эта функциональность возможна с использованием программируемых коммуникационных сервисов Vonage. Спасибо!",
  "Здравствуйте", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (ruRU);

const skSK= [
  "sk-SK",
  "Slovenský (Slovak)",
  "sk-SK",
  "0", // female
  "",
  "", 
  "", 
  "Dobrý deň, druhá osoba v tomto hovore hovorí iným jazykom, budete počuť hlas druhej osoby a preklad jej reči. Táto funkcia je možná pomocou programovateľných komunikačných služieb Vonage. Ďakujem!", // standard greeting
  "Ahoj", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (skSK);

const es419 = [
  "es-419",
  "Español - América Latina (Spanish - Latin America)",
  "es-MX",
  "0", // female
  "",
  "",
  "",
  "Hola, la otra persona en esta llamada habla otro idioma, escucharás la voz de la otra persona y la traducción de su discurso. Esta funcionalidad es posible mediante los servicios de comunicaciones programables de Vonage. ¡Gracias!",
  "Hola", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (es419);

const esES = [
  "es-ES",
  "Español - España (Spanish - Spain)",
  "es-ES",
  "2", // preferred Voice API TTS style, female
  "8", // male
  "6", // female
  "5", // female
  "Hola, la otra persona en esta llamada habla otro idioma, escucharás la voz de la otra persona y la traducción de su discurso. Esta funcionalidad es posible mediante los servicios de comunicaciones programables de Vonage. ¡Gracias!",
  "Hola", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (esES);

const esMX = [
  "es-MX",
  "Español - México (Spanish - Mexico)",
  "es-MX",
  "0", // female
  "",
  "",
  "",
  "Hola, la otra persona en esta llamada habla otro idioma, escucharás la voz de la otra persona y la traducción de su discurso. Esta funcionalidad es posible mediante los servicios de comunicaciones programables de Vonage. ¡Gracias!",
  "Hola", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (esMX);

const esUS = [
  "es-US",
  "Español - Estados Unidos (Spanish - United States)",
  "es-US",
  "4", // preferred Voice API TTS style, male
  "2", // female
  "5", // male
  "",
  "Hola, la otra persona en esta llamada habla otro idioma, escucharás la voz de la otra persona y la traducción de su discurso. Esta funcionalidad es posible mediante los servicios de comunicaciones programables de Vonage. ¡Gracias!",
  "Hola", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (esUS);

const svSE= [
  "sv-SE",
  "Svenska (Swedish)",
  "sv-SE",
  "1", // preferred Voice API TTS style, female
  "5", // female
  "7", // male
  "4", // female
  "Hej, den andra personen i detta samtal talar ett annat språk, du kommer att höra den andra personens röst och översättningen av deras tal. Denna funktion är möjlig genom att använda Vonage programmerbara kommunikationstjänster. Tack!", // standard greeting
  "Hej", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (svSE);

const thTH = [
  "th-TH",
  "ไทย (Thai)",
  "th-TH",
  "1", // female
  "",
  "", 
  "", 
  "สวัสดี บุคคลอื่นในสายนี้กำลังพูดภาษาอื่น คุณจะได้ยินเสียงของอีกฝ่าย และคำแปลคำพูดของพวกเขา คุณลักษณะนี้สามารถทำได้โดยใช้บริการสื่อสารที่ตั้งโปรแกรมได้ของ Vonage ขอขอบคุณ!", // standard greeting
  "สวัสดี", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (thTH);

const trTR = [
  "tr-TR",
  "Türk (Turkish)",
  "tr-TR",
  "6", // preferred Voice API TTS style, male
  "3", // female
  "5", // male
  "2", // female
  "Merhaba, bu görüşmedeki diğer kişi başka bir dil konuşuyor, diğer kişinin sesini ve konuşmalarının çevirisini duyacaksınız. Bu özellik, Vonage programlanabilir iletişim servislerini kullanarak mümkündür. Teşekkürler!", // standard greeting
  "Merhaba", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (trTR);

const ukUA = [
  "uk-UA",
  "Українська (Ukrainian)",
  "uk-UA",
  "0", // female
  "", 
  "", 
  "", 
  "Привіт, інша особа, яка спілкується за цим викликом, розмовляє іншою мовою, ви почуєте голос іншої особи та переклад її мови. Ця функція можлива за допомогою програмованих служб зв'язку Vonage. Дякую!", // standard greeting
  "Здравствуйте", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (ukUA);

const viVN = [
  "vi-VN",
  "Tiếng Việt (Vietnamese)",
  "vi-VN",
  "3", // preferred Voice API TTS style, male
  "0", // female
  "2", // male
  "1", // female
  "Xin chào, người khác trong cuộc gọi này đang nói một ngôn ngữ khác, bạn sẽ nghe thấy giọng nói của người kia và bản dịch bài phát biểu của họ. Tính năng này có thể thực hiện được bằng cách sử dụng các dịch vụ truyền thông có thể lập trình của Vonage. Cảm ơn bạn!", // standard greeting
  "Xin chào", // short greeting
  "", // speak now
  "", // enter number to dial, 2nd-stage dialing
  "", // pls wait before speaking
  "", // select the language you will use to speak
  "", // custom voice prompt 1
  ""  // custom voice prompt 2
  ];
addToLangSetting (viVN);

// console.log ("Language settings:", langSetting);

//========================================================================================================================

module.exports = langSetting;