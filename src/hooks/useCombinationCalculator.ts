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
  excludedCombinations: Set<string>
  completelyExcludedDigits: number[]
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
      return { validCombinations: [], filteredCombinations: new Set(), excludedCombinations: new Set(), completelyExcludedDigits: [] }
    }

    // Check for conflicts between include and exclude
    for (const digit of includeDigits) {
      if (excludeDigits.has(digit)) {
        return { validCombinations: [], filteredCombinations: new Set(), excludedCombinations: new Set(), completelyExcludedDigits: [] }
      }
    }

    // Generate all combinations using all digits 1-9 (not filtering by exclude yet)
    const allDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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

    const validCombinations = generateValidCombinations(count, allDigits, sum)

    // Separate combinations into filtered (meets include/exclude criteria) and excluded sets
    const filteredCombinations = new Set<string>()
    const excludedCombinations = new Set<string>()

    for (const combo of validCombinations) {
      const comboKey = combo.join(',')

      // Check if contains excluded digits
      let hasExcludedDigit = false
      for (const digit of excludeDigits) {
        if (combo.includes(digit)) {
          hasExcludedDigit = true
          break
        }
      }

      // Check if contains all required include digits
      let hasAllIncludes = true
      for (const digit of includeDigits) {
        if (!combo.includes(digit)) {
          hasAllIncludes = false
          break
        }
      }

      if (hasExcludedDigit) {
        excludedCombinations.add(comboKey)
      } else if (hasAllIncludes) {
        filteredCombinations.add(comboKey)
      }
    }

    // Calculate digits that appear in no valid combinations
    const digitsInCombinations = new Set<number>()
    for (const combo of validCombinations) {
      for (const digit of combo) {
        digitsInCombinations.add(digit)
      }
    }

    const completelyExcludedDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .filter(digit => !digitsInCombinations.has(digit))
      .sort()

    return { validCombinations, filteredCombinations, excludedCombinations, completelyExcludedDigits }
  }, [sum, count, includeDigits, excludeDigits])
}