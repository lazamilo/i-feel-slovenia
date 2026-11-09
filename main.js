(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const eur = n => n.toLocaleString('sl-SI', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';

  // ---------- Data (slovenia.info, Edinstvena doživetja Slovenije) ----------
  const I = 'assets/img/';
  const EXP = [
    { t: 'Doživetje »Untouched by light« – degustacija penine, nedotaknjene od svetlobe', d: 'Okusite prvo peneče se vino na svetu, pridelano v popolni temi.', p: 200, c: 'kulinarika', i: 'Radgonske_gorice-Untouched-cover.jpg' },
    { t: 'Velenjsko podzemlje – kulinarično doživetje 160 metrov pod zemljo', d: 'Vrhunska gastronomska izkušnja v najgloblji jedilnici v Sloveniji.', p: 185, c: 'kulinarika', i: 'velenjeunderground_naslovna.jpg' },
    { t: 'Skrivnosti UNESCO pragozda Krokar', d: 'Sprehodite se po obrobju pragozda Krokar in s pomočjo pripovedi vodnika odkrivajte njegove skrivnosti.', p: 90, c: 'narava', i: 'naslovna.jpg' },
    { t: 'Veslanje z olimpijci na Blejskem jezeru', d: 'V družbi vrhunskih športnikov osvojite najlepšo veslaško progo na svetu.', p: 220, c: 'adrenalin', i: '04_INSYNC_Veslanje_z_Olimpijci_na_Blejskem_jezeru.jpeg' },
    { t: 'Mojster Plečnik', d: 'Epski krog z arhitektom Unescove Ljubljane. Intimno doživetje vizionarskega mojstra.', p: 150, c: 'kultura', i: 'Mojster_Plecnik_Dunja_Wedam_2021.jpg' },
    { t: 'Spoznajte medveda v njegovem življenjskem okolju', d: 'Vstopite v svet skrivnostnih kočevskih gozdov z največjo gostoto rjavih medvedov.', p: 270, c: 'narava', i: 'opazovanje_medveda_gospod_medved_zdravko_turk.jpg' },
    { t: 'Vintage Gourmet Tour', d: 'Nostalgično popotovanje z legendarnimi starodobniki po istrskih oljčnikih.', p: 410, c: 'kulinarika', i: 'lisjak_olive_tour_naslovna.jpg' },
    { t: 'Po poteh prvih jamskih raziskovalcev – Po poteh Luke Čeča', d: 'Adrenalinska izkušnja skritih rovov, ki vas iz turistov spremeni v raziskovalce.', p: 200, c: 'adrenalin', i: '005_2018_postojnska_jama.jpg' },
    { t: 'Fish & Fly Trio', d: 'Tridnevno doživetje za ljubitelje muharjenja, neokrnjene narave in čistih rek.', p: 2700, c: 'narava', i: 'SUE_fish_fly_trio_naslovna_02.jpg' },
    { t: 'Prelomite belokranjsko pogačo s prijatelji', d: 'V družbi domačinov se naučite speči najbolj slavno slovensko pogačo.', p: 50, c: 'kulinarika', i: 'najbolje_je_prelomiti_pogaco_naslovna.jpeg' },
    { t: 'Sedem veličastnih – navdihujoče zgodbe gradov Posavja', d: 'Popotovanje med sedmimi posavskimi gradovi z bogato kulturno dediščino.', p: 842, c: 'kultura', i: 'sedem_velicastnih_mokrice.jpg' },
    { t: 'Adrenalinski gorsko-kolesarski spust Črna luknja', d: 'Spust po opuščenih rovih rudnika Mežica v Podzemlju Pece.', p: 75, c: 'adrenalin', i: 'crna_luknja.jpeg' },
    { t: 'Meet Meat & Eat – zgodba o mesu', d: 'Spoznajte proces zorenja mesnin v priznani prekmurski šunkarni.', p: 145, c: 'kulinarika', i: 'SUE_meet_meat_eat.jpg' },
    { t: 'Divja dolina Soče skozi objektiv', d: 'Z izkušenim lovcem se podajte na fotolov v kraljestvo Zlatoroga.', p: 279, c: 'narava', i: 'divja_soca.jpeg' },
    { t: 'Tajni prostori Hotela Jama', d: 'Dokumentarno doživetje, ki odpira vrata v skrivne prostore časa železne zavese.', p: 50, c: 'kultura', i: 'SUE_tajni_prostori_iztok_medja_01.jpg' },
    { t: 'Dobimo se na plac\'', d: 'Začnite dan s pravim ljubljanskim zajtrkom na glavni tržnici.', p: 50, c: 'kulinarika', i: 'SUE_dobimo_se_na_plac_naslovnica.jpg' },
    { t: 'Avantura s kajakom v podzemlju Pece', d: 'Veslajte skozi zalite rove največjega rudnika svinca in cinka v tem delu Evrope.', p: 55, c: 'adrenalin', i: 'edinstvena_podzemlje_pece_h_1.jpg' },
    { t: 'Začutite Veliko planino', d: 'Pastirska dediščina Velike planine, udoben oddih in sodobna kulinarika.', p: 591, c: 'narava', i: 'velika_planina_planina.jpg' },
    { t: 'Kulinarični časovni stroj', d: 'Kulinarični sprehod skozi zgodovino Ljubljanskega gradu s kostumiranimi vodniki.', p: 166.66, c: 'kulinarika', i: 'CASOVNI_STROJ0198.jpg' },
    { t: 'Kreativne rokodelske delavnice', d: 'V Ljubljani še vedno živijo rokodelski mojstri obrti, ki jih mnogi mislijo, da so izumrle.', p: 40, c: 'kultura', i: '07_Kreativne_rokodelske_delavnice_tiskar.jpeg' },
    { t: 'Dr. Fungi: »Mi gremo po gobe!«', d: 'Gozdna pustolovščina, na kateri spoznate vse o gobah.', p: 122, c: 'narava', i: 'dr_fungi_naslovna.jpg' },
    { t: 'Polet v usnjarno Evrope', d: 'Gosposko doživetje v stilu tridesetih let prejšnjega stoletja.', p: 290, c: 'kultura', i: 'gosposko_po_sostanju_naslovna.jpg' },
    { t: 'Rock\'n\'Roll okusov', d: 'Zmešani Maribor dobre hrane, vina in glasbe.', p: 120, c: 'kulinarika', i: 'Rock_and_roll_okusov_Klemen_Golob_lowres-25.jpg' },
    { t: 'S(p)anje na seniku Domačije Firbas', d: 'Čar slovenskega podeželja na eni najbolj tradicionalnih prleških domačij.', p: 315, c: 'narava', i: 'firbas_senik_naslovna.jpg' },
    { t: 'Zveni po praznikih', d: 'Praznični čas in slovenska tradicija na pristni gorenjski domačiji.', p: 54, c: 'kultura', i: 'SUE_zveni_po_praznikih_naslovna.jpg' },
    { t: 'Mediteranska kuharska delavnica z Ireno Fonda', d: 'Ob morju se v majhni skupini naučite vse o pripravi rib.', p: 165, c: 'kulinarika', i: '5-zvezdicna-dozivetja-ribogojnica-fonda-header.jpg' },
    { t: 'Medeno doživetje', d: 'V Medenem vrtu družine Stankovič spoznajte stoletno dediščino ženskega čebelarstva.', p: 85, c: 'narava', i: 'naslovna_2.jpg' },
    { t: 'Skrivnosti potopljenih vasi', d: 'Kako je rudarstvo vplivalo na podobo Šaleške pokrajine in njene prebivalce.', p: 116, c: 'kultura', i: 'potopljene_vasi.jpg' },
    { t: 'Pohod s soljenjem ovc nad Češko kočo', d: 'Po stoletnih poteh ovčereje na Jezerskem z izkušenim alpinistom.', p: 65, c: 'narava', i: 'Soljenje_Goli_vrh.jpg' }
  ];
  const CAT = { kulinarika: 'Kulinarika', narava: 'Narava', kultura: 'Kultura', adrenalin: 'Aktivno' };

  const REGIONS = [
    { n: 'Alpska Slovenija', img: 'assets/hero/alpska.jpg', d: 'Svet prijazno dostopnih hribov in gora. Po Julijskih Alpah, Kamniško-Savinjskih Alpah in Pohorju do najvišjih vrhov, rek, jezer in slapov vodijo pohodniške in kolesarske poti.', dest: ['Bled', 'Bohinj', 'Dolina Soče', 'Kranjska Gora', 'Rogla - Pohorje', 'Maribor - Pohorje', 'Koroška', 'Kranj', 'Radovljica', 'Zgornja Savinjska dolina', 'Cerkno'] },
    { n: 'Ljubljana & Osrednja Slovenija', img: 'assets/hero/osrednja.jpg', d: 'Odlično izhodišče za zaljubljanje v posebnosti Slovenije. Zelena prestolnica s Plečnikovo arhitekturo in kraji, kjer se tradicija sreča s sodobnostjo.', dest: ['Ljubljana', 'Idrija', 'Kamnik', 'Škofja Loka', 'Novo mesto', 'Bela krajina', 'Kočevsko', 'Cerklje na Gorenjskem'] },
    { n: 'Termalna Panonska Slovenija', img: 'assets/hero/panonska.jpg', d: 'Območje zdravilnih voda in najlepših poti do dobrega počutja, kjer so številna slovenska naravna zdravilišča.', dest: ['Ptuj', 'Celje', 'Laško', 'Rogaška Slatina', 'Podčetrtek', 'Čatež in Posavje', 'Dobrna', 'Dolenjska', 'Pomurje', 'Šaleška - Velenje - Topolšica'] },
    { n: 'Mediteranska & Kraška Slovenija', img: 'assets/hero/mediteranska.jpg', d: 'Čudesa kraškega sveta in okus po tradicionalni morski soli. Obala, vinogradi Brd in Vipavske doline ter podzemne jame.', dest: ['Portorož - Piran', 'Koper', 'Izola', 'Ankaran', 'Brda', 'Kras', 'Nova Gorica in Vipavska dolina'] }
  ];

  // ---------- Toast ----------
  const toast = $('#toast');
  let tt;
  const say = m => { toast.textContent = m; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2400); };

  // ---------- Smooth scroll ----------
  let lenis;
  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = $(id);
    if (!el) return;
    e.preventDefault();
    closeMega(); closeMobile();
    lenis ? lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: 'smooth' });
  }));

  // ---------- Nav ----------
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const mega = $('#mega');
  let megaTimer;
  function openMega(key) {
    clearTimeout(megaTimer);
    $$('.mega-panel').forEach(p => p.classList.toggle('is-on', p.dataset.panel === key));
    $$('.nav-link[data-mega]').forEach(b => b.classList.toggle('is-open', b.dataset.mega === key));
    mega.classList.add('open');
  }
  function closeMega() { mega.classList.remove('open'); $$('.nav-link').forEach(b => b.classList.remove('is-open')); }
  $$('.nav-link[data-mega]').forEach(b => {
    b.addEventListener('mouseenter', () => openMega(b.dataset.mega));
    b.addEventListener('click', () => mega.classList.contains('open') && b.classList.contains('is-open') ? closeMega() : openMega(b.dataset.mega));
  });
  [nav].forEach(el => el.addEventListener('mouseleave', () => { megaTimer = setTimeout(closeMega, 180); }));
  mega.addEventListener('mouseenter', () => clearTimeout(megaTimer));
  addEventListener('keydown', e => e.key === 'Escape' && closeMega());

  const burger = $('#burger'), mm = $('#mobileMenu');
  function closeMobile() { burger.classList.remove('open'); mm.classList.remove('open'); }
  burger.addEventListener('click', () => { burger.classList.toggle('open'); mm.classList.toggle('open'); });

  // ---------- Hero slideshow ----------
  const slides = $$('#heroSlides img'), bars = $$('#heroProgress i');
  let cur = 0, heroTimer;
  function show(n) {
    slides[cur].classList.remove('is-active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('is-active');
    bars.forEach((b, i) => { b.classList.remove('run'); b.classList.toggle('done', i < cur); });
    void bars[cur].offsetWidth; bars[cur].classList.add('run');
    const s = slides[cur];
    const place = $('#heroPlace');
    if (hasGsap) {
      gsap.to(place, { opacity: 0, y: -6, duration: .25, onComplete: () => { place.textContent = s.dataset.place; gsap.fromTo(place, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5 }); } });
    } else { place.textContent = s.dataset.place; }
    clearTimeout(heroTimer); heroTimer = setTimeout(() => show(cur + 1), 6000);
  }
  bars.forEach((b, i) => b.addEventListener('click', () => show(i)));

  // ---------- Planner ----------
  const pState = { cats: new Set(['narava', 'kulinarika']), days: 1 };
  function animNum(el, to, fmt) {
    const from = parseFloat(el.dataset.v || 0);
    el.dataset.v = to;
    if (!hasGsap) { el.textContent = fmt(to); return; }
    const o = { v: from };
    gsap.to(o, { v: to, duration: .7, ease: 'power3.out', onUpdate: () => el.textContent = fmt(o.v) });
  }
  function updatePlanner() {
    const list = EXP.filter(e => pState.cats.has(e.c));
    const n = Math.round(list.length * (pState.days === 1 ? 1 : pState.days === 3 ? 1 : 1));
    const min = list.length ? Math.min(...list.map(e => e.p)) : 0;
    animNum($('#plannerCount'), n, v => Math.round(v));
    animNum($('#plannerFrom'), min, v => eur(v));
  }
  $$('#plannerChips .chip').forEach(c => c.addEventListener('click', () => {
    c.classList.toggle('is-on');
    c.classList.contains('is-on') ? pState.cats.add(c.dataset.cat) : pState.cats.delete(c.dataset.cat);
    updatePlanner();
  }));
  $$('#plannerDays button').forEach(b => b.addEventListener('click', () => {
    $$('#plannerDays button').forEach(x => x.classList.toggle('is-on', x === b));
    pState.days = +b.dataset.days; updatePlanner();
  }));
  $('#plannerGo').addEventListener('click', () => {
    const cats = [...pState.cats];
    if (cats.length === 1) setFilter(cats[0]);
  });
  updatePlanner();

  // ---------- Stats viz ----------
  const dots = $('#dots24');
  for (let i = 0; i < 24; i++) dots.appendChild(document.createElement('i'));

  // ---------- Regions ----------
  const rImg = $('#regionImg');
  function setRegion(i, first) {
    const r = REGIONS[i];
    $$('.region-row').forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-selected', k === i); });
    const apply = () => {
      $('#regionTitle').textContent = r.n;
      $('#regionDesc').textContent = r.d;
      $('#regionDest').innerHTML = r.dest.map(d => `<span>${d}</span>`).join('');
      $('#regionLink').firstChild.textContent = 'Top 5 doživetij regije ';
    };
    if (first || !hasGsap) { rImg.src = r.img; apply(); return; }
    const body = $('.region-body');
    gsap.to(body.children, { opacity: 0, y: 10, duration: .2, stagger: .02, onComplete: () => {
      apply();
      gsap.fromTo(body.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power3.out' });
    } });
    const next = new Image(); next.src = r.img;
    next.onload = () => {
      gsap.to(rImg, { opacity: 0, scale: 1.04, duration: .3, onComplete: () => { rImg.src = r.img; gsap.fromTo(rImg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: .9, ease: 'power3.out' }); } });
    };
  }
  $$('.region-row').forEach(b => b.addEventListener('click', () => setRegion(+b.dataset.region)));
  setRegion(0, true);

  // ---------- Experiences ----------
  const grid = $('#expGrid');
  const plan = new Map();
  let filter = 'all', sort = 'pop', expanded = false;
  const LIMIT = matchMedia('(max-width:1280px) and (min-width:681px)').matches ? 8 : 9;
  $$('[data-c]').forEach(s => { const k = s.dataset.c; s.textContent = k === 'all' ? EXP.length : EXP.filter(e => e.c === k).length; });

  function render() {
    let list = EXP.map((e, idx) => ({ ...e, idx })).filter(e => filter === 'all' || e.c === filter);
    if (sort === 'asc') list.sort((a, b) => a.p - b.p);
    const total = list.length;
    if (!expanded) list = list.slice(0, LIMIT);
    grid.innerHTML = list.map(e => `
      <article class="card">
        <div class="card-img"><img src="${I + e.i}" alt="" loading="lazy"><span class="card-tag">${CAT[e.c]}</span></div>
        <div class="card-body">
          <h3>${e.t}</h3>
          <p>${e.d}</p>
          <div class="card-foot">
            <div class="card-price"><span>Od</span><strong>${eur(e.p)}</strong></div>
            <button class="card-add ${plan.has(e.idx) ? 'added' : ''}" data-idx="${e.idx}" aria-label="Dodaj v načrt">+</button>
          </div>
        </div>
      </article>`).join('');
    $('#expMore').style.display = total > LIMIT ? '' : 'none';
    $('#expMore').textContent = expanded ? 'Prikaži manj' : `Prikaži vsa doživetja (${total})`;
    if (hasGsap && !reduce) gsap.from(grid.children, { opacity: 0, y: 24, duration: .6, stagger: .04, ease: 'power3.out', clearProps: 'all' });
  }
  function setFilter(f) {
    filter = f; expanded = false;
    $$('#expTabs button').forEach(b => b.classList.toggle('is-on', b.dataset.f === f));
    render();
  }
  $$('#expTabs button').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.f)));
  $$('#expSort button').forEach(b => b.addEventListener('click', () => {
    $$('#expSort button').forEach(x => x.classList.toggle('is-on', x === b));
    sort = b.dataset.s; render();
  }));
  $('#expMore').addEventListener('click', () => { expanded = !expanded; render(); if (hasGsap) ScrollTrigger.refresh(); });

  let people = 2;
  function renderReceipt() {
    const list = $('#rcList');
    const items = [...plan.keys()].map(i => ({ ...EXP[i], idx: i }));
    list.innerHTML = items.length ? items.map(e => `
      <li><img src="${I + e.i}" alt=""><span>${e.t.split(' – ')[0]}</span><span class="mono">${eur(e.p)}</span><button data-rm="${e.idx}">Odstrani</button></li>`).join('')
      : '<li class="receipt-empty">Dodajte doživetja s klikom na <b>+</b> in tu bo nastal vaš itinerar.</li>';
    const sub = items.reduce((s, e) => s + e.p, 0);
    $('#rcCount').textContent = `${items.length} ${items.length === 1 ? 'doživetje' : items.length === 2 ? 'doživetji' : items.length > 2 && items.length < 5 ? 'doživetja' : 'doživetij'}`;
    animNum($('#rcSub'), sub, eur);
    animNum($('#rcTotal'), sub * people, eur);
  }
  grid.addEventListener('click', e => {
    const b = e.target.closest('.card-add'); if (!b) return;
    const i = +b.dataset.idx;
    if (plan.has(i)) { plan.delete(i); b.classList.remove('added'); }
    else { plan.set(i, 1); b.classList.add('added'); say('Dodano v vaš načrt'); }
    renderReceipt();
  });
  $('#rcList').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]'); if (!b) return;
    plan.delete(+b.dataset.rm);
    const btn = grid.querySelector(`.card-add[data-idx="${b.dataset.rm}"]`); btn && btn.classList.remove('added');
    renderReceipt();
  });
  $('#pMinus').addEventListener('click', () => { people = Math.max(1, people - 1); $('#pCount').textContent = people; renderReceipt(); });
  $('#pPlus').addEventListener('click', () => { people = Math.min(12, people + 1); $('#pCount').textContent = people; renderReceipt(); });
  $('#rcSend').addEventListener('click', () => say(plan.size ? 'Načrt je pripravljen za pošiljanje' : 'Najprej dodajte vsaj eno doživetje'));
  // pre-fill with two so the receipt reads as a product
  plan.set(0, 1); plan.set(9, 1);
  render(); renderReceipt();

  // ---------- Arrival seg ----------
  const ARR = [
    'V in po Sloveniji z avtom: ceste, vinjete in nasveti za varno vožnjo.',
    'V Slovenijo z letalom: letališča in povezave do vseh kotičkov države.',
    'V Slovenijo z vlakom: udobno in trajnostno, z razgledi skozi okno.',
    'V Slovenijo z avtobusom: mednarodne in medkrajevne linije.'
  ];
  $$('#arriveSeg button').forEach(b => b.addEventListener('click', () => {
    $$('#arriveSeg button').forEach(x => x.classList.toggle('is-on', x === b));
    const p = $('#arriveText');
    if (hasGsap) gsap.fromTo(p, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .4 });
    p.textContent = ARR[+b.dataset.m];
  }));

  // ---------- Alma chat ----------
  const body = $('#chatBody');
  const ANS = {
    'Kam na martinovanje ta vikend?': { a: 'Martinovo je 11. novembra, praznovanja pa trajajo ves teden. Mlado vino boste krstili v vinskih kleteh Štajerske, Brd in Vipavske doline.', card: ['vinski_dogodki_s.jpg', 'Martinovanje v Sloveniji', 'Običaji in dogodki'] },
    'Jesenski dan z otroki v termah': { a: 'Terme so za družine zanimive tudi jeseni. Notranji vodni parki ponujajo tobogane in topel bazen ne glede na vreme.', card: ['catez_notranji_park_01.jpg', 'Jesenske družinske počitnice v termah', 'Termalna Panonska Slovenija'] },
    'Najboljša kulinarika v Ljubljani': { a: 'Ta mesec je v Ljubljani November Gourmet. Dan pa lahko začnete s pravim ljubljanskim zajtrkom na tržnici.', card: ['SUE_dobimo_se_na_plac_naslovnica.jpg', 'Dobimo se na plac\'', 'Od 50,00 €'] }
  };
  function msg(text, who, card) {
    const m = document.createElement('div');
    m.className = 'msg ' + who;
    m.textContent = text;
    if (card) m.insertAdjacentHTML('beforeend', `<div class="msg-card"><img src="${I + card[0]}" alt=""><div><strong>${card[1]}</strong><span>${card[2]}</span></div></div>`);
    body.appendChild(m); body.scrollTop = body.scrollHeight;
  }
  function ask(q) {
    msg(q, 'me');
    const t = document.createElement('div'); t.className = 'msg ai typing'; t.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(t); body.scrollTop = body.scrollHeight;
    const r = ANS[q] || { a: 'Odlično vprašanje. Na podlagi vaših želja predlagam, da začnete v Ljubljani in nato raziščete eno od štirih regij. Kaj vas najbolj veseli: narava, kulinarika ali terme?' };
    setTimeout(() => { t.remove(); msg(r.a, 'ai', r.card); }, 1100);
  }
  msg('Pozdravljeni, sem Alma. Kako vam lahko pomagam pri načrtovanju dneva v Sloveniji?', 'ai');
  $$('.alma-suggest .chip').forEach(c => c.addEventListener('click', () => ask(c.dataset.q)));
  $('#chatForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v) return; $('#chatIn').value = ''; ask(v); });

  // ---------- Press marquee (seamless loop at any width) ----------
  const track = $('#pressTrack'), group = $('.marquee-group', track), logos = group.innerHTML;
  function buildMarquee() {
    group.innerHTML = logos;
    $$('.marquee-group[aria-hidden]', track).forEach(g => g.remove());
    // one group must be at least as wide as the viewport, so the second copy never leaves a gap
    while (group.scrollWidth < innerWidth) group.insertAdjacentHTML('beforeend', logos);
    const copy = group.cloneNode(true); copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
    track.style.setProperty('--dur', Math.round(group.scrollWidth / 60) + 's'); // ~60px per second
  }
  let mqW = innerWidth;
  const mqImgs = $$('img', group);
  Promise.all(mqImgs.map(i => i.complete ? 0 : new Promise(r => i.addEventListener('load', r, { once: true })))).then(buildMarquee);
  addEventListener('resize', () => { if (Math.abs(innerWidth - mqW) > 80) { mqW = innerWidth; buildMarquee(); } });

  // ---------- Board flip ----------
  const CH = 'ABCČDEFGHIJKLMNOPRSŠTUVZŽ0123456789';
  function flip(el, delay) {
    const target = el.dataset.text; let frame = 0; const total = 18;
    setTimeout(() => {
      const iv = setInterval(() => {
        frame++;
        el.textContent = target.split('').map((ch, i) => {
          if (ch === ' ' || ch === '.' || ch === '-') return ch;
          return frame > (i / target.length) * total + 4 ? ch : CH[(Math.random() * CH.length) | 0];
        }).join('');
        if (frame > total + 6) { clearInterval(iv); el.textContent = target; }
      }, 40);
    }, delay);
  }
  const flips = $$('.flip');
  if (reduce) flips.forEach(f => f.textContent = f.dataset.text);

  // ---------- Intro + scroll animations ----------
  const loader = $('#loader');
  function start() {
    loader.classList.add('done');
    show(0);
    if (!hasGsap || reduce) {
      $$('[data-count]').forEach(n => n.textContent = n.dataset.count);
      flips.forEach(f => f.textContent = f.dataset.text);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.hero-title .line>span', { yPercent: 110, duration: 1.2, stagger: .09 })
      .from('.hero-side>*', { opacity: 0, y: 20, duration: .9, stagger: .08 }, '-=.9')
      .from('.hero-frame', { clipPath: 'inset(8% 6% 0% 6% round 28px)', duration: 1.4, ease: 'expo.out' }, '-=1')
      .from('.planner', { opacity: 0, y: 40, duration: 1 }, '-=.9');

    // hero frame parallax + widening
    gsap.to('#heroSlides', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero-media', start: 'top top', end: 'bottom top', scrub: true } });

    // headings
    $$('.sec-head').forEach(h => gsap.from(h.children, { opacity: 0, y: 40, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));

    // stats
    ScrollTrigger.create({ trigger: '.stats-row', start: 'top 80%', once: true, onEnter: () => {
      $$('[data-count]').forEach(n => { const o = { v: 0 }; gsap.to(o, { v: +n.dataset.count, duration: 2, ease: 'power2.out', onUpdate: () => n.textContent = Math.round(o.v) }); });
      $$('.viz-squares i').forEach((s, i) => setTimeout(() => s.classList.add('on'), 250 * i));
      $$('#dots24 i').forEach((s, i) => setTimeout(() => s.classList.add('on'), 60 * i));
      gsap.to('.viz-bars i', { scaleY: 1, duration: 1, stagger: .15, ease: 'power3.out' });
      gsap.to('.viz-line path', { strokeDashoffset: 0, duration: 2, ease: 'power2.out' });
      gsap.to('.viz-depth span', { scaleY: 1, duration: 2, ease: 'power2.out' });
    } });
    gsap.from('.stat', { opacity: 0, y: 30, duration: .9, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.stats-row', start: 'top 85%' } });

    // regions
    gsap.from('.region-row', { opacity: 0, x: -30, duration: .9, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.regions-wrap', start: 'top 80%' } });
    gsap.from('.region-card', { opacity: 0, y: 50, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.regions-wrap', start: 'top 80%' } });

    // bento with inner parallax
    gsap.from('.tile', { opacity: 0, y: 60, scale: .97, duration: 1.1, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: '.bento', start: 'top 80%' } });

    // receipt + board
    gsap.from('.receipt', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.exp-wrap', start: 'top 80%' } });
    ScrollTrigger.create({ trigger: '#board', start: 'top 75%', once: true, onEnter: () => flips.forEach((f, i) => flip(f, i * 70)) });
    gsap.from('.board-row', { opacity: 0, y: 20, duration: .7, stagger: .08, scrollTrigger: { trigger: '#board', start: 'top 80%' } });
    gsap.from('.events-strip img', { opacity: 0, y: 40, duration: 1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.events-strip', start: 'top 90%' } });

    // stories
    gsap.from('.story', { opacity: 0, y: 50, duration: 1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.stories-grid', start: 'top 80%' } });

    // film parallax
    gsap.to('.film-media img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.film', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.film-body>*', { opacity: 0, y: 30, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.film', start: 'top 70%' } });

    // alma
    gsap.from('.alma-portrait', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.alma-app', start: 'top 80%' } });
    gsap.from('.chat', { opacity: 0, y: 60, scale: .96, duration: 1.1, delay: .15, ease: 'power3.out', scrollTrigger: { trigger: '.alma-app', start: 'top 80%' } });
    gsap.from('.alma-copy>*', { opacity: 0, y: 30, duration: 1, stagger: .1, scrollTrigger: { trigger: '.alma', start: 'top 80%' } });
    ScrollTrigger.create({ trigger: '.alma-app', start: 'top 60%', once: true, onEnter: () => setTimeout(() => body.children.length < 2 && ask('Kam na martinovanje ta vikend?'), 900) });

    // practical
    gsap.from('.prac', { opacity: 0, y: 40, duration: .9, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: '.prac-grid', start: 'top 85%' } });

    // footer word
    gsap.from('.foot-word', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '.foot-word', start: 'top 95%' } });
  }

  const bar = $('.loader-bar span');
  requestAnimationFrame(() => bar.style.width = '100%');
  const ready = Promise.all([document.fonts ? document.fonts.ready : 0, new Promise(r => slides[0].complete ? r() : slides[0].addEventListener('load', r, { once: true })), new Promise(r => setTimeout(r, 900))]);
  Promise.race([ready, new Promise(r => setTimeout(r, 3500))]).then(start);
})();
