interface ExcludedDigitsDisplayProps {
  excludedDigits: number[]
}

export function ExcludedDigitsDisplay({ excludedDigits }: ExcludedDigitsDisplayProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
      <div className="text-center text-gray-600 mb-4">
        <strong>Excluded Digits</strong>
      </div>

      <div className="text-center">
        {excludedDigits.length > 0 ? (
          <div className="text-red-600 font-mono text-lg">
            {excludedDigits.join(', ')}
          </div>
        ) : (
          <div className="text-gray-500 italic">
            No numbers are excluded from the valid combinations below.
          </div>
        )}
      </div>
    </div>
  )
}