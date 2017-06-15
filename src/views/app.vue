<template>
    <div class="center">
        <bui-image src="/image/applogo.png" class="logo"></bui-image>
        <text class="h1">BUI-Weex</text>
    </div>
</template>

<!--引入bui-weex样式文件-->
<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>

<style>
    .logo{
        width: 200px;
        height: 200px;
    }
</style>

<script>
    //引入bui-weex模块
    //import buiweex from 'bui-weex'

    var buiweex = require("bui-weex");
    module.exports = {
        data: function () {
            return {

            }
        },
        methods: {

        }
    }
</script>