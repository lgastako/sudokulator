import { useEffect } from 'react'

interface KeyboardShortcutsProps {
  includeDigits: Set<number>
  excludeDigits: Set<number>
  onIncludeChange: (digit: number, included: boolean) => void
  onExcludeChange: (digit: number, excluded: boolean) => void
}

export function useKeyboardShortcuts({
  includeDigits,
  excludeDigits,
  onIncludeChange,
  onExcludeChange,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const digit = parseInt(e.key, 10)
      if (isNaN(digit) || digit < 1 || digit > 9) {
        return
      }

      // Toggle include first; if already included, toggle exclude
      if (!includeDigits.has(digit)) {
        onIncludeChange(digit, true)
        // Remove from exclude if it was there
        if (excludeDigits.has(digit)) {
          onExcludeChange(digit, false)
        }
      } else {
        // Already included, so toggle exclude instead
        const newExcluded = !excludeDigits.has(digit)
        onExcludeChange(digit, newExcluded)
        // Remove from include if we're excluding
        if (newExcluded) {
          onIncludeChange(digit, false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [includeDigits, excludeDigits, onIncludeChange, onExcludeChange])
}