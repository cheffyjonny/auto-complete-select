import {
  ChangeEvent,
  ForwardedRef,
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type { Options, Option } from './Select'
import style from './list.module.css'
import { createPortal } from 'react-dom'

type SelectChangeEvent = ChangeEvent<HTMLInputElement>
type ListProps = {
  options: Options
  onClick: (payload: Payload) => void
  width: number
  liRef?: ForwardedRef<HTMLLIElement>
  focusedIndex: number
  action?: { current: string }
}
type ListItemProps = {
  suggestion: Option
  onClick: (payload: Payload) => void
  index: number
  focusedIndex: number
}

export type Payload = {
  suggestion: Option
  index: number
}
type DropdownRef = {
  scrollToItem: (index: number) => void
}
const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ suggestion, onClick, index, focusedIndex }, ref) => {
    const payload = { suggestion: suggestion, index: index }

    // const listRef = useRef<HTMLDivElement>(null);
    // useImperativeHandle(ref, () => ({
    //     scrollToItem: (index) => {
    //       const item = dropdownRef.current?.querySelector(`#item-${index}`);
    //       if (item) {
    //         item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //       }
    //     },
    //   }));

    return (
      <li
        id={`option-${index}`}
        data-is-focused={index === focusedIndex}
        // ref={index === focusedIndex ? ref : null}
        onClick={() => {
          onClick(payload)
        }}
        style={{
          backgroundColor: index === focusedIndex ? 'rgba(49, 75, 75)' : '',
        }}
      >
        {suggestion.label}
      </li>
    )
  }
)

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ options, onClick, width, liRef, focusedIndex, action }, ref) => {
    const mount = document.getElementById('root') as HTMLElement

    const [height, setHeight] = useState(0)
    const [listItemHeight, setListItemHeight] = useState(0)
    const [listsClientHeight, setListsClientHeight] = useState(0)
    const [offSetHeight, setOffSetHeight] = useState(0)

    const elementRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
      //   elementRef.current?.scrollTo(0, 200)
      setHeight(elementRef.current?.scrollHeight || 0)
      setListItemHeight(elementRef.current?.children[0].clientHeight || 0)
      setListsClientHeight(elementRef.current?.clientHeight || 0)
    }, [])

    const calHeight = () => {
      const prevId = elementRef.current
        ?.querySelector('[data-is-focused="true"]')
        ?.id.split('-')[1]

      console.log(prevId)
      console.log(focusedIndex)
      const scrolledHeight = listItemHeight * (focusedIndex + 1)
      if (scrolledHeight > listsClientHeight) {
        elementRef.current?.scrollTo(0, scrolledHeight - listsClientHeight)
      }
    }

    calHeight()

    return (
      <Fragment>
        {createPortal(
          <div
            className={style.modal}
            style={{ width: width }}
          >
            <ul
              ref={elementRef}
              id='options'
              className={`${style.ul}`}
            >
              {options.length > 0 ? (
                options.map((suggestion, index) => (
                  //   <li
                  //     ref={ref}
                  //     key={index}
                  //     onClick={() => {
                  //       onClick(suggestion)
                  //     }}
                  //   >
                  //     {suggestion.label}
                  //   </li>
                  <ListItem
                    key={index}
                    suggestion={suggestion}
                    ref={liRef}
                    index={index}
                    focusedIndex={focusedIndex}
                    onClick={onClick}
                  />
                ))
              ) : (
                <p>No options</p>
              )}
            </ul>
          </div>,
          mount
        )}
      </Fragment>
    )
  }
)

// const List = ({ options, onClick, width }: ListProps) => {
//   const mount = document.getElementById('root') as HTMLElement
//   return (
//     <Fragment>
//       {createPortal(
//         <div
//           className={style.modal}
//           style={{ width: width }}
//         >
//           <ul className={`${style.ul}`}>
//             {options.length > 0 ? (
//               options.map((suggestion, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     onClick(suggestion)
//                   }}
//                 >
//                   {suggestion.label}
//                 </li>
//               ))
//             ) : (
//               <p>No options</p>
//             )}
//           </ul>
//         </div>,
//         mount
//       )}
//     </Fragment>
//   )
// }

export default List
