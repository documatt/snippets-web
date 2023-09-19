import { mount } from "@vue/test-utils";
import Preview from "./Preview.vue";
import { test } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { useDocStore } from "@/stores/DocStore";
import { usePreviewStore } from "@/stores/PreviewStore";



console.log(docStore.body);
console.log((previewStore.body = "neco"));

//   expect(wrapper.text()).toContain("Nothing to preview (blank document)")

describe("My test", () => {
  test("blank document displays message only", () => {
    const wrapper = mount(Preview, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              previewStore: {
                body: "aaa",
              },
              docStore: {
                body: "Hello",
              },
            },
          }),
        ],
      },
    });

    const docStore = useDocStore();
    const previewStore = usePreviewStore();

    // const wrapper = mount(Preview);
    expect(wrapper.text()).toContain("Hello");
  });
});
