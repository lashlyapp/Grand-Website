import { site } from "@/content/site";

// Compact review-rating badges (Google + TripAdvisor) for the hero, shown
// alongside the booking widget as social proof. Ratings are configured in
// content/site.ts.
export default function HeroReviews() {
  const { google, tripadvisor } = site.reviews;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <RatingBadge
        label="Google"
        rating={google.rating}
        count={google.count}
        href={google.url}
      />
      <RatingBadge
        label="TripAdvisor"
        rating={tripadvisor.rating}
        count={tripadvisor.count}
        href={tripadvisor.url}
      />
    </div>
  );
}

function RatingBadge({
  label,
  rating,
  count,
  href,
}: {
  label: string;
  rating: number;
  count: number;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-full bg-white/95 px-4 py-2 shadow-md backdrop-blur transition-colors hover:bg-white"
      aria-label={`${label} rating ${rating} out of 5 from ${count}+ reviews`}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-ink/70">
        {label}
      </span>
      <Stars rating={rating} />
      <span className="text-sm font-semibold text-ink">{rating.toFixed(1)}</span>
      <span className="hidden text-xs text-ink/50 sm:inline">
        {count.toLocaleString()}+ reviews
      </span>
    </a>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="absolute inset-0 text-ink/20" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star className="text-gold" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`h-3.5 w-3.5 ${className}`}>
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.98 4.8 17.5l.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
    </svg>
  );
}
