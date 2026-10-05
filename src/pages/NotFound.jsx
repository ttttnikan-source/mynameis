import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: 180 }}>
      <div className="container empty">
        <h3 className="h3">Page not found</h3>
        <p style={{ marginBottom: 24 }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn">Back to home</Link>
      </div>
    </section>
  )
}
