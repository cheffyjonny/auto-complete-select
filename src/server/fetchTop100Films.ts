import top100Films from './data/top100Films.json'
import top100FilmsLonger from './data/top100FilmsLonger.json'

type Data = Array<{ value: string; label: string }>
export type Response = {
  status: 102 | 200 | 400
  res: {
    status: 'idle' | 'in_progress' | 'complete' | 'error'
    result: Data
  }
}

// Function to add delay on purpose
const delay = (ms: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms)
    }, ms)
  )
}

// Changed response structure to add current status.
// It's possible to make something more realistic with MSW, json-server, etc.
// However, personally it's not necessary to build with extra library for the task's purpose.
const fetchTop100Films = async (): Promise<Response> => {
  // Init response with 'in progress'
  const res: Response = {
    status: 102,
    res: {
      status: 'in_progress',
      result: [],
    },
  }

  try {
    await delay(300)
    res.res.status = 'complete'
    res.res.result = top100Films

    return res
  } catch (error) {
    //  Handle error, which wouldn't happen in this case...
    console.error('Error:', error)
    res.res.status = 'error'
    return res
  }
}

const fetchTop100FilmsLonger = async (): Promise<Response> => {
  // Init response with 'in progress'
  const res: Response = {
    status: 102,
    res: {
      status: 'in_progress',
      result: [],
    },
  }
  try {
    await delay(300)
    res.res.status = 'complete'
    res.res.result = top100FilmsLonger

    return res
  } catch (error) {
    //  Handle error, which wouldn't happen in this case...
    console.error('Error:', error)
    res.res.status = 'error'
    return res
  }
}

export { fetchTop100Films, fetchTop100FilmsLonger }
