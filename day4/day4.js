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
  /**
   * @function getType
   * Type 0 - Guard Shift Change / 1 - Falls Asleep / 2 - Wakes up
   * @param  {string} logLine line of log
   * @return {number} Type
   */
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
   * @function prepareData
   * Convert File Logs to readable formatted Array
   * @return {object} Array of formatted Data
   */
  prepareData (data) {
    let logLines = data.split('\n').sort()
    this.inputData = this.getParsedData(logLines)
  }
  /**
   * @function accumulateData
   * Accumulate all date's data per guard into a midnight minutes array 0 - 59
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
  }
  /**
   * @function getMostCommonMinute
   * @return {number} index of minutes array
   */
  getMostCommonMinute (guardID) {
    return this.guards[guardID].indexOf(Math.max(...this.guards[guardID]))
  }
  /**
   * @function getLongSleptGuard
   * finds guard who slept most in all day
   * @return {number} Guard ID
   */
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
      if (maxGuardSleptTime < guardTOTAL) {
        longSleptGuard = guard
        maxGuardSleptTime = guardTOTAL
      }
    }
    return longSleptGuard;
  }
  /**
   * @function part1
   * Part 1 of Day 4
   */
  part1 () {
    let longSleptGuard = this.getLongSleptGuard()
    let commonMinute = this.getMostCommonMinute(longSleptGuard)
    console.log('Part 1 Answer:', longSleptGuard * commonMinute)
  }
  /**
   * @function part2
   * Part 2 of Day 4
   */
  part2 () {
    let currentMax = 0
    let currentGuard = ''
    let mostFreqMin = -1
    let allGuards = Object.keys(this.guards)
    for (let i =0; i < allGuards.length; i++) {
      let guard = allGuards[i]
      for(let j = 0; j < this.guards[guard].length; j++) {
        if (currentMax <  this.guards[guard][j]) {
          currentMax = this.guards[guard][j]
          mostFreqMin = j
          currentGuard = guard
        }
      }
    }
    console.log('Part 2 Answer:', mostFreqMin * currentGuard)
  }
  /**
   * @function executeStrategies
   * @return {number} Guard ID multiplied with Minute
   */
  executeStrategies () {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
      if (!err) {
        this.prepareData(data)
        this.accumulateData()
        this.part1()
        this.part2()
      } else {
        console.log(err)
      }
    })
  }

}

function run () {
  let guards = new TimeSheet()
  guards.executeStrategies()
}
run()
