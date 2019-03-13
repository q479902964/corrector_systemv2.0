//设置Cookie
export function setCookie(c_name,value,Days){
	var date = new Date();
  date.setTime(date.getTime() + Days*24*60*60*1000);//多少天后过期
	document.cookie = c_name + "=" + encodeURIComponent(value) + ";expires=" + date.toGMTString();
	console.log(document.cookie);
}

//获取Cookie
export function getCookie(c_name){
	if(document.cookie.length > 0){
		let c_start = document.cookie.indexOf(c_name + "=");
		if(c_start!=-1){
			c_start = c_start + c_name.length + 1;
			let c_end = document.cookie.indexOf(";",c_start);
			if(c_end == -1){
				c_end = document.cookie.length
			}
			return decodeURIComponent(document.cookie.substring(c_start,c_end))
		}
	}
	return ""
}

//删除Cookie
export function delCookie(c_name){
	setCookie(c_name,"",-1);
}
