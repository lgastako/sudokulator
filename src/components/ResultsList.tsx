interface ResultsListProps {
  combinations: number[][]
  filteredCombinations: Set<string>
  struckCombinations: Set<string>
  onToggleStruck: (combo: number[]) => void
}

export function ResultsList({
  combinations,
  filteredCombinations,
  struckCombinations,
  onToggleStruck,
}: ResultsListProps) {
  const comboKey = (combo: number[]) => combo.join(',')

  const handleComboClick = (combo: number[]) => {
    const key = comboKey(combo)

    // Only allow toggling if the combination passes the current filters
    if (filteredCombinations.has(key)) {
      onToggleStruck(combo)
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
      <div className="text-center text-gray-600 mb-4">
        Showing <strong>{combinations.length}</strong> total combinations
        {filteredCombinations.size < combinations.length && (
          <span> (filtered to <strong>{filteredCombinations.size}</strong> matching)</span>
        )}
      </div>

      <div className="space-y-1">
        {combinations.length > 0 ? (
          combinations.map((combo) => {
            const key = comboKey(combo)
            const isFiltered = filteredCombinations.has(key)
            const isManuallyStruck = struckCombinations.has(key)
            const isStruck = !isFiltered || isManuallyStruck

            return (
              <div
                key={key}
                onClick={() => handleComboClick(combo)}
                className={`
                  font-mono cursor-pointer transition-all duration-150 ease-in-out
                  p-2 rounded
                  ${
                    isStruck
                      ? 'line-through italic text-gray-500 bg-gray-50'
                      : 'text-gray-900 hover:bg-blue-50'
                  }
                  ${isFiltered ? 'hover:bg-blue-50' : 'cursor-not-allowed'}
                `}
                title={
                  isFiltered
                    ? 'Click to strike out'
                    : 'Filtered out - adjust filters to interact'
                }
              >
                {combo.join(', ')}
              </div>
            )
          })
        ) : (
          <div className="text-gray-500 text-center py-4">No combinations found</div>
        )}
      </div>
    </div>
  )
}