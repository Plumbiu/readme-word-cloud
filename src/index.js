import * as core from '@actions/core'
import { svgHTML } from './canvas/index.js'


function run() {
  let words = core.getInput('words')
  if (!words) {
    words = ['not', 'word', 'in', 'your', 'config']
  }
  svgHTML(words)
  core.info('running~~~~')
}

run()
