interface Props {
  activationAt: Date
  currentAt: Date
}

export default function remainTimeCount({ activationAt, currentAt }: Props): string {
  const activationDate = new Date(activationAt)
  const currentDate = new Date(currentAt)
  const diffTime = new Date(activationDate.getTime() - currentDate.getTime())

  // const diffDate = diffTime / (24 * 60 * 60 * 1000)
  // const diffHour = diffTime / (60 * 60 * 1000)
  // const diffMin = diffTime / (60 * 1000)

  // console.log(Math.floor(diffTime / (60 * 60 * 1000)) * 60)

  let diffTimeToTTMM
  if (diffTime.getHours() > 0) {
    diffTimeToTTMM = `${Math.floor(diffTime.getHours()) * 60 + diffTime.getMinutes()}:${
      diffTime.getSeconds() < 10 ? `0${diffTime.getSeconds()}` : diffTime.getSeconds()
    }`
  } else {
    diffTimeToTTMM = `${diffTime.getMinutes() < 10 ? `0${diffTime.getMinutes()}` : diffTime.getMinutes()}:${
      diffTime.getSeconds() < 10 ? `0${diffTime.getSeconds()}` : diffTime.getSeconds()
    }`
  }

  return diffTimeToTTMM
}

export function elapsedTime(date: Date): string {
  const start = new Date(date)
  const end = new Date()

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000)
  if (seconds < 60) return '방금 전'

  const minutes = seconds / 60
  if (minutes < 60) return `${Math.floor(minutes)}분 전`

  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}시간 전`

  const days = hours / 24
  if (days < 7) return `${Math.floor(days)}일 전`

  return `${start.toLocaleDateString()}`
}
