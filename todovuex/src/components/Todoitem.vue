<template>
  <div>
     <b-card 
                :title="todo.title">
                update with : <br> {{formTodo.title}}
            <form @submit.prevent="updateTodo(formTodo)">
              <b-form-input id="input_sm" size="sm" v-model="formTodo.title"></b-form-input>
            <br>
            <b-button-group> 
            <b-button type="submit" variant="primary">update</b-button>
            <b-button variant="danger" @click="deleteTodo(todo._id)">delete</b-button>
            <b-form-checkbox v-model="changeValue"/>
            </b-button-group>
            </form>
        </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["todo"],
  name: "Todoitem",
  data() {
    return {
      formTodo : {
        title : '',
          id : this.todo._id
      }
    };
  },
  computed: {
    changeValue: {
      get() {
        return this.todo.completed;
      },
      set(checked) {
        this.checkedCheckbox({
          checked:checked,
          id: this.todo._id
        });
      }
    }
  },
  methods: {
    ...mapActions([
      'deleteTodo',
      'checkedCheckbox',
      'updateTodo'
      ])
  }
};
</script>

<style>
.big {
  width: 30px;
  height: 30px;
}
</style>
