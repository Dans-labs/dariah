import assert from 'assert'
import padStart from 'lodash/padstart'
import padEnd from 'lodash/padend'
import { sortByInterval, getDateTime } from 'fields'

/* Sort by interval */

/* 
 * Sorting by time intervals should work as follows:
 * If both intervals are fully specified, the interval with the earlier startdate comes first
 * If the startdates are equal, the one with the LATER enddate comes first.
 * In this way, containing intervals come before contained intervals.
 * If the startdate is missing, the startdate is assumed to be in the infinite past.
 * If the enddate is missing, the enddate is assumed to be in the infinite future.
 */

const testSortInterval = () => {
  describe('Sort by time interval', ()  => {
    it('with fully specified intervals', ()  => {
      const entities = {
        1: { name: 'big project',    start: '2015-01-01', end: '2017-01-01' },
        2: { name: 'work package 1', start: '2015-01-01', end: '2015-08-01' },
        3: { name: 'work package 2', start: '2015-08-01', end: '2016-04-01' },
      }
      const sortedEntities = sortByInterval('start', 'end')(Object.values(entities))
      assert.deepEqual(sortedEntities.map(e => e.name), ['big project', 'work package 1', 'work package 2'], 'order')
    })
    it('with no start time', ()  => {
      const entities = {
        1: { name: 'big project',    start: '2015-01-01', end: '2017-01-01' },
        2: { name: 'work package 1',                      end: '2015-08-01' },
        3: { name: 'work package 2', start: '2015-08-01', end: '2016-04-01' },
      }
      const sortedEntities = sortByInterval('start', 'end')(Object.values(entities))
      assert.deepEqual(sortedEntities.map(e => e.name), ['work package 1', 'big project', 'work package 2'], 'order')
    })
    it('with no end time', ()  => {
      const entities = {
        1: { name: 'big project',    start: '2015-01-01', end: '2017-01-01' },
        2: { name: 'work package 1', start: '2015-01-01' },
        3: { name: 'work package 2', start: '2015-08-01', end: '2016-04-01' },
      }
      const sortedEntities = sortByInterval('start', 'end')(Object.values(entities))
      assert.deepEqual(sortedEntities.map(e => e.name), ['work package 1', 'big project', 'work package 2'], 'order')
    })
    it('with no start and end times', ()  => {
      const entities = {
        1: { name: 'big project',    start: '2015-01-01', end: '2017-01-01' },
        2: { name: 'work package 1' },
        3: { name: 'work package 2', start: '2015-08-01', end: '2016-04-01' },
      }
      const sortedEntities = sortByInterval('start', 'end')(Object.values(entities))
      assert.deepEqual(sortedEntities.map(e => e.name), ['work package 1', 'big project', 'work package 2'], 'order')
    })
  })
}

describe('Fields', () => {
  testSortInterval()
})
