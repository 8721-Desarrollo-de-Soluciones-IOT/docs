// Mobile Application "Innova Carty" for shoppers (390 x 844).
(() => {
  const { icon, logo, money, qr } = IC;
  const W = 390, H = 844;

  const statusBar = (dark) => `<div class="row" style="height:44px;padding:0 24px;font:600 14px var(--font-title);${dark ? 'color:#fff' : ''}"><span>9:41</span><span class="spacer"></span>${icon('signal_cellular_alt', 18)}${icon('wifi', 18)}${icon('battery_full', 18)}</div>`;

  const appBar = (title, back) => `<div class="row" style="height:56px;padding:0 8px 0 ${back ? 4 : 20}px;gap:4px">
    ${back ? `<button class="btn text" data-go="${back}" style="padding:0 8px">${icon('arrow_back')}</button>` : ''}<h3 style="font-weight:600;flex:1">${title}</h3>${icon('notifications', 24)}<span style="width:12px"></span></div>`;

  const nav = (active) => `<div class="row" style="position:absolute;bottom:0;left:0;right:0;height:80px;background:var(--surface);border-top:1px solid var(--line);padding:0 8px 14px;justify-content:space-around">
    ${[['home', 'Home', 'ma-home'], ['shopping_cart', 'Cart', 'ma-cart'], ['receipt_long', 'Receipts', 'ma-history'], ['person', 'Profile', 'ma-home']].map(([ic, l, go]) => `
      <div class="col" data-go="${go}" style="align-items:center;gap:2px;width:72px;font-size:12px;font-weight:500;color:${l === active ? 'var(--primary)' : 'var(--ink-2)'}">
        <span style="width:56px;height:30px;border-radius:15px;display:flex;align-items:center;justify-content:center;${l === active ? 'background:var(--primary-container)' : ''}">${icon(ic, 22)}</span>${l}</div>`).join('')}
  </div>`;

  const frame = (body, { dark = false, bg = 'var(--surface-2)' } = {}) =>
    `<div class="screen" style="width:${W}px;height:${H}px;background:${bg}">${statusBar(dark)}${body}</div>`;

  IC.register('ma-login', {
    app: 'Mobile App', title: 'Sign in', w: W, h: H,
    render: () => frame(`
    <div class="col" style="padding:40px 24px;gap:18px;background:var(--surface);height:800px">
      ${logo(20)}
      <h1 style="margin-top:24px">Welcome back</h1><p class="muted">Sign in to link carts, track your budget and keep your receipts.</p>
      <div class="field"><label>Email</label><div class="input focus">camila.rojas@mail.com</div></div>
      <div class="field"><label>Password</label><div class="input">•••••••••• <span class="spacer"></span>${icon('visibility')}</div></div>
      <span style="color:var(--primary);font-size:14px;font-weight:500;align-self:flex-end">Forgot password?</span>
      <button class="btn filled lg block" data-go="ma-home">Sign in</button>
      <div class="row caption" style="gap:12px"><span class="divider" style="flex:1"></span>or<span class="divider" style="flex:1"></span></div>
      <button class="btn outlined lg block">${icon('account_circle')} Continue with Google</button>
      <span class="spacer"></span>
      <p style="text-align:center;font-size:14px">New here? <b style="color:var(--primary)">Create an account</b></p>
    </div>`, { bg: 'var(--surface)' }),
  });

  IC.register('ma-home', {
    app: 'Mobile App', title: 'Home', w: W, h: H,
    render: () => frame(`
    <div class="row" style="padding:12px 20px;gap:12px"><div class="avatar">JL</div><div class="col" style="gap:0;flex:1"><span class="caption">Good morning</span><h3 style="font-weight:600">Juan</h3></div>${icon('notifications', 26)}</div>
    <div style="padding:8px 16px" class="col">
      <div class="card hero col" style="padding:20px;gap:10px;background:var(--hero);border:0;color:#fff">
        <span style="font-size:14px;opacity:.85">${icon('storefront', 18)} You're at ${IC.STORE}</span>
        <h2 style="color:#fff">Start a cart session</h2>
        <p style="font-size:14px;opacity:.9">Scan the code shown on the cart screen to see your items and total here.</p>
        <button class="btn on-dark lg" style="align-self:flex-start" data-go="ma-pair">${icon('qr_code_scanner')} Link a cart</button>
      </div>
      <div class="card row" style="padding:16px;gap:14px;margin-top:6px"><div style="width:44px;height:44px;border-radius:12px;background:var(--secondary-container);color:var(--secondary);display:flex;align-items:center;justify-content:center">${icon('savings', 24)}</div>
        <div class="col" style="gap:0;flex:1"><b>Default budget</b><span class="caption">Applied to every new session</span></div><span class="num" style="font-weight:600">S/ 150.00</span>${icon('chevron_right')}</div>
      <div class="row" style="margin:14px 4px 0"><h4 style="flex:1">Recent receipts</h4><span style="color:var(--primary);font-size:14px;font-weight:500" data-go="ma-history">See all</span></div>
      ${[['Sep 27', 'Surco Store #01', 12, 98.4], ['Sep 20', 'Surco Store #01', 8, 64.1], ['Sep 13', 'San Borja Store #02', 15, 131.75]].map(([d, st, n, t]) => `
        <div class="card row" style="padding:14px 16px;gap:12px">${icon('receipt_long', 24)}<div class="col" style="gap:0;flex:1"><b style="font-size:15px">${st}</b><span class="caption">${d} · ${n} items</span></div><span class="num" style="font-weight:600">${money(t)}</span></div>`).join('')}
    </div>
    ${nav('Home')}`),
  });

  IC.register('ma-pair', {
    app: 'Mobile App', title: 'Link a cart', w: W, h: H,
    render: () => frame(`
    <div class="img" style="position:absolute;inset:0;border-radius:0;background:linear-gradient(180deg,#1F2933,#323F4B)"></div>
    <div style="position:relative" class="col">
      <div class="row" style="height:56px;padding:0 8px;color:#fff"><button class="btn text" style="color:#fff" data-go="ma-home">${icon('close')}</button><h3 style="color:#fff;flex:1;font-weight:600">Link a cart</h3>${icon('flash_on')}<span style="width:12px"></span></div>
      <p style="color:#fff;text-align:center;padding:24px 40px 0">Point your camera at the code on the cart screen</p>
      <div style="margin:36px auto 0;width:260px;height:260px;border-radius:24px;border:4px solid #7EE2B8;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06)">${qr(180, 3)}</div>
      <div class="row" style="justify-content:center;margin-top:18px"><span class="chip ok">${icon('check_circle', 16)} ${IC.CART} detected</span></div>
    </div>
    <div class="card col" style="position:absolute;left:16px;right:16px;bottom:24px;padding:18px;gap:12px">
      <b>Can't scan?</b><div class="input"><span class="ph">Enter the 4-digit cart code</span></div>
      <button class="btn filled lg block" data-go="ma-budget">Link ${IC.CART}</button>
    </div>`, { dark: true, bg: '#1F2933' }),
  });

  IC.register('ma-budget', {
    app: 'Mobile App', title: 'Set budget', w: W, h: H,
    render: () => frame(`
    ${appBar('Session budget', 'ma-pair')}
    <div class="col" style="padding:8px 20px;gap:16px">
      <span class="chip ok" style="align-self:flex-start">${icon('link', 16)} Linked to ${IC.CART}</span>
      <h2>How much do you want to spend?</h2>
      <p class="muted" style="font-size:15px">We'll alert you on your phone and on the cart when you reach 90%.</p>
      <div class="input focus" style="height:72px;font:700 36px var(--font-title);color:var(--primary)">S/ 150.00</div>
      <div class="row" style="flex-wrap:wrap;gap:8px">${['50', '100', '150', '200', '300'].map((v) => `<span class="chip ${v === '150' ? 'info' : 'off'}" style="height:36px;padding:0 16px;font-size:14px;border-radius:18px">S/ ${v}</span>`).join('')}</div>
      <label class="row" style="font-size:14px"><span style="width:40px;height:24px;border-radius:12px;background:var(--primary);position:relative;display:inline-block"><span style="position:absolute;right:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff"></span></span> Save as my default budget</label>
    </div>
    <div class="col" style="position:absolute;left:20px;right:20px;bottom:28px;gap:10px">
      <button class="btn cta lg block" data-go="ma-cart">${icon('shopping_cart')} Start shopping</button>
      <button class="btn text block" data-go="ma-cart">Skip, no limit</button>
    </div>`),
  });

  IC.register('ma-cart', {
    app: 'Mobile App', title: 'Active cart', w: W, h: H,
    render: () => {
      const s = IC.session(5);
      return frame(`
      ${appBar('Your cart')}
      <div class="col" style="padding:0 16px;gap:10px">
        <div class="card col" style="padding:18px;gap:10px">
          <div class="row"><span class="chip ok">${icon('sensors', 16)} ${IC.CART} · live</span><span class="spacer"></span><span class="caption">${s.count} items</span></div>
          <span class="caption" style="font-weight:600;letter-spacing:1px">REAL-TIME TOTAL</span>
          <span class="num" style="font-size:36px;font-weight:700;color:var(--primary)">${money(s.total)}</span>
          <div class="progress"><i style="width:${s.pct}%"></i></div>
          <div class="row caption"><span>${s.pct}% of ${money(s.budget)}</span><span class="spacer"></span><span>${money(s.budget - s.total)} left</span></div>
        </div>
        <div class="card" style="overflow:hidden">
          ${s.items.slice().reverse().map((it) => `<div class="row" style="padding:11px 14px;gap:12px;border-bottom:1px solid var(--line)"><span style="color:var(--primary)">${icon(it.icon, 22)}</span><div class="col" style="gap:0;flex:1"><span style="font-size:14px;font-weight:500">${it.name}</span><span class="caption">x${it.qty} · ${money(it.price)}</span></div><span class="num" style="font-size:14px;font-weight:600">${money(it.price * it.qty)}</span></div>`).join('')}
        </div>
      </div>
      <div style="position:absolute;left:16px;right:16px;bottom:96px"><button class="btn cta lg block" data-go="ma-pay">${icon('qr_code_2')} Pay ${money(s.total)}</button></div>
      ${nav('Cart')}`);
    },
  });

  IC.register('ma-pay', {
    app: 'Mobile App', title: 'Payment', w: W, h: H,
    render: () => {
      const s = IC.session(5);
      return frame(`
      ${appBar('Checkout', 'ma-cart')}
      <div class="col" style="padding:4px 20px;gap:14px">
        <div class="card col" style="padding:18px;gap:6px;align-items:center;text-align:center"><span class="caption">${IC.ORDER}</span><span class="num" style="font-size:40px;font-weight:700;color:var(--primary)">${money(s.total)}</span><span class="caption">${s.count} items · ${IC.CART}</span></div>
        <h4>Choose how to pay</h4>
        ${[['Yape', 'Opens Yape with the amount filled in', true], ['Plin', 'Opens your bank app with Plin'], ['Show QR on the cart', 'Scan it from any wallet']].map(([t, d, sel]) => `
          <div class="card row" style="padding:16px;gap:14px;${sel ? 'border:2px solid var(--primary)' : ''}"><span style="width:22px;height:22px;border-radius:50%;border:2px solid ${sel ? 'var(--primary)' : 'var(--line)'};display:flex;align-items:center;justify-content:center">${sel ? '<span style="width:10px;height:10px;border-radius:50%;background:var(--primary)"></span>' : ''}</span><div class="col" style="gap:0;flex:1"><b>${t}</b><span class="caption">${d}</span></div>${icon('chevron_right')}</div>`).join('')}
        <div class="row caption" style="gap:8px">${icon('lock', 18)} Payments are confirmed by the wallet provider. We never store your card or wallet data.</div>
      </div>
      <div style="position:absolute;left:20px;right:20px;bottom:28px"><button class="btn cta lg block" data-go="ma-receipt">Pay with Yape</button></div>`);
    },
  });

  IC.register('ma-receipt', {
    app: 'Mobile App', title: 'Receipt and exit pass', w: W, h: H,
    render: () => {
      const s = IC.session(5);
      return frame(`
      ${appBar('Receipt', 'ma-home')}
      <div class="col" style="padding:0 20px;gap:12px;align-items:center;text-align:center">
        <div style="width:72px;height:72px;border-radius:50%;background:var(--success);color:#fff;display:flex;align-items:center;justify-content:center">${icon('check', 46)}</div>
        <h2>Payment confirmed</h2>
        <span class="chip ok" style="height:32px;font-size:14px">${icon('verified', 18)} Exit clearance active · 15 min</span>
        <div class="card col" style="padding:18px;gap:8px;width:100%;text-align:left">
          <div class="row"><b style="flex:1">Electronic receipt</b><span class="caption">B001-004213</span></div>
          ${s.items.map((it) => `<div class="row caption" style="font-size:13px"><span style="flex:1">${it.qty} x ${it.name}</span><span>${money(it.price * it.qty)}</span></div>`).join('')}
          <div class="divider"></div>
          <div class="row"><b style="flex:1">Paid with Yape</b><b class="num">${money(s.total)}</b></div>
        </div>
        <div class="row" style="gap:10px;width:100%"><button class="btn outlined block" style="flex:1">${icon('download')} PDF</button><button class="btn outlined block" style="flex:1">${icon('share')} Share</button></div>
      </div>
      <div style="position:absolute;left:20px;right:20px;bottom:28px"><button class="btn filled lg block" data-go="ma-home">Done</button></div>`);
    },
  });

  IC.register('ma-history', {
    app: 'Mobile App', title: 'Receipts history', w: W, h: H,
    render: () => frame(`
    ${appBar('Receipts')}
    <div class="col" style="padding:0 16px;gap:10px">
      <div class="input">${icon('search')}<span class="ph">Search by store or product</span></div>
      <div class="row" style="gap:8px"><span class="chip info">${icon('calendar_month', 16)} Last 3 months</span><span class="chip off">All stores</span><span class="chip off">${icon('swap_vert', 16)} Newest</span></div>
      <div class="card row" style="padding:14px 16px;gap:12px;background:var(--primary-container);border:0"><div class="col" style="gap:0;flex:1"><span class="caption">Spent in September</span><span class="num" style="font-size:22px;font-weight:700;color:var(--primary)">S/ 371.20</span></div><span class="caption">4 visits · avg S/ 92.80</span></div>
      <span class="caption" style="font-weight:600;letter-spacing:1px;margin-top:6px">OCTOBER 2026</span>
      ${[['Oct 03', 'Surco Store #01', 6, 76.6]].map(([d, st, n, t]) => `<div class="card row" style="padding:14px 16px;gap:12px">${icon('receipt_long', 24)}<div class="col" style="gap:0;flex:1"><b style="font-size:15px">${st}</b><span class="caption">${d} · ${n} items · Yape</span></div><span class="num" style="font-weight:600">${money(t)}</span></div>`).join('')}
      <span class="caption" style="font-weight:600;letter-spacing:1px;margin-top:6px">SEPTEMBER 2026</span>
      ${[['Sep 27', 'Surco Store #01', 12, 98.4, 'Plin'], ['Sep 20', 'Surco Store #01', 8, 64.1, 'Yape'], ['Sep 13', 'San Borja Store #02', 15, 131.75, 'Yape'], ['Sep 06', 'Surco Store #01', 7, 76.95, 'Yape']].map(([d, st, n, t, p]) => `<div class="card row" style="padding:14px 16px;gap:12px">${icon('receipt_long', 24)}<div class="col" style="gap:0;flex:1"><b style="font-size:15px">${st}</b><span class="caption">${d} · ${n} items · ${p}</span></div><span class="num" style="font-weight:600">${money(t)}</span></div>`).join('')}
    </div>
    ${nav('Receipts')}`),
  });
})();
