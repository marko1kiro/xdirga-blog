/**
 * Konfigurasi langganan email lewat Buttondown.
 *
 * Blog ini tidak punya backend newsletter sendiri. Formulir langganan
 * mengirim alamat email langsung ke Buttondown, dan halaman konfirmasi
 * Buttondown yang menangani sukses atau gagal. Buttondown juga yang
 * mengirim email konfirmasi ke pembaca baru.
 *
 * Cara aktivasi. Isi BUTTONDOWN_USERNAME dengan username Buttondown
 * blog ini, lalu deploy ulang. Selama username masih kosong, komponen
 * SubscribeForm tidak merender apa pun dan seksi langganan di halaman
 * kontak juga tidak muncul.
 */

export const BUTTONDOWN_USERNAME = 'xdirgablog';

/** True kalau username sudah diisi dan formulir boleh tampil. */
export const NEWSLETTER_ENABLED = BUTTONDOWN_USERNAME.trim().length > 0;

/** Alamat POST formulir langganan. Kosong kalau newsletter belum aktif. */
export function buttondownSubscribeUrl(): string {
  if (!NEWSLETTER_ENABLED) return '';
  return `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;
}
