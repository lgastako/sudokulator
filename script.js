;(function () {
  const sumRange = document.getElementById('sum-range')
  const sumNumber = document.getElementById('sum-number')

  const countRange = document.getElementById('count-range')
  const countNumber = document.getElementById('count-number')

  const include = document.querySelectorAll("input[name='include']")
  const exclude = document.querySelectorAll("input[name='exclude']")

  const clearInclude = document.getElementById('clear-include')
  const clearExclude = document.getElementById('clear-exclude')

  sumNumber.value = sumRange.value
  countNumber.value = countRange.value

  sumRange.addEventListener('input', () => {
    sumNumber.value = sumRange.value
  })

  countRange.addEventListener('input', () => {
    countNumber.value = countRange.value
  })

  include.forEach(input => {
    input.addEventListener('change', () => {
      console.log(`include: ${input.value}: ${input.checked}`)
      if (input.checked) {
        document.getElementById(`exclude-${input.value}`).checked = false
      }
    })
  })

  exclude.forEach(input => {
    input.addEventListener('change', () => {
      console.log(`exclude: ${input.value}: ${input.checked}`)
      if (input.checked) {
        document.getElementById(`include-${input.value}`).checked = false
      }
    })
  })

  clearInclude.addEventListener('click', () => {
    include.forEach(input => {
      input.checked = false
    })
  })

  clearExclude.addEventListener('click', () => {
    exclude.forEach(input => {
      input.checked = false
    })
  })
  const generateCombinations = (count, allowedDigits) => {
    const results = []

    const backtrack = (startIdx, combo) => {
      if (combo.length === count) {
        results.push(combo.slice())
        return
      }

      // ensure we can still reach 'count' items
      for (let i = startIdx; i < allowedDigits.length; i++) {
        combo.push(allowedDigits[i])
        backtrack(i + 1, combo) // i+1 => no repeats, unordered combos
        combo.pop()
      }
    }

    backtrack(0, [])
    return results
  }

  const calculateCombinations = () => {
    console.log('calculateCombinations')

    const targetSum = parseInt(sumNumber.value, 10)
    const targetCount = parseInt(countNumber.value, 10)

    const includeDigits = Array.from(include)
      .filter(input => input.checked)
      .map(input => parseInt(input.value, 10))

    const excludeDigits = new Set(
      Array.from(exclude)
        .filter(input => input.checked)
        .map(input => parseInt(input.value, 10))
    )

    // Basic sanity checks
    if (includeDigits.length > targetCount) {
      console.log('No combos: more required digits than the count.')
      return
    }
    for (const d of includeDigits) {
      if (excludeDigits.has(d)) {
        console.log('No combos: a digit is both included and excluded.')
        return
      }
    }

    // Allowed digits are 1..9 minus excluded
    const allowedDigits = []
    for (let d = 1; d <= 9; d++) {
      if (!excludeDigits.has(d)) allowedDigits.push(d)
    }

    // Generate all possible combos of the correct size
    const combinations = generateCombinations(targetCount, allowedDigits)

    // Filter by includes + sum
    const includeSet = new Set(includeDigits)
    const filtered = combinations.filter(combo => {
      // must contain all include digits
      for (const d of includeSet) {
        if (!combo.includes(d)) return false
      }
      // must sum to target
      const s = combo.reduce((acc, x) => acc + x, 0)
      return s === targetSum
    })

    console.log(`Found ${filtered.length} combinations:`)
    console.log(filtered)

    document.getElementById('results').innerHTML =
      filtered.length > 0
        ? filtered.map(combo => combo.join(', ')).join('<br>')
        : 'No combinations found'
  }

  // When anything changes, calculate the combinations
  document.addEventListener('change', () => {
    console.log('change')
    calculateCombinations()
  })

  calculateCombinations()
})()
