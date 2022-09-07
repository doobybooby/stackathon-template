import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import blogs from './blog'
import news from './news'
import reply from './reply'
import comments from './comments'


const reducer = combineReducers({ auth, blogs, news, reply, comments  })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './auth'
