var buiweex=require("bui-weex");
var mixins = {
    data: function () {
        return {}
    },
    components: {
        'bui-header':buiweex.buiHeader,
        'bui-icon': buiweex.buiIcon,
        'bui-button': buiweex.buiButton,
        'bui-image':buiweex.buiImage,
        'bui-content':buiweex.buiContent,
        'bui-content-scroll':buiweex.buiContentScroll
    },
    methods: {

    }
}

export default mixins;