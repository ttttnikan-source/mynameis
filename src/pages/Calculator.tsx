import { useState, useMemo, useEffect, useRef } from 'react'
import { TrendingUp, Calculator as CalcIcon, DollarSign, Percent, Home, Wallet } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<number>(0)

  useEffect(() => {
    const start = ref.current
    const diff = value - start
    const duration = 600
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + diff * eased
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(animate)
      else ref.current = value
    }
    requestAnimationFrame(animate)
  }, [value])

  return <>{prefix}{display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>
}

export default function Calculator() {
  const [price, setPrice] = useState(5000000)
  const [downPayment, setDownPayment] = useState(25)
  const [mortgageRate, setMortgageRate] = useState(4.5)
  const [rentalIncome, setRentalIncome] = useState(360000)
  const [expenses, setExpenses] = useState(30000)
  const [appreciation, setAppreciation] = useState(6)

  const results = useMemo(() => {
    const downPaymentAmount = price * (downPayment / 100)
    const loanAmount = price - downPaymentAmount
    const annualMortgage = loanAmount * (mortgageRate / 100)
    const annualCashFlow = rentalIncome - expenses - annualMortgage
    const rentalYield = (rentalIncome / price) * 100
    const roi = ((annualCashFlow / downPaymentAmount) * 100) || 0
    const fiveYearValue = price * Math.pow(1 + appreciation / 100, 5)
    const totalReturn = (fiveYearValue - price) + (annualCashFlow * 5)

    return { downPaymentAmount, loanAmount, annualMortgage, annualCashFlow, rentalYield, roi, fiveYearValue, totalReturn }
  }, [price, downPayment, mortgageRate, rentalIncome, expenses, appreciation])

  return (
    <>
      <PageHeader
        eyebrow="Investment Tools"
        title="Investment Calculator"
        subtitle="Estimate your potential returns with our Dubai property investment calculator."
        image="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <Reveal>
              <div className="rounded-3xl border border-navy-50 bg-white p-6 lg:p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center">
                    <CalcIcon className="w-5 h-5 text-navy-700" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-xl font-bold text-navy-900">Investment Inputs</h2>
                </div>

                <Slider label="Property Price" value={price} onChange={setPrice} min={500000} max={30000000} step={100000} format={(v) => `AED ${v.toLocaleString()}`} icon={Home} />
                <Slider label="Down Payment" value={downPayment} onChange={setDownPayment} min={10} max={100} step={5} format={(v) => `${v}% (AED ${(price * v / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })})`} icon={Wallet} />
                <Slider label="Mortgage Rate" value={mortgageRate} onChange={setMortgageRate} min={2} max={10} step={0.1} format={(v) => `${v.toFixed(1)}%`} icon={Percent} />
                <Slider label="Annual Rental Income" value={rentalIncome} onChange={setRentalIncome} min={0} max={2000000} step={10000} format={(v) => `AED ${v.toLocaleString()}`} icon={DollarSign} />
                <Slider label="Annual Property Expenses" value={expenses} onChange={setExpenses} min={0} max={200000} step={1000} format={(v) => `AED ${v.toLocaleString()}`} icon={DollarSign} />
                <Slider label="Expected Annual Appreciation" value={appreciation} onChange={setAppreciation} min={0} max={15} step={0.5} format={(v) => `${v}%`} icon={TrendingUp} />
              </div>
            </Reveal>

            {/* Results */}
            <Reveal delay={150}>
              <div className="rounded-3xl bg-navy-900 text-white p-6 lg:p-8 shadow-card-hover h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Your Results</h2>
                </div>

                {/* ROI Circle */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                      <circle
                        cx="50" cy="50" r="44" fill="none" stroke="#C9A45C" strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={`${Math.min(Math.abs(results.roi) * 10, 276)} 276`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-gold">
                        <AnimatedNumber value={results.roi} decimals={1} suffix="%" />
                      </div>
                      <div className="text-xs text-white/50 mt-1">Estimated ROI</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ResultCard label="Annual Rental Yield" value={<AnimatedNumber value={results.rentalYield} decimals={1} suffix="%" />} />
                  <ResultCard label="Annual Cash Flow" value={<AnimatedNumber value={results.annualCashFlow} prefix="AED " />} />
                  <ResultCard label="5-Year Property Value" value={<AnimatedNumber value={results.fiveYearValue} prefix="AED " />} />
                  <ResultCard label="5-Year Total Return" value={<AnimatedNumber value={results.totalReturn} prefix="AED " />} />
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-white/50 mb-1">Down Payment Required</div>
                  <div className="text-lg font-bold text-gold">AED {results.downPaymentAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <div className="text-xs text-white/50 mt-2">Loan Amount: AED {results.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>

                <p className="mt-6 text-xs text-white/40 leading-relaxed">
                  * These estimates are for illustration only and do not constitute financial advice. Actual returns may vary based on market conditions, fees, and other factors.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function Slider({ label, value, onChange, min, max, step, format, icon: Icon }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; format: (v: number) => string; icon: any
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-sm font-medium text-navy-700">
          <Icon className="w-4 h-4 text-navy-400" strokeWidth={1.5} />
          {label}
        </label>
        <span className="text-sm font-bold text-navy-900">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #C9A45C ${pct}%, #EEF4F8 ${pct}%)`,
        }}
      />
    </div>
  )
}

function ResultCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <div className="text-xs text-white/50 mb-1">{label}</div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  )
}
