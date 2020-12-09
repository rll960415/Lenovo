var $ulLis = $('.banner_ul li')
var $olLis = $('.banner_ol li')
var $span = $('#banner span')
var now = 0

$olLis.on('click', function () {
    $(this).attr('class', 'banner_active').siblings().attr('class', '');
    $ulLis.eq($(this).index()).attr('class', 'banner_active').siblings().attr('class', '');
    now = $(this).index();
});

setInterval(function () {

    now = ++now % $olLis.length;

    $olLis.eq(now).attr('class', 'banner_active').siblings().attr('class', '');
    $ulLis.eq(now).attr('class', 'banner_active').siblings().attr('class', '');

}, 3000);

$span.eq(0).on('click', function () {
    if (now == 0) {
        now = $olLis.length - 1;
    }
    else {
        now--;
    }
    $olLis.eq(now).attr('class', 'banner_active').siblings().attr('class', '');
    $ulLis.eq(now).attr('class', 'banner_active').siblings().attr('class', '');
})
$span.eq(1).on('click', function () {
    if (now == $olLis.length - 1) {
        now = 0;
    }
    else {
        now++;
    }
    $olLis.eq(now).attr('class', 'banner_active').siblings().attr('class', '');
    $ulLis.eq(now).attr('class', 'banner_active').siblings().attr('class', '');
})

$.ajax({
    url: '../data/good.json',
    type: 'get',
    dataType: 'json',
    success: function (json) {
        var str = ''
        $.each(json.data, function (index, item) {
            str += `
            <div class="main_con">
            <div class="content1">
            <div class="bigPic">
                <a href=""><img src="${item.imgUrl}" alt=""></a>
            </div> 
            ${
                item.xiaoxin.map((v, i) => {
                return `
                        <div class="goods">
                            <a href="">                
                                <div class="goods_img">
                                    <img src="${v.imgurl}" alt="">
                                </div>
                                <div class="goods_list">
                                    <h3 class="text_ellipsis">${v.name}</h3>
                                    <p class="text_ellipsis">${v.title}</p>
                                    <p class="price">${v.price}</p>
                                </div>
                            </a>
                        </div>
                        `
                }).join('')
            }                                              
            </div>
            </div>
        `
        })
        $('#main').html(str)
    }
})










