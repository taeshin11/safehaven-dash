export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-(--color-bg-primary)">
      <main className="flex flex-col items-center justify-center gap-6 py-32 px-8 text-center">
        <h1 className="font-(family-name:--font-heading) text-4xl font-bold text-(--color-text-primary)">
          SafeHaven Dash
        </h1>
        <p className="text-lg text-(--color-text-secondary) max-w-md">
          Real-time gold &amp; safe-haven currency dashboard with Fear Gauge index.
        </p>
        <div className="flex gap-4">
          <span className="inline-block w-4 h-4 rounded-full bg-(--color-fear-calm)" />
          <span className="inline-block w-4 h-4 rounded-full bg-(--color-fear-caution)" />
          <span className="inline-block w-4 h-4 rounded-full bg-(--color-fear-fear)" />
        </div>
        <p className="text-sm text-(--color-text-secondary)">
          Setting up... Dashboard coming soon.
        </p>
      </main>
    </div>
  );
}
