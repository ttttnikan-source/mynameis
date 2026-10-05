import { Link } from 'react-router-dom'
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react'
import { Property } from '../data/properties'
import { useFavorites } from '../context/FavoritesContext'

export default function PropertyCard({ property, className = '' }: { property: Property; className?: string }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(property.id)

  return (
    <Link
      to={`/properties/${property.slug}`}
      className={`group block rounded-3xl bg-white shadow-card hover:shadow-card-hover transition-all duration-400 overflow-hidden hover:-translate-y-1 ${className}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-navy-900/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 border border-white/10">
            {property.propertyType}
          </span>
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(property.id) }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/25 transition-all"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`w-4 h-4 transition-all ${fav ? 'fill-gold text-gold' : 'text-white'}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Bottom info on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-lg font-bold leading-tight mb-1">{property.title}</h3>
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
            <span>{property.location}</span>
          </div>
          <div className="mt-2 text-gold font-bold text-xl">{property.priceLabel}</div>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4 text-sm text-navy-500">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" strokeWidth={1.5} />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="w-px h-4 bg-navy-100" />
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" strokeWidth={1.5} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="w-px h-4 bg-navy-100" />
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" strokeWidth={1.5} />
            <span>{property.area.toLocaleString()} sq.ft</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-navy-50 flex items-center justify-between">
          {property.offPlan && (
            <span className="text-xs font-semibold text-gold uppercase tracking-wide">Off-Plan</span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold transition-colors">
            View Property
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  )
}
