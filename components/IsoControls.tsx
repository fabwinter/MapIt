const ranges = [5, 10, 15];

export default function IsoControls({ onSelect }: { onSelect: (m: number) => void }) {
  return (
    <div className="absolute top-4 left-4 bg-white shadow p-2 rounded space-x-2">
      {ranges.map(r => (
        <button
          key={r}
          onClick={() => onSelect(r)}
          className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {r} min
        </button>
      ))}
    </div>
  );
}
