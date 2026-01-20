interface ResultsListProps {
  combinations: number[][]
  filteredCombinations: Set<string>
  excludedCombinations: Set<string>
  struckCombinations: Set<string>
  onToggleStruck: (combo: number[]) => void
}

export function ResultsList({
  combinations,
  filteredCombinations,
  excludedCombinations,
  struckCombinations,
  onToggleStruck,
}: ResultsListProps) {
  const comboKey = (combo: number[]) => combo.join(',')

  const handleComboClick = (combo: number[]) => {
    const key = comboKey(combo)

    // Only allow toggling if the combination passes the current filters (not excluded)
    if (filteredCombinations.has(key)) {
      onToggleStruck(combo)
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
      <div className="text-center text-gray-600 mb-4">
        Showing <strong>{combinations.length}</strong> total combinations
        {filteredCombinations.size < combinations.length && (
          <span>
            {' '}(<strong>{filteredCombinations.size}</strong> matching
            {excludedCombinations.size > 0 && (
              <span>, <strong>{excludedCombinations.size}</strong> excluded</span>
            )})
          </span>
        )}
      </div>

      <div className="space-y-1">
        {combinations.length > 0 ? (
          combinations.map((combo) => {
            const key = comboKey(combo)
            const isFiltered = filteredCombinations.has(key)
            const isExcluded = excludedCombinations.has(key)
            const isManuallyStruck = struckCombinations.has(key)

            // Determine the display state
            let displayClass = ''
            let titleText = ''
            let isClickable = false

            if (isExcluded) {
              // Excluded combinations are grayed out but visible
              displayClass = 'text-gray-400 bg-gray-50 italic'
              titleText = 'Contains excluded digits'
              isClickable = false
            } else if (isFiltered) {
              // Filtered combinations can be struck manually
              if (isManuallyStruck) {
                displayClass = 'line-through italic text-gray-500 bg-gray-50'
                titleText = 'Click to remove strike'
              } else {
                displayClass = 'text-gray-900 hover:bg-blue-50'
                titleText = 'Click to strike out'
              }
              isClickable = true
            } else {
              // Combinations that don't match includes (but aren't excluded)
              displayClass = 'text-gray-400 bg-gray-50'
              titleText = 'Does not match include criteria'
              isClickable = false
            }

            return (
              <div
                key={key}
                onClick={() => handleComboClick(combo)}
                className={`
                  font-mono transition-all duration-150 ease-in-out
                  p-2 rounded
                  ${displayClass}
                  ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                `}
                title={titleText}
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