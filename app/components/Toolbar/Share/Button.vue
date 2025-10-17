<template>
  <CommonStateButton
    :handler="startShare"
    :desc="buttonDesc"
    :disabled="!!previewStore.shareHash"
  />
</template>

<script setup lang="ts">
import type { ButtonDescription } from "~/components/common/StateButton.vue";

const appConfig = useAppConfig();
const previewStore = usePreviewStore();

const buttonDesc: ButtonDescription = {
  idle: {
    tooltip: "Create public link to this snippet",
    icon: "prime:share-alt",
    label: "Share",
  },
  pending: {
    tooltip: "pending",
    icon: "prime:spinner",
    label: "Working...",
  },
  success: {
    tooltip: "Snippet has been shared",
    icon: "prime:check-circle",
    label: "Shared!",
  },
  error: {
    tooltip: "Ooops! Failed to share. Try again.",
    icon: "prime:exclamation-triangle",
    label: "Failed to share",
  },
};

interface ReqBody {
  inFilenames: string[];
}
interface ResBody {
  inFilenames: { [filename: string]: string };
}

async function startShare() {
  const hash = calcHash(previewStore.files);
  const inFilenames = Object.keys(previewStore.files);

  const res = await $fetch<ResBody>(`${appConfig.uploadFnUrl}/${hash}`, {
    method: "POST",
    body: { inFilenames } as ReqBody,
  });

  // Upload all in parallel using Promise.all
  await Promise.all(
    Object.entries(res.inFilenames).map(([filename, url]) =>
      $fetch(url, {
        method: "PUT",
        body: previewStore.files[filename],
      }),
    ),
  );

  // Set "already shared"
  previewStore.shareHash = hash;

  //   change URL
  await navigateTo({
    path: SHARE_PREFIX + hash,
  });
}
</script>
