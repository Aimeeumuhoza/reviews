export const listOrderDetailItemName = (
  items: {
    name: string
    imgUrls: string[]
    orderedQuantity: number
  }[],
): string => {
  let fullText = ''
  items.forEach((item, idx) => {
    let text = `${item.name} (${item.orderedQuantity})`
    text += idx === items.length - 1 ? '' : ', '
    fullText += text
  })
  return fullText
}

export const mapLongStringToEllipsis = (str: string, maxlimit: number): string => {
  return str.length > maxlimit ? str.substring(0, maxlimit - 3) + '...' : str
}

export const capitalize = (str?: string): string => {
  return str
    ? str
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    : ''
}
