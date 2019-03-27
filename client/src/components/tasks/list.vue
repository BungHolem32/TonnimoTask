<template>
  <ul class="list-group text-left task-list">
    <li v-for="task in records" :key="task.id" class="list-group-item" :class="{done:task.done}">
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
      }
    },
    async created() {
      let user_id = this.$route.params.user_id;
      this.records = await this.getAllTasks(user_id);
    },
    computer: {
      ...mapGetters(["tasks"])
    },
    methods: {
      ...mapActions(["saveTask", "deleteTask", "getAllTasks"]),
      edit(task) {
        this.$parent.editedTaskIndex = this.records.indexOf(task);
        this.$parent.editedTask = Object.assign({}, task);
      },
      remove(task) {
        let userId = this.$route.params.user_id;
        this.deleteTask({task, userId});
        const index = this.records.indexOf(task);
        confirm("Are you sure you want to delete this item") &&
        this.records.splice(index, 1);
      },
      async save(task) {
        let userId = this.$route.params.user_id;
        await this.saveTask({task, userId});
        if (this.editedTaskIndex > -1) {
          Object.assign(this.records[this.editedTaskIndex], this.task);
        } else {
          this.records.push(task);
        }
        this.records = await this.getAllTasks(userId);
        this.$parent.$refs.editModal.$refs.myModalRef.hide();
      }
    },
  }
</script>

<style scoped>

</style>
