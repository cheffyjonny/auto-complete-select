import top100Films from './data/top100Films.json'
import top100FilmsLonger from './data/top100FilmsLonger.json'

type Data = Array<{ value: string; label: string }>
export type Response = {
  status: 'idle' | 'in_progress' | 'complete' | 'error'
  result: Data
}

/**
 * @description 300ms 지연 후 `top100Films`을 리턴해야 합니다.
 */

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
  // 코드를 작성해 주세요.

  // Init response with 'in progress'
  const res: Response = {
    status: 'in_progress',
    result: [],
  }

  try {
    await delay(300)
    res.status = 'complete'
    res.result = top100Films

    return res
  } catch (error) {
    //  Handle error, which wouldn't happen in this case...
    console.error('Error:', error)
    res.status = 'error'
    return res
  }
}

const fetchTop100FilmsLonger = async (): Promise<Response> => {
  // 코드를 작성해 주세요.

  // Init response with 'in progress'
  const res: Response = {
    status: 'in_progress',
    result: [],
  }

  try {
    await delay(300)
    res.status = 'complete'
    res.result = top100FilmsLonger

    return res
  } catch (error) {
    //  Handle error, which wouldn't happen in this case...
    console.error('Error:', error)
    res.status = 'error'
    return res
  }
}

export { fetchTop100Films, fetchTop100FilmsLonger }
