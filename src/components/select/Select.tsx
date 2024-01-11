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

import type { Response } from './fetchTop100Films'
import List, { ListItem } from './List'

export type Options = Array<Option>
export type Option = { value: string; label: string }

type SelectProps = {
  value?: string | null
  options: Options | (() => Promise<Response>)
  onChange?: (payload: Option) => void
}

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

function Select({ value, options, onChange }: SelectProps): ReactNode {
  const identity = useId()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const wrapperRef = useRef<HTMLFieldSetElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const select = useRef(false)
  const resultContainer = useRef<HTMLDivElement>(null)

  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1)
  const [selectedOption, setSelectedOption] = useState({ label: '', value: '' })
  const [dynamicWidth, setDynamicWidth] = useState<number>(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState<Options>([])
  const [absoluteOptions, setAbsoluteOptions] = useState<Options>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true)
    setAnchorEl(true)

    const value = event.target.value
    setInputValue(value)

    const filtered = absoluteOptions.filter((option) =>
      option.label.toLowerCase().trim().includes(value.toLowerCase().trim())
    )
    console.log(filtered)
    setFilteredSuggestions(filtered)
  }

  const handleClickOffSelect = () => {
    setInputValue('')
    setIsFocused(false)
    setAnchorEl(false)
  }

  const handleSuggestionClick = (option: Option) => {
    select.current = true

    setInputValue(option.label)
    setSelectedOptionIndex(parseInt(option.value))
    setSelectedOption(option)
    setFocusedIndex(parseInt(option.value))

    const test = { value: option.value.toString(), label: option.label }
    onChange?.(test)
  }

  const handleFieldsetClick = (e: MouseEvent) => {
    e.stopPropagation()

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
    select.current = false
    setIsFocused(true)
    setAnchorEl(false)
    inputRef.current!.focus()
    setFocusedIndex(-1)
  }

  const handlePressEnter = (option: Option) => {
    // Films object set with own value, and the value is One-based numbering, but focusedIndex, selectedOptionIndex are Zero-based numbering.
    const convertedValue = parseInt(option.value) - 1

    select.current = true
    setInputValue(option.label)
    setSelectedOptionIndex(convertedValue)
    setSelectedOption(option)
    setFocusedIndex(convertedValue)
    setAnchorEl(false)

    const test = { value: option.value, label: option.label }
    onChange?.(test)
  }

  const handlePressEscape = () => {
    setAnchorEl(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e
    let nextIndexCount = 0

    console.log('focusedIndex: ', focusedIndex)
    // move down
    if (key === 'ArrowDown') {
      e.stopPropagation()
      setAnchorEl(true)
      !inputValue ||
      (selectedOptionIndex >= 0 && selectedOption.label == inputValue)
        ? (nextIndexCount = (focusedIndex + 1) % absoluteOptions.length)
        : (nextIndexCount = (focusedIndex + 1) % filteredSuggestions.length)
    }
    // move up
    if (key === 'ArrowUp') {
      e.stopPropagation()
      setAnchorEl(true)
      !inputValue ||
      (selectedOptionIndex >= 0 && selectedOption.label == inputValue)
        ? (nextIndexCount =
            (focusedIndex + absoluteOptions.length - 1) %
            absoluteOptions.length)
        : (nextIndexCount =
            (focusedIndex + filteredSuggestions.length - 1) %
            filteredSuggestions.length)

      // ArrowUp from the default
      if (focusedIndex === -1) {
        nextIndexCount = nextIndexCount + 1
      }
    }

    // Handle enter and esc
    if (key === 'Enter' || key === 'Escape') {
      e.preventDefault()

      if (key === 'Enter') {
        // Films object set with own value, and the value starts from 1, but focusedIndex index starts from 0
        const convertedValue = focusedIndex + 1

        const selectedOption = document.getElementById(
          `option-${convertedValue}`
        ) as HTMLElement

        const option = {
          value: selectedOption.dataset.value!,
          label: selectedOption.innerHTML,
        }

        handlePressEnter(option)
      } else if (key === 'Escape') {
        handlePressEscape()
      }

      return
    }

    setFocusedIndex(nextIndexCount)
  }

  const handleOnMouseOver = (e: MouseEvent) => {
    const nextIndexCount = parseInt(e.currentTarget.id.split('-')[1]) - 1

    setFocusedIndex(nextIndexCount)
  }

  useEffect(() => {
    const findLongestLabel = (options: Options): Option => {
      const longest = options.reduce(function (a, b) {
        return a.label.length > b.label.length ? a : b
      })
      return longest
    }

    if (Array.isArray(options)) {
      setAbsoluteOptions(options)
      setDynamicWidth(findLongestLabel(options).label.length * 8.5)
    } else {
      const fetchOptions = async () => {
        setIsLoading(true)

        try {
          const response = await options()
          const optionsResponse = response.result as Options
          setDynamicWidth(findLongestLabel(optionsResponse).label.length * 8.5)
          setAbsoluteOptions(optionsResponse)
        } catch (e: any) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }

      fetchOptions()
    }
  }, [])

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (!select.current) {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          handleClickOffSelect()
        }
      } else {
        setAnchorEl(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [identity])

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
      {dynamicWidth ? (
        <div
          id={`input-box-${identity}`}
          key={`input-box-${identity}`}
          className={style.inputBox}
          style={{ width: dynamicWidth }}
          tabIndex={1}
          onKeyDown={handleKeyDown}
        >
          <fieldset
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
              type='text'
              required
              onChange={handleInputChange}
            />

            <div className={style.buttonBox}>
              {selectedOptionIndex >= 0 && (
                <button>
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
            <span className={isFocused ? style.spanFocused : ''}>Label</span>
          </fieldset>

          {anchorEl ? (
            // There is no input value, OR the input gets clicked with selectedOption
            !inputValue ||
            (selectedOptionIndex >= 0 && selectedOption.label == inputValue) ? (
              <List
                width={dynamicWidth}
                identity={identity}
              >
                {absoluteOptions.length > 0 ? (
                  absoluteOptions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      suggestion={suggestion}
                      index={index}
                      focusedIndex={focusedIndex}
                      onClick={handleSuggestionClick}
                      onMouseOver={handleOnMouseOver}
                      resultContainer={resultContainer}
                      selectedOptionIndex={selectedOptionIndex}
                    />
                  ))
                ) : (
                  <p>No options</p>
                )}
              </List>
            ) : (
              // When user searches regardless of selectedOption
              <List
                width={dynamicWidth}
                identity={identity}
              >
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      suggestion={suggestion}
                      index={index}
                      focusedIndex={focusedIndex}
                      onClick={handleSuggestionClick}
                      onMouseOver={handleOnMouseOver}
                      resultContainer={resultContainer}
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
