import React, { useContext } from 'react'

import Event from './Event'
import AppContext from '../contexts/AppContext.js'

const Events = () => {  //引数ではなるべく値を渡さない
  const { state } = useContext(AppContext)
      //combineReducerによってstateは配列では無くなった(オブジェクトになった)ので、state.mapではなくstate.events.mapとする
  return (
    <>
      <h4>イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディー</th>
            <th></th>
          </tr>
        </thead>
        <tbody>     
          { state.events.map((event, index) => (<Event key={index} event={event} />))}　
        </tbody>
      </table>
    </>
  )
}   //dispatchで渡ってくるデータをmapで一覧表示。mapにはkeyが必須(そうすることでuniqueなidが振られたデータを一つずつ表示する)
//propを使ってeventは渡す
//indexのところはもちろんevent.idでもいいが、標準の機能に則ってindexとした方がバグが起きない
//ピンクの()がreturn, 

export default Events