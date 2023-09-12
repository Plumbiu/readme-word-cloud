import fs, { readFileSync } from 'node:fs'
import * as core from '@actions/core'
import { svgHTML } from './canvas/index.js'

const CLOUDLABEL = /<!-- cloud:start -->([\s\S]+)<!-- cloud:end -->/

function run() {
  const md = readFileSync('README.md').toString()
  if (!md) {
    core.error('README.md is not exist')
  }
  if (CLOUDLABEL.test(md)) {
    let words = core.getInput('words')
    if (!words) {
      words = ['not', 'word', 'in', 'your', 'config']
    }
    core.info('running~~~~')
    const label = CLOUDLABEL.exec(md)
    const input = label[0]
    const svg = input.replace(label[1], svgHTML(words))
    const newMd = md.replace(input, svg)
    core.info(newMd)
    fs.writeFileSync('README.md', newMd)
    return
  }
  core.info('some thing is error')
}

run()
