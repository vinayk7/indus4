
var pageSize 		= 25;
var pageNumber 		= 1;
var newsAppKey 		= 'DVj2UsFaFnN+3kn4VHWPS9hUiLCz4eOtblRfAUrDC50=';
var current_parameter = '';//getUrlParameter(window.location.search.substring(1))["IMEI"];
var scrollDir 		= 'up';
var nextPageUrl 	= '';
var bigAdInterval 	= 2; // how much gap between newss feeds and main ad (2nd)
var smallAdInterval = 5; // how much gap between newss feeds and main ad (1st)

self.importScripts('crypto-js-bundle.min.js');
 
self.onmessage = function(e){
 
  //initial load
	if(e.data.event == 'load_news'){
		pageNumber = 1;
	}
  
  //scroll more news
	if(e.data.event == 'load_more_news'){
		pageNumber++;
	}

	current_parameter = e.data.current_parameter;
	var timestamp = new Date().getTime();
	var message_get = "cid=1&fields=data.rows.id%2Cdata.rows.title%2Cdata.rows.deepLinkUrl%2Cdata.rows.publishTime%2Cdata.rows.images%2Cdata.rows.source%2Cdata.rows.sourceLogo&langCode=hi&pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&partner=indus&puid=" + current_parameter + "&ts=" + timestamp + "GET"

	var hash_get = CryptoJS.HmacSHA1(message_get, "4IGAIGGb8z1nOGzpBiSeQA==");
	var hashInBase64_get = CryptoJS.enc.Base64.stringify(hash_get);
	var message_post = "partner=indus&puid=" + current_parameter + "&ts=" + timestamp + "POST"

	var hash_post = CryptoJS.HmacSHA1(message_post, "4IGAIGGb8z1nOGzpBiSeQA==");
	var hashInBase64_post = CryptoJS.enc.Base64.stringify(hash_post);

	var track_data = {
	    "viewedDate": timestamp,
	    "stories": []
	};


    var xhrNews = new XMLHttpRequest();
   	xhrNews.open("GET", "https://feed.dailyhunt.in/api/v2/syndication/items?pageSize=" + pageSize + "&fields=data.rows.id,data.rows.title,data.rows.deepLinkUrl,data.rows.publishTime,data.rows.images,data.rows.source,data.rows.sourceLogo&cid=1&langCode=hi&pageNumber=" + pageNumber + "&partner=indus&ts=" + timestamp + "&puid=" + current_parameter);
    xhrNews.withCredentials = true;
    xhrNews.setRequestHeader('Authorization', "key=" + newsAppKey)
    xhrNews.setRequestHeader('Signature', hashInBase64_get)
    xhrNews.onreadystatechange = function() {
        if (xhrNews.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        	if(e.data.event == 'load_news')
        	postMessage({event:'load_news', data: xhrNews.response, page: pageNumber});
        	else if(e.data.event == 'load_more_news')
        	postMessage({event:'load_more_news', data: xhrNews.response, page: pageNumber});
        }
    };


	xhrNews.send();
}