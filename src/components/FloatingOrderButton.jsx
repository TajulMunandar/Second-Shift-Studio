import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './FloatingOrderButton.css'

export default function FloatingOrderButton() {
  const { t } = useLanguage()
  const [ready, setReady] = useState(false)
  const [inOrder, setInOrder] = useState(false)

  // Gentle entrance — settle in shortly after first paint, not instantly.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(timer)
  }, [])

  // Hide while the order section itself is on screen.
  useEffect(() => {
    const target = document.getElementById('order')
    if (!target || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setInOrder(entry.isIntersecting),
      { threshold: 0.12 },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [])

  const goToOrder = () => {
    document
      .getElementById('order')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const visible = ready && !inOrder

  return (
    <button
      type="button"
      className={`fab${visible ? ' is-visible' : ''}`}
      onClick={goToOrder}
      aria-label={t('fab.label')}
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
    >
      <span className="fab-plus" aria-hidden="true">
        +
      </span>
      <span className="fab-text">{t('fab.text')}</span>
    </button>
  )
}
