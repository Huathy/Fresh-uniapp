<template>
	<view class="content">
		<swiper indicator-dots="">
			<swiper-item>
				<image :src="baseUrl + goods.pics"></image>
			</swiper-item>
		</swiper>
		<view class="line"></view>
		<view class="box1">
			<view>
				<text>品名：{{goods.gname}}</text>
				<text>单价：{{goods.price}}</text>
			</view>
			<view>
				<text>净重：{{goods.weight}}/{{goods.unit}}</text>
				<text>保质期：{{goods.qperied}}</text>
			</view>
		</view>
		<view class="line"></view>
		<view class="intro">
			<text class="active">简介：</text>
			{{goods.intro}}
		</view>
		<view class="line"></view>
		<view class="detail">
			<text class="active">详情：</text>
			<!-- 使用v-html指令展示html内容 -->
			<view v-html="goods.descr"></view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.BASE_PATH,
				goods: {}
			}
		},
		onLoad(options) {
			console.log(options)
			this.getGoodsByTno(options.gno)
		},
		methods: {
			getGoodsByTno(gno){
				uni.request({
					url:this.BASE_PATH + 'goods/getGoodsByGid?gno=' + gno,
					success: res=>{
						if(res.statusCode != 200){
							uni.showToast({
								title:"请求数据失败,请稍后重试...",
								icon:"none"
							})
							return ;
						}
						this.goods = res.data;
						console.log(this.goods);
					},
					fail: err=>{
						uni.showToast({
							title:"请求失败，请检查网络连接...",
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		swiper{
			height: 700rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
	}
	.box1{
		padding: 10px;
		// 
		// flex-wrap: wrap;	//弹性盒元素在必要的时候拆行：
		// 
		view{
			// width: 170px;
			display: flex;	//浮动布局
			justify-content: space-between;		//项目位于各行之间留有空白的容器内
			text:{	//选取其第二个节点
				// padding-left: 50px;
				width: 150px;
			}
		}
	}
	.line{
		height: 10rpx;
		width: 750rpx;
		background-color: #eee;
	}
</style>
