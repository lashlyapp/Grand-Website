// Brand marks used for review-source attribution (Google, Tripadvisor). The
// Google "G" is the standard multicolor mark; the Tripadvisor owl is a light
// inline recreation. Swap in official SVG assets if brand files are available.

export function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 normal-case tracking-normal ${className}`}>
      <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
      </svg>
      <span className="text-sm font-medium text-ink/70">Google</span>
    </span>
  );
}

export function TripadvisorLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 normal-case tracking-normal ${className}`}>
      <svg viewBox="0 0 32 32" className="h-4 w-4 shrink-0" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="15" ry="13" fill="#34E0A1" />
        <circle cx="10.5" cy="15.5" r="5" fill="#fff" />
        <circle cx="10.5" cy="15.5" r="2.1" fill="#0a352a" />
        <circle cx="21.5" cy="15.5" r="5" fill="#fff" />
        <circle cx="21.5" cy="15.5" r="2.1" fill="#0a352a" />
        <path d="M16 19l-2.4 3h4.8z" fill="#0a352a" />
      </svg>
      <span className="text-sm font-medium text-ink/70">Tripadvisor</span>
    </span>
  );
}
