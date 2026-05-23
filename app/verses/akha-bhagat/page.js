'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import './akha.css';

// ── Poem data ─────────────────────────────────────────────────────────────────
const POEMS_RAW = {
  1: {
    titleGuj: 'તિલક કરતાં ત્રેપન',
    titleEng: 'Tilak & Ritual',
    tag: 'Chhappā · Vedanta · Satire',
    stanzas: [
      [
        { gu: 'તિલક કરતાં ત્રેપન થયાં,', en: 'Tilak marks were made so many times that decades passed,', roman: 'tilak karatāṃ trepan thayāṃ' },
        { gu: 'ને જપમાળાનાં નાકાં ગયાં,', en: 'and the rosary beads wore out from use.', roman: 'ne japmāḷānāṃ nākāṃ gayāṃ' },
        { gu: 'તીરથ ફરી ફરી થાકયા ચરણ,', en: 'Feet grew weary circling tirtha after tirtha,', roman: 'tīrath pharī pharī thākyā charaṇ' },
        { gu: 'તોય ન પહોંચ્યો હરિને શરણ.', en: 'yet still no refuge found at Hari\'s door.', roman: 'toẏ na pahoñchyo haritne śaraṇ' },
        { gu: 'કથા સુણી સુણી ફૂટ્યા કાન,', en: 'Ears broke from hearing katha told and retold,', roman: 'kathā suṇī suṇī phūṭyā kān' },
        { gu: 'તોય અખા ન આવ્યું બ્રહ્મજ્ઞાન.', en: 'yet no brahma-wisdom came, says Akha.', roman: 'toẏ akhā na āvyuṃ brahmagñān' },
      ],
      [
        { gu: 'એક મૂરખને એવી ટેવ,', en: 'One fool has this habit:', roman: 'ek mūrakhne evī ṭev' },
        { gu: 'પથ્થર એટલા પૂજે દેવ,', en: 'every stone becomes a god to worship,', roman: 'patthhar eṭalā pūje dev' },
        { gu: 'પાણી દેખી કરે સ્નાન,', en: 'at every puddle he bathes,', roman: 'pāṇī dekhi kare snān' },
        { gu: 'તુલસી દેખી તોડે પાન.', en: 'at every tulsi he plucks a leaf.', roman: 'tuḷasī dekhi toḍe pān' },
        { gu: 'એ અખા વડું ઉત્પાત,', en: 'O Akha, what havoc this is:', roman: 'e akhā vaḍuṃ utpāt' },
        { gu: 'ઘણા પરમેશ્વર એ ક્યાંની વાત?', en: 'where does one go with so many gods?', roman: 'ghaṇā parameśvar e kyāṃnī vāt' },
      ],
      [
        { gu: 'દેહાભિમાન હૂતો પાશેર,', en: 'Body-pride began at a quarter-measure,', roman: 'dehābhimān hūto pāśer' },
        { gu: 'વિદ્યા ભણતાં વાધ્યો શેર;', en: 'studying grew it to a full seer;', roman: 'vidyā bhaṇatāṃ vādhyo śer' },
        { gu: 'ચર્ચાવાદમાં તોલે થયો,', en: 'debate added its weight to the scale,', roman: 'charchāvādmāṃ tole thayo' },
        { gu: 'ગુરુ થયો ત્યાં મણમાં ગયો;', en: 'becoming guru, it swelled to a maund.', roman: 'guru thayo tyāṃ maṇmāṃ gayo' },
        { gu: 'અખા એમ હલકાથી ભારે હોય,', en: 'Akha: thus a light thing becomes heavy,', roman: 'akhā em halakāthi bhāre hoẏ' },
        { gu: 'આત્મજ્ઞાન મૂળગું ખોય.', en: 'and the root of self-knowledge is lost.', roman: 'ātmagnān mūḷaguṃ khoẏ' },
      ],
      [
        { gu: 'અંગ આળસ ને તપસી થયો,', en: 'Lazy in limb, he became a renunciant,', roman: 'aṃga ālas ne tapasī thayo' },
        { gu: 'ઘર મેલીને વનમાં ગયો.', en: 'left his home and went to the forest.', roman: 'ghara meḷīne vanamāṃ gayo' },
        { gu: 'કામબાણ ન શક્યો જાળવી,', en: 'He could not hold off Kama\'s arrow;', roman: 'kāmabāṇa na śakyo jāḷavī' },
        { gu: 'પછે રડવડતી એક આણી નવી.', en: 'then came dragging in a new woman, weeping.', roman: 'pache raḍavaḍatī eka āṇī navī' },
        { gu: 'શ્વાન ભસાવે હીંડે છક્યો,', en: 'He lets the dog bark and wanders in disgrace —', roman: 'śvāna bhasāve hīṃḍe chakyo' },
        { gu: 'અખા હગ્યો નહીં ને ઘર નવ રખ્યો.', en: 'Akha says: hasn\'t renounced, and hasn\'t kept the home.', roman: 'akhā hagyo nahīṃ ne ghara nava rakhyo' },
      ],
      [
        { gu: 'અખા બ્રહ્મ છે બાધું નામ,', en: 'Akha says: God is all names;', roman: 'akhā brahma che bādhu nāma' },
        { gu: 'તે મધ્યે અળગાં અળગાં ગામ.', en: 'within that unity, separate villages lie apart.', roman: 'te madhye aḷagāṃ aḷagāṃ gāma' },
        { gu: 'જ્યમ બાધું જોતાં એક જ ઝાડ,', en: 'Seen whole, there is one tree —', roman: 'jyam bādhu jotāṃ eka ja jāḍ' },
        { gu: 'વિગતે જોતાં ભાગે જાડ્ય.', en: 'seen in detail, branches multiply.', roman: 'vigate jotāṃ bhāge jāḍy' },
        { gu: 'રંગ સ્વાદ પત્ર ફળ ફૂલ,', en: 'Color, taste, leaf, fruit, flower —', roman: 'raṃga svāda patra phaḷa phūl' },
        { gu: 'સદ્ગુરુ મળે તો ભાગે ભૂલ.', en: 'meet the true guru and confusion clears.', roman: 'sadaguru maḷe to bhāge bhūl' },
      ],
      [
        { gu: 'પોતે ટળીને સઘળું પ્રીછ,', en: 'Step aside from yourself and examine all;', roman: 'pote ṭaḷīne saghaḷu prīcha' },
        { gu: 'વાટે ચાલતાં આંખ મ વીંચ.', en: 'walking the path, do not close your eyes.', roman: 'vāṭe cālatāṃ āṃkha ma vīṃcha' },
        { gu: 'અદ્વૈત દ્વૈતનાં કરે છે કામ,', en: 'Advaita and dvaita both carry out their work;', roman: 'advaita dvaitanāṃ kare che kāma' },
        { gu: 'સગુણ નિર્ગુણ ધાર્યા નામ.', en: 'saguna and nirguna are names we have assigned.', roman: 'saguṇa nirguṇa dhāryā nāma' },
        { gu: 'સગુણ નિર્ગુણ એ બે છે જોગ,', en: 'Saguna and nirguna are two yogas —', roman: 'saguṇa nirguṇa e be che joga' },
        { gu: 'પોતે ટળશે તેને પડશે ભોગ.', en: 'only one who dissolves the self will taste the fruit.', roman: 'pote ṭaḷashe tene paḍashe bhoga' },
      ],
      [
        { gu: 'પોતે ટળ્યા તે પ્રીછ્યા જાણ,', en: 'One who has dissolved the self is known to have truly inquired —', roman: 'pote ṭaḷyā te prīchyā jāṇa' },
        { gu: 'તેને શોભે સઘળી વાણ.', en: 'all speech becomes fitting for them.', roman: 'tene śobhe saghaḷī vāṇa' },
        { gu: 'પોતે ટળ્યા વિના શા કામના?', en: 'Without dissolving the self, what is this desire?', roman: 'pote ṭaḷyā vinā śā kāmanā' },
        { gu: 'એ તો અકૃતે વધારી કામના.', en: 'That is merely feeding desire with the uncreated.', roman: 'e to akṛte vadhārī kāmanā' },
        { gu: 'કહે અખો કાં ફોકટ ફૂલ?', en: 'Akha asks: why this useless blooming?', roman: 'kahe akho kāṃ phokaṭa phūl' },
        { gu: 'ભણ્યાગણ્યા પણ ન ટળી ભૂલ.', en: 'Even the learned have not shed their confusion.', roman: 'bhaṇyāgaṇyā paṇa na ṭaḷī bhūl' },
      ],
      [
        { gu: 'અહંકાર તજીને આશે રહ્યો,', en: 'Abandoning ego, I remained in hope;', roman: 'ahaṃkāra tajīne āśe rahyo' },
        { gu: 'મન કર્મ વચને તમારો થયો.', en: 'in mind, deed and word I became yours.', roman: 'mana karma vachane tamāro thayo' },
        { gu: 'જેમ કાષ્ઠની પૂતળી નાચે નરી,', en: 'As a wooden puppet dances nakedly,', roman: 'jema kāṣṭhanī putaḷī nāce narī' },
        { gu: 'તે કળ સુતારે તમારે કરી.', en: 'the skill that moves it is yours, the carpenter\'s.', roman: 'te kaḷa sutāre tamāre karī' },
        { gu: 'વાજું વજાડો તો વાજે તદા,', en: 'Strike the instrument and it sounds;', roman: 'vājū vajāḍo to vāje tadā' },
        { gu: 'વણ વજાડ્યું ન વાજે કદા.', en: 'unstruck, it never sounds.', roman: 'vaṇa vajāḍyū na vāje kadā' },
      ],
      [
        { gu: 'આરત વિના ન ઊપજે હેત,', en: 'Without longing, love does not arise;', roman: 'ārata vinā na ūpaje heta' },
        { gu: 'આરત વિના પૂજારો પ્રેત.', en: 'without longing, the worshipper is a ghost.', roman: 'ārata vinā pūjāro preta' },
        { gu: 'પૂંછળી ભેંસ ન માંડે પગ,', en: 'A tailless buffalo will not budge;', roman: 'pūṃchaḷī bheṃsa na māṃḍe paga' },
        { gu: 'જોર કરીને થાક્યા ઠગ.', en: 'cheats wore themselves out forcing it.', roman: 'jora karīne thākyā ṭhaga' },
        { gu: 'ઉપાડે ઘણા પણ ઊભી ન થાય,', en: 'Many tried to lift it but it would not rise —', roman: 'upāḍe ghaṇā paṇa ūbhī na thāya' },
        { gu: 'અખા જોર કરનારા પાછા જાય.', en: 'Akha says: those who force turn back.', roman: 'akhā jora karanārā pāchā jāya' },
      ],
      [
        { gu: 'નથી વાંક વિશ્વંભર તણો,', en: 'Not a fault of Vishvambhar\'s;', roman: 'nathī vāṃka viśvaṃbhara taṇo' },
        { gu: 'જે કહીએ તે વાંક આપણો.', en: 'whatever we say, the fault is our own.', roman: 'je kahīe te vāṃka āpaṇo' },
        { gu: 'જેમ કોઈ ભોજન જમાડવા કરે,', en: 'As someone spreads a feast,', roman: 'jema koī bhojana jamāḍavā kare' },
        { gu: 'ત્યાં રિસાણો તે રીસે ફરે.', en: 'and the one invited sulks and goes on sulking.', roman: 'tyāṃ risāṇo te rīse phare' },
        { gu: 'પૂર્ણાનંદ પીરસનારો રહે,', en: 'The blissful one remains the server —', roman: 'pūrṇānanda pīrasanāro rahe' },
        { gu: 'અખા અભાગિયાને કોણ કહે?', en: 'Akha asks: who will speak to the ill-fated?', roman: 'akhā abhāgiyāne koṇa kahe' },
      ],
    ],
  },
  2: {
    titleGuj: 'સમજણ વિના',
    titleEng: 'Samjan & Understanding',
    tag: 'Chhappā · Jñāna · Viveka',
    stanzas: [
      [
        { gu: 'સમજણ વિના રે સુખ નહીં જંતને રે;', en: 'Without understanding, creature, there is no peace;', roman: 'samajaṇ vinā re sukh nahīṃ jantne re' },
        { gu: 'વસ્તુગતિ કેમ કરી ઓળખય ?', en: 'how then does one recognize the nature of things?', roman: 'vastugatī kem karī oḷakhay' },
        { gu: 'આપમાં વસે છે આપનો આતમા રે,', en: 'Within oneself dwells one\'s own ātmā,', roman: 'āpmāṃ vase chhe āpno ātmā re' },
        { gu: 'તેણે કાંઈ જીવપણું નવ જાય.', en: 'yet the sense of being a separate creature does not go.', roman: 'teṇe kāṃī jīvapaṇuṃ nav jāy' },
        { gu: 'રવિ રવિ કરતાં રે રજની નહીં મટે રે,', en: 'Chanting "sun, sun" will not remove the night;', roman: 'ravi ravi karatāṃ re rajanī nahīṃ maṭe re' },
        { gu: 'અંધારું તો ઊગ્યા પૂંઠે જાય;', en: 'darkness only leaves when the sun truly rises.', roman: 'aṃdhāruṃ to ūgyā pūṃṭhe jāy' },
      ],
      [
        { gu: 'રુદે કવિ ઊગે રે નિજ ગુરુજ્ઞાનનો રે,', en: 'Let the guru\'s knowledge rise in the heart\'s verse,', roman: 'rude kavi ūge re nij gurugñānano re' },
        { gu: 'થનાર હોય તે સહેજે થાય.', en: 'then what is to be, comes to be on its own.', roman: 'thanār hoẏ te saheje thāẏ' },
        { gu: 'જળ જળ કરતાં રે તૃષ્ણા નવ ટળે રે,', en: 'Saying "water, water" does not quench thirst;', roman: 'jaḷ jaḷ karatāṃ re tṛṣṇā nav ṭaḷe re' },
        { gu: 'ભોજન કહેતાં ન ભાંગે ભૂખ;', en: 'saying "food, food" does not break hunger.', roman: 'bhojan kahetāṃ na bhāṃge bhūkh' },
        { gu: 'પ્રેમરસ પીતા રે તૃષ્ણા તુરત ટળે રે,', en: 'Drinking the nectar of love — thirst vanishes at once;', roman: 'premras pītā re tṛṣṇā turat ṭaḷe re' },
        { gu: 'એમ મહાજ્ઞાનીઓ બોલે છે મુખ.', en: 'so say the great knowers with one voice.', roman: 'em mahāgñānīo bole chhe mukh' },
      ],
      [
        { gu: 'પારસમણિ વિના રે જે પથરા મળે રે,', en: 'Without a philosopher\'s stone, gather all the rocks you like —', roman: 'pārasmaṇi vinā re je patharā maḷe re' },
        { gu: 'તેણે કાંઈ કાંચન લોહ ન થાય;', en: 'iron will not turn gold.', roman: 'teṇe kāṃī kāṃcan loh na thāy' },
        { gu: 'સમજણ વિના રે જે સાધન કરે રે,', en: 'Without understanding, perform all the practices you like —', roman: 'samajaṇ vinā re je sādhan kare re' },
        { gu: 'તેણે કાંઈ જીવપણું નવ જાય.', en: 'the sense of being a separate creature will not go.', roman: 'teṇe kāṃī jīvapaṇuṃ nav jāy' },
        { gu: 'દશ મણ અગ્નિ રે લખિયે કાગળે રે,', en: 'Write ten maunds of fire on a page —', roman: 'daś maṇ agni re lakhiye kāgaḷe re' },
        { gu: 'એને લઈ રૂમાં જો અલપાય;', en: 'take it and touch it to cotton;', roman: 'ene laī rūmāṃ jo alapāẏ' },
      ],
      [
        { gu: 'એની અગ્નિથી રે રૂ નથી દાઝતું રે,', en: 'that written fire will not burn the cotton.', roman: 'enī agnithi re rū nathī dāztū re' },
        { gu: 'રતી એક સાચે પ્રલય જ થાય.', en: 'A single spark of real fire — and there is conflagration.', roman: 'ratī ek sāce pralay ja thāẏ' },
        { gu: 'જીવપણું માટે રે અનહદ ચિંતવ્યે રે,', en: 'Thinking endlessly about the sense of being a creature —', roman: 'jīvapaṇuṃ māṭe re anahad cintavye re' },
        { gu: 'એ તો વાણીરહિત છે રે વિચાર;', en: 'that thought is itself without speech.', roman: 'e to vāṇīrahit chhe re vicār' },
        { gu: 'જે જે નર સમજ્યા રે તે તો ત્યાં સમ્યા રે,', en: 'Those who truly understood — they became absorbed there,', roman: 'je je nar samajyā re te to tyāṃ samyā re' },
        { gu: 'કહે અખો ઊતર્યા પેલે પાર.', en: 'says Akha: they crossed to the other shore.', roman: 'kahe akho ūtaryā pele pār' },
      ],
    ],
  },
  3: {
    titleGuj: 'હું હસ્તો રમ્તતો',
    titleEng: 'I Was Laughing and Playing',
    tag: 'Chhappā · Bhakti · Ātmasamarpaṇ',
    stanzas: [
      [
        { gu: 'મારે એમ પડ્યું પાધરું, હુંપણું મટ્યું એ જ આદર્યું,', en: 'For me things fell into place: the ego dissolved — that very dissolution became my beginning,', roman: 'māre em paḍyūṃ pādharuṃ, huṃpaṇūṃ maṭyūṃ e ja ādaryūṃ' },
        { gu: 'કર્મ અહંકાર તણું ગયું મૂળ, જેમ અરકનાં ઊડે તૂલ;', en: 'the root of karma and self-conceit fell away, as cotton-fluff flies from the sun-plant;', roman: 'karma ahaṃkāra taṇūṃ gayūṃ mūḷa, jema arakanāṃ ūḍe tūl' },
        { gu: 'ન લહ્યા સરખું મેં ત્યાં લહ્યું, એમ અખા યથારથે થયું.', en: 'what I had not grasped, I grasped in that moment — thus, says Akha, it came to pass in truth.', roman: 'na lahyā sarakhūṃ meṃ tyāṃ lahyūṃ, em akhā yathārthe thayūṃ' },
      ],
      [
        { gu: 'વાંકું સમું જાણું ત્યાં હરિ, હું તો મારે બેઠો ઠરી;', en: 'Crooked and straight alike I see as Hari; I have simply settled and grown still within myself;', roman: 'vāṃkūṃ samūṃ jāṇūṃ tyāṃ hari, hūṃ to māre beṭho ṭharī' },
        { gu: 'ભલા ગૃહસ્થની વાડે ગાય, એમ આપ સોંપ્યું હરિમાંય;', en: 'as a cow surrenders to a good householder\'s fold, so I have handed myself over into Hari;', roman: 'bhalā gṛhasthānī vāḍe gāya, em āpa soṃpyūṃ harimāṃya' },
        { gu: 'છીંડું ખોળતાં લાધી પોળ, હવે અખા કર ઝાઝ મઝોળ.', en: 'searching for a crack I found the whole gateway — now Akha, why keep shuffling about?', roman: 'chīṃḍūṃ khoḷatāṃ lādhī poḷ, have akhā kara jāja majoḷ' },
      ],
      [
        { gu: 'મારે મોટો હું નર જડ્યો, જે ઈશ્વરરૂપી જહાજે ચડ્યો,', en: 'For myself I found a great man who boarded the ship that is God\'s very form,', roman: 'māre moṭo hūṃ nara jaḍyo, je īśvararūpī jahāje caḍyo' },
        { gu: 'પચ સહિત ઉતારિયો પાર, પગ નહિ બોળું જળ સંસાર;', en: 'he was carried across with all five — I shall not dip my feet in the waters of the world;', roman: 'paca sahita utāriyo pāra, paga nahi boḷūṃ jaḷa saṃsāra' },
        { gu: 'હું હસ્તો રમ્તતો હરિમાં ભળ્યો, આખો જાણે તે વળણે વળ્યો.', en: 'I was laughing and playing and merged in Hari — he who knows, says Akha, turned just so.', roman: 'hūṃ hasto ramato harimāṃ bhaḷyo, ākho jāṇe te vaḷaṇe vaḷyo' },
      ],
      [
        { gu: 'એ સુખ મારગ મેલીને શઠ, કાયકલેશ કરે કાં હઠ?', en: 'Abandoning this blissful path, O wretch, why cling stubbornly to body-torment?', roman: 'e sukha māraga melīne śaṭha, kāyakaleśa kare kāṃ haṭha' },
        { gu: 'ગીતામાં ગોવિંદ મુખ કહે, \'જે મારું શરણ ગ્રહીને રહે;', en: 'In the Gita Govinda says from his own mouth: \'Whoever takes refuge in me and stays;', roman: 'gītāmāṃ goviṃda mukha kahe, je māruṃ śaraṇa grahīne rahe' },
        { gu: 'મુજ વાયક જે માને અખા, તેને સ્કંધ લઈ ઉતારું સખા.\'', en: 'whoever heeds my word, O Akha, him I shall carry on my shoulders across, dear friend.\'', roman: 'muja vāyaka je māne akhā, tene skaṃdha laī utārūṃ sakhā' },
      ],
      [
        { gu: 'પ્રત્યક્ષ મૂકી જુએ પરોક્ષ, કર્તવ્યને શિર મૂકે દોષ,', en: 'Setting aside the evident he peers at the hidden; he lays blame on what is truly his own duty,', roman: 'pratyakṣa mūkī jue parokṣa, kartavyane śira mūke doṣa' },
        { gu: 'સભર ભરાઈ રહ્યો છે નાથ, હીંડતાં લાગે હરિને હાથ;', en: 'the Lord stands utterly full and present everywhere; walking, one touches Hari\'s very hand;', roman: 'sabhara bharāī rahyo che nātha, hīṃḍatāṃ lāge haritne hātha' },
        { gu: 'અખો કહે ફેરવવું મન, જે જાણે તો જાણો જન.', en: 'Akha says: turn the mind — let those who truly know, know this.', roman: 'akho kahe feravavūṃ mana, je jāṇe to jāṇo jana' },
      ],
      [
        { gu: 'એમ જાણે તે હરિનો જન, મારે પોતે ક્યાંથું મન;', en: 'Those who know thus are Hari\'s own people; where does the "my" of "my mind" arise for me?', roman: 'em jāṇe te harino jana, māre pote kyāṃthūṃ mana' },
        { gu: 'દેહ હરિ ઇચ્છાયે થયો, અણછતો હું આવી ગયો;', en: 'The body arose by Hari\'s wish; I arrived unbidden;', roman: 'deha hari icchhāye thayo, aṇachato hūṃ āvī gayo' },
        { gu: 'તારું કર્યું ને તું છે નાથ, એમ જાણી અખે ઝાટક્યા હાથ.', en: 'what was done was yours, and you are the Lord — knowing this, says Akha, I shook my hands free.', roman: 'tāruṃ karyūṃ ne tūṃ che nātha, em jāṇī akhe jhāṭakyā hātha' },
      ],
    ],
  },
  4: {
    titleGuj: 'ઊંચ ન ગણ',
    titleEng: 'Ram Is Not More in the High-Born',
    tag: 'Chhappā · Samatā · Caste Critique',
    stanzas: [
      [
        { gu: 'કુળ અધિકાર અધ્યયન ચાતુરી, પાપી મૂર્ખ ત્યાં ન જુએ હરિ.', en: 'Lineage, privilege, learning, cleverness — the sinful fool sees no Hari in all that.', roman: 'kuḷa adhikāra adhyayana cāturī, pāpī mūrkha tyāṃ na jue hari' },
        { gu: 'જેમ વાયાની વળણે લાગે લાય, પણ ડાબું જમણું ન ગણે વાય;', en: 'As fire follows the direction of the wind, yet the wind reckons not left from right;', roman: 'jema vāyānī vaḷaṇe lāge lāya, paṇa ḍābūṃ jamaṇūṃ na gaṇe vāya' },
        { gu: 'ત્યમ ઊંચ નીચ ન ગણે નારાણ, અખા એમ ખરાખરી જાણ.', en: 'so Narayan reckons neither high nor low — know this for certain, says Akha.', roman: 'tyama ūṃca nīca na gaṇe nāraṇa, akhā em kharākharī jāṇa' },
      ],
      [
        { gu: 'ભૂત પંચનો આ સંસાર, મૂરખ વહે તે વર્ણ અહંકાર;', en: 'This world is made of the five elements; the fool flows with the pride of caste;', roman: 'bhūta paṃcano ā saṃsāra, mūrakha vahe te varṇa ahaṃkāra' },
        { gu: 'ભાત ચલાવા વર્ણાવર્ણ, કોઈ મસ્તક હસ્ત કટિ ચર્ણ;', en: 'to run the order of castes someone is head, hand, waist, foot;', roman: 'bhāta calāvā varṇāvarṇa, koī mastaka hasta kaṭi carṇa' },
        { gu: 'બ્રાહ્મણ ક્ષત્રિય વૈશ્ય ને શૂદ્ર, હરિનો પિંડ અખા કોણ શૂદ્ર?', en: 'Brahmin, Kshatriya, Vaishya, Shudra — whose body is Hari\'s, Akha asks: who then is Shudra?', roman: 'brāhmaṇa kṣatriya vaiśya ne śūdra, harino piṃḍa akhā koṇa śūdra' },
      ],
      [
        { gu: 'ઊંચ ખરા તે ઊંચ ન જાણ, નીચ તે નો રે નીચ નિર્વાણ;', en: 'The truly high do not know themselves as high; liberation is not denied to the low;', roman: 'ūṃca kharā te ūṃca na jāṇa, nīca te no re nīca nirvāṇa' },
        { gu: 'ઊંચ માં રામ બમણો નથી ભર્યો, અને નીચ પિંડ ઠાલો નથી કર્યો;', en: 'Ram is not twice-filled into the high-born, nor has he made the body of the low empty;', roman: 'ūṃca māṃ rāma bamaṇo nathī bharyo, ane nīca piṃḍa ṭhālo nathī karyo' },
        { gu: 'કહે અખો સ્વપ્નામાં બક્યો, જેમ છે તેમ જોઈ નવ શક્યો.', en: 'Akha says: I babbled as in a dream; I could not see things as they truly are.', roman: 'kahe akho svapnāmāṃ bakyo, jema che tema joī nava śakyo' },
      ],
      [
        { gu: 'જેમ શિલા એક ટાંકી ચીતરી, અણઘડી બીજી મેલે ભરી;', en: 'As one stone is chiseled and painted, another left rough and unworked;', roman: 'jema śilā eka ṭāṃkī cītarī, aṇaghaḍī bījī mele bharī' },
        { gu: 'બે નાંખી ઊંડા જળ વિષે, પણ સરખી બેઉ તરવા વિષે;', en: 'both thrown into deep water — they are equal in the matter of sinking;', roman: 'be nāṃkhī ūṃḍā jaḷa viṣe, paṇa sarakhī beoṃ taravā viṣe' },
        { gu: 'પંડિત મૂરખ સરખા નીવડે, અખા દ્વૈતને રૂપક ચડે.', en: 'pandit and fool are found equal — Akha says: duality puts on this costume.', roman: 'paṃḍita mūrkha sarakhā nīvaḍe, akhā dvaitane rūpaka caḍe' },
      ],
      [
        { gu: 'પંડિતને પંડિતાઈનું જોર, પણ અંતઃકરણમાં અંધારું ઘોર;', en: 'The learned man has the power of his learning, but within the heart: profound darkness;', roman: 'paṃḍitane paṃḍitāīnūṃ jora, paṇa aṃtaḥkaraṇamāṃ aṃdhāruṃ ghora' },
        { gu: 'અખા તે થકી પ્રાકૃત ભલા, જો આવે સમજ્યાની કળા.', en: 'Akha says: the unlettered are better than them, if the art of true understanding comes.', roman: 'akhā te thakī prākṛta bhalā, jo āve samajyānī kaḷā' },
        { gu: 'શબરી સંસ્કૃત શું ભણી હતી ભાઈ? ક્યા વેદ વાંચ્યા કરમાબાઈ?', en: 'What Sanskrit had Shabari studied, brother? What Vedas had Karmabai read?', roman: 'śabarī saṃskṛta śūṃ bhaṇī hatī bhāī, kyā veda vāṃcyā karamābāī' },
      ],
      [
        { gu: "વ્યાધ તે શું ભણ્યો'તો વેદ? ગણકા શું સમજતી હતી ભેદ?", en: 'Had the hunter studied the Vedas? Did the courtesan grasp the distinction?', roman: "vyādha te śūṃ bhaṇyo'to veda, gaṇakā śūṃ samajatī hatī bheda" },
        { gu: 'ભાષાને શું વળગે ભૂર? જે રણમાં જીતે તે શૂર;', en: 'Does language stick to the essence? The one who wins in battle is the hero.', roman: 'bhāṣāne śūṃ vaḷage bhūra, je raṇamāṃ jīte te śūra' },
        { gu: 'સંસ્કૃત બોલે તે શું થયું? કાંઈ પ્રાકૃતમાંથી નાસી ગયું?', en: 'Does speaking Sanskrit change anything? Did anything escape from Prakrit?', roman: 'saṃskṛta bole te śūṃ thayūṃ, kāṃī prākṛtamāṃthī nāsī gayūṃ' },
        { gu: 'બાવનનો સઘળો વિસ્તાર, અખા ત્રેપનમો જાણે પાર.', en: 'The fifty-two letters span all; Akha says: the fifty-third knows the shore.', roman: 'bāvanno saghaḷo vistāra, akhā trepanamo jāṇe pāra' },
      ],
    ],
  },
  5: {
    titleGuj: 'ખટપટ',
    titleEng: 'Let the Restless Be Restless',
    tag: 'Chhappā · Viveka · Discernment',
    stanzas: [
      [
        { gu: 'ધામધૂમ તે ધનનો ધગા, મોહઅહંકાર મેલીને ગા;', en: 'All the pomp and noise is the fever of wealth — shed attachment and ego, and sing;', roman: 'dhāmadhūma te dhanano dhagā, moha ahaṃkāra melīne gā' },
        { gu: "માવઠે મે' વરસે ગડગડે, ફળ ન ઊમટે ને લાગ્યાં પડે.", en: 'out-of-season rain falls with thunder, yet no fruit swells — only damage falls.', roman: "māvaṭhe me' varase gaḍagaḍe, phaḷa na ūmaṭe ne lāgyāṃ paḍe" },
        { gu: 'રત વિના કરશણ ક્યાંથી ફળે? એમ અખા હરિ ક્યાંથી મળે?', en: 'Without love how shall farming yield? So too, Akha asks: without love how shall Hari be found?', roman: 'rata vinā karaśaṇa kyāṃthī phaḷe, em akhā hari kyāṃthī maḷe' },
      ],
      [
        { gu: 'ખટપટને ખટપટવા દે, તું અળગે આવી પ્રીછી લે.', en: 'Let the restless be restless — you step aside and look carefully.', roman: 'khaṭapaṭane khaṭapaṭavā de, tū aḷage āvī prīchī le' },
        { gu: 'જંગી ઢોલ ઘણા ગડગડે, ત્યાં ઝીણી વાત ન કાને પડે;', en: 'When great drums thunder and boom, delicate words cannot reach the ear;', roman: 'jaṃgī ḍhola ghaṇā gaḍagaḍe, tyāṃ jhīṇī vāta na kāne paḍe' },
        { gu: 'નિરદાવાના જનને ખોળ, તે અખે બેસારે બોલે બોલ.', en: 'seek the person free of grievance — Akha says: seat them and speak word by word.', roman: 'niradāvānā janane khoḷa, te akhe besāre bole bola' },
      ],
      [
        { gu: 'પાને પોથે લખિયા હરિ, જેમ વેળુમાં ખાંડ વીખરી;', en: 'In leaf and book God is written, as sugar scattered through sand;', roman: 'pāne pothe lakhiyā hari, jema veḷumāṃ khāṃḍa vīkharī' },
        { gu: 'સંતે ખાધી કીડી થઈ અને વંચકે તે સબુધી વહી.', en: 'the saint ate it turning into an ant; the cheat carried it off as raw sugar — all of it.', roman: 'sante khādhī kīḍī thaī ane vaṃcake te sabudhī vahī' },
        { gu: 'તે માટે તે તેવા રહ્યા, અખા સંત પારંગત થયા.', en: 'That is why each remains what they are — Akha says: the saint crosses to the far shore.', roman: 'te māṭe te tevā rahyā, akhā santa pāraṃgata thayā' },
      ],
      [
        { gu: 'વાત અલૌકિક અનુભવ તણી, પ્રપંચ પારે રહેણ આપણી;', en: "The matter is beyond the ordinary, born of experience; our dwelling lies beyond the world's mesh;", roman: 'vāta alaukika anubhava taṇī, prapaṃca pāre raheṇa āpaṇī' },
        { gu: 'પંખી ઓછાયો પડિયો જાળ, પણ પોતે ઊડે અલગ નિરાળ;', en: "a bird's shadow fell into the net, but the bird itself soars free and apart;", roman: 'paṃkhī ochhāyo paḍiyo jāḷa, paṇa pote ūḍe alaga nirāḷa' },
        { gu: 'અખા જ્ઞાનીની એવી કળા, વર્ત્યા જાય તે ઉપરછલા.', en: 'Akha says: such is the skill of the wise — they move through the world but only on the surface.', roman: 'akhā jñānīnī evī kaḷā, vartyā jāya te uparachhalā' },
      ],
      [
        { gu: 'ઉપરછલો મારગ લે અખા, નહિ કો સાથી, નહિ કો સખા,', en: 'Take the surface path, Akha — no companion, no close friend;', roman: 'uparachhaḷo māraga le akhā, nahi ko sāthī nahi ko sakhā' },
        { gu: 'ધણી થયામાં સઘળો ધંધ, જેમ રૂપ નહિ દેખે અંધ;', en: 'in the business of owning everything lies all confusion, as beauty is unseen by the blind;', roman: 'dhaṇī thayāmāṃ saghaḷo dhaṃdha, jema rūpa nahi dekhe aṃdha' },
        { gu: 'ગગનગામીને નહિ અટકાવ, ભૂવર્તીને બહુ ભેદભાવ.', en: 'for one who travels the sky there is no obstacle; for one bound to earth, endless distinctions abound.', roman: 'gaganagāmīne nahi aṭakāva, bhūvartīne bahu bhedabhāva' },
      ],
    ],
  },
};

