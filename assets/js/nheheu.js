var BASEURL = "https://vndecor.github.io/";
var CURRENCY = "₫";
var PRODUCTS = [];
var PRODUCT = null;
var TEMPLATE = {
    home: '',
    product: '',
    cart: ''
};

var USERPHONE = "";

var formatMoney = function(n, nocurrency){
	var res = (n+"").replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	if(!nocurrency ) res += " "+CURRENCY;
	return res;
};

var convertTime = function(s, type){
    //%d-ngày %m-tháng %y-năm %h-giờ %i-phút %s-giây
    if( !type ) type = "%d/%m %h:%i:%s";
    var d = new Date( s*1000 );

    return type.replace(new RegExp("\\%" + "\\w"  , "g"), function(mather){
        var returnStr ="";
        if(mather.indexOf("d") !=-1) returnStr = (d.getDate() < 10) ? '0'+d.getDate() : d.getDate();
        else if(mather.indexOf("m")!=-1) returnStr =  (d.getMonth()<9) ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
        else if(mather.indexOf("y")!=-1) returnStr =  d.getFullYear();
        else if(mather.indexOf("h")!=-1) returnStr =  (d.getHours()<10) ? '0'+d.getHours() : d.getHours();
        else if(mather.indexOf("i")!=-1) returnStr =  (d.getMinutes()<10) ? '0'+d.getMinutes() : d.getMinutes();
        else if(mather.indexOf("s")!=-1) returnStr =  (d.getSeconds()<10) ? '0'+d.getSeconds() : d.getSeconds();

        return returnStr;
    });
};

var getQueryVariable = function(variable, _url){
    var query = window.location.search.substring(1);
    if( _url ){
        var arr = _url.split("?");
        if( arr.length == 2 ) query = arr[1];
    }

    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
};

var getFullUrl = function(path){
    return BASEURL + path;
};

var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

var productSeen = function(pid){
    var arr = [];

    var _seens = $.cookie('productseen');
    if( _seens ){
        arr = JSON.parse(_seens);
    }
    if( pid ){
        var _i = arr.indexOf(pid);
        if( _i != -1 ) arr.splice(_i, 1);
        arr.push( pid );
        $.cookie('productseen', JSON.stringify(arr), { expires: 7, path: '/' });
    }
    return arr;
};

var renderItem = function(obj, customclass){
    var _html = "",
        _price = obj.price,
        _price2 = obj.price2;

    if( !customclass ) customclass = "col-6 col-sm-6 col-md-4 col-lg-3 item";

    _html += '<div class="'+ customclass +'" style="display: block;">';
        _html += '<div class="product-image">';
            _html += '<a href="'+ getFullUrl('product/?p='+ obj.slug) +'" class="product-img openlink">';
                _html += '<img src="'+ obj.imgs[0] +'">';
                // _html += '<img class="primary" src="'+ obj.imgs[0] +'">';
                // _html += '<img class="hover" src="'+ obj.imgs[0] +'">';
            _html += '</a>';
        _html += '</div>';
        _html += '<div class="product-details text-center">';
            _html += '<div class="product-name">';
                _html += '<a href="'+ getFullUrl('product/?p='+ obj.slug) +'" class="openlink">'+ obj.name +'</a>';
            _html += '</div>';
            _html += '<div class="product-price">';
                _html += '<span class="old-price">'+ formatMoney(_price2) +'</span>';
                _html += '<span class="price">'+ formatMoney(_price) +'</span>';
            _html += '</div>';
            _html += '<div class="product-review">'+ renderStar(obj.review) +'</div>';
        _html += '</div>';
    _html += '</div>';

    return _html;
};

var renderItem2 = function(obj){ // list item right sidebar
    var _html = "",
        _price = obj.price,
        _price2 = obj.price2;

    _html += '<div class="grid__item"><div class="mini-list-item"><div class="mini-view_image">';
    _html += '<a class="grid-view-item__link openlink" href="'+ getFullUrl('product/?p='+ obj.slug) +'">';
    _html += '<img class="grid-view-item__image ls-is-cached" src="'+ obj.imgs[0] +'" alt="">';
    _html += '</a></div><div class="details">';
    _html += '<a class="grid-view-item__title openlink" href="'+ getFullUrl('product/?p='+ obj.slug) +'">'+ obj.name +'</a>';
    _html += '<div class="grid-view-item__meta"><span class="product-price__price"><span class="money">'+ formatMoney(_price) +'</span></span></div>';
    _html += '<div class="product-review">';
    _html += renderStar(obj.review);
    _html += '</div></div></div></div>';
    return _html;
};

