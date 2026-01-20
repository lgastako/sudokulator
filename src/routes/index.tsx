import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SumControls } from '@/components/SumControls'
import { DigitSelector } from '@/components/DigitSelector'
import { ResultsList } from '@/components/ResultsList'
import { useCombinationCalculator } from '@/hooks/useCombinationCalculator'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [sum, setSum] = useState(11)
  const [count, setCount] = useState(3)
  const [includeDigits, setIncludeDigits] = useState(new Set<number>())
  const [excludeDigits, setExcludeDigits] = useState(new Set<number>())
  const [struckCombinations, setStruckCombinations] = useState(new Set<string>())

  const { allCombinations, filteredCombinations } = useCombinationCalculator({
    sum,
    count,
    includeDigits,
    excludeDigits,
  })

  const handleIncludeChange = (digit: number, included: boolean) => {
    setIncludeDigits(prev => {
      const newSet = new Set(prev)
      if (included) {
        newSet.add(digit)
      } else {
        newSet.delete(digit)
      }
      return newSet
    })
  }

  const handleExcludeChange = (digit: number, excluded: boolean) => {
    setExcludeDigits(prev => {
      const newSet = new Set(prev)
      if (excluded) {
        newSet.add(digit)
      } else {
        newSet.delete(digit)
      }
      return newSet
    })
  }

  const handleClearInclude = () => setIncludeDigits(new Set())
  const handleClearExclude = () => setExcludeDigits(new Set())

  const handleToggleStruck = (combo: number[]) => {
    const key = combo.join(',')
    setStruckCombinations(prev => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  useKeyboardShortcuts({
    includeDigits,
    excludeDigits,
    onIncludeChange: handleIncludeChange,
    onExcludeChange: handleExcludeChange,
  })

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-center text-4xl font-bold text-white mb-8 -mt-6">
          Sudokulator
        </h1>

        <SumControls
          sum={sum}
          count={count}
          onSumChange={setSum}
          onCountChange={setCount}
        />

        <DigitSelector
          includeDigits={includeDigits}
          excludeDigits={excludeDigits}
          onIncludeChange={handleIncludeChange}
          onExcludeChange={handleExcludeChange}
          onClearInclude={handleClearInclude}
          onClearExclude={handleClearExclude}
        />

        <ResultsList
          combinations={allCombinations}
          filteredCombinations={filteredCombinations}
          struckCombinations={struckCombinations}
          onToggleStruck={handleToggleStruck}
        />
      </div>
    </div>
  )
}
