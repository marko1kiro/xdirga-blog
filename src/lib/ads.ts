/**
 * Konfigurasi terpusat AdSense (PERSIAPAN — iklan BELUM tayang).
 *
 * Satu tempat untuk menghidupkan iklan nanti:
 *   1. User buat akun AdSense → dapatkan ID publisher `ca-pub-XXXX`.
 *   2. Isi ADSENSE_CLIENT_ID di bawah + isi id slot di AD_SLOTS.
 *   3. ADS_ENABLED otomatis jadi true (turunan dari ID yang terisi).
 *
 * Selama ADSENSE_CLIENT_ID kosong:
 *   - AdSlot tidak merender apa pun (bukan div kosong, bukan placeholder).
 *   - Tidak ada script AdSense yang dimuat, sebelum atau sesudah consent.
 *   - Halaman terlihat persis seperti sebelum ada slot.
 *
 * Consent banner di bawah adalah gate first-party (pintu izin), BUKAN
 * Google CMP bersertifikat. Begitu AdSense disetujui, user WAJIB
 * mengaktifkan Google "Privacy & messaging" (fundingchoices) di dashboard
 * AdSense, lalu matikan banner ini via CONSENT_BANNER_ENABLED = false.
 */

export const ADSENSE_CLIENT_ID = '';

/** Iklan aktif hanya bila ID publisher sudah diisi. Jangan set true manual. */
export const ADS_ENABLED = ADSENSE_CLIENT_ID !== '';

/** ID slot AdSense per penempatan. Semua kosong sampai user memberi ID. */
export const AD_SLOTS = {
  /** Sidebar desktop artikel, di bawah TOC/share. */
  'article-sidebar': '',
  /** Di bawah isi artikel, sebelum TagList. */
  'article-below-content': '',
  /** Beranda, di antara baris kartu artikel (setelah ~6 kartu). */
  'home-feed': '',
} as const;

export type AdPlacement = keyof typeof AD_SLOTS;

/** Kunci localStorage untuk pilihan consent. Nilai: 'accepted' | 'declined'. */
export const CONSENT_KEY = 'xdirga-consent';

/**
 * Banner consent first-party aktif. Matikan (false) saat CMP Google
 * (Privacy & messaging) sudah aktif di dashboard AdSense.
 */
export const CONSENT_BANNER_ENABLED = true;