var renderStar = function(data){
    var _reviewStar = "",
        pointReview = 0;

    if( data && typeof data == "number" ) pointReview = data;
    else if( data && typeof data == "object" ){
        var _total = 0;
        for( var i=0; i<data.length; i++ ){
            _total += data[i].vote;
        }
        pointReview = Math.round(10*_total/data.length)/10;
    }

    for( var i=1; i<=pointReview; i++ ){
        _reviewStar += '<i class="font-13 fa fa-star"></i>';
    }

    if( pointReview%1 != 0) _reviewStar += '<i class="font-13 fa fa-star-half-o"></i>';

    for( var i=Math.ceil(pointReview)+1; i<=5; i++ ){
        _reviewStar += '<i class="font-13 fa fa-star-o"></i>';
    }

    return _reviewStar;
};

var renderProd = function(obj){
    document.title = obj.name + " - Nhẹ Hều";

    var $wrap = $(".product-single");
    $wrap.find(".product-single__title").html(obj.name);
    $wrap.find(".variant-sku").html(obj.id);
    $wrap.find(".spr-badge-caption").html((obj.review?obj.review.length:0)+" đánh giá");
    $wrap.find(".prInfoRow .reviewLink").prepend(renderStar(obj.review));

    // price
    var _price = obj.price,
        _price2 = obj.price2;

    // if( obj.prices ){
    //     _price = obj.prices[0].price || obj.price;
    //     _price2 = obj.prices[0].price2 || obj.price2;
    // }else{
    //     _price = obj.price;
    //     _price2 = obj.price2;
    // }

    var setPrice = function(pr, pr2){
        $wrap.find("#ProductPrice-product-template>.money").html(formatMoney(pr));
        $wrap.find("#ComparePrice-product-template>.money").html(formatMoney(pr2));
        $wrap.find(".product-single__save-amount>.money").html(formatMoney(pr2-pr));
        $wrap.find(".off>span").html( Math.round(100*(pr2-pr)/pr2) );
    };

    // Multiple type
    if( PRODUCT.prices ){
        var _multitype = "";
        var _default = 0;
        _price = PRODUCT.prices[_default].price || PRODUCT.price;
        _price2 = PRODUCT.prices[_default].price2 || PRODUCT.price2;

        for( var i=0; i<PRODUCT.prices.length; i++ ){
            var item = PRODUCT.prices[i];
            _multitype += '<div data-value="'+ item.name +'" class="swatch-element" data-image="'+ item.img +'" data-index="'+ i +'">';
            _multitype += '<input class="swatchInput" id="swatch-0-'+ PRODUCT.id+'-'+item.id +'" type="radio" name="option--type" value="'+ PRODUCT.id+'-'+item.id +'"'+ (i==_default?"checked":"") +'>';
            _multitype += '<label class="swatchLbl color medium" for="swatch-0-'+ PRODUCT.id+'-'+item.id +'" style="background-image:url('+ item.img +');" title="'+ item.name +'"></label>';
            _multitype += '</div>';
        }

        var $multitype = jQuery(_multitype);

        $wrap.find(".product-form__item--type").append($multitype);
        $wrap.find(".slVariant").html(PRODUCT.prices[0].name);

        $multitype.find("input").on("change", function(){
            var $thisParent = $(this).parent();
            var _name = $thisParent.attr("data-value"),
                _img = $thisParent.attr("data-image");

            $wrap.find(".slVariant").html(_name);

            $("#gallery a").each(function(){
                if( $(this).attr("data-image") == _img ) $(this).addClass("active");
                else $(this).removeClass('active');
            });
            $(".zoompro").data('elevateZoom').swaptheimage(_img, _img);

            // set price
            var _i = $thisParent.attr("data-index");
            if( _i ){
                _i = parseInt(_i);
                if( _i >= 0 && _i < PRODUCT.prices.length ){
                    var _pr1 = PRODUCT.prices[_i].price || PRODUCT.price,
                        _pr2 = PRODUCT.prices[_i].price2 || PRODUCT.price2;
                    setPrice( _pr1, _pr2 );
                }
            }
        });

    }else{
        // remove
        $wrap.find(".product-form-product-template").remove();
    }

    setPrice(_price, _price2);

    // images
    var imgs = obj.imgs;
    var _gallery = "",
        _zoomImg = "";
    for( var i=0; i<imgs.length; i++){
        _gallery += '<a data-image="'+ imgs[i] +'" data-zoom-image="'+ imgs[i] +'" class="slick-slide" data-slick-index="'+ (i+1) +'" aria-hidden="true" tabindex="-1"><img src="'+ imgs[i] +'" alt="" /></a>';
        _zoomImg += '<a href="'+ imgs[i] +'" data-size="600x600"></a>';
    }

    $wrap.find(".zoompro").attr({
        "src": imgs[0],
        "data-zoom-image": imgs[0] 
    });

    $wrap.find("#gallery").html(_gallery);
    $wrap.find(".lightboximages").html(_zoomImg);

    product_thumb1();
    product_zoom();

    // render detail
    var _detail = obj.detail? obj.detail : "<h3>Nội dung đang được cập nhật</h3>";
    $(".description-inner").html(_detail);

    // render review
    var _review = "";
    if( obj.review ){
        for( var i=0; i< obj.review.length; i++ ){
            _review += '<div class="spr-review"><div class="spr-review-header"><span class="product-review spr-starratings spr-review-header-starratings"><span class="reviewLink">'+ renderStar(obj.review[i].vote) +'</span></span>';
            _review += '<div class="spr-review-wrap"><h3 class="spr-review-header-title">'+ obj.review[i].name +'</h3><span class="spr-review-header-certify"><i class="anm anm-shield-check" aria-hidden="true"></i> Chứng nhận đã mua hàng</span></div>';
            _review += '</div><div class="spr-review-content">';
            _review += '<p class="spr-review-content-body">'+ obj.review[i].content +'</p>';
            if( obj.review[i].img ) _review += '<img class="spr-review-content-img lazyloaded" src="'+ obj.review[i].img +'">';
            _review += '</div>';

            if( obj.review[i].reply ) _review += '<div class="spr-review-reply"><h3 class="spr-review-header-title">Nhẹ hều <span class="badge badge-info">Care</span></h3><p class="spr-review-content-body">'+ obj.review[i].reply +'</p></div>';

            _review += '</div>';
        }
    }else{
        _review = "<h3>Chưa có nhận xét nào</h3>";
    }

    $("#spr-reviews .review-inner").html( _review );

    if( obj.review && obj.review.length ){
        var _total = 0;
        for( var i=0; i<obj.review.length; i++ ){
            _total += obj.review[i].vote;
        }
        var pointReview = Math.round(10*_total/obj.review.length)/10;
        $("#spr-reviews .section-header-score .score").html(pointReview);
        $("#spr-reviews .section-header .count").html(obj.review.length);
    }else{
        $("#spr-reviews .section-header-score").remove();
    }
        


    // Breadcrumb
    var _breadcrumbs = '<a href="'+ BASEURL +'" class="openlink" title="Trở về trang chủ">Shop</a><i class="fa fa-caret-right"></i><span> '+ PRODUCT.name +'</span>';
    $(".breadcrumbs").html(_breadcrumbs);

    // event Click 
    $(".btn-addToCartMain").off().on("click", function(){
        var pid = "";
        if( PRODUCT.prices ){
            pid = $wrap.find(".swatchInput:checked").val();
            if( !pid ) pid = PRODUCT.id+'-'+PRODUCT.prices[0].id;
        }else{
            pid = PRODUCT.id;
        }

        // showLoading(true, 1);
        // addToCart(pid, $("#Quantity").val());
        updateCartProd(pid, $("#Quantity").val());

        setTimeout(function(){
            $("#minicart-drawer").modal('show');
        }, 100);
        return false;
    });

    $(".btn-buyNow").off().on("click", function(){
        var pid = "";
        if( PRODUCT.prices ){
            pid = $wrap.find(".swatchInput:checked").val();
            if( !pid ) pid = PRODUCT.id+'-'+PRODUCT.prices[0].id;
        }else{
            pid = PRODUCT.id;
        }

        updateCartProd(pid, $("#Quantity").val());
        setTimeout(function(){
            openUrl( getFullUrl("cart") );
        }, 100);
        return false;
    });

    // zooom
    var items = [];
    $('.lightboximages a').each(function() {
        var $href   = $(this).attr('href'),
            $size   = $(this).data('size').split('x'),
            item = {
                src : $href,
                w: $size[0],
                h: $size[1]
            }
            items.push(item);
    });

    $('.prlightbox').on('click', function (event) {
        event.preventDefault();
      
        var $index = $(".active-thumb").parent().attr('data-slick-index');
        $index++;
        $index = $index-1;

        var options = {
            index: $index,
            bgOpacity: 0.9,
            showHideOpacity: true
        }
        var lightBox = new PhotoSwipe($('.pswp')[0], PhotoSwipeUI_Default, items, options);
        lightBox.init();
    });

};