// Flatten poem: each line gets a flatIdx
function buildPoem(raw) {
  let flatIdx = 0;
  const stanzas = raw.stanzas.map((stanza, si) =>
    stanza.map((line, li) => ({ ...line, si, li, flatIdx: flatIdx++ }))
  );
  const totalLines = flatIdx;
  return { ...raw, stanzas, totalLines };
}

const POEMS = {
  1: buildPoem(POEMS_RAW[1]),
  2: buildPoem(POEMS_RAW[2]),
  3: buildPoem(POEMS_RAW[3]),
  4: buildPoem(POEMS_RAW[4]),
  5: buildPoem(POEMS_RAW[5]),
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AkhaBhagat() {
  const [playing, setPlaying] = useState(null);
  const [activeLine, setActiveLine] = useState({});
  const [playedUpTo, setPlayedUpTo] = useState({});
  const [progress, setProgress] = useState({});
  const [audioAvail, setAudioAvail] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [minNavVisible, setMinNavVisible] = useState(false);
  const [activeChip, setActiveChip] = useState(null);

  const audioRef = useRef({});
  const rafRef = useRef(null);
  const timingsRef = useRef(null);
  const playingRef = useRef(null);
  const speedRef = useRef(1);

  // Boot: probe for audio
  useEffect(() => {
    async function boot() {
      try {
        const tr = await fetch('/verses/akha-bhagat/audio/timings.json', { cache: 'no-store' });
        if (!tr.ok) throw new Error('no timings');
        timingsRef.current = await tr.json();
        const probe = await fetch('/verses/akha-bhagat/audio/poem-1.mp3', { method: 'HEAD' });
        if (!probe.ok) throw new Error('no mp3');
        setAudioAvail(true);
        setShowBanner(false);
      } catch {
        setShowBanner(true);
      }
    }
    boot();
  }, []);

  // Sticky mini-nav
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const onScroll = () => {
      if (!hero) return;
      setMinNavVisible(hero.getBoundingClientRect().bottom < 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for chip highlighting
  useEffect(() => {
    const cards = document.querySelectorAll('.poem-card');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.18) {
            setActiveChip(e.target.id.replace('poem-', ''));
          }
        });
      },
      { threshold: [0, 0.2, 0.5], rootMargin: '-180px 0px -40% 0px' }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const stopPoem = useCallback((id) => {
    playingRef.current = null;
    setPlaying(null);
    if (audioRef.current[id]) {
      try {
        audioRef.current[id].pause();
        audioRef.current[id].currentTime = 0;
      } catch {}
      audioRef.current[id] = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTimeout(() => {
      setActiveLine((prev) => ({ ...prev, [id]: -1 }));
      setPlayedUpTo((prev) => ({ ...prev, [id]: -1 }));
      setProgress((prev) => ({ ...prev, [id]: 0 }));
    }, 500);
  }, []);

  const startSimulated = useCallback(
    (id) => {
      const poem = POEMS[id];
      const lines = [];
      poem.stanzas.forEach((s) => s.forEach((l) => lines.push(l)));
      const durations = lines.map((l) => Math.max(1400, l.gu.length * 60) / speedRef.current);
      const total = durations.reduce((a, b) => a + b, 0);
      const startedAt = performance.now();

      function tick() {
        if (playingRef.current !== id) return;
        const elapsed = performance.now() - startedAt;
        let acc = 0;
        let idx = lines.length;
        for (let i = 0; i < durations.length; i++) {
          if (elapsed < acc + durations[i]) {
            idx = i;
            break;
          }
          acc += durations[i];
        }
        const lineIdx = idx < lines.length ? idx : lines.length - 1;
        setActiveLine((prev) => ({ ...prev, [id]: lineIdx }));
        setPlayedUpTo((prev) => ({ ...prev, [id]: lineIdx }));
        setProgress((prev) => ({ ...prev, [id]: Math.min(100, (elapsed / total) * 100) }));
        if (elapsed >= total) {
          stopPoem(id);
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      setActiveLine((prev) => ({ ...prev, [id]: 0 }));
      rafRef.current = requestAnimationFrame(tick);
    },
    [stopPoem]
  );

  const startWithAudio = useCallback(
    (id) => {
      const audio = new Audio(`/verses/akha-bhagat/audio/poem-${id}.mp3`);
      audio.playbackRate = speedRef.current;
      audioRef.current[id] = audio;
      const timings = timingsRef.current?.[id] ?? [];

      audio.addEventListener('timeupdate', () => {
        if (playingRef.current !== id) return;
        const t = audio.currentTime;
        let lineIdx = -1;
        for (let i = 0; i < timings.length; i++) {
          if (t >= timings[i].start && t < timings[i].end) {
            lineIdx = i;
            break;
          }
          if (t >= timings[i].start) lineIdx = i;
        }
        setActiveLine((prev) => ({ ...prev, [id]: lineIdx }));
        setPlayedUpTo((prev) => ({ ...prev, [id]: lineIdx }));
        if (audio.duration) {
          setProgress((prev) => ({ ...prev, [id]: (t / audio.duration) * 100 }));
        }
      });
      audio.addEventListener('ended', () => stopPoem(id));
      audio.addEventListener('error', () => {
        audioRef.current[id] = null;
        startSimulated(id);
      });
      audio.play().catch(() => {
        audioRef.current[id] = null;
        startSimulated(id);
      });
    },
    [stopPoem, startSimulated]
  );

  const togglePlay = useCallback(
    (id) => {
      if (playingRef.current === id) {
        stopPoem(id);
        return;
      }
      if (playingRef.current) stopPoem(playingRef.current);
      playingRef.current = id;
      setPlaying(id);
      setActiveLine((prev) => ({ ...prev, [id]: 0 }));
      setPlayedUpTo((prev) => ({ ...prev, [id]: -1 }));
      setProgress((prev) => ({ ...prev, [id]: 0 }));
      if (audioAvail && timingsRef.current?.[id]) startWithAudio(id);
      else startSimulated(id);
    },
    [audioAvail, startWithAudio, startSimulated, stopPoem]
  );

  const copyPoem = useCallback((id, lang, e) => {
    const btn = e.currentTarget;
    const lines = [];
    POEMS[id].stanzas.forEach((s) =>
      s.forEach((l) => lines.push(lang === 'gu' ? l.gu : l.en))
    );
    navigator.clipboard
      .writeText(lines.join('\n'))
      .then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
          btn.innerHTML = orig;
        }, 1600);
      })
      .catch(() => {});
  }, []);

  const POEM_NUMERALS = { 1: 'i', 2: 'ii', 3: 'iii', 4: 'iv', 5: 'v' };

  function renderPoem(poemId) {
    const poem = POEMS[poemId];
    const active = activeLine[poemId] ?? -1;
    const played = playedUpTo[poemId] ?? -1;
    const prog = progress[poemId] ?? 0;
    const isPlaying = playing === poemId;
    const hasAudio = audioAvail && !!timingsRef.current?.[poemId];

    return (
      <article className="poem-card" id={`poem-${poemId}`} key={poemId}>
        <header className="poem-head">
          <div>
            <div className="poem-num">
              Verse {poemId} · {POEM_NUMERALS[poemId]}
            </div>
            <h2 className="poem-title-guj">{poem.titleGuj}</h2>
            <p className="poem-title-eng">{poem.titleEng}</p>
            <span className="poem-tag">{poem.tag}</span>
          </div>
          <div className="controls">
            <button
              className={`play-btn${isPlaying ? ' playing' : ''}`}
              onClick={() => togglePlay(poemId)}
              aria-label={`Recite poem ${poemId}`}
            >
              <svg className="icon-play" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg className="icon-pause" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
            <span className="play-label">Recite</span>
            <span className="play-meta">{hasAudio ? 'Sarvam · Meera' : 'Simulated'}</span>
            <div className="icon-row">
              <button
                className="icon-btn"
                title="Copy Gujarati"
                onClick={(e) => copyPoem(poemId, 'gu', e)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
              <button
                className="icon-btn"
                title="Copy English"
                onClick={(e) => copyPoem(poemId, 'en', e)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 18H6V4h7v5h5v11z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="poem-progress">
          <div className="poem-progress-fill" style={{ width: `${prog}%` }} />
        </div>

        <div className="poem-body">
          {/* Column labels — each occupies one grid column on desktop */}
          <div className="col-label">
            ગુજરાતી{' '}
            <span style={{ color: 'rgba(110,110,146,0.6)', fontFamily: 'Inter,sans-serif', fontSize: '9px' }}>
              Gujarati
            </span>
          </div>
          <div className="col-label col-label-en">
            English{' '}
            <span style={{ color: 'rgba(110,110,146,0.6)', fontFamily: 'Inter,sans-serif', fontSize: '9px' }}>
              Contextual rendering
            </span>
          </div>

          {/* Lines — gu then en per line, so grid auto-places them into col 1 / col 2 */}
          {poem.stanzas.map((stanza, si) => (
            <Fragment key={si}>
              {si > 0 && <div className="stanza-div" />}
              {stanza.map((line) => (
                <Fragment key={line.flatIdx}>
                  <span
                    className={`gu-line${active === line.flatIdx ? ' active' : line.flatIdx < played ? ' played' : ''}`}
                    title={line.roman}
                  >
                    {line.gu}
                  </span>
                  <span
                    className={`en-line${active === line.flatIdx ? ' active' : line.flatIdx < played ? ' played' : ''}`}
                  >
                    {line.en}
                  </span>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      </article>
    );
  }

  return (
    <>
      {/* Topbar */}
      <div id="topbar">
        <a className="site-guj" href="/">
          ગુજરાત
        </a>
        <div style={{ width: 1, height: 22, background: 'rgba(26,26,72,0.18)' }} />
        <nav className="crumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="crumb-sep">›</span>
          <a href="/map">Across Time</a>
          <span className="crumb-sep">›</span>
          <span className="crumb-current">Poets · Akha Bhagat</span>
        </nav>
        <div className="topbar-spacer" />
        <a className="topbar-era" href="/map">
          Middle Period · c. 1600 CE
        </a>
      </div>

      {/* Mini nav */}
      <div id="minnav" className={minNavVisible ? 'visible' : ''}>
        <div className="minnav-inner">
          <span className="minnav-label">Verses</span>
          <a className={`chip${activeChip === '1' ? ' active' : ''}`} href="#poem-1">
            <span className="chip-guj">ત૧</span>
            <span>Tilak &amp; Ritual</span>
          </a>
          <a className={`chip${activeChip === '2' ? ' active' : ''}`} href="#poem-2">
            <span className="chip-guj">ત૨</span>
            <span>Samjan</span>
          </a>
          <a className={`chip${activeChip === '3' ? ' active' : ''}`} href="#poem-3">
            <span className="chip-guj">ત૩</span>
            <span>Laughing &amp; Playing</span>
          </a>
          <a className={`chip${activeChip === '4' ? ' active' : ''}`} href="#poem-4">
            <span className="chip-guj">ત૪</span>
            <span>High &amp; Low</span>
          </a>
          <a className={`chip${activeChip === '5' ? ' active' : ''}`} href="#poem-5">
            <span className="chip-guj">ત૫</span>
            <span>Let the Restless</span>
          </a>
          <div className="minnav-spacer" />
          <a className="minnav-back" href="/map">
            ← Gujarat Across Time
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-kicker">Poet · Gujarati Verse · 17th Century</div>
          <div className="hero-grid">
            <div>
              <h1 className="hero-title-guj">અખો</h1>
              <p className="hero-title-eng">Akha Bhagat — Verses of Clarity</p>
              <div className="hero-dates">
                <span>
                  <b>c. 1591</b> Jetalpur, Gujarat
                </span>
                <span>
                  <b>c. 1656</b> Ahmedabad
                </span>
              </div>
            </div>
            <div className="hero-bio">
              Akha was a goldsmith of Ahmedabad who renounced his trade to follow{' '}
              <em>Vedanta</em>. His <em>chhappas</em> — six-line verses — cut through ritual,
              false priests, and ego-laden scholarship with biting wit. He wrote as an insider
              who had seen through it all.
            </div>
          </div>
          <div className="hero-meta">
            <div className="hm-cell">
              <div className="hm-label">Form</div>
              <div className="hm-value">
                Chhappā <span className="small">six-line satirical verse</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Language</div>
              <div className="hm-value">
                Old Gujarati <span className="small">with Vraj &amp; Hindi loanwords</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Tradition</div>
              <div className="hm-value">
                Bhakti · Jñāna <span className="small">Advaita Vedānta</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Verses in this set</div>
              <div className="hm-value">
                Five <span className="small">selected from the Akhegita</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="section-label">Verses</div>

        {showBanner && (
          <div className="banner" id="audio-banner">
            <span style={{ color: '#C49532' }}>●</span>
            <span>
              <em>Live audio not yet generated.</em> Recitation uses an estimated cadence —
              for native voice, run <code>scripts/generate_audio.py</code>.
            </span>
          </div>
        )}

        {renderPoem(1)}
        {renderPoem(2)}
        {renderPoem(3)}
        {renderPoem(4)}
        {renderPoem(5)}

        <aside className="aside-chhapa">
          <blockquote>
            The <em>chhappā</em> is a six-line Hindi-Gujarati verse form: two rhyming couplets
            followed by two longer lines that turn the argument. Akha used it like a scalpel.
          </blockquote>
        </aside>

        {/* Credits & Sources */}
        <aside className="aside-credits">
          <h3 className="credits-heading">Sources &amp; Credits</h3>
          <ul className="credits-list">
            <li>
              <a href="https://rekhtagujarati.org" target="_blank" rel="noopener noreferrer">
                Rekhta Gujarati
              </a>{' '}
              — Gujarati literary archive
            </li>
            <li>
              <a href="https://gujarativishwakosh.org" target="_blank" rel="noopener noreferrer">
                Gujarati Vishwakosh
              </a>{' '}
              — encyclopaedic source on Akha Bhagat
            </li>
            <li>
              <a href="https://kavilok.com" target="_blank" rel="noopener noreferrer">
                Kavilok
              </a>{' '}
              — classical Gujarati poetry database
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Akha_Bhagat"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia — Akha Bhagat
              </a>{' '}
              — biographical overview
            </li>
          </ul>
          <p className="credits-note">
            Poem texts are in the public domain. English translations are contextual renderings
            made for this project. Romanisation follows a simplified IAST convention.
          </p>
        </aside>

        <div className="next-poet">
          <span
            style={{
              fontFamily: 'Inter,sans-serif',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(110,110,146,0.6)',
            }}
          >
            Next
          </span>
          <a href="/">← Back to the library</a>
        </div>
      </main>

      <footer className="akha-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'Tiro Gujarati,serif', fontSize: 16, color: '#11103A' }}>
            ગુજરાત
          </span>
          <span>· a literary atlas · in progress</span>
        </div>
        <div>
          Source texts public domain · Voice:{' '}
          <a href="https://sarvam.ai" target="_blank" rel="noopener">
            Sarvam AI
          </a>
        </div>
      </footer>
    </>
  );
}
