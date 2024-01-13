# 인사말

안녕하세요. 지원자 이주헌입니다.

우선 모인과 함께 과제 인터뷰 할 수 있는 기회를 주셔서 감사하다는 말씀 드립니다. 컴포넌트의 사용된 논리들을 정리 해보았습니다. 추가로 과제를 하며 느낀점을 간략하게 서술하여 보았습니다.

# 부가적인 코드 설명

## 사용된 논리 - 기능 구현을 위하여 Select.tsx 컴포넌트에 사용된 state 그리고 ref

- inputRef: input 포커스를 위한 ref
- resultContainerRef: 키보드 이벤트를 통한 목록 스크롤과 선택된 옵션이 있을시 선택된 옵션으로 스크롤 된 화면은 디스플레이 하기 위한 ref

- isFocused :  포커스 체크, 스타일링 토글을 위한 state
- isActivated : value 값 유무 판단을 위한 state
- anchorEl : 목록 디스플레이를 위한 state
- focusedIndex : 목록 키보드 이벤트와 마우스 hover 이벤트를 위한 인덱스 state
- selectedOption : input value값 디스플레이를 위한 state
- selectedOptionValue : 선택된 옵션 디스플레이를 위한 state

## Demo.tsx 셋업

- Demo.tsx 페이지에 임의적인 height를 주어서 제시해주신 과제 목록 중 한가지인 공간에 따른 디스플레이를 테스트 할 수 있도록 구성하였습니다.
- 제공해주신 2가지 컴포넌트 에 selectedValue를 주어, 기본값 제시시 디스플레이 여부를 확인할 수 있도록 하였습니다.
- 목록 중 가장 긴 옵션에 따라 width변경을 보여드리기 위하여, 새로운 mock data(top100FilmsLonger.json)를 만들어 적용하였습니다.

# 느낀점

library 혹은 framework를 사용하지 않고 컴포넌트를 만드는 작업은 시간이 오래 걸리고 복잡한 논리들을 적용한다는 점이 어렵게 느껴질 떄가 있으나, 항상 재밌고 뿌듯한 작업입니다. <br>
복잡한 논리들을 하나둘 씩 풀어 하나의 퍼즐을 맞추는 듯한 점에서 큰 성취감을 얻을 수 있고, 제한없이 모든 부분을 제가 원하는대로 만들수 있다는 점은 큰 재미를 가져다 줍니다.

이번 과제를 통해, 다시 한번 큰 성취감을 얻을 수 있었고 만드는 과정 동안 많은 재미를 보았습니다.

모인과의 과제 인터뷰를 진행할 수 뜻 깊은 기회를 주셔서 다시 한번 감사하다는 말씀 드리고 싶습니다.

감사합니다.

이주헌 드림.

# 실행법

- To install the package and run the project: `npm install && npm start`
- To test the project : npm run test
