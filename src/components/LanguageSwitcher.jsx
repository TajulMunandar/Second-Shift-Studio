import { useLanguage } from '../i18n/LanguageContext.jsx'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { lang, switchLang, t } = useLanguage()

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t('lang.label')}
      aria-live="polite"
    >
      {['id', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-opt${lang === code ? ' is-on' : ''}`}
          aria-pressed={lang === code}
          aria-label={`${t('lang.label')}: ${code === 'id' ? 'Indonesia' : 'English'}`}
          onClick={() => switchLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
