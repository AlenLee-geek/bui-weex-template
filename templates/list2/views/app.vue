<template>
    <div class="flex-column">
        <bui-header title="列表-排行" :leftItem="leftItem" @leftClick="back"></bui-header>

        <bui-tabbar :tabItems="tabItems"
                    showSelectedLine=true
                    titleSize="30px"
                    :containerStyle="containerStyle"
                    :background="background"
                    :selectedBackground="selectedBackground"
                    @change="onItemChange"
                    v-model="currentTab"></bui-tabbar>
        <slider class="form-box">
            <div class="form-box">
                <scroller class="form-body width750">
                    <bui-cell :cellStyle="small">
                        <div slot="title" class="flex-row column-center-top">
                            <bui-icon size="32" name="ion-ios-location-outline"></bui-icon>
                            <text class="form-header-text ml15">广州</text>
                        </div>
                        <div slot="action">
                            <text class="form-header-text">共计 46609 人参加</text>
                        </div>
                    </bui-cell>

                    <bui-cell :cellStyle="larger">
                        <div slot="title" class="flex-row">
                            <text class="text-white">1</text>
                            <div class="circle-box center ml30">
                                <bui-image :src="'/image/tou.png'" width="90px" height="90px"></bui-image>
                            </div>
                            <div class="ml30 flex-column column-center-left span1">
                                <text class="text-normal">耳朵难眠</text>
                                <div class="flex-row mt10">
                                    <text class="text-orange">67812</text>
                                    <text class="text-gray-small">名</text>
                                </div>
                            </div>
                        </div>
                        <div class="action">
                            <text class="text-green">超过本市 30% 的用户</text>
                        </div>
                    </bui-cell>


                    <bui-cell :cellStyle="largerwhite" v-for='(value, index) in datas' :key="index">

                        <div slot="title" class="flex-row center">
                            <text class="text-orange-large">{{index+1}}</text>
                            <div class="circle-box center ml30" :style="{'background-color': value.color}">
                                <bui-image v-if="value.img" :src="value.img" width="90px" height="90px"></bui-image>
                                <text v-if="!value.img" class="white">{{value.title | capitalize}}</text>
                            </div>
                            <div class="ml30 flex-column column-center-left span1">
                                <text class="text-normal">{{value.title}}</text>
                            </div>
                        </div>
                        <div class="action">
                            <text class="text-orange-large">{{value.number}}</text>
                        </div>
                    </bui-cell>

                </scroller>
            </div>
        </slider>

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
                    'height': '80px',
                },
                larger:{
                    'height': '150px',
                    'background-color': '#f5f5f5'
                },
                largerwhite: {
                    'height': '150px',
                },
                datas:[
                    {value:"0",img:'/image/tou.png',title:'云盘',number:'5000',color:'#38a4ff'},
                    {value:"1",img:'',title:'张珊珊',number:'4912',color: '#ff943b'},
                    {value:"2",img:'',title:'王芳',number:'3000',color: '#98d927'},
                    {value:"3",img:'/image/tou.png',title:'云盘',number:'2319',color: '#fe2f31'},
                    {value:"0",img:'/image/tou.png',title:'云盘',number:'1980',color:'#38a4ff'},
                    {value:"1",img:'',title:'张珊珊',number:'1512',color: '#ff943b'},
                    {value:"2",img:'',title:'王芳',number:'500', color: '#98d927'},
                    {value:"3",img:'/image/tou.png',title:'云盘',number:'20',color: '#fe2f31'}
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