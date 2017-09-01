/*
  This piece of code is taken from naikus @ StackOverflow
  https://stackoverflow.com/users/306602/naikus

  Provided in this answer
  https://stackoverflow.com/a/3464960/3683780
 */

function findInsertionPoint (sortedArr, val, comparator) {
  let low = 0
  let high = sortedArr.length
  let mid = -1
  let c = 0

  while (low < high) {
    mid = parseInt((low + high) / 2)
    c = comparator(sortedArr[mid], val)
    if (c < 0) {
      low = mid + 1
    } else if (c > 0) {
      high = mid
    } else {
      return mid
    }
  }
  return low
}

function numComparator (val1, val2) {
  return parseInt(val2) - parseInt(val1)
}

export function sortInsertionPoint (array, value) {
  return findInsertionPoint(array, value, numComparator)
}
