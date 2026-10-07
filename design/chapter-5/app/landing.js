// Landing Page (static site): desktop 1440 px and mobile 390 px.
(() => {
  const { icon, logo, cartMark } = IC;

  const heroArt = (w) => `
  <div class="img" style="width:${w}px;height:${Math.round(w * 0.78)}px;border-radius:24px;background:rgba(255,255,255,.08);position:relative">
    <svg viewBox="0 0 400 310" width="${w - 20}" fill="none">
      <path d="M30 60h50l40 160h190l40-120H100" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="150" y="70" width="150" height="100" rx="12" fill="#fff"/>
      <rect x="162" y="82" width="70" height="10" rx="5" fill="#004F8C"/>
      <rect x="162" y="100" width="50" height="22" rx="4" fill="#009E60"/>
      <rect x="244" y="82" width="44" height="44" rx="4" fill="#102A43"/>
      <rect x="250" y="88" width="12" height="12" fill="#fff"/><rect x="270" y="88" width="12" height="12" fill="#fff"/><rect x="250" y="108" width="12" height="12" fill="#fff"/>
      <rect x="162" y="134" width="126" height="10" rx="5" fill="#D9E2EC"/><rect x="162" y="134" width="88" height="10" rx="5" fill="#F39C12"/>
      <circle cx="140" cy="262" r="20" fill="#fff"/><circle cx="290" cy="262" r="20" fill="#fff"/>
      <path d="M0 140 L120 110 L120 170 Z" fill="#7EE2B8" opacity=".35"/>
    </svg>
  </div>`;

  const steps = [
    ['qr_code_scanner', 'Pair your cart', 'Tap “Start” on the cart screen or scan its code with the app.'],
    ['savings', 'Set a budget', 'Choose a spending limit. We warn you at 90% of it.'],
    ['sensors', 'Just drop items in', 'RFID and the weight sensor add every product automatically.'],
    ['qr_code_2', 'Pay with Yape or Plin', 'Scan the dynamic QR and walk out with your digital receipt.'],
  ];
  const shopperBenefits = [
    ['timer', 'No checkout lines', 'Save 15–20 minutes per visit.'],
    ['account_balance_wallet', 'Live budget control', 'See your running total after every item.'],
    ['receipt_long', 'Digital receipts', 'Every purchase saved in the app.'],
  ];
  const storeBenefits = [
    ['monitoring', 'Live fleet console', 'Every active cart, its status and alerts in one view.'],
    ['scale', 'Weight + RFID cross-check', 'Stops unscanned items before payment.'],
    ['fence', 'Geofence exit lock', 'Carts without a paid receipt cannot leave.'],
  ];
  const hardware = [
    ['nfc', 'UHF RFID reader', 'Multi-tag reading inside the basket.'],
    ['scale', 'Load cells', 'Gram-level weight confirmation.'],
    ['tablet', '10" on-cart display', 'Touch screen with live total and QR.'],
    ['lock', 'Smart wheel lock', 'Engages at the exit without clearance.'],
  ];
  const faq = [
    ['Do I need the app to shop?', 'No. The on-cart display covers the whole journey. The app adds history and receipts.'],
    ['Which payment methods are supported?', 'Yape, Plin and any banking app that reads interoperable QR codes.'],
    ['What happens if an item is not read?', 'The cart asks you to place it again; a supervisor helps if needed.'],
  ];

  const feature = ([ic, t, d], dir = 'col') => `
    <div class="${dir}" style="gap:10px;${dir === 'row' ? 'align-items:flex-start' : ''}">
      <div style="width:48px;height:48px;border-radius:14px;background:var(--primary-container);color:var(--primary);display:flex;align-items:center;justify-content:center;flex:none">${icon(ic, 26)}</div>
      <div><h4>${t}</h4><p class="muted" style="font-size:15px;margin-top:4px">${d}</p></div>
    </div>`;

  const field = (label, value, opts = {}) => `
    <div class="field" style="${opts.span ? 'grid-column:1/-1' : ''}"><label>${label}${opts.req ? ' *' : ''}</label>
      <div class="input" style="${opts.h ? `height:${opts.h}px;align-items:flex-start;padding-top:12px` : ''}">${value ? value : `<span class="ph">${opts.ph || ''}</span>`}</div></div>`;

  const footer = (mobile) => `
  <footer style="background:var(--ink);color:#BCCCDC;padding:${mobile ? '40px 20px' : '56px 120px'}">
    <div style="display:${mobile ? 'flex;flex-direction:column;gap:28px' : 'grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px'}">
      <div class="col" style="gap:14px">${IC.logo(18, true)}<p style="font-size:14px;max-width:300px">Smart shopping, instant payment. IoT carts for modern supermarkets in Peru.</p></div>
      <div class="col" style="font-size:14px"><b style="color:#fff">Product</b><span>How it works</span><span>For supermarkets</span><span>Product video</span></div>
      <div class="col" style="font-size:14px"><b style="color:#fff">Company</b><span>About the team</span><span>Contact</span><span>Team video</span></div>
      <div class="col" style="font-size:14px"><b style="color:#fff">Legal</b><span data-go="lp-terms">Terms &amp; Conditions</span><span>Privacy Policy</span><span>Cookie settings</span></div>
    </div>
    <div class="divider" style="background:#334E68;margin:28px 0 18px"></div>
    <div class="row" style="font-size:13px;${mobile ? 'flex-direction:column;align-items:flex-start;gap:12px' : ''}">
      <span>© 2026 Innova Carty Tech S.A.C. · Lima, Peru</span><span class="spacer"></span>
      <span class="row" style="gap:14px">${icon('language')} English ▾ ${icon('mail')} ${icon('share')}</span>
    </div>
  </footer>`;

  const desktop = () => `
  <div class="screen" style="width:1440px;background:var(--surface)">
    <header class="row" style="height:72px;padding:0 120px;background:var(--surface);border-bottom:1px solid var(--line);gap:32px;position:relative">
      ${logo(18)}
      <span class="spacer"></span>
      <nav class="row" style="gap:28px;font-weight:500;font-size:15px;color:var(--ink-2)">
        <span style="color:var(--primary)">How it works</span><span>Benefits</span><span>For supermarkets</span><span>Product</span><span>FAQ</span>
      </nav>
      <span class="row" style="gap:4px;color:var(--ink-2);font-size:14px">${icon('language', 20)} EN | ES</span>
      <button class="btn cta sm" data-go="lp-contact">Request a demo</button>
    </header>

    <section class="hero row" style="background:var(--hero);color:#fff;padding:72px 120px;gap:64px">
      <div class="col" style="gap:22px;flex:1">
        <span class="chip" style="background:rgba(255,255,255,.15);color:#fff;align-self:flex-start">${icon('bolt', 16)} IoT smart carts for supermarkets</span>
        <h1 style="color:#fff;font-size:52px;line-height:1.08">Shop smart.<br>Pay instantly.<br>Skip the line.</h1>
        <p style="font-size:19px;opacity:.9;max-width:520px">Innova Carty reads every product you drop in the cart, keeps your budget in check in real time and lets you pay with a QR code, right from the cart.</p>
        <div class="row" style="gap:14px;margin-top:8px">
          <button class="btn lg on-dark" data-go="ma-login">${icon('smartphone')} Get the app</button>
          <button class="btn lg" style="border:1.5px solid rgba(255,255,255,.6);color:#fff;background:transparent" data-go="lp-contact">${icon('storefront')} I run a supermarket</button>
        </div>
        <p style="font-size:13px;opacity:.75">Shoppers download the app · Supermarkets book a pilot</p>
      </div>
      ${heroArt(520)}
    </section>

    <section class="row" style="padding:28px 120px;gap:0;background:var(--surface);border-bottom:1px solid var(--line)">
      ${[['−30%', 'checkout waiting time'], ['< 60 s', 'from QR to exit clearance'], ['−50%', 'unverified exits'], ['24/7', 'fleet telemetry']].map(([n, l], i) => `
        <div class="col" style="flex:1;gap:2px;text-align:center;${i ? 'border-left:1px solid var(--line)' : ''}"><span class="num" style="font-size:30px;font-weight:700;color:var(--primary)">${n}</span><span class="muted" style="font-size:14px">${l}</span></div>`).join('')}
    </section>

    <section style="padding:80px 120px;background:var(--surface-2)">
      <div class="col" style="align-items:center;text-align:center;gap:10px;margin-bottom:44px"><span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">HOW IT WORKS</span><h2 style="font-size:36px">Four steps, zero queues</h2></div>
      <div class="grid" style="grid-template-columns:repeat(4,1fr);gap:24px">
        ${steps.map((s, i) => `<div class="card" style="padding:28px">
          <div class="row" style="justify-content:space-between;margin-bottom:18px"><div style="width:52px;height:52px;border-radius:16px;background:var(--secondary-container);color:var(--secondary);display:flex;align-items:center;justify-content:center">${icon(s[0], 28)}</div><span class="num" style="font-size:40px;font-weight:700;color:var(--line)">0${i + 1}</span></div>
          <h3 style="font-weight:600">${s[1]}</h3><p class="muted" style="margin-top:8px;font-size:15px">${s[2]}</p></div>`).join('')}
      </div>
    </section>

    <section style="padding:80px 120px;background:var(--surface)">
      <div class="col" style="align-items:center;text-align:center;gap:10px;margin-bottom:44px"><span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">BENEFITS</span><h2 style="font-size:36px">Built for both sides of the cart</h2></div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:32px">
        <div class="card" style="padding:36px"><div class="row" style="margin-bottom:24px"><span class="chip info">${icon('person', 16)} For shoppers</span></div><div class="col" style="gap:22px">${shopperBenefits.map((b) => feature(b, 'row')).join('')}</div>
          <button class="btn filled" style="margin-top:28px" data-go="ma-login">${icon('download')} Download the app</button></div>
        <div class="card" style="padding:36px"><div class="row" style="margin-bottom:24px"><span class="chip ok">${icon('storefront', 16)} For store operators</span></div><div class="col" style="gap:22px">${storeBenefits.map((b) => feature(b, 'row')).join('')}</div>
          <button class="btn cta" style="margin-top:28px" data-go="wa-login">${icon('dashboard')} See the operations console</button></div>
      </div>
    </section>

    <section class="row" style="padding:80px 120px;background:var(--surface-2);gap:64px">
      <div class="img" style="width:600px;height:360px;flex:none;position:relative;background:linear-gradient(135deg,#00396A,#004F8C)">
        <div style="width:84px;height:84px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--primary)">${icon('play_arrow', 52)}</div>
        <span style="position:absolute;bottom:16px;left:20px;color:#fff;font-size:14px">Video About-the-Product · 2:30</span>
      </div>
      <div class="col" style="gap:16px"><span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">THE SMART CART</span><h2 style="font-size:36px">Hardware that checks itself</h2>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:22px;margin-top:10px">${hardware.map((h) => feature(h)).join('')}</div></div>
    </section>

    <section class="row" style="padding:80px 120px;background:var(--surface);gap:64px;align-items:flex-start" id="contact">
      <div class="col" style="gap:16px;width:420px;flex:none">
        <span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">FOR SUPERMARKETS</span>
        <h2 style="font-size:36px">Book a pilot in your store</h2>
        <p class="muted">Tell us about your store and we will set up a demo with 5 smart carts and the operations console.</p>
        <div class="col" style="gap:14px;margin-top:12px">${faq.map(([q, a]) => `<div class="card" style="padding:16px 18px"><div class="row"><h4 style="flex:1">${q}</h4>${icon('expand_more')}</div><p class="muted" style="font-size:14px;margin-top:6px">${a}</p></div>`).join('')}</div>
      </div>
      <div class="card" style="flex:1;padding:36px">
        <h3 style="font-weight:600;margin-bottom:20px">Request a demo</h3>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:18px">
          ${field('Company name', '', { req: 1, ph: 'Retail company S.A.C.' })}
          ${field('RUC', '', { req: 1, ph: '11 digits' })}
          ${field('Corporate email', '', { req: 1, ph: 'name@company.pe' })}
          ${field('Estimated number of carts', '', { req: 1, ph: 'e.g. 40' })}
          ${field('Message', '', { span: 1, h: 96, ph: 'Store location, opening hours, questions…' })}
        </div>
        <label class="row" style="margin-top:16px;font-size:14px;color:var(--ink-2)"><span style="width:20px;height:20px;border:2px solid var(--line);border-radius:4px"></span>I accept the <u style="color:var(--primary)">Privacy Policy</u></label>
        <button class="btn cta lg" style="margin-top:22px" data-act="submit-demo">${icon('send')} Request a demo</button>
      </div>
    </section>
    ${footer(false)}
  </div>`;

  const mobile = () => `
  <div class="screen" style="width:390px;background:var(--surface)">
    <header class="row" style="height:60px;padding:0 16px;border-bottom:1px solid var(--line);background:var(--surface)">
      ${logo(14)}<span class="spacer"></span><span class="caption">EN</span>${icon('menu', 28)}
    </header>
    <section class="hero col" style="background:var(--hero);color:#fff;padding:36px 20px;gap:16px">
      <span class="chip" style="background:rgba(255,255,255,.15);color:#fff;align-self:flex-start">${icon('bolt', 16)} IoT smart carts</span>
      <h1 style="color:#fff;font-size:34px;line-height:1.1">Shop smart. Pay instantly. Skip the line.</h1>
      <p style="opacity:.9">Every product read automatically, your budget live on the cart, and checkout with a QR code.</p>
      <button class="btn lg on-dark block" data-go="ma-login">${icon('smartphone')} Get the app</button>
      <button class="btn lg block" style="border:1.5px solid rgba(255,255,255,.6);color:#fff;background:transparent" data-go="lp-contact">${icon('storefront')} I run a supermarket</button>
      ${heroArt(350)}
    </section>
    <section class="grid" style="grid-template-columns:1fr 1fr;padding:20px 16px;gap:12px;border-bottom:1px solid var(--line)">
      ${[['−30%', 'waiting time'], ['< 60 s', 'QR to exit'], ['−50%', 'unverified exits'], ['24/7', 'telemetry']].map(([n, l]) => `<div class="col" style="gap:0;text-align:center"><span class="num" style="font-size:24px;font-weight:700;color:var(--primary)">${n}</span><span class="caption">${l}</span></div>`).join('')}
    </section>
    <section style="padding:40px 16px;background:var(--surface-2)">
      <span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">HOW IT WORKS</span><h2 style="margin:6px 0 20px">Four steps, zero queues</h2>
      <div class="col" style="gap:12px">${steps.map((s, i) => `<div class="card row" style="padding:16px;gap:14px;align-items:flex-start"><div style="width:44px;height:44px;border-radius:12px;background:var(--secondary-container);color:var(--secondary);display:flex;align-items:center;justify-content:center;flex:none">${icon(s[0], 24)}</div><div><h4>${i + 1}. ${s[1]}</h4><p class="muted" style="font-size:14px;margin-top:2px">${s[2]}</p></div></div>`).join('')}</div>
    </section>
    <section style="padding:40px 16px">
      <span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">BENEFITS</span><h2 style="margin:6px 0 16px">Built for both sides of the cart</h2>
      <div class="row" style="background:var(--surface-2);border-radius:24px;padding:4px;margin-bottom:20px"><span class="btn sm filled" style="flex:1">For shoppers</span><span class="btn sm text" style="flex:1">For stores</span></div>
      <div class="col" style="gap:18px">${shopperBenefits.map((b) => feature(b, 'row')).join('')}</div>
    </section>
    <section style="padding:0 16px 40px">
      <div class="img" style="height:200px;background:linear-gradient(135deg,#00396A,#004F8C)"><div style="width:64px;height:64px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--primary)">${icon('play_arrow', 40)}</div></div>
      <p class="caption" style="margin-top:8px">Video About-the-Product · 2:30</p>
    </section>
    <section style="padding:40px 16px;background:var(--surface-2)">
      <span class="caption" style="color:var(--secondary);font-weight:600;letter-spacing:1.5px">FOR SUPERMARKETS</span><h2 style="margin:6px 0 16px">Book a pilot in your store</h2>
      <div class="card col" style="padding:20px;gap:14px">
        ${field('Company name', '', { req: 1, ph: 'Retail company S.A.C.' })}
        ${field('RUC', '', { req: 1, ph: '11 digits' })}
        ${field('Corporate email', '', { req: 1, ph: 'name@company.pe' })}
        ${field('Estimated number of carts', '', { req: 1, ph: 'e.g. 40' })}
        <button class="btn cta lg block" data-act="submit-demo">${icon('send')} Request a demo</button>
      </div>
    </section>
    ${footer(true)}
  </div>`;

  IC.register('lp-desktop', { app: 'Landing Page', title: 'Landing Page · Desktop', w: 1440, render: desktop });
  IC.register('lp-mobile', { app: 'Landing Page', title: 'Landing Page · Mobile', w: 390, render: mobile });
})();
