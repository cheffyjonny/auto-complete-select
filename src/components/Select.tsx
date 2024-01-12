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

import style from './select.module.css'
import List from './List'
import type { Response } from '../server/fetchTop100Films'
import convertNumbering from '@/hooks/convertNumbering'

export type Options = Array<Option>
export type Option = { value: string; label: string }

type SelectProps = {
  value?: string | null
  options: Options | (() => Promise<Response>)
  onChange?: (payload: Option) => void
  label?: string
}

/** John's Questions  질문입니다!!
 *
 * Should I make the fieldset into a component?
 * How do I make it more concise?
 * */

/**
 * @description https://mui.com/material-ui/react-autocomplete/#combo-box 에서 Autocomplete > Combo를 참고해 아래의 기능을 구현하세요.
 * - `Select` 의 option 은 배열과 함수, 두 가지 타입이 가능해야 합니다.
 * - `Select`의 폭은 선택 가능한 option들 중 가장 폭이 넓은 것에 맞춰져 있어야 합니다. 즉 어떤 option이라도 그것이 선택되었을 때, 잘린 채로 표시되어서는 안 됩니다.
 * - option을 검색할 수 있어야 합니다. option을 선택하지 않고, focus가 `Select`를 벗어난 경우에는, 검색어가 삭제되어야 합니다.
 * - 마우스 뿐 아니라 키보드를 사용해도 option을 선택할 수 있어야 합니다.
 * - `Select`를 클릭하거나 `Select`에서 위 방향 또는 아래 방향 키보드를 누르면 선택 가능한 option들이 나타나야 합니다.
 * - 클릭하거나 엔터키를 누르는 것으로 option을 선택할 수 있어야 합니다.
 * - 선택 가능한 option들이 나타날 때, 선택된 option이 있다면, 그 option이 강조되어야 하고, 그 option으로 focus가 이동되어야 합니다.
 * - 선택 가능한 option들이 나타날 때, option들이 스크린을 벗어나지 않아야 합니다. 예를 들어, `Select` 아래쪽에 선택 가능한 option들이 나타나기에 공간이 부족하다면, 선택 가능한 option들은 위쪽에 나타나야 합니다.
 * - `Select`가 hover 되는 경우와 focus 되는 경우, 그리고 두 경우가 아닌 경우에 대해 `Select`의 스타일이 달라야 합니다.
 */

function Select({
  value,
  options,
  onChange,
  label = 'label',
}: SelectProps): ReactNode {
  const identity = useId()
  const [isLoading, setIsLoading] = useState(false)

  const wrapperRef = useRef<HTMLFieldSetElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultContainer = useRef<HTMLDivElement>(null)

  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1)
  const [selectedOption, setSelectedOption] = useState({ label: '', value: '' })
  const [dynamicWidth, setDynamicWidth] = useState<number>(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState<Options>([])
  const [absoluteOptions, setAbsoluteOptions] = useState<Options>([])

  // John's NOTE : This Select.tsx component has some business logic
  //               1. show the original options / WITHOUT search value
  //               2. show the original options / WITH selected option && focus input again
  //               2. show filtered options / WITH search value
  //               2. show filtered options / WITH selected option && WITH search value
  const logicBehind = // logicBehind applies the business logic.
    !inputValue ||
    (selectedOptionIndex >= 0 && selectedOption.label == inputValue)

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
    if (selectedOptionIndex === -1) {
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

  const handleSuggestionClick = () => {
    const convertedValue = convertNumbering(optionFromList.value)

    setIsActivated(true)
    setInputValue(optionFromList.label)
    setSelectedOptionIndex(convertedValue)
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

    if (selectedOptionIndex >= 0) {
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
    setSelectedOptionIndex(-1)
    inputRef.current!.focus()
    setAnchorEl(false)
    setFocusedIndex(-1)
    setIsFocused(true)
  }

  const handlePressEnter = () => {
    const convertedValue = convertNumbering(optionFromList.value)

    setIsActivated(true)
    setInputValue(optionFromList.label)
    setSelectedOptionIndex(convertedValue)
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
      if (selectedOptionIndex === -1) {
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

      setSelectedOptionIndex(optionIndex)
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
          const optionsResponse = response.result as Options
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

  useEffect(() => {
    if (!resultContainer.current) {
      return
    } else {
      resultContainer.current.scrollIntoView({
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
            ref={wrapperRef}
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
              {selectedOptionIndex >= 0 && (
                <button role='cancelBtn'>
                  <BiX
                    size={20}
                    onClick={handleClearClick}
                  />
                </button>
              )}
              <button>
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
                      ref={resultContainer}
                      selectedOptionIndex={selectedOptionIndex}
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
                      ref={resultContainer}
                      selectedOptionIndex={selectedOptionIndex}
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