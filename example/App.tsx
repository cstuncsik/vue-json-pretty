import { defineComponent, reactive } from 'vue';
import Basic from './Basic.vue';
import VirtualList from './VirtualList.vue';
import SelectControl from './SelectControl.vue';
import Editable from './Editable.vue';
// import Tsx from './Tsx';
import './styles.less';

const list = [
  {
    title: 'Basic Use',
    key: 'Basic',
    component: Basic,
  },
  {
    title: 'Virtual List',
    key: 'VirtualList',
    component: VirtualList,
  },
  {
    title: 'Selector',
    key: 'Selector',
    component: SelectControl,
  },
  {
    title: 'Editable',
    key: 'Editable',
    component: Editable,
  },
  // {
  //   title: 'Tsx',
  //   key: 'Tsx',
  //   component: Tsx,
  // },
];

export default defineComponent({
  setup() {
    const state = reactive({
      activeKey: list[0].key,
      opened: [list[0].key],
    });

    const onActiveChange = (key: string) => {
      state.activeKey = key;
      if (!state.opened.includes(key)) {
        state.opened.push(key);
      }
    };

    return {
      state,
      onActiveChange,
    };
  },

  render() {
    const { state, onActiveChange } = this;

    return (
      <div class="example">
        <h1>Vue Json Pretty</h1>
        <p>
          Welcome to the demo space of Vue Json Pretty, here we provide the following different
          usage scenarios, try to click on different tab panel to browse.
        </p>

        <div class="tabs">
          <div class="tabs-header">
            {list.map(({ title, key }) => (
              <div
                key={key}
                class={`tabs-header-item ${key === state.activeKey ? 'is-active' : ''}`}
                onClick={() => onActiveChange(key)}
              >
                {title}
              </div>
            ))}
          </div>

          <div class="tabs-content">
            {list.map(({ component: Component, key }) => (
              <div key={key} style={{ display: `${key === state.activeKey ? 'block' : 'none'}` }}>
                {key === state.activeKey || state.opened.includes(key) ? <Component /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
