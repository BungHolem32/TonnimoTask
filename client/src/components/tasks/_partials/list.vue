<template>
  <ul class="list-group text-left task-list">
    <li v-for="task in $parent.records" :key="task.id" class="list-group-item" :class="{done:task.done}">
      <div class="form-group done-checkbox">
        <input class="form-check" id="done" type="checkbox" v-model="task.done">
      </div>
      <span>{{task.description}}</span>
      <div class="actions">
        <a class="edit" v-b-modal.editModal @click="edit(task)">
          <font-awesome-icon icon="edit" color="green"/>
        </a>
        <a class="delete" @click="remove(task)">
          <font-awesome-icon icon="trash" color="orange"/>
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "list",
    async created() {
      let userId = this.$route.params.user_id;
      let list  =await this.getAllTasks(userId);
      this.$parent.records = list && list.length ? list : [] ;
    },
    computer: {
      ...mapGetters(["tasks"])
    },
    methods: {
      ...mapActions(["saveTask", "deleteTask", "getAllTasks"]),
      edit(task) {
        this.$parent.editedTaskIndex = this.$parent.records.indexOf(task);
        this.$parent.editedTask = Object.assign({}, task);
      },
      remove(task) {
        let userId = this.$route.params.user_id;
        this.deleteTask({task, userId});
        const index = this.$parent.records.indexOf(task);
        confirm("Are you sure you want to delete this item") &&
        this.$parent.records.splice(index, 1);
      },
      async save(task) {
        let userId = this.$route.params.user_id;
        await this.saveTask({task, userId});
        this.$parent.records = await this.getAllTasks(userId);
        if (this.$parent.editedTaskIndex > -1) {
          Object.assign(this.$parent.records[this.$parent.editedTaskIndex], this.task);
        } else {
          console.log(this.$parent.records);
          this.$parent.records.push(task);
        }
        //close modal
        this.$parent.$refs.editModal.$refs.myModalRef.hide();

      }

    },
  }
</script>

<style scoped>

</style>
