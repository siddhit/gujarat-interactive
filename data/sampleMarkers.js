// Demo markers matching the Sanity `marker` schema.
// Sourced from the project mock HTML and supplementary research.
// Replace with live Sanity queries once the project is configured.
export const SAMPLE_MARKERS = [

  // ── Era 0: Early Gujarat ────────────────────────────────────────────────────
  {
    _id: 'e0-p1',
    title_guj: 'હેમચંદ્ર',
    title_eng: 'Hemachandra',
    type: 'person',
    eras: [0],
    lat: 23.8528,
    lng: 72.1322,
    body_eng:
      'Hemachandra (1089–1172) was a Jain polymath and the most celebrated scholar of the Solanki court at Anhilwara Patan. He composed grammars, lexicons, and the magnum opus <em>Trishashti-Shalaka-Purushcharitra</em> — a Jain universal history. His influence secured Gujarat\'s reputation as a centre of learning and helped standardise early Gujarati as a written literary language.',
    excerpt_guj:
      'હેમચંદ્ર સૂરિ સોલંકી-કાળના મહાન જૈન વિદ્વાન હતા, જેમણે ગ્રંથો, વ્યાકરણ અને કોષ-ગ્રંથો રચ્યા.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Hemachandra' },
    ],
    status: 'published',
  },
  {
    _id: 'e0-pl1',
    title_guj: 'દ્વારકા',
    title_eng: 'Dwarka',
    type: 'place',
    eras: [0],
    lat: 22.2442,
    lng: 68.9685,
    body_eng:
      'A city seeped in history, religion and culture. From its many references in the Mahabharata as Lord Krishna\'s adoptive place to being a major port corroborated by Greek accounts, Dwarka has risen, fallen and risen again and continues to be a destination for tourists, pilgrims and archeologists alike.',
    excerpt_guj:
      'દ્વારકા એ ગુજરાત, ભારતમાં એક પ્રખ્યાત દરિયાકાંઠાનું શહેર અને મુખ્ય હિન્દુ તીર્થસ્થળ છે, જે ઓખામંડળ દ્વીપકલ્પ પર આવેલું છે જ્યાં ગોમતી નદી અરબી સમુદ્રને મળે છે. ભગવાન કૃષ્ણની સુપ્રસિદ્ધ રાજધાની તરીકે આદરણીય, તે સપ્ત પુરી (સાત પવિત્ર પવિત્ર શહેરો) માંનું એક છે અને આદિ શંકરાચાર્ય દ્વારા સ્થાપિત ચાર મુખ્ય મઠો (મઠ સંસ્થાઓ) માંથી એક છે.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Dwarka' },
      { label: 'JSTOR', url: 'https://www.jstor.org/stable/27438510' },
    ],
    status: 'published',
  },
  {
    _id: 'e0-pl3',
    title_guj: 'મોઢેરા સૂર્ય મંદિર',
    title_eng: 'Modhera Sun Temple',
    type: 'place',
    eras: [0],
    lat: 23.5833,
    lng: 72.1333,
    body_eng:
      'Built in 1026 CE by Bhima I of the Solanki dynasty, the Modhera Sun Temple is Gujarat\'s finest example of Maru-Gurjara temple architecture. The stepped tank (Surya Kund) in front carries 108 miniature shrines on its inner walls. It stands as one of the few surviving pre-Islamic temples of north Gujarat, and was a venue for classical music and dance patronised by the Solanki court.',
    excerpt_guj:
      'ભીમ-I એ ઇ.સ. ૧૦૨૬ માં બાંધેલ આ સૂર્ય-મંદિર ગુજરાતની મારૂ-ગુર્જર સ્થાપત્ય કળાનો ઉત્કૃષ્ટ નમૂનો છે.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Modhera_Sun_Temple' },
      { label: 'ASI India', url: 'https://asi.nic.in/' },
    ],
    status: 'published',
  },
  {
    _id: 'e0-pl1',
    title_guj: 'લોથલ',
    title_eng: 'Lothal',
    type: 'place',
    eras: [0],
    lat: 22.52,
    lng: 72.25,
    body_eng:
      'Lothal is one of the most significant Indus Valley Civilisation sites, dating to approximately 2400 BCE. Located at the head of the Gulf of Khambhat, it was a major port with the world\'s earliest known dock. While predating Gujarati language itself by millennia, Lothal anchors Gujarat\'s identity as a place of maritime trade and cultural exchange — threads that run through its literature right up to Gandhi\'s era.',
    excerpt_guj: null,
    links: [
      { label: 'ASI India', url: 'https://asi.nic.in/lothal/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Lothal' },
    ],
    status: 'published',
  },
  {
    _id: 'e0-pl4',
    title_guj: 'રાણી કી વાવ',
    title_eng: 'Rani ki Vav',
    type: 'place',
    eras: [0],
    lat: 23.8579,
    lng: 72.1008,
    body_eng:
      'Rani ki Vav (Queen\'s Stepwell) at Patan was commissioned in 1063 CE by Queen Udayamati as a memorial to her husband Bhima I. Its seven levels of carved sculpture narrate Vaishnava mythology in extraordinary detail. Designated a UNESCO World Heritage Site in 2014, it is regarded as one of the finest stepwells in India and a pinnacle of Maru-Gurjara craftsmanship.',
    excerpt_guj:
      'ઉદયમતી રાણીએ ઇ.સ. ૧૦૬૩ ની આ ભવ્ય વાવ ભીમ-I ની સ્મૃતિ-સ્મારક રૂપે બંધાવી હતી.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Rani_ki_vav' },
      { label: 'UNESCO', url: 'https://whc.unesco.org/en/list/922' },
    ],
    status: 'published',
  },

  // ── Era 1: Gujarat Sultanate ─────────────────────────────────────────────────
  {
    _id: 'e1-p1',
    title_guj: 'નરસિંહ મહેતા',
    title_eng: 'Narsinh Mehta',
    type: 'person',
    eras: [1],
    lat: 21.35,
    lng: 71.87,
    body_eng:
      'Considered the first poet of Gujarati literature, Narsinh Mehta was born in Talaja on the Saurashtra coast around 1414 CE. A devotee of Krishna, he wrote <em>padas</em> (devotional verses) that fused mysticism with folk melody. His most famous composition, <em>Vaishnav Jan To</em>, became Gandhi\'s favourite hymn and an anthem of the independence movement five centuries later.',
    excerpt_guj:
      'વૈષ્ણવ જન તો તેને કહીએ, જે પીડ પરાઈ જાણે રે',
    links: [
      { label: 'Rekhta Gujarati', url: 'https://rekhtagujarati.org' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Narsinh_Mehta' },
    ],
    status: 'published',
  },
  {
    _id: 'e1-pl1',
    title_guj: 'ચાંપાનેર-પાવાગઢ',
    title_eng: 'Champaner',
    type: 'place',
    eras: [1, 2],
    lat: 22.49,
    lng: 73.53,
    body_eng:
      'Champaner was the capital of the Gujarat Sultanate under Mahmud Begada in the late 15th century — briefly replacing Ahmedabad as the seat of power. Its mosques and fort represent a unique fusion of Rajput and Islamic architecture. Now a UNESCO World Heritage Site, it was also a centre of courtly literary and musical patronage during the sultanate\'s peak.',
    excerpt_guj:
      'ચાંપાનેર-પાવાગઢ પુરાતત્ત્વ ઉદ્યાન ૨૦૦૪ ના યુનેસ્કો વિશ્વ-ધરોહર સ્થળ છે.',
    links: [
      { label: 'UNESCO', url: 'https://whc.unesco.org/en/list/1101' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Champaner-Pavagadh_Archaeological_Park' },
    ],
    status: 'published',
  },
  {
    _id: 'e1-ev1',
    title_guj: 'ભક્તિ આંદોલન',
    title_eng: 'Bhakti Movement in Gujarat',
    type: 'event',
    eras: [1],
    lat: 22.8,
    lng: 70.5,
    body_eng:
      'The Bhakti movement transformed Gujarati literature between the 14th and 17th centuries — shifting literary language from Sanskrit to the vernacular, from priestly to popular, and from text to song. Poets like Narsinh Mehta, Premananda, and Akho wrote in the language of weavers and farmers. The movement also challenged caste hierarchy, and several of its major voices came from lower-caste communities.',
    excerpt_guj: null,
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Bhakti_movement_in_Gujarat' },
    ],
    status: 'published',
  },
  {
    _id: 'e1-ev2',
    title_guj: 'અમદાવાદની સ્થાપના',
    title_eng: 'Founding of Ahmedabad',
    type: 'event',
    eras: [1],
    lat: 23.0225,
    lng: 72.5714,
    body_eng:
      'On 26 February 1411, Ahmad Shah I laid the foundations of Ahmedabad on the banks of the Sabarmati. The city quickly grew into one of the most prosperous trading cities in Asia, its bazaars attracting merchants from Persia, Arabia, and Portugal. By the mid-15th century it rivalled Vijayanagara in commercial activity and became a major centre of courtly patronage.',
    excerpt_guj: null,
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ahmedabad#History' },
    ],
    status: 'published',
  },

  // ── Era 2: Mughal Gujarat ────────────────────────────────────────────────────
  {
    _id: 'e2-p1',
    title_guj: 'અખો ભગત',
    title_eng: 'Akho Bhagat',
    type: 'person',
    eras: [2],
    lat: 23.03,
    lng: 72.58,
    body_eng:
      'Akho (1591–1656) was a goldsmith in Ahmedabad who gave up his trade to pursue Vedantic philosophy. His <em>Akho Gita</em> challenged caste orthodoxy and priestly authority with sharp, vernacular wit. He remains one of the most quoted Gujarati aphorists — sardonic, direct, and five centuries ahead of his critics.',
    excerpt_guj:
      'ઘટ ઘટ માં હરિ વ્યાપ્યો, ઘટ ઘટ માંહ્ય રહ્યો ભરપૂર',
    links: [
      { label: 'Rekhta Gujarati', url: 'https://rekhtagujarati.org' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Akho' },
    ],
    status: 'published',
  },
  {
    _id: 'e2-pl1',
    title_guj: 'સૂરત — વ્યાપારનું કેન્દ્ર',
    title_eng: 'Surat — Trade & the Literary Awakening',
    type: 'place',
    eras: [2, 3],
    lat: 21.17,
    lng: 72.83,
    body_eng:
      'Surat was Mughal India\'s most important port and first point of sustained European contact. This commercial intensity created a literate merchant class who became patrons of literature and journalism. The city\'s printing presses in the 19th century — among the first in Gujarat — enabled the explosion of modern Gujarati prose, reform writing, and newspapers that defined the century.',
    excerpt_guj: null,
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Surat' },
    ],
    status: 'published',
  },
  {
    _id: 'e2-ev1',
    title_guj: 'અકબરનો ગુજરાત વિજય',
    title_eng: 'Akbar\'s Conquest of Gujarat',
    type: 'event',
    eras: [2],
    lat: 22.9,
    lng: 72.6,
    body_eng:
      'In 1572, Emperor Akbar personally led a campaign to annex the Gujarat Sultanate, completing the conquest in just over a year. Gujarat became the wealthiest subah (province) of the Mughal Empire, generating one-third of its maritime revenue. Akbar\'s victory cemented Mughal supremacy over northwest India\'s trade routes and opened the province to new literary and artistic influences.',
    excerpt_guj: null,
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mughal_conquest_of_Gujarat' },
    ],
    status: 'published',
  },

  // ── Era 3: Company & Princely ────────────────────────────────────────────────
  {
    _id: 'e3-p1',
    title_guj: 'નર્મદ',
    title_eng: 'Narmad',
    type: 'person',
    eras: [3],
    lat: 21.17,
    lng: 72.83,
    body_eng:
      'Narmadashankar Lalshankar Dave (1833–1886), known as Narmad, was born in Surat and became the defining voice of modern Gujarati literature. He compiled the first Gujarati dictionary (<em>Narmakosh</em>), wrote <em>Jai Jai Garvi Gujarat</em> — which became Gujarat\'s state anthem — and pushed aggressively for social reform, women\'s education, and the use of the vernacular over Sanskrit.',
    excerpt_guj:
      'જય જય ગરવી ગુજરાત',
    links: [
      { label: 'Rekhta Gujarati', url: 'https://rekhtagujarati.org' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Narmad' },
    ],
    status: 'published',
  },
  {
    _id: 'e3-p2',
    title_guj: 'ઝવેરચંદ મેઘાણી',
    title_eng: 'Jhaverchand Meghani',
    type: 'person',
    eras: [3],
    lat: 22.30,
    lng: 71.19,
    body_eng:
      'Jhaverchand Meghani (1896–1947) was born near Chotila in Saurashtra and became the most beloved poet of the Gandhian era. He collected and preserved Saurashtra\'s oral folk traditions before they could disappear, composing <em>Rasdhar</em> — a five-volume anthology. Gandhi called him the <em>Rashtreeya Shayar</em> (National Poet) after his poem for freedom fighters facing execution.',
    excerpt_guj:
      'ઓ રે! કારાગૃહ ઓ, ચડ ફાંસી ઓ',
    links: [
      { label: 'Rekhta Gujarati', url: 'https://rekhtagujarati.org' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Jhaverchand_Meghani' },
    ],
    status: 'published',
  },
  {
    _id: 'e3-p3',
    title_guj: 'મોહનદાસ કરમચંદ ગાંધી',
    title_eng: 'Mahatma Gandhi',
    type: 'person',
    eras: [3, 4],
    lat: 21.6413,
    lng: 69.6069,
    body_eng:
      'Gandhi was born in Porbandar in 1869 and wrote prolifically in Gujarati — including his autobiography <em>Satyana Prayogo</em> (The Story of My Experiments with Truth) and the influential <em>Hind Swaraj</em>. As a literary figure he believed the vernacular was inseparable from political liberation. His prose style was plain, deliberate, and shaped by the Jain concept of <em>ahimsa</em>.',
    excerpt_guj:
      'સત્ય એ જ ઈશ્વર છે',
    links: [
      { label: 'Gandhi Ashram, Ahmedabad', url: 'https://www.gandhiashramsabarmati.org/' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mahatma_Gandhi' },
    ],
    status: 'published',
  },
  {
    _id: 'e3-pl1',
    title_guj: 'સાબરમતી આશ્રમ',
    title_eng: 'Sabarmati Ashram',
    type: 'place',
    eras: [3],
    lat: 23.0605,
    lng: 72.5800,
    body_eng:
      'Established by Gandhi in 1917 on the banks of the Sabarmati, this ashram was the organisational heart of the Indian independence movement for over a decade. Gandhi lived here until 1930, when he departed on the 241-mile Dandi March to protest the British salt tax. Now a national memorial, it preserves Gandhi\'s personal quarters, correspondence, and the spinning wheel he used daily.',
    excerpt_guj:
      'સાબરમતી આશ્રમ ૧૯૧૭ થી ૧૯૩૦ સુધી ગાંધીજીના આંદોલનનું ઊર્જા-કેન્દ્ર હતું.',
    links: [
      { label: 'Sabarmati Ashram Official', url: 'https://gandhiashramsabarmati.org' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Sabarmati_Ashram' },
    ],
    status: 'published',
  },
  {
    _id: 'e3-ev1',
    title_guj: 'દાંડી-કૂચ',
    title_eng: 'Salt March (Dandi March)',
    type: 'event',
    eras: [3],
    lat: 20.9028,
    lng: 72.7694,
    body_eng:
      'On 12 March 1930, Gandhi led 78 chosen followers from Sabarmati Ashram and walked 241 miles to the coastal village of Dandi, arriving on 6 April to make salt from seawater in defiance of the British Salt Tax. The march triggered mass civil disobedience across India and turned the world\'s attention to the independence movement. It remains one of the most iconic acts of nonviolent protest in history.',
    excerpt_guj:
      '૧૯૩૦ ની ૧૨ મી માર્ચ: ગાંધીજીની ૭૮ સાથીઓ સાથે સાબરમતીથી દાંડી સુધીની ઐતિહાસિક-કૂચ.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Salt_March' },
    ],
    status: 'published',
  },

  // ── Era 4: Modern Gujarat ────────────────────────────────────────────────────
  {
    _id: 'e4-p1',
    title_guj: 'ધીરુભાઈ અંબાણી',
    title_eng: 'Dhirubhai Ambani',
    type: 'person',
    eras: [4],
    lat: 21.5191,
    lng: 70.2191,
    body_eng:
      'Dhirubhai Hirachand Ambani (1932–2002) was born in the fishing village of Chorwad, Saurashtra. Starting as a gas-station attendant in Aden, he returned to India and built Reliance Industries — a textile empire that became a petrochemicals and telecommunications giant, and India\'s largest private corporation. His story epitomises post-independence Gujarati entrepreneurship.',
    excerpt_guj:
      'ચોરવાડ-જન્મ ધીરુભાઈ અંબાણીએ રિલાયન્સ ઈન્ડસ્ટ્રીઝ બનાવ્યું, જે ભારતનું સૌથી મોટું ખાનગી-ઉદ્યોગ-ગૃહ છે.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Dhirubhai_Ambani' },
    ],
    status: 'published',
  },
  {
    _id: 'e4-pl1',
    title_guj: 'એકતાની પ્રતિમા',
    title_eng: 'Statue of Unity',
    type: 'place',
    eras: [4],
    lat: 21.8381,
    lng: 73.7189,
    body_eng:
      'The Statue of Unity, completed in 2018, depicts Sardar Vallabhbhai Patel — the "Iron Man of India" — who unified the princely states after independence. Standing 182 metres tall on a river island near Kevadia, it is the world\'s tallest statue and symbolises Gujarat\'s identity as the homeland of Patel and a state shaped by his legacy of national integration.',
    excerpt_guj:
      '૧૮૨ મી ઊંચી સ્ટેચ્યૂ ઑફ યૂનિટી વિશ્વની સૌથી ઊંચી પ્રતિમા છે; ૨૦૧૮ ની ૩૧ ઓક્ટોબરે ઉદ્ઘાટન.',
    links: [
      { label: 'Official Site', url: 'https://statueofunity.in' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Statue_of_Unity' },
    ],
    status: 'published',
  },
  {
    _id: 'e4-ev1',
    title_guj: 'ગુજરાત રાજ્ય-સ્થાપના',
    title_eng: 'Formation of Gujarat State',
    type: 'event',
    eras: [4],
    lat: 23.0225,
    lng: 72.5714,
    body_eng:
      'On 1 May 1960, the bilingual Bombay State was divided along linguistic lines into Maharashtra and Gujarat. Gujarat became the 15th state of India, with Ahmedabad as its first capital. The division had been demanded by the Mahagujarat Movement and was preceded by agitation in which 66 protesters died. Today Gujarat is one of India\'s most industrialised states.',
    excerpt_guj:
      '૧ મે ૧૯૬૦ ના રોજ ગુજરાત રાજ્ય ભારતના ૧૫ મા રાજ્ય રૂપે અસ્તિત્વમાં આવ્યું.',
    links: [
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Gujarat#Formation' },
    ],
    status: 'published',
  },
];
