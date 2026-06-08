(function () {
  // Seitenhierarchie: 0 = Index, 1 = Hauptseiten, 2 = Legal/Utility
  const DEPTH = {
    'index.html': 0, '/': 0, '': 0,
    // Hauptseiten (werden noch erstellt)
    'app.html': 1, 'features.html': 1, 'research.html': 1,
    'pricing.html': 1, 'contact.html': 1,
    // Legal
    'impressum.html': 2, 'datenschutz.html': 2,
  };

  const NAV_ORDER = [
    'index.html', 'app.html', 'features.html',
    'research.html', 'pricing.html', 'contact.html',
  ];

  function filename(href) {
    const p = new URL(href, location.href).pathname;
    return p.split('/').pop() || 'index.html';
  }

  function getDepth(f) { return DEPTH[f] ?? 1; }
  function getNavPos(f) { const i = NAV_ORDER.indexOf(f); return i === -1 ? 999 : i; }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;

    const fromFile = filename(location.href);
    const toFile   = filename(href);
    if (fromFile === toFile) return;

    const fromDepth = getDepth(fromFile);
    const toDepth   = getDepth(toFile);

    let direction;
    if (toDepth > fromDepth)      direction = 'forward';
    else if (toDepth < fromDepth) direction = 'backward';
    else direction = getNavPos(toFile) > getNavPos(fromFile) ? 'forward' : 'backward';

    document.documentElement.dataset.navDir = direction;
  });
})();
