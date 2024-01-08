import { ChangeEvent } from 'react'
import type { Options } from './Select'

type SelectChangeEvent = ChangeEvent<HTMLInputElement>
type ListProps = {
  options: Options
  onClick: (suggestion: string) => void
}

const List = ({ options, onClick }: ListProps) => {
  return (
    <>
      <ul>
        {options.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              onClick(suggestion.label)
            }}
          >
            {suggestion.label}
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
