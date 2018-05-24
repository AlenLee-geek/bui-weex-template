<template>
    <div class="flex-column">
        <bui-header title="门户类首页" :leftItem="leftItem" :rightItem="rightItem" @leftClick="back">
            <div class="ml15" slot="right">
                <bui-icon @click="_rightClick($event)" color="#ffffff"  name="ion-chatbubble-working"></bui-icon>
            </div>
        </bui-header>


        <div class="form-box form-body">

            <slider class="slider" interval="3000" auto-play="true">
                <div class="frame" v-for="img in imageList">
                    <bui-image width="750" height="273px" resize="cover" :src="img"></bui-image>
                </div>
            </slider>


            <scroller class="width750">
                <div class="flex-column bgwh pdt20 pdb20">
                    <div class="flex-row column-center-top">
                        <div class="line-blue"></div>
                        <text class="text-blod-large ml15">最新活动</text>
                    </div>
                    <div class="flex-row ml30 mt35">
                        <bui-image src="/image/pl.jpg" width="200px" height="150px"></bui-image>
                        <div class="flex-column span1 ml30">
                            <text class="text-blod-large">2017年第一期品高警务云培训班</text>
                            <div class="flex-row mt15">
                                <text class="text-tag">设计师</text>
                                <text class="text-tag">互联网</text>
                            </div>
                            <div class="flex-row column-center-top mt15">
                                <bui-icon size="30" name="ion-ios-clock-outline"></bui-icon>
                                <text class="text-gray-small ml15">02-01 15:51</text>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex-column mt25 bgwh pdt20 pdb20">
                    <div class="flex-row column-center-top">
                        <div class="line-blue mtp30"></div>
                        <div class="ml15 flex-column">
                            <text class="text-blod-large">课程推荐</text>
                            <text class="text-gray-small">根据您订阅的标签推荐课程</text>
                        </div>
                    </div>
                    <div class="flex-row pd25 mt35" :key="index" v-for="(item,index) in items">
                        <div class="flex-column span1">
                            <text class="text-blod-large">{{item.title}}</text>
                            <div class="flex-row mt35">
                                <text class="text-tag" v-for="(v, i) in item.tag" :key="i">{{v}}</text>
                            </div>
                        </div>
                        <bui-image class="ml30" :src="item.img" width="200px" height="150px"></bui-image>
                    </div>
                </div>

                <div class="flex-row center bgwh pdb20 pdt20 mt25">
                    <div class="flex-row span1 center">
                        <div class="circle-box-150">
                            <bui-image src="/image/pl.jpg" width="200px" height="150px"></bui-image>
                        </div>
                        <text class="text-normal ml15">岗位课程</text>
                    </div>
                    <div class="flex-column span1 center">
                        <div class="flex-row center">
                            <div class="circle-box">
                                <bui-image src="/image/pl.jpg" width="120px" height="90px"></bui-image>
                            </div>
                            <text class="text-normal ml15">学习进度</text>
                        </div>
                        <div class="flex-row center mt50">
                            <div class="circle-box">
                                <bui-image src="/image/pl.jpg" width="120px" height="90"></bui-image>
                            </div>
                            <text class="text-normal ml15">学习轨迹</text>
                        </div>
                    </div>
                </div>



                <div class="flex-column mt25 bgwh pdt20 pdb20">
                    <div class="flex-row column-center-top">
                        <div class="line-blue"></div>
                        <text class="text-blod-large ml15">热门微课</text>
                    </div>
                    <div class="flex-column pd20 mt25" :key="index" v-for="(item,index) in items">
                        <div class="flex-row">
                            <div class="flex-column span1">
                                <text class="text-blod-large">{{item.title}}</text>
                                <div class="flex-row mt35">
                                    <text class="text-tag" v-for="(v, i) in item.tag" :key="i">{{v}}</text>
                                </div>
                            </div>
                            <bui-image class="ml30" :src="item.img" width="200px" height="150px"></bui-image>
                        </div>
                        <div class="flex-row mt15">
                            <div class="flex-row  column-center-top span1">
                                <bui-icon color="#5da3f6" size="25" name="ion-star"></bui-icon>
                                <bui-icon color="#5da3f6" size="25" name="ion-star"></bui-icon>
                                <bui-icon color="#5da3f6" size="25" name="ion-star"></bui-icon>
                                <bui-icon color="#eeeeee" size="25" name="ion-star"></bui-icon>
                                <bui-icon color="#eeeeee" size="25" name="ion-star"></bui-icon>
                                <text class="text-gray-small ml15">8.5分</text>
                            </div>
                            <div class="flex-row center">
                                <bui-icon color="#999999" size="30" name="ion-person"></bui-icon>
                                <text class="text-gray-small ml15">340</text>
                            </div>
                        </div>
                    </div>
                </div>
                <loading class="bui-loading" @loading="onLoading" :display="showLoading ? 'show' : 'hide'">
                    <text class="bui-loading-indicator" v-if="showLoading">别拉啦，我是有底线的~</text>
                </loading>

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
    const picker = weex.requireModule('picker');
    module.exports = {
        data () {
            return {
                leftItem: {
                    icon: 'ion-ios-search'
                },
                rightItem: {
                    icon: 'ion-qr-scanner'
                },
                currentTab:0,
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
                selectedBackground: '#ffffff',
                items: [
                    { title: '分晓产品和解决方案', img:'/image/pl.jpg', tag: [ '设计师', '互联网' ] },
                    { title: '简立方技术讨论会-用户体验设计上', img:'/image/pl.jpg', tag: [ '设计师', '互联网' ] },
                    { title: 'BUI入门视频教程', img:'/image/pl.jpg', tag: [ '设计师', '互联网' ] },
                    { title: '分晓产品和解决方案', img:'/image/pl.jpg', tag: [ '设计师', '互联网' ] },
                ],
                imageList: [
                    '/image/slider1.jpg',
                    '/image/silder2.jpg'
                ],
                showLoading: false,
            }
        },

        methods:{
            back () {
                this.$pop();
            },
            onItemChange(index){
                this.$toast(index);
                // if (index === 1) {
                //     var url = this.$getContextPath() + "/" + 'list1.weex.js';
                //     this.$push(url);
                // }

            },
            onSliderChange(e){
                var index = e.index;
                this.currentTab=index;
            },
            numberChange(value){
                this.$toast(value);
            },
            onLoading(e){
                this.showLoading = true;
                setTimeout(() => {
                    this.showLoading = false;
                }, 2000);
            }
        }
    }
</script>