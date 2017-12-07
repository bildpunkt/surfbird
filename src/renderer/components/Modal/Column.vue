<template>
  <modal name="column-modal" @before-open="beforeOpen">
    <h1>{{ $t("modal.column.title") }}</h1>

    <p>
      <label for="column-name">{{ $t("modal.column.name") }}</label>
      <input type="text" for="column-name" v-model="selected.name"/>
    </p>

    <p>
      <label for="column-type-selection">{{ $t("modal.column.type") }}</label>
      <select name="column-type-selection" v-model="selected.column_type">
        <option v-for="columntype in column_types" :value="columntype">{{ columns[columntype].name }}</option>
      </select>
    </p>

    <p>
      <button @click="createColumn">{{ $t("modal.column.create") }}</button>
    </p>
  </modal>
</template>

<script>
export default {
  name: 'column-modal',
  data: function () {
    return {
      column_types: [],
      columns: {},
      selected: {
        name: '',
        column_type: ''
      }
    }
  },
  methods: {
    beforeOpen () {
      let activeAccount = this.$store.state.accounts.activeAccount
      let client = this.$store.state.accounts.all[activeAccount].client

      this.column_types = client.COLUMN_TYPES

      this.selected.name = ''
      this.selected.column_type = this.column_types[0]

      this.columns = client.COLUMNS
    },
    createColumn () {
      if (this.selected.name === '') {
        this.selected.name = this.columns[this.selected.column_type].name
      }

      let payload = {
        name: this.selected.name,
        type: this.selected.column_type,
        owner: this.$store.state.accounts.activeAccount
      }

      this.$store.dispatch('addColumn', payload)
      this.$modal.hide('column-modal')
    }
  }
}
</script>

<style>

</style>
