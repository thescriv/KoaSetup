const MockDate = require('mockdate')

function mockDate() {
  MockDate.set(new Date('2020-02-09T10:30:00.000Z'))
}

function restoreDate() {
  MockDate.reset()
}

module.exports = {
  mockDate,
  restoreDate
}
