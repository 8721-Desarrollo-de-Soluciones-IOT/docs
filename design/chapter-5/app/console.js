// Web Application "Innova Carty Console" for store operators (1440 x 900, Angular Material).
(() => {
  const { icon, logo, money } = IC;
  const W = 1440, H = 900;

  const menu = [
    ['dashboard', 'Dashboard', 'wa-dashboard'], ['shopping_cart', 'Carts', 'wa-carts'], ['notifications_active', 'Alerts', 'wa-alerts'],
    ['inventory_2', 'Catalog', 'wa-catalog'], ['bar_chart', 'Reports', 'wa-dashboard'], ['settings', 'Settings', 'wa-dashboard'], ['help', 'Help', 'wa-dashboard'],
  ];

  const shell = (active, title, body, actions = '') => `
  <div class="screen" style="width:${W}px;height:${H}px;display:flex">
    <aside class="col" style="width:248px;background:var(--surface);border-right:1px solid var(--line);padding:18px 12px;gap:4px">
      <div style="padding:4px 12px 22px">${logo(16)}</div>
      ${menu.map(([ic, l, go]) => `<div class="row" data-go="${go}" style="height:48px;padding:0 16px;border-radius:24px;gap:14px;font-weight:500;${l === active ? 'background:var(--primary-container);color:var(--primary)' : 'color:var(--ink-2)'}">${icon(ic)} ${l}${l === 'Alerts' ? '<span class="spacer"></span><span class="chip err" style="height:22px">3</span>' : ''}</div>`).join('')}
      <span class="spacer"></span>
      <div class="card col" style="padding:14px;gap:6px;background:var(--surface-2)"><span class="caption">Store</span><b class="row" style="font-size:14px">${IC.STORE} ${icon('expand_more', 18)}</b><span class="caption row">${icon('circle', 10)} 40 carts · edge gateway online</span></div>
    </aside>
    <main class="col" style="flex:1;gap:0;min-width:0">
      <header class="row" style="height:64px;padding:0 28px;background:var(--surface);border-bottom:1px solid var(--line);gap:16px">
        <div class="input" style="width:420px;height:40px;border-radius:20px;background:var(--surface-2);border-color:transparent">${icon('search')}<span class="ph">Search carts, orders or SKUs</span><span class="spacer"></span><span class="caption">Ctrl K</span></div>
        <span class="spacer"></span><span class="caption row" style="gap:4px">${icon('language', 18)} EN</span>
        <span style="position:relative">${icon('notifications', 26)}<span style="position:absolute;top:-2px;right:-2px;width:10px;height:10px;border-radius:50%;background:var(--error)"></span></span>
        <div class="avatar">LM</div><div class="col" style="gap:0"><b style="font-size:14px">Lucía Medina</b><span class="caption">Floor supervisor</span></div>
      </header>
      <div class="row" style="padding:22px 28px 0"><h2 style="flex:1">${title}</h2>${actions}</div>
      <div style="padding:18px 28px;flex:1;min-height:0;overflow:hidden;position:relative">${body}</div>
    </main>
  </div>`;

  const statusChip = (st) => ({
    'In session': `<span class="chip ok">${icon('shopping_cart', 16)} In session</span>`,
    Discrepancy: `<span class="chip warn">${icon('scale', 16)} Discrepancy</span>`,
    Locked: `<span class="chip err">${icon('lock', 16)} Locked</span>`,
    Paid: `<span class="chip info">${icon('verified', 16)} Paid · clearance</span>`,
    Offline: `<span class="chip off">${icon('wifi_off', 16)} Offline</span>`,
    Available: `<span class="chip off">${icon('check', 16)} Available</span>`,
  })[st];

  const carts = [
    ['CART-0427', 'Discrepancy', 6, 76.6, 150, 'Aisle 4 · Dairy', '+412 g without tag', '18 s ago', 78],
    ['CART-0311', 'Locked', 11, 132.4, 0, 'Exit B', 'Geofence crossed unpaid', '1 min ago', 64],
    ['CART-0102', 'In session', 9, 143.0, 150, 'Aisle 7 · Meat', 'Budget 95% reached', '40 s ago', 91],
    ['CART-0215', 'In session', 3, 27.3, 80, 'Aisle 2 · Bakery', 'Item added', '5 s ago', 55],
    ['CART-0388', 'Paid', 14, 186.9, 200, 'Exit A', 'Payment confirmed (Plin)', '2 min ago', 47],
    ['CART-0144', 'In session', 7, 58.2, 0, 'Aisle 9 · Grocery', 'Item removed', '12 s ago', 83],
    ['CART-0420', 'Offline', 0, 0, 0, 'Charging bay', 'Heartbeat lost', '26 min ago', 12],
    ['CART-0009', 'Available', 0, 0, 0, 'Entrance', 'Released', '4 min ago', 96],
  ];

  const kpi = (ic, label, value, delta, tone = 'info') => `
    <div class="card col" style="flex:1;padding:18px;gap:6px"><div class="row"><span class="muted" style="font-size:14px;flex:1">${label}</span><span class="chip ${tone}" style="width:34px;justify-content:center;padding:0">${icon(ic, 18)}</span></div>
    <span class="num" style="font-size:30px;font-weight:700">${value}</span><span class="caption">${delta}</span></div>`;

  const lineChart = () => {
    const pts = [4, 6, 9, 14, 22, 26, 24, 19, 17, 21, 28, 32, 30];
    const w = 640, h = 200, max = 36;
    const path = pts.map((v, i) => `${i ? 'L' : 'M'}${(i * w) / (pts.length - 1)},${h - (v / max) * h}`).join(' ');
    return `<svg width="${w}" height="${h + 24}" viewBox="0 -4 ${w} ${h + 28}">
      ${[0, 1, 2, 3].map((g) => `<line x1="0" x2="${w}" y1="${(g * h) / 3}" y2="${(g * h) / 3}" stroke="var(--line)"/>`).join('')}
      <path d="${path} L${w},${h} L0,${h} Z" fill="var(--primary-container)" opacity=".7"/>
      <path d="${path}" stroke="var(--primary)" stroke-width="3" fill="none"/>
      ${['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map((t, i) => `<text x="${(i * w) / 6}" y="${h + 20}" font-size="11" fill="var(--ink-2)" text-anchor="${i === 0 ? 'start' : i === 6 ? 'end' : 'middle'}">${t}</text>`).join('')}
    </svg>`;
  };

  const alertsFeed = [
    ['err', 'fence', 'CART-0311 crossed Exit B without clearance', 'Wheels locked · 1 min ago'],
    ['warn', 'scale', 'CART-0427 weight discrepancy +412 g', 'Aisle 4 · 18 s ago'],
    ['warn', 'sell', 'CART-0215 unreadable RFID tag', 'Aisle 2 · 3 min ago'],
    ['info', 'battery_alert', 'CART-0420 offline (battery 12%)', 'Charging bay · 26 min ago'],
  ];

  IC.register('wa-login', {
    app: 'Web Console', title: 'Sign in', w: W, h: H,
    render: () => `
    <div class="screen row" style="width:${W}px;height:${H}px;gap:0">
      <div class="hero col" style="flex:1;height:100%;background:var(--hero);padding:64px;gap:20px;justify-content:center">
        ${logo(22, true)}
        <h1 style="color:#fff;font-size:44px;max-width:520px">Your whole cart fleet, live.</h1>
        <p style="color:#fff;opacity:.85;font-size:18px;max-width:480px">Monitor active carts, resolve weight discrepancies and control exits from one console.</p>
      </div>
      <div class="col" style="width:560px;height:100%;background:var(--surface);padding:0 88px;justify-content:center;gap:18px">
        <h2>Sign in to the Console</h2><p class="muted">Use your store staff account.</p>
        <div class="field"><label>Work email</label><div class="input focus">lucia.medina@retailco.pe</div></div>
        <div class="field"><label>Password</label><div class="input">••••••••••<span class="spacer"></span>${icon('visibility')}</div></div>
        <div class="row" style="font-size:14px"><span style="width:20px;height:20px;border-radius:4px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center">${icon('check', 16)}</span> Keep me signed in<span class="spacer"></span><span style="color:var(--primary);font-weight:500">Forgot password?</span></div>
        <button class="btn filled lg block" data-go="wa-dashboard">Sign in</button>
        <p class="caption">Access is restricted to authorized staff. Activity is logged for auditing.</p>
      </div>
    </div>`,
  });

  IC.register('wa-dashboard', {
    app: 'Web Console', title: 'Dashboard', w: W, h: H,
    render: () => shell('Dashboard', 'Good morning, Lucía', `
      <div class="row" style="gap:16px;align-items:stretch">
        ${kpi('shopping_cart', 'Active carts', '32 / 40', '↑ 6 vs. same hour last week', 'ok')}
        ${kpi('notifications_active', 'Open alerts', '3', '1 critical · 2 warnings', 'err')}
        ${kpi('timer', 'Avg. checkout time', '48 s', '↓ 31% vs. cashier lanes', 'info')}
        ${kpi('savings', 'Shrinkage prevented', 'S/ 1,240', 'This week · 17 discrepancies solved', 'warn')}
      </div>
      <div class="row" style="gap:16px;margin-top:16px;align-items:stretch">
        <div class="card col" style="flex:1;padding:20px;gap:12px"><div class="row"><h4 style="flex:1">Active sessions by hour</h4><span class="chip off">Today</span></div>${lineChart()}</div>
        <div class="card col" style="width:440px;padding:20px;gap:4px"><div class="row" style="margin-bottom:8px"><h4 style="flex:1">Live alerts</h4><span style="color:var(--primary);font-size:14px;font-weight:500" data-go="wa-alerts">View all</span></div>
          ${alertsFeed.map(([t, ic, title, sub]) => `<div class="row" data-go="wa-cart-detail" style="padding:10px 0;gap:12px;border-bottom:1px solid var(--line)"><span class="chip ${t}" style="width:36px;height:36px;border-radius:10px;justify-content:center;padding:0">${icon(ic, 20)}</span><div class="col" style="gap:0;flex:1"><span style="font-size:14px;font-weight:500">${title}</span><span class="caption">${sub}</span></div>${icon('chevron_right')}</div>`).join('')}
        </div>
      </div>
      <div class="card row" style="margin-top:16px;padding:16px 20px;gap:24px">
        <h4>Fleet status</h4>${[['ok', 'In session', 24], ['warn', 'Discrepancy', 1], ['err', 'Locked', 1], ['info', 'Paid', 6], ['off', 'Available', 7], ['off', 'Offline', 1]].map(([t, l, n]) => `<span class="row" style="gap:8px"><span class="chip ${t}">${l}</span><b>${n}</b></span>`).join('')}
      </div>`),
  });

  IC.register('wa-carts', {
    app: 'Web Console', title: 'Carts', w: W, h: H,
    render: () => shell('Carts', 'Carts', `
      <div class="row" style="gap:10px;margin-bottom:14px">
        <div class="input" style="width:320px;height:40px">${icon('search')}<span class="ph">Search by cart ID or order</span></div>
        ${[['All', 40, 'info'], ['In session', 24, 'off'], ['Discrepancy', 1, 'off'], ['Locked', 1, 'off'], ['Paid', 6, 'off'], ['Offline', 1, 'off']].map(([l, n, t]) => `<span class="chip ${t}" style="height:34px;padding:0 14px;font-size:13px">${l} · ${n}</span>`).join('')}
        <span class="spacer"></span><button class="btn outlined sm">${icon('map', 18)} Floor map</button><button class="btn outlined sm">${icon('download', 18)} Export</button>
      </div>
      <div class="card" style="overflow:hidden"><table class="tbl">
        <thead><tr><th>Cart</th><th>Status</th><th>Items</th><th>Total</th><th>Budget</th><th>Zone</th><th>Last event</th><th>Battery</th><th></th></tr></thead>
        <tbody>${carts.map(([id, st, n, t, b, z, ev, ago, bat]) => `<tr data-go="wa-cart-detail" style="${st === 'Discrepancy' || st === 'Locked' ? 'background:var(--surface-2)' : ''}">
          <td><b>${id}</b></td><td>${statusChip(st)}</td><td>${n || '—'}</td><td class="num">${t ? money(t) : '—'}</td><td>${b ? money(b) : '<span class="caption">No limit</span>'}</td><td>${z}</td>
          <td><div class="col" style="gap:0"><span style="font-size:13px">${ev}</span><span class="caption">${ago}</span></div></td>
          <td><span class="row caption" style="gap:2px">${icon(bat < 20 ? 'battery_1_bar' : 'battery_5_bar', 18)} ${bat}%</span></td><td>${icon('chevron_right')}</td></tr>`).join('')}</tbody>
      </table>
      <div class="row caption" style="padding:12px 16px;justify-content:flex-end;gap:16px">Rows per page: 8 ▾ <span>1–8 of 40</span>${icon('chevron_left')}${icon('chevron_right')}</div></div>`),
  });

  const detail = () => shell('Carts', `${IC.CART} ${'<span class="chip warn" style="vertical-align:middle;margin-left:10px">' + icon('scale', 16) + ' Discrepancy</span>'}`, `
    <div class="row" style="gap:16px;align-items:stretch">
      <div class="col" style="flex:1;gap:16px">
        <div class="card col" style="padding:20px;gap:12px;border-left:5px solid var(--warning)">
          <div class="row"><h4 style="flex:1">Weight check failed</h4><span class="caption">Detected 18 s ago · Aisle 4 · Dairy</span></div>
          <div class="row" style="gap:16px">
            ${[['Expected (RFID items)', '9,314 g'], ['Measured weight', '9,726 g'], ['Difference', '+412 g'], ['Tolerance', '± 160 g']].map(([l, v], i) => `<div class="card col" style="flex:1;padding:14px;gap:2px;background:var(--surface-2)"><span class="caption">${l}</span><span class="num" style="font-size:22px;font-weight:700;${i === 2 ? 'color:#B3261E' : ''}">${v}</span></div>`).join('')}
          </div>
          <p class="muted" style="font-size:14px">Payment is paused on the cart. The shopper was asked to place the last item again.</p>
          <div class="row" style="gap:10px"><button class="btn filled" data-go="wa-unlock">${icon('lock_open')} Verify and unlock</button><button class="btn outlined">${icon('flag')} Add audit flag</button><button class="btn text">${icon('directions_walk')} Assign to staff</button></div>
        </div>
        <div class="card" style="overflow:hidden"><div class="row" style="padding:14px 16px"><h4 style="flex:1">Items in cart (6)</h4><span class="caption">Order ${IC.ORDER}</span></div>
          <table class="tbl"><thead><tr><th>Product</th><th>RFID tag</th><th>Qty</th><th>Nominal weight</th><th>Subtotal</th></tr></thead>
          <tbody>${IC.session(5).items.map((it) => `<tr><td>${it.name}</td><td class="caption">${it.tag}</td><td>${it.qty}</td><td>${(it.weight * it.qty).toLocaleString('en-US')} g</td><td class="num">${money(it.price * it.qty)}</td></tr>`).join('')}
          <tr style="background:var(--warning-container)"><td><b>Unidentified mass</b></td><td class="caption">— no tag read —</td><td>?</td><td><b>+412 g</b></td><td>—</td></tr></tbody></table></div>
      </div>
      <div class="card col" style="width:380px;padding:20px;gap:0">
        <h4 style="margin-bottom:12px">Session timeline</h4>
        ${[['warn', 'scale', '10:42:18', 'Weight +412 g without RFID read', 'Payment paused'], ['ok', 'add', '10:41:55', 'Added Whole wheat bread 600 g', '+S/ 8.50 · 610 g ✓'], ['ok', 'add', '10:40:12', 'Added Extra virgin olive oil 500 ml', '+S/ 21.90 · 690 g ✓'], ['ok', 'add', '10:38:47', 'Added Free-range eggs x15', '+S/ 12.90 · 930 g ✓'], ['info', 'savings', '10:31:02', 'Budget set to S/ 150.00', 'via mobile app'], ['info', 'link', '10:30:40', 'Session started', 'Linked to Camila R. (app)']].map(([t, ic, time, a, b], i, arr) => `
          <div class="row" style="gap:12px;align-items:flex-start"><div class="col" style="align-items:center;gap:0"><span class="chip ${t}" style="width:30px;height:30px;padding:0;justify-content:center;border-radius:50%">${icon(ic, 16)}</span>${i < arr.length - 1 ? '<span style="width:2px;height:34px;background:var(--line)"></span>' : ''}</div>
          <div class="col" style="gap:0;flex:1"><span style="font-size:14px;font-weight:500">${a}</span><span class="caption">${time} · ${b}</span></div></div>`).join('')}
      </div>
    </div>`, `<button class="btn text" data-go="wa-carts">${icon('arrow_back')} Back to carts</button>`);

  IC.register('wa-cart-detail', { app: 'Web Console', title: 'Cart detail · discrepancy', w: W, h: H, render: detail });

  IC.register('wa-unlock', {
    app: 'Web Console', title: 'Verify and unlock', w: W, h: H,
    render: () => detail().replace(/<\/div>\s*$/, `
      <div class="scrim"><div class="dialog col" style="width:480px;gap:16px">
        <div class="row">${icon('lock_open', 28)}<h3 style="font-weight:600;flex:1">Unlock ${IC.CART}</h3></div>
        <p class="muted" style="font-size:14px">Confirm you checked the cart in person. The resolution is saved in the audit log.</p>
        <div class="field"><label>Resolution</label><div class="input focus">Item placed again and read correctly ${'<span class="spacer"></span>'}${icon('expand_more')}</div></div>
        <div class="field"><label>Supervisor PIN</label><div class="input">••••</div></div>
        <div class="field"><label>Note (optional)</label><div class="input"><span class="ph">Add a comment for the audit log</span></div></div>
        <div class="row" style="justify-content:flex-end;gap:8px;margin-top:4px"><button class="btn text" data-go="wa-cart-detail">Cancel</button><button class="btn filled" data-act="unlock">Unlock cart</button></div>
      </div></div></div>`),
  });

  IC.register('wa-alerts', {
    app: 'Web Console', title: 'Alerts', w: W, h: H,
    render: () => shell('Alerts', 'Alerts', `
      <div class="row" style="gap:0;border-bottom:1px solid var(--line);margin-bottom:16px">
        ${[['Open', 3], ['Geofence', 1], ['Weight', 1], ['RFID', 1], ['Devices', 1], ['Resolved today', 17]].map(([l, n], i) => `<div style="padding:10px 18px;font-weight:500;${i === 0 ? 'color:var(--primary);border-bottom:3px solid var(--primary)' : 'color:var(--ink-2)'}">${l} (${n})</div>`).join('')}
      </div>
      <div class="col" style="gap:12px">
        ${[['err', 'fence', 'Geofence breach · wheels locked', 'CART-0311 reached Exit B with order unpaid (S/ 132.40, 11 items).', 'Exit B · 1 min ago', 'Go to exit'],
           ['warn', 'scale', 'Weight discrepancy', 'CART-0427 measured +412 g without an RFID read. Payment paused.', 'Aisle 4 · 18 s ago', 'Open cart'],
           ['warn', 'sell', 'Unreadable RFID tag', 'CART-0215 detected mass with a damaged tag (SKU unknown).', 'Aisle 2 · 3 min ago', 'Open cart'],
           ['info', 'battery_alert', 'Cart offline', 'CART-0420 lost heartbeat. Last battery reading 12%.', 'Charging bay · 26 min ago', 'Locate']].map(([t, ic, title, d, meta, cta]) => `
          <div class="card row" style="padding:18px 20px;gap:16px;border-left:5px solid var(--${t === 'err' ? 'error' : t === 'warn' ? 'warning' : 'primary'})">
            <span class="chip ${t}" style="width:44px;height:44px;border-radius:12px;justify-content:center;padding:0">${icon(ic, 24)}</span>
            <div class="col" style="gap:2px;flex:1"><b>${title}</b><span class="muted" style="font-size:14px">${d}</span><span class="caption">${meta}</span></div>
            <button class="btn tonal sm" data-go="wa-cart-detail">${cta}</button><button class="btn text sm">Acknowledge</button>
          </div>`).join('')}
      </div>`),
  });

  const catalog = () => shell('Catalog', 'Catalog &amp; weight tolerances', `
    <div class="row" style="gap:10px;margin-bottom:14px">
      <div class="input" style="width:340px;height:40px">${icon('search')}<span class="ph">Search by name, SKU or RFID tag</span></div>
      <span class="chip info" style="height:34px;padding:0 14px">All categories ▾</span><span class="chip off" style="height:34px;padding:0 14px">Tolerance &gt; 5%</span>
      <span class="spacer"></span><span class="caption row">${icon('sync', 16)} Last sync to carts: 10:15</span><button class="btn filled sm">${icon('add', 18)} Add product</button>
    </div>
    <div class="card" style="overflow:hidden"><table class="tbl">
      <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th>RFID tag prefix</th><th>Price</th><th>Nominal weight</th><th>Tolerance</th><th></th></tr></thead>
      <tbody>${IC.catalog.map((p) => `<tr><td class="caption">${p.sku}</td><td><b style="font-weight:500">${p.name}</b></td><td>${p.cat}</td><td class="caption">${p.tag}</td><td class="num">${money(p.price)}</td><td>${p.weight.toLocaleString('en-US')} g</td><td><span class="chip ${p.tol > 5 ? 'warn' : 'off'}">± ${p.tol}%</span></td><td data-go="wa-catalog-edit">${icon('edit')}</td></tr>`).join('')}</tbody>
    </table><div class="row caption" style="padding:12px 16px;justify-content:flex-end;gap:16px">Rows per page: 9 ▾ <span>1–9 of 1,284</span>${icon('chevron_left')}${icon('chevron_right')}</div></div>`);

  IC.register('wa-catalog', { app: 'Web Console', title: 'Catalog', w: W, h: H, render: catalog });

  IC.register('wa-catalog-edit', {
    app: 'Web Console', title: 'Edit product tolerance', w: W, h: H,
    render: () => catalog().replace(/<\/div>\s*$/, `
      <div class="scrim"><div class="dialog col" style="width:520px;gap:16px">
        <div class="row"><h3 style="font-weight:600;flex:1">Edit Chicken breast 1 kg</h3><span class="caption">SKU-50311</span></div>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:14px">
          <div class="field"><label>Price (S/)</label><div class="input">18.90</div></div>
          <div class="field"><label>Nominal weight (g)</label><div class="input">1,010</div></div>
          <div class="field"><label>Tolerance (%)</label><div class="input focus">6</div></div>
          <div class="field"><label>Allowed range</label><div class="input" style="background:var(--surface-2)">949 – 1,071 g</div></div>
        </div>
        <div class="row caption" style="gap:8px;padding:10px 12px;border-radius:8px;background:var(--primary-container);color:var(--primary)">${icon('sync', 18)} Saving pushes the new rule to the edge gateway and 40 carts.</div>
        <div class="row" style="justify-content:flex-end;gap:8px"><button class="btn text" data-go="wa-catalog">Cancel</button><button class="btn filled" data-act="save-sku">Save and sync</button></div>
      </div></div></div>`),
  });
})();
