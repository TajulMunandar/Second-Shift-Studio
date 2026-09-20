import { useLanguage } from '../i18n/LanguageContext.jsx'
import { pick } from '../i18n/translations.js'
import KeychainFigure from './KeychainFigure.jsx'

export default function ProductCard({ product, selected, onSelect }) {
  const { lang, t } = useLanguage()
  const id = `make-${product.id}`
  return (
    <article className={`work-card${selected ? ' is-selected' : ''}`} aria-labelledby={id}>
      <div className="work-card-art">
        <span className="work-no" aria-hidden="true">
          {product.no}
        </span>
        {selected && <span className="sticker sticker-blue work-picked">{t('work.inOrder')}</span>}
        <KeychainFigure
          variant={product.variant}
          label={`${product.name} — ${pick(product.description, lang)}`}
        />
        <span className="sticker work-size">{product.size}</span>
      </div>
      <div className="work-card-body">
        <p className="work-tag">{pick(product.tag, lang)}</p>
        <h3 id={id} className="display work-name">
          {product.name}
        </h3>
        <p className="work-desc">{pick(product.description, lang)}</p>
        <ul className="work-specs">
          <li>
            <span>{t('work.sizeLabel')}</span>
            <strong>{product.size}</strong>
          </li>
          <li>
            <span>{t('work.sidesLabel')}</span>
            <strong>{t(`work.sides.${product.sides}`)}</strong>
          </li>
          <li>
            <span>{t('work.finishLabel')}</span>
            <strong>{pick(product.finish, lang)}</strong>
          </li>
        </ul>
        <button
          type="button"
          className={`btn ${selected ? 'btn-ink' : 'btn-primary'}`}
          onClick={() => onSelect(product)}
          aria-pressed={selected}
        >
          {selected ? t('work.selected') : t('work.makeThis')}
          {!selected && (
            <span className="arr" aria-hidden="true">
              →
            </span>
          )}
        </button>
      </div>
    </article>
  )
}