var getMyCart = function(){ // return array
    var arr = [];
    var _mycart = $.cookie('mycart');
    if( _mycart ){
        arr = JSON.parse(_mycart);
        for( var i=0 ;i<arr.length; i++ ){
            arr[i].num = parseInt(arr[i].num);
        }
    }

    var oldL = arr.length;

    if( PRODUCTS.length ){
        for(var i=arr.length-1; i>=0; i--){
            var item = getItemInfo(arr[i].pid);
            if( item.id == -1 ) arr[i].splice(i, 1);
        }
    }

    if( oldL != arr.length ){
        $.cookie('mycart', JSON.stringify(arr), { expires: 7, path: '/' });
    }

    return arr;
};

var getItemInfo = function(pid){ // product or child
    // id, name, img, price, price2, type, slug
    var _id = pid,
        _tid = "",
        price = 0,
        price2 = 0,
        img = "",
        _type = "",
        slug = "",
        name = "";

    if( _id.indexOf("-") != -1 ){
        _tid = _id.split("-")[1];
        _id = _id.split("-")[0];
    }

    for( var i=0; i<PRODUCTS.length; i++ ){
        if( _id == PRODUCTS[i].id ){
            name = PRODUCTS[i].name;
            slug = PRODUCTS[i].slug;
            img = PRODUCTS[i].imgs[0];
            price  = PRODUCTS[i].price;
            price2 = PRODUCTS[i].price2;

            if( PRODUCTS[i].prices ){
                if( _tid ){
                    PRODUCTS[i].prices.forEach(function(item){
                        if( item.id == _tid ){
                            price  = item.price || PRODUCTS[i].price;
                            price2 = item.price2 || PRODUCTS[i].price2;
                            img = item.img;
                            _type = item.name;
                        }
                    });
                }else if( _id == PRODUCTS[i].id ){
                    _type = "Ngẫu nhiên";
                    price  = PRODUCTS[i].prices[0].price || PRODUCTS[i].price;
                    price2 = PRODUCTS[i].prices[0].price2 || PRODUCTS[i].price2;
                }
            }

            break;
        }else if( i === PRODUCTS.length -1 ){
            pid = -1;
        }
    }

    var res = {
        id: pid,
        name: name,
        slug: slug,
        img: img,
        price: price,
        price2: price2
    };

    if( _type ) res.type = _type;

    return res;
};

