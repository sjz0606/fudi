// Ma'lumot manbasi: t.me/fudi_uz kanali (2026-10-30 … 11-06 postlari). Menyu har kuni o'zgaradi.
export const CONTACT = {
  phone: '+998951220044', phoneTxt: '+998 95 122 00 44',
  tgOrder: 'fudi_zakaz', tgChannel: 'fudi_uz', ig: 'fudi_uz',
  delivery: 20000, until: '15:00'
};
// side: 'salad' — салат+компот+хлеб, 'kefir' — кефир+компот+хлеб
export const DISHES = {
  bif:   { img:'3414_0', ru:'Бифштекс', uz:'Bifshteks', dru:'пюре, гречка, яичница', duz:'pyure, grechka, tuxum' },
  kazan: { img:'3386_1', ru:'Куриный казан-кабоб', uz:'Tovuqli qozon kabob', dru:'курица с картофелем и луком', duz:'kartoshka va piyozli tovuq' },
  lagm:  { img:'3392_0', ru:'Жареный лагман', uz:'Qovurma lag‘mon', dru:'лапша, говядина, овощи', duz:'lag‘mon, mol go‘shti, sabzavot' },
  kiev:  { img:'3395_0', ru:'Котлета по-киевски', uz:'Kiyevcha kotlet', dru:'с гречкой', duz:'grechka bilan' },
  dolma: { img:'3395_1', ru:'Долма', uz:'Do‘lma', dru:'в виноградных листьях, с картофелем', duz:'tok bargida, kartoshka bilan' },
  myaso: { img:'3395_2', ru:'Мясо по-домашнему', uz:'Uy uslubida go‘sht', dru:'говядина с картофелем фри', duz:'mol go‘shti, kartoshka fri' },
  slivk: { img:'3402_0', ru:'Курица в сливочном соусе', uz:'Qaymoqli sousda tovuq', dru:'со спагетти и сыром', duz:'spagetti va pishloq bilan' },
  syr:   { img:'3402_1', ru:'Запечённая курица с сыром', uz:'Pishloqli pishirilgan tovuq', dru:'рис и гречка', duz:'guruch va grechka' },
  lyulya:{ img:'3402_2', ru:'Люля-кабоб', uz:'Lula kabob', dru:'с жареным картофелем', duz:'qovurilgan kartoshka bilan' },
  spag:  { img:'3409_0', ru:'Спагетти, куриная котлета', uz:'Spagetti, tovuq kotleti', dru:'в томатном соусе', duz:'pomidor sousida' },
  hanum: { img:'3409_1', ru:'Ханум', uz:'Xonim', dru:'с томатной подливой', duz:'pomidorli qayla bilan' },
  golub: { img:'3409_2', ru:'Голубцы', uz:'Karam do‘lma', dru:'с картофелем и морковью', duz:'kartoshka va sabzi bilan' },
  gulyash:{img:'3414_1', ru:'Куриный гуляш', uz:'Tovuq gulyash', dru:'пюре и гречка', duz:'pyure va grechka' },
  nugg:  { img:'3414_2', ru:'Наггетсы', uz:'Naggetslar', dru:'с соусом', duz:'sous bilan' },
  flot:  { img:'3426_0', ru:'Макароны по-флотски, сосиска', uz:'Qiymali makaron, sosiska', dru:'с мясным фаршем', duz:'go‘sht qiymasi bilan' },
  zrazy: { img:'3426_1', ru:'Картофельные зразы с фаршем', uz:'Qiymali kartoshka zrazi', dru:'с гречкой', duz:'grechka bilan' },
  say:   { img:'3426_2', ru:'Гошт сай', uz:'Go‘sht say', dru:'говядина, перец, рис', duz:'mol go‘shti, qalampir, guruch' },
  pelm:  { img:'3386_2', ru:'Пельмени', uz:'Chuchvara', dru:'домашние, с кефиром', duz:'uy chuchvarasi, kefir bilan', side:'kefir' },
  bedr:  { img:'3386_3', ru:'Запечённые бёдрышки', uz:'Pishirilgan tovuq sonlari', dru:'рис и картофель фри', duz:'guruch va kartoshka fri' }
};
// Har kuni bor setlar
export const ALWAYS = [ ['pelm',40000], ['bedr',45000] ];
// Hafta kunlari: 1=Du … 6=Sh (JS getDay)
export const WEEK = {
  1: [['kiev',40000],['dolma',40000],['myaso',50000]],
  2: [['slivk',40000],['syr',40000],['lyulya',45000]],
  3: [['spag',40000],['hanum',40000],['golub',40000]],
  4: [['bif',40000],['gulyash',40000],['nugg',40000]],
  5: [['flot',40000],['zrazy',40000],['say',45000]],
  6: [['lagm',40000]]
};
export const GALLERY = ['3407_0','3400_0','3390_0','3419_0','3431_0','3390_1','3400_1'];
