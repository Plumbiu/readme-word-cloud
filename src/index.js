import fs, { readFileSync } from 'node:fs'
import { svgHTML } from './canvas/index.js'

const CLOUDLABEL = /<!-- cloud:start -->([\s\S]+)<!-- cloud:end -->/

const words = ['hello', 'bar', 'foo', '你好', '世界']

function run() {
  const md = readFileSync('README.md').toString()
  if (CLOUDLABEL.test(md)) {
    const label = CLOUDLABEL.exec(md)
    const input = label[0]
    const svg = input.replace(label[1], svgHTML(words))
    const newMd = md.replace(input, svg)
    fs.writeFileSync('./README.md', newMd)
  }
}

run()