var updateCartProd = function(pid, n){ // n <= 0 : remove cart item
    // EMPTY CART
    if( pid === "EMPTY" ){
        $.cookie('mycart', JSON.stringify([]), { expires: -7, path: '/' });
        $(".site-cart-count").html( 0 );
        return;
    }

    var num = parseInt(n);
    var arr = getMyCart();

    if( arr.length ){
        for( var i=arr.length-1; i>=0; i-- ){
            if( arr[i].pid == pid ){
                if( num <= 0 ) arr.splice(i, 1);
                else arr[i].num = num;
                break;
            }else if( i == 0 && n > 0 ){
                arr.push({
                    pid: pid,
                    num: num
                });
            }
        }
    }else if( n > 0 ){
        arr = [{
            pid: pid,
            num: num
        }];
    }

    $.cookie('mycart', JSON.stringify(arr), { expires: 7, path: '/' });

    var _total = 0;
    for( var i=0; i<arr.length; i++ ){
        _total += arr[i].num;
    }

    $(".site-cart-count").html( _total );
};

var showLoading = function(visible, _t){
    var $body = $("body");
    if( visible ){
        $body.addClass("loading");
        if( !_t ) _t = 2;
        setTimeout(function(){
            $body.removeClass("loading");
        }, _t*1000);
    }else $body.removeClass("loading");
};

