import React, { useRef } from 'react'
import Dropdown from './Dropdown'
import type { DropdownRef } from './Dropdown'

const App: React.FC = () => {
  const dropdownRef = useRef<DropdownRef>(null)

  const handleButtonClick = (index: number) => {
    dropdownRef.current?.scrollToItem(index)
  }

  return (
    <div>
      <button onClick={() => handleButtonClick(3)}>Scroll to Item 3</button>
      <Dropdown ref={dropdownRef} />
    </div>
  )
}

export default App
