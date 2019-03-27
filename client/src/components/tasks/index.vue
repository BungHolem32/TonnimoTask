<template>
  <div class="tasks container">
    <!--TITLE-->
    <h1>ToDo
      <small>list</small>
    </h1>
    <!--ADD NEW TASK-->
    <create></create>
    <!--DISPLAY LIST OF TASKS-->
    <list ref="listTasks"></list>
    <!--EDIT PAGE MODAL-->
    <edit ref="editModal" :editedTask='editedTask'></edit>
  </div>
</template>

<script>
  import create from './create'
  import edit from './edit'
  import list from './list'

  export default {
    name: "Tasks",
    data() {
      return {
        records: [],
        defaultTask: {
          description: null,
          done: false
        },
        editedTask: {
          description: "",
          done: false
        },
        editedTaskIndex: -1
      };
    },
    components: {
      create,
      edit,
      list
    },
    methods: {

    }
  };
</script>


<style lang="scss">
  @import "./index";
</style>
