import { useState } from 'react'
import { Select } from '../components/select/Select'
import {
  fetchTop100Films,
  fetchTop100FilmsLonger,
} from '../components/select/fetchTop100Films'
import top100Films from '../components/select/top100Films.json'

function DemoPage() {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [selectedValue2, setSelectedValue2] = useState<string>('')
  const [selectedValue3, setSelectedValue3] = useState<string>('')
  return (
    <div>
      <h1>You got this!</h1>
      <Select
        value={selectedValue}
        options={top100Films}
        onChange={(payload) => {
          console.log(payload)
          setSelectedValue(payload.value)
        }}
      />
      <Select
        value={selectedValue2}
        options={fetchTop100Films}
        onChange={(payload) => setSelectedValue2(payload.value)}
      />
      <Select
        value={selectedValue3}
        options={fetchTop100FilmsLonger}
        onChange={(payload) => setSelectedValue3(payload.value)}
      />
    </div>
  )
}

export { DemoPage }
