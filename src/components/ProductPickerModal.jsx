import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'
import './ProductPickerModal.css'

export default function ProductPickerModal({ closing, selectedId, onSelect, onClose }) {
  const { t } = useLanguage()
  const panelRef = useRef(null)

  // Lock body scroll + focus the dialog + ESC to close. Cleanup restores all.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (panelRef.current) panelRef.current.focus({ preventScroll: true })

    const onKey = (ev) => {
      if (ev.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Portal to <body>: the form lives inside transformed Reveal wrappers,
  // which would otherwise become the containing block for `position: fixed`.
  return createPortal(
    <div className={`ppm${closing ? ' is-closing' : ''}`}>
      <div className="ppm-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="ppm-viewport">
        <div
          ref={panelRef}
          className="ppm-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ppm-title"
          tabIndex={-1}
        >
          <div className="ppm-head">
            <div className="ppm-head-text">
              <p className="kicker">{t('order.productLabel')}</p>
              <h2 id="ppm-title" className="display ppm-title">
                {t('picker.title')}
              </h2>
              <p className="ppm-sub">{t('picker.sub')}</p>
            </div>
            <button type="button" className="btn btn-ink btn-sm ppm-close" onClick={onClose}>
              <span aria-hidden="true">×</span> {t('picker.close')}
            </button>
          </div>

          <div className="ppm-grid">
            {products.map((p, i) => (
              <div key={p.id} className="ppm-cell" style={{ '--i': i }}>
                <ProductCard
                  product={p}
                  selected={p.id === selectedId}
                  onSelect={onSelect}
                  actionLabel={t('picker.choose')}
                  selectedLabel={t('picker.chosen')}
                  badgeLabel={t('picker.badge')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
