import { useState } from 'react'
import { Select } from '../components/select/Select'
import { fetchTop100Films } from '../components/select/fetchTop100Films'
import top100Films from '../components/select/top100Films.json'

function DemoPage() {
  const [selectedValue, setSelectedValue] = useState<string>()
  const [selectedValue2, setSelectedValue2] = useState<string>()
  return (
    <div>
      <h1>You got this!</h1>
      <Select
        value={selectedValue}
        options={top100Films}
        onChange={(event) => setSelectedValue(event.target.value)}
      />
      <Select
        value={selectedValue2}
        options={fetchTop100Films}
        onChange={(event) => setSelectedValue2(event.target.value)}
      />
    </div>
  )
}

export { DemoPage }
