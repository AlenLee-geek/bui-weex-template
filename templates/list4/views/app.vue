<template>
    <div class="flex-column">
        <bui-header title="列表-大图文类" :leftItem="leftItem" @leftClick="back"></bui-header>

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

                    <bui-cell :cellStyle="largerwhite" v-for='(value, index) in datas' :key="index">

                        <div slot="title" class="flex-row center">
                            <div class="center" :style="{'background-color': value.color}">
                                <bui-image v-if="value.img" :src="value.img" width="200px" height="150px"></bui-image>
                            </div>
                            <div class="ml30 flex-column column-center-left span1">
                                <text class="text-normal">{{value.title}}</text>
                                <text class="text-gray-small mt15">{{value.desc}}</text>
                                <text class="text-gray-small mt15">{{value.dis}}</text>
                            </div>
                        </div>
                        <div class="action">
                            <text class="text-orange-large">{{value.price}}</text>
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
                        'title': '美食'
                    },
                    {
                        'title': '休闲娱乐'
                    },
                    {
                        'title': '酒店'
                    }
                ],
                containerStyle: {
                    'background-color': '#ffffff',
                    'border-bottom-width':'1px',
                    'border-bottom-color':'#cccccc'
                },
                background: '#ffffff',
                selectedBackground: '#ffffff',
                textStyle: {
                    'color': '#1daafc',
                    'font-size': '30px'
                },
                largerwhite: {
                    'height': '190px',
                    'padding-top': '20px',
                    'padding-bottom': '20px',
                },
                datas:[
                    {value:"0",img:'/image/big2.png',title:'幸福西饼生日蛋糕',price:'￥50', desc:'天河区岑村', dis:'3km'},
                    {value:"1",img:'/image/big.png',title:'王品台塑牛排',price:'￥680', desc:'体育西路191号佳兆业广场F3', dis:'3km'},
                    {value:"2",img:'/image/big.png',title:'丰源轩',price:'￥85', desc:'江南西路46号', dis:'3km'},
                    {value:"3",img:'/image/big2.png',title:'禧御贡茶(江南新地店)',price:'￥86', desc:'天河区岑村', dis:'3km'},
                    {value:"0",img:'/image/big.png',title:'超滋源麻辣香锅(花城汇店)',price:'￥86', desc:'体育西路191号佳兆业广场F3', dis:'5km'},
                    {value:"1",img:'/image/big2.png',title:'禧御贡茶',price:'￥86', desc:'江南西路46号', dis:'16km'},
                    {value:"2",img:'/image/big.png',title:'丰源轩',price:'￥86', desc:'天河区岑村', dis:'20km'},
                    {value:"3",img:'/image/big2.png',title:'王品台塑牛排',price:'￥86', desc:'体育西路191号佳兆业广场F3', dis:'30km'}
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