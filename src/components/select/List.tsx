import {
  ForwardedRef,
  Fragment,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  useEffect,
} from 'react'
import type { Options, Option } from './Select'
import style from './List.module.css'
import { createPortal } from 'react-dom'

type ListProps = {
  children: ReactNode
  width: number
  identity: number
}
// type ListProps = {
//   options: Options
//   onClick: (payload: Payload) => void
//   width: number
//   //   liRef?: ForwardedRef<HTMLLIElement>
//   focusedIndex: number
//   action?: { current: string }
//   resultContainer?: ForwardedRef<HTMLDivElement>
//   onMouseOver: MouseEventHandler<HTMLDivElement>
// }
type ListItemProps = {
  suggestion: Option
  onClick: (payload: Payload) => void
  index: number
  focusedIndex?: number
  selectedOptionIndex?: number
  resultContainer?: ForwardedRef<HTMLDivElement>
  onMouseOver: MouseEventHandler<HTMLDivElement>
}

export type Payload = {
  suggestion: Option
  index: number
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      suggestion,
      onClick,
      index,
      focusedIndex,
      resultContainer,
      onMouseOver,
      selectedOptionIndex,
    },
    ref
  ) => {
    const payload = { suggestion: suggestion, index: index }

    const backgroundColor = (
      focusedIndex?: number,
      selectedOptionIndex?: number
    ) => {
      if (index === selectedOptionIndex) return 'red'
      else if (index === focusedIndex) return 'rgb(80, 80, 80)'
      else return ''
    }
    return (
      <div
        id={`option-${index}`}
        data-value={suggestion.value}
        className={style.listItem}
        ref={index === focusedIndex ? resultContainer : null}
        onClick={() => {
          onClick(payload)
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
    const mount = document.getElementById(
      `input-box-${identity}`
    ) as HTMLElement

    useEffect(() => {
      var element = document.getElementById('input-box')

      const handleScroll = () => {
        if (element) {
          var domRect = element.getBoundingClientRect()
          var spaceBelow = window.innerHeight - domRect.bottom
          var spaceTop = domRect.top

          if (spaceBelow < 220) {
            console.log('@@')
            document
              .getElementById('portal')
              ?.classList.remove(style.modalBottom)
            document.getElementById('portal')?.classList.add(style.modalTop)
          }
          if (spaceTop < 220) {
            document.getElementById('portal')?.classList.remove(style.modalTop)
            document.getElementById('portal')?.classList.add(style.modalBottom)
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
            id='portal'
            className={style.modalBottom}
            style={{ width: width }}
          >
            <div
              id='options'
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
// const List = forwardRef<HTMLDivElement, ListProps>(
//   (
//     { options, onClick, width, focusedIndex, resultContainer, onMouseOver },
//     ref
//   ) => {
//     const mount = document.getElementById('root') as HTMLElement

//     return (
//       <Fragment>
//         {createPortal(
//           <div
//             className={style.modal}
//             style={{ width: width }}
//           >
//             <div
//               id='options'
//               className={`${style.list}`}
//             >
//               {options.length > 0 ? (
//                 options.map((suggestion, index) => (
//                   <ListItem
//                     resultContainer={resultContainer}
//                     key={index}
//                     suggestion={suggestion}
//                     index={index}
//                     focusedIndex={focusedIndex}
//                     onClick={onClick}
//                     onMouseOver={onMouseOver}
//                   />
//                 ))
//               ) : (
//                 <p>No options</p>
//               )}
//             </div>
//           </div>,
//           mount
//         )}
//       </Fragment>
//     )
//   }
// )

export default List
