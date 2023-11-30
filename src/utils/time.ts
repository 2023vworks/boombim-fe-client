interface Props {
  activationAt: string
  currentAt: string
}

export default function remainTimeCount({ activationAt, currentAt }: Props): string {
  const activationDate = new Date(activationAt)
  const currentDate = new Date(currentAt)
  let diffTimeToTTMM

  if (activationDate < currentDate) {
    diffTimeToTTMM = '00:00'
    return diffTimeToTTMM
  }
  const diffTime = activationDate.getTime() - currentDate.getTime()

  const secondsDifference = diffTime / 1000
  const minutesDifference = secondsDifference / 60
  const hoursDifference = minutesDifference / 60

  const hours = Math.floor(hoursDifference)
  const minutes = Math.floor(minutesDifference % 60)
  const seconds = Math.floor(secondsDifference % 60)

  if (hours > 0) {
    diffTimeToTTMM = `${Math.floor(hours) * 60 + minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  } else {
    diffTimeToTTMM = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  return diffTimeToTTMM
}

export function elapsedTime(date: string): string {
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
