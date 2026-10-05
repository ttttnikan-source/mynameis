import { useReveal } from '../hooks'

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useReveal()
  const d = delay ? ` d${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal${d} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
