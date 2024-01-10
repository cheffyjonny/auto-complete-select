import React, { useState, useEffect, KeyboardEvent, useRef } from 'react'

interface ListComponentProps {
  items: string[]
  onSelect: (selectedItem: string) => void
}

const ListComponent: React.FC<ListComponentProps> = ({ items, onSelect }) => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault() // Prevent default behavior of arrow keys

      if (e.key === 'ArrowDown') {
        setFocusedIndex((prevIndex) =>
          Math.min(prevIndex + 1, items.length - 1)
        )
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      } else if (e.key === 'Enter') {
        onSelect(items[focusedIndex])
      }
    }

    if (listRef.current) {
      listRef.current.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [focusedIndex, items, onSelect])

  useEffect(() => {
    if (listRef.current) {
      const focusedItem = listRef.current.children[focusedIndex] as HTMLElement

      if (focusedItem) {
        const offsetTop = focusedItem.offsetTop
        const offsetHeight = focusedItem.offsetHeight
        const listHeight = listRef.current.offsetHeight

        if (offsetTop < listRef.current.scrollTop) {
          listRef.current.scrollTop = offsetTop
        } else if (
          offsetTop + offsetHeight >
          listRef.current.scrollTop + listHeight
        ) {
          listRef.current.scrollTop = offsetTop + offsetHeight - listHeight
        }
      }
    }
  }, [focusedIndex])

  return (
    <ul
      ref={listRef}
      tabIndex={0}
    >
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => onSelect(item)}
          style={{
            backgroundColor: index === focusedIndex ? 'lightgray' : 'white',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default ListComponent
