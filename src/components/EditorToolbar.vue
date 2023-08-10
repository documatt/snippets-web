<template>
  <div>
    <Menubar :model="items">
      <template #end>
        <div class="flex align-items-center">
          <Button label="New" />

          <i
            class="pi ml-3"
            :class="saveStatusIcons"
            v-tooltip.left="'All changes automatically saved'"
          ></i>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import Menubar from "primevue/menubar";
import Button from "primevue/button";

let isSaving = ref(true);

const saveStatusIcons = computed(() =>
  isSaving.value ? ["pi-spinner", "pi-spin"] : ["pi-spinner"]
)

const items = ref([
  {
    label: "File",
    icon: "pi pi-fw pi-file",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            label: "Bookmark",
            icon: "pi pi-fw pi-bookmark"
          },
          {
            label: "Video",
            icon: "pi pi-fw pi-video"
          }
        ]
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash"
      },
      {
        separator: true
      },
      {
        label: "Export",
        icon: "pi pi-fw pi-external-link"
      }
    ]
  },
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    items: [
      {
        label: "Left",
        icon: "pi pi-fw pi-align-left"
      },
      {
        label: "Right",
        icon: "pi pi-fw pi-align-right"
      },
      {
        label: "Center",
        icon: "pi pi-fw pi-align-center"
      },
      {
        label: "Justify",
        icon: "pi pi-fw pi-align-justify"
      }
    ]
  },
  {
    label: "Users",
    icon: "pi pi-fw pi-user",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-user-plus"
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-user-minus"
      },
      {
        label: "Search",
        icon: "pi pi-fw pi-users",
        items: [
          {
            label: "Filter",
            icon: "pi pi-fw pi-filter",
            items: [
              {
                label: "Print",
                icon: "pi pi-fw pi-print"
              }
            ]
          },
          {
            icon: "pi pi-fw pi-bars",
            label: "List"
          }
        ]
      }
    ]
  },
  {
    label: "Events",
    icon: "pi pi-fw pi-calendar",
    items: [
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Save",
            icon: "pi pi-fw pi-calendar-plus"
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-calendar-minus"
          }
        ]
      },
      {
        label: "Archieve",
        icon: "pi pi-fw pi-calendar-times",
        items: [
          {
            label: "Remove",
            icon: "pi pi-fw pi-calendar-minus"
          }
        ]
      }
    ]
  },
  {
    label: "Quit",
    icon: "pi pi-fw pi-power-off"
  }
]);
</script>

<style scoped>
:deep(.p-menubar) {
  background: none;
}
</style>
