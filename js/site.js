import { CONTACT, DISHES, ALWAYS, WEEK, GALLERY } from './data.js';

const $ = s => document.querySelector(s);
const T = {
  ru: {
    nMenu:'Меню', nHow:'Как заказать', nOffice:'Для офисов', nContact:'Контакты', langAria:'Переключить на узбекский', call:'Позвонить', close:'Закрыть',
    kicker:'Ташкент · доставка обедов', h1a:'Горячий обед', h1b:'в офис и на дом',
    lead:'Каждый день новое меню. Сет — это полноценный обед: основное блюдо, салат, компот и хлеб. Готовим утром, привозим к обеду.',
    ctaMenu:'Меню на сегодня', ctaTg:'Заказать в Telegram',
    aDish:'Блюдо', aSalad:'Салат', aKefir:'Кефир', aCompot:'Компот', aBread:'Хлеб',
    f1:'сум — сет целиком', f2:'сум — доставка по Ташкенту', f3:'Оплата онлайн через QR', f4:'Принимаем заказы заранее, до 15:00',
    todayOpen:'Сегодня в меню', todayClosed:'Сегодня заказы уже закрыты', todaySun:'Воскресенье · меню на понедельник', todayTomorrow:'Можно заказать на завтра',
    mEye:'Меню недели', mTitle:'Выберите сет на любой день', mSub:'Нажмите на сет — он появится на тарелке. Добавьте нужное количество и отправьте заказ в Telegram.',
    pickK:'На тарелке', always:'Есть в меню каждый день', mNote:'Актуальное меню публикуем каждое утро в канале', set:'Сет', sum:'сум', closedDay:'В воскресенье меню не публикуется — выберите другой день.',
    salad:'салат', kefir:'кефир', compot:'компот', bread:'хлеб',
    hEye:'Как заказать', hTitle:'Обед за три шага',
    s1h:'Смотрите меню', s1p:'Каждое утро в Telegram-канале и здесь, на сайте: 4–5 сетов на день, от 40 000 сум.',
    s2h:'Пишите или звоните', s2p:'Заказ — в Telegram @fudi_zakaz или по телефону. Принимаем заранее, приём до 15:00.',
    s3h:'Получайте обед', s3p:'Курьер привезёт в офис или домой. Доставка по Ташкенту — 20 000 сум, оплата онлайн через QR.',
    oEye:'Для офисов', oTitle:'Обеды для всей команды', oSub:'Каждый сет — в отдельном контейнере с крышкой. Удобно раздать коллегам и пообедать прямо на рабочем месте.',
    cTitle:'Заказать обед', cSub:'Напишите нам в Telegram или позвоните — подскажем меню на день и время доставки.',
    cHoursK:'Приём заказов', cHours:'Ежедневно до 15:00, можно заранее', cDelK:'Доставка', cDel:'20 000 сум по Ташкенту', cPayK:'Оплата', cPay:'Онлайн через QR-код', cChanK:'Меню каждый день', city:'Ташкент', brandName:'Фуди', slogan:'Вкусно · Натурально · Аппетитно',
    sets1:'сет', sets2:'сета', sets5:'сетов', delivery:'доставка', cartGo:'Оформить',
    oFormT:'Ваш заказ', fName:'Имя', fPhone:'Телефон', fAddr:'Адрес или офис', fDay:'День доставки', fTime:'Время', fNote:'Комментарий',
    phName:'Как к вам обращаться', phPhone:'+998 __ ___ __ __', phAddr:'Улица, дом, офис / ориентир', phNote:'Например: без лука, 3 этаж',
    fErr:'Заполните имя, телефон и адрес.', fSend:'Отправить в Telegram', fHint:'Откроется Telegram с готовым сообщением — останется нажать «Отправить». Текст заказа также скопирован.',
    total:'Итого', asap:'Ближайшее время', today:'сегодня', tomorrow:'завтра',
    dT:'Заказ готов к отправке', dP:'Мы открыли Telegram с текстом заказа. Если окно не открылось — нажмите кнопку ниже и вставьте текст (он уже скопирован).', dBtn:'Открыть @fudi_zakaz',
    msgHead:'Здравствуйте! Хочу заказать обед:', msgDel:'Доставка', msgTotal:'Итого', msgName:'Имя', msgPhone:'Телефон', msgAddr:'Адрес', msgDay:'День', msgTime:'Время', msgNote:'Комментарий',
    days:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], daysFull:['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']
  },
  uz: {
    nMenu:'Menyu', nHow:'Qanday buyurtma', nOffice:'Ofislar uchun', nContact:'Aloqa', langAria:'Rus tiliga o‘tish', call:'Qo‘ng‘iroq qilish', close:'Yopish',
    kicker:'Toshkent · tushlik yetkazish', h1a:'Issiq tushlik', h1b:'ofisga va uyga',
    lead:'Har kuni yangi menyu. Set — bu to‘liq tushlik: asosiy taom, salat, kompot va non. Ertalab tayyorlaymiz, tushlikka yetkazamiz.',
    ctaMenu:'Bugungi menyu', ctaTg:'Telegramda buyurtma',
    aDish:'Taom', aSalad:'Salat', aKefir:'Kefir', aCompot:'Kompot', aBread:'Non',
    f1:'so‘m — to‘liq set', f2:'so‘m — Toshkent bo‘ylab yetkazish', f3:'QR orqali onlayn to‘lov', f4:'Buyurtma oldindan, 15:00 gacha',
    todayOpen:'Bugun menyuda', todayClosed:'Bugungi buyurtmalar yopildi', todaySun:'Yakshanba · dushanba menyusi', todayTomorrow:'Ertaga uchun buyurtma bering',
    mEye:'Haftalik menyu', mTitle:'Istalgan kun uchun set tanlang', mSub:'Setni bosing — u likopchada paydo bo‘ladi. Sonini qo‘shing va buyurtmani Telegramga yuboring.',
    pickK:'Likopchada', always:'Har kuni menyuda', mNote:'Kunlik menyu har tong kanalda e’lon qilinadi', set:'Set', sum:'so‘m', closedDay:'Yakshanba kuni menyu chiqmaydi — boshqa kunni tanlang.',
    salad:'salat', kefir:'kefir', compot:'kompot', bread:'non',
    hEye:'Qanday buyurtma', hTitle:'Uch qadamda tushlik',
    s1h:'Menyuni ko‘ring', s1p:'Har tong Telegram kanalda va shu saytda: kuniga 4–5 set, 40 000 so‘mdan.',
    s2h:'Yozing yoki qo‘ng‘iroq qiling', s2p:'Buyurtma — Telegramda @fudi_zakaz yoki telefon orqali. Oldindan qabul qilamiz, 15:00 gacha.',
    s3h:'Tushlikni oling', s3p:'Kuryer ofis yoki uyingizga olib keladi. Toshkent bo‘ylab yetkazish — 20 000 so‘m, to‘lov QR orqali.',
    oEye:'Ofislar uchun', oTitle:'Butun jamoaga tushlik', oSub:'Har bir set qopqoqli alohida idishda. Hamkasblarga tarqatish va ish joyida tushlik qilish qulay.',
    cTitle:'Tushlik buyurtma qilish', cSub:'Telegramda yozing yoki qo‘ng‘iroq qiling — kunlik menyu va yetkazish vaqtini aytamiz.',
    cHoursK:'Buyurtma qabuli', cHours:'Har kuni 15:00 gacha, oldindan ham mumkin', cDelK:'Yetkazish', cDel:'Toshkent bo‘ylab 20 000 so‘m', cPayK:'To‘lov', cPay:'QR-kod orqali onlayn', cChanK:'Har kungi menyu', city:'Toshkent', brandName:'Fudi', slogan:'Mazali · Tabiiy · Ishtahali',
    sets1:'set', sets2:'set', sets5:'set', delivery:'yetkazish', cartGo:'Rasmiylashtirish',
    oFormT:'Buyurtmangiz', fName:'Ism', fPhone:'Telefon', fAddr:'Manzil yoki ofis', fDay:'Yetkazish kuni', fTime:'Vaqt', fNote:'Izoh',
    phName:'Sizga qanday murojaat qilaylik', phPhone:'+998 __ ___ __ __', phAddr:'Ko‘cha, uy, ofis / mo‘ljal', phNote:'Masalan: piyozsiz, 3-qavat',
    fErr:'Ism, telefon va manzilni kiriting.', fSend:'Telegramga yuborish', fHint:'Telegram tayyor xabar bilan ochiladi — faqat «Yuborish»ni bosing. Buyurtma matni nusxalandi.',
    total:'Jami', asap:'Eng yaqin vaqt', today:'bugun', tomorrow:'ertaga',
    dT:'Buyurtma yuborishga tayyor', dP:'Telegramni buyurtma matni bilan ochdik. Oyna ochilmagan bo‘lsa — pastdagi tugmani bosing va matnni qo‘ying (u nusxalangan).', dBtn:'@fudi_zakaz ni ochish',
    msgHead:'Assalomu alaykum! Tushlik buyurtma qilmoqchiman:', msgDel:'Yetkazish', msgTotal:'Jami', msgName:'Ism', msgPhone:'Telefon', msgAddr:'Manzil', msgDay:'Kun', msgTime:'Vaqt', msgNote:'Izoh',
    days:['Ya','Du','Se','Ch','Pa','Ju','Sh'], daysFull:['yakshanba','dushanba','seshanba','chorshanba','payshanba','juma','shanba']
  }
};
let lang = localStorage.getItem('fudi-lang') || 'ru';
const t = k => T[lang][k] ?? k;
const fmt = n => n.toLocaleString('ru-RU').replace(/\s/g, ' ');

