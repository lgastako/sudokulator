interface DigitSelectorProps {
  includeDigits: Set<number>
  excludeDigits: Set<number>
  onIncludeChange: (digit: number, included: boolean) => void
  onExcludeChange: (digit: number, excluded: boolean) => void
  onClearInclude: () => void
  onClearExclude: () => void
}

export function DigitSelector({
  includeDigits,
  excludeDigits,
  onIncludeChange,
  onExcludeChange,
  onClearInclude,
  onClearExclude,
}: DigitSelectorProps) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const handleIncludeClick = (digit: number) => {
    const newIncluded = !includeDigits.has(digit)
    onIncludeChange(digit, newIncluded)

    // If including, remove from exclude
    if (newIncluded && excludeDigits.has(digit)) {
      onExcludeChange(digit, false)
    }
  }

  const handleExcludeClick = (digit: number) => {
    const newExcluded = !excludeDigits.has(digit)
    onExcludeChange(digit, newExcluded)

    // If excluding, remove from include
    if (newExcluded && includeDigits.has(digit)) {
      onIncludeChange(digit, false)
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
      <fieldset className="border border-gray-300 rounded-md p-3 mb-4">
        <legend className="px-2 font-semibold text-gray-600">Including digits</legend>
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-9 gap-2 flex-1">
            {digits.map((digit) => (
              <button
                key={digit}
                onClick={() => handleIncludeClick(digit)}
                className={`
                  flex items-center justify-center py-2 rounded-md font-medium cursor-pointer
                  select-none transition-all duration-150 ease-in-out
                  hover:scale-95 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  ${
                    includeDigits.has(digit)
                      ? 'bg-green-100 border border-green-400 text-green-800 font-semibold'
                      : 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-blue-50'
                  }
                `}
              >
                {digit}
              </button>
            ))}
          </div>
          <button
            onClick={onClearInclude}
            className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-md hover:bg-gray-100 whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md p-3">
        <legend className="px-2 font-semibold text-gray-600">Excluding digits</legend>
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-9 gap-2 flex-1">
            {digits.map((digit) => (
              <button
                key={digit}
                onClick={() => handleExcludeClick(digit)}
                className={`
                  flex items-center justify-center py-2 rounded-md font-medium cursor-pointer
                  select-none transition-all duration-150 ease-in-out
                  hover:scale-95 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  ${
                    excludeDigits.has(digit)
                      ? 'bg-red-100 border border-red-400 text-red-800 font-semibold'
                      : 'bg-gray-50 border border-gray-300 text-gray-700 hover:bg-blue-50'
                  }
                `}
              >
                {digit}
              </button>
            ))}
          </div>
          <button
            onClick={onClearExclude}
            className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-md hover:bg-gray-100 whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      </fieldset>
    </div>
  )
}