'use strict'

const test = require('ava')
const utils = require('../lib/utils')

test('extracting # from text', t => {
  let tags = utils.extractTags('a #picture with tags #AwEsOmE learning #NodeJs #100 ##Yeah')
  t.deepEqual(tags, [
    'picture',
    'awesome',
    'nodejs',
    '100',
    'yeah'
  ])

  tags = utils.extractTags('a picture with tags awesome learning NodeJs 100 Yeah')
  t.deepEqual(tags, [])

  tags = utils.extractTags(null)
  t.deepEqual(tags, [])
})
