# 코드설명

## 구조 및 기능

```
div
├── fieldset
│ ├── input
│ ├── button
│ └── span
└── <List>
└── <List.ListItem>
```

- div : Parent 컴포넌트 - `onBlue(handleClickOffSelect)` 와 `onKeyDown(handleKeyDown)` 이벤트 헨들링
- fieldset : 컴포넌트 그룹화를 위한 컴포넌트 - `Select.tsx`의 `onClick(handleFieldsetClick)` 이벤트 핸들링
- input : 키보드 타입의 값어치 입력을 위한 인풋 컴포넌트 - 키보드 입력값 `onChange(handleInputChange)` 이벤트 핸들링
- button : 검색값에 따른 option(또는 기본 option) 디스플레이, 입력값 초기화를 위한 버튼 컴포넌트 - `onClick(handleClearClick`, `handleBiChevronUpClick`, `handleBiChevronDownClick)` 이벤트 핸들링
- span : `Select.tsx`의 `label` 디스플레이
- `<List>` : 검색 입력값에 따른 option 목록 디스플레이를 위한 React 컴포넌트 - `anchorEl` 입력값이 `true` 시, `createPortal`를 통하여 option 목록 디스플레이
- `<List.ListItem>` : 각각의 option 디스플레이를 위한 React 컴포넌트 - `onMouseDown(handleSuggestionClick)`, `onMouseOver(handleOnMouseOver)` 이벤트 핸들링

## 사용된 논리

### Select.tsx

- `inputRef`: input 포커스를 위한 `ref`
- `resultContainerRef`: 키보드 이벤트를 통한 목록 스크롤과 선택된 옵션이 있을시 선택된 옵션으로 스크롤 된 화면은 디스플레이 하기 위한 `ref`

- `isFocused` :  포커스 체크, 스타일링 토글을 위한 `state`
- `isActivated` : `value`값 유무 판단을 위한 `state`
- `anchorEl` : 목록 디스플레이를 위한 `state`
- `focusedIndex` : 목록 키보드 이벤트와 마우스 hover 이벤트를 위한 인덱스 `state`
- `selectedOption` : input `value`값 디스플레이를 위한 `state`
- `selectedOptionValue` : 선택된 option 디스플레이를 위한 `state`

- `findLongestLabel` : option 값들 중 가장 긴 `label`를 탐색 후, 그 값에 따른 `width`를 `Select.tsx`에 적용하였습니다.
- `injectValue` : option 목록 생성중, `Select.tsx`에 입력된 기본값(`value`)이 있을 시, option 목록에서 값을 가져와 디스플레이 하도록 구현하였습니다.
- `resultContainerRef.current.scrollIntoView({block: 'nearest',})` : 키보드 입력값 따른 이벤트 핸들링을 위하여 `useEffect` Hook와 `ref`를 사용하여 스크롤 하도록 구현하였습니다.

### List.tsx

#### List

- `handleScroll` : `Select.tsx` 컴포넌트 위 혹은 아래의 충분한 공간 여부 확인 후 option 목록 디스플레이를 구현하였습니다. `setInterval` JavaScript function를 활용하여 스크롤 이벤트 빈도 횟수를 줄엿습니다.

#### ListItem

- `backgroundColor` : `focusedIndex`와 `selectedOptionValue`의 값을 통한 배경 색을 적용함으로서, 선택된 option 디스플레이와 `onMouseOver` 이벤트에 따른 option 배경색 적용을 구현하였습니다.

<br>
<br>
<br>

# 실행법

To install the package and run the project: `npm install && npm run dev` <br>
To test the project : `npm run test`

## Demo.tsx 셋업

- Demo.tsx 페이지에 임의적인 height를 주어서 제시해주신 과제 목록 중 한가지인 공간에 따른 디스플레이를 테스트 할 수 있도록 구성하였습니다.
- 제공해주신 2가지 컴포넌트 에 selectedValue를 주어, 기본값 제시시 디스플레이 여부를 확인할 수 있도록 하였습니다.
- 목록 중 가장 긴 옵션에 따라 width변경을 보여드리기 위하여, 새로운 mock data(top100FilmsLonger.json)를 만들어 적용하였습니다.
