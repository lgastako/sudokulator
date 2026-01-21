import { useMemo } from 'react'
import type { SavedConfiguration } from '@/hooks/useSavedConfigurations'
import { useCombinationCalculator } from '@/hooks/useCombinationCalculator'

interface StaticSudokuConfigurationProps {
  config: SavedConfiguration
  isPulsingNew?: boolean
  onDelete: () => void
}

export function StaticSudokuConfiguration({ config, isPulsingNew = false, onDelete }: StaticSudokuConfigurationProps) {
  const includeDigitsSet = useMemo(() => new Set(config.includeDigits), [config.includeDigits])
  const excludeDigitsSet = useMemo(() => new Set(config.excludeDigits), [config.excludeDigits])

  const { validCombinations, filteredCombinations, excludedCombinations, completelyExcludedDigits } = useCombinationCalculator({
    sum: config.sum,
    count: config.count,
    includeDigits: includeDigitsSet,
    excludeDigits: excludeDigitsSet,
  })

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const comboKey = (combo: number[]) => combo.join(',')

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this saved configuration?')) {
      onDelete()
    }
  }

  return (
    <div className={`border border-gray-300 rounded-lg shadow-sm mb-4 ${isPulsingNew ? 'animate-pulse bg-blue-50 border-blue-300' : 'bg-gray-50'}`}>
      {/* Header with timestamp and delete button */}
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-300 rounded-t-lg flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Saved: {formatTimestamp(config.timestamp)}
        </div>
        <button
          onClick={handleDelete}
          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          title="Delete this configuration"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        {/* Static Sum Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Find combinations that sum to
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-none w-20 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                  {config.sum}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-lg relative">
                  <div
                    className="absolute h-full bg-indigo-500 rounded-lg"
                    style={{ width: `${(config.sum / 405) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Using this number of digits
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-none w-20 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                  {config.count}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-lg relative">
                  <div
                    className="absolute h-full bg-indigo-500 rounded-lg"
                    style={{ width: `${(config.count / 9) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static Digit Selector */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
          <fieldset className="border border-gray-300 rounded-md p-3 mb-4">
            <legend className="px-2 font-semibold text-gray-600">Including digits</legend>
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-9 gap-2 flex-1">
                {digits.map((digit) => (
                  <div
                    key={digit}
                    className={`
                      flex items-center justify-center py-2 rounded-md font-medium
                      ${
                        includeDigitsSet.has(digit)
                          ? 'bg-green-100 border border-green-400 text-green-800 font-semibold'
                          : 'bg-gray-50 border border-gray-300 text-gray-400'
                      }
                    `}
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-400 whitespace-nowrap">
                Clear
              </div>
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 rounded-md p-3">
            <legend className="px-2 font-semibold text-gray-600">Excluding digits</legend>
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-9 gap-2 flex-1">
                {digits.map((digit) => (
                  <div
                    key={digit}
                    className={`
                      flex items-center justify-center py-2 rounded-md font-medium
                      ${
                        excludeDigitsSet.has(digit)
                          ? 'bg-red-100 border border-red-400 text-red-800 font-semibold'
                          : 'bg-gray-50 border border-gray-300 text-gray-400'
                      }
                    `}
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-400 whitespace-nowrap">
                Clear
              </div>
            </div>
          </fieldset>
        </div>

        {/* Static Excluded Digits Display */}
        {completelyExcludedDigits.length > 0 && (
          <div className="mb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-red-800 font-medium mb-2">
                Completely excluded digits (appear in no valid combinations):
              </div>
              <div className="flex gap-1">
                {completelyExcludedDigits.map((digit) => (
                  <span
                    key={digit}
                    className="inline-flex items-center justify-center w-8 h-8 bg-red-100 border border-red-300 rounded text-red-800 font-semibold text-sm"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Static Results List */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-center text-gray-600 mb-4">
            Showing <strong>{validCombinations.length}</strong> total combinations
            {filteredCombinations.size < validCombinations.length && (
              <span>
                {' '}(<strong>{filteredCombinations.size}</strong> matching
                {excludedCombinations.size > 0 && (
                  <span>, <strong>{excludedCombinations.size}</strong> excluded</span>
                )})
              </span>
            )}
          </div>

          <div className="space-y-1">
            {validCombinations.length > 0 ? (
              validCombinations.map((combo) => {
                const key = comboKey(combo)
                const isFiltered = filteredCombinations.has(key)
                const isExcluded = excludedCombinations.has(key)

                let displayClass = ''
                if (isExcluded) {
                  displayClass = 'text-gray-400 bg-gray-50 italic'
                } else if (isFiltered) {
                  displayClass = 'text-gray-900'
                } else {
                  displayClass = 'text-gray-400 bg-gray-50'
                }

                return (
                  <div
                    key={key}
                    className={`
                      font-mono p-2 rounded cursor-default
                      ${displayClass}
                    `}
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
      </div>
    </div>
  )
}