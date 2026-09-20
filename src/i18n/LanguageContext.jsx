import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { STRINGS } from './translations.js'

export const STORAGE_KEY = 'second-shift-language'

function readInitial() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'id' || saved === 'en') return saved
  } catch {
    /* storage unavailable — fall through to default */
  }
  return 'id'
}

const LanguageContext = createContext(null)

function lookup(lang, path) {
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), STRINGS[lang])
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitial)

  const switchLang = useCallback((next) => {
    if (next !== 'id' && next !== 'en') return
    // Subtle swap pulse — fades content for ~200ms, no remount, no blink.
    document.documentElement.classList.add('is-switching')
    window.setTimeout(() => document.documentElement.classList.remove('is-switching'), 220)
    setLang(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = STRINGS[lang].meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', STRINGS[lang].meta.description)
  }, [lang])

  const t = useCallback(
    (path) => lookup(lang, path) ?? lookup(lang === 'id' ? 'en' : 'id') ?? path,
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