var renderMiniCart = function(prods){
    var $wrap = $("#minicart-drawer");

    if( !prods ) prods = getMyCart();

    var _html = "",
        _totalMoney = 0,
        _totalProd = 0;

    if( prods.length ){

        for( var j=prods.length-1; j>=0; j-- ){
            var item = getItemInfo(prods[j].pid);

            _html += '<li class="item clearfix"><a class="product-image openlink" href="'+ getFullUrl("product/?p="+item.slug) +'"><img src="'+ item.img +'" alt="" title="">';
            _html += '</a><div class="product-details"><a href="javascript:void(0);" class="remove" data-pid="'+ item.id +'"><i class="anm anm-times-sql" aria-hidden="true"></i></a>';
            _html += '<a class="product-title openlink" href="'+ getFullUrl("product/?p="+item.slug) +'">'+ item.name +'</a>';

            _html += '<div class="variant-cart">'+ (item.type||"&nbsp;") +'</div>';

            _html += '<div class="priceRow"><div class="product-price">';

            _html += '<span class="money">'+ formatMoney(item.price) +'</span> x <span>'+ prods[j].num +'</span></div></div></div></li>';

            _totalProd += prods[j].num;
            _totalMoney += item.price*prods[j].num;
        }
    }

    $wrap.find(".minicart-content>ul").html( _html );
    $wrap.find(".minicart-bottom .product-price").html(formatMoney(_totalMoney));

    $wrap.find("h4").html("Giỏ hàng ("+ _totalProd +")");

    $wrap.find(".remove").on("click", function(){
        updateCartProd($(this).attr("data-pid"), -1);
        renderMiniCart();
        return false;
    });
};

var renderHomePage = function(_url){
    var filter = getQueryVariable("t", _url);
    if( filter == "hot" ){
        PRODUCTS.sort(function(a, b){
            var rv1 = 0, rv2 = 0;
            if( a.hasOwnProperty("review") ) rv1 = a.review.length;
            if( b.hasOwnProperty("review") ) rv2 = b.review.length;
            if ( rv1 < rv2 ) return 1;
            if ( rv1 > rv2 ) return -1;
            return 0;
        });
    }else if( filter == "sale" ){
        PRODUCTS.sort(function(a, b){
            var rv1 = a.price/a.price2,
                rv2 = b.price/b.price2;

            if ( rv1 < rv2 ) return -1;
            if ( rv1 > rv2 ) return 1;
            return 0;
        });
    }else{
        shuffleArray(PRODUCTS);
    }

    var _html = "";
    for( var i=0; i<PRODUCTS.length; i++ ){
        _html += renderItem(PRODUCTS[i]);
    }
    $(".grid-products>.row").html( _html );
};

