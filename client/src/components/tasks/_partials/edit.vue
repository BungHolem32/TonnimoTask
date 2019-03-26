<template>
    <div>
      <b-modal id="editModal" title="Edit Task" ref="myModalRef">
        <div class="form-row">
          <div class="col-md-12">
            <div class="form-group text-left">
              <label for="task" class="col-form-label text-info">Enter task description:</label>
              <input id="task" name="task" type="text" class="form-control" v-model="editedTask.description">
            </div>
          </div>
        </div>
        <div slot="modal-footer" class="w-100">
          <p class="float-left"></p>
          <b-button size="md" class="float-right" variant="primary" @click="save(editedTask)">SAVE</b-button>
        </div>
      </b-modal>
    </div>
</template>

<script>
    export default {
        name: "modal",
        props:['editedTask'],
      methods:{
          save(task){
            this.$parent.save(task)
          }
      }
    }
</script>

<style scoped>

</style>
