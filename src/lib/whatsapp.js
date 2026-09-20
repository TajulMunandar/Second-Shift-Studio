import { WHATSAPP_NUMBER } from '../data/products.js'

const TEMPLATES = {
  id: {
    hello: 'HALO SECOND SHIFT STUDIO 👋',
    intro: 'Saya mau pesan custom keychain.',
    name: 'NAMA',
    type: 'TIPE',
    typeCustom: 'Full custom',
    typeExisting: 'Produk yang sudah ada',
    product: 'PRODUK',
    customPrefix: 'Desain custom —',
    size: 'UKURAN',
    sides: 'SISI',
    sidesSingle: '1 sisi',
    sidesDouble: '2 sisi',
    note: 'CATATAN',
    empty: '—',
    designFile: 'FILE DESAIN',
    noFile: 'Belum ada file (menyusul)',
    attach: 'Saya akan melampirkan file desain ini di chat WhatsApp.',
    thanks: 'Terima kasih!',
  },
  en: {
    hello: 'HELLO SECOND SHIFT STUDIO 👋',
    intro: "I'd like to order a custom keychain.",
    name: 'NAME',
    type: 'TYPE',
    typeCustom: 'Fully custom',
    typeExisting: 'Existing drop',
    product: 'PRODUCT',
    customPrefix: 'Custom —',
    size: 'SIZE',
    sides: 'SIDES',
    sidesSingle: 'Single sided',
    sidesDouble: 'Double sided',
    note: 'NOTE',
    empty: '—',
    designFile: 'DESIGN FILE',
    noFile: 'No file yet (to follow)',
    attach: "I'll attach the design file in this WhatsApp chat.",
    thanks: 'Thank you!',
  },
}

export function buildOrderMessage(order, lang = 'id') {
  const t = TEMPLATES[lang] || TEMPLATES.id
  const lines = [
    t.hello,
    '',
    t.intro,
    '',
    `${t.name}:`,
    order.name || t.empty,
    '',
    `${t.type}:`,
    order.type === 'custom' ? t.typeCustom : t.typeExisting,
    '',
    `${t.product}:`,
    order.product || t.empty,
    '',
    `${t.size}:`,
    order.size || t.empty,
    '',
    `${t.sides}:`,
    order.sides === 'double' ? t.sidesDouble : t.sidesSingle,
    '',
    `${t.note}:`,
    order.note || t.empty,
    '',
    `${t.designFile}:`,
    order.fileName || t.noFile,
    '',
    t.attach,
    '',
    t.thanks,
  ]
  return lines.join('\n')
}

export function sendToWhatsApp(order, lang = 'id') {
  const message = buildOrderMessage(order, lang)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener')
  return url
}

export function customProductLabel(designName, lang = 'id') {
  const t = TEMPLATES[lang] || TEMPLATES.id
  return `${t.customPrefix} ${designName}`
}
