require.config({  //配置文件
	baseUrl:"/",

	paths:{
		"jquery":"libs/jquery/jquery-3.2.1",
		"parabola":"libs/jquery/parabola",
		"cookie":"libs/jquery/jquery.cookie",
		"bootstrap":"libs/bootstrap/js/bootstrap",
		"calender":"libs/jquery/calender",
		"header":"js/component/header",
		"footer":"js/component/footer",
		"template": "libs/template-web",
		"url":"js/component/url",
		"item":"js/component/item",
		"itemaside":"js/component/itemaside",
		"detailItem":"js/component/detailItem",
		"getCookie":"js/component/getCookie"
		
		
		
		
	},
	shim:{
		"bootstrap":{deps:["jquery"]}
	}
})