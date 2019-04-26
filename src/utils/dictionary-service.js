import store from './../store'
const dictionaryService = {
  getNameById (id) {
    const tempObj = store.state.dictionary.table.find(val => String(val.id) === String(id))
    return tempObj ? tempObj.name : '未知'
  },
  getOptionByCode (code) {
    return store.state.dictionary.table[code]
  },
  getNameByCodeAndValue (code, value) {
    const option = store.state.dictionary.table[code]
    const obj = option.find(val => String(val.value) === String(value))
    return obj ? obj.name : ''
  }
}
export default dictionaryService