var renderProductPage = function(_url){
    shuffleArray(PRODUCTS);
    var slug = getQueryVariable("p", _url);

    for( var i=0; i<PRODUCTS.length; i++ ){
        if( PRODUCTS[i].slug == slug ) PRODUCT = PRODUCTS[i];
    }

    if( !PRODUCT ){
        console.log("Product not found");
        window.location.href = BASEURL;
        return;
    }

    renderProd(PRODUCT);

    qnt_incre();

    // SẢN PHẨM ĐÃ XEM
    // max 4 product
    var seens = productSeen(PRODUCT.id);
    if( seens.length > 1 ) seens.splice(seens.length-1, 1);
    if( seens.length > 4 ) seens = seens.slice(seens.length-4);
    var _htmlSeens = "";
    for( var i=seens.length-1; i>=0; i-- ){
        for( var j=0; j< PRODUCTS.length; j++ ){
            if( seens[i] == PRODUCTS[j].id ){
                _htmlSeens += renderItem2(PRODUCTS[j]);
            }
        }
    }
    $(".list-seen-products>.grid").html( _htmlSeens );

    // 6 SẢN PHẢM TƯƠNG TỰ , 4 SẢN PHẨM KHÁC  != seen, != PRODUCT
    var arrSP = [];
    for( var i=0; i<PRODUCTS.length; i++ ){
        if( PRODUCTS[i].id != PRODUCT.id && seens.indexOf(PRODUCTS[i].id) == -1 ) arrSP.push( PRODUCTS[i] );
    }

    var _htmlsptt = "";

    for( var i=0; i<arrSP.length; i++ ){
        if( i< 6 ){
            _htmlsptt += renderItem(arrSP[i], "col-6 col-sm-6 col-md-3 col-lg-2 item");
        }
    }
    $(".related-product>.row").html(_htmlsptt);

    // SẢN PHẨM KHÁC
    var _htmlspk = "";
    for( var i=6; i<arrSP.length; i++ ){
        _htmlspk += renderItem2(arrSP[i]);
    }
    $(".list-other-products>.grid").html(_htmlspk);
};
var renderCartPage = function(){
    var $wrap = $(".cart__list");
    var prods = getMyCart();

    var _html = "",
        _totalMoney = 0;

    if( prods.length ){
        for( var j=prods.length-1; j>=0; j-- ){
            var item = getItemInfo(prods[j].pid);
            _totalMoney += prods[j].num*item.price;

            _html += '<tr class="cart__row border-bottom line1 cart-flex border-top">';
                _html += '<td class="cart__image-wrapper cart-flex-item">';
                    _html += '<a href="'+ getFullUrl("product/?p="+item.slug) +'" class="openlink"><img class="cart__image" src="'+item.img+'" alt="'+ item.name +'"></a>';
                _html += '</td>';
                _html += '<td class="cart__meta small--text-left cart-flex-item">';
                    _html += '<div class="list-view-item__title">';
                        _html += '<a href="'+ getFullUrl("product/?p="+item.slug) +'" class="openlink">'+ item.name +'</a>';
                    _html += '</div>';
                    _html += '<div class="cart__meta-text">';
                        _html += (item.type||"")+'<br>';
                    _html += '</div>';
                _html += '</td>';
                _html += '<td class="cart__price-wrapper cart-flex-item text-center">';
                    _html += '<span class="money">'+ formatMoney(item.price) +'</span>';
                _html += '</td>';
                _html += '<td class="cart__update-wrapper cart-flex-item text-center">';
                    _html += '<div class="cart__qty text-center">';
                        _html += '<div class="qtyField">';
                            _html += '<a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>';
                            _html += '<input class="cart__qty-input qty" type="text" name="updates[]" id="qty-'+ j +'" value="'+ prods[j].num +'" pattern="[0-9]*" data-pid="'+ item.id +'">';
                            _html += '<a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>';
                        _html += '</div>';
                    _html += '</div>';
                _html += '</td>';
                _html += '<td class="small--hide cart-price text-center">';
                    _html += '<div><span class="money">'+ formatMoney(prods[j].num*item.price) +'</span></div>';
                _html += '</td>';
                _html += '<td class="text-center small--hide"><a href="javascript:void(0);" class="btn btn--secondary cart__remove" title="Remove tem" data-pid="'+ item.id +'"><i class="icon icon anm anm-times-l"></i></a></td>';
            _html += '</tr>';
        }
    }else{
        _html = '<tr><td><h3>không có sản phẩm nào trong giỏ</h3></td></tr>';
    }

    $wrap.html( _html );
    $(".totalMoney").html(formatMoney(_totalMoney));

    $wrap.find(".qtyBtn").on("click", function() {
        var $input = $(this).siblings(".cart__qty-input"),
            oldValue = $input.val(),
            newVal = 1,
            pid = $input.attr("data-pid");

        if ($(this).is(".plus")) {
            newVal = parseInt(oldValue) + 1;
        }else if (oldValue > 1) {
            newVal = parseInt(oldValue) - 1;
        }

        $input.val(newVal);
        updateCartProd(pid, newVal); // update saved cart

        var item = getItemInfo(pid);

        $(this).closest("tr").find(">.cart-price .money").html( formatMoney( newVal*item.price ));

        // update total .totalMoney
        var prods = getMyCart(),
            total = 0;
        if( prods.length ){
            for( var j=prods.length-1; j>=0; j-- ){
                var item = getItemInfo(prods[j].pid);
                total += prods[j].num*item.price;
            }
        }

        $(".totalMoney").html(formatMoney(total));
    });
    $wrap.find(".cart__remove").on("click", function(){
        updateCartProd($(this).attr("data-pid"), -1);
        $(this).closest(".cart__row").remove();

        // update total .totalMoney
        var prods = getMyCart(),
            total = 0;
        if( prods.length ){
            for( var j=prods.length-1; j>=0; j-- ){
                var item = getItemInfo(prods[j].pid);
                total += prods[j].num*item.price;
            }
        }

        $(".totalMoney").html(formatMoney(total));
        return false;
    });

    $("#cartCheckout").off().on("click", function(){
        var $form = $(".checkout-wrapper");

        var prods = getMyCart();

        var _name = $form.find(".cart_input-name").val(),
            _phone = $form.find(".cart_input-phone").val(),
            _address = $form.find(".cart_input-address").val(),
            _note = $form.find(".cart_input-note").val() || "";

        if( !prods.length ){
            $(this).next().show().delay( 5000 ).fadeOut( 300 ).children(".cart_notify-inner").html("Không có sản phẩm nào trong giỏ");
        }else{
            if( !_name||!_phone||!_address ){
                $(this).next().show().delay( 5000 ).fadeOut( 300 ).children(".cart_notify-inner").html("Vui lòng nhập đủ thông tin");  
            }else{
                _phone = _phone.replace(/\s/g,'');
                db.collection("order").add({
                    name: _name,
                    phone: _phone,
                    address: _address,
                    note: _note,
                    prods: prods,
                    created: firebase.firestore.FieldValue.serverTimestamp()
                }).then(function(docRef) {
                    // empty cart, save phone => goto my order
                    updateCartProd("EMPTY");
                    USERPHONE = _phone;
                    openUrl(BASEURL+"order");
                }).catch(function(error) {
                    $("#cartCheckout").next().show().delay( 5000 ).fadeOut( 300 ).children(".cart_notify-inner").html("Lỗi hệ thống, vui lòng thử lại");
                });
            }
        }
    });

    // close minicarrt
    $('#minicart-drawer').modal('hide')
};

