import {
  Fragment,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useEffect,
} from 'react'
import { createPortal } from 'react-dom'

import style from './List.module.css'
import type { Option } from './Select'
import convertNumbering from '@/hooks/convertNumbering'

type ListProps = {
  width: number
  identity: string
  children: ReactNode
}
type ListItemProps = {
  suggestion: Option
  index: number
  focusedIndex: number
  selectedOptionIndex: number
  onMouseDown: () => void
  onMouseOver: MouseEventHandler<HTMLDivElement>
}

const List = ({ width, identity, children }: ListProps) => {
  // Set where to mount, it can be customized as a prop.
  const mountComponent = document.getElementById(
    `input-box-${identity}`
  ) as HTMLElement

  // Decide where to render (Either top or bottom)
  useEffect(() => {
    const handleScroll = () => {
      if (mountComponent) {
        var domRect = mountComponent.getBoundingClientRect()
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
    const timer = setInterval(() => {
      window.addEventListener('scroll', handleScroll)
    }, 1000)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Fragment>
      {createPortal(
        <div
          role='portal'
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
        mountComponent
      )}
    </Fragment>
  )
}

List.ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      suggestion,
      index,
      focusedIndex,
      selectedOptionIndex,
      onMouseDown,
      onMouseOver,
    },
    ref
  ) => {
    const convertedIndex = convertNumbering(suggestion.value)

    const backgroundColor = (
      focusedIndex: number,
      selectedOptionIndex: number
    ) => {
      if (convertedIndex === selectedOptionIndex) {
        return 'red'
      } else if (index === focusedIndex) {
        return 'rgb(80, 80, 80)'
      } else return ''
    }

    return (
      <div
        id={`option-${index}`}
        data-value={suggestion.value}
        className={style.listItem}
        ref={convertedIndex === focusedIndex ? ref : null}
        onMouseDown={onMouseDown}
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

export default List