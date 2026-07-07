/* ================================================================
   TRAVEL AROUND THE WORLD 🌍 — interactive map + country explorer
   ================================================================ */
(function () {
  "use strict";

  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var $$ = function (sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  };
  var TG_BOT = "https://t.me/avivaflightsbot";

  /* ---- country quick facts (ISO code → data) ---- */
  var FACTS = {
    TH:{n:"Thailand",f:"🇹🇭",c:"Bangkok",l:"Thai",cu:"THB",p:"70M",t:"Land of smiles, temples, street food paradise ♡"},
    JP:{n:"Japan",f:"🇯🇵",c:"Tokyo",l:"Japanese",cu:"JPY",p:"125M",t:"Cherry blossoms, sushi, bullet trains, anime culture"},
    KR:{n:"South Korea",f:"🇰🇷",c:"Seoul",l:"Korean",cu:"KRW",p:"52M",t:"K-pop, skincare, kimchi, and vibrant Seoul nights"},
    CN:{n:"China",f:"🇨🇳",c:"Beijing",l:"Mandarin",cu:"CNY",p:"1.41B",t:"Great Wall, Forbidden City, 5000 years of history"},
    TW:{n:"Taiwan",f:"🇹🇼",c:"Taipei",l:"Mandarin",cu:"TWD",p:"23.6M",t:"Night markets, bubble tea, Taroko Gorge, Taipei 101"},
    HK:{n:"Hong Kong",f:"🇭🇰",c:"Hong Kong",l:"Cantonese",cu:"HKD",p:"7.5M",t:"Skyline paradise, dim sum, Victoria Peak"},
    SG:{n:"Singapore",f:"🇸🇬",c:"Singapore",l:"English",cu:"SGD",p:"5.7M",t:"Gardens by the Bay, hawker food, Marina Bay Sands"},
    MY:{n:"Malaysia",f:"🇲🇾",c:"Kuala Lumpur",l:"Malay",cu:"MYR",p:"33M",t:"Petronas Towers, rainforests, multicultural food"},
    ID:{n:"Indonesia",f:"🇮🇩",c:"Jakarta",l:"Indonesian",cu:"IDR",p:"276M",t:"Bali beaches, Komodo dragons, 17,000+ islands"},
    PH:{n:"Philippines",f:"🇵🇭",c:"Manila",l:"Filipino",cu:"PHP",p:"113M",t:"7,641 islands, crystal beaches, happy people"},
    VN:{n:"Vietnam",f:"🇻🇳",c:"Hanoi",l:"Vietnamese",cu:"VND",p:"98M",t:"Pho, Ha Long Bay, motorbike energy, rich history"},
    MM:{n:"Myanmar",f:"🇲🇲",c:"Naypyidaw",l:"Burmese",cu:"MMK",p:"54M",t:"Bagan temples, golden pagodas, untouched beauty"},
    KH:{n:"Cambodia",f:"🇰🇭",c:"Phnom Penh",l:"Khmer",cu:"KHR",p:"17M",t:"Angkor Wat, killing fields history, warm smiles"},
    LA:{n:"Laos",f:"🇱🇦",c:"Vientiane",l:"Lao",cu:"LAK",p:"7.4M",t:"Luang Prabang, Mekong River, slow peaceful life"},
    IN:{n:"India",f:"🇮🇳",c:"New Delhi",l:"Hindi",cu:"INR",p:"1.43B",t:"Taj Mahal, curry, Bollywood, incredible diversity"},
    LK:{n:"Sri Lanka",f:"🇱🇰",c:"Colombo",l:"Sinhala",cu:"LKR",p:"22M",t:"Tea plantations, beaches, ancient temples, elephants"},
    NP:{n:"Nepal",f:"🇳🇵",c:"Kathmandu",l:"Nepali",cu:"NPR",p:"30M",t:"Mount Everest, Himalayas, prayer flags, momos"},
    BT:{n:"Bhutan",f:"🇧🇹",c:"Thimphu",l:"Dzongkha",cu:"BTN",p:"0.78M",t:"Gross National Happiness, Tiger's Nest, Himalayan kingdom"},
    BD:{n:"Bangladesh",f:"🇧🇩",c:"Dhaka",l:"Bengali",cu:"BDT",p:"171M",t:"Sundarbans tigers, rivers everywhere, vibrant chaos"},
    PK:{n:"Pakistan",f:"🇵🇰",c:"Islamabad",l:"Urdu",cu:"PKR",p:"240M",t:"K2 mountain, ancient civilizations, rich cuisine"},
    AF:{n:"Afghanistan",f:"🇦🇫",c:"Kabul",l:"Dari",cu:"AFN",p:"41M",t:"Silk Road history, Hindu Kush mountains, resilient people"},
    IR:{n:"Iran",f:"🇮🇷",c:"Tehran",l:"Persian",cu:"IRR",p:"89M",t:"Persian empire, stunning mosques, saffron, poetry"},
    IQ:{n:"Iraq",f:"🇮🇶",c:"Baghdad",l:"Arabic",cu:"IQD",p:"44M",t:"Cradle of civilization, Mesopotamia, Babylon"},
    SA:{n:"Saudi Arabia",f:"🇸🇦",c:"Riyadh",l:"Arabic",cu:"SAR",p:"36M",t:"Mecca, desert dunes, Vision 2030, Red Sea coast"},
    AE:{n:"UAE",f:"🇦🇪",c:"Abu Dhabi",l:"Arabic",cu:"AED",p:"10M",t:"Burj Khalifa, luxury shopping, desert safaris"},
    QA:{n:"Qatar",f:"🇶🇦",c:"Doha",l:"Arabic",cu:"QAR",p:"2.9M",t:"World Cup 2022, Museum of Islamic Art, desert luxury"},
    OM:{n:"Oman",f:"🇴🇲",c:"Muscat",l:"Arabic",cu:"OMR",p:"4.5M",t:"Fjords, forts, frankincense, authentic Arabian charm"},
    YE:{n:"Yemen",f:"🇾🇪",c:"Sanaa",l:"Arabic",cu:"YER",p:"34M",t:"Socotra dragon trees, ancient skyscraper cities"},
    IL:{n:"Israel",f:"🇮🇱",c:"Jerusalem",l:"Hebrew",cu:"ILS",p:"9.5M",t:"Holy land, Dead Sea, Tel Aviv beaches, history"},
    PS:{n:"Palestine",f:"🇵🇸",c:"Ramallah",l:"Arabic",cu:"ILS",p:"5.4M",t:"Bethlehem, olive trees, rich heritage, resilient spirit"},
    JO:{n:"Jordan",f:"🇯🇴",c:"Amman",l:"Arabic",cu:"JOD",p:"11M",t:"Petra, Wadi Rum desert, Dead Sea floating"},
    LB:{n:"Lebanon",f:"🇱🇧",c:"Beirut",l:"Arabic",cu:"LBP",p:"5.5M",t:"Cedars, cuisine, Mediterranean coast, nightlife"},
    SY:{n:"Syria",f:"🇸🇾",c:"Damascus",l:"Arabic",cu:"SYP",p:"22M",t:"Oldest continuously inhabited city, ancient souks"},
    TR:{n:"Turkey",f:"🇹🇷",c:"Ankara",l:"Turkish",cu:"TRY",p:"85M",t:"Istanbul, Cappadocia balloons, kebabs, two continents"},
    GE:{n:"Georgia",f:"🇬🇪",c:"Tbilisi",l:"Georgian",cu:"GEL",p:"3.7M",t:"Wine birthplace, Caucasus mountains, khachapuri"},
    AM:{n:"Armenia",f:"🇦🇲",c:"Yerevan",l:"Armenian",cu:"AMD",p:"2.8M",t:"First Christian nation, Mount Ararat, apricots"},
    AZ:{n:"Azerbaijan",f:"🇦🇿",c:"Baku",l:"Azerbaijani",cu:"AZN",p:"10M",t:"Fire temples, Caspian Sea, Flame Towers"},
    KZ:{n:"Kazakhstan",f:"🇰🇿",c:"Astana",l:"Kazakh",cu:"KZT",p:"19M",t:"Steppes, Baikonur cosmodrome, largest landlocked country"},
    UZ:{n:"Uzbekistan",f:"🇺🇿",c:"Tashkent",l:"Uzbek",cu:"UZS",p:"35M",t:"Silk Road cities Samarkand & Bukhara, plov"},
    KG:{n:"Kyrgyzstan",f:"🇰🇬",c:"Bishkek",l:"Kyrgyz",cu:"KGS",p:"6.7M",t:"Issyk-Kul lake, Tien Shan mountains, nomadic culture"},
    TJ:{n:"Tajikistan",f:"🇹🇯",c:"Dushanbe",l:"Tajik",cu:"TJS",p:"10M",t:"Pamir Highway, roof of the world, Silk Road"},
    TM:{n:"Turkmenistan",f:"🇹🇲",c:"Ashgabat",l:"Turkmen",cu:"TMT",p:"6.4M",t:"Darvaza gas crater 'Door to Hell', white marble city"},
    MN:{n:"Mongolia",f:"🇲🇳",c:"Ulaanbaatar",l:"Mongolian",cu:"MNT",p:"3.4M",t:"Gobi desert, eagle hunters, endless steppes, Genghis Khan"},
    BN:{n:"Brunei",f:"🇧🇳",c:"Bandar Seri Begawan",l:"Malay",cu:"BND",p:"0.45M",t:"Golden mosques, rainforests, oil wealth"},
    TL:{n:"Timor-Leste",f:"🇹🇱",c:"Dili",l:"Portuguese",cu:"USD",p:"1.3M",t:"Youngest country in Asia, pristine reefs, coffee"},
    MV:{n:"Maldives",f:"🇲🇻",c:"Male",l:"Dhivehi",cu:"MVR",p:"0.52M",t:"Overwater villas, coral reefs, paradise islands"},
    /* Europe */
    GB:{n:"United Kingdom",f:"🇬🇧",c:"London",l:"English",cu:"GBP",p:"67M",t:"Big Ben, pub culture, royal family, rainy charm"},
    FR:{n:"France",f:"🇫🇷",c:"Paris",l:"French",cu:"EUR",p:"65M",t:"Eiffel Tower, croissants, Louvre, romance capital"},
    DE:{n:"Germany",f:"🇩🇪",c:"Berlin",l:"German",cu:"EUR",p:"84M",t:"Bavarian castles, beer halls, engineering, history"},
    IT:{n:"Italy",f:"🇮🇹",c:"Rome",l:"Italian",cu:"EUR",p:"59M",t:"Pizza, pasta, Colosseum, Renaissance art, fashion"},
    ES:{n:"Spain",f:"🇪🇸",c:"Madrid",l:"Spanish",cu:"EUR",p:"47M",t:"Flamenco, tapas, Gaudi, sunny beaches, siestas"},
    PT:{n:"Portugal",f:"🇵🇹",c:"Lisbon",l:"Portuguese",cu:"EUR",p:"10M",t:"Pastel de nata, Fado music, Azulejos, Atlantic coast"},
    NL:{n:"Netherlands",f:"🇳🇱",c:"Amsterdam",l:"Dutch",cu:"EUR",p:"17M",t:"Tulips, windmills, canals, cycling, Van Gogh"},
    BE:{n:"Belgium",f:"🇧🇪",c:"Brussels",l:"Dutch",cu:"EUR",p:"12M",t:"Chocolate, waffles, beer, EU headquarters"},
    CH:{n:"Switzerland",f:"🇨🇭",c:"Bern",l:"German",cu:"CHF",p:"8.7M",t:"Alps, chocolate, watches, neutrality, lakes"},
    AT:{n:"Austria",f:"🇦🇹",c:"Vienna",l:"German",cu:"EUR",p:"9M",t:"Mozart, Schnitzel, Vienna Opera, Alpine beauty"},
    IE:{n:"Ireland",f:"🇮🇪",c:"Dublin",l:"English",cu:"EUR",p:"5M",t:"Guinness, Cliffs of Moher, pubs, leprechauns"},
    IS:{n:"Iceland",f:"🇮🇸",c:"Reykjavik",l:"Icelandic",cu:"ISK",p:"0.37M",t:"Northern Lights, geysers, volcanoes, Blue Lagoon"},
    NO:{n:"Norway",f:"🇳🇴",c:"Oslo",l:"Norwegian",cu:"NOK",p:"5.5M",t:"Fjords, midnight sun, Vikings, salmon"},
    SE:{n:"Sweden",f:"🇸🇪",c:"Stockholm",l:"Swedish",cu:"SEK",p:"10M",t:"IKEA, meatballs, ABBA, archipelago, design"},
    DK:{n:"Denmark",f:"🇩🇰",c:"Copenhagen",l:"Danish",cu:"DKK",p:"5.9M",t:"LEGO, hygge, Tivoli, Little Mermaid, bicycles"},
    FI:{n:"Finland",f:"🇫🇮",c:"Helsinki",l:"Finnish",cu:"EUR",p:"5.5M",t:"Saunas, Lapland, Northern Lights, Moomins"},
    PL:{n:"Poland",f:"🇵🇱",c:"Warsaw",l:"Polish",cu:"PLN",p:"38M",t:"Old towns, pierogi, Chopin, resilient history"},
    CZ:{n:"Czech Republic",f:"🇨🇿",c:"Prague",l:"Czech",cu:"CZK",p:"10M",t:"Prague Castle, beer, Kafka, stunning architecture"},
    SK:{n:"Slovakia",f:"🇸🇰",c:"Bratislava",l:"Slovak",cu:"EUR",p:"5.4M",t:"Tatra mountains, castles, folk traditions"},
    HU:{n:"Hungary",f:"🇭🇺",c:"Budapest",l:"Hungarian",cu:"HUF",p:"9.7M",t:"Thermal baths, Danube, goulash, ruin bars"},
    RO:{n:"Romania",f:"🇷🇴",c:"Bucharest",l:"Romanian",cu:"RON",p:"19M",t:"Dracula's castle, Carpathians, medieval towns"},
    BG:{n:"Bulgaria",f:"🇧🇬",c:"Sofia",l:"Bulgarian",cu:"BGN",p:"6.8M",t:"Rose oil, Black Sea, yogurt, Thracian gold"},
    GR:{n:"Greece",f:"🇬🇷",c:"Athens",l:"Greek",cu:"EUR",p:"10M",t:"Acropolis, islands, ouzo, mythology, souvlaki"},
    HR:{n:"Croatia",f:"🇭🇷",c:"Zagreb",l:"Croatian",cu:"EUR",p:"3.9M",t:"Dubrovnik, Plitvice lakes, Adriatic coast"},
    RS:{n:"Serbia",f:"🇷🇸",c:"Belgrade",l:"Serbian",cu:"RSD",p:"6.7M",t:"Nightlife, rakija, EXIT festival, history"},
    SI:{n:"Slovenia",f:"🇸🇮",c:"Ljubljana",l:"Slovenian",cu:"EUR",p:"2.1M",t:"Lake Bled, caves, green capital, Julian Alps"},
    BA:{n:"Bosnia & Herzegovina",f:"🇧🇦",c:"Sarajevo",l:"Bosnian",cu:"BAM",p:"3.2M",t:"Mostar bridge, Ottoman history, mixed cultures"},
    ME:{n:"Montenegro",f:"🇲🇪",c:"Podgorica",l:"Montenegrin",cu:"EUR",p:"0.62M",t:"Bay of Kotor, mountains, Adriatic beauty"},
    AL:{n:"Albania",f:"🇦🇱",c:"Tirana",l:"Albanian",cu:"ALL",p:"2.8M",t:"Bunkers, Albanian Riviera, Ottoman heritage"},
    MK:{n:"North Macedonia",f:"🇲🇰",c:"Skopje",l:"Macedonian",cu:"MKD",p:"2.1M",t:"Lake Ohrid, Alexander the Great, mountains"},
    XK:{n:"Kosovo",f:"🇽🇰",c:"Pristina",l:"Albanian",cu:"EUR",p:"1.8M",t:"Youngest country in Europe, Bear Sanctuary, mountains"},
    EE:{n:"Estonia",f:"🇪🇪",c:"Tallinn",l:"Estonian",cu:"EUR",p:"1.3M",t:"Medieval old town, digital society, forests"},
    LV:{n:"Latvia",f:"🇱🇻",c:"Riga",l:"Latvian",cu:"EUR",p:"1.9M",t:"Art Nouveau, forests, Baltic coast, choir culture"},
    LT:{n:"Lithuania",f:"🇱🇹",c:"Vilnius",l:"Lithuanian",cu:"EUR",p:"2.8M",t:"Amber, Hill of Crosses, oldest Baltic language"},
    BY:{n:"Belarus",f:"🇧🇾",c:"Minsk",l:"Belarusian",cu:"BYN",p:"9.4M",t:"Bialowieza forest, Soviet architecture, potatoes"},
    UA:{n:"Ukraine",f:"🇺🇦",c:"Kyiv",l:"Ukrainian",cu:"UAH",p:"41M",t:"Golden domes, borscht, brave people, wheat fields"},
    MD:{n:"Moldova",f:"🇲🇩",c:"Chisinau",l:"Romanian",cu:"MDL",p:"2.6M",t:"Wine cellars, countryside, hidden European gem"},
    RU:{n:"Russia",f:"🇷🇺",c:"Moscow",l:"Russian",cu:"RUB",p:"144M",t:"Red Square, Hermitage, Trans-Siberian, largest country"},
    LU:{n:"Luxembourg",f:"🇱🇺",c:"Luxembourg",l:"Luxembourgish",cu:"EUR",p:"0.65M",t:"Wealthy grand duchy, EU institutions, castles"},
    MT:{n:"Malta",f:"🇲🇹",c:"Valletta",l:"Maltese",cu:"EUR",p:"0.52M",t:"Knights of Malta, Blue Grotto, ancient temples"},
    CY:{n:"Cyprus",f:"🇨🇾",c:"Nicosia",l:"Greek",cu:"EUR",p:"1.2M",t:"Aphrodite's birthplace, Halloumi, Mediterranean beaches"},
    MC:{n:"Monaco",f:"🇲🇨",c:"Monaco",l:"French",cu:"EUR",p:"0.04M",t:"F1 Grand Prix, casino, yachts, second smallest country"},
    AD:{n:"Andorra",f:"🇦🇩",c:"Andorra la Vella",l:"Catalan",cu:"EUR",p:"0.08M",t:"Pyrenees skiing, tax haven, hiking paradise"},
    LI:{n:"Liechtenstein",f:"🇱🇮",c:"Vaduz",l:"German",cu:"CHF",p:"0.04M",t:"Alpine principality, Vaduz Castle, stamps"},
    SM:{n:"San Marino",f:"🇸🇲",c:"San Marino",l:"Italian",cu:"EUR",p:"0.03M",t:"Oldest republic, Mount Titano, medieval towers"},
    VA:{n:"Vatican City",f:"🇻🇦",c:"Vatican",l:"Italian",cu:"EUR",p:"0.001M",t:"Smallest country, St Peter's, Sistine Chapel, Pope"},
    /* Americas */
    US:{n:"United States",f:"🇺🇸",c:"Washington D.C.",l:"English",cu:"USD",p:"333M",t:"Statue of Liberty, Grand Canyon, Hollywood, diversity"},
    CA:{n:"Canada",f:"🇨🇦",c:"Ottawa",l:"English",cu:"CAD",p:"39M",t:"Niagara Falls, maple syrup, Rockies, polar bears"},
    MX:{n:"Mexico",f:"🇲🇽",c:"Mexico City",l:"Spanish",cu:"MXN",p:"128M",t:"Tacos, Mayan ruins, Day of the Dead, tequila"},
    BR:{n:"Brazil",f:"🇧🇷",c:"Brasilia",l:"Portuguese",cu:"BRL",p:"216M",t:"Carnival, Amazon, Christ the Redeemer, samba, açaí"},
    AR:{n:"Argentina",f:"🇦🇷",c:"Buenos Aires",l:"Spanish",cu:"ARS",p:"46M",t:"Tango, steak, Patagonia, Iguazu Falls, Messi"},
    CL:{n:"Chile",f:"🇨🇱",c:"Santiago",l:"Spanish",cu:"CLP",p:"19M",t:"Atacama Desert, Easter Island, Andes wine"},
    PE:{n:"Peru",f:"🇵🇪",c:"Lima",l:"Spanish",cu:"PEN",p:"34M",t:"Machu Picchu, ceviche, Nazca Lines, Amazon"},
    CO:{n:"Colombia",f:"🇨🇴",c:"Bogota",l:"Spanish",cu:"COP",p:"52M",t:"Coffee, Cartagena, salsa, emeralds, biodiversity"},
    VE:{n:"Venezuela",f:"🇻🇪",c:"Caracas",l:"Spanish",cu:"VES",p:"28M",t:"Angel Falls, oil, arepas, beauty queens"},
    EC:{n:"Ecuador",f:"🇪🇨",c:"Quito",l:"Spanish",cu:"USD",p:"18M",t:"Galapagos Islands, equator line, Andes"},
    BO:{n:"Bolivia",f:"🇧🇴",c:"Sucre",l:"Spanish",cu:"BOB",p:"12M",t:"Salt flats Uyuni, Lake Titicaca, indigenous culture"},
    PY:{n:"Paraguay",f:"🇵🇾",c:"Asuncion",l:"Spanish",cu:"PYG",p:"6.8M",t:"Iguazu Falls, Guarani culture, tereré drink"},
    UY:{n:"Uruguay",f:"🇺🇾",c:"Montevideo",l:"Spanish",cu:"UYU",p:"3.4M",t:"Beef, Mate tea, Punta del Este beaches, progressive"},
    GY:{n:"Guyana",f:"🇬🇾",c:"Georgetown",l:"English",cu:"GYD",p:"0.8M",t:"Kaieteur Falls, rainforest, cricket, only English S. America"},
    SR:{n:"Suriname",f:"🇸🇷",c:"Paramaribo",l:"Dutch",cu:"SRD",p:"0.6M",t:"Dutch-speaking, rainforests, multicultural, Maroon villages"},
    CR:{n:"Costa Rica",f:"🇨🇷",c:"San Jose",l:"Spanish",cu:"CRC",p:"5.2M",t:"Pura vida, rainforests, sloths, no army, eco-paradise"},
    PA:{n:"Panama",f:"🇵🇦",c:"Panama City",l:"Spanish",cu:"PAB",p:"4.4M",t:"Panama Canal, Casco Viejo, tropical islands"},
    GT:{n:"Guatemala",f:"🇬🇹",c:"Guatemala City",l:"Spanish",cu:"GTQ",p:"18M",t:"Tikal ruins, Lake Atitlan, Mayan culture, volcanoes"},
    BZ:{n:"Belize",f:"🇧🇿",c:"Belmopan",l:"English",cu:"BZD",p:"0.4M",t:"Barrier reef, Mayan caves, Caribbean coast, diving"},
    HN:{n:"Honduras",f:"🇭🇳",c:"Tegucigalpa",l:"Spanish",cu:"HNL",p:"10M",t:"Copan ruins, Bay Islands diving, coffee"},
    SV:{n:"El Salvador",f:"🇸🇻",c:"San Salvador",l:"Spanish",cu:"USD",p:"6.3M",t:"Bitcoin country, pupusas, surfing, volcanoes"},
    NI:{n:"Nicaragua",f:"🇳🇮",c:"Managua",l:"Spanish",cu:"NIO",p:"7M",t:"Colonial Granada, volcanoes, lakes, revolution history"},
    CU:{n:"Cuba",f:"🇨🇺",c:"Havana",l:"Spanish",cu:"CUP",p:"11M",t:"Classic cars, cigars, salsa, rum, colonial Havana"},
    JM:{n:"Jamaica",f:"🇯🇲",c:"Kingston",l:"English",cu:"JMD",p:"2.8M",t:"Reggae, Bob Marley, jerk chicken, Blue Mountain coffee"},
    HT:{n:"Haiti",f:"🇭🇹",c:"Port-au-Prince",l:"French",cu:"HTG",p:"11M",t:"First Black republic, Vodou, Citadelle, art"},
    DO:{n:"Dominican Republic",f:"🇩🇴",c:"Santo Domingo",l:"Spanish",cu:"DOP",p:"11M",t:"Baseball, rum, Punta Cana beaches, merengue"},
    BS:{n:"Bahamas",f:"🇧🇸",c:"Nassau",l:"English",cu:"BSD",p:"0.4M",t:"Pig beach, crystal waters, rum, paradise islands"},
    BB:{n:"Barbados",f:"🇧🇧",c:"Bridgetown",l:"English",cu:"BBD",p:"0.29M",t:"Rihanna's birthplace, rum, flying fish, cricket"},
    TT:{n:"Trinidad & Tobago",f:"🇹🇹",c:"Port of Spain",l:"English",cu:"TTD",p:"1.5M",t:"Carnival, steelpan, doubles, oil, Calypso"},
    PR:{n:"Puerto Rico",f:"🇵🇷",c:"San Juan",l:"Spanish",cu:"USD",p:"3.2M",t:"El Yunque rainforest, bioluminescent bays, reggaeton"},
    /* Africa */
    EG:{n:"Egypt",f:"🇪🇬",c:"Cairo",l:"Arabic",cu:"EGP",p:"111M",t:"Pyramids, Sphinx, Nile cruise, Red Sea diving"},
    MA:{n:"Morocco",f:"🇲🇦",c:"Rabat",l:"Arabic",cu:"MAD",p:"37M",t:"Marrakech souks, Sahara, blue Chefchaouen, tagine"},
    ZA:{n:"South Africa",f:"🇿🇦",c:"Pretoria",l:"English",cu:"ZAR",p:"60M",t:"Safari, Table Mountain, Cape Town, Mandela"},
    NG:{n:"Nigeria",f:"🇳🇬",c:"Abuja",l:"English",cu:"NGN",p:"224M",t:"Afrobeats, Nollywood, jollof rice, largest economy"},
    KE:{n:"Kenya",f:"🇰🇪",c:"Nairobi",l:"Swahili",cu:"KES",p:"55M",t:"Masai Mara safari, Nairobi giraffes, tea, runners"},
    ET:{n:"Ethiopia",f:"🇪🇹",c:"Addis Ababa",l:"Amharic",cu:"ETB",p:"127M",t:"Coffee birthplace, Lalibela churches, never colonized"},
    TZ:{n:"Tanzania",f:"🇹🇿",c:"Dodoma",l:"Swahili",cu:"TZS",p:"67M",t:"Serengeti, Kilimanjaro, Zanzibar beaches"},
    GH:{n:"Ghana",f:"🇬🇭",c:"Accra",l:"English",cu:"GHS",p:"34M",t:"Cape Coast Castle, kente cloth, gold, friendly people"},
    UG:{n:"Uganda",f:"🇺🇬",c:"Kampala",l:"Swahili",cu:"UGX",p:"48M",t:"Mountain gorillas, Nile source, Lake Victoria"},
    RW:{n:"Rwanda",f:"🇷🇼",c:"Kigali",l:"Kinyarwanda",cu:"RWF",p:"14M",t:"Gorilla trekking, clean streets, recovery story"},
    SN:{n:"Senegal",f:"🇸🇳",c:"Dakar",l:"French",cu:"XOF",p:"17M",t:"Dakar music, Goree Island, thieboudienne, fashion"},
    CM:{n:"Cameroon",f:"🇨🇲",c:"Yaounde",l:"French",cu:"XAF",p:"28M",t:"'Africa in miniature', beaches, mountains, diverse"},
    DZ:{n:"Algeria",f:"🇩🇿",c:"Algiers",l:"Arabic",cu:"DZD",p:"45M",t:"Sahara desert, Roman ruins, Casbah, Mediterranean"},
    TN:{n:"Tunisia",f:"🇹🇳",c:"Tunis",l:"Arabic",cu:"TND",p:"12M",t:"Carthage ruins, Star Wars sets, Mediterranean beaches"},
    LY:{n:"Libya",f:"🇱🇾",c:"Tripoli",l:"Arabic",cu:"LYD",p:"7M",t:"Sahara, Leptis Magna Roman ruins, oil"},
    SD:{n:"Sudan",f:"🇸🇩",c:"Khartoum",l:"Arabic",cu:"SDG",p:"48M",t:"Nubian pyramids, Red Sea, confluence of Niles"},
    ZW:{n:"Zimbabwe",f:"🇿🇼",c:"Harare",l:"English",cu:"ZWL",p:"16M",t:"Victoria Falls, Great Zimbabwe ruins, wildlife"},
    ZM:{n:"Zambia",f:"🇿🇲",c:"Lusaka",l:"English",cu:"ZMW",p:"20M",t:"Victoria Falls side, copper, walking safaris"},
    NA:{n:"Namibia",f:"🇳🇦",c:"Windhoek",l:"English",cu:"NAD",p:"2.5M",t:"Skeleton Coast, Sossusvlei dunes, Etosha wildlife"},
    BW:{n:"Botswana",f:"🇧🇼",c:"Gaborone",l:"English",cu:"BWP",p:"2.6M",t:"Okavango Delta, Kalahari, elephants, diamonds"},
    MG:{n:"Madagascar",f:"🇲🇬",c:"Antananarivo",l:"Malagasy",cu:"MGA",p:"29M",t:"Lemurs, baobab trees, unique biodiversity"},
    MZ:{n:"Mozambique",f:"🇲🇿",c:"Maputo",l:"Portuguese",cu:"MZN",p:"33M",t:"Bazaruto islands, marrabenta music, Indian Ocean"},
    CI:{n:"Ivory Coast",f:"🇨🇮",c:"Yamoussoukro",l:"French",cu:"XOF",p:"29M",t:"Largest basilica, cocoa producer, Abidjan nightlife"},
    AO:{n:"Angola",f:"🇦🇴",c:"Luanda",l:"Portuguese",cu:"AOA",p:"36M",t:"Kalandula Falls, oil, Portuguese heritage, kizomba"},
    CD:{n:"DR Congo",f:"🇨🇩",c:"Kinshasa",l:"French",cu:"CDF",p:"102M",t:"Congo River, second largest rainforest, rumba"},
    SO:{n:"Somalia",f:"🇸🇴",c:"Mogadishu",l:"Somali",cu:"SOS",p:"18M",t:"Longest coastline in Africa, frankincense, camels"},
    ML:{n:"Mali",f:"🇲🇱",c:"Bamako",l:"French",cu:"XOF",p:"23M",t:"Timbuktu, Dogon cliffs, music legend Salif Keita"},
    MW:{n:"Malawi",f:"🇲🇼",c:"Lilongwe",l:"English",cu:"MWK",p:"21M",t:"Lake Malawi, warm heart of Africa, friendly people"},
    MU:{n:"Mauritius",f:"🇲🇺",c:"Port Louis",l:"English",cu:"MUR",p:"1.3M",t:"Dodo bird origin, paradise beaches, multicultural"},
    SC:{n:"Seychelles",f:"🇸🇨",c:"Victoria",l:"French",cu:"SCR",p:"0.1M",t:"Anse Source d'Argent, giant tortoises, coral reefs"},
    ER:{n:"Eritrea",f:"🇪🇷",c:"Asmara",l:"Tigrinya",cu:"ERN",p:"3.6M",t:"Art Deco Asmara, Red Sea, Italian colonial past"},
    /* Oceania */
    AU:{n:"Australia",f:"🇦🇺",c:"Canberra",l:"English",cu:"AUD",p:"26M",t:"Sydney Opera House, Great Barrier Reef, kangaroos, Outback"},
    NZ:{n:"New Zealand",f:"🇳🇿",c:"Wellington",l:"English",cu:"NZD",p:"5.2M",t:"Middle Earth, kiwis, rugby, Maori culture, fjords"},
    FJ:{n:"Fiji",f:"🇫🇯",c:"Suva",l:"English",cu:"FJD",p:"0.93M",t:"Coral reefs, kava ceremony, 333 islands, paradise"},
    PG:{n:"Papua New Guinea",f:"🇵🇬",c:"Port Moresby",l:"English",cu:"PGK",p:"10M",t:"800+ languages, tribes, Birds of Paradise, rugged"},
    WS:{n:"Samoa",f:"🇼🇸",c:"Apia",l:"Samoan",cu:"WST",p:"0.2M",t:"Tattoo culture, fire knife dance, pristine beaches"},
    TO:{n:"Tonga",f:"🇹🇴",c:"Nuku'alofa",l:"Tongan",cu:"TOP",p:"0.11M",t:"Last Polynesian kingdom, whales, blowholes"},
    VU:{n:"Vanuatu",f:"🇻🇺",c:"Port Vila",l:"Bislama",cu:"VUV",p:"0.32M",t:"Bungee origin (land diving), active volcanoes"},
    SB:{n:"Solomon Islands",f:"🇸🇧",c:"Honiara",l:"English",cu:"SBD",p:"0.72M",t:"WW2 history, lagoons, coconut palms, diving"},
    Fm:{n:"Micronesia",f:"🇫🇲",c:"Palikir",l:"English",cu:"USD",p:"0.12M",t:"Nan Madol ruins, 607 islands, diving paradise"},
    PW:{n:"Palau",f:"🇵🇼",c:"Ngerulmud",l:"English",cu:"USD",p:"0.02M",t:"Jellyfish Lake, Rock Islands, diving mecca"},
    MH:{n:"Marshall Islands",f:"🇲🇭",c:"Majuro",l:"English",cu:"USD",p:"0.04M",t:"Bikini Atoll, stick charts, nuclear history"},
    KI:{n:"Kiribati",f:"🇰🇮",c:"Tarawa",l:"English",cu:"AUD",p:"0.13M",t:"Equator crossing, climate change frontline, fishing"},
    TV:{n:"Tuvalu",f:"🇹🇻",c:"Funafuti",l:"Tuvaluan",cu:"AUD",p:"0.01M",t:"One of smallest countries, .tv domain, sinking nation"},
    NR:{n:"Nauru",f:"🇳🇷",c:"Yaren",l:"Nauruan",cu:"AUD",p:"0.01M",t:"Smallest island nation, phosphate, no official capital"},
    CK:{n:"Cook Islands",f:"🇨🇰",c:"Avarua",l:"English",cu:"NZD",p:"0.02M",t:"Aitutaki lagoon, hibiscus, free association with NZ"},
    NC:{n:"New Caledonia",f:"🇳🇨",c:"Noumea",l:"French",cu:"XPF",p:"0.29M",t:"Largest lagoon, Kanak culture, French Pacific"},
    /* Missing countries */
    BI:{n:"Burundi",f:"🇧🇮",c:"Gitega",l:"Kirundi",cu:"BIF",p:"13M",t:"Heart of Africa, drumming tradition, Lake Tanganyika"},
    EH:{n:"Western Sahara",f:"🇪🇭",c:"El Aaiun",l:"Arabic",cu:"MAD",p:"0.6M",t:"Sahara desert, phosphate, disputed territory, dunes"},
    FK:{n:"Falkland Islands",f:"🇫🇰",c:"Stanley",l:"English",cu:"FKP",p:"0.003M",t:"Penguins, sheep, rugged islands, British overseas territory"},
    KP:{n:"North Korea",f:"🇰🇵",c:"Pyongyang",l:"Korean",cu:"KPW",p:"26M",t:"Most secretive country, Mass Games, Arirang, DMZ"},
    TF:{n:"Fr. Southern Lands",f:"🇹🇫",c:"Port-aux-Francais",l:"French",cu:"EUR",p:"0.0001M",t:"Penguins, research stations, sub-Antarctic islands"},
    CV:{n:"Cape Verde",f:"🇨🇻",c:"Praia",l:"Portuguese",cu:"CVE",p:"0.59M",t:"Volcanic islands, morna music, warm Atlantic paradise"},
    BH:{n:"Bahrain",f:"🇧🇭",c:"Manama",l:"Arabic",cu:"BHD",p:"1.5M",t:"F1 night race, pearls, ancient Dilmun civilization"},
    KW:{n:"Kuwait",f:"🇰🇼",c:"Kuwait City",l:"Arabic",cu:"KWD",p:"4.3M",t:"Oil wealth, dhows, Kuwait Towers, desert"},
    DJ:{n:"Djibouti",f:"🇩🇯",c:"Djibouti",l:"French",cu:"DJF",p:"1M",t:"Lake Assal (lowest in Africa), whale sharks, salt"},
    KM:{n:"Comoros",f:"🇰🇲",c:"Moroni",l:"Comorian",cu:"KMF",p:"0.85M",t:"Perfume islands, volcanoes, ylang-ylang, vanilla"},
    GM:{n:"Gambia",f:"🇬🇲",c:"Banjul",l:"English",cu:"GMD",p:"2.7M",t:"Smiling coast of Africa, river safari, birds"},
    GW:{n:"Guinea-Bissau",f:"🇬🇼",c:"Bissau",l:"Portuguese",cu:"XOF",p:"2.1M",t:"Bijagos Islands, cashew nuts, untamed wilderness"},
    GN:{n:"Guinea",f:"🇬🇳",c:"Conakry",l:"French",cu:"GNF",p:"14M",t:"Fouta Djallon highlands, bauxite, drumming traditions"},
    SL:{n:"Sierra Leone",f:"🇸🇱",c:"Freetown",l:"English",cu:"SLL",p:"8.6M",t:"Rice coast, diamond mines, beaches, resilience"},
    LR:{n:"Liberia",f:"🇱🇷",c:"Monrovia",l:"English",cu:"LRD",p:"5.4M",t:"Founded by freed slaves, rubber, rainforests"},
    TG:{n:"Togo",f:"🇹🇬",c:"Lome",l:"French",cu:"XOF",p:"8.7M",t:"Voodoo birthplace, markets, palm beaches"},
    BJ:{n:"Benin",f:"🇧🇯",c:"Porto-Novo",l:"French",cu:"XOF",p:"13M",t:"Voodoo origins, Ouidah slave history, stilt villages"},
    BF:{n:"Burkina Faso",f:"🇧🇫",c:"Ouagadougou",l:"French",cu:"XOF",p:"23M",t:"FESPACO film festival, mud architecture, masks"},
    NE:{n:"Niger",f:"🇳🇪",c:"Niamey",l:"French",cu:"XOF",p:"27M",t:"Air Mountains, Tuareg caravans, uranium"},
    TD:{n:"Chad",f:"🇹🇩",c:"N'Djamena",l:"French",cu:"XAF",p:"18M",t:"Lake Chad, Sahara, Zakouma elephants"},
    CF:{n:"Central African Republic",f:"🇨🇫",c:"Bangui",l:"French",cu:"XAF",p:"6.1M",t:"Dzanga bai forest elephants, diamonds, raw beauty"},
    CG:{n:"Republic of Congo",f:"🇨🇬",c:"Brazzaville",l:"French",cu:"XAF",p:"6M",t:"Congo River, sapeur fashion, gorillas"},
    GA:{n:"Gabon",f:"🇬🇦",c:"Libreville",l:"French",cu:"XAF",p:"2.4M",t:"Loango national park, gorillas, surfing hippos"},
    GQ:{n:"Equatorial Guinea",f:"🇬🇶",c:"Malabo",l:"Spanish",cu:"XAF",p:"1.6M",t:"Only Spanish-speaking country in Africa, oil, Bioko"},
    LS:{n:"Lesotho",f:"🇱🇸",c:"Maseru",l:"Sesotho",cu:"LSL",p:"2.3M",t:"Kingdom in the sky, blanket culture, mountain ponies"},
    SZ:{n:"Eswatini",f:"🇸🇿",c:"Mbabane",l:"Swazi",cu:"SZL",p:"1.2M",t:"Last absolute monarchy in Africa, Reed Dance, wildlife"},
    ST:{n:"Sao Tome & Principe",f:"🇸🇹",c:"Sao Tome",l:"Portuguese",cu:"STN",p:"0.23M",t:"Chocolate paradise, rainforests, equatorial beauty"},
    MR:{n:"Mauritania",f:"🇲🇷",c:"Nouakchott",l:"Arabic",cu:"MRU",p:"4.9M",t:"Iron ore train, Sahara, ancient cities"},
    SS:{n:"South Sudan",f:"🇸🇸",c:"Juba",l:"English",cu:"SSP",p:"11M",t:"Newest country in the world, Nile, wildlife migrations"},
    /* Islands & territories (not on world map — added as markers) */
    RE:{n:"Reunion",f:"🇷🇪",c:"Saint-Denis",l:"French",cu:"EUR",p:"0.9M",t:"Volcano island, cirques, French tropical paradise"},
    YT:{n:"Mayotte",f:"🇾🇹",c:"Mamoudzou",l:"French",cu:"EUR",p:"0.32M",t:"Lagoon, baobabs, French overseas department"},
    FO:{n:"Faroe Islands",f:"🇫🇴",c:"Torshavn",l:"Faroese",cu:"DKK",p:"0.05M",t:"Sheep islands, cliffs, Viking heritage, waterfalls"},
    GL:{n:"Greenland",f:"🇬🇱",c:"Nuuk",l:"Greenlandic",cu:"DKK",p:"0.06M",t:"Ice sheet, Northern Lights, Inuit culture, icebergs"},
    AW:{n:"Aruba",f:"🇦🇼",c:"Oranjestad",l:"Dutch",cu:"AWG",p:"0.12M",t:"Eagle Beach, flamingos, Dutch Caribbean paradise"},
    CW:{n:"Curacao",f:"🇨🇼",c:"Willemstad",l:"Dutch",cu:"ANG",p:"0.16M",t:"Colorful Dutch colonial, diving, Blue Curacao"},
    SX:{n:"Sint Maarten",f:"🇸🇽",c:"Philipsburg",l:"Dutch",cu:"ANG",p:"0.04M",t:"Half Dutch half French, beaches, airplanes at Maho"},
    BM:{n:"Bermuda",f:"🇧🇲",c:"Hamilton",l:"English",cu:"BMD",p:"0.06M",t:"Pink sand beaches, Bermuda Triangle, shorts!"},
    KY:{n:"Cayman Islands",f:"🇰🇾",c:"George Town",l:"English",cu:"KYD",p:"0.07M",t:"Stingray City, diving, offshore banking"},
    VI:{n:"US Virgin Islands",f:"🇻🇬",c:"Charlotte Amalie",l:"English",cu:"USD",p:"0.1M",t:"Magens Bay, coral reefs, Caribbean paradise"},
    VG:{n:"British Virgin Islands",f:"🇻🇬",c:"Road Town",l:"English",cu:"USD",p:"0.03M",t:"Sailing capital, Bitter End, pristine coves"},
    KN:{n:"St Kitts & Nevis",f:"🇰🇳",c:"Basseterre",l:"English",cu:"XCD",p:"0.05M",t:"Smallest in Americas, sugar city, green vervet monkeys"},
    LC:{n:"St Lucia",f:"🇱🇨",c:"Castries",l:"English",cu:"XCD",p:"0.18M",t:"Pitons, sulfur springs, honeymoon paradise"},
    VC:{n:"St Vincent & Grenadines",f:"🇻🇨",c:"Kingstown",l:"English",cu:"XCD",p:"0.11M",t:"Pirates of Caribbean filmed here, Tobago Cays"},
    GD:{n:"Grenada",f:"🇬🇩",c:"St George's",l:"English",cu:"XCD",p:"0.13M",t:"Spice island, nutmeg, underwater sculpture park"},
    DM:{n:"Dominica",f:"🇩🇲",c:"Roseau",l:"English",cu:"XCD",p:"0.07M",t:"Nature island, boiling lake, 365 rivers"},
    AG:{n:"Antigua & Barbuda",f:"🇦🇬",c:"St John's",l:"English",cu:"XCD",p:"0.1M",t:"365 beaches, cricket, Nelson's Dockyard"},
    GF:{n:"French Guiana",f:"🇬🇫",c:"Cayenne",l:"French",cu:"EUR",p:"0.3M",t:"Spaceport, rainforest, Devil's Island"},
    MQ:{n:"Martinique",f:"🇲🇶",c:"Fort-de-France",l:"French",cu:"EUR",p:"0.37M",t:"Mount Pelee volcano, rum, French Caribbean"},
    GP:{n:"Guadeloupe",f:"🇬🇵",c:"Basse-Terre",l:"French",cu:"EUR",p:"0.38M",t:"Butterfly island, volcano, Creole culture"}
  };

  /* ---- init jsVectorMap ---- */
  var mapEl = $("#worldMap");
  console.log('[TRAVEL] init - mapEl:', !!mapEl, 'jsVectorMap:', typeof window.jsVectorMap);
  if (!mapEl || typeof window.jsVectorMap === "undefined") {
    console.log('[TRAVEL] ABORT: missing mapEl or jsVectorMap');
    return;
  }

  var visited = {};
  try { visited = JSON.parse(localStorage.getItem("nadia_visited") || "{}"); } catch(e) {}

  var pinned = {};
  try { pinned = JSON.parse(localStorage.getItem("nadia_pinned") || "{}"); } catch(e) {}

  /* ---- lat/lon → SVG coords for islands not on map ---- */
  /* World map projection: mill, centralMeridian 11.5, width 900, height ~441 */
  function latLonToSvg(lat, lon) {
    var cm = 11.5;
    var dlon = lon - cm;
    // Normalize to [-180, 180]
    while (dlon > 180) dlon -= 360;
    while (dlon < -180) dlon += 360;
    var x = 450 + (dlon / 180) * 450;
    // Miller projection
    var y = 220.35 - (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 360))) / Math.log(Math.tan(Math.PI / 4 + Math.PI / 4))) * 220.35;
    return { x: x, y: y };
  }

  var ISLANDS = {
    AD:{lat:42.5,lon:1.5}, AG:{lat:17.0,lon:-61.8}, AW:{lat:12.5,lon:-70.0},
    BB:{lat:13.2,lon:-59.5}, BH:{lat:26.0,lon:50.6}, BM:{lat:32.3,lon:-64.8},
    CK:{lat:-21.2,lon:-159.8}, CV:{lat:16.0,lon:-24.0}, CW:{lat:12.1,lon:-68.9},
    DM:{lat:15.4,lon:-61.3}, FO:{lat:62.0,lon:-7.0}, GD:{lat:12.1,lon:-61.7},
    GF:{lat:4.0,lon:-53.0}, GL:{lat:72.0,lon:-40.0}, GP:{lat:16.2,lon:-61.6},
    HK:{lat:22.3,lon:114.2}, KI:{lat:1.4,lon:173.0}, KM:{lat:-11.7,lon:43.4}, KN:{lat:17.4,lon:-62.7},
    KY:{lat:19.3,lon:-81.2}, LC:{lat:13.9,lon:-60.9}, LI:{lat:47.2,lon:9.6},
    MC:{lat:43.7,lon:7.4}, MH:{lat:7.1,lon:171.2}, MQ:{lat:14.6,lon:-61.0},
    MT:{lat:35.9,lon:14.4}, MU:{lat:-20.3,lon:57.5}, MV:{lat:3.2,lon:73.2},
    NR:{lat:-0.5,lon:166.9}, NC:{lat:-21.3,lon:165.5},
    PW:{lat:7.5,lon:134.5}, RE:{lat:-21.1,lon:55.5}, SC:{lat:-4.7,lon:55.5},
    SG:{lat:1.35,lon:103.8}, SM:{lat:43.9,lon:12.5}, ST:{lat:0.3,lon:6.7},
    SX:{lat:18.0,lon:-63.1}, TO:{lat:-21.2,lon:-175.2}, TV:{lat:-7.5,lon:178.7},
    VA:{lat:41.9,lon:12.4}, VC:{lat:13.2,lon:-61.2}, VG:{lat:18.4,lon:-64.6},
    VI:{lat:18.3,lon:-64.9}, WS:{lat:-13.6,lon:-172.4}, XK:{lat:42.6,lon:20.9},
    YT:{lat:-12.8,lon:45.2}
  };

  var pins = {};
  var mapSvg = null;

  function getMapSvg() {
    if (!mapSvg) mapSvg = mapEl.querySelector("svg");
    return mapSvg;
  }

  function getRegionCenter(code) {
    // For islands not on map, use latLon
    if (ISLANDS[code]) {
      return latLonToSvg(ISLANDS[code].lat, ISLANDS[code].lon);
    }
    var svg = getMapSvg();
    if (!svg) return null;
    var path = svg.querySelector('path[data-code="' + code + '"]') || svg.querySelector('path[data-code="' + code.toLowerCase() + '"]');
    if (!path) {
      var paths = svg.querySelectorAll("path");
      for (var i = 0; i < paths.length; i++) {
        if (paths[i].getAttribute("data-code") === code || paths[i].getAttribute("data-code") === code.toLowerCase()) {
          path = paths[i]; break;
        }
      }
    }
    if (!path) return null;
    var bbox = path.getBBox();
    return { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 };
  }

  function renderPins() {
    var svg = getMapSvg();
    if (!svg) return;

    Object.keys(pins).forEach(function (code) {
      if (pins[code] && pins[code].parentNode) pins[code].remove();
    });
    pins = {};

    Object.keys(pinned).forEach(function (code) {
      var center = getRegionCenter(code);
      if (!center) return;

      var data = FACTS[code] || { n: code, f: "📍" };
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "travel-pin");
      g.setAttribute("data-pin-code", code);
      g.style.cursor = "pointer";

      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", center.x);
      circle.setAttribute("cy", center.y);
      circle.setAttribute("r", "6");
      circle.setAttribute("fill", "#e87fa3");
      circle.setAttribute("stroke", "#fff");
      circle.setAttribute("stroke-width", "1.5");
      circle.style.filter = "drop-shadow(0 1px 3px rgba(0,0,0,0.3))";

      var pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      pulse.setAttribute("cx", center.x);
      pulse.setAttribute("cy", center.y);
      pulse.setAttribute("r", "6");
      pulse.setAttribute("fill", "none");
      pulse.setAttribute("stroke", "#e87fa3");
      pulse.setAttribute("stroke-width", "2");
      pulse.setAttribute("opacity", "0.5");
      pulse.setAttribute("class", "pin-pulse-ring");

      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", center.x);
      text.setAttribute("y", center.y - 10);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.style.pointerEvents = "none";
      text.textContent = data.f;

      g.appendChild(pulse);
      g.appendChild(circle);
      g.appendChild(text);

      // Click pin = open modal
      g.addEventListener("click", function (e) {
        e.stopPropagation();
        if (FACTS[code]) showCountry(FACTS[code], code);
        else showUnknown(code);
      });
      // Double-click = remove pin
      g.addEventListener("dblclick", function (e) {
        e.stopPropagation();
        delete pinned[code];
        try { localStorage.setItem("nadia_pinned", JSON.stringify(pinned)); } catch(e2) {}
        renderPins();
        updatePinCount();
      });

      svg.appendChild(g);
      pins[code] = g;
    });
  }

  function updatePinCount() {
    var count = Object.keys(pinned).length;
    var el = $("#pinnedCount");
    if (el) el.textContent = count + " pinned 📍";
  }

  /* ---- render island markers (dots for small countries) ---- */
  function renderIslandMarkers() {
    var svg = getMapSvg();
    if (!svg) return;
    Object.keys(ISLANDS).forEach(function (code) {
      var coords = latLonToSvg(ISLANDS[code].lat, ISLANDS[code].lon);
      var data = FACTS[code];
      if (!data) return;

      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "island-marker");
      g.style.cursor = "pointer";

      var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", coords.x);
      dot.setAttribute("cy", coords.y);
      dot.setAttribute("r", "3.5");
      dot.setAttribute("fill", "#c4a3b5");
      dot.setAttribute("stroke", "#fff");
      dot.setAttribute("stroke-width", "0.8");
      dot.setAttribute("opacity", "0.8");

      g.appendChild(dot);
      g.addEventListener("click", function (e) {
        e.stopPropagation();
        showCountry(data, code);
      });
      g.addEventListener("mouseenter", function () {
        dot.setAttribute("r", "5");
        dot.setAttribute("fill", "#e87fa3");
      });
      g.addEventListener("mouseleave", function () {
        dot.setAttribute("r", "3.5");
        dot.setAttribute("fill", "#c4a3b5");
      });

      svg.appendChild(g);
    });
  }

  new window.jsVectorMap({
    selector: "#worldMap",
    map: "world",
    backgroundColor: "transparent",
    draggable: true,
    zoomButtons: true,
    zoomOnScroll: true,
    zoomOnScrollSpeed: 3,
    zoomMax: 12,
    zoomMin: 1,
    zoomAnimate: true,
    zoomStep: 1.5,
    bindTouchEvents: true,
    showTooltip: true,
    regionStyle: {
      initial: {
        fill: "#e8d5e0",
        "fill-opacity": 0.7,
        stroke: "#c4a3b5",
        "stroke-width": 0.5
      },
      hover: {
        fill: "#e87fa3",
        "fill-opacity": 0.9,
        stroke: "#c2703d",
        "stroke-width": 1
      },
      selected: {
        fill: "#c2703d",
        "fill-opacity": 0.85
      }
    },
    regionsSelectable: false,
    onRegionClick: function (event, code) {
      code = code.toUpperCase();
      console.log('[TRAVEL] clicked region:', code);
      var data = FACTS[code];
      if (data) {
        console.log('[TRAVEL] showing country:', data.n);
        showCountry(data, code);
      } else {
        console.log('[TRAVEL] no data for:', code);
        showUnknown(code);
      }
    },
    onRegionTooltip: function (event, tooltip, code) {
      var data = FACTS[code.toUpperCase()];
      var name = data ? data.f + " " + data.n : code;
      var pin = pinned[code.toUpperCase()] ? " 📍" : "";
      tooltip.html(name + pin);
    },
    onLoaded: function () {
      setTimeout(function () {
        renderIslandMarkers();
        renderPins();
        updatePinCount();
      }, 300);
    }
  });

  /* ---- country modal ---- */
  var modalBg = $("#travelModalBg");
  var modal = $("#travelModal");

  function showCountry(data, code) {
    console.log('[TRAVEL] showCountry called:', code, data.n, 'modalBg:', !!modalBg, 'modal:', !!modal);
    var isVisited = visited[code] ? "✅ Visited" : "🌙 Want to Visit";
    var isPinned = pinned[code];
    modal.innerHTML =
      '<div class="country-modal-flag">' + data.f + '</div>' +
      '<h3>' + data.n + '</h3>' +
      '<div class="country-modal-info">' +
        '<div class="info-row"><span class="info-label">🏛️ Capital</span><span class="info-val">' + data.c + '</span></div>' +
        '<div class="info-row"><span class="info-label">🗣️ Language</span><span class="info-val">' + data.l + '</span></div>' +
        '<div class="info-row"><span class="info-label">💰 Currency</span><span class="info-val">' + data.cu + '</span></div>' +
        '<div class="info-row"><span class="info-label">👥 Population</span><span class="info-val">' + data.p + '</span></div>' +
      '</div>' +
      '<p class="country-modal-fact">' + data.t + '</p>' +
      '<div class="country-modal-actions">' +
        '<a href="' + TG_BOT + '" target="_blank" rel="noopener" class="country-modal-btn primary">✈️ Plan Trip</a>' +
        '<button class="country-modal-btn secondary" id="pinToggleBtn" type="button">' + (isPinned ? "📍 Unpin" : "📌 Pin") + '</button>' +
        '<button class="country-modal-btn secondary" id="visitedToggle" type="button">' + isVisited + '</button>' +
      '</div>';
    modalBg.classList.add("show");

    var ptBtn = $("#pinToggleBtn");
    if (ptBtn) {
      ptBtn.addEventListener("click", function () {
        if (pinned[code]) {
          delete pinned[code];
          ptBtn.textContent = "📌 Pin";
        } else {
          pinned[code] = true;
          ptBtn.textContent = "📍 Unpin";
        }
        try { localStorage.setItem("nadia_pinned", JSON.stringify(pinned)); } catch(e2) {}
        renderPins();
        updatePinCount();
      });
    }

    var vtBtn = $("#visitedToggle");
    if (vtBtn) {
      vtBtn.addEventListener("click", function () {
        if (visited[code]) {
          delete visited[code];
          vtBtn.textContent = "🌙 Want to Visit";
        } else {
          visited[code] = true;
          vtBtn.textContent = "✅ Visited";
        }
        try { localStorage.setItem("nadia_visited", JSON.stringify(visited)); } catch(e) {}
        updateVisitedCount();
      });
    }
  }

  function showUnknown(code) {
    modal.innerHTML =
      '<div class="country-modal-flag">🗺️</div>' +
      '<h3>' + code + '</h3>' +
      '<p class="country-modal-fact">More info coming soon! Want to plan a trip here?</p>' +
      '<a href="' + TG_BOT + '" target="_blank" rel="noopener" class="country-modal-btn primary">✈️ Ask Aviva Flights Bot</a>';
    modalBg.classList.add("show");
  }

  modalBg.addEventListener("click", function (e) {
    if (e.target === modalBg) modalBg.classList.remove("show");
  });

  /* ---- visited counter ---- */
  function updateVisitedCount() {
    var count = Object.keys(visited).length;
    var total = Object.keys(FACTS).length;
    var el = $("#visitedCount");
    if (el) el.textContent = count + " / " + total + " explored";
  }
  updateVisitedCount();

  /* ---- search ---- */
  var searchInput = $("#travelSearch");
  if (searchInput) {
    var resultsEl = $("#travelSearchResults");
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.toLowerCase().trim();
      if (!q) {
        if (resultsEl) resultsEl.innerHTML = "";
        resultsEl.style.display = "none";
        return;
      }
      var matches = [];
      Object.keys(FACTS).forEach(function (code) {
        var d = FACTS[code];
        if (d.n.toLowerCase().indexOf(q) !== -1 || d.c.toLowerCase().indexOf(q) !== -1) {
          matches.push({ code: code, data: d });
        }
      });
      if (resultsEl) {
        if (matches.length === 0) {
          resultsEl.innerHTML = '<div class="search-result-item">No countries found</div>';
        } else {
          resultsEl.innerHTML = matches.slice(0, 12).map(function (m) {
            return '<button class="search-result-item" data-code="' + m.code + '">' + m.data.f + ' ' + m.data.n + '</button>';
          }).join("");
        }
        resultsEl.style.display = "block";
        // Wire clicks
        resultsEl.querySelectorAll(".search-result-item[data-code]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var c = btn.getAttribute("data-code");
            if (FACTS[c]) showCountry(FACTS[c], c);
            resultsEl.style.display = "none";
            searchInput.value = "";
          });
        });
      }
    });
  }
})();
