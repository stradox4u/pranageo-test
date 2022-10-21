import { describe, it, expect, beforeEach, vi } from "vitest";

import { mount } from "@vue/test-utils";
import CellInput from "../components/CellInput.vue";

import { setActivePinia, createPinia } from "pinia";

describe("Cell Input", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const wrapper = mount(CellInput, {
      props: {
        content: "cell content",
        contentKey: "cell 01",
        stageName: "stage 01",
      },
    });
    const textarea = wrapper.find("textarea");
    textarea.element.value = "cell content";
    textarea.trigger("input");

    expect(wrapper.props("content")).toBe("cell content");
    expect(wrapper.vm.textValue).toBe("cell content");
  });

  // it("commits changes correctly", async () => {
  //   const wrapper = mount(CellInput, {
  //     attachTo: document.body,
  //     props: {
  //       content: JSON.stringify({ content: "cell content" }),
  //       contentKey: "cell 01",
  //       stageName: "stage 01",
  //     },
  //   });
  //   const spy = vi.spyOn(wrapper.vm, "commitChange");

  //   await wrapper.find("base-button").trigger("click");
  //   // await wrapper.find("form").trigger("submit");

  //   expect(spy).toHaveBeenCalled();

  //   spy.mockClear();
  // });
});
