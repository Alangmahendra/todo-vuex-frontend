import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const token = localStorage.getItem('token')
const http = axios.create({
  baseURL: 'http://neoal.xyz:3001/api'
})

Vue.use(Vuex)

const state = {
  todos: []
}

const actions = {
  getAllTodos({ commit }) {
    http.get('/todos', {
      headers: {
        Authorization: token
      }
    })
      .then(({ data }) => {
        console.log('data di action:', data)
        commit('setTodos', data.rows)
      }).catch(err => {
        console.log(err)
      })
  },
  addTodos({ commit }, newTodo) {
    console.log('ini data yg baru dibuat', newTodo)
    http.post('/todos', newTodo, {
      headers: {
        Authorization: token
      }
    })
      .then(({ data }) => {
        console.log('masuk dan terbuat', data.rows)
        commit('saveTodos', {
          todo: data.rows
        })
      })
      .catch(err => console.log(err))
  },
  deleteTodo({ commit }, todoId) {
    http.delete(`/todos/${todoId}`, {
      headers: {
        Authorization: token
      }
    })
      .then(({ data }) => {
        console.log(data)
        commit('removeTodo', {
          todo: data.rows._id
        })
      })
      .catch(err => console.error(err))
  },
  checkedCheckbox({
    commit
  }, {
    checked, id
  }) {
    http.put(`/todos/${id}/markcompleted`, {
      completed: checked ? '1' : '0'
    }, {
        headers: { Authorization: token }
      }).then(({ data }) => {
        console.log('yg datang dari API', data.rows)
        commit('isChecked', { todo: data.rows })
      })
      .catch(err => console.error(err))
  },
  removeBulk({ commit }){
    http.delete(`/todos`,{
      headers : {Authorization : token}
    })
    .then(({data}) => {
      console.log('data yg akan dihapus',data.rows)
      commit('deleteBulk')
    })
    .catch(err => console.error(err))
  },
  updateTodo({commit},{id,title}){
    console.log('ini id',id)
    console.log('ini title',title)
    http.put(`/todos/${id}`,{title},{
      headers : {
        Authorization : token
      }
    })
    .then(({data})=>{
      console.log('data yg bakal di update',data.rows)
      commit('todoUpdate',{
        todo : data.rows
      })
    })
    .catch(err => console.log(err))
  }
}

const mutations = {
  setTodos(state, payload) {
    console.log('data dari action yg jadi payload:', payload)

    state.todos = payload
  },
  saveTodos(state, payload) {
    console.log('todo yg dibuat', payload)
    console.log('ini todos', state.todos)
    state.todos.push(payload.todo)
  },
  removeTodo(state, payload) {
    console.log('data yg dihapus berdasarkan id ini', payload)
    const index = state.todos.findIndex((todo) => todo._id == payload)
    state.todos.splice(index, 1)
  },
  isChecked(state, payload) {
    console.log('yg berubah', payload)
    state.todos = state.todos.map(todo => {
      if (todo._id == payload._id) {
        todo.checked = payload.checked
      }
      return todo
    })
  },
  deleteBulk(state,payload){
    console.log('beberapa data yg bakal terhapus',payload)
    state.todos = state.todos.filter(todo => todo.completed === true)
  },
  todoUpdate(state,payload){
    console.log('yg bakal ke update nih',payload.title)
    state.todos = state.todos.map(todo => {
      if(todo._id == payload.todo._id){
        console.log('hayyy')
        todo.title = payload.todo.title
      }
      return todo
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store