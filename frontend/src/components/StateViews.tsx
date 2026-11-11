export function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-[240px] items-center justify-center" role="status" aria-live="polite">
      <span className="text-[11px] uppercase tracking-widest2 text-taupe">{label}…</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-5 text-center" role="alert">
      <p className="max-w-md text-sm text-brown">{message}</p>
      {onRetry && <button type="button" className="btn btn-line" onClick={onRetry}>Try again</button>}
    </div>
  );
}
