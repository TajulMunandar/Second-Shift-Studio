// ---------------------------------------------------------------------------
// Product catalogue — Second Shift Studio
// One data source: localizable copy lives in { id, en } objects, picked by
// the active language. Artwork is rendered as inline SVG (see KeychainFigure)
// so there are no broken images. When real product photos are ready, add an
// `image` field per product (e.g. "/images/product-01.webp") and render it in
// ProductCard.
// ---------------------------------------------------------------------------

export const products = [
  {
    id: 'avatar-drop',
    no: '01',
    name: 'Avatar Drop',
    tag: { id: 'Paling cocok untuk pertama kali', en: 'Best for first-timers' },
    description: {
      id: 'Avatar kamu, depan dan belakang. Koleksi klasik.',
      en: 'Your avatar, front and back. The classic carry.',
    },
    size: '5 × 5 cm',
    sides: 'double',
    finish: { id: 'Akrilik gloss + rantai bola', en: 'Gloss acrylic + ball chain' },
    variant: 'blue',
  },
  {
    id: 'blockhead-classic',
    no: '02',
    name: 'Blockhead Classic',
    tag: { id: 'Andalan satu sisi', en: 'Single-sided staple' },
    description: {
      id: 'Satu wajah yang bersih. Ringan, mencolok, tahan harian.',
      en: 'One clean face. Light, loud, everyday-proof.',
    },
    size: '4 × 4 cm',
    sides: 'single',
    finish: { id: 'Akrilik gloss + ring belah', en: 'Gloss acrylic + split ring' },
    variant: 'ink',
  },
  {
    id: 'squad-pack',
    no: '03',
    name: 'Squad Pack',
    tag: { id: 'Untuk grup & kru', en: 'For groups & crews' },
    description: {
      id: 'Drop kompak untuk satu grup atau komunitasmu.',
      en: 'Matching drops for your whole group or community.',
    },
    size: '6 × 6 cm',
    sides: 'double',
    finish: { id: 'Akrilik gloss + rantai bola', en: 'Gloss acrylic + ball chain' },
    variant: 'paper',
  },
  {
    id: 'group-crest',
    no: '04',
    name: 'Group Crest',
    tag: { id: 'Format tinggi', en: 'Tall format' },
    description: {
      id: 'Logo grup di depan, maskot di belakang.',
      en: 'Group logo up front, mascot on the back.',
    },
    size: '5 × 7 cm',
    sides: 'double',
    finish: { id: 'Akrilik gloss + kait bintang', en: 'Gloss acrylic + star clasp' },
    variant: 'blueprint',
  },
]

export const SIZE_PRESETS = ['4 cm', '5 cm', '6 cm']

export const WHATSAPP_NUMBER = '6285372676260'
