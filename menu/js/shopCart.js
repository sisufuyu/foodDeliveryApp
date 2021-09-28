(function(){
    var $cartContainer = $(".cart-item-container");

    //when add or remove product in menu, change the product in shopping cart also
    window.changeCartItem = function(){
        $cartContainer.html("");
        $(".menu-category-item").each(function(){
            var list = $(this).data("menu").spus;
            //check each menu category item data, if product chooseCount>0, append item to cart
            $.each(list,function(_,val){
                if(val.chooseCount> 0){
                    var el = document.createElement("div");
                    el.className = "cart-item";
                    var name = val.name, price = val.min_price, count = val.chooseCount;
                    var str = `<div class="cart-item-name">${name}</div>
                                <div class="cart-item-price">￥<span class="price">${price*count}</span></div>
                                <div class="cart-select">
                                    <div class="cart-item-minus cart-select-btn"></div>
                                    <div class="cart-item-count">${count}</div>
                                    <div class="cart-item-add cart-select-btn"></div>
                                </div>`;
                    //append data to cart-item, so when change product number in shopping cart will change menu product number also
                    $(el).append(str).data("item",val);
                    $cartContainer.append(el);
                }
            })
        })
        countTotal();
    }

    //count total product number and price
    function countTotal(){
        var num = 0, price = 0;
        $(".cart-item").each(function(){
            num += parseInt($(this).find(".cart-item-count").text());
            price += parseInt($(this).find(".price").text());
        })
        $(".total-price").text("￥"+price);
        var $count = $(".product-count");
        $count.text(num);
        if(num >0 ){
            $count.removeClass("hide");
        }else{
            $count.addClass("hide");
        }
    }

    //change product number in shopping cart by clicking cart-select-btn
    $cartContainer.on("click",".cart-select-btn",function(event){
        var $this = $(this);
        var $item = $this.parents(".cart-item");
        var $count = $item.find(".cart-item-count");
        var num = parseInt($count.text());
        var data = $item.data("item");
        if($this.hasClass("cart-item-add")){
            num ++;
        }else if($this.hasClass("cart-item-minus")){
            num --;
        }
        if(num <= 0){
            data.chooseCount = 0;
            $item.remove();
        }else{
            data.chooseCount = num;
            $item.find("price").text(data.min_price*num);
            $count.text(num);
        }
        countTotal();
        //get current menu category list again 
        $(".menu-category-item.active-item").click();
    })

    //empty shopping cart 
    $(".clear-cart").on('click',function(){
        // empty cart item container
        $cartContainer.html("");

        // delete product count from menu category item data
        $(".menu-category").find(".menu-category-item").each(function(index){
           var $this = $(this);
           var data = $this.data("menu");
           $.each(data.spus,function(_,val){
                val.chooseCount = 0;
           })
           //clear current menu list product count
           if($this.hasClass("active-item")){
                $this.click();
           }
        })

        //empty total price and count showing in cart
        countTotal();
    })

    //click cart icon, show mask and cart content
    $(".cart-icon").on("click",function(){
        var $cart = $(".cart-content");
        var mask = $(".mask");
        if($cart.hasClass("hide")){
            $cart.removeClass("hide");
            mask.removeClass("hide");
        }else{
            $cart.addClass("hide");
            mask.addClass("hide");
        }
    })
})();