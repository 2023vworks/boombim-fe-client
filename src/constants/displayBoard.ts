/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export const MBTI_UNION_TYPE = {
  ISTJ: 'ISTJ',
  ISFJ: 'ISFJ',
  INFJ: 'INFJ',
  INTJ: 'INTJ',
  ISTP: 'ISTP',
  ISFP: 'ISFP',
  INFP: 'INFP',
  INTP: 'INTP',
  ESTP: 'ESTP',
  ESFP: 'ESFP',
  ENFP: 'ENFP',
  ENTP: 'ENTP',
  ESTJ: 'ESTJ',
  ESFJ: 'ESFJ',
  ENFJ: 'ENFJ',
  ENTJ: 'ENTJ',
} as const

export type MBTI_TYPE = (typeof MBTI_UNION_TYPE)[keyof typeof MBTI_UNION_TYPE]

interface mbtiType {
  [key: string]: string[]
}

export const MBTI_INFO: mbtiType = {
  [MBTI_UNION_TYPE.ISTP]: ['#근면성실', '#모범생', '#꼼꼼이', '#짠돌이'],
  [MBTI_UNION_TYPE.ISFJ]: ['#살림꾼', '#홧병조심', '#냉철한 마음', '#유치원 교사 st'],
  [MBTI_UNION_TYPE.INFJ]: ['#고민쟁이', '#성직자', '#시인', '#나는 누구인가'],
  [MBTI_UNION_TYPE.INTJ]: ['#과학자', '#책벌레', '#지적 카리스마', '#천재 or 바보'],
  [MBTI_UNION_TYPE.ISTP]: ['#귀차니즘', '#개인주의', '#방관자', '#혼자서도 잘해요'],
  [MBTI_UNION_TYPE.ISFP]: ['#순둥이', '#평화주의자', '#조용한 예술가', '#성인군자'],
  [MBTI_UNION_TYPE.INFP]: ['#몽상가', '#두부멘탈', '#우유부단', '#작가'],
  [MBTI_UNION_TYPE.INTP]: ['#호기심천국', '#아이디어 뿜뿜', '#피터팬', '#명탐정'],
  [MBTI_UNION_TYPE.ESTP]: ['#폼생폼사', '#팔방미인', '#겁없는 해결사', '#임기응변'],
  [MBTI_UNION_TYPE.ESFP]: ['#분위기 메이커#', '#흥부자', '#파뤼 피플', '#마당발'],
  [MBTI_UNION_TYPE.ENFP]: ['#취미부자', '#4차원', '#안드로메다st', '#자유로운 영혼'],
  [MBTI_UNION_TYPE.ENTP]: ['#자아도취', '#모험가', '#발명가', '#독고다이'],
  [MBTI_UNION_TYPE.ESTJ]: ['#행동대장', '#팩트 폭격', '#일 중독', '#바른생활'],
  [MBTI_UNION_TYPE.ESFJ]: ['#오지라퍼', '#방청객', '#리액션', '#프로 칭찬러'],
  [MBTI_UNION_TYPE.ENTJ]: ['#나를 따르라#!', '#하면 된다', '#나가자', '#싸우자', '#이기자'],
}

export const BOARD_UNION_TYPE = {
  MAIN: 'MAIN',
  PICK_MARKER: 'PICK_MARKER',
  FEED_LIST: 'FEED_LIST',
  MY_PAGE: 'MY_PAGE',
  MY_FEED_LIST: 'MY_FEED_LIST',
} as const

export type BOARD_TYPE = (typeof BOARD_UNION_TYPE)[keyof typeof BOARD_UNION_TYPE]
