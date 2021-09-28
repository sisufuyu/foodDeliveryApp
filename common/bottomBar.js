(function(){
    function initBottom(){
        var items = [{
            key: 'index',
            text: '首页'
        },{
            key: 'order',
            text: '订单'
        },{
            key: 'profile',
            text: '我的'
        }];
        var str = "";
        $.each(items,function(_,val){
            str +=`<a class="bottom-item ${val.key}" href="../${val.key}/${val.key}.html">
                        <div class="item-icon"></div>
                        <div class="item-name">${val.text}</div>
                    </a>`;
        })
        $(".bottom-bar").append(str);

        var path = window.location.pathname.split('/');
        var page = path[path.length-1].replace('.html','');
        
        $(".bottom-item."+page).addClass("bottom-active");
    }
    initBottom();
})();
