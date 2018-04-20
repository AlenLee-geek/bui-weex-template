<template>
    <div class="flex-column">
        <bui-header title="护照申请" :leftItem="leftItem" @leftClick="back"></bui-header>
        <div class="form-box">
            <scroller class="form-body">
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">身份证号码</text>
                        <text class="text-gray ml30">380130199201304112</text>
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">中文姓</text>
                        <text class="text-gray ml30">张</text>
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">中文名</text>
                        <text class="text-gray ml30">珊珊</text>
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">拼音</text>
                        <text class="text-gray ml30">ZhangSanSan</text>
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">籍贯</text>
                        <text class="text-gray ml30">广东广州</text>
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">联系电话</text>
                        <text class="text-gray ml30">13800138000</text>
                    </div>
                </bui-cell>
                <div class="form-title"><text class="form-header-text">紧急联系人</text></div>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">姓名</text>
                        <text class="text-gray ml30">李思思</text>
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">联系电话</text>
                        <text class="text-gray ml30">13800138000</text>
                    </div>
                </bui-cell>

            </scroller>
        </div>

    </div>
</template>

<!--引入bui-weex样式文件-->
<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>
<style lang="sass" src="css/common.scss"></style>

<script>
    const picker = weex.requireModule('picker');
    module.exports = {
        data () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                small:{
                    'height': '80px',
                    'background-color': '#fcf8e3'
                },
                larger:{
                    'height': '150px'
                },
            }
        },
        methods:{
            back () {
                this.$pop();
            },
        }
    }
</script>