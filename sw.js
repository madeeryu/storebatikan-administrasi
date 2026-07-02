// Service Worker — Keuangan AN
// Fungsi: dukungan notifikasi di HP + percobaan background reminder jatuh tempo hutang.
const APP_VER = 'keuangan-an-v1';

self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });

// Klik notifikasi → fokuskan / buka aplikasi
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow('./');
  })());
});

// Background reminder (Chrome/PWA terinstall). Baca cache 'hutang-reminders'
// yang ditulis aplikasi, lalu tampilkan notifikasi untuk yang jatuh tempo <= 7 hari.
async function cekReminder() {
  try {
    const cache = await caches.open('hutang-reminders');
    const res = await cache.match('/reminders');
    if (!res) return;
    const list = await res.json();
    const rp = n => 'Rp ' + Math.round(n || 0).toLocaleString('id-ID');
    for (const h of list) {
      if (h.dd <= 7) {
        const msg = h.dd < 0 ? `TELAT ${-h.dd} hari` : h.dd === 0 ? 'Jatuh tempo HARI INI' : `Jatuh tempo ${h.dd} hari lagi`;
        await self.registration.showNotification(`🧾 ${h.nama}`, {
          body: `${rp(h.nominal)} · ${msg}`,
          tag: 'hutang-' + h.id,
          icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧾</text></svg>"
        });
      }
    }
  } catch (e) { /* abaikan */ }
}

self.addEventListener('periodicsync', e => {
  if (e.tag === 'cek-hutang') e.waitUntil(cekReminder());
});
// Fallback: kalau ada 'sync' one-off
self.addEventListener('sync', e => {
  if (e.tag === 'cek-hutang') e.waitUntil(cekReminder());
});