// --- Toshkent vaqti ---
function tashkent() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false, day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(new Date()).map(x => [x.type, x.value]));
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return { wd, h: +p.hour % 24, m: +p.minute, date: new Date(+p.year, +p.month - 1, +p.day) };
}
const now = tashkent();
const open = now.wd !== 0 && (now.h < 15);
const startDay = now.wd === 0 ? 1 : (!open ? (now.wd === 6 ? 1 : now.wd + 1) : now.wd);
let day = startDay;

// Tanlangan hafta kuni uchun eng yaqin sana
function dateFor(wd) {
  let add = (wd - now.wd + 7) % 7;
  if (add === 0 && !open) add = 7;
  const d = new Date(now.date); d.setDate(d.getDate() + add);
  return { d, add };
}
const dd = d => String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0');

// --- Savat: kunlar bo'yicha ---
const carts = {}; // {wd: {key: qty}}
const cartOf = wd => carts[wd] || (carts[wd] = {});

// --- 3D ---
let stage = { setDish() {}, preload() {} };
let curDish = null;
const sideOf = k => DISHES[k].side || 'salad';
import('./stage.js').then(m => {
  stage = m.stage;
  stage.preload && stage.preload([...new Set([...Object.values(WEEK).flat(), ...ALWAYS].map(x => DISHES[x[0]].img))]);
  if (curDish) stage.setDish(DISHES[curDish].img, sideOf(curDish), true);
}).catch(() => document.documentElement.classList.add('no-gl'));

