import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

// ---------------------------------------------------------------------------
// Shop video — swap this URL when a new clip drops. Shorts / watch / youtu.be
// links all work: the 11-char video ID is extracted automatically.
// ---------------------------------------------------------------------------
const VIDEO_URL = 'https://youtube.com/shorts/fxOxhqmWE3U?feature=share'

function getYouTubeId(url) {
  const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/|embed\/)([\w-]{11})/)
  return m ? m[1] : null
}

export default function VideoSection() {
  const { t } = useLanguage()
  const [playing, setPlaying] = useState(false)
  const videoId = getYouTubeId(VIDEO_URL)
  const steps = t('process.steps')

  return (
    <section id="process" className="section process" aria-label="How it is made">
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t('process.kicker')}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display process-title">
            {t('process.titleA')} <span>{t('process.titleB')}</span>
          </h2>
        </Reveal>

        <div className="process-grid">
          <Reveal delay={150} className="process-player-col">
            <div className="player" role="region" aria-label={t('process.caption')}>
              <div className="player-screen">
                <div className="player-grid-bg" aria-hidden="true" />
                <p className="player-stamp" aria-hidden="true">
                  2S — SHOP CAM
                </p>
                {!playing || !videoId ? (
                  <>
                    <button
                      type="button"
                      className="player-play"
                      onClick={() => setPlaying(true)}
                      aria-label={t('process.playLabel')}
                    >
                      <span className="player-play-icon" aria-hidden="true">
                        ▶
                      </span>
                    </button>
                    <p className="player-caption">{t('process.caption')}</p>
                  </>
                ) : (
                  <iframe
                    className="player-frame"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
                    title="Second Shift Studio — how it's made"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="player-bar" aria-hidden="true">
                <span className="player-dot" />
                <span className="player-dot" />
                <span className="player-track">
                  <span className={`player-progress${playing ? ' is-live' : ''}`} />
                </span>
                <span className="player-time">{t('process.clipLength')}</span>
              </div>
            </div>
          </Reveal>

          <ol className="process-steps">
            {Array.isArray(steps) &&
              steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 110} className="process-step">
                  <span className="process-no" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </Reveal>
              ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
