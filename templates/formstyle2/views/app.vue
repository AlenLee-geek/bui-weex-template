<template>
    <div class="flex-column">
        <bui-header title="用车申请" :leftItem="leftItem" @leftClick="back"></bui-header>
        <div class="form-box">
            <scroller class="form-body">
                <bui-cell :cellStyle="small" v-if="show">
                    <div slot="title" class="flex-row column-center-top">
                        <bui-icon color="#1daafc" name="ion-ios-information"></bui-icon>
                        <text class="text-normal ml30">粤A****9已被人申请,暂不能申请该车</text>
                    </div>
                </bui-cell>
                <bui-cell class="mt25">
                    <div slot="title" class="form-content">
                        <bui-icon color="#fa3300" size="20px" name="ion-record"></bui-icon>
                        <input class="form-input-text ml30" type="text" placeholder="请输入出发地" />
                    </div>
                </bui-cell>
                <bui-cell>
                    <div slot="title" class="form-content">
                        <bui-icon color="#00c277" size="20px" name="ion-record"></bui-icon>
                        <input class="form-input-text ml30" type="text" placeholder="请输入目的地, 多个用逗号隔开" />
                    </div>
                </bui-cell>
                <bui-cell class="mt25" :cellStyle="larger">
                    <div slot="title" class="form-content">
                        <div class="span1" @click="pickDateStart">
                            <text class="form-header-text">用车开始时间</text>
                            <text class="mt10 text-normal">{{start || '点击选择时间'}}</text>
                        </div>
                        <bui-icon color="#e5e5e5" name="ion-log-in"></bui-icon>
                        <div class="span1 ml30" @click="pickDateEnd">
                            <text class="form-header-text">用车结束时间</text>
                            <text class="mt10 text-normal">{{end || '点击选择时间'}}</text>
                        </div>
                    </div>
                </bui-cell>
                <bui-cell class="mt25" title="随车人数">
                    <div slot="action" class="form-content">
                        <input class="form-input-text ml30 width230" type="number" placeholder="请填写随车人数" />
                        <text class="ml30 text-normal">人</text>
                    </div>
                </bui-cell>
                <bui-cell title="随车人">
                    <div slot="action" class="form-content" @click="open1">
                        <text class="text-grayer">{{car}}</text>
                        <bui-icon class="ml30" color="#1daafc" name="ion-android-person-add"></bui-icon>
                    </div>
                </bui-cell>
                <bui-cell class="mt25" :cellStyle="larger">
                    <div slot="title" class="form-content">
                        <textarea class="form-textarea" placeholder="请输入用车原因及特殊说明" value=""></textarea>
                    </div>
                </bui-cell>
                <bui-cell class="mt25" title="用车性质">
                    <div slot="action" class="form-content">
                        <bui-icon color="#cdcdcd"  name="ion-ios-arrow-right"></bui-icon>
                    </div>
                </bui-cell>
                <bui-cell title="用车类别">
                    <div slot="action" class="form-content">
                        <bui-icon color="#cdcdcd"  name="ion-ios-arrow-right"></bui-icon>
                    </div>
                </bui-cell>
            </scroller>
            <div class="form-footer">
                <bui-button value="提交申请" type="primary" class="form-btn form-btn-blue" @click="show = true"></bui-button>
            </div>
        </div>

        <bui-popup v-model="showPopup1" height="400">
            <scroller style="padding: 20px;">
                <div class="flex-row">
                    <div class="span9"><text class="form-header-text">请选择下列选项</text></div>
                </div>
                <bui-radio-list v-model="selectedValue" @change="changeValue" :items="items"></bui-radio-list>
            </scroller>
        </bui-popup>
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
                selectedValue: '',
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                showPopup1: false,
                car: '请选择随车人员',
                items:[
                    {value:"0",title:'张三'},
                    {value:"1",title:'李四'},
                    {value:"2",title:'王五'},
                    {value:"3",title:'陈一'}
                ],
                small:{
                    'height': '80px',
                    'background-color': '#fcf8e3'
                },
                larger:{
                    height: '150px'
                },
                show: false,
                start: '',
                end: ''
            }
        },
        methods:{
            back () {
                this.$pop();
            },
            open1(){
                this.showPopup1 = true;
            },
            changeValue(e){
                this.car = this.items[e-0].title;
                this.showPopup1 = false;
            },
            pickDateStart () {
                picker.pickDate({
                    value: this.start,
                    format: 'yyyy-MM-dd'
                }, event => {
                    if (event.result === 'success') {
                        this.start = event.data
                    }
                })
            },
            pickDateEnd () {
                picker.pickDate({
                    value: this.end,
                    format: 'yyyy-MM-dd'
                }, event => {
                    if (event.result === 'success') {
                        this.end = event.data
                    }
                })
            }
        }
    }
</script>