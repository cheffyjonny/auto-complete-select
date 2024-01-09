import React, { useRef, forwardRef, useImperativeHandle, Ref } from 'react'

type DropdownProps = {}

export type DropdownRef = {
  scrollToItem: (index: number) => void
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Expose a method to scroll to a specific item
  useImperativeHandle(ref, () => ({
    scrollToItem: (index) => {
      const item = dropdownRef.current?.querySelector(`#item-${index}`)
      if (item) {
        item.scrollIntoView({ block: 'center' })
      }
    },
  }))

  return (
    <div>
      <div
        ref={dropdownRef}
        style={{ height: '200px', overflowY: 'auto' }}
      >
        <ul>
          <li id='item-1'>Item 1</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-2'>Item 2</li>
          <li id='item-3'>Item 3</li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </div>
  )
})

export default Dropdown
