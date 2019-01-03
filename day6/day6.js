/*
day 6:

GRID SIZE:
- loop input
- find maxCordValue
- use MaxCordValue to setup grid size.

Fill GRID:
- loop grid points,
- compare each point with all cord and update lowest manhatten score's co-ord index.
    - if lowest exist in multiple co-ord fill grid with -1
- once updated set increment value of selected coord index in largest array.
    - when comparing if grid row/col index is 0 / len - 1 update largestArr index with -1


- return largest value

*/
const fs = require('fs')

function findLargestArea () {
  fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (!err) {
      let coOrds = data.split('\n').map(row => {
        return row.split(', ').map(Number)
      })
      console.log('CO-ORDS', coOrds)
      let maxCordValue = 10;
      let largestArray = new Array(coOrds.length).fill(0);
      let grid = new Array(maxCordValue).fill(0).map(i => {
        return new Array(maxCordValue).fill(0)
      });
      for (let column = 0; column < maxCordValue; column++) {
        for (let row = 0; row < maxCordValue; row++) {
          // if (!row || row === maxCordValue - 1 || !column || column === maxCordValue - 1) { // handle infinite possibilities
          //   grid[row][column] = lowestCoordIndex;
          //   largestArray[]
          //   continue;
          // }
          let lowestCoordIndex = -1
          let currentLowestDistance = Number.MAX_SAFE_INTEGER
          for (let cordIndx = 0; cordIndx < coOrds.length; cordIndx++) {
            let manhattenDistance = Math.abs(column - coOrds[cordIndx][0]) + Math.abs(row - coOrds[cordIndx][1])
            if (manhattenDistance < currentLowestDistance) {
              currentLowestDistance = manhattenDistance
              lowestCoordIndex = cordIndx;
            } else if (manhattenDistance === currentLowestDistance) {
              lowestCoordIndex = -1
              break;
            }
          }
          grid[row][column] = lowestCoordIndex;
          if (lowestCoordIndex === -1) {
            continue;
          }
          if (!row || row === maxCordValue - 1 || !column || column === maxCordValue - 1) {
            largestArray[lowestCoordIndex] = -1
          } else if (lowestCoordIndex !== -1) {
            largestArray[lowestCoordIndex]++;
          }
        }
      }
      console.log(grid)
      console.log(largestArray)
    }
  })
}
findLargestArea()