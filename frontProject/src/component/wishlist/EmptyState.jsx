export default function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <div className="text-3xl">🌟</div>
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600 mt-1">{subtitle}</p>
      {actionLabel && onAction ? (
        <button onClick={onAction} className="mt-4 px-4 py-2 rounded-lg border">{actionLabel}</button>
      ) : null}
    </div>
  );
}
