// Shared helpers and demo data for every Innova Carty screen.
const IC = (window.IC = {});

IC.icon = (name, size) =>
  `<span class="ms"${size ? ` style="font-size:${size}px"` : ''}>${name}</span>`;

IC.cartMark = (size = 28, c1 = 'var(--primary)', c2 = 'var(--secondary)') => `
<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" aria-hidden="true">
  <path d="M2 5h4l3.2 14.2a2 2 0 0 0 2 1.6h12.6a2 2 0 0 0 2-1.5L28 10H8" stroke="${c1}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="12" y="11.5" width="11" height="6" rx="1.5" fill="${c2}"/>
  <circle cx="12" cy="26.5" r="2.4" fill="${c1}"/><circle cx="23" cy="26.5" r="2.4" fill="${c1}"/>
</svg>`;

IC.logo = (size = 18, onDark = false) => `
<span class="logo${onDark ? ' on-dark-logo' : ''}" style="font-size:${size}px">
  ${onDark ? IC.cartMark(size * 1.6, '#fff', '#7EE2B8') : IC.cartMark(size * 1.6)}
  <span><span class="a">INNOVA</span> <span class="b">CARTY</span></span>
</span>`;

// Deterministic QR-like pattern (visual placeholder for the dynamic payment QR).
IC.qr = (size = 200, seed = 7) => {
  const n = 29, cell = size / n;
  let s = seed, rects = '';
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const finder = (x, y) => {
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      const edge = i === 0 || j === 0 || i === 6 || j === 6;
      const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (edge || core) rects += `<rect x="${(x + i) * cell}" y="${(y + j) * cell}" width="${cell}" height="${cell}"/>`;
    }
  };
  const inFinder = (i, j) => (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
    if (!inFinder(i, j) && rnd() > 0.52) rects += `<rect x="${i * cell}" y="${j * cell}" width="${cell + .3}" height="${cell + .3}"/>`;
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
  return `<svg class="qr" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="#102A43">${rects}</svg>`;
};

IC.money = (v) => 'S/ ' + v.toFixed(2);

IC.catalog = [
  { sku: 'SKU-10021', name: 'Whole milk 1 L', cat: 'Dairy', price: 4.9, weight: 1032, tol: 3, tag: 'E200 3412 0127', icon: 'water_full' },
  { sku: 'SKU-20450', name: 'Long-grain rice 5 kg', cat: 'Grocery', price: 23.5, weight: 5020, tol: 2, tag: 'E200 3412 0388', icon: 'rice_bowl' },
  { sku: 'SKU-11873', name: 'Free-range eggs x15', cat: 'Dairy', price: 12.9, weight: 930, tol: 5, tag: 'E200 3412 0451', icon: 'egg' },
  { sku: 'SKU-30612', name: 'Extra virgin olive oil 500 ml', cat: 'Grocery', price: 21.9, weight: 690, tol: 3, tag: 'E200 3412 0533', icon: 'water_drop' },
  { sku: 'SKU-40105', name: 'Whole wheat bread 600 g', cat: 'Bakery', price: 8.5, weight: 610, tol: 6, tag: 'E200 3412 0692', icon: 'bakery_dining' },
  { sku: 'SKU-11290', name: 'Greek yogurt 1 kg', cat: 'Dairy', price: 11.2, weight: 1045, tol: 3, tag: 'E200 3412 0718', icon: 'icecream' },
  { sku: 'SKU-50311', name: 'Chicken breast 1 kg', cat: 'Meat', price: 18.9, weight: 1010, tol: 8, tag: 'E200 3412 0804', icon: 'kebab_dining' },
  { sku: 'SKU-60077', name: 'Ground coffee 250 g', cat: 'Grocery', price: 16.4, weight: 262, tol: 4, tag: 'E200 3412 0919', icon: 'coffee' },
  { sku: 'SKU-50488', name: 'Salmon fillet 500 g', cat: 'Seafood', price: 19.9, weight: 505, tol: 8, tag: 'E200 3412 1002', icon: 'set_meal' },
];

// A shopping session: list of {sku, qty}.
IC.session = (n, budget = 150) => {
  const items = IC.catalog.slice(0, n).map((p, i) => ({ ...p, qty: i === 0 ? 2 : 1 }));
  const total = items.reduce((a, it) => a + it.price * it.qty, 0);
  const count = items.reduce((a, it) => a + it.qty, 0);
  return { items, total, count, budget, pct: Math.round((total / budget) * 100) };
};

IC.STORE = 'Surco Store #01';
IC.CART = 'CART-0427';
IC.ORDER = 'ORD-20261003-0815';

IC.SCREENS = {};
IC.register = (id, def) => (IC.SCREENS[id] = { id, ...def });
