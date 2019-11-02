import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("测试传参组件的参数是否正确", () => {
    const msg = "test message";
    //具体操作组件的api https://vue-test-utils.vuejs.org
    //wrapper.find('button').trigger('click')
    //expect(wrapper.find('div').text()).toMatch('1')
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
