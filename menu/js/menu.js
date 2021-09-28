(function(){

    //render menu category and append data to each category item
    function getCategoryList(){
        $.getJSON("json/food.json",function(data){
            //console.log(data);
            var list = data.data.food_spu_tags;
            countShipping(data.data.poi_info.shipping_fee);
            $.each(list,function(index,val){
                var el = document.createElement("div");
                el.classList.add("menu-category-item");
                var name = val.name, 
                    icon = val.icon;
                var str = `${icon ?  `<img class="menu-category-icon" src=${icon}>`:''}
                           ${name}`;
                el.innerHTML = str;
                $(el).data("menu",val);
                $(".menu-category").append($(el));
                //init first menu category & menu list
                if(index === 0){
                    el.classList.add("active-item");
                    getMenuList(val);
                }
            })
        })
    }

    //get menu list
    function getMenuList(data){
        var str = "";
        $(".menu-list").html();
        var list = data.spus;
        $.each(list,function(_,val){
            var name = val.name,
                url = val.picture;
                description = val.description,
                unit = val.unit,
                price = val.min_price,
                like = val.praise_content,
                id = val.id;
            str +=`<div class="menu-item">
                        <img class="menu-img" src=${url}>
                        <div class="menu-item-info">
                            <p class="menu-name">${name}</p>
                            <div class="menu-desc">${description}</div>
                            <p class="menu-like">${like}</p>
                            <p class="menu-price"><span class="strong">￥${price}</span>/${unit}</p>
                        </div>
                        <div class="menu-select">
                            <div class="minus menu-select-btn"></div>
                            <div class="count">${val.chooseCount ? val.chooseCount : 0}</div>
                            <div class="add menu-select-btn"></div>
                        </div>
                    </div>`
        });
        $(".menu-list").html(str);
        $(".menu-category-name").text(data.name);
    };

    //when click menu category item, render according menu list
    $(".menu-category").on("click",".menu-category-item",function(){
        $(".menu-category-item").removeClass("active-item");
        $(this).addClass("active-item");
        getMenuList($(this).data("menu"));
    })

    //bind click event to menu select button
    $(".menu-list").on("click",".menu-select-btn",function(event){
       var $this = $(event.target);
       var $count = $this.parent().find(".count");
       var num = parseInt($count.text() || '0');
       //if click add btn, add product count, otherwise reduce product count
       if($this.hasClass("add")){
            num ++;
       }else if($this.hasClass("minus")){
           if(num === 0) return;
           else num --;
       }
       $count.text(num);
       //change product count in category item data also
       var index = $(".menu-item").index($this.parents(".menu-item"));
       var data = $(".menu-category-item.active-item").data("menu");
       data.spus[index].chooseCount = num;

       if(typeof window.changeCartItem === 'function'){
        window.changeCartItem();
       }
    });

    //count shipping fee
    function countShipping(price){
        $(".delivery-fee .price").text(price);
    }
    
    function init(){
        getCategoryList();
    }

    init();
})();
