/**** -- RECOMMENDED APPS -- ****/
function jsonpCBRecApps(res) {

    if (typeof res == 'string')
        var res = JSON.parse(res);

    var data_from_site_plug = res['data'].slice(0, 8);
    for (var app = 0; app < data_from_site_plug.length; app++) {

        dqs('#app_url_' + app).setAttribute("href", (data_from_site_plug[app]['rurl']));
        var resizeimg = data_from_site_plug[app]['iurl'].replace('36x36', '128x128');
        var elImg = dqs("#app_image_" + app);
        elImg.src = resizeimg;
        elImg.style.width = '50px';
        elImg.style.height = '50px';

        elImg.style.display = 'block';
        elImg.setAttribute('data-name', data_from_site_plug[app]['brand']);
        elImg.setAttribute('data-url', data_from_site_plug[app]['rurl']);
        elImg.setAttribute('alt', data_from_site_plug[app]['brand']);
        dqs('#recommended_apps_name_' + app).innerText = data_from_site_plug[app]['brand'];
        var container_div = dqs('#fig_div_' + app)

        //if (dqs(".recommended_app_section").find(".panel")) {
        flag_var = 1;
        //}

        if (mobile_width <= 320 && app > 3) {
            container_div.classList.add("fourinch");
        }

    }
    //alert(mobile_width);

    // expand arrow for devices less than 320p
    if (mobile_width <= 320) {
        var nextdiv = document.createElement("a");
        nextdiv.id = 'change_arrowicon'
        nextdiv.className = 'glyph-icon flaticon-down-arrow';
        nextdiv.href = "javascript:show_nextitem();"

        $recommended_app_section.appendChild(nextdiv);
    }

    //            
}
var s = document.createElement('script');
s.src = '//kme46.siteplug.com/qlapi?o=kme46&s=88107&u=[domain]&f=json&n=8&i=1&is=36x36&di=&callback=jsonpCBRecApps';
document.body.appendChild(s);
/**** -- RECOMMENDED APPS: close -- ****/


/**** ---- SITE SEARCH BAR  -- ****/
function siteSuggest(ss_keyword) {
    var s = document.createElement('script');
    s.src = '//cwc89.siteplug.com/sssapi?o=cwc89&s=61071&kw=' + ss_keyword + '&itype=cs&f=json&i=1&it=1&is=36x36&n=5&af=1&di=' + current_parameter + ' &callback=jsonpCBSearchSugg';
    document.body.appendChild(s);
}
function jsonpCBSearchSugg(res) {
    if (typeof res == 'string')
        var res = JSON.parse(res);


    var data_from_site_suggest = res['ads'];
    if (!res['ads']['ad']) {
        //no result found
        return;
    }

    var site_suggest_ads = dqs('.site_suggest_ads');

    if (Array.isArray(res['ads']['ad'])) {
        //more than one suggestion 

        var data_from_site_suggest = res['ads']['ad'].slice(0, 3);
        //only show max 3 sugg.

        var bulkHTML = ''
        for (var ad = 0; ad < data_from_site_suggest.length; ad++) {
            var htmlStr = `
                        <li class="li_row">
                            <div class="ad_list">
                                <a href="${data_from_site_suggest[ad]['rurl']}">
                                <div id="icon">
                                    <img id="brand_image" class="img-responsive ads-img img-auto" src="${data_from_site_suggest[ad]['iurl']}">
                                </div>
                                <div class="site_ad_title word-wrap">
                                    <h3 id="brand_title" class="word-wrap">${data_from_site_suggest[ad]['brand']}
                                    </h3>
                                    <p id="ad_domain" class="domain_url">
                                    ${data_from_site_suggest[ad]['durl']}
                                    </p>
                                </div>
                                </a>
                            </div>
                        </li>`;

            bulkHTML += htmlStr;

        }

        site_suggest_ads.innerHTML = "";
        site_suggest_ads.innerHTML = bulkHTML;
    } else {

        var data_from_site_suggest = res['ads'];
        var htmlStr = `
                        <li class="li_row">
                            <div class="ad_list">
                                <a href="${data_from_site_suggest['ad']['rurl']}">
                                <div id="icon">
                                    <img id="brand_image" class="img-responsive ads-img img-auto" src="${data_from_site_suggest['ad']['iurl']}">
                                </div>
                                <div class="site_ad_title word-wrap">
                                    <h3 id="brand_title" class="word-wrap">${data_from_site_suggest['ad']['brand']}
                                    </h3>
                                    <p id="ad_domain" class="domain_url">
                                    ${data_from_site_suggest['ad']['durl']}
                                    </p>
                                </div>
                                </a>
                            </div>
                        </li>`;

        site_suggest_ads.innerHTML = "";
        site_suggest_ads.innerHTML = htmlStr;
    }

}
/**** ---- SITE SEARCH BAR : close -- ****/


/**** ---- SITE SEARCH BAR : close -- ****/
/*
 * @ redirect user to the suggested site ( after click / enter in search box )
 */