function pickDish(k, instant) {
  curDish = k;
  const d = DISHES[k];
  stage.setDish(d.img, sideOf(k), instant);
  $('#fbHero').src = $('#fbMenu').src = `assets/p/${d.img}.webp`;
  $('#pickName').textContent = d[lang];
  $('#pickDesc').textContent = d['d' + lang];
  $('#pickComp').textContent = comp(k).join(' · ');
  const side = $('#aSide');
  side.querySelector('span').textContent = t(sideOf(k) === 'kefir' ? 'aKefir' : 'aSalad');
  side.querySelector('use').setAttribute('href', sideOf(k) === 'kefir' ? '#i-cup' : '#i-bowl');
  document.querySelectorAll('.set').forEach(el => el.classList.toggle('on', el.dataset.k === k));
}
const comp = k => sideOf(k) === 'kefir' ? [t('kefir'), t('compot'), t('bread')] : [t('salad'), t('compot'), t('bread')];

// --- Menyu ---
function setCard(k, price, n) {
  const d = DISHES[k], q = cartOf(day)[k] || 0;
  const icons = sideOf(k) === 'kefir' ? ['i-cup', 'i-cup', 'i-bread'] : ['i-bowl', 'i-cup', 'i-bread'];
  return `<li class="set" data-k="${k}" data-price="${price}" tabindex="0">
    <span class="set-img"><img src="assets/p/${d.img}.webp" alt="" loading="lazy" width="84" height="84"></span>
    <div><span class="set-n">${t('set')} ${n}</span><h4>${d[lang]}</h4><p>${d['d' + lang]}</p>
      <div class="set-comp">${comp(k).map((c, i) => `<span><svg class="ic"><use href="#${icons[i]}"/></svg>${c}</span>`).join('')}</div></div>
    <div class="set-r"><span class="price">${fmt(price)}<small>${t('sum')}</small></span>
      <div class="qty${q ? '' : ' zero'}"><button class="q-minus" type="button" aria-label="−"><svg class="ic"><use href="#i-minus"/></svg></button><output>${q}</output><button class="q-plus" type="button" aria-label="+"><svg class="ic"><use href="#i-plus"/></svg></button></div></div>
  </li>`;
}
function renderDays() {
  $('#days').innerHTML = [1, 2, 3, 4, 5, 6].map(w => {
    const { d, add } = dateFor(w);
    const lab = add === 0 ? t('today') : add === 1 ? t('tomorrow') : ' ';
    return `<button class="day" role="tab" type="button" data-w="${w}" aria-selected="${w === day}">${t('days')[w]}<small>${lab}</small></button>`;
  }).join('');
}
function renderMenu(keepDish) {
  const list = WEEK[day] || [];
  $('#sets').innerHTML = list.length ? list.map(([k, p], i) => setCard(k, p, i + 1)).join('') : `<li class="closed-day">${t('closedDay')}</li>`;
  $('#always').innerHTML = ALWAYS.map(([k, p], i) => setCard(k, p, list.length + i + 1)).join('');
  const first = list[list.length - 1]?.[0] || ALWAYS[0][0];
  pickDish(keepDish && curDish ? curDish : first, !curDish);
  renderCart();
}
$('#days').addEventListener('click', e => {
  const b = e.target.closest('.day'); if (!b) return;
  day = +b.dataset.w;
  document.querySelectorAll('.day').forEach(x => x.setAttribute('aria-selected', x === b));
  renderMenu(false);
});

