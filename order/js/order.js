(function(){
    var orderEl = $(".order-list");
    var page = 0, isLoading = false;
    function getOrderList(){
        page ++;
        isLoading = true;
        $.getJSON('json/orders.json',function(data){
            //console.log(data);
            var list = data.data.digestlist || [];
            $.each(list,function(_,val){
                var url = val.poi_pic,
                    name = val.poi_name,
                    state = val.status_description
                    detail = getOrderDetails(val),
                    comment = getComment(val.is_comment);
                var str = `<div class="order-item">
                <div class="order-content">
                    <img  class="order-img" src=${url}>
                    <div class="order-info">
                        <div class="order-title">
                            <p class="order-name oneline">${name}</p>
                            <div class="arrow-right">&gt;</div>
                            <div class="order-state">${state}</div>
                        </div>
                        <div class="order-detail">
                        ${detail}
                        </div>
                    </div>
                </div>
                ${comment}
                </div>`
                orderEl.append(str);
                isLoading = false;
            })
        })
    }
    function getOrderDetails(data){
        var list = data.product_list || [];
        var total = 0;
        var str = "";
        var num = data.total;
        $.each(list,function(index,val){
            var name = val.product_name,
                count = val.product_count;
            total +=count;
            if(index<2){
                str += `<div class="product">
                            <div class="product-name">${name}</div>
                            <div class="product-count">X${count}</div>
                        </div>`;
            }
        })
        if(list.length>2){
            str +='<div class="more">···</div>';
        }
        str += '<div class="total-info">总计'+total+'件，实付￥<span class="total-price">'+num+'</span>元</div>';
        return str;
    }
    function getComment(comment){
        if(comment){
            return `<div class="order-comment clearfix">
                        <div class="comment-btn">评价</div>
                    </div>`;
        }else{
            return '';
        }
    }
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
                getOrderList();
            }
        }
    })

    function init(){
        getOrderList();
    }

    init();
})();