var renderOrderPage = function(){
    if( !USERPHONE ){
        openUrl(BASEURL); return;
    }

    var myorders = [];

    var _htmlTabNav = "",
        _htmlTabContent = "";
        //
    db.collection("order").where("phone", "==", USERPHONE).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            myorders.push( doc.data() );
        });

        myorders.sort(function(a, b){
            return b.created.seconds - a.created.seconds;
        });

        console.log("myorders", myorders);

        for( var i=0; i<myorders.length; i++ ){
            var totalMoney = 0,
                _status = 0;

            if( myorders[i].status ){
                if( myorders[i].status == 10 ) _status = 2;
                else if( myorders[i].status >= 5 ) _status = 1;
            }
            

            _htmlTabNav += '<li><a class="nav-link'+ (i==0?" active":"") +'" data-toggle="tab" href="#tab-pane-'+ myorders[i].created.seconds +'">Mã '+ myorders[i].created.seconds +'</a></li>';
            _htmlTabContent += '<div id="tab-pane-'+ myorders[i].created.seconds +'" class="tab-pane fade'+ (i==0?" active show":"") +'">';
            _htmlTabContent += '<h4>Ngày đặt hàng: <span class="time-now">'+ convertTime(myorders[i].created.seconds) +'</span></h4>';
            _htmlTabContent += '<div class="order-progress" data-step="'+ _status +'"><div style="left: 0;"><span>Đang xử lý</span></div><div style="left: 50%;"><span>Đang vận chuyển</span></div><div style="left: 100%;"><span>Đã giao hàng</span></div></div>';
            _htmlTabContent += '<div class="row"><div class="col-12 col-sm-12 col-md-12 col-lg-12 main-col"><div class="cart style2"><table>';
            _htmlTabContent += '<thead class="cart__row cart__header"><tr><th colspan="2" class="text-center">Sản phẩm</th><th class="text-center">Đơn giá</th><th class="text-center">Số lượng</th><th class="text-center">Thành tiền</th><th class="action">&nbsp;</th></tr></thead>';
            _htmlTabContent += '<tbody class="cart__list">';
            // loop
            for( var j=0; j<myorders[i].prods.length; j++ ){
                var item = getItemInfo(myorders[i].prods[j].pid);
                _htmlTabContent += '<tr class="cart__row border-bottom line1 cart-flex border-top">';
                _htmlTabContent += '<td class="cart__image-wrapper cart-flex-item"><a href="'+ getFullUrl('product/?p='+ item.slug) +'" class="openlink"><img class="cart__image" src="'+ item.img +'" alt="'+ item.name +'"></a></td>';
                _htmlTabContent += '<td class="cart__meta small--text-left cart-flex-item">';
                _htmlTabContent += '<div class="list-view-item__title"><a href="'+ getFullUrl('product/?p='+ item.slug) +'" class="openlink">'+ item.name +'</a></div>';
                _htmlTabContent += '<div class="cart__meta-text"><br></div></td>';
                _htmlTabContent += '<td class="cart__price-wrapper cart-flex-item text-center"><span class="money">'+ formatMoney(item.price) +'</span></td>';
                _htmlTabContent += '<td class="cart__update-wrapper cart-flex-item text-center"><span>'+ myorders[i].prods[j].num +'</span></td>';
                _htmlTabContent += '<td class="small--hide cart-price text-center"><div><span class="money">'+ formatMoney(myorders[i].prods[j].num*item.price) +'</span></div></td></tr>';

                totalMoney += (myorders[i].prods[j].num*item.price);
            }
            _htmlTabContent += '</tbody></table></div></div><div class="container mt-4 checkout-wrapper"><div class="row"><div class="col-12 col-sm-12 col-md-6 col-lg-6 mb-6 cart-col"><h5>Thông tin người nhận</h5>';
            _htmlTabContent += '<p>'+ myorders[i].name +'</p><p>'+ myorders[i].phone +'</p><p>'+ myorders[i].address +'</p><p>'+ myorders[i].note +'</p>';
            _htmlTabContent += '</div><div class="col-12 col-sm-12 col-md-6 col-lg-6 cart__footer"><div class="solid-border"><div class="row border-bottom pb-2 pt-2"><span class="col-12 col-sm-6 cart__subtotal-title"><strong>Tổng tiền</strong></span>';
            _htmlTabContent += '<span class="col-12 col-sm-6 cart__subtotal-title cart__subtotal text-right"><span class="money totalMoney">'+ formatMoney(totalMoney) +'</span></span>';
            _htmlTabContent += '</div></div></div></div></div></div></div>';
        }

        if( !_htmlTabContent ) _htmlTabContent = '<h4>Không có đơn hàng nào cho số điện thoại <span class="myphone">'+ USERPHONE +'</span></h4>';

        $("#page-content").find(".dashboard-list").html( _htmlTabNav );
        $("#page-content").find(".dashboard-content").html( _htmlTabContent );
    }).catch(function(err){
        // 
        console.log("có lỗi xảy ra", err);
        // openUrl(BASEURL);
    });
};

