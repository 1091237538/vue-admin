import { MessageBox } from 'element-ui';

export default {
    install(Vue, options) {
        Vue.prototype.confirm = (params) => {
            return MessageBox.confirm(params.content, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                closeOnClickModal: false,
                closeOnPressEscape: false
            })
        }
    }
}