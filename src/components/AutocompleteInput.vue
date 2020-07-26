<template>
  <div class="auto-complete-input">
    <b-form-group id="input-group-title" class="filed-wrap campaign-title">
      <span class="filed-label">Title</span>

      <input
        class="form-control add-campaign__block__form--field add-campaign__block__form--title-filed"
        id="input-title"
        ref="searchInput"
        :value="value"
        @focusin="showSuggestions"
        @input="searchItems"
        type="text"
        required
      />

      <div class="campaign-title__suggestions" v-show="suggestionVisible" ref="suggestedItems">
        <div
          class="campaign-title__suggestions__item"
          v-for="(listItem, listItemIndex) of listForAutocomplete"
          :key="listItemIndex"
          @click="selectItem(listItem)"
        >{{ listItem }}</div>
      </div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "AutocompleteInput",
  props: {
    list: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  model: {
    event: "modified",
  },

  data() {
    return {
      suggestionVisible: false,
      listForAutocomplete: null,
    };
  },

  computed: {
    filteredList() {
      return this.list.filter((item) => {
        return item.toLowerCase().includes(this.value.toLowerCase());
      });
    },
  },

  watch: {
    list: function (value) {
      this.listForAutocomplete = value;
    },
  },

  created() {
    document.addEventListener("click", this.documentClick);
  },

  destroyed() {
    document.removeEventListener("click", this.documentClick);
  },

  methods: {
    showSuggestions() {
      this.suggestionVisible = true;
    },

    hideSuggestions() {
      this.suggestionVisible = false;
    },

    searchItems(e) {
      if (e.target.value.length > 1) {
        this.listForAutocomplete = this.filteredList;
      } else {
        this.listForAutocomplete = this.list;
      }

      this.$emit("modified", e.target.value);
    },

    selectItem(value) {
      this.listForAutocomplete = this.list;
      this.hideSuggestions();
      this.$emit("selectItem", value);
    },

    documentClick(e) {
      let el = this.$refs.suggestedItems;
      let searchInput = this.$refs.searchInput;
      let target = e.target;

      if (el !== target && !el.contains(target)) {
        if (!searchInput.contains(target)) {
          this.hideSuggestions();
        }
      }
    },
  },
};
</script>

<style>
</style>