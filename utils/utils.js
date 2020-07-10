const BASE_URL = "http://119.23.187.147:8080/fresh/";
export const myReq = (options)=>{
	return new Promise( (resolve,reject)=>{
		uni.request({
			url: BASE_URL + options.url,
			method: method || 'GET',
			data: options.data || {},
			success: (res)=>{
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title:"请求数据失败..."
				})
				reject(err);
			}
		})
	} )
}