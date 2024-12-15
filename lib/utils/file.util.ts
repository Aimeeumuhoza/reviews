export const getBase64 = (img: Blob | MediaSource, callback: (obj: string) => void): void =>
  callback(URL.createObjectURL(img))
