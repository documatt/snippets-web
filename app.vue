<script setup lang="ts">
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import ConfirmDialog from "primevue/confirmdialog";
import ScrollTop from "primevue/scrolltop";
import Toast from "primevue/toast";

const { texts } = useAppConfig();

useSeoMeta({
  title: "Documatt Snippets, reStructuredText online preview and editor",
  description:
    "Preview and edit reStructuredText files online with Sphinx and Docutils without installing it.",
});
</script>

<template>
  <div>
    <header class="bottom-shadow">
      hlavička zde
      <!-- Breadcrumb umím jen pro pages/, ne content/ -->
      <!-- <LayoutBreadcrumbPage /> -->
    </header>

    <main class="container">
      <TabView>
        <TabPanel>
          <template #header>
            <i class="pi pi-file-edit mr-2"></i>
            <span>Write</span>
          </template>
          <div class="grid">
            <div class="col-12 xl:col-3">
              <WriterExplorer />
            </div>
            <div class="col-12 xl:col-9">
              <WriterBreadcrumb />
              <WriterEditorToolbar />
              <WriterOfferSampleDoc />
              <WriterEditor />
              <WriterPreviewSidebar />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-file mr-2"></i>
            <span>Read</span>
          </template>
          <div class="grid">
            <div class="col-12 xl:col-8 xl:col-offset-2">
              ... reader here ...
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-file-export mr-2"></i>
            <span>Share</span>
          </template>
          <div class="grid">
            <div class="col-12 xl:col-8 xl:col-offset-2">
              <!-- <ShareTab /> -->
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-wrench mr-2"></i>
            <span>Settings</span>
          </template>
          <div class="grid">
            <div class="col-12 xl:col-8 xl:col-offset-2">
              ... settings here ...
            </div>
          </div>
        </TabPanel>
      </TabView>
    </main>

    <LayoutFooter />

    <ScrollTop />

    <!-- DOM placeholder for rendering toast popups -->
    <Toast />

    <!-- DOM placeholder for rendering confirm dialogs -->
    <ConfirmDialog />

    <LayoutCookieConsent />
  </div>
</template>
