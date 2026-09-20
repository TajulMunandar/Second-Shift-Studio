import { useLanguage } from '../i18n/LanguageContext.jsx'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'
import './Gallery.css'

export default function ProductGallery({ selectedId, onSelect }) {
  const { t } = useLanguage()
  return (
    <section id="work" className="section work" aria-label="The work">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('work.kicker')}</p>
        </Reveal>
        <div className="work-head">
          <Reveal delay={100}>
            <h2 className="display work-title">
              {t('work.titleA')}
              <br />
              {t('work.titleB')}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="work-lede">
              {t('work.ledeA')} <strong>{t('work.ledeStrong')}</strong> {t('work.ledeB')}
            </p>
          </Reveal>
        </div>

        <div className="work-rail">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 110} className={`work-cell cell-${i % 4}`}>
              <ProductCard product={p} selected={p.id === selectedId} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>
        <p className="work-hint" aria-hidden="true">
          {t('work.hint')}
        </p>
      </div>
    </section>
  )
}