function onSetClick(e) {
  const li = e.target.closest('.set'); if (!li) return;
  const k = li.dataset.k, c = cartOf(day);
  if (e.target.closest('.q-plus')) c[k] = (c[k] || 0) + 1;
  else if (e.target.closest('.q-minus')) { c[k] = Math.max(0, (c[k] || 0) - 1); if (!c[k]) delete c[k]; }
  if (e.target.closest('.qty')) {
    const q = c[k] || 0, box = li.querySelector('.qty');
    box.classList.toggle('zero', !q); box.querySelector('output').textContent = q;
    renderCart();
  }
  if (curDish !== k) pickDish(k);
}
['#sets', '#always'].forEach(s => {
  $(s).addEventListener('click', onSetClick);
  $(s).addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList.contains('set')) pickDish(e.target.dataset.k); });
});

// --- Savat ---
function priceOf(k) { return ([...(WEEK[day] || []), ...ALWAYS].find(x => x[0] === k) || [0, 0])[1]; }
function lines() { return Object.entries(cartOf(day)).map(([k, q]) => ({ k, q, p: priceOf(k) })); }
function plural(n) { if (lang === 'uz') return t('sets1'); const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? t('sets1') : a >= 2 && a <= 4 && (b < 12 || b > 14) ? t('sets2') : t('sets5'); }
function renderCart() {
  const L = lines(), n = L.reduce((s, x) => s + x.q, 0), sum = L.reduce((s, x) => s + x.q * x.p, 0);
  const cart = $('#cart');
  if (!n) { cart.hidden = true; document.body.classList.remove('has-cart'); return; }
  cart.hidden = false;
  $('#cartCount').textContent = `${n} ${plural(n)} · ${t('days')[day]} · ${t('delivery')} ${fmt(CONTACT.delivery)}`;
  document.body.classList.add('has-cart');
  $('#cartTotal').textContent = `${fmt(sum + CONTACT.delivery)} ${t('sum')}`;
}

