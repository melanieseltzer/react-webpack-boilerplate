import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/counter.js'
// Preserve React state on reload
import { AppContainer } from 'react-hot-loader'

// Render function
// Accept any Component
function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react-root')
  )
}

// Call render with the Counter component
render(Counter)

// If module is coming in from hot reload, has accept function on it
if (module.hot) {
  // If module's name is counter.js, run this function
  // It re-requires the component and re-renders it
  module.hot.accept('./components/counter.js', () => {
    const NewCounter = require('./components/counter.js').default
    render(NewCounter)
  })
}
