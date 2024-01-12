import { useState } from 'react'
import { Select } from '../components/Select'
import {
  fetchTop100Films,
  fetchTop100FilmsLonger,
} from '../server/fetchTop100Films'
import top100Films from '@/server/data/top100Films.json'

function DemoPage() {
  const [selectedValue, setSelectedValue] = useState<string>('2')
  const [selectedValue2, setSelectedValue2] = useState<string>('1')
  const [selectedValue3, setSelectedValue3] = useState<string>('')
  return (
    <div>
      <Select
        value={selectedValue}
        options={top100Films}
        onChange={(payload) => setSelectedValue(payload.value)}
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
