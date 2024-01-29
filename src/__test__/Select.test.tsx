import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Select } from '@/components/Select'
import { fetchTop100Films } from '../server/fetchTop100Films'

test('Fetch data', () => {
  expect.assertions(1)
  return fetchTop100Films().then((data) => {
    expect(data).toBeDefined()
  })
})

test('Fetch data from API', async () => {
  // expect.assertions(1)
  const handleClick = jest.fn()

  render(
    <Select
      options={fetchTop100Films}
      onChange={handleClick}
      label='Movie'
    />
  )
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  await waitForElementToBeRemoved(screen.getByText(/Loading.../i))
  expect(screen.getByText(/Movie/i)).toBeInTheDocument()
})

test('It should have the value of the option clicked', () => {
  const mockData = [
    { label: 'The Shawshank Redemption', value: '1' },
    { label: 'The Godfather', value: '2' },
    { label: 'The Godfather: Part II', value: '3' },
    { label: 'The Dark Knight', value: '4' },
    { label: '12 Angry Men', value: '5' },
    { label: "Schindler's List", value: '6' },
    { label: 'Pulp Fiction', value: '7' },
  ]

  const handleClick = jest.fn()

  render(
    <Select
      options={mockData}
      onChange={handleClick}
      label='Movie'
    />
  )

  const selectElement = screen.getByText(/Movie/i)

  fireEvent.click(selectElement)

  const portalElement = screen.getByRole('portal')
  expect(portalElement).toBeInTheDocument()

  const portalChildren = screen.getByRole('portal-children')
  expect(portalChildren.childElementCount).toBe(7)

  const firstChild = portalChildren.children[0]
  expect(firstChild).toHaveTextContent(/The Shawshank Redemption/i)
})

test('Renders Select.tsx with label', async () => {
  const mockData = [
    { label: 'The Shawshank Redemption', value: '1' },
    { label: 'The Godfather', value: '2' },
    { label: 'The Godfather: Part II', value: '3' },
    { label: 'The Dark Knight', value: '4' },
    { label: '12 Angry Men', value: '5' },
    { label: "Schindler's List", value: '6' },
    { label: 'Pulp Fiction', value: '7' },
  ]

  const handleClick = jest.fn()

  render(
    <Select
      options={mockData}
      onChange={handleClick}
      label='Movie'
    />
  )
  const selectElement = screen.getByText('Movie')
  expect(selectElement).toBeInTheDocument()
})

test('Renders Select.tsx without label', async () => {
  const mockData = [
    { label: 'The Shawshank Redemption', value: '1' },
    { label: 'The Godfather', value: '2' },
    { label: 'The Godfather: Part II', value: '3' },
    { label: 'The Dark Knight', value: '4' },
    { label: '12 Angry Men', value: '5' },
    { label: "Schindler's List", value: '6' },
    { label: 'Pulp Fiction', value: '7' },
  ]

  const handleClick = jest.fn()

  render(
    <Select
      options={mockData}
      onChange={handleClick}
    />
  )
  const selectElement = screen.getByRole('select')
  expect(selectElement).toHaveTextContent('label')
})

test('Renders Select.tsx with value', async () => {
  const mockData = [
    { label: 'The Shawshank Redemption', value: '1' },
    { label: 'The Godfather', value: '2' },
    { label: 'The Godfather: Part II', value: '3' },
    { label: 'The Dark Knight', value: '4' },
    { label: '12 Angry Men', value: '5' },
    { label: "Schindler's List", value: '6' },
    { label: 'Pulp Fiction', value: '7' },
  ]

  render(
    <Select
      options={mockData}
      value='1'
    />
  )
  const selectElement = screen.getByRole('input')
  expect(selectElement).toHaveValue('The Shawshank Redemption')
})

test('Renders Select.tsx with value', async () => {
  const mockData = [
    { label: 'The Shawshank Redemption', value: '1' },
    { label: 'The Godfather', value: '2' },
    { label: 'The Godfather: Part II', value: '3' },
    { label: 'The Dark Knight', value: '4' },
    { label: '12 Angry Men', value: '5' },
    { label: "Schindler's List", value: '6' },
    { label: 'Pulp Fiction', value: '7' },
  ]

  render(
    <Select
      options={mockData}
      value='2'
    />
  )
  const selectElement = screen.getByRole('cancelBtn')
  expect(selectElement).toBeInTheDocument()
})
