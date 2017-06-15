var navigator = weex.requireModule('navigator');

var buiweex=require("bui-weex");
var mixins = {
    data: function () {
        return {}
    },
    components: {
        'bui-header':buiweex.buiHeader,
        'bui-content':buiweex.buiContent,
        'bui-content-scroll': buiweex.buiContentScroll,
        'bui-icon': buiweex.buiIcon,
        'bui-button': buiweex.buiButton,
        'bui-image':buiweex.buiImage
    },
    methods: {

    }
}

export default mixins;