import React, { useEffect, useReducer } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import EventForm from './EventForm'
import Events from './Events'
import OperationLogs from './OperationLogs'
import AppContext from '../contexts/AppContext.js'
import reducer from '../reducers'

const APP_KEY = 'appWithRedux'

const App = () => {   
  //useEffectでsetした値を変数に格納し、真の場合その文字列を採用
  //(ただし文字列のままでは使えないのでオブジェクトに戻してあげる必要がある)、
  //偽の場合初回とみなし、以下を実行
  const appState = localStorage.getItem(APP_KEY)
  const initialState = appState ? JSON.parse(appState) : {
    events: [],
    operationLogs: []
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  //状態遷移をさせたいタイミングでdispatchを呼ぶ、dispatchの引数にはactionが渡り、actionのtypeをswitchで条件分けしている(reducer)

  useEffect(() => {                    //localStorage保存させるには文字列化させる必要がある
    localStorage.setItem(APP_KEY, JSON.stringify(state))
  }, [state])  //stateに更新が行われるたびに、その最新状態をlocalStorageに保存する

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container-fluid">
        <EventForm />
        <Events />
        <OperationLogs />
      </div>
    </AppContext.Provider>
  )
}

export default App