import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './main'

export default createStore(reducer, applyMiddleware(thunk))
