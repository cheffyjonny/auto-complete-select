import ListComponent from './ListComponent'

const App = () => {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 4',
    'Item 4',
    'Item 4',
    'Item 4',
  ]

  const handleSelect = (selectedItem) => {
    console.log('Selected item:', selectedItem)
  }

  return (
    <div>
      <h1>List Component Demo</h1>
      <ListComponent
        items={items}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default App
