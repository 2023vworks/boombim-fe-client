export default function getMbtiName({ mbti, nickname }: { mbti: string; nickname: string }) {
  return `${mbti}#${nickname}`
}
