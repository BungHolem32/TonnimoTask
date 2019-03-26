<template>
  <div class="tasks container">
    <h1>To Do List</h1>
    <div class="form-row">
      <div class="col-md-10">
        <input
          required
          name="task"
          type="text"
          class="form-control"
          v-model="defaultTask.description"
        >
      </div>
      <div class="col-md-2">
        <input
          type="button"
          value="Add new task"
          class="btn btn-primary text-center addButton"
          required
          @click="addNewTask"
        >
      </div>
    </div>

    <ul class="list-group text-left">
      <li v-for="task in records" :key="task.id" class="list-group-item" :class="{done:task.done}">
        <input type="checkbox" v-model="task.done">
        {{task.description}}
        <div class="actions">
          <b-button v-b-modal.editModal @click="edit(task)">Edit</b-button>
          <b-button @click="remove(task)">Delete</b-button>
        </div>
      </li>
    </ul>

    <b-modal id="editModal" title="edit modal" ref="myModalRef">
      <div class="form-row">
        <div class="col-md-10">
          <input name="task" type="text" class="form-control" v-model="editedTask.description">
        </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <p class="float-left">Modal Footer Content</p>
        <b-button size="sm" class="float-right" variant="primary" @click="save(editedTask)">Save</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
  computer: {
    ...mapGetters(["tasks"])
  },

  async created() {
    let user_id = this.$route.params.user_id;
    this.records = await this.getAllTasks(user_id);
  },
  methods: {
    ...mapActions(["saveTask", "deleteTask", "getAllTasks"]),
    addNewTask(description) {
      if (description) {
        let task = Object.assign({}, this.defaultTask);
        this.records.push(task);
        this.save(task);
      }
    },
    edit(task) {
      this.editedTaskIndex = this.records.indexOf(task);
      console.log(this.editedTaskIndex);
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
        this.records.push(this.task);
      }

      this.records = await this.getAllTasks(userId);
      this.$refs.myModalRef.hide();
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
