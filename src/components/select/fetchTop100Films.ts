import top100Films from './top100Films.json'

type Data = Array<{ value: string; label: string }>
export type Response = {
  status: 'idle' | 'in_progress' | 'complete' | 'error'
  result: Data
}

/**
 * @description 300ms 지연 후 `top100Films`을 리턴해야 합니다.
 */

const delay = (ms: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms)
    }, ms)
  )
}

// response 현 상태 추가를 위하여 리턴 타입을 변경하였습니다.
// MSW, json-server 등 추가적인 라이브러리를 이용하여 좀 더 현실적인 API 구축을 할 수 있으나, 이번 기술과제에서는 중요하지 않다고 판단하여 생략하였습니다.
const fetchTop100Films = async (): Promise<Response> => {
  // 코드를 작성해 주세요.
  const res: Response = {
    status: 'in_progress',
    result: [],
  }

  console.log(`main start`, res)

  try {
    await delay(300)
    res.status = 'complete'
    res.result = top100Films
    console.log(`main end`, res)
    return res
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    res.status = 'error'
    return res
  }
}

export { fetchTop100Films }
