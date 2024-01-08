import React, { useState, ChangeEvent } from 'react'

interface AutocompleteProps {
  suggestions: string[]
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    // Filter suggestions based on input value
    const filtered = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    setFilteredSuggestions(filtered)
  }

  const handleSuggestionClick = (suggestion: string) => {
    // Handle suggestion click (you can update the input value, perform an action, etc.)
    setInputValue(suggestion)
    setFilteredSuggestions([]) // Clear suggestions
  }

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Type to search...'
      />
      <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Example usage:
const suggestions: string[] = [
  'Apple',
  'Banana',
  'Orange',
  'Mango',
  'Pineapple',
]

const Test: React.FC = () => {
  return (
    <div>
      <h1>Autocomplete Example</h1>
      <Autocomplete suggestions={suggestions} />
    </div>
  )
}

export default Test
