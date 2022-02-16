import {
   ADD_OPERATION_LOG,
   DELETE_ALL_OPERATION_LOGS
 } from '../actions'
 
 const operationLogs = (state = [], action) => {
   switch (action.type) {
     case ADD_OPERATION_LOG:
       const operationLog = {
         description: action.description,   //内容
         operatedAt: action.operatedAt      //日時
       }
       return [operationLog, ...state]  //stateは配列としているため、この書き方になる(ただし後でcombineReducerでオブジェクトの一つになる)
     case DELETE_ALL_OPERATION_LOGS:
       return []
     default:  //どちらでもない場合
       return state
   }
 }
 
 export default operationLogs