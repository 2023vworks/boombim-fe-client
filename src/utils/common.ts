export function isEmptyString(value: string): string | 'EMPTY' {
  return value === '' ? 'EMPTY' : value
}

const checkedDupShop = (array: string[]) => {
  return array.map((el: string) => {
    if (!el.includes('#')) {
      return el
    } else {
      const splitItem = el.split('')
      return splitItem.reduce((acc, cur) => {
        return cur === '#' ? cur : acc + cur
      })
    }
  })
}

export function getCheckedHashTagArray(text: string) {
  const reg: RegExp = /#([\S]+)/gim
  const splitText = text.split(' ')
  const checkedDupShopText = checkedDupShop(splitText).join(' ')
  const result = (checkedDupShopText.match(reg) || []).map((e) => e.replace(reg, '$1'))

  return result
}
