import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useId,
} from 'react'
import { BiChevronDown, BiChevronUp, BiX } from 'react-icons/bi'

import style from './Select.module.css'
import List from './List'
import type { Response } from '../server/fetchTop100Films'
import convertNumbering from '@/utils/convertNumbering'

export type Options = Array<Option>
export type Option = { value: string; label: string }

type SelectProps = {
  value?: string | null
  options: Options | (() => Promise<Response>)
  onChange?: (payload: Option) => void
  label?: string
}

function Select({
  value,
  options,
  onChange,
  label = 'label',
}: SelectProps): ReactNode {
  const identity = useId()
  const [isLoading, setIsLoading] = useState(false)
  const [dynamicWidth, setDynamicWidth] = useState<number>(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultContainerRef = useRef<HTMLDivElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [selectedOption, setSelectedOption] = useState({ label: '', value: '' })
  const [selectedOptionValue, setSelectedOptionValue] = useState(-1)

  const [filteredSuggestions, setFilteredSuggestions] = useState<Options>([])
  const [absoluteOptions, setAbsoluteOptions] = useState<Options>([])

  // John's NOTE : This Select.tsx component has some logic
  //               1. show the original options / WITHOUT search value
  //               2. show the original options / WITH selected option && focus input again
  //               2. show filtered options / WITH search value
  //               2. show filtered options / WITH selected option && WITH search value
  const logicBehind = // logicBehind applies the logic.
    !inputValue ||
    (selectedOptionValue >= 0 && selectedOption.label == inputValue)

  const optionFromList = logicBehind
    ? absoluteOptions[focusedIndex]
    : filteredSuggestions[focusedIndex]

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true)
    setAnchorEl(true)

    const value = event.target.value
    setInputValue(value)

    const filtered = absoluteOptions.filter((option) =>
      option.label.toLowerCase().trim().includes(value.toLowerCase().trim())
    )

    setFilteredSuggestions(filtered)
  }

  const handleClickOffSelect = () => {
    if (selectedOptionValue === -1) {
      setInputValue('')
      setIsActivated(false)
    }

    if (!anchorEl) {
      setIsFocused(false)
    } else {
      inputRef.current!.focus()
    }

    setAnchorEl(false)
  }

  // As a result, focusedIndex and selectedOptionValue will be the same as this point.
  const handleSuggestionClick = () => {
    const convertedValue = convertNumbering(optionFromList.value)

    setIsActivated(true)
    setInputValue(optionFromList.label)
    setSelectedOptionValue(convertedValue)
    setSelectedOption(optionFromList)
    setFocusedIndex(convertedValue)
    setIsFocused(true)
    onChange?.(optionFromList)
  }

  const handleFieldsetClick = (e: MouseEvent) => {
    e.stopPropagation()

    setIsActivated(true)
    setIsFocused(true)
    inputRef.current!.focus()

    if (selectedOptionValue >= 0) {
      setAnchorEl(true)
    } else {
      setAnchorEl(!anchorEl)
    }
  }

  const handleBiChevronUpClick = (e: MouseEvent) => {
    e.stopPropagation()

    setIsFocused(true)
    inputRef.current!.focus()
    setAnchorEl(!anchorEl)
  }

  const handleBiChevronDownClick = (e: MouseEvent) => {
    e.stopPropagation()

    setIsFocused(true)
    inputRef.current!.focus()
    setAnchorEl(true)
  }

  const handleClearClick = (e: MouseEvent) => {
    e.stopPropagation()

    setInputValue('')
    setSelectedOptionValue(-1)
    inputRef.current!.focus()
    setAnchorEl(false)
    setFocusedIndex(-1)
    setIsFocused(true)
  }

  // As a result, focusedIndex and selectedOptionValue will be the same as this point.
  const handlePressEnter = () => {
    const convertedValue = convertNumbering(optionFromList.value)

    setIsActivated(true)
    setInputValue(optionFromList.label)
    setSelectedOptionValue(convertedValue)
    setSelectedOption(optionFromList)
    setFocusedIndex(convertedValue)
    setAnchorEl(false)

    onChange?.(optionFromList)
  }

  // John's NOTE : Add new function,
  //               Originally, the component doesn't allow you to escape the component by pressing ESC on the keyboard.
  //               Personally I'd prefer to give the user the control to get out of the component.
  //               By pressing ESC twice in a row, the user can escape from the component.
  const handlePressEscape = () => {
    setAnchorEl(false)
    if (!anchorEl) {
      if (selectedOptionValue === -1) {
        setInputValue('')
        setIsActivated(false)
      } else {
        setInputValue(selectedOption.label)
      }
      setIsFocused(false)
      inputRef.current!.blur()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e
    let nextIndexCount = 0

    // move down
    if (key === 'ArrowDown') {
      e.stopPropagation()
      setAnchorEl(true)
      logicBehind
        ? (nextIndexCount = (focusedIndex + 1) % absoluteOptions.length)
        : (nextIndexCount = (focusedIndex + 1) % filteredSuggestions.length)
    }

    // move up
    if (key === 'ArrowUp') {
      e.stopPropagation()
      setAnchorEl(true)
      logicBehind
        ? (nextIndexCount =
            (focusedIndex + absoluteOptions.length - 1) %
            absoluteOptions.length)
        : (nextIndexCount =
            (focusedIndex + filteredSuggestions.length - 1) %
            filteredSuggestions.length)
    }

    // Handle enter and esc
    if (key === 'Enter' || key === 'Escape') {
      e.preventDefault()

      if (key === 'Enter') {
        handlePressEnter()
      } else if (key === 'Escape') {
        handlePressEscape()
      }

      return
    }

    setFocusedIndex(nextIndexCount)
  }

  const handleOnMouseOver = (e: MouseEvent) => {
    // Get id (which is generated by index) from the option
    const nextIndexCount = parseInt(e.currentTarget.id.split('-')[1])
    setFocusedIndex(nextIndexCount)
  }

  useEffect(() => {
    // If the component has value set, inject!
    const injectValue = (options: Options, value: string) => {
      const convertedValue = convertNumbering(value)
      const option = options[convertedValue]
      const optionIndex = options.indexOf(option)

      setIsActivated(true)
      setInputValue(option.label)

      setSelectedOptionValue(optionIndex)
      setSelectedOption(option)
    }

    // Finding the longest label to generate dynamic width for the component.
    const findLongestLabel = (options: Options): Option => {
      const longest = options.reduce(function (a, b) {
        return a.label.length > b.label.length ? a : b
      })
      return longest
    }

    if (Array.isArray(options)) {
      setAbsoluteOptions(options)
      setDynamicWidth(findLongestLabel(options).label.length * 8.5)
      if (value) {
        injectValue(options, value)
      }
    } else {
      const fetchOptions = async () => {
        setIsLoading(true)

        try {
          const response = await options()
          const optionsResponse = response.res.result as Options
          setDynamicWidth(findLongestLabel(optionsResponse).label.length * 8.5)
          setAbsoluteOptions(optionsResponse)
          if (value) {
            injectValue(optionsResponse, value)
          }
        } catch (e: any) {
          // Error handle
        } finally {
          setIsLoading(false)
        }
      }

      fetchOptions()
    }
  }, [])
  // Scroll to the focusedIndex when handleKeyDown runs.
  useEffect(() => {
    if (!resultContainerRef.current) {
      return
    } else {
      resultContainerRef.current.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [focusedIndex, anchorEl])

  return (
    <>
      {!isLoading ? (
        <div
          role='select'
          id={`input-box-${identity}`}
          key={`input-box-${identity}`}
          className={style.inputBox}
          style={{ width: dynamicWidth }}
          tabIndex={1}
          onBlur={handleClickOffSelect}
          onKeyDown={handleKeyDown}
        >
          <fieldset
            role='fieldset'
            id={`fieldset-${identity}`}
            key={`fieldset-${identity}`}
            className={isFocused ? style.fieldsetFocused : ''}
            onClick={handleFieldsetClick}
          >
            <input
              ref={inputRef}
              value={inputValue}
              key={`input-${identity}`}
              role='input'
              type='text'
              required
              onChange={handleInputChange}
            />

            <div className={style.buttonBox}>
              {selectedOptionValue >= 0 && (
                <button
                  role='cancelBtn'
                  tabIndex={-1}
                >
                  <BiX
                    size={20}
                    onClick={handleClearClick}
                  />
                </button>
              )}
              <button tabIndex={-1}>
                {anchorEl ? (
                  <BiChevronUp
                    size={20}
                    onClick={handleBiChevronUpClick}
                  />
                ) : (
                  <BiChevronDown
                    size={20}
                    onClick={handleBiChevronDownClick}
                  />
                )}
              </button>
            </div>
            <span
              className={`
              ${isActivated ? style.spanActivated : ''} 
              ${isFocused ? style.spanFocused : ''}
              `}
            >
              {label}
            </span>
          </fieldset>

          {anchorEl ? (
            logicBehind ? (
              <List
                width={dynamicWidth}
                identity={identity}
              >
                {absoluteOptions.length > 0 ? (
                  absoluteOptions.map((suggestion, index) => (
                    <List.ListItem
                      key={index}
                      suggestion={suggestion}
                      index={index}
                      focusedIndex={focusedIndex}
                      onMouseDown={handleSuggestionClick}
                      onMouseOver={handleOnMouseOver}
                      ref={resultContainerRef}
                      selectedOptionValue={selectedOptionValue}
                    />
                  ))
                ) : (
                  <p>No options</p>
                )}
              </List>
            ) : (
              <List
                width={dynamicWidth}
                identity={identity}
              >
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => (
                    <List.ListItem
                      key={index}
                      suggestion={suggestion}
                      index={index}
                      focusedIndex={focusedIndex}
                      onMouseDown={handleSuggestionClick}
                      onMouseOver={handleOnMouseOver}
                      ref={resultContainerRef}
                      selectedOptionValue={selectedOptionValue}
                    />
                  ))
                ) : (
                  <p>No options</p>
                )}
              </List>
            )
          ) : (
            ''
          )}
        </div>
      ) : (
        // During fetching...
        <p>Loading...</p>
      )}
    </>
  )
}

export { Select }
