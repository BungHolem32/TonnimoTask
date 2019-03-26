<template>
      <div class="form-row">
        <div class="col-md-10">
          <label for="task" class="sr-only"></label>
          <input
            required
            id="task"
            name="task"
            type="text"
            class="form-control"
            v-model="defaultTask.description"
          >
        </div>
        <div class="col-md-2">
          <input
            type="button"
            value="ADD"
            class="btn btn-primary text-center addButton"
            required
            @click="addNewTask"
          >
        </div>
      </div>
</template>

<script>
    export default {
        name: "CreateTask",
        props:['description'],
        data(){
          return {
            defaultTask: {
              description: null,
              done: false
            },
          }
        },
      methods:{
        addNewTask() {
            let task = Object.assign({}, this.defaultTask);
            this.$parent.records.push(task);
            this.$parent.save(task);
        },
      }



    }
</script>

<style scoped>

</style>
