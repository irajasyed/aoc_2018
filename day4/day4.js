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
    let guardID = 0
    let match = []
    let type = ''
    return logs.map(logLine => {
      match = logLine.match(re).slice(1,3)
      if (match[1]) {
        guardID = parseInt(match[1])
      }
      type = this.getType(logLine)
      return [match[0], guardID, type]
    })
  }
  getType (logLine) {
    let type = ''
    if (logLine.includes('falls asleep')) {
      type = 1
    } else if (logLine.includes('wakes up')) {
      type = 2
    } else {
      type = 0
    }
    return type
  }
  /**
   * @function getOrderedData
   * Order by Timestamp ASC.
   * @return {object} Array of Ordered Data
   */
  getOrderedData (logs) {
    return logs.sort()
  }
  /**
   * @function prepareData
   * Convert File Logs to readable formatted Array
   * @return {object} Array of formatted Data
   */
  prepareData (data) {
    let logLines = data.split('\n')
    let parsedLines = this.getParsedData(logLines)
    this.inputData = this.getOrderedData(parsedLines)
  }
  /**
   * @function accumulateData
   * @return {type} {description}
   */
  accumulateData () {
    let currentGuardID = ''
    let fallsAsleepAt = -1
    for (let i = 0; i < this.inputData.length; i++) {
      let currentTimeStamp = this.inputData[i][0]
      if (this.inputData[i][2] === 1) { // Falls Asleep
        currentGuardID = this.inputData[i][1]
        let timeData = currentTimeStamp.match(/.*(\d+):(\d+)/)
        if (parseInt(timeData[1])) {
          fallsAsleepAt = 0
        } else {
          fallsAsleepAt = parseInt(timeData[2])
        }
      } else if (this.inputData[i][2] === 2) { // Wakes Up
        let timeData = currentTimeStamp.match(/.*(\d+):(\d+)/)
        while(fallsAsleepAt < parseInt(timeData[2])) {
          if (!this.guards[currentGuardID]) {
            this.guards[currentGuardID] = new Array(60).fill(0);
          }
          this.guards[currentGuardID][fallsAsleepAt]++;
          fallsAsleepAt++;
        }
        fallsAsleepAt = -1
      } else { // Guard Shift Changes
        currentGuardID = this.inputData[i][1]
      }
    }
    console.log(JSON.stringify(this.guards))
  }
  /**
   * @function getMostCommonMinute
   * @return {number} index of minutes array
   */
  getMostCommonMinute (guardID) {
    return this.guards[guardID].indexOf(Math.max(...this.guards[guardID]))
  }
  getLongSleptGuard () {
    let longSleptGuard = ''
    let maxGuardSleptTime = 0
    let allGuards = Object.keys(this.guards)
    for (let i =0; i < allGuards.length; i++) {
      let guard = allGuards[i]
      let guardTOTAL = 0
      for(let j = 0; j < this.guards[guard].length; j++) {
        guardTOTAL += this.guards[guard][j] 
      }
      console.log(guard, guardTOTAL)
      if (maxGuardSleptTime < guardTOTAL) {
        longSleptGuard = guard
        maxGuardSleptTime = guardTOTAL
      }
    }
    return longSleptGuard;
  }
  /**
   * @function findGuardMultipliedWithMinutes
   * @return {number} Guard ID multiplied with Minute
   */
  findGuardMultipliedWithMinutes () {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
      if (!err) {
        this.prepareData(data)
        this.accumulateData()

        let longSleptGuard = this.getLongSleptGuard()
        let commonMinute = this.getMostCommonMinute(longSleptGuard)
        console.log('Answer', longSleptGuard, commonMinute, longSleptGuard * commonMinute)
      } else {
        console.log(err)
      }
    })
  }

}

function run () {
  let guards = new TimeSheet()
  
  guards.findGuardMultipliedWithMinutes()
  // console.log('Answer:', answer)
}
run()