// --- Buyurtma oynasi ---
const sheet = $('#sheet');
function openSheet() {
  const L = lines(), sum = L.reduce((s, x) => s + x.q * x.p, 0);
  $('#sheetLines').innerHTML = L.map(x => `<li><span>${x.q} × ${DISHES[x.k][lang]}</span><span>${fmt(x.q * x.p)}</span></li>`).join('') +
    `<li class="muted"><span>${t('msgDel')}</span><span>${fmt(CONTACT.delivery)}</span></li>`;
  $('#sheetTotal').innerHTML = `<span>${t('total')}</span><span>${fmt(sum + CONTACT.delivery)} ${t('sum')}</span>`;
  const { d, add } = dateFor(day);
  $('#fDay').value = `${t('days')[day]}, ${dd(d)}${add === 0 ? ' · ' + t('today') : add === 1 ? ' · ' + t('tomorrow') : ''}`;
  const times = [t('asap'), '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
  const sel = $('#fTime'), was = sel.selectedIndex;
  sel.innerHTML = times.map(x => `<option>${x}</option>`).join(''); if (was > 0) sel.selectedIndex = was;
  $('#orderForm').hidden = false; $('#sheetDone').hidden = true; $('#sheetErr').hidden = true;
  sheet.showModal();
}
$('#cartGo').addEventListener('click', openSheet);
$('#sheetX').addEventListener('click', () => sheet.close());
sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });
$('#orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = n => f.elements[n].value.trim();
  let ok = true;
  ['name', 'phone', 'addr'].forEach(n => { const bad = n === 'phone' ? v(n).replace(/\D/g, '').length < 9 : !v(n); f.elements[n].classList.toggle('bad', bad); if (bad) ok = false; });
  $('#sheetErr').hidden = ok; if (!ok) return;
  const L = lines(), sum = L.reduce((s, x) => s + x.q * x.p, 0);
  const msg = [t('msgHead'), '',
    ...L.map(x => `• ${x.q} × ${DISHES[x.k][lang]} (${comp(x.k).join(', ')}) — ${fmt(x.q * x.p)}`),
    `• ${t('msgDel')} — ${fmt(CONTACT.delivery)}`, `${t('msgTotal')}: ${fmt(sum + CONTACT.delivery)} ${t('sum')}`, '',
    `${t('msgDay')}: ${v('day')}`, `${t('msgTime')}: ${v('time')}`, `${t('msgName')}: ${v('name')}`, `${t('msgPhone')}: ${v('phone')}`, `${t('msgAddr')}: ${v('addr')}`,
    ...(v('note') ? [`${t('msgNote')}: ${v('note')}`] : [])].join('\n');
  const url = `https://t.me/${CONTACT.tgOrder}?text=${encodeURIComponent(msg)}`;
  navigator.clipboard?.writeText(msg).catch(() => {});
  $('#doneTg').href = url;
  window.open(url, '_blank', 'noopener');
  $('#orderForm').hidden = true; $('#sheetDone').hidden = false;
});

// --- Bugun ---
function renderToday() {
  const dot = $('#todayDot');
  let head, dish;
  if (now.wd === 0) { head = t('todaySun'); dot.classList.add('off'); }
  else if (!open) { head = t('todayClosed'); dot.classList.add('off'); }
  else head = t('todayOpen');
  const l = WEEK[startDay] || [];
  dish = l.map(x => DISHES[x[0]][lang]).join(' · ');
  if (!open && now.wd !== 0) dish = t('todayTomorrow') + ': ' + dish;
  $('#todayHead').textContent = head; $('#todayDish').textContent = dish;
}

// --- Galereya ---
$('#reel').innerHTML = GALLERY.map(g => `<figure><img src="assets/g/${g}.webp" alt="" loading="lazy" width="600" height="800"></figure>`).join('');

// --- Til ---
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
  document.querySelectorAll('[data-t-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.tAria)));
  document.querySelectorAll('[data-ph]').forEach(el => el.placeholder = t(el.dataset.ph));
  $('#lang').textContent = lang === 'ru' ? 'UZ' : 'RU';
  document.title = lang === 'ru' ? 'Фуди — доставка обедов в офис и на дом, Ташкент' : 'Fudi — ofis va uyga tushlik yetkazish, Toshkent';
  document.querySelector('.brand').setAttribute('aria-label', lang === 'ru' ? 'Фуди' : 'Fudi'); $('.c-logo').alt = lang === 'ru' ? 'Фуди' : 'Fudi';
  $('.anatomy').setAttribute('aria-label', lang === 'ru' ? 'Состав сета' : 'Set tarkibi');
  $('#reel').setAttribute('aria-label', lang === 'ru' ? 'Фото заказов' : 'Buyurtmalar suratlari');
  renderDays(); renderMenu(true); renderToday();
}
$('#lang').addEventListener('click', () => { lang = lang === 'ru' ? 'uz' : 'ru'; localStorage.setItem('fudi-lang', lang); applyLang(); });
$('#yr').textContent = now.date.getFullYear();
applyLang();

// --- Header, reveal ---
const top = $('#top');
const onScroll = () => top.classList.toggle('solid', scrollY > 30);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
document.querySelectorAll('.sec-head,.steps li,.office-head,.contact-grid>*').forEach(el => { el.classList.add('rv'); io.observe(el); });
