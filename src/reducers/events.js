import {
   CREATE_EVENT,
   DELETE_ALL_EVENTS,
   DELETE_EVENT
 } from '../actions'
 
 // action = {
 //   type: 'CREATE_EVENT',
 //   titile: '2020東京オリンピックのお知らせ',
 //   body: '2020年に東京でオリンピックを開催します！つきましては、、、、、、、'
 // }
 //
 //
 // # before
 // state = []
 //
 // # after
 // state = [
 //   {
 //     id: 1,
 //     titile: '2020東京オリンピックのお知らせ',
 //     body: '2020年に東京でオリンピックを開催します！つきましては、、、、、、、'
 //   }
 // ]
 //
 // # before
 // state = [
 //   { id: 1, title: 'タイトル1', body: 'ボディー1'},
 //   { id: 2, title: 'タイトル2', body: 'ボディー2'},
 //   { id: 3, title: 'タイトル3', body: 'ボディー3'},
 // ]
 //
 // # after
 // state = [
 //   { id: 1, title: 'タイトル1', body: 'ボディー1'},
 //   { id: 2, title: 'タイトル2', body: 'ボディー2'},
 //   { id: 3, title: 'タイトル3', body: 'ボディー3'},
 //   {
 //     id: 4,
 //     titile: '2020東京オリンピックのお知らせ',
 //     body: '2020年に東京でオリンピックを開催します！つきましては、、、、、、、'
 //   }
 // ]
 const events = (state = [], action) => {
   switch(action.type) {
     case CREATE_EVENT:
       const event = { title: action.title, body: action.body }
       const length = state.length
       const id = length === 0 ? 1 : state[length - 1].id + 1
       return [...state, { id, ...event }]
     case DELETE_EVENT:
       return state.filter(event => event.id !== action.id)
     case DELETE_ALL_EVENTS:
       return []
     default:
       return state
   }
 }

//  const events = (state = [], action) => {   //stateが未定義だった場合[]になる
//   switch(action.type) {
//      case'CREATE_EVENT':
//         const event = { title: action.title, body: action.body }
//         const length = state.length
//         // let id
//         // if (length === 0) {
//         //    id = 1   //最初
//         // } else {
//         //    id = state[length - 1].id + 1
//         // }
//         const id = length === 0 ? 1 : state[length - 1].id + 1
//         return [...state, id, ...event]   //一旦前の状態を展開(...state)して、最後の要素に、今回作ったイベント情報を追加してあげる
//      case'DELETE_EVENT':
//         return state.filter(event => event.id !== action.id) //actionで渡ってくるアタイじゃないやつだけ抽出
//      case'DELETE_ALL_EVENT':
//         return []      //[]空配列を返す＝全削除
//      default:
//         return state

//   }
// }
 
 export default events