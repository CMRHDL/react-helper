const mkdirp = require('mkdirp')
const template = require('lodash/template')
const fs = require('fs')

const index = `import <%= name %>Component from './<%= nameLower %>'

import { updateSimpleField } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
})

const <%= name %> = connect(mapStateToProps, mapDispatchToProps)(<%= name %>Component)

export default <%= name %>
`

const component = `import React from 'react'

const <%= name %> = ({
  simpleFields,
  updateSimpleField,
}) => {
  return (
    <div>
      Yo!
    </div>
  )
}

export default <%= name %>
`

const name = process.argv[2]
const nameLower = name.toLowerCase()
const path = process.cwd()

mkdirp(`${path}/${name}`, e => {
  fs.writeFile(`${path}/${name}/index.js`, template(index)({ name, nameLower }), console.log)
  fs.writeFile(`${path}/${name}/${nameLower}.js`, template(component)({ name }), console.log)
})
