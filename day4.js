/*
TODO:
    SETUP:
    - parse data
    - order log data - chronological
    - ID key in hash table
    - value as minutes array (index => mins, value => count of mins on all days)
        - sleeping minutes will be incremented at each log traversal

    PART 1:
    - count all values in array - find max with ID.
    - with found ID, get index with max value.
    - multiply index with ID.
*/
let fs = require('fs')
class TimeSheet {
  constructor () {
    this.guards = {} // Guards Info key - ID, value - Midnight minutes Array
    this.inputData = []
  }
  /**
   * @function getParsedData
   * @return {object} Array of Parsed Data
   */
  getParsedData (logs) {
    let re = /\[(.+)\]\s\w+\s#?(\d+)?/ // TODO update REGEX
    let guardID = ''
    return logs.map(logLine => {
      let match = logLine.match(re).slice(1,3)
      return [match[0], guardID, type]
    })
  }
  /**
   * @function getOrderedData
   * Order by Timestamp ASC.
   * @return {object} Array of Ordered Data
   */
  getOrderedData () {

  }
  /**
   * @function preparedData
   * Convert File Logs to readable formatted Array
   * @return {object} Array of formatted Data
   */
  preparedData () {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
      if (!err) {
        let logLines = data.split('\n')
        let parsedLines = this.getParsedData(logLines)
        this.inputData = this.getOrderedData(parsedLines)
      }
    })
  }
  /**
   * @function accumulateData
   * @return {type} {description}
   */
  accumulateData () {

  }
  /**
   * @function getMostCommonMinute
   * @return {number} index of minutes array
   */
  getMostCommonMinute () {

  }
  /**
   * @function findGuardMultipliedWithMinutes
   * @return {number} Guard ID multiplied with Minute
   */
  findGuardMultipliedWithMinutes () {

  }

}

function run () {
  let guards = new TimeSheet()
  guards.preparedData()
  let answer = guards.findGuardMultipliedWithMinutes()
  console.log('Answer:', answer)
}
run()
