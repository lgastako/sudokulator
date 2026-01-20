import { useMemo } from 'react'

interface CalculatorParams {
  sum: number
  count: number
  includeDigits: Set<number>
  excludeDigits: Set<number>
}

interface CalculatorResult {
  allCombinations: number[][]
  filteredCombinations: Set<string>
}

export function useCombinationCalculator({
  sum,
  count,
  includeDigits,
  excludeDigits,
}: CalculatorParams): CalculatorResult {
  return useMemo(() => {
    // Basic sanity checks
    if (includeDigits.size > count) {
      return { allCombinations: [], filteredCombinations: new Set() }
    }

    // Check for conflicts between include and exclude
    for (const digit of includeDigits) {
      if (excludeDigits.has(digit)) {
        return { allCombinations: [], filteredCombinations: new Set() }
      }
    }

    // Get allowed digits (1-9 minus excluded)
    const allowedDigits: number[] = []
    for (let d = 1; d <= 9; d++) {
      if (!excludeDigits.has(d)) {
        allowedDigits.push(d)
      }
    }

    // Generate all combinations of the correct size
    const generateCombinations = (targetCount: number, digits: number[]): number[][] => {
      const results: number[][] = []

      const backtrack = (startIdx: number, combo: number[]) => {
        if (combo.length === targetCount) {
          results.push([...combo])
          return
        }

        for (let i = startIdx; i < digits.length; i++) {
          combo.push(digits[i])
          backtrack(i + 1, combo)
          combo.pop()
        }
      }

      backtrack(0, [])
      return results
    }

    const allCombinations = generateCombinations(count, allowedDigits)

    // Filter by includes + sum
    const filteredCombinations = new Set<string>()

    for (const combo of allCombinations) {
      // Must contain all include digits
      let hasAllIncludes = true
      for (const digit of includeDigits) {
        if (!combo.includes(digit)) {
          hasAllIncludes = false
          break
        }
      }

      if (!hasAllIncludes) continue

      // Must sum to target
      const comboSum = combo.reduce((acc, x) => acc + x, 0)
      if (comboSum === sum) {
        filteredCombinations.add(combo.join(','))
      }
    }

    return { allCombinations, filteredCombinations }
  }, [sum, count, includeDigits, excludeDigits])
}