<template>
  <div class="tasks container">
    <h1>ToDo <small>list</small> </h1>
    <create></create>
    <ul class="list-group text-left">
      <li v-for="task in records" :key="task.id" class="list-group-item" :class="{done:task.done}">
        <label for="done" class="sr-only"></label>
        <input id="done" type="checkbox" v-model="task.done">
        {{task.description}}
        <div class="actions">
          <b-button variant="success" v-b-modal.editModal @click="edit(task)">Edit</b-button>
          <b-button variant="danger" @click="remove(task)">Delete</b-button>
        </div>
      </li>
    </ul>
    <modal ref="myModal" :editedTask = 'editedTask'></modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import create from './_partials/create'
import modal from './_partials/modal'

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
  components:{
    create,
    modal
  },
  computer: {
    ...mapGetters(["tasks"])
  },
  async created() {
    let user_id = this.$route.params.user_id;
    this.records = await this.getAllTasks(user_id);
  },
  methods: {
    ...mapActions(["saveTask", "deleteTask", "getAllTasks"]),
    edit(task) {
      this.editedTaskIndex = this.records.indexOf(task);
      this.editedTask = Object.assign({}, task);
    },
    remove(task) {
      let userId = this.$route.params.user_id;
      this.deleteTask({ task, userId });
      const index = this.records.indexOf(task);
      confirm("Are you sure you want to delete this item") &&
        this.records.splice(index, 1);
    },
    async save(task) {
      let userId = this.$route.params.user_id;
      await this.saveTask({ task, userId });
      if (this.editedTaskIndex > -1) {
        Object.assign(this.records[this.editedTaskIndex], this.task);
      } else {
        this.records.push(task);
      }

      this.records = await this.getAllTasks(userId);
      this.$refs.myModal.$refs.myModalRef.hide();
    }
  }
};
</script>


<style>
.done {
  text-decoration: line-through;
}

.tasks {
  max-width: 800px;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 20px;
  box-shadow: 0px 1px 3px 1px;
  background: white;
}

.addButton {
  width: 100%;
}

.form-row {
  margin-bottom: 20px;
}

.actions {
  float: right;
}

</style>
