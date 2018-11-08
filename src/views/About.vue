<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1>This is an about page</h1>
        <div v-html="post"></div>
        <form @submit.prevent="saveContent">
          <Editor :init="config" v-model="content"></Editor>
          <v-btn type="submit">Save</v-btn>
        </form>
        {{content}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'

export default {
  components: {
    Editor
  },
  data() {
    return {
      content: '',
      post: '',
      config: {
        menubar: false,
        toolbar:
          'code | undo redo | styleselect | bold italic forecolor | numlist bullist table hr | codesample charmap | link image media emoticons paste',
        plugins: 'hr textcolor code codesample charmap colorpicker emoticons image link lists media paste tabfocus table',
        branding: false
      }
    }
  },
  methods: {
    saveContent() {
      axios({ url: 'http://localhost:3000/api/post/', data: { content: this.content }, method: 'POST' }).then(resp => {
        this.post = resp.data.content
        console.log(resp.data)
      })
    }
  }
}
</script>

<style scoped>
.ck-editor__editable {
  min-height: 200px;
}
</style>
