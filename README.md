# Intro

This is a generic component. It's a auto complete select box that take options from an array or an API call.<br>
It has used only React + TS.

# Structure

```
div
├── fieldset
│ ├── input
│ ├── button
│ └── span
└── <List>
└── <List.ListItem>
```

- div : Parent component - Event handling for `onBlue(handleClickOffSelect)` and `onKeyDown(handleKeyDown)`
- fieldset : Component for grouping - Event handling for `onClick(handleFieldsetClick)`
- input : Input component - Event handling for `onChange(handleInputChange)`
- button : Button component to take actions - Event handling for `onClick(handleClearClick`, `handleBiChevronUpClick` and `handleBiChevronDownClick)`
- span : Displaying `label`
- `<List>` : Options parent React component - Displaying option list through `createPortal` when `anchorEl` is `true`
- `<List.ListItem>` : Option item React component - Event handling for `onMouseDown(handleSuggestionClick)` and `onMouseOver(handleOnMouseOver)`

# Logic

## Select.tsx

- `inputRef`: `ref` for focusing input
- `resultContainerRef`: `ref` for scrolling on option list with keyboard actions

- `isFocused` : `state` to check focusing for styling
- `isActivated` : `state` for checking `value`
- `anchorEl` : `state` for displaying option list
- `focusedIndex` : `state` for event listener of keyboard and mouse
- `selectedOption` : `state` for selected option
- `selectedOptionValue` : `state` for selected option

- `findLongestLabel` : To generate `width` from the longest `label`
- `injectValue` : To Inject default value
- `resultContainerRef.current.scrollIntoView({block: 'nearest'})` : To scroll with keyboard on the option list

## List.tsx

### List

- `handleScroll` : To render the option list either above or below of the component depending on the space. It uses `setInterval` to reduce calling the function.

### ListItem

- `backgroundColor` : Applying background color according to `focusedIndex` and `selectedOptionValue`

<br>
<br>
<br>

# Set up instruction

To install the package and run the project: `npm install && npm run dev` <br>
To test the project : `npm run test`

It has set up with specific height of the page to test the functions.<br>
Also, it has set up with different options to see the difference for two things, width and the functionality.
