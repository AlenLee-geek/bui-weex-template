<template>
    <div class="flex-column">
        <bui-header title="护照申请" :leftItem="leftItem" @leftClick="back"></bui-header>
        <div class="form-box">
            <scroller class="form-body">
                <bui-cell :cellStyle="small">
                    <div slot="title" class="flex-row column-center-top">
                        <bui-icon color="#ff9236" name="ion-ios-information"></bui-icon>
                        <text class="text-normal ml30">申请前, 请先了解申请须知</text>
                    </div>
                    <div slot="action" class="form-content">
                        <bui-icon color="#cdcdcd"  name="ion-ios-arrow-right"></bui-icon>
                    </div>
                </bui-cell>
                <bui-cell class="mt25">
                    <div slot="title" class="form-content">
                        <text class="text-normal">身份证号码</text>
                        <input class="form-input-text ml30" type="number" maxlength="16" placeholder="请输入16位身份证号码" />
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">中文姓</text>
                        <input class="form-input-text ml30" type="text" placeholder="请输入, 例如张**" />
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">拼音</text>
                        <input class="form-input-text ml30" type="text" placeholder="请输入" />
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">籍贯</text>
                        <input class="form-input-text ml30" type="text" placeholder="请输入" />
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">联系电话</text>
                        <input class="form-input-text ml30" type="tel" placeholder="请输入11位电话号码" />
                    </div>
                </bui-cell>
                <div class="form-title"><text class="form-header-text">紧急联系人</text></div>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">姓名</text>
                        <input class="form-input-text ml30" type="text" placeholder="请输入姓名" />
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <text class="text-normal">联系电话</text>
                        <input class="form-input-text ml30" type="tel" placeholder="请输入联系电话" />
                    </div>
                </bui-cell>

            </scroller>
            <div class="form-footer">
                <bui-button value="下一步" type="primary" class="form-btn form-btn-blue"></bui-button>
            </div>
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