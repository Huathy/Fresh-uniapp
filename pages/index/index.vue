<template>
	<view class="content">
		<!-- 轮播图片开始 -->
		<view class="nav">
			<swiper indicator-dots="true" circular autoplay interval="1000">
				<swiper-item v-for="img in advImgs" :key="index">
					<image :src="img"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图结束 -->
		
		<!-- 推荐商品开始 -->
		<view class="hot_goods">
			<view class="title">商品推荐</view>
			<!-- 商品列表开始 -->
			<view class="goodsList" v-for="(type,index) in types" :key="type.tno">
				<!-- 商品类型标题开始 -->
				<view class="type">
					{{type.tname}}
					<navigator :url="'../goodsView/goodsView?tno='+type.tno+'&pn=1&tname=' + type.tname">查看更多</navigator>
				</view>
				<!-- 商品类型标题结束 -->
				<!-- 商品展示开始 -->
				<view class="goodsItem" v-for="(item,idx) in goods[index].msg" :key="item[0]" @click="goDetail(item[0])">
					<!-- 注意上边循环的内容,是msg中的内容,而不是goods中的内容 -->
					<image :src="basePath + item[3]" ></image>
					<view class="msg">
						<text class="price">￥{{item[2]}}</text>
						<text class="unit">/斤</text>
					</view>
					<view class="name">{{item[1]}}</view>
				</view>
				<!-- 商品展示结束 -->
			</view>
			<!-- 商品列表结束 -->
		</view>
		<!-- 推荐商品结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				basePath:this.BASE_PATH,
				advImgs: ['../../static/advImg/slide.jpg','../../static/advImg/slide02.jpg',
				'../../static/advImg/slide03.jpg','../../static/advImg/slide04.jpg'],
				types: [],
				goodsList: [],
				goods: []
			}
		},
		onLoad() {	//一般进行请求获取数据
			this.getAllType()
			this.getTidGoods()
		},
		onPullDownRefresh() {
			this.goods = []
			this.getAllType()
			this.getTidGoods()
		},
		methods: {
			goDetail(gno){
				uni.navigateTo({
					url: "../detail/detail?gno=" + gno
				})
			},
			// 获取商品类型
			getAllType(){
				uni.request({
					url: this.BASE_PATH + "type/getAll",
					success: res=>{		//注意这里this的指向问题
						if(res.statusCode != 200){
							uni.showToast({
								title:"请求数据失败,请稍后重试..",
								icon:"none"
							})
							return ;
						}
						this.types = res.data
						console.log(this.types);
					},
					fail: err=>{
						uni.showToast({
							title:"请求失败，请检查网络连接...",
							icon:"none",
						})
						console.log(err);
					}
				})
			},
			// 获取商品详情
			getTidGoods(){
				uni.request({
					url: this.BASE_PATH + "goods/getTidGoods",
					success: res=>{
						if(res.statusCode != 200){
							uni.showToast({
								title:"请求数据失败,请稍后重试..",
								icon:"none"
							})
							return ;
						}
						this.goodsList = res.data
						var len = this.goodsList.length;
						for(var i=0 ; i < len ; i++){
							this.goods.push({"tno":res.data.tno,"msg":this.goodsList[i].gInfo.split(":")})
							for(var j=0 ; j < this.goods[i].msg.length ; j++){
								this.goods[i].msg[j] = this.goods[i].msg[j].split('||');
							}
						}
					},
					fail: err=>{
						uni.showToast({
							title:"请求失败，请检查网络连接...",
							icon:"none"
						})
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		swiper{		//轮播图
			width: 750rpx;
			height: 380rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
	}
	.hot_goods{		//推荐商品样式
		background-color: #eee;
		overflow: hidden;	//超出隐匿
		margin-top: 4px;
		.title{		//标题
			height: 50px;
			line-height: 50px;		//行高50
			color: $shop-color;
			text-align: center;		//文本居中
			letter-spacing: 22px;	//字符间距22px
			background-color: #fff;
			margin: 6rpx 0px;
		}
		.goodsList{		//商品列表
			padding: 0 15rpx;
			display: flex;	//浮动布局
			flex-wrap: wrap;	//弹性盒元素在必要的时候拆行：
			justify-content: space-between;		//项目位于各行之间留有空白的容器内
			.type{		//类型
				width: 100%;
				background-color: $shop-color;
				padding-left: 10rpx;
				color: #fff;
				navigator{
					float: right;
					font-size: 28rpx;
					margin-top: 4px;
					text-decoration: underline;		//下划线
				}
			}
			.goodsItem{		//商品详情
				background-color: #fff;
				margin: 6px 0;
				width: 355rpx;
				box-sizing: border-box;
				image{
					width: 80%;
					height: 150px;
					display: block;
					margin: 0 auto;
				}
				.msg{		//商品信息
					color: #DA260E;
					font-size: 36rpx;
					padding: 6rpx;
					text:nth-child(2){
						color: #9e9e9e;
						font-size: 32rpx;
					}
				}
				.name{
					font-size: 32rpx;
				}
			}
		}
	}
</style>
