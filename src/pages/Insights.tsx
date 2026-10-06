import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, Calendar, Tag, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { articles, getArticleBySlug } from '../data/articles'

export default function Insights() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeArticle, setActiveArticle] = useState(slug ? getArticleBySlug(slug) : undefined)

  if (activeArticle) {
    return (
      <>
        <section className="pt-28 pb-12 bg-navy-900 text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <button onClick={() => { setActiveArticle(undefined); navigate('/insights') }} className="flex items-center gap-2 text-sm text-white/60 hover:text-gold mb-5 transition-colors">
              <X className="w-4 h-4" /> Back to Insights
            </button>
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-gold/15 text-gold text-xs font-semibold px-3 py-1.5">{activeArticle.category}</span>
              <span className="flex items-center gap-1.5 text-xs text-white/50">
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} /> {activeArticle.date}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">{activeArticle.title}</h1>
            <p className="text-white/60 leading-relaxed">{activeArticle.excerpt}</p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden mb-8">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-64 lg:h-80 object-cover" />
            </div>
            <div className="space-y-5">
              {activeArticle.content.map((p, i) => (
                <p key={i} className="text-navy-500 leading-relaxed text-base">{p}</p>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-navy-50">
              <h3 className="text-lg font-bold text-navy-900 mb-4">More Articles</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {articles.filter(a => a.id !== activeArticle.id).slice(0, 2).map(a => (
                  <button key={a.id} onClick={() => { setActiveArticle(a); window.scrollTo(0, 0) }} className="group text-left rounded-2xl border border-navy-50 overflow-hidden hover:shadow-card transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-navy-400 mb-1">{a.date}</div>
                      <h4 className="font-bold text-navy-900 group-hover:text-gold transition-colors text-sm">{a.title}</h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Market Knowledge"
        title="Insights"
        subtitle="Expert analysis, guides and market intelligence for Dubai real estate."
        image="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1920&q=80"
      />
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          {/* Featured article */}
          {articles[0] && (
            <Reveal>
              <button onClick={() => setActiveArticle(articles[0])} className="group block w-full text-left mb-12 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400">
                <div className="grid lg:grid-cols-2">
                  <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
                    <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 rounded-full bg-navy-900/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5">{articles[0].category}</span>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="text-xs text-navy-400 mb-2">{articles[0].date}</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-3 group-hover:text-gold transition-colors">{articles[0].title}</h2>
                    <p className="text-navy-400 leading-relaxed mb-5">{articles[0].excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          )}

          <SectionHeading eyebrow="All Articles" title="Latest Insights" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((a, i) => (
              <Reveal key={a.id} delay={i * 100}>
                <button onClick={() => setActiveArticle(a)} className="group block text-left w-full rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 rounded-full bg-navy-900/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5">{a.category}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-navy-400 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" strokeWidth={1.5} /> {a.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-gold transition-colors">{a.title}</h3>
                    <p className="text-sm text-navy-400 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
