// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict'

var Jest = require('@glennsl/bs-jest/lib/js/src/jest.js')
var React = require('react')
var App$Client = require('../src/App.bs.js')
var TestUtils$Client = require('../src/TestUtils.bs.js')
var ReactTestingLibrary = require('bs-react-testing-library/lib/js/src/ReactTestingLibrary.bs.js')

Jest.describe('App', function(param) {
  return Jest.test('renders', function(param) {
    var component = React.createElement(
      TestUtils$Client.MockedProvider[/* make */ 0],
      {
        children: React.createElement(App$Client.make, {}),
      }
    )
    return Jest.Expect[/* toMatchSnapshot */ 16](
      Jest.Expect[/* expect */ 0](
        ReactTestingLibrary.render(undefined, undefined, component).container
      )
    )
  })
})

/*  Not a pure module */