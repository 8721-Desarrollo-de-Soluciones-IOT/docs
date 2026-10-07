// On-Cart Display: 10" touch screen embedded in the Smart Cart (1024 x 600, landscape).
(() => {
  const { icon, logo, money, qr } = IC;
  const W = 1024, H = 600;

  const statusBar = (state = 'online') => `
  <div class="row" style="height:56px;padding:0 24px;background:var(--surface);border-bottom:1px solid var(--line);gap:16px">
    ${logo(15)}<span class="spacer"></span>
    <span class="caption row" style="gap:4px">${icon('storefront', 18)} ${IC.STORE}</span>
    <span class="caption row" style="gap:4px">${icon('shopping_cart', 18)} ${IC.CART}</span>
    <span class="chip ${state === 'online' ? 'ok' : 'err'}">${icon(state === 'online' ? 'wifi' : 'wifi_off', 16)} ${state === 'online' ? 'Online' : 'Offline'}</span>
    <span class="caption row" style="gap:2px">${icon('battery_5_bar', 18)} 78%</span>
    <span class="caption row" style="gap:2px;font-weight:600">${icon('language', 18)} EN</span>
  </div>`;

  const frame = (body, bar) => `<div class="screen" style="width:${W}px;height:${H}px;display:flex;flex-direction:column">${statusBar(bar)}${body}</div>`;

  const itemRow = (it, hl) => `
  <div class="row" style="padding:12px 16px;gap:14px;border-bottom:1px solid var(--line);${hl ? `background:${hl}` : ''}">
    <div style="width:44px;height:44px;border-radius:10px;background:var(--surface-2);color:var(--primary);display:flex;align-items:center;justify-content:center;flex:none">${icon(it.icon, 24)}</div>
    <div class="col" style="gap:0;flex:1"><span style="font-weight:500">${it.name}</span><span class="caption">${money(it.price)} · ${icon('check_circle', 14)} weight verified</span></div>
    <span class="chip off">x${it.qty}</span>
    <span class="num" style="font-weight:600;width:100px;text-align:right">${money(it.price * it.qty)}</span>
  </div>`;

  // Shopping session layout shared by several states.
  const session = ({ n = 5, banner = '', toast = '', last = -1, removed = null, locked = false } = {}) => {
    const s = IC.session(n);
    const level = s.pct >= 90 ? 'warn' : '';
    const items = s.items.slice().reverse();
    return frame(`
    <div class="row" style="flex:1;gap:0;align-items:stretch;min-height:0">
      <div class="col" style="flex:1;gap:0;background:var(--surface);min-width:0;position:relative">
        <div class="row" style="padding:14px 16px;border-bottom:1px solid var(--line)"><h3 style="font-weight:600">Your cart</h3><span class="chip info">${s.count} items</span><span class="spacer"></span><span class="caption row">${icon('sensors', 16)} RFID + weight active</span></div>
        ${banner}
        <div style="overflow:hidden;flex:1">${items.map((it, i) => itemRow(it, i === 0 && last >= 0 ? 'var(--secondary-container)' : '')).join('')}</div>
        ${toast}
      </div>
      <div class="col" style="width:340px;padding:22px;gap:16px;background:var(--surface-2);border-left:1px solid var(--line)">
        <span class="caption" style="font-weight:600;letter-spacing:1px">REAL-TIME TOTAL</span>
        <span class="num" style="font-size:44px;font-weight:700;color:var(--primary)">${money(s.total)}</span>
        <div class="card col" style="padding:14px;gap:8px">
          <div class="row"><span style="font-weight:500">Budget</span><span class="spacer"></span><span class="num" style="font-weight:600">${money(s.budget)}</span></div>
          <div class="progress ${level}"><i style="width:${Math.min(s.pct, 100)}%"></i></div>
          <div class="row caption"><span>${s.pct}% used</span><span class="spacer"></span><span>${money(Math.max(s.budget - s.total, 0))} left</span></div>
        </div>
        <span class="spacer"></span>
        <button class="btn cta lg block" data-go="cd-checkout" ${locked ? 'disabled style="opacity:.4"' : ''}>${icon('qr_code_2')} Proceed to payment</button>
        <div class="row" style="gap:10px"><button class="btn outlined block" style="flex:1" data-go="cd-budget">${icon('edit')} Budget</button><button class="btn outlined block" style="flex:1" data-act="help">${icon('support_agent')} Help</button></div>
      </div>
    </div>`);
  };

  const toast = (ic, text, color = 'var(--ink)') =>
    `<div class="toast" style="bottom:18px;background:${color}">${icon(ic, 20)} ${text}</div>`;

  IC.register('cd-welcome', {
    app: 'On-Cart Display', title: 'Welcome', w: W, h: H,
    render: () => frame(`
    <div class="row" style="flex:1;padding:40px 56px;gap:56px;background:var(--surface)">
      <div class="col" style="flex:1;gap:18px">
        <span class="chip ok" style="align-self:flex-start">${icon('check_circle', 16)} Cart available</span>
        <h1 style="font-size:44px">Hi! Ready to shop<br>without lines?</h1>
        <p class="muted" style="font-size:18px">Drop products in the cart and we add them for you. Pay here with a QR code when you finish.</p>
        <button class="btn cta lg" style="align-self:flex-start;height:72px;font-size:20px;padding:0 44px;border-radius:36px;margin-top:8px" data-go="cd-budget">${icon('touch_app', 28)} Tap to start</button>
        <div class="row caption" style="gap:16px;margin-top:6px"><span class="row">${icon('language', 18)} Español / English</span><span class="row">${icon('accessibility_new', 18)} Larger text</span></div>
      </div>
      <div class="card col" style="width:300px;padding:24px;align-items:center;gap:12px;text-align:center">
        ${qr(180, 3)}
        <h4>Have the app?</h4><p class="caption">Scan this code with Innova Carty to link the cart and keep your receipt in your phone.</p>
      </div>
    </div>`),
  });

  IC.register('cd-budget', {
    app: 'On-Cart Display', title: 'Set budget', w: W, h: H,
    render: () => frame(`
    <div class="row" style="flex:1;padding:28px 48px;gap:48px;background:var(--surface)">
      <div class="col" style="flex:1;gap:14px">
        <span class="caption" style="font-weight:600;letter-spacing:1px">STEP 1 OF 1 · OPTIONAL</span>
        <h2 style="font-size:32px">Set your spending limit</h2>
        <p class="muted">We will warn you when your cart reaches 90% of this amount.</p>
        <div class="input focus" style="height:84px;font:700 44px var(--font-title);color:var(--primary);justify-content:flex-start">S/ 150.00</div>
        <div class="row" style="gap:10px">${['50', '100', '150', '200', '300'].map((v) => `<span class="chip ${v === '150' ? 'info' : 'off'}" style="height:40px;padding:0 18px;font-size:15px;border-radius:20px">S/ ${v}</span>`).join('')}</div>
        <span class="spacer"></span>
        <div class="row" style="gap:12px"><button class="btn outlined lg" data-go="cd-session">Skip</button><button class="btn cta lg" style="flex:1" data-go="cd-session">${icon('shopping_cart')} Start shopping</button></div>
      </div>
      <div class="grid" style="grid-template-columns:repeat(3,96px);gap:12px;align-content:center">
        ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => `<div class="card" style="height:72px;display:flex;align-items:center;justify-content:center;font:600 26px var(--font-title)">${k}</div>`).join('')}
      </div>
    </div>`),
  });

  IC.register('cd-session', {
    app: 'On-Cart Display', title: 'Shopping session', w: W, h: H,
    render: () => session({ n: 5, last: 0, toast: toast('add_shopping_cart', 'Added: Whole wheat bread 600 g · +S/ 8.50', 'var(--secondary)') }),
  });

  IC.register('cd-removed', {
    app: 'On-Cart Display', title: 'Item removed', w: W, h: H,
    render: () => session({ n: 4, toast: toast('remove_shopping_cart', 'Removed: Whole wheat bread 600 g · −S/ 8.50') }),
  });

  IC.register('cd-unknown', {
    app: 'On-Cart Display', title: 'Tag not recognized', w: W, h: H,
    render: () => session({ n: 5, banner: `
      <div class="row" style="margin:12px 16px 0;padding:12px 16px;border-radius:10px;background:var(--warning-container);gap:12px">
        <span style="color:#9A5B00">${icon('sell', 26)}</span>
        <div class="col" style="gap:0;flex:1"><b>We couldn't read that product</b><span class="caption">Take it out and place it again with the label facing the side wall.</span></div>
        <button class="btn sm outlined" data-act="help">Call staff</button></div>` }),
  });

  IC.register('cd-threshold', {
    app: 'On-Cart Display', title: 'Budget threshold alert', w: W, h: H,
    render: () => session({ n: 9, last: 0, banner: `
      <div class="row" style="margin:12px 16px 0;padding:12px 16px;border-radius:10px;background:var(--warning-container);gap:12px">
        <span style="color:#9A5B00">${icon('warning', 26)}</span>
        <div class="col" style="gap:0;flex:1"><b>You've used 95% of your budget</b><span class="caption">S/ 7.00 left of S/ 150.00. Remove an item or raise your limit.</span></div>
        <button class="btn sm tonal" data-go="cd-budget">Edit budget</button><button class="btn sm text" data-go="cd-session">OK</button></div>` }),
  });

  IC.register('cd-discrepancy', {
    app: 'On-Cart Display', title: 'Weight discrepancy · locked', w: W, h: H,
    render: () => session({ n: 5, locked: true }).replace(/<\/div>$/, `
      <div class="scrim" style="top:56px"><div class="dialog col" style="width:560px;gap:14px;text-align:center;align-items:center;border-top:6px solid var(--error)">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--error-container);color:var(--error);display:flex;align-items:center;justify-content:center">${icon('scale', 36)}</div>
        <h2>Let's check your last item</h2>
        <p class="muted">The cart detected <b>+412 g</b> but no product was read. Payment is paused until it is fixed.</p>
        <div class="card col" style="padding:14px;gap:6px;text-align:left;width:100%;background:var(--surface-2)">
          <span class="row">${icon('counter_1', 20)} Take the last item out of the cart.</span>
          <span class="row">${icon('counter_2', 20)} Place it again, label facing the side wall.</span>
        </div>
        <span class="chip info">${icon('support_agent', 16)} A supervisor has been notified · ${IC.CART}</span>
        <div class="row" style="gap:12px;width:100%"><button class="btn outlined lg" style="flex:1" data-act="help">Call supervisor</button><button class="btn filled lg" style="flex:1" data-go="cd-session">I placed it again</button></div>
      </div></div></div>`),
  });

  IC.register('cd-checkout', {
    app: 'On-Cart Display', title: 'Pay with QR', w: W, h: H,
    render: () => {
      const s = IC.session(5);
      return frame(`
      <div class="row" style="flex:1;padding:28px 48px;gap:48px;background:var(--surface)">
        <div class="col" style="flex:1;gap:14px">
          <span class="caption" style="font-weight:600;letter-spacing:1px">CHECKOUT · ${IC.ORDER}</span>
          <h2 style="font-size:32px">Scan to pay</h2>
          <p class="muted">Open Yape, Plin or your banking app and scan the code. The amount is already filled in.</p>
          <div class="card col" style="padding:16px;gap:8px">
            <div class="row"><span class="muted">${s.count} items</span><span class="spacer"></span><span>${money(s.total)}</span></div>
            <div class="row"><span class="muted">Discounts</span><span class="spacer"></span><span>S/ 0.00</span></div>
            <div class="divider"></div>
            <div class="row"><b>Total to pay</b><span class="spacer"></span><span class="num" style="font-size:28px;font-weight:700;color:var(--primary)">${money(s.total)}</span></div>
          </div>
          <div class="row caption" style="gap:8px">${icon('hourglass_top', 18)} Waiting for payment confirmation… code expires in 04:52</div>
          <span class="spacer"></span>
          <button class="btn outlined lg" style="align-self:flex-start" data-go="cd-session">${icon('arrow_back')} Back to cart</button>
        </div>
        <div class="card col" style="width:340px;padding:24px;align-items:center;gap:14px">
          ${qr(260, 11)}
          <div class="row" style="gap:10px"><span class="chip info">Yape</span><span class="chip info">Plin</span><span class="chip off">Banking apps</span></div>
        </div>
      </div>`);
    },
  });

  IC.register('cd-paid', {
    app: 'On-Cart Display', title: 'Payment confirmed · exit clearance', w: W, h: H,
    render: () => {
      const s = IC.session(5);
      return frame(`
      <div class="row" style="flex:1;padding:32px 56px;gap:48px;background:var(--surface)">
        <div class="col" style="flex:1;gap:16px">
          <div style="width:84px;height:84px;border-radius:50%;background:var(--success);color:#fff;display:flex;align-items:center;justify-content:center">${icon('check', 56)}</div>
          <h1 style="font-size:40px">Payment confirmed</h1>
          <p class="muted" style="font-size:18px">You can leave through any exit. Your exit clearance stays active for 15 minutes.</p>
          <span class="chip ok" style="align-self:flex-start;height:36px;font-size:14px;padding:0 14px">${icon('verified', 18)} Exit clearance active</span>
          <span class="spacer"></span>
          <button class="btn filled lg" style="align-self:flex-start" data-go="cd-welcome">${icon('logout')} Finish and release cart</button>
        </div>
        <div class="card col" style="width:360px;padding:22px;gap:10px">
          <div class="row"><h4>Digital receipt</h4><span class="spacer"></span><span class="caption">B001-004213</span></div>
          ${s.items.map((it) => `<div class="row caption" style="font-size:13px"><span style="flex:1">${it.qty} x ${it.name}</span><span>${money(it.price * it.qty)}</span></div>`).join('')}
          <div class="divider"></div>
          <div class="row"><b>Paid with Yape</b><span class="spacer"></span><b class="num">${money(s.total)}</b></div>
          <div class="row" style="gap:10px;margin-top:6px">${qr(72, 5)}<span class="caption">Scan to download the receipt, or find it in the Innova Carty app.</span></div>
        </div>
      </div>`);
    },
  });
})();
