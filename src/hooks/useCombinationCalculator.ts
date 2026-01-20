import { useMemo } from 'react'

interface CalculatorParams {
  sum: number
  count: number
  includeDigits: Set<number>
  excludeDigits: Set<number>
}

interface CalculatorResult {
  validCombinations: number[][]
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
      return { validCombinations: [], filteredCombinations: new Set() }
    }

    // Check for conflicts between include and exclude
    for (const digit of includeDigits) {
      if (excludeDigits.has(digit)) {
        return { validCombinations: [], filteredCombinations: new Set() }
      }
    }

    // Get allowed digits (1-9 minus excluded)
    const allowedDigits: number[] = []
    for (let d = 1; d <= 9; d++) {
      if (!excludeDigits.has(d)) {
        allowedDigits.push(d)
      }
    }

    // Generate all combinations of the correct size that sum to the target
    const generateValidCombinations = (targetCount: number, digits: number[], targetSum: number): number[][] => {
      const results: number[][] = []

      const backtrack = (startIdx: number, combo: number[], currentSum: number) => {
        if (combo.length === targetCount) {
          if (currentSum === targetSum) {
            results.push([...combo])
          }
          return
        }

        // Early termination if we can't reach target sum
        const remaining = targetCount - combo.length
        if (remaining > 0) {
          const minPossibleSum = currentSum + digits.slice(startIdx).slice(0, remaining).reduce((a, b) => a + b, 0)
          const maxPossibleSum = currentSum + digits.slice(-remaining).reduce((a, b) => a + b, 0)

          if (targetSum < minPossibleSum || targetSum > maxPossibleSum) {
            return
          }
        }

        for (let i = startIdx; i < digits.length; i++) {
          combo.push(digits[i])
          backtrack(i + 1, combo, currentSum + digits[i])
          combo.pop()
        }
      }

      backtrack(0, [], 0)
      return results
    }

    const validCombinations = generateValidCombinations(count, allowedDigits, sum)

    // Filter by includes - all combinations already sum to target
    const filteredCombinations = new Set<string>()

    for (const combo of validCombinations) {
      // Must contain all include digits
      let hasAllIncludes = true
      for (const digit of includeDigits) {
        if (!combo.includes(digit)) {
          hasAllIncludes = false
          break
        }
      }

      if (hasAllIncludes) {
        filteredCombinations.add(combo.join(','))
      }
    }

    return { validCombinations, filteredCombinations }
  }, [sum, count, includeDigits, excludeDigits])
}