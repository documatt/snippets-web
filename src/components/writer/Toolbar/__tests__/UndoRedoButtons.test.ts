import { mount } from "@vue/test-utils"
import { expect, test } from "vitest"
import Editor from "../../Panes/Editor.vue"
import { useDocStore } from "@/stores/DocStore"
import { createTestingPinia } from "@pinia/testing"

test("undo", async ()=> {
    const pinia = createTestingPinia()
    const docStore = useDocStore()
    docStore.body = "foo"

    const wrapper = mount(Editor, {
      global: {
        plugins: [pinia],
      }
    })

    const el = wrapper.find('.CodeMirror-line')

    await el.trigger("keydown", { key: "b" })
    await el.trigger("keydown", { key: "a" })
    await el.trigger("keydown", { key: "r" })

    // await el.trigger("click")
    // await el.trigger("keydown", {
    //     key: "a"
    // })

    expect(docStore.body).toBe("bar")

})