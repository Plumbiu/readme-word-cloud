export default function randomColor() {
  const random = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ]
  return `rgb(${random.join(',')})`
}