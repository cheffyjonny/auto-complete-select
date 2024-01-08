import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import style from './select.module.css'
import { SelectProps, Options } from './Select'

/**
 *
 * renderGroup(renderGroupProp | defaultRenderGroup) -> renderListOption -> renderOption(renderOptionProp || defaultRenderOption)
 *
 * useAutocomplete ()
 *
 * Todo:
 * 1. dropdown
 * 2. Set up dynamic select width
 * 3. Search function -> useRef
 */
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
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<Options>([])

  useEffect()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    // Filter suggestions based on input value
    if (Array.isArray(options)) {
      const filtered = options.filter(
        (option) => option.label.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
      console.log(filtered)
      setFilteredSuggestions(filtered)
    } else {
      // Fire the function
    }
  }

  return (
    <>
      <div className={style.inputBox}>
        <div>
          <input
            type='text'
            required
            onChange={handleInputChange}
          />

          <span>Label</span>
        </div>

        <ul>
          {/* {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))} */}
        </ul>

        <ul className={style.option}>
          <li>list1</li>
          <li>list2</li>
          <li>list3</li>
          <li>list4</li>
        </ul>
      </div>
    </>
  )
}
