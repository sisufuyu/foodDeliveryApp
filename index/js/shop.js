(function(){

    var shopList = $(".shop-list-content");
    var page = 0, isLoading = false;
    //render shop list
    function getShopList(){
        page++;
        isLoading = true;
        $.getJSON("json/homelist.json",function(data){
            //console.log(data);
            var list = data.data.poilist || [];
            $.each(list,function(_,val){
                var url = val.pic_url,
                    name = val.name,
                    score = getScore(val.wm_poi_score),
                    monthSell = getMonthSell(val.month_sale_num),
                    distance = val.distance,
                    time = val.mt_delivery_time,
                    min_price = val.min_price_tip,
                    brand = getBand(val.brand_type),
                    event = getEvent(val.discounts2);
                var str = `<div class="shop-item">
                <img class="shop-img" src=${url}>
                ${brand}
                <div class="shop-info">
                    <p class="shop-name oneline">${name}</p>
                    <div class="shop-desc clearfix">
                        ${score}
                        <div class="shop-sell">月售${monthSell}</div>
                        <div class="shop-distance">&nbsp;${distance}</div>
                        <div class="shop-delivery-time">${time}&nbsp;|</div>
                    </div>
                    <div class="shop-start-delivery">${min_price}</div>
                    ${event}
                </div>
            </div>`
                shopList.append(str);
            })
            isLoading = false;
        })
    }
    //render brand tag
    function getBand(brand){
        if(brand){
           return  '<div class="brand brand-brand">品牌</div>';
        }else{
            return '<div class="brand brand-new">新到</div>';
        }
    }
    //render shop month sell number 
    function getMonthSell(num){
        if(num > 999){
            return '999+';
        }else{
            return num;
        }
    }
    //render shop events
    function getEvent(discount){
        var str="";
        $.each(discount,function(_,val){
            var info = val.info, icon = val.icon_url;
            str += `<div class="event-info">
                <img class="event-icon" src=${icon}>
                <p class="event-content oneline">${info}</p>
                </div>`;
        })
        return str;
    }
    // render shop score
    function getScore(score){
        var _score = score.toString();
        var fullScore = parseInt(_score.split('.')[0]);
        var halfScore = parseInt(_score.split('.')[1]) > 5 ? 1 : 0;
        var zeroScore = 5 - fullScore - halfScore;
        var str = '';
        for(var i =0 ; i < fullScore; i++){
            str += '<span class="iconify" data-icon="clarity:star-solid"></span>';
        }
        if(halfScore === 1){
            str += '<span class="iconify" data-icon="clarity:half-star-solid"></span>';
        }
        for(var j = 0; j < zeroScore; j++ ){
            str += '<span class="iconify" data-icon="clarity:star-line"></span>';
        }
        return `<div class="shop-star">${str}</div>`
    }

    //click shop item go to shop menu page
    $(".shop-list-content").on("click",".shop-item",function(){
        window.location = "../../menu/menu.html";
    })

    var docEl = document.documentElement, bodyEl = document.body;
    $(window).on("scroll",function(){
        var viewHeight = window.innerHeight || docEl.clientHeight || bodyEl.clientHeight;
        var scrollHeight = bodyEl.scrollHeight;
        var scrollTop = docEl.scrollTop || bodyEl.scrollTop;
        var preLoadDist = 30;
        //when document is about scroll to bottom
        if(viewHeight + scrollTop + preLoadDist >= scrollHeight){
            // load new shop list if data is not loading now and page <3
            if(!isLoading && page < 3){
                getShopList();
            }
        }
    })

    function init(){
        getShopList();
    }

    init();

})();
