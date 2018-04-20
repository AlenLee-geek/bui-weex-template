<template>
    <div class="flex-column">
        <bui-header title="消息-消息类-列表操作-左滑动菜单" :leftItem="leftItem" @leftClick="back"></bui-header>

        <div class="form-box">
            <scroller class="form-body">
                <bui-swipe-cell v-for='(value, index) in datas' :key="index" :items="btnAry" :height="'150px'">
                    <div slot="content" class="flex-row">
                        <div class="circle-box center" :style="{'background-color': value.color}">
                            <bui-image v-if="value.img" :src="value.img" width="90px" height="90px"></bui-image>
                            <text v-if="!value.img" class="white">{{value.title | capitalize}}</text>
                        </div>
                        <div class="ml30 flex-column column-center-left span1">
                            <text class="text-normal">{{value.title}}</text>
                            <text class="text-gray-small mt15">{{value.desc}}</text>
                        </div>
                        <div class="mr25">
                            <text class="text-gray-small">{{value.time}}</text>
                        </div>
                    </div>
                </bui-swipe-cell>
            </scroller>
        </div>
        <bui-tabbar :tabItems="tabItems"
                    :containerStyle="containerStyle"
                    :background="background"
                    :selectedBackground="selectedBackground"
                    :normalColor="'#cccccc'"
                    @change="onItemChange"
                    v-model="currentTab"></bui-tabbar>
    </div>
</template>

<!--引入bui-weex样式文件-->
<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>
<style lang="sass" src="css/common.scss"></style>

<script>
    module.exports = {
        data () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                datas:[
                    {value:"0",img:'/image/tou.png',title:'云盘',desc:'企业云盘更新提醒',time:'13:05',color:'#38a4ff'},
                    {value:"1",img:'',title:'张珊珊',desc:'方便咨询个问题吗',time:'昨天',color: '#ff943b'},
                    {value:"2",img:'',title:'王芳',desc:'方便咨询个问题吗？',time:'2017-12-31', color: '#98d927'},
                    {value:"3",img:'/image/tou.png',title:'星空迷了路',desc:'数据线终身固保服务现已上线',time:'2017-12-31',color: '#fe2f31'},
                    {value:"0",img:'/image/tou.png',title:'云盘',desc:'企业云盘更新提醒',time:'13:05',color:'#38a4ff'},
                    {value:"1",img:'',title:'张珊珊',desc:'方便咨询个问题吗',time:'昨天',color: '#ff943b'},
                    {value:"2",img:'',title:'王芳',desc:'方便咨询个问题吗？',time:'2017-12-31', color: '#98d927'},
                    {value:"3",img:'/image/tou.png',title:'星空迷了路',desc:'数据线终身固保服务现已上线',time:'2017-12-31',color: '#fe2f31'}
                ],
                btnAry: [
                    {
                        'title': '置顶',
                        'bgcolor' : '#c6c7c8'
                    },
                    {
                        'title': '删除',
                        'bgcolor' : '#fa3300'
                    }
                ],
                currentTab:1,
                tabItems: [
                    {
                        'title': '首页',
                        'icon': "ion-home"
                    },
                    {
                        'title': '消息',
                        'icon': "ion-chatbubble-working"
                    },
                    {
                        'title': '我的',
                        'icon': "ion-person"
                    },
                ],
                containerStyle: {
                    'background-color': '#ffffff',
                    'border-top-width':'1px',
                    'border-top-color':'#cccccc'
                },
                background: '#ffffff',
                selectedBackground: '#ffffff'
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
            }
        }
    }
</script>