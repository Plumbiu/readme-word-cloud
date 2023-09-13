import { createCanvas } from 'canvas'
import sharp from 'sharp'
import D3Node from 'd3-node'
import cloud from 'd3-cloud'
import * as core from '@actions/core'
import randomColor from './randomColor.js'

const options = { selector: '#chart', container: '<div id="chart"></div>' }
const d3n = new D3Node(options)
export function svgHTML(words) {
  words = words.map(d => ({
    text: d,
    size: 10 + Math.random() * 90,
  }))
  core.info(words)
  // TODO: diy height and width
  const layout = cloud()
    .canvas(() =>  createCanvas(1, 1))
    .size([600, 300])
    .words(words)
    .padding(5)
    .rotate(() => {
      return Math.floor(Math.random() * 90)
    })
    .fontSize(d => d.size)
    .on('end', () => draw(layout, words))

  layout.start()
  const svg = d3n.svgString().replace(
    'xmlns="http://www.w3.org/2000/svg"',
    'xmlns="http://www.w3.org/2000/svg" width="600" height="300"'
  )
  console.log(svg)
  sharp(Buffer.from(svg)).resize(600, 300).toFile('word-cloud.png', (err, info) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log(info)
    }
  })
}

function draw(layout, words) {
  d3n
    .createSVG()
    .append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', d => {
      return d.size + 'px'
    })
    .style('font-family', 'Impact')
    .attr('text-anchor', 'middle')
    .style('fill', () => randomColor())
    .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
    .text(d => d.text)
}
