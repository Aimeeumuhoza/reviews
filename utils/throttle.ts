let pause: boolean

export const throttle = (callback: any, interval: number): void => {
  if (pause) return

  pause = true

  setTimeout(() => {
    callback()

    pause = false
  }, interval)
}
