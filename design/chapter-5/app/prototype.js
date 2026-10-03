// Clickable prototype: hash routing between registered screens plus a sensor simulator for the cart.
(() => {
  const $ = (id) => document.getElementById(id);
  $('brand').innerHTML = IC.logo(15);

  const SIM = {
    'On-Cart Display': [
      ['Shopper taps “Start”', 'cd-budget'],
      ['RFID reads a product', 'cd-session'],
      ['Shopper removes a product', 'cd-removed'],
      ['Damaged / unknown RFID tag', 'cd-unknown'],
      ['Weight added without tag', 'cd-discrepancy'],
      ['Total reaches 90% of budget', 'cd-threshold'],
      ['Wallet confirms payment (webhook)', 'cd-paid'],
    ],
    'Web Console': [
      ['Edge reports weight discrepancy', 'wa-cart-detail'],
      ['Geofence breach at Exit B', 'wa-alerts'],
    ],
    'Mobile App': [
      ['Cart display shows pairing QR', 'ma-pair'],
      ['Wallet confirms payment', 'ma-receipt'],
    ],
  };
  const ACTIONS = {
    'submit-demo': () => toast('Thanks! Our team will contact you within 24 hours.'),
    help: () => toast('A supervisor is on the way to ' + IC.CART + '.'),
    unlock: () => { go('wa-carts'); toast(IC.CART + ' unlocked · resolution saved to the audit log'); },
    'save-sku': () => { go('wa-catalog'); toast('Saved · rule synced to 40 carts'); },
  };

  let wf = false;
  const toast = (msg) => {
    const t = $('ptoast'); t.textContent = msg; t.style.display = 'flex';
    clearTimeout(toast.h); toast.h = setTimeout(() => (t.style.display = 'none'), 2600);
  };

  function fit(def) {
    const dev = $('device'), scr = $('screen');
    const kind = def.app === 'Mobile App' ? 'phone' : def.app === 'On-Cart Display' ? 'cart' : '';
    dev.className = 'device ' + kind;
    const availW = window.innerWidth - (SIM[def.app] ? 330 : 60);
    const availH = window.innerHeight - 110;
    const h = def.h || availH;
    const scale = Math.min(1, availW / def.w, def.h ? availH / def.h : 1);
    scr.style.transform = `scale(${scale})`;
    scr.style.width = def.w + 'px';
    dev.style.width = def.w * scale + (kind === 'phone' ? 20 : kind === 'cart' ? 28 : 0) + 'px';
    dev.style.height = (def.h ? def.h * scale : availH) + (kind === 'phone' ? 20 : kind === 'cart' ? 28 : 0) + 'px';
    $('vp').scrollTop = 0;
  }

  function render(id) {
    const def = IC.SCREENS[id] || IC.SCREENS['lp-desktop'];
    document.body.classList.toggle('wf', wf);
    $('screen').innerHTML = def.render();
    $('where').textContent = `${def.app} › ${def.title}`;
    document.querySelectorAll('.tab[data-start]').forEach((b) => b.classList.toggle('on', IC.SCREENS[b.dataset.start].app === def.app && (def.app !== 'Landing Page' || b.dataset.start === id)));
    const sim = SIM[def.app];
    $('sim').style.display = sim ? 'flex' : 'none';
    $('sim').innerHTML = sim ? `<h4>Simulate an event</h4><p class="caption">Physical or external events that the real device or service would send.</p>` +
      sim.map(([l, to]) => `<button class="btn outlined" data-go="${to}">${IC.icon('bolt', 18)} ${l}</button>`).join('') : '';
    fit(def);
  }

  function go(id) {
    if (id === 'lp-contact') { // anchor inside the landing page
      const v = $('vp'), c = $('screen').querySelector('#contact');
      if (c) { v.scrollTo({ top: c.offsetTop * ($('screen').getBoundingClientRect().width / IC.SCREENS[current()].w), behavior: 'smooth' }); return; }
      id = 'lp-desktop';
    }
    if (id === 'lp-terms') return toast('Opens the Terms & Conditions page');
    location.hash = id;
  }
  const current = () => location.hash.slice(1) || 'lp-desktop';

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-go],[data-act],[data-start]');
    if (!t) return;
    if (t.dataset.start) return go(t.dataset.start);
    if (t.dataset.act) return ACTIONS[t.dataset.act] && ACTIONS[t.dataset.act]();
    // Landing CTAs in the mobile landing go to the mobile contact form.
    if (t.dataset.go === 'lp-contact' && current() === 'lp-mobile') {
      const c = $('screen').querySelectorAll('section'); const last = c[c.length - 1];
      return $('vp').scrollTo({ top: last.offsetTop * ($('screen').getBoundingClientRect().width / 390), behavior: 'smooth' });
    }
    go(t.dataset.go);
  });
  $('mode').onclick = () => { wf = !wf; $('mode').textContent = wf ? 'Show mock-up' : 'Show wireframe'; render(current()); };
  window.addEventListener('hashchange', () => render(current()));
  window.addEventListener('resize', () => render(current()));
  window.IC_GO = go;
  render(current());
  document.fonts.load('24px "Material Symbols Rounded"', 'home').then(() => render(current()));
})();
