import React, { useContext, useState } from 'react'

import {
  CREATE_EVENT,
  DELETE_ALL_EVENTS,
  ADD_OPERATION_LOG,
  DELETE_ALL_OPERATION_LOGS
} from '../actions'
import AppContext from '../contexts/AppContext.js'
import { timeCurrentIso8601 } from '../utils'

const EventForm = () => {   //stateがコンポーネントごとに独立してしまわないように注意する
  const { state, dispatch } = useContext(AppContext)　　//useReducer(reducer, [])(Redux使う前)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  //状態を次に入力に向けて初期化したりしたいときはuseState使えばいい。operationLogに関しては追加して表示して、削除するしかしないので不要。

  const addEvent = e => {
    e.preventDefault()

    dispatch({
      type: CREATE_EVENT,
      title,
      body       //ここで新しく渡ってきたtitleとbodyを保管して、イベント一覧へ渡す
    })

    dispatch({
      type: ADD_OPERATION_LOG,
      description: 'イベントを作成しました。',
      operatedAt: timeCurrentIso8601()
    })

    setTitle('')   //ここで初期化(次の入力に向けて)
    setBody('')
  }

  const deleteAllEvents = e => {
    e.preventDefault()　　　　　　　　　　　　　　//OK押すとtrue, キャンセル押すとfalseが返るAPI
    const result = window.confirm('全てのイベントを本当に削除しても良いですか？')
    if (result) {
      dispatch({ type: DELETE_ALL_EVENTS })

      dispatch({
        type: ADD_OPERATION_LOG,
        description: '全てのイベントを削除しました。',
        operatedAt: timeCurrentIso8601()
      })
    }
  }

  const unCreatable = title === '' || body === ''   //空の状態でイベントが作成されるのを抑止する

  const deleteAllOperationLogs = e => {
    e.preventDefault()
    const result = window.confirm('全ての操作ログを本当に削除しても良いですか？')

    if (result) {
      dispatch({
        type: DELETE_ALL_OPERATION_LOGS
      })
    }
  }
    //トップレベルにh4とformがあると怒られるので、<></>をつける
    //combineReducerによってstateは配列では無くなった(オブジェクトになった)ので、state.lengthではなくstate.events.lengthとする
  return (
    <>
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">タイトル</label>                      
          <input className="form-control" id="formEventTitle" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="formEventBody">ボディー</label>
          <textarea className="form-control" id="formEventBody" value={body} onChange={e => setBody(e.target.value)}/>
        </div>

        <button className="btn btn-primary" onClick={addEvent} disabled={unCreatable}>イベントを作成する</button>   
        <button className="btn btn-danger" onClick={deleteAllEvents} disabled={state.events.length === 0}>全てのイベントを削除する</button>
        <button className="btn btn-danger" onClick={deleteAllOperationLogs} disabled={state.operationLogs.length === 0}>全ての操作ログを削除する</button>
      </form>
    </>
  )
}

export default EventForm