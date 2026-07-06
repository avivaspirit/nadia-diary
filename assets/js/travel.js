/* ================================================================
   TRAVEL AROUND THE WORLD 🌍 — country explorer + trip planner
   ================================================================ */
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.from(document.querySelectorAll(s)); };
  var TG_BOT = "https://t.me/avivaflightsbot";

  /* ---- country data (compact) ---- */
  var C = {
    asia: [
      {n:"Thailand",f:"🇹🇭",c:"Bangkok",l:"Thai",cu:"THB",p:"70M",t:"Land of smiles, temples, street food paradise ♡"},
      {n:"Japan",f:"🇯🇵",c:"Tokyo",l:"Japanese",cu:"JPY",p:"125M",t:"Cherry blossoms, sushi, bullet trains, anime culture"},
      {n:"South Korea",f:"🇰🇷",c:"Seoul",l:"Korean",cu:"KRW",p:"52M",t:"K-pop, skincare, kimchi, and vibrant Seoul nights"},
      {n:"China",f:"🇨🇳",c:"Beijing",l:"Mandarin",cu:"CNY",p:"1.41B",t:"Great Wall, Forbidden City, 5000 years of history"},
      {n:"Taiwan",f:"🇹🇼",c:"Taipei",l:"Mandarin",cu:"TWD",p:"23.6M",t:"Night markets, bubble tea, Taroko Gorge, Taipei 101"},
      {n:"Hong Kong",f:"🇭🇰",c:"Hong Kong",l:"Cantonese",cu:"HKD",p:"7.5M",t:"Skyline paradise, dim sum, Victoria Peak"},
      {n:"Singapore",f:"🇸🇬",c:"Singapore",l:"English",cu:"SGD",p:"5.7M",t:"Gardens by the Bay, hawker food, Marina Bay Sands"},
      {n:"Malaysia",f:"🇲🇾",c:"Kuala Lumpur",l:"Malay",cu:"MYR",p:"33M",t:"Petronas Towers, rainforests, multicultural food"},
      {n:"Indonesia",f:"🇮🇩",c:"Jakarta",l:"Indonesian",cu:"IDR",p:"276M",t:"Bali beaches, Komodo dragons, 17,000+ islands"},
      {n:"Philippines",f:"🇵🇭",c:"Manila",l:"Filipino",cu:"PHP",p:"113M",t:"7,641 islands, crystal beaches, happy people"},
      {n:"Vietnam",f:"🇻🇳",c:"Hanoi",l:"Vietnamese",cu:"VND",p:"98M",t:"Pho, Ha Long Bay, motorbike energy, rich history"},
      {n:"Myanmar",f:"🇲🇲",c:"Naypyidaw",l:"Burmese",cu:"MMK",p:"54M",t:"Bagan temples, golden pagodas, untouched beauty"},
      {n:"Cambodia",f:"🇰🇭",c:"Phnom Penh",l:"Khmer",cu:"KHR",p:"17M",t:"Angkor Wat, killing fields history, warm smiles"},
      {n:"Laos",f:"🇱🇦",c:"Vientiane",l:"Lao",cu:"LAK",p:"7.4M",t:"Luang Prabang, Mekong River, slow peaceful life"},
      {n:"India",f:"🇮🇳",c:"New Delhi",l:"Hindi",cu:"INR",p:"1.43B",t:"Taj Mahal, curry, Bollywood, incredible diversity"},
      {n:"Sri Lanka",f:"🇱🇰",c:"Colombo",l:"Sinhala",cu:"LKR",p:"22M",t:"Tea plantations, beaches, ancient temples, elephants"},
      {n:"Nepal",f:"🇳🇵",c:"Kathmandu",l:"Nepali",cu:"NPR",p:"30M",t:"Mount Everest, Himalayas, prayer flags, momos"},
      {n:"Bhutan",f:"🇧🇹",c:"Thimphu",l:"Dzongkha",cu:"BTN",p:"0.78M",t:"Gross National Happiness, Tiger's Nest, Himalayan kingdom"},
      {n:"Bangladesh",f:"🇧🇩",c:"Dhaka",l:"Bengali",cu:"BDT",p:"171M",t:"Sundarbans tigers, rivers everywhere, vibrant chaos"},
      {n:"Pakistan",f:"🇵🇰",c:"Islamabad",l:"Urdu",cu:"PKR",p:"240M",t:"K2 mountain, ancient civilizations, rich cuisine"},
      {n:"Afghanistan",f:"🇦🇫",c:"Kabul",l:"Dari",cu:"AFN",p:"41M",t:"Silk Road history, Hindu Kush mountains, resilient people"},
      {n:"Iran",f:"🇮🇷",c:"Tehran",l:"Persian",cu:"IRR",p:"89M",t:"Persian empire, stunning mosques, saffron, poetry"},
      {n:"Iraq",f:"🇮🇶",c:"Baghdad",l:"Arabic",cu:"IQD",p:"44M",t:"Cradle of civilization, Mesopotamia, Babylon"},
      {n:"Saudi Arabia",f:"🇸🇦",c:"Riyadh",l:"Arabic",cu:"SAR",p:"36M",t:"Mecca, desert dunes, Vision 2030, Red Sea coast"},
      {n:"UAE",f:"🇦🇪",c:"Abu Dhabi",l:"Arabic",cu:"AED",p:"10M",t:"Burj Khalifa, luxury shopping, desert safaris"},
      {n:"Qatar",f:"🇶🇦",c:"Doha",l:"Arabic",cu:"QAR",p:"2.9M",t:"World Cup 2022, Museum of Islamic Art, desert luxury"},
      {n:"Oman",f:"🇴🇲",c:"Muscat",l:"Arabic",cu:"OMR",p:"4.5M",t:"Fjords, forts, frankincense, authentic Arabian charm"},
      {n:"Yemen",f:"🇾🇪",c:"Sanaa",l:"Arabic",cu:"YER",p:"34M",t:"Socotra dragon trees, ancient skyscraper cities"},
      {n:"Israel",f:"🇮🇱",c:"Jerusalem",l:"Hebrew",cu:"ILS",p:"9.5M",t:"Holy land, Dead Sea, Tel Aviv beaches, history"},
      {n:"Palestine",f:"🇵🇸",c:"Ramallah",l:"Arabic",cu:"ILS",p:"5.4M",t:"Bethlehem, olive trees, rich heritage, resilient spirit"},
      {n:"Jordan",f:"🇯🇴",c:"Amman",l:"Arabic",cu:"JOD",p:"11M",t:"Petra, Wadi Rum desert, Dead Sea floating"},
      {n:"Lebanon",f:"🇱🇧",c:"Beirut",l:"Arabic",cu:"LBP",p:"5.5M",t:"Cedars, cuisine, Mediterranean coast, nightlife"},
      {n:"Syria",f:"🇸🇾",c:"Damascus",l:"Arabic",cu:"SYP",p:"22M",t:"Oldest continuously inhabited city, ancient souks"},
      {n:"Turkey",f:"🇹🇷",c:"Ankara",l:"Turkish",cu:"TRY",p:"85M",t:"Istanbul, Cappadocia balloons, kebabs, two continents"},
      {n:"Georgia",f:"🇬🇪",c:"Tbilisi",l:"Georgian",cu:"GEL",p:"3.7M",t:"Wine birthplace, Caucasus mountains, khachapuri"},
      {n:"Armenia",f:"🇦🇲",c:"Yerevan",l:"Armenian",cu:"AMD",p:"2.8M",t:"First Christian nation, Mount Ararat, apricots"},
      {n:"Azerbaijan",f:"🇦🇿",c:"Baku",l:"Azerbaijani",cu:"AZN",p:"10M",t:"Fire temples, Caspian Sea, Flame Towers"},
      {n:"Kazakhstan",f:"🇰🇿",c:"Astana",l:"Kazakh",cu:"KZT",p:"19M",t:"Steppes, Baikonur cosmodrome, largest landlocked country"},
      {n:"Uzbekistan",f:"🇺🇿",c:"Tashkent",l:"Uzbek",cu:"UZS",p:"35M",t:"Silk Road cities Samarkand & Bukhara, plov"},
      {n:"Turkmenistan",f:"🇹🇲",c:"Ashgabat",l:"Turkmen",cu:"TMT",p:"6.4M",t:"Darvaza gas crater 'Door to Hell', white marble city"},
      {n:"Kyrgyzstan",f:"🇰🇬",c:"Bishkek",l:"Kyrgyz",cu:"KGS",p:"6.7M",t:"Issyk-Kul lake, Tien Shan mountains, nomadic culture"},
      {n:"Tajikistan",f:"🇹🇯",c:"Dushanbe",l:"Tajik",cu:"TJS",p:"10M",t:"Pamir Highway, roof of the world, Silk Road"},
      {n:"Mongolia",f:"🇲🇳",c:"Ulaanbaatar",l:"Mongolian",cu:"MNT",p:"3.4M",t:"Gobi desert, eagle hunters, endless steppes, Genghis Khan"},
      {n:"Brunei",f:"🇧🇳",c:"Bandar Seri Begawan",l:"Malay",cu:"BND",p:"0.45M",t:"Golden mosques, rainforests, oil wealth"},
      {n:"Timor-Leste",f:"🇹🇱",c:"Dili",l:"Portuguese",cu:"USD",p:"1.3M",t:"Youngest country in Asia, pristine reefs, coffee"},
      {n:"Maldives",f:"🇲🇻",c:"Male",l:"Dhivehi",cu:"MVR",p:"0.52M",t:"Overwater villas, coral reefs, paradise islands"}
    ],
    europe: [
      {n:"United Kingdom",f:"🇬🇧",c:"London",l:"English",cu:"GBP",p:"67M",t:"Big Ben, pub culture, royal family, rainy charm"},
      {n:"France",f:"🇫🇷",c:"Paris",l:"French",cu:"EUR",p:"65M",t:"Eiffel Tower, croissants, Louvre, romance capital"},
      {n:"Germany",f:"🇩🇪",c:"Berlin",l:"German",cu:"EUR",p:"84M",t:"Bavarian castles, beer halls, engineering, history"},
      {n:"Italy",f:"🇮🇹",c:"Rome",l:"Italian",cu:"EUR",p:"59M",t:"Pizza, pasta, Colosseum, Renaissance art, fashion"},
      {n:"Spain",f:"🇪🇸",c:"Madrid",l:"Spanish",cu:"EUR",p:"47M",t:"Flamenco, tapas, Gaudi, sunny beaches, siestas"},
      {n:"Portugal",f:"🇵🇹",c:"Lisbon",l:"Portuguese",cu:"EUR",p:"10M",t:"Pastel de nata, Fado music, Azulejos, Atlantic coast"},
      {n:"Netherlands",f:"🇳🇱",c:"Amsterdam",l:"Dutch",cu:"EUR",p:"17M",t:"Tulips, windmills, canals, cycling, Van Gogh"},
      {n:"Belgium",f:"🇧🇪",c:"Brussels",l:"Dutch",cu:"EUR",p:"12M",t:"Chocolate, waffles, beer, EU headquarters"},
      {n:"Switzerland",f:"🇨🇭",c:"Bern",l:"German",cu:"CHF",p:"8.7M",t:"Alps, chocolate, watches, neutrality, lakes"},
      {n:"Austria",f:"🇦🇹",c:"Vienna",l:"German",cu:"EUR",p:"9M",t:"Mozart, Schnitzel, Vienna Opera, Alpine beauty"},
      {n:"Ireland",f:"🇮🇪",c:"Dublin",l:"English",cu:"EUR",p:"5M",t:"Guinness, Cliffs of Moher, pubs, leprechauns"},
      {n:"Iceland",f:"🇮🇸",c:"Reykjavik",l:"Icelandic",cu:"ISK",p:"0.37M",t:"Northern Lights, geysers, volcanoes, Blue Lagoon"},
      {n:"Norway",f:"🇳🇴",c:"Oslo",l:"Norwegian",cu:"NOK",p:"5.5M",t:"Fjords, midnight sun, Vikings, salmon"},
      {n:"Sweden",f:"🇸🇪",c:"Stockholm",l:"Swedish",cu:"SEK",p:"10M",t:"IKEA, meatballs, ABBA, archipelago, design"},
      {n:"Denmark",f:"🇩🇰",c:"Copenhagen",l:"Danish",cu:"DKK",p:"5.9M",t:"LEGO, hygge, Tivoli, Little Mermaid, bicycles"},
      {n:"Finland",f:"🇫🇮",c:"Helsinki",l:"Finnish",cu:"EUR",p:"5.5M",t:"Saunas, Lapland, Northern Lights, Moomins"},
      {n:"Poland",f:"🇵🇱",c:"Warsaw",l:"Polish",cu:"PLN",p:"38M",t:"Old towns, pierogi, Chopin, resilient history"},
      {n:"Czech Republic",f:"🇨🇿",c:"Prague",l:"Czech",cu:"CZK",p:"10M",t:"Prague Castle, beer, Kafka, stunning architecture"},
      {n:"Slovakia",f:"🇸🇰",c:"Bratislava",l:"Slovak",cu:"EUR",p:"5.4M",t:"Tatra mountains, castles, folk traditions"},
      {n:"Hungary",f:"🇭🇺",c:"Budapest",l:"Hungarian",cu:"HUF",p:"9.7M",t:"Thermal baths, Danube, goulash, ruin bars"},
      {n:"Romania",f:"🇷🇴",c:"Bucharest",l:"Romanian",cu:"RON",p:"19M",t:"Dracula's castle, Carpathians, medieval towns"},
      {n:"Bulgaria",f:"🇧🇬",c:"Sofia",l:"Bulgarian",cu:"BGN",p:"6.8M",t:"Rose oil, Black Sea, yogurt, Thracian gold"},
      {n:"Greece",f:"🇬🇷",c:"Athens",l:"Greek",cu:"EUR",p:"10M",t:"Acropolis, islands, ouzo, mythology, souvlaki"},
      {n:"Croatia",f:"🇭🇷",c:"Zagreb",l:"Croatian",cu:"EUR",p:"3.9M",t:"Dubrovnik, Plitvice lakes, Adriatic coast"},
      {n:"Serbia",f:"🇷🇸",c:"Belgrade",l:"Serbian",cu:"RSD",p:"6.7M",t:"Nightlife, rakija,EXIT festival, history"},
      {n:"Slovenia",f:"🇸🇮",c:"Ljubljana",l:"Slovenian",cu:"EUR",p:"2.1M",t:"Lake Bled, caves, green capital, Julian Alps"},
      {n:"Bosnia & Herzegovina",f:"🇧🇦",c:"Sarajevo",l:"Bosnian",cu:"BAM",p:"3.2M",t:"Mostar bridge, Ottoman history, mixed cultures"},
      {n:"Montenegro",f:"🇲🇪",c:"Podgorica",l:"Montenegrin",cu:"EUR",p:"0.62M",t:"Bay of Kotor, mountains, Adriatic beauty"},
      {n:"Albania",f:"🇦🇱",c:"Tirana",l:"Albanian",cu:"ALL",p:"2.8M",t:"Bunkers, Albanian Riviera, Ottoman heritage"},
      {n:"North Macedonia",f:"🇲🇰",c:"Skopje",l:"Macedonian",cu:"MKD",p:"2.1M",t:"Lake Ohrid, Alexander the Great, mountains"},
      {n:"Kosovo",f:"🇽🇰",c:"Pristina",l:"Albanian",cu:"EUR",p:"1.8M",t:"Youngest country in Europe, Bear Sanctuary, mountains"},
      {n:"Estonia",f:"🇪🇪",c:"Tallinn",l:"Estonian",cu:"EUR",p:"1.3M",t:"Medieval old town, digital society, forests"},
      {n:"Latvia",f:"🇱🇻",c:"Riga",l:"Latvian",cu:"EUR",p:"1.9M",t:"Art Nouveau, forests, Baltic coast, choir culture"},
      {n:"Lithuania",f:"🇱🇹",c:"Vilnius",l:"Lithuanian",cu:"EUR",p:"2.8M",t:"Amber, Hill of Crosses, oldest Baltic language"},
      {n:"Belarus",f:"🇧🇾",c:"Minsk",l:"Belarusian",cu:"BYN",p:"9.4M",t:"Bialowieza forest, Soviet architecture, potatoes"},
      {n:"Ukraine",f:"🇺🇦",c:"Kyiv",l:"Ukrainian",cu:"UAH",p:"41M",t:"Golden domes, borscht, brave people, wheat fields"},
      {n:"Moldova",f:"🇲🇩",c:"Chisinau",l:"Romanian",cu:"MDL",p:"2.6M",t:"Wine cellars, countryside, one of Europe's hidden gems"},
      {n:"Russia",f:"🇷🇺",c:"Moscow",l:"Russian",cu:"RUB",p:"144M",t:"Red Square, Hermitage, Trans-Siberian, largest country"},
      {n:"Luxembourg",f:"🇱🇺",c:"Luxembourg",l:"Luxembourgish",cu:"EUR",p:"0.65M",t:"Wealthy grand duchy, EU institutions, castles"},
      {n:"Malta",f:"🇲🇹",c:"Valletta",l:"Maltese",cu:"EUR",p:"0.52M",t:"Knights of Malta, Blue Grotto, ancient temples"},
      {n:"Cyprus",f:"🇨🇾",c:"Nicosia",l:"Greek",cu:"EUR",p:"1.2M",t:"Aphrodite's birthplace, Halloumi, Mediterranean beaches"},
      {n:"Monaco",f:"🇲🇨",c:"Monaco",l:"French",cu:"EUR",p:"0.04M",t:"F1 Grand Prix, casino, yachts, second smallest country"},
      {n:"Andorra",f:"🇦🇩",c:"Andorra la Vella",l:"Catalan",cu:"EUR",p:"0.08M",t:"Pyrenees skiing, tax haven, hiking paradise"},
      {n:"Liechtenstein",f:"🇱🇮",c:"Vaduz",l:"German",cu:"CHF",p:"0.04M",t:"Alpine principality, Vaduz Castle, stamps"},
      {n:"San Marino",f:"🇸🇲",c:"San Marino",l:"Italian",cu:"EUR",p:"0.03M",t:"Oldest republic, Mount Titano, medieval towers"},
      {n:"Vatican City",f:"🇻🇦",c:"Vatican",l:"Italian",cu:"EUR",p:"0.001M",t:"Smallest country, St Peter's, Sistine Chapel, Pope"}
    ],
    americas: [
      {n:"United States",f:"🇺🇸",c:"Washington D.C.",l:"English",cu:"USD",p:"333M",t:"Statue of Liberty, Grand Canyon, Hollywood, diversity"},
      {n:"Canada",f:"🇨🇦",c:"Ottawa",l:"English",cu:"CAD",p:"39M",t:"Niagara Falls, maple syrup, Rockies, polar bears"},
      {n:"Mexico",f:"🇲🇽",c:"Mexico City",l:"Spanish",cu:"MXN",p:"128M",t:"Tacos, Mayan ruins, Day of the Dead, tequila"},
      {n:"Brazil",f:"🇧🇷",c:"Brasilia",l:"Portuguese",cu:"BRL",p:"216M",t:"Carnival, Amazon, Christ the Redeemer, samba, açaí"},
      {n:"Argentina",f:"🇦🇷",c:"Buenos Aires",l:"Spanish",cu:"ARS",p:"46M",t:"Tango, steak, Patagonia, Iguazu Falls, Messi"},
      {n:"Chile",f:"🇨🇱",c:"Santiago",l:"Spanish",cu:"CLP",p:"19M",t:"Atacama Desert, Easter Island, Andes wine"},
      {n:"Peru",f:"🇵🇪",c:"Lima",l:"Spanish",cu:"PEN",p:"34M",t:"Machu Picchu, ceviche, Nazca Lines, Amazon"},
      {n:"Colombia",f:"🇨🇴",c:"Bogota",l:"Spanish",cu:"COP",p:"52M",t:"Coffee, Cartagena, salsa, emeralds, biodiversity"},
      {n:"Venezuela",f:"🇻🇪",c:"Caracas",l:"Spanish",cu:"VES",p:"28M",t:"Angel Falls, oil, arepas, beauty queens"},
      {n:"Ecuador",f:"🇪🇨",c:"Quito",l:"Spanish",cu:"USD",p:"18M",t:"Galapagos Islands, equator line, Andes"},
      {n:"Bolivia",f:"🇧🇴",c:"Sucre",l:"Spanish",cu:"BOB",p:"12M",t:"Salt flats Uyuni, Lake Titicaca, indigenous culture"},
      {n:"Paraguay",f:"🇵🇾",c:"Asuncion",l:"Spanish",cu:"PYG",p:"6.8M",t:"Iguazu Falls, Guarani culture, tereré drink"},
      {n:"Uruguay",f:"🇺🇾",c:"Montevideo",l:"Spanish",cu:"UYU",p:"3.4M",t:"Beef, Mate tea, Punta del Este beaches, progressive"},
      {n:"Guyana",f:"🇬🇾",c:"Georgetown",l:"English",cu:"GYD",p:"0.8M",t:"Kaieteur Falls, rainforest, cricket, only English S. America"},
      {n:"Suriname",f:"🇸🇷",c:"Paramaribo",l:"Dutch",cu:"SRD",p:"0.6M",t:"Dutch-speaking, rainforests, multicultural, Maroon villages"},
      {n:"Costa Rica",f:"🇨🇷",c:"San Jose",l:"Spanish",cu:"CRC",p:"5.2M",t:"Pura vida, rainforests, sloths, no army, eco-paradise"},
      {n:"Panama",f:"🇵🇦",c:"Panama City",l:"Spanish",cu:"PAB",p:"4.4M",t:"Panama Canal, Casco Viejo, tropical islands"},
      {n:"Guatemala",f:"🇬🇹",c:"Guatemala City",l:"Spanish",cu:"GTQ",p:"18M",t:"Tikal ruins, Lake Atitlan, Mayan culture, volcanoes"},
      {n:"Belize",f:"🇧🇿",c:"Belmopan",l:"English",cu:"BZD",p:"0.4M",t:"Barrier reef, Mayan caves, Caribbean coast, diving"},
      {n:"Honduras",f:"🇭🇳",c:"Tegucigalpa",l:"Spanish",cu:"HNL",p:"10M",t:"Copan ruins, Bay Islands diving, coffee"},
      {n:"El Salvador",f:"🇸🇻",c:"San Salvador",l:"Spanish",cu:"USD",p:"6.3M",t:"Bitcoin country, pupusas, surfing, volcanoes"},
      {n:"Nicaragua",f:"🇳🇮",c:"Managua",l:"Spanish",cu:"NIO",p:"7M",t:"Colonial Granada, volcanoes, lakes, revolution history"},
      {n:"Cuba",f:"🇨🇺",c:"Havana",l:"Spanish",cu:"CUP",p:"11M",t:"Classic cars, cigars, salsa, rum, colonial Havana"},
      {n:"Jamaica",f:"🇯🇲",c:"Kingston",l:"English",cu:"JMD",p:"2.8M",t:"Reggae, Bob Marley, jerk chicken, Blue Mountain coffee"},
      {n:"Haiti",f:"🇭🇹",c:"Port-au-Prince",l:"French",cu:"HTG",p:"11M",t:"First Black republic, Vodou, Citadelle, art"},
      {n:"Dominican Republic",f:"🇩🇴",c:"Santo Domingo",l:"Spanish",cu:"DOP",p:"11M",t:"Baseball, rum, Punta Cana beaches, merengue"},
      {n:"Bahamas",f:"🇧🇸",c:"Nassau",l:"English",cu:"BSD",p:"0.4M",t:"Pig beach, crystal waters, rum, paradise islands"},
      {n:"Barbados",f:"🇧🇧",c:"Bridgetown",l:"English",cu:"BBD",p:"0.29M",t:"Rihanna's birthplace, rum, flying fish, cricket"},
      {n:"Trinidad & Tobago",f:"🇹🇹",c:"Port of Spain",l:"English",cu:"TTD",p:"1.5M",t:"Carnival, steelpan, doubles, oil, Calypso"},
      {n:"Puerto Rico",f:"🇵🇷",c:"San Juan",l:"Spanish",cu:"USD",p:"3.2M",t:"El Yunque rainforest, bioluminescent bays, reggaeton"}
    ],
    africa: [
      {n:"Egypt",f:"🇪🇬",c:"Cairo",l:"Arabic",cu:"EGP",p:"111M",t:"Pyramids, Sphinx, Nile cruise, Red Sea diving"},
      {n:"Morocco",f:"🇲🇦",c:"Rabat",l:"Arabic",cu:"MAD",p:"37M",t:"Marrakech souks, Sahara, blue Chefchaouen, tagine"},
      {n:"South Africa",f:"🇿🇦",c:"Pretoria",l:"English",cu:"ZAR",p:"60M",t:"Safari, Table Mountain, Cape Town, Mandela"},
      {n:"Nigeria",f:"🇳🇬",c:"Abuja",l:"English",cu:"NGN",p:"224M",t:"Afrobeats, Nollywood, jollof rice, largest economy"},
      {n:"Kenya",f:"🇰🇪",c:"Nairobi",l:"Swahili",cu:"KES",p:"55M",t:"Masai Mara safari, Nairobi giraffes, tea, runners"},
      {n:"Ethiopia",f:"🇪🇹",c:"Addis Ababa",l:"Amharic",cu:"ETB",p:"127M",t:"Coffee birthplace, Lalibela churches, never colonized"},
      {n:"Tanzania",f:"🇹🇿",c:"Dodoma",l:"Swahili",cu:"TZS",p:"67M",t:"Serengeti, Kilimanjaro, Zanzibar beaches"},
      {n:"Ghana",f:"🇬🇭",c:"Accra",l:"English",cu:"GHS",p:"34M",t:"Cape Coast Castle, kente cloth, gold, friendly people"},
      {n:"Uganda",f:"🇺🇬",c:"Kampala",l:"Swahili",cu:"UGX",p:"48M",t:"Mountain gorillas, Nile source, Lake Victoria"},
      {n:"Rwanda",f:"🇷🇼",c:"Kigali",l:"Kinyarwanda",cu:"RWF",p:"14M",t:"Gorilla trekking, clean streets, recovery story"},
      {n:"Senegal",f:"🇸🇳",c:"Dakar",l:"French",cu:"XOF",p:"17M",t:"Dakar music, Goree Island, thieboudienne, fashion"},
      {n:"Cameroon",f:"🇨🇲",c:"Yaounde",l:"French",cu:"XAF",p:"28M",t:"'Africa in miniature', beaches, mountains, diverse"},
      {n:"Algeria",f:"🇩🇿",c:"Algiers",l:"Arabic",cu:"DZD",p:"45M",t:"Sahara desert, Roman ruins, Casbah, Mediterranean"},
      {n:"Tunisia",f:"🇹🇳",c:"Tunis",l:"Arabic",cu:"TND",p:"12M",t:"Carthage ruins, Star Wars sets, Mediterranean beaches"},
      {n:"Libya",f:"🇱🇾",c:"Tripoli",l:"Arabic",cu:"LYD",p:"7M",t:"Sahara, Leptis Magna Roman ruins, oil"},
      {n:"Sudan",f:"🇸🇩",c:"Khartoum",l:"Arabic",cu:"SDG",p:"48M",t:"Nubian pyramids, Red Sea, confluence of Niles"},
      {n:"Zimbabwe",f:"🇿🇼",c:"Harare",l:"English",cu:"ZWL",p:"16M",t:"Victoria Falls, Great Zimbabwe ruins, wildlife"},
      {n:"Zambia",f:"🇿🇲",c:"Lusaka",l:"English",cu:"ZMW",p:"20M",t:"Victoria Falls side, copper, walking safaris"},
      {n:"Namibia",f:"🇳🇦",c:"Windhoek",l:"English",cu:"NAD",p:"2.5M",t:"Skeleton Coast, Sossusvlei dunes, Etosha wildlife"},
      {n:"Botswana",f:"🇧🇼",c:"Gaborone",l:"English",cu:"BWP",p:"2.6M",t:"Okavango Delta, Kalahari, elephants, diamonds"},
      {n:"Madagascar",f:"🇲🇬",c:"Antananarivo",l:"Malagasy",cu:"MGA",p:"29M",t:"Lemurs, baobab trees, unique biodiversity"},
      {n:"Mozambique",f:"🇲🇿",c:"Maputo",l:"Portuguese",cu:"MZN",p:"33M",t:"Bazaruto islands, marrabenta music, Indian Ocean"},
      {n:"Ivory Coast",f:"🇨🇮",c:"Yamoussoukro",l:"French",cu:"XOF",p:"29M",t:"Largest basilica, cocoa producer, Abidjan nightlife"},
      {n:"Angola",f:"🇦🇴",c:"Luanda",l:"Portuguese",cu:"AOA",p:"36M",t:"Kalandula Falls, oil, Portuguese heritage, kizomba"},
      {n:"DR Congo",f:"🇨🇩",c:"Kinshasa",l:"French",cu:"CDF",p:"102M",t:"Congo River, second largest rainforest, rumba"},
      {n:"Somalia",f:"🇸🇴",c:"Mogadishu",l:"Somali",cu:"SOS",p:"18M",t:"Longest coastline in Africa, frankincense, camels"},
      {n:"Mali",f:"🇲🇱",c:"Bamako",l:"French",cu:"XOF",p:"23M",t:"Timbuktu, Dogon cliffs, music legend Salif Keita"},
      {n:"Malawi",f:"🇲🇼",c:"Lilongwe",l:"English",cu:"MWK",p:"21M",t:"Lake Malawi, warm heart of Africa, friendly people"},
      {n:"Mauritius",f:"🇲🇺",c:"Port Louis",l:"English",cu:"MUR",p:"1.3M",t:"Dodo bird origin, paradise beaches, multicultural"},
      {n:"Seychelles",f:"🇸🇨",c:"Victoria",l:"French",cu:"SCR",p:"0.1M",t:"Anse Source d'Argent, giant tortoises, coral reefs"},
      {n:"Eritrea",f:"🇪🇷",c:"Asmara",l:"Tigrinya",cu:"ERN",p:"3.6M",t:"Art Deco Asmara, Red Sea, Italian colonial past"}
    ],
    oceania: [
      {n:"Australia",f:"🇦🇺",c:"Canberra",l:"English",cu:"AUD",p:"26M",t:"Sydney Opera House, Great Barrier Reef, kangaroos, Outback"},
      {n:"New Zealand",f:"🇳🇿",c:"Wellington",l:"English",cu:"NZD",p:"5.2M",t:"Middle Earth, kiwis, rugby, Maori culture, fjords"},
      {n:"Fiji",f:"🇫🇯",c:"Suva",l:"English",cu:"FJD",p:"0.93M",t:"Coral reefs, kava ceremony, 333 islands, paradise"},
      {n:"Papua New Guinea",f:"🇵🇬",c:"Port Moresby",l:"English",cu:"PGK",p:"10M",t:"800+ languages, tribes, Birds of Paradise, rugged"},
      {n:"Samoa",f:"🇼🇸",c:"Apia",l:"Samoan",cu:"WST",p:"0.2M",t:"Tattoo culture, fire knife dance, pristine beaches"},
      {n:"Tonga",f:"🇹🇴",c:"Nuku'alofa",l:"Tongan",cu:"TOP",p:"0.11M",t:"Last Polynesian kingdom, whales, blowholes"},
      {n:"Vanuatu",f:"🇻🇺",c:"Port Vila",l:"Bislama",cu:"VUV",p:"0.32M",t:"Bungee origin (land diving), active volcanoes, happy people"},
      {n:"Solomon Islands",f:"🇸🇧",c:"Honiara",l:"English",cu:"SBD",p:"0.72M",t:"WW2 history, lagoons, coconut palms, diving"},
      {n:"Micronesia",f:"🇫🇲",c:"Palikir",l:"English",cu:"USD",p:"0.12M",t:"Nan Madol ruins, 607 islands, diving paradise"},
      {n:"Palau",f:"🇵🇼",c:"Ngerulmud",l:"English",cu:"USD",p:"0.02M",t:"Jellyfish Lake, Rock Islands, diving mecca"},
      {n:"Marshall Islands",f:"🇲🇭",c:"Majuro",l:"English",cu:"USD",p:"0.04M",t:"Bikini Atoll, stick charts, nuclear history"},
      {n:"Kiribati",f:"🇰🇮",c:"Tarawa",l:"English",cu:"AUD",p:"0.13M",t:"Equator crossing, climate change frontline, fishing"},
      {n:"Tuvalu",f:"🇹🇻",c:"Funafuti",l:"Tuvaluan",cu:"AUD",p:"0.01M",t:"One of smallest countries, .tv domain, sinking nation"},
      {n:"Nauru",f:"🇳🇷",c:"Yaren",l:"Nauruan",cu:"AUD",p:"0.01M",t:"Smallest island nation, phosphate, no official capital"},
      {n:"Cook Islands",f:"🇨🇰",c:"Avarua",l:"English",cu:"NZD",p:"0.02M",t:"Aitutaki lagoon, hibiscus, free association with NZ"},
      {n:"New Caledonia",f:"🇳🇨",c:"Noumea",l:"French",cu:"XPF",p:"0.29M",t:"Largest lagoon, Kanak culture, French Pacific"}
    ]
  };

  var CONTINENTS = [
    { id: "asia", name: "Asia", emoji: "🏮", count: C.asia.length },
    { id: "europe", name: "Europe", emoji: "🏰", count: C.europe.length },
    { id: "americas", name: "Americas", emoji: "🗽", count: C.americas.length },
    { id: "africa", name: "Africa", emoji: "🦁", count: C.africa.length },
    { id: "oceania", name: "Oceania", emoji: "🏝️", count: C.oceania.length }
  ];

  var selectedContinent = "asia";

  /* ---- render continent tabs ---- */
  var tabContainer = $("#travelTabs");
  CONTINENTS.forEach(function (cont) {
    var tab = document.createElement("button");
    tab.className = "travel-tab" + (cont.id === selectedContinent ? " active" : "");
    tab.innerHTML = cont.emoji + " " + cont.name + ' <span class="travel-tab-count">' + cont.count + "</span>";
    tab.addEventListener("click", function () {
      $$(".travel-tab").forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      selectedContinent = cont.id;
      renderCountries();
    });
    tabContainer.appendChild(tab);
  });

  /* ---- render country cards ---- */
  var grid = $("#travelGrid");
  var modal = $("#travelModal");
  var modalBg = $("#travelModalBg");

  function renderCountries() {
    grid.innerHTML = "";
    var countries = C[selectedContinent] || [];
    countries.forEach(function (country, i) {
      var card = document.createElement("button");
      card.className = "country-card reveal";
      card.style.animationDelay = (i * 0.03) + "s";
      card.innerHTML =
        '<span class="country-flag">' + country.f + "</span>" +
        '<span class="country-name">' + country.n + "</span>";
      card.addEventListener("click", function () { showCountry(country); });
      grid.appendChild(card);
    });
    if (window.DiaryMagic && window.DiaryMagic.initReveals) window.DiaryMagic.initReveals();
  }

  /* ---- country modal ---- */
  function showCountry(country) {
    var html =
      '<div class="country-modal-flag">' + country.f + '</div>' +
      '<h3>' + country.n + '</h3>' +
      '<div class="country-modal-info">' +
        '<div class="info-row"><span class="info-label">🏛️ Capital</span><span class="info-val">' + country.c + '</span></div>' +
        '<div class="info-row"><span class="info-label">🗣️ Language</span><span class="info-val">' + country.l + '</span></div>' +
        '<div class="info-row"><span class="info-label">💰 Currency</span><span class="info-val">' + country.cu + '</span></div>' +
        '<div class="info-row"><span class="info-label">👥 Population</span><span class="info-val">' + country.p + '</span></div>' +
      '</div>' +
      '<p class="country-modal-fact">' + country.t + '</p>' +
      '<a href="' + TG_BOT + '" target="_blank" rel="noopener" class="country-modal-btn">' +
        '✈️ Plan a Trip to ' + country.n + '</a>';
    modal.innerHTML = html;
    modalBg.classList.add("show");
  }

  modalBg.addEventListener("click", function (e) {
    if (e.target === modalBg) modalBg.classList.remove("show");
  });

  /* ---- search ---- */
  var searchInput = $("#travelSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.toLowerCase().trim();
      if (!q) { renderCountries(); return; }
      grid.innerHTML = "";
      var all = Object.keys(C).flatMap(function (k) { return C[k]; });
      var filtered = all.filter(function (c) { return c.n.toLowerCase().indexOf(q) !== -1; });
      filtered.forEach(function (country, i) {
        var card = document.createElement("button");
        card.className = "country-card reveal";
        card.style.animationDelay = (i * 0.03) + "s";
        card.innerHTML = '<span class="country-flag">' + country.f + '</span><span class="country-name">' + country.n + '</span>';
        card.addEventListener("click", function () { showCountry(country); });
        grid.appendChild(card);
      });
    });
  }

  renderCountries();
})();
