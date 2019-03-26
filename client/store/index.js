import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let tasks = {
  state: {
    tasks: [],
    task: {}
  },
  mutations: {
    saveTask (state, task) {
      state.task = task
    },
    delete (state) {},
    saveTasks (state, { tasks }) {
      state.tasks = tasks
    }
  },
  actions: {
    getAllTasks (state, id) {
      return axios(`http://localhost:3001/api/user/${id}/tasks`)
        .then(res => {
          let tasks = res.data.data
          state.commit('saveTasks', { tasks });

          return tasks
        })
        .catch(e => console.log(e))
    },
    saveTask (state, { task, userId }) {
      if (task.id) {
        return axios
          .put(`http://localhost:3001/api/user/${userId}/task/${task.id}`, task)
          .then(res => {
            state.commit('saveTask', task)
          })
      }

      return axios
        .post(`http://localhost:3001/api/user/${userId}/task`, task)
        .then(res => {
          state.commit('saveTask', task)
        })
    },
    updateTask (state, { task, userId }) {
      return axios
        .put(`http://localhost:3001/api/user/${userId}/task/${task.id}`, task)
        .then(res => {
          state.commit('saveTask', task)
        })
    },
    deleteTask (state, { task, userId }) {
      return axios
        .delete(`http://localhost:3001/api/user/${userId}/task/${task.id}`)
        .then(res => {
          return res
        })
    }
  },
  getters: {
    tasks (state) {
      return state.state.tasks
    },
    task (state) {
      return state.task
    }
  }
}

const store = new Vuex.Store({
  modules: {
    tasks
  }
})

export default store
