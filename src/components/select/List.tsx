import {
  ForwardedRef,
  Fragment,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import style from './List.module.css'
import type { Option } from './Select'

type ListProps = {
  children: ReactNode
  width: number
  identity: string
}
type ListItemProps = {
  suggestion: Option
  onClick: (option: Option) => void
  index: number
  focusedIndex?: number
  selectedOptionIndex?: number
  resultContainer?: ForwardedRef<HTMLDivElement>
  onMouseOver: MouseEventHandler<HTMLDivElement>
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      suggestion,
      onClick,
      focusedIndex,
      resultContainer,
      onMouseOver,
      selectedOptionIndex,
    },
    ref
  ) => {
    // Films object value starts from 1, but focusedIndex starts from 0
    const value = (parseInt(suggestion.value) - 1).toString()
    const option = {
      label: suggestion.label,
      value: value,
    }

    const backgroundColor = (
      focusedIndex?: number,
      selectedOptionIndex?: number
    ) => {
      if (parseInt(suggestion.value) - 1 === selectedOptionIndex) return 'red'
      else if (parseInt(suggestion.value) - 1 === focusedIndex)
        return 'rgb(80, 80, 80)'
      else return ''
    }
    return (
      <div
        id={`option-${suggestion.value}`}
        data-value={suggestion.value}
        className={style.listItem}
        ref={
          parseInt(suggestion.value) - 1 === focusedIndex
            ? resultContainer
            : null
        }
        onClick={() => {
          onClick(option)
        }}
        style={{
          backgroundColor: backgroundColor(focusedIndex, selectedOptionIndex),
        }}
        onMouseOver={onMouseOver}
      >
        {suggestion.label}
      </div>
    )
  }
)

const List = forwardRef<HTMLDivElement, ListProps>(
  ({ width, children, identity }, ref) => {
    // Set where to mount, it can be customized as a prop.
    const mount = document.getElementById(
      `input-box-${identity}`
    ) as HTMLElement

    // Decide where to render (Either top or bottom)
    useEffect(() => {
      var element = document.getElementById(`input-box-${identity}`)

      const handleScroll = () => {
        if (element) {
          var domRect = element.getBoundingClientRect()
          var spaceBelow = window.innerHeight - domRect.bottom
          var spaceTop = domRect.top

          if (spaceBelow < 220) {
            document
              .getElementById(`portal-${identity}`)
              ?.classList.remove(style.modalBottom)
            document
              .getElementById(`portal-${identity}`)
              ?.classList.add(style.modalTop)
          }
          if (spaceTop < 220) {
            document
              .getElementById(`portal-${identity}`)
              ?.classList.remove(style.modalTop)
            document
              .getElementById(`portal-${identity}`)
              ?.classList.add(style.modalBottom)
          }
        }
      }
      // Check the space initially.
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])

    return (
      <Fragment>
        {createPortal(
          <div
            id={`portal-${identity}`}
            key={`portal-${identity}`}
            className={style.modalBottom}
            style={{ width: width }}
          >
            <div
              id={`options-${identity}`}
              key={`portal-${identity}`}
              className={`${style.list}`}
            >
              {children}
            </div>
          </div>,
          mount
        )}
      </Fragment>
    )
  }
)

export default List
