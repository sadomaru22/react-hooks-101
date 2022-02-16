import { combineReducers } from 'redux'

import events from './events'
import operationLogs from './operationLogs'


//二つのReducerをcombine(統合)する(ただし変更前と違ってオブジェクトを渡すことになるので、App.js側も修正が必要)
export default combineReducers({
  events,
  operationLogs
})
