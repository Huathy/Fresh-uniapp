<template>
	<view>
		<!-- 商品列表开始 -->
		<view class="goodsList">
			<!-- 商品类型标题开始 -->
			<view class="type">
				{{tname}}
			</view>
			<!-- 商品类型标题结束 -->
			<!-- 商品展示开始 -->
			<view class="goodsItem" v-for="(item,idx) in goodsList" :key="item.gno" @click="goDetail(item.gno)">
				<!-- 注意上边循环的内容,是msg中的内容,而不是goods中的内容 -->
				<image :src="baseUrl + item.pics" ></image>
				<view class="msg">
					<text class="price">￥{{item.price}}</text>
					<text class="unit">/{{item.weight}}</text>
				</view>
				<view class="name">{{item.gname}}</view>
			</view>
			<!-- 商品展示结束 -->
		</view>
		<!-- 商品列表结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:this.BASE_PATH,
				tname : '',
				pageSize: 6,
				tno : 1,
				GoodsTotal: 0,
				page : 1,
				goodsList: [],
				noMore: false
			}
		},
		onLoad(options) {	//加载事件
			console.log(options)
			this.tname = options.tname;
			this.tno = options.tno;
			this.getNewGoods();
		},
		onPullDownRefresh() {	//下拉刷新事件
			this.page = 1;
			this.noMore = false;
			this.GoodsTotal = 0;
			this.goodsList = [];
			this.getNewGoods();
		},
		onReachBottom() {		//上拉触底事件
			if(this.noMore){	//判断是否有更多的数据,如果有就更新,没有就提示
				uni.showToast({
					title:"该页已无更多数据..",
					icon:"none",
				})
				return ;
			}
			this.page ++ ;
			this.getNewGoods();
		},
		methods: {
			goDetail(gno){		//跳转详情页方法
				uni.navigateTo({
					url: "../detail/detail?gno=" + gno
				})
			},
			getNewGoods(){		//获取商品的方法封装
				uni.request({
					url:this.BASE_PATH + 'goods/getGoodsByTidPage?tno='+this.tno+'&page='+this.page+'&pageSize='+this.pageSize,
					success: (res) => {
						console.log(res.data.goods);
						if(res.data.goods.length <= 0){
							uni.showToast({
								title:"该页已无更多数据..",
								icon:"none",
							})
							this.noMore = true;		//是否有更多的数据?
						}
						for(var i=0 ; i < res.data.goods.length ; i++){
							this.goodsList.push(res.data.goods[i]);
						}
					},
					fail: (err) => {
						uni.showToast({
							title:"请求数据失败...",
							icon:"none"
						})
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.goodsList{
		background-color: #ccc;
		padding: 2px 15rpx;
		display: flex;	//浮动布局
		flex-wrap: wrap;	//弹性盒元素在必要的时候拆行：
		justify-content: space-between;		//项目位于各行之间留有空白的容器内
		.type{
			text-align: center;
			width: 100%;
			letter-spacing: 22px;	//字符间距22像素
			margin-bottom: 2rpx;
			background-color: #fff;
			color: $shop-color;
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
	
</style>
