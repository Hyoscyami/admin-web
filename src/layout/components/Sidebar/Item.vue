<script>
import {h,Fragment} from 'vue'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const icon = props.icon
    const title = props.title
    const vnodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(h('i', {'class': [icon, 'sub-el-icon']}))
        // vnodes.push(<i class={[icon, 'sub-el-icon']}/>)
      } else {
        vnodes.push(h('svg-icon', {'icon-class': icon},{}))
      }
    }

    if (title) {
      // vnodes.push(<span slot='title'>{(title)}</span>)
      vnodes.push(h('span', {slot: title},title))
    }
    return () => h(Fragment, {}, vnodes)
  }
}
</script>

<style>
.el-submenu__title{
  color:#fff !important;
}
.el-menu-item{
  color:#fff !important;
}
.el-menu{
  background-color:transparent !important;
}
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