var openUrl = function(_url, notsave){
    $("#page-content").addClass("invisible");
    // var currenturl = window.location.href;
    var pname = "";
    if( _url.indexOf("/product/?p=") !== -1 ){
        pname = "product";
    }else if(_url.indexOf("/cart") !== -1 ){
        pname = "cart";
    }else if(_url.indexOf("/order") !== -1 ){
        pname = "order";
    }else if(_url.indexOf("/payments") !== -1 ){
        pname = "payments";
    }else{ // home
        pname = "home";
    }

    if( pname ){
        if( !TEMPLATE[pname] ){
            $.get(BASEURL+"/template/"+ pname +".html", function(data){
                TEMPLATE[pname] = data;
                openUrl(_url);
            });
        }else{
            $("#page-content").html(TEMPLATE[pname]);
            $(".zoomContainer").remove();
            switch(pname){
                case "home":
                    renderHomePage(_url);
                    _url = BASEURL;
                    break;
                case "product":
                    renderProductPage(_url);
                    break;
                case "cart":
                    renderCartPage();
                    break;
                case "order":
                    renderOrderPage();
                    break;
            }

            setTimeout(function(){
                $("#page-content").removeClass("invisible");
                if( !notsave ) window.history.pushState("object or string", "", _url);
            }, 100);

            $('html, body').animate({
                scrollTop: 0
            }, 200, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                // window.location.hash = hash;
            });
        }
    }
};

var firebaseConfig = {
    apiKey: "AIzaSyDfOuDOS6rncaofRNlGu73tPEFRrsxQIHE",
    authDomain: "nheheu-f68d6.firebaseapp.com",
    databaseURL: "https://nheheu-f68d6.firebaseio.com",
    projectId: "nheheu-f68d6",
    storageBucket: "nheheu-f68d6.appspot.com",
    messagingSenderId: "734928350132",
    appId: "1:734928350132:web:a4da8f5058b9738433e0e1",
    measurementId: "G-SRFCEZYK5H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

$(function(){
    var $body = jQuery("body");

    db.collection("product").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            PRODUCTS.push( doc.data() );
        });
        $('#page-content').removeClass('invisible');
        openUrl(window.location.href);
    }).catch(function(error) {
        console.log("Error getting products: ", error);
    });

    console.log("app start");

    $('#minicart-drawer').on('shown.bs.modal', function () {
        renderMiniCart();
    });

    $("body").on("click", ".openlink", function(){
        var _url = $(this).attr("href");
        openUrl(_url);
        return false;
    });

    $(".btn-viewMyOrder").on("click", function(){
        var _sdt = $("#settingsBox").find("input").val();
        if( _sdt ){
            USERPHONE = _sdt.replace(/\s/g,'');
            openUrl( getFullUrl("order") );
            $("#settingsBox").removeClass("active");
        }
    });

    var arr = getMyCart(),
        _total = 0;
    for( var i=0; i<arr.length; i++ ){
        _total += arr[i].num;
    }
    $(".site-cart-count").html( _total );
});

window.addEventListener("popstate", function(e) {
    openUrl(location.href, true);
});