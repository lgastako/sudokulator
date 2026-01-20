import { useState, useEffect } from 'react'

interface SumControlsProps {
  sum: number
  count: number
  onSumChange: (sum: number) => void
  onCountChange: (count: number) => void
}

export function SumControls({ sum, count, onSumChange, onCountChange }: SumControlsProps) {
  const [sumInput, setSumInput] = useState(sum.toString())
  const [countInput, setCountInput] = useState(count.toString())

  useEffect(() => {
    setSumInput(sum.toString())
  }, [sum])

  useEffect(() => {
    setCountInput(count.toString())
  }, [count])

  const handleSumInputChange = (value: string) => {
    setSumInput(value)
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 405) {
      onSumChange(numValue)
    }
  }

  const handleCountInputChange = (value: string) => {
    setCountInput(value)
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 9) {
      onCountChange(numValue)
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Find combinations that sum to
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="405"
              value={sumInput}
              onChange={(e) => handleSumInputChange(e.target.value)}
              className="flex-none w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="range"
              min="1"
              max="405"
              value={sum}
              onChange={(e) => onSumChange(parseInt(e.target.value, 10))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Using this number of digits
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="9"
              value={countInput}
              onChange={(e) => handleCountInputChange(e.target.value)}
              className="flex-none w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="range"
              min="1"
              max="9"
              value={count}
              onChange={(e) => onCountChange(parseInt(e.target.value, 10))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  )
}