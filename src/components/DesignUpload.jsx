import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './DesignUpload.css'

const ACCEPT_ATTR = '.png,.jpg,.jpeg,.webp'

function formatBytes(bytes) {
  if (bytes == null) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function UploadError({ message, id }) {
  const dot = message.indexOf('.')
  const head = dot > 0 ? message.slice(0, dot + 1) : message
  const tail = dot > 0 ? message.slice(dot + 1).trim() : ''
  return (
    <p className="du-err" id={id} role="alert">
      <strong>{head}</strong>
      {tail && <span> {tail}</span>}
    </p>
  )
}

export default function DesignUpload({ file, previewUrl, error, onFile, onRemove }) {
  const { t } = useLanguage()
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const errId = error ? 'err-design-file' : undefined

  const openPicker = () => {
    if (inputRef.current) inputRef.current.click()
  }

  const handleChange = (ev) => {
    const picked = ev.target.files && ev.target.files[0]
    if (picked) onFile(picked)
  }

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = ''
    onRemove()
  }

  return (
    <div className="du-field">
      <p className="du-head">
        <span className="du-no" aria-hidden="true">
          04
        </span>
        {t('upload.head')}
      </p>

      {file && previewUrl ? (
        <div className="du du-done">
          <div className="du-preview">
            <img src={previewUrl} alt={t('upload.fileLabel')} />
          </div>
          <div className="du-file">
            <p className="du-kicker">{t('upload.locked')}</p>
            <p className="du-name">{file.name}</p>
            <p className="du-size">{formatBytes(file.size)}</p>
            <div className="du-actions">
              <button type="button" className="du-change" onClick={openPicker}>
                {t('upload.change')}
              </button>
              <button type="button" className="du-remove" onClick={handleRemove}>
                {t('upload.remove')}
              </button>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="du-input"
            aria-label={t('upload.changeLabel')}
            tabIndex={-1}
            onChange={handleChange}
          />
        </div>
      ) : (
        <label
          className={`du${dragOver ? ' is-drag' : ''}`}
          htmlFor="du-file"
          onDragOver={(ev) => {
            ev.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(ev) => {
            ev.preventDefault()
            setDragOver(false)
            const dropped = ev.dataTransfer.files && ev.dataTransfer.files[0]
            if (dropped) onFile(dropped)
          }}
        >
          <span className="du-drop">
            <span className="du-plus" aria-hidden="true">
              +
            </span>
            {dragOver && (
              <span className="du-dropit" aria-hidden="true">
                {t('upload.dropit')}
              </span>
            )}
          </span>
          <span className="du-info">
            <strong className="du-title">{t('upload.title')}</strong>
            <span className="du-browse">
              <span className="du-or">{t('upload.or')}</span> <u>{t('upload.browseLink')}</u>{' '}
              {t('upload.browseRest')}
            </span>
            <span className="du-badges">
              <i>PNG</i>
              <i>JPG</i>
              <i>WEBP</i>
              <i className="du-badge-dark">{t('upload.badgeMax')}</i>
            </span>
          </span>
          <input
            id="du-file"
            ref={inputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="du-input"
            aria-label={t('upload.fileLabel')}
            aria-describedby={errId}
            onChange={handleChange}
          />
        </label>
      )}

      {error && <UploadError message={error} id={errId} />}

      <div className="du-notice">
        <strong>{t('upload.noticeHead')}</strong>
        <p>{t('upload.noticeBody')}</p>
      </div>
    </div>
  )
}
