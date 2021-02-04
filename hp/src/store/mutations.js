// 提交 mutations是更改Vuex状态的唯一合法方法


export const closeForm = (state, name) => { // A组件点击更改餐馆名称为 A餐馆
  state.flag = name // 把方法传递过来的参数，赋值给state中的resturantName
}
export const openForm = (state, name) => { // B组件点击更改餐馆名称为 B餐馆
  state.flag = name
}

export const flushTable = (state, name) => {
  state.isFlush = name
}

export const noFlush = (state, name) => {
  state.isFlush = name
}

export const setUser = (state, name) => {
  state.loginUsername = name
}
