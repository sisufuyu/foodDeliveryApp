(function(){
    //render category
    var category = $(".category");
    function initCategory(){
        $.getJSON('json/head.json',function(data){
        // console.log(data);
            var list = data.data.primary_filter.slice(0,8);
            $.each(list,function(_,val){
                var name = val.name;
                var url = val.url;
                var str = `<div class="category-item">
                                    <img class="item-icon" src=${url}>
                                    <p class="item-name">${name}</p>
                                </div>`;
                                category.append(str);
            })
        })
    }

    category.on("click",".category-item",function(){
        alert("chosen category "+$(this).find(".item-name").text());
    })

    function init(){
        initCategory();
    }

    init();
})();

                