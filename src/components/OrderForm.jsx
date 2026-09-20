import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { products, SIZE_PRESETS } from '../data/products.js'
import { customProductLabel, sendToWhatsApp } from '../lib/whatsapp.js'
import DesignUpload from './DesignUpload.jsx'
import Reveal from './Reveal.jsx'
import './OrderForm.css'

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp']

const emptyForm = {
  name: '',
  type: 'custom',
  productId: '',
  customDesign: '',
  imageFile: null,
  imageUrl: '',
  sizePreset: '',
  customWidth: '',
  customHeight: '',
  sides: '',
  note: '',
}

export default function OrderForm({ selectedProductId, onPickProduct }) {
  const { lang, t } = useLanguage()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const summaryRef = useRef(null)

  // A "Make this" tap in the gallery drops the product straight into the form.
  useEffect(() => {
    if (!selectedProductId) return
    setForm((f) => ({ ...f, type: 'existing', productId: selectedProductId }))
    setErrors((e) => ({ ...e, productId: undefined, type: undefined }))
  }, [selectedProductId])

  // Free the preview object URL when it changes / unmounts.
  useEffect(() => {
    return () => {
      if (form.imageUrl) URL.revokeObjectURL(form.imageUrl)
    }
  }, [form.imageUrl])

  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }))
    setSent(false)
  }

  const clearError = (field) =>
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e))

  const product = useMemo(
    () => products.find((p) => p.id === form.productId),
    [form.productId],
  )

  const sizeLabel = useMemo(() => {
    if (form.sizePreset === 'custom') {
      const w = form.customWidth.trim()
      const h = form.customHeight.trim()
      if (w && h) return `${w} × ${h} cm`
      return ''
    }
    return form.sizePreset
  }, [form.sizePreset, form.customWidth, form.customHeight])

  const handleFile = (file) => {
    if (!file) return
    if (!ACCEPTED.includes(file.type)) {
      setErrors((e) => ({ ...e, imageFile: t('upload.errType') }))
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrors((e) => ({ ...e, imageFile: t('upload.errSize') }))
      return
    }
    if (form.imageUrl) URL.revokeObjectURL(form.imageUrl)
    set({ imageFile: file, imageUrl: URL.createObjectURL(file) })
    clearError('imageFile')
  }

  const removeImage = () => {
    if (form.imageUrl) URL.revokeObjectURL(form.imageUrl)
    set({ imageFile: null, imageUrl: '' })
  }

  const isCustom = form.type === 'custom'

  // Existing drops already define their artwork + size — no upload, no sizing.
  const finalSize = isCustom ? sizeLabel : product ? product.size : ''

  const productDisplay = isCustom
    ? form.customDesign.trim()
      ? customProductLabel(form.customDesign.trim(), lang)
      : ''
    : product
      ? `#${product.no} ${product.name}`
      : ''

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t('order.errName')
    if (form.type === 'existing' && !form.productId) next.productId = t('order.errProduct')
    if (isCustom && !form.customDesign.trim()) next.customDesign = t('order.errDesign')
    if (isCustom && !form.imageFile) next.imageFile = t('order.errImage')
    if (isCustom && !form.sizePreset) next.sizePreset = t('order.errSize')
    if (
      isCustom &&
      form.sizePreset === 'custom' &&
      (!form.customWidth.trim() || !form.customHeight.trim())
    )
      next.sizePreset = t('order.errSizeDims')
    if (!form.sides) next.sides = t('order.errSides')
    setErrors(next)
    return { next, ok: Object.keys(next).length === 0 }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const { ok, next } = validate()
    if (!ok) {
      const first = document.querySelector(
        ['name', 'productId', 'customDesign', 'imageFile', 'sizePreset', 'sides']
          .map((f) => (next[f] ? `[data-field="${f}"]` : null))
          .filter(Boolean)
          .join(','),
      )
      if (first && first.focus) {
        try {
          first.focus({ preventScroll: true })
        } catch {
          /* noop */
        }
        first.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    sendToWhatsApp(
      {
        name: form.name.trim(),
        type: form.type,
        product: productDisplay,
        size: finalSize,
        sides: form.sides,
        note: form.note.trim(),
        fileName: form.imageFile ? form.imageFile.name : '',
      },
      lang,
    )
    setSent(true)
    if (summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const typeIs = (v) => form.type === v
  const sidesOptions = [
    { v: 'single', title: t('order.sideSingleT'), desc: t('order.sideSingleD') },
    { v: 'double', title: t('order.sideDoubleT'), desc: t('order.sideDoubleD') },
  ]

  return (
    <section
      id="order"
      className="section order"
      aria-label={`${t('order.titleA')} ${t('order.titleB')}`}
    >
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('order.kicker')}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display order-title">
            {t('order.titleA')} <span>{t('order.titleB')}</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="order-lede">
            {t('order.lede')} <strong>{t('order.ledeStrong')}</strong>
          </p>
        </Reveal>

        <div className="order-grid">
          <Reveal delay={150}>
            <form className="form" onSubmit={handleSubmit} noValidate>
              {/* 1 — order type */}
              <fieldset className="field" data-field="type">
                <legend>
                  <span className="field-no" aria-hidden="true">
                    01
                  </span>{' '}
                  {t('order.typeLegend')}
                </legend>
                <div className="seg" role="radiogroup" aria-label={t('order.typeLegend')}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={typeIs('existing')}
                    className={`seg-opt${typeIs('existing') ? ' is-on' : ''}`}
                    onClick={() => {
                      set({ type: 'existing' })
                      clearError('type')
                    }}
                  >
                    {t('order.optExisting')}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={typeIs('custom')}
                    className={`seg-opt${typeIs('custom') ? ' is-on' : ''}`}
                    onClick={() => {
                      set({ type: 'custom' })
                      clearError('type')
                    }}
                  >
                    {t('order.optCustom')}
                  </button>
                </div>
              </fieldset>

              {/* 2 — name */}
              <div className="field" data-field="name">
                <label htmlFor="of-name">
                  <span className="field-no" aria-hidden="true">
                    02
                  </span>{' '}
                  {t('order.nameLabel')}
                </label>
                <input
                  id="of-name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('order.namePh')}
                  value={form.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  onChange={(e) => {
                    set({ name: e.target.value })
                    clearError('name')
                  }}
                />
                {errors.name && (
                  <p className="err" id="err-name" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* 3 — product / custom */}
              {typeIs('existing') ? (
                <div className="field" data-field="productId">
                  <label htmlFor="of-product">
                    <span className="field-no" aria-hidden="true">
                      03
                    </span>{' '}
                    {t('order.productLabel')}
                  </label>
                  <div className="select-wrap">
                    <select
                      id="of-product"
                      value={form.productId}
                      aria-invalid={Boolean(errors.productId)}
                      aria-describedby={errors.productId ? 'err-product' : undefined}
                      onChange={(e) => {
                        onPickProduct(e.target.value)
                        clearError('productId')
                      }}
                    >
                      <option value="">{t('order.productPh')}</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          #{p.no} — {p.name} ({p.size},{' '}
                          {t(`work.sides.${p.sides}`).toLowerCase()})
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.productId && (
                    <p className="err" id="err-product" role="alert">
                      {errors.productId}
                    </p>
                  )}
                </div>
              ) : (
                <div className="field" data-field="customDesign">
                  <label htmlFor="of-custom">
                    <span className="field-no" aria-hidden="true">
                      03
                    </span>{' '}
                    {t('order.customLabel')}
                  </label>
                  <input
                    id="of-custom"
                    type="text"
                    placeholder={t('order.customPh')}
                    value={form.customDesign}
                    aria-invalid={Boolean(errors.customDesign)}
                    aria-describedby={errors.customDesign ? 'err-custom' : undefined}
                    onChange={(e) => {
                      set({ customDesign: e.target.value })
                      clearError('customDesign')
                    }}
                  />
                  {errors.customDesign && (
                    <p className="err" id="err-custom" role="alert">
                      {errors.customDesign}
                    </p>
                  )}
                </div>
              )}

              {/* 4 — design upload (custom only: existing drops already have artwork) */}
              {isCustom && (
                <div className="field" data-field="imageFile">
                  <DesignUpload
                    file={form.imageFile}
                    previewUrl={form.imageUrl}
                    error={errors.imageFile}
                    onFile={handleFile}
                    onRemove={removeImage}
                  />
                </div>
              )}

              {/* 5 — size (custom only: existing drops have a fixed size) */}
              {isCustom && (
                <fieldset className="field" data-field="sizePreset">
                  <legend>
                    <span className="field-no" aria-hidden="true">
                      05
                    </span>{' '}
                    {t('order.sizeLegend')}
                  </legend>
                  <div className="pills" role="radiogroup" aria-label={t('order.sizeLegend')}>
                    {SIZE_PRESETS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={form.sizePreset === s}
                        className={`pill${form.sizePreset === s ? ' is-on' : ''}`}
                        onClick={() => {
                          set({ sizePreset: s })
                          clearError('sizePreset')
                        }}
                      >
                        {s}
                      </button>
                    ))}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={form.sizePreset === 'custom'}
                      className={`pill${form.sizePreset === 'custom' ? ' is-on' : ''}`}
                      onClick={() => {
                        set({ sizePreset: 'custom' })
                        clearError('sizePreset')
                      }}
                    >
                      {t('order.sizeCustom')}
                    </button>
                  </div>
                  {form.sizePreset === 'custom' && (
                    <div className="dims">
                      <div>
                        <label htmlFor="of-w">{t('order.widthLabel')}</label>
                        <input
                          id="of-w"
                          type="number"
                          min="1"
                          max="30"
                          step="0.5"
                          inputMode="decimal"
                          placeholder="5"
                          value={form.customWidth}
                          onChange={(e) => {
                            set({ customWidth: e.target.value })
                            clearError('sizePreset')
                          }}
                        />
                      </div>
                      <span aria-hidden="true">×</span>
                      <div>
                        <label htmlFor="of-h">{t('order.heightLabel')}</label>
                        <input
                          id="of-h"
                          type="number"
                          min="1"
                          max="30"
                          step="0.5"
                          inputMode="decimal"
                          placeholder="7"
                          value={form.customHeight}
                          onChange={(e) => {
                            set({ customHeight: e.target.value })
                            clearError('sizePreset')
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {errors.sizePreset && (
                    <p className="err" role="alert">
                      {errors.sizePreset}
                    </p>
                  )}
                </fieldset>
              )}

              {/* sides */}
              <fieldset className="field" data-field="sides">
                <legend>
                  <span className="field-no" aria-hidden="true">
                    {isCustom ? '06' : '04'}
                  </span>{' '}
                  {t('order.sidesLegend')}
                </legend>
                <div className="sides" role="radiogroup" aria-label={t('order.sidesLegend')}>
                  {sidesOptions.map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      role="radio"
                      aria-checked={form.sides === o.v}
                      className={`side${form.sides === o.v ? ' is-on' : ''}`}
                      onClick={() => {
                        set({ sides: o.v })
                        clearError('sides')
                      }}
                    >
                      <strong>{o.title}</strong>
                      <small>{o.desc}</small>
                    </button>
                  ))}
                </div>
                {errors.sides && (
                  <p className="err" role="alert">
                    {errors.sides}
                  </p>
                )}
              </fieldset>

              {/* note */}
              <div className="field">
                <label htmlFor="of-note">
                  <span className="field-no" aria-hidden="true">
                    {isCustom ? '07' : '05'}
                  </span>{' '}
                  {t('order.noteLabel')} <em>{t('order.noteOptional')}</em>
                </label>
                <textarea
                  id="of-note"
                  rows={4}
                  placeholder={t('order.notePh')}
                  value={form.note}
                  onChange={(e) => set({ note: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary form-send">
                {t('order.send')} <span className="arr" aria-hidden="true">→</span>
              </button>
              {sent && (
                <p className="sent" role="status" ref={summaryRef}>
                  {t('order.sent')}
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={250} className="order-side">
            <aside className="receipt" aria-label={t('order.receiptHead')} aria-live="polite">
              <p className="receipt-head">{t('order.receiptHead')}</p>
              <dl className="receipt-rows">
                <div>
                  <dt>{t('order.rName')}</dt>
                  <dd>{form.name.trim() || '—'}</dd>
                </div>
                <div>
                  <dt>{t('order.rType')}</dt>
                  <dd>
                    {typeIs('custom')
                      ? t('order.typeCustomLabel')
                      : t('order.typeExistingLabel')}
                  </dd>
                </div>
                <div>
                  <dt>{t('order.rProduct')}</dt>
                  <dd>{productDisplay || '—'}</dd>
                </div>
                <div>
                  <dt>{t('order.rSize')}</dt>
                  <dd>{finalSize || '—'}</dd>
                </div>
                <div>
                  <dt>{t('order.rSides')}</dt>
                  <dd>
                    {form.sides === 'double'
                      ? t('order.sidesDoubleLabel')
                      : form.sides === 'single'
                        ? t('order.sidesSingleLabel')
                        : '—'}
                  </dd>
                </div>
                <div>
                  <dt>{t('order.rFile')}</dt>
                  <dd>{form.imageFile ? form.imageFile.name : '—'}</dd>
                </div>
              </dl>
              <p className="receipt-foot">{t('order.receiptFoot')}</p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
