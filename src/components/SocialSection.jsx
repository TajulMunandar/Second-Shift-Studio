import { useLanguage } from '../i18n/LanguageContext.jsx'
import { socialList, socials } from '../data/socials.js'
import Reveal from './Reveal.jsx'

export default function SocialSection() {
  const { t } = useLanguage()
  return (
    <section id="social" className="section social" aria-label="Follow Second Shift Studio">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('social.kicker')}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display social-title">
            {t('social.titleA')} <span>{t('social.titleB')}</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="social-lede">{t('social.lede')}</p>
        </Reveal>

        <ul className="social-rows">
          {socialList.map((s, i) => {
            const href = socials[s.key]
            const soon = !href || href === '#'
            return (
              <Reveal as="li" key={s.key} delay={i * 110} className="social-row-wrap">
                <a
                  href={soon ? undefined : href}
                  className={`social-row${soon ? ' is-soon' : ''}`}
                  {...(soon
                    ? { 'aria-disabled': 'true', onClick: (e) => e.preventDefault() }
                    : { target: '_blank', rel: 'noreferrer' })}
                  aria-label={
                    soon ? `${s.label} — ${t('social.soonNote')}` : `${s.label}: ${s.handle}`
                  }
                >
                  <span className="social-no" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="social-names">
                    <strong>{s.label}</strong>
                    <small>{soon ? t('social.soonNote') : s.handle}</small>
                  </span>
                  <span className="social-go" aria-hidden="true">
                    {soon ? t('social.soonBadge') : '↗'}
                  </span>
                </a>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
