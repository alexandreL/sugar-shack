import { mount } from '@vue/test-utils';
import Btn from './btn.vue';

describe('Btn', () => {
  it('renders properly', () => {
    const wrapper = mount(Btn, {});
    expect(wrapper.text()).toContain('Welcome to Btn');
  });
});
