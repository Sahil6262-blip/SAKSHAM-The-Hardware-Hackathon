const assets = import.meta.glob('/public/assets/*-logo.png', {
  eager: true,
  query: '?url',
  import: 'default',
})
export default function InstitutionalLogo({ name, file, className = '' }) {
  const exists = assets[`/public/assets/${file}`]
  return (
    <span className={`institutional-logo ${className}`}>
      {exists ? (
        <img src={`/assets/${file}`} alt={name} width="96" height="40" />
      ) : (
        <span>{name}</span>
      )}
    </span>
  )
}
