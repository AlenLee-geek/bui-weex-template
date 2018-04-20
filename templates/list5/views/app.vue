<template>
    <div class="flex-column">
        <bui-header title="列表-组合类列表" :leftItem="leftItem" @leftClick="back"></bui-header>

        <bui-tabbar :tabItems="tabItems"
                    showSelectedLine=true
                    titleSize="30px"
                    :containerStyle="containerStyle"
                    :background="background"
                    :selectedBackground="selectedBackground"
                    @change="onItemChange"
                    v-model="currentTab"></bui-tabbar>
        <slider class="flex-row span1" @change="onSliderChange" :index="currentTab">

            <div class="form-box">
                <scroller class="form-body width750">
                    <bui-cell class="mt25">
                        <div slot="title" class="flex-column">
                            <text class="text-large">粤AV8D66</text>
                        </div>
                    </bui-cell>
                    <bui-cell>
                        <div slot="title" class="flex-row">
                            <text class="text-gray-small span1">违章3条 罚600元/2分</text>
                            <text class="text-gray-small ">2018-02-09 14:17</text>
                        </div>
                    </bui-cell>

                    <bui-cell class="mt25" :cellStyle="largestwhite" v-for='(value, index) in datas2' :key="index">
                        <div slot="title" class="flex-column">
                            <text class="text-normal">{{value.title}}</text>
                            <div class="flex-row mt25">
                                <div class="flex-column">
                                    <text class="text-gray-small">{{value.details1}}</text>
                                    <text class="text-red-small mt10">{{value.detailsvalue1}}</text>
                                </div>
                                <div class="flex-column span1">
                                    <text class="text-gray-small text-c">{{value.details2}}</text>
                                    <text class="text-red-small text-c mt10">{{value.detailsvalue2}}</text>
                                </div>
                                <div class="flex-column">
                                    <text class="text-gray-small text-r">{{value.details3}}</text>
                                    <text class="text-red-small text-r mt10">{{value.detailsvalue3}}</text>
                                </div>
                            </div>
                            <div class="flex-row mt25 bdtop">
                                <div class="flex-column span1">
                                    <text class="text-gray-small">违章地点</text>
                                    <text class="text-normal-smaller mt10">{{value.dis}}</text>
                                    <text class="text-gray-small mt25">违章条例</text>
                                    <text class="text-normal-smaller mt10">{{value.rule}}</text>
                                </div>
                                <div class="flex-row center">
                                    <bui-icon color="#cdcdcd"  name="ion-ios-arrow-right"></bui-icon>
                                </div>
                            </div>
                        </div>
                    </bui-cell>
                </scroller>
            </div>


            <div class="form-box">
                <scroller class="form-body width750">
                    <div class="flex-column pd25 mt25 bgwh" v-for='(value, index) in datas' :key="index">
                        <text class="text-normal">{{value.title}}</text>
                        <div class="flex-row mt25">
                            <div class="flex-column span1">
                                <text class="text-gray-small">个人缴纳</text>
                                <text class="text-normal-small mt10">{{value.price1}}</text>
                            </div>
                            <div class="flex-column span1">
                                <text class="text-gray-small text-c">单位缴纳</text>
                                <text class="text-normal-small text-c mt10">{{value.price2}}</text>
                            </div>
                            <div class="flex-column span1">
                                <text class="text-gray-small text-r">总金额</text>
                                <text class="text-normal-small text-r mt10">{{value.price3}}</text>
                            </div>
                        </div>
                        <div class="flex-column mt25" v-if="value.open">
                            <div class="flex-row">
                                <text class="text-gray-small">缴费类型</text>
                                <text class="text-normal-small ml30">缴费正常</text>
                            </div>
                            <div class="flex-row mt15">
                                <text class="text-gray-small">是否缴费</text>
                                <text class="text-normal-small ml30">已缴费</text>
                            </div>
                        </div>
                        <div class="center mt15" @click="value.open = !value.open"><bui-icon @click="value.open = !value.open" :style="{'transform': value.open ? 'rotate(0deg)' : 'rotate(180deg)'}" color="#cdcdcd"  name="ion-ios-arrow-up"></bui-icon></div>
                    </div>
                </scroller>
            </div>


            <div class="form-box">
                <scroller class="form-body width750">
                    <bui-cell class="mt25" :cellStyle="largerwhite" v-for='(value, index) in datas1' :key="index">
                        <div slot="title" class="flex-column">
                            <text class="text-normal">基数： &nbsp;{{value.title}}</text>
                            <div class="flex-row mt25 column-center-top">
                                <div class="flex-column">
                                    <text class="text-gray-small">起始日期</text>
                                    <text class="text-normal-small mt10">{{value.start}}</text>
                                </div>
                                <div class="flex-row span1 center ml30 mr25">
                                    <div class="dot"></div>
                                    <div class="line span1"></div>
                                    <div class="dot"></div>
                                </div>
                                <div class="flex-column">
                                    <text class="text-gray-small text-r">截止日期</text>
                                    <text class="text-normal-small text-r mt10">{{value.end}}</text>
                                </div>
                            </div>
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
                        'title': '概况'
                    },
                    {
                        'title': '缴费历史'
                    },
                    {
                        'title': '基数历史'
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
                largestwhite: {
                    'height': '420px',
                    'padding-top': '20px',
                    'padding-bottom': '20px',
                },
                datas:[
                    {value:"0",title:'2015年1月',price1:'311.6', price2:'799', price3:'1090.6', open:false},
                    {value:"0",title:'2015年1月',price1:'311.6', price2:'799', price3:'1090.6', open:false},
                    {value:"0",title:'2015年1月',price1:'311.6', price2:'799', price3:'1090.6', open:false},
                    {value:"0",title:'2015年1月',price1:'311.6', price2:'799', price3:'1090.6', open:false},
                    {value:"0",title:'2015年1月',price1:'311.6', price2:'799', price3:'1090.6', open:false},
                ],
                datas1:[
                    {value:"0",title:'5400',start:'2018-01', end:'2018-03'},
                    {value:"0",title:'5400',start:'2018-01', end:'2018-03'},
                    {value:"0",title:'3301',start:'2018-01', end:'2018-03'},
                    {value:"0",title:'5400',start:'2018-01', end:'2018-03'},
                    {value:"0",title:'3301',start:'2015-01', end:'2015-12'},
                    {value:"0",title:'5400',start:'2013-01', end:'2013-03'},
                    {value:"0",title:'5400',start:'2012-01', end:'2012-03'},
                    {value:"0",title:'5400',start:'2010-01', end:'2010-03'},
                ],
                datas2:[
                    {value:"0",title:'2018-02-09 14:19', details1:'违章', detailsvalue1:'3次', details2:'罚款', detailsvalue2:'￥600', details3:'扣分',detailsvalue3:'2',dis:'北京市海运仓胡同东口海运仓胡同东口', rule:'不按规定停车'},
                    {value:"0",title:'2018-02-09 14:19', details1:'滞纳金', detailsvalue1:'￥20', details2:'罚款', detailsvalue2:'￥200', details3:'扣分',detailsvalue3:'不扣分',dis:'北京市海运仓胡同东口海运仓胡同东口', rule:'机动车违法警告指令的'},
                    {value:"0",title:'2018-02-09 14:19', details1:'违章', detailsvalue1:'3次', details2:'罚款', detailsvalue2:'￥600', details3:'扣分',detailsvalue3:'2',dis:'北京市海运仓胡同东口海运仓胡同东口', rule:'不按规定停车'},
                    {value:"0",title:'2018-02-09 14:19', details1:'违章', detailsvalue1:'3次', details2:'罚款', detailsvalue2:'￥600', details3:'扣分',detailsvalue3:'2',dis:'北京市海运仓胡同东口海运仓胡同东口', rule:'不按规定停车'},
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