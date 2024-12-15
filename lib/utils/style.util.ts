import ProductColor from '../enums/product-color.enum'

/**
 * Get the respective class name by color name
 * @param color color selected
 * @returns Selected class name
 */
export const mapDominantColorToClassName = (color: ProductColor | undefined): string => {
  const {
    BLACK,
    BLUE,
    BROWN,
    GREEN,
    GREY,
    KAKI,
    ORANGE,
    PINK,
    PURPLE,
    RED,
    WHITE,
    YELLOW,
    RUST,
    TAN,
    BRONZE,
    AQUAMARINE,
  } = ProductColor
  if (color === BLACK) {
    return 'black'
  } else if (color === BLUE) {
    return 'blue'
  } else if (color === BROWN) {
    return 'brown'
  } else if (color === GREEN) {
    return 'green'
  } else if (color === KAKI) {
    return 'kaki'
  } else if (color === ORANGE) {
    return 'orange'
  } else if (color === PINK) {
    return 'pink'
  } else if (color === PURPLE) {
    return 'purple'
  } else if (color === RED) {
    return 'red'
  } else if (color === WHITE) {
    return 'white'
  } else if (color === YELLOW) {
    return 'yellow'
  } else if (color === GREY) {
    return 'gray'
  } else if (color === RUST) {
    return 'rust'
  } else if (color === TAN) {
    return 'tan'
  } else if (color === BRONZE) {
    return 'bronze'
  } else if (color === AQUAMARINE) {
    return 'aquamarine'
  } else {
    return 'white'
  }
}
