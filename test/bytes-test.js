'use strict'
const assert = require('chai').assert
describe('bytes', () => {
  const bytes = require('../src/bytes')

  it('hex by default', () => {
    const result = bytes('7f')
    assert.isArray( result )
    assert.equal( result.length, 1 )
    assert.deepEqual( result, [0x7f / 255] )
  })

  describe('hex', () => {
    it('will ignore whitespace', () => {
      const result = bytes('   #zoo kilns turn# ff00ff cc ')
      assert.equal( result.length, 4 )
    })
  })

  describe('float', () => {
    it('will bring in float data', () => {
      const result = bytes('0 0.2 -0.25 0.6', { encoding: 'float' } )
      assert.equal( result.length, 4 )
      assert.equal( result[2], -0.25 )
    })

    it('will parse exponential numbers', () => {
      const result = bytes('1e+4 1.0E4 extra data', { encoding: 'float' } )
      assert.equal( result.length, 2 )
      assert.equal( result[0], 10000 )
      assert.equal( result[1], 10000 )

    })
  })
})
