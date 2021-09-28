(function(){
    function initHeader(){
        var items = [{
            key: 'menu',
            text: '点菜'
        },{
            key: 'comment',
            text: '评价'
        },{
            key: 'resturant',
            text: '商家'
        }];
        var str = "";
        $.each(items,function(_,val){
            str +=`<a class="menu-tab-item ${val.key}" href="../${val.key}/${val.key}.html">
                        ${val.text}
                    </a>`;
        })
        $(".menu-tab-bar").append(str);

        var path = window.location.pathname.split('/');
        var page = path[path.length-1].replace('.html','');
        
        $(".menu-tab-item."+page).addClass("menu-active");

        $(".menu-nav .back-icon").on("click",function(){
            window.location = "../index/index.html";
        })
    }
    initHeader();
})();