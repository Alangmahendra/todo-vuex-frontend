<template>
  <div class="container">
    <b-card>
      <form @submit.prevent="addTodos(formTodo)">
        <b-input-group prepend="create todo">
         
          <b-form-input v-model="formTodo.title"></b-form-input>
          <b-input-group-append>
            <b-btn type="submit" variant="info">CREATE</b-btn>
          </b-input-group-append>
      </b-input-group>
      </form>
      <br>
       <b-button type="submit" variant="warning" @click="removeBulk">delete bulk</b-button>
    </b-card>
    <br>
    <b-card-group deck>
     <todo v-for="todo in todos" :todo="todo" :key="todo._id"/>
    </b-card-group>
  </div>
</template>

<script>
import todo from './Todoitem'
import { mapActions,mapState } from 'vuex'
export default {
  components : {todo},
  name : 'Home',
  data(){
    return{
       completed : false,
      formTodo:{
        title : '',
      }
    }
  },
  computed:{
   ...mapState([
     'todos'
   ])
  },
  methods:{
    ...mapActions([
      'getAllTodos',
      'addTodos',
      'removeBulk'
    ]),
    add(){

    }
  },
  created(){
    this.getAllTodos()
  }
}
</script>

<style>

</style>
