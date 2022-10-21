import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import BaseButton from "../components/UI/BaseButton.vue";

describe("Base Button", () => {
  it("Receives buttonType prop", () => {
    const wrapper = mount(BaseButton, { props: { buttonType: "submit" } });
    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("Receives isDisabled prop", () => {
    const wrapper = mount(BaseButton, {
      props: { buttonType: "submit", isDisabled: true },
    });
    expect(wrapper.attributes("disabled")).toBeTruthy;
  });
});