function jsonpCBSearchRedirect(res) {
    if (typeof res == 'string')
        var res = JSON.parse(res);

    var ads = res['ads'];

    if (ads != "No Ads for given Keyword.") {
        redirectlink = data['ads']['ad']['rurl'];
        //       console.log(redirectlink);
        window.open(redirectlink, "_self");
    } else {
        // window.open("https://www.bing.com/search?mkt=en-in&pc=INDC&q=" + search_query, "_self");
        window.open("http://b.scandid.in/api/searchv3?category=product&type=json&subid=INDA&key=tqw5643rasf3gbag&pid=ind&product_key=" + search_query, "_self");
    }
}

function direct_to_search_link() {
    var redirectlink;
    search_query = document.getElementById('search_in_page').value;

    if (search_query != '') {
        var s = document.createElement('script');
        s.src = '//edd31.siteplug.com/sssapi?o=edd31&s=77160&kw=' + search_query + '&itype=cs&f=json&af=0&di=' + current_parameter + '&callback=jsonpCBSearchRedirect';
        document.body.appendChild(s);
    }
}

function deleteInput() {
    var input = document.getElementById('search_in_page');
    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;
        if (key == 8 || key == 46)
            $('.site_suggest_ads').html("");
        return false;
    }
}


function show_nextitem() {

    var current_status = document.getElementsByClassName('fourinch')[0].style.display;
    var arrow_el = document.getElementById("change_arrowicon");
    var x = document.getElementsByClassName('fourinch');

    var arrImg = document.getElementById('arrow_img');
    if (current_status == "none" || current_status == "") {
        arrImg.src = 'assets/images/up-arrow-sc.svg';
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    } else {
        arrImg.src = 'assets/images/down-arrow-sc.svg';
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

    }
}



//event handlers
/************ EVENT HANDLER ASSIGNMENTS /************/
//--------------------------------------------//
var $top_news_section = dqs('.top_news_section');
$top_news_section.addEventListener('click', function(e) {
    if (e.target.matches('[id*="top_news_"')) {
        var label = e.target.getAttribute('data-title');
        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'topNewsClicked', label);
        window.location = e.target.getAttribute('data-url');
    }
    // ->delgate for '#top_news_x'
});

$top_news_section.onload = function() {
    setTimeout(function() {
        $('.topnew').css("display", "block");
    }, 500);
};
    

dqs('body').addEventListener('click', function(e) {
    //AmazonAd_Click
    if (e.target.matches('.amazon_ad')) {
        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'AmazonAdClicked');
        console.log("AmazonClicked")
    }

    //WorldCup AdClicked
    if (e.target.matches('.world-cup-ad')) {
        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'WorldCupAdClicked');
        console.log("WorldCupAdClicked")
    }
});

//--------------------------------------------//
var $recommended_app_section = dqs('#recommended_app_section');
$recommended_app_section.addEventListener('click', function(e) {

    if (e.target.matches('.recommended_apps')) {
        var label = e.target.getAttribute('data-name');

        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'RecommendedClicked', label);
        window.location = e.target.getAttribute('data-url');
    }

});

$recommended_app_section.onload = function() {
    setTimeout(function() {
        if (flag_var == 1) {
            $('.reco').css("display", "block");
        }
    }, 500);
};

var $site_suggest_ads = document.querySelector('.site_suggest_ads');
var $search_in_page = document.querySelector('#search_in_page');

//seach textbox 
$search_in_page.addEventListener('keyup', function(e) {
    var ss_keyword = document.getElementById('search_in_page').value;
    $site_suggest_ads.innerHTML = '';

    if (ss_keyword.length > 2) {
        document.querySelector('.site_suggest_box').style.display = 'block'
        siteSuggest(ss_keyword);
    } else {
        document.querySelector('.site_suggest_box').style.display = 'none';
    }
});

$search_in_page.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        direct_to_search_link();
    }
});

$site_suggest_ads.addEventListener('click', function(e) {

    if (e.target && e.target.nodeName == 'LI') {
        var label = $(this).find("a").text();

        if (typeof ga != 'undefined')
            ga('send', 'event', 'ClickEvent', 'siteAdClicked', label);
        window.location = $(this).find("a").attr("href");
        // console.log("siteAdClicked")
    }
});

//--------------------------------------------//

// search icon
document.querySelector('#search_button').addEventListener('click', function() {
    direct_to_search_link();
});

document.querySelector("#search").addEventListener('submit', function() {
    var label = $search_in_page.value;

    if (typeof ga != 'undefined')
        ga('send', 'event', 'ClickEvent', 'SearchClicked', label);
});

/*function post_Tracking_Data(t_data) {
    var settings_post = {
        "async": true,
        "crossDomain": true,
        "withCredentials": true,
        "url": "https://track.dailyhunt.in/api/v2/syndication/tracking?partner=indus&ts=" + timestamp + "&puid=" + current_parameter,
        "xhrFields": {
            "withCredentials": true
        },
        "method": "POST",
        "headers": {
            "Authorization": "key=DVj2UsFaFnN+3kn4VHWPS9hUiLCz4eOtblRfAUrDC50=",
            "Signature": hashInBase64_post,
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": t_data
    }

    $.ajax(settings_post).done(function(data) {
        //   console.log("posted successfully");
    });
}*/


setTimeout(function() {

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-47795566-10', 'auto');
    ga('send', 'pageview');


}, 1200000);



/* helper functions */
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    if(seconds < 0)
        return "Just now";

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    if (seconds > 60) {
        return "59 seconds ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

