const fs = require('fs')

function fixTimeStream () {
  fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (!err) {
      let coOrds = data.split('\n').map(row => {
        return row.split(', ').map(Number)
      })
      let maxCordValue = 400; // Can be driven dynamically from co-ords.
      let largestArray = new Array(coOrds.length).fill(0);
      let grid = new Array(maxCordValue).fill(0).map(i => {
        return new Array(maxCordValue).fill('0')
      });
      let regionSize = 0
      for (let row = 0; row < maxCordValue; row++) {
        for (let column = 0; column < maxCordValue; column++) {
          let lowestCoordIndex = -1
          let currentLowestDistance = Number.MAX_SAFE_INTEGER
          let isCoOrdinate = false
          let dupFound = false
          let sumCoords = 0;
          for (let cordIndx = 0; cordIndx < coOrds.length; cordIndx++) {
            if (row === coOrds[cordIndx][1] && column === coOrds[cordIndx][0]) {
              isCoOrdinate = true
              break;
            }
            let manhattenDistance = Math.abs(column - coOrds[cordIndx][0]) + Math.abs(row - coOrds[cordIndx][1])
            sumCoords += manhattenDistance;
            if (manhattenDistance < currentLowestDistance) {
              currentLowestDistance = manhattenDistance
              lowestCoordIndex = cordIndx;
              dupFound = false
            } else if (manhattenDistance === currentLowestDistance) {
              dupFound = true
            }
          }
          if (!isCoOrdinate && sumCoords < 10000) {
            grid[row][column] = '#'
            regionSize++;
          }
          if (isCoOrdinate || dupFound) {
            continue;
          }
          if (!row || row === maxCordValue - 1 || !column || column === maxCordValue - 1) {
            largestArray[lowestCoordIndex] = -1
          } else if (largestArray[lowestCoordIndex] !== -1) {
            largestArray[lowestCoordIndex]++;
          }
        }
      }
      let largestArea = Math.max(...largestArray) + 1
      console.log('Part 1:', largestArea)
      for (let cordIndx = 0; cordIndx < coOrds.length; cordIndx++) {
        let currentRow = coOrds[cordIndx][1];
        let currentColumn = coOrds[cordIndx][0];
        if (!currentRow || currentRow === maxCordValue - 1 || !currentColumn || currentColumn === maxCordValue - 1) {
          continue;
        }
        let top = grid[currentRow - 1][currentColumn];
        let bottom = grid[currentRow + 1][currentColumn];
        let left = grid[currentRow][currentColumn - 1];
        let right = grid[currentRow][currentColumn + 1];
        if (top === '#' && bottom === '#' && left === '#' && right === '#') {
          regionSize++;
        }
      }
      console.log('Part 2:', regionSize);
      
    }
  })
}
fixTimeStream()