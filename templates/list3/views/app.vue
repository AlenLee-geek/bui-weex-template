<template>
    <div class="flex-column">
        <bui-header title="列表-收益明细" :leftItem="leftItem" @leftClick="back"></bui-header>
        <div class="form-box">
            <scroller class="form-body width750">
                <bui-cell :cellStyle="small">
                    <div slot="title" class="flex-column row-center-top">
                        <text class="text-normal">合计收入</text>
                        <text class="form-header-text">￥888,000.00</text>
                    </div>
                    <div class="flex-row column-center-top" slot="action">
                        <bui-icon color="#5da3f6" name="ion-ios-list-outline"></bui-icon>
                        <text class="text-blue ml15">按客单查看</text>
                    </div>
                </bui-cell>

                <bui-cell :cellStyle="largerwhite" v-for='(value, index) in datas' :key="index">
                    <div slot="title" class="flex-row">
                        <div class="circle-box center" :style="{'background-color': value.color}">
                            <bui-image v-if="value.img" :src="value.img" width="90px" height="90px"></bui-image>
                            <text v-if="!value.img" class="white">{{value.title | capitalize}}</text>
                        </div>
                        <div class="ml30 flex-column column-center-left span1">
                            <text class="text-normal">{{value.title}}</text>
                            <text class="text-gray-small mt15">{{value.time}}</text>
                        </div>
                        <text class="text-red">{{(value.number-0 >0) ? '+'+value.number : '0.00'}}</text>
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
                currentTab:0,
                tabItems: [
                    {
                        'title': '好友排名'
                    },
                    {
                        'title': '本市排名'
                    }
                ],
                containerStyle: {
                    'background-color': '#ffffff'
                },
                background: '#ffffff',
                selectedBackground: '#ffffff',
                textStyle: {
                    'color': '#1daafc',
                    'font-size': '30px'
                },
                small:{
                    'background-color': '#f5f5f5'
                },
                larger:{
                    'height': '150px',
                    'background-color': '#f5f5f5'
                },
                largerwhite: {
                    'height': '150px',
                },
                datas:[
                    {value:"0",img:'/image/tou.png',title:'技术服务收入',number:'688000',color:'#38a4ff',time:'02-06 11:15'},
                    {value:"1",img:'',title:'自有产品收',number:'0',color: '#ff943b',time:'02-06 11:15'},
                    {value:"2",img:'',title:'后期维护收入',number:'8000',color: '#98d927',time:'02-06 11:15'},
                    {value:"3",img:'/image/tou.png',title:'其他收入',number:'0',color: '#fe2f31',time:'02-06 11:15'},
                    {value:"0",img:'/image/tou.png',title:'云租赁收入',number:'8000',color:'#38a4ff',time:'02-06 11:15'},
                    {value:"1",img:'',title:'软件收入',number:'688000',color: '#ff943b',time:'02-06 11:15'},
                    {value:"2",img:'',title:'硬件收入',number:'8000', color: '#98d927',time:'02-06 11:15'}
                ],
            }
        },
        filters:{
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0)
            }
        },
        methods:{
            back () {
                this.$pop();
            },
            onItemChange(index){

            },
            onSliderChange(e){
                var index = e.index;
                this.currentTab=index;
            },
            numberChange(value){
                this.$toast(value);
            }
        }
    }
</script>