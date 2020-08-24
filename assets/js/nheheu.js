var BASEURL = "https://vndecor.github.io/";
var CURRENCY = "₫";
var PRODUCTS = [];
var PRODUCT = null;
var TEMPLATE = {};
var PAGENAME = "";

var LikedProds = [];

var USERPHONE = "";
var USER = {};

var PUBLISHER = [];

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

var checkPublisher = function(){
    var ref = getQueryVariable("ref");
    if( ref ){
        var req = {
            uid: ref,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            url: window.location.href
        };
        // window.location.pathname+window.location.search

        $.cookie('ref', ref, { expires: 30, path: '/' });

        db.collection("pub-click").add(req).then(function(docRef) {
            console.log("add new click");
        }).catch(function(error) {
            console.log("add click fail");
        });
    }else{
        console.log("no ref");
    }
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

var sortProducts = function(_type){
    if( !_type ) _type = 'random';

    PRODUCTS.sort(function(a, b){
        var rv1 , rv2;

        switch(_type){
            case "hot":
                rv1 = a.liked||0;
                rv2 = b.liked||0;
                break;
            case "sale":
                rv1 = a.price/a.price2;
                rv2 = b.price/b.price2;
                break;
            default:
                rv1 = 0.5;
                rv2 = Math.random();
                break;
        }

        if ( rv1 < rv2 ) return 1;
        if ( rv1 > rv2 ) return -1;
    });

    // soldout end
    for( var i=PRODUCTS.length-1; i>=0; i-- ){
        if( PRODUCTS[i].soldout ){
            var item = PRODUCTS[i];
            PRODUCTS.splice(i, 1);
            PRODUCTS.push(item);
        }
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

    if( !customclass ) customclass = "col-6 col-sm-6 col-md-4 col-lg-3 item px-1 px-lg-2 mb-2 mb-lg-3";

    _html += '<div class="'+ customclass +'" style="display: block;">';
    _html += '<a href="'+ getFullUrl('product/?p='+ obj.slug) +'" class="item-inner openlink">';
        _html += '<div class="product-image">';
                _html += '<img src="'+ obj.imgs[0] +'">';
                if( obj.liked ) _html += '<div class="product-liked tooltip bs-tooltip-top" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"><i class="icon anm anm-heart"></i> '+ obj.liked +'</div></div>';
                if( obj.soldout ) _html += '<span class="sold-out"><img src="https://vndecor.github.io/assets/images/soldout2.png" ></span>';
        _html += '</div>';

        _html += '<div class="product-details text-center">';
            _html += '<div class="product-name">'+ obj.name +'</div>';
            _html += '<div class="product-price">';
                _html += '<span class="old-price">'+ formatMoney(_price2) +'</span>';
                _html += '<span class="price">'+ formatMoney(_price) +'</span>';
            _html += '</div>';
            _html += '<div class="product-review">'+ renderStar(obj.review) +'</div>';
        _html += '</div>';
    _html += '</a>';
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

    pointReview = 5;

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

    if( obj.soldout ){ // hết hàng
        $wrap.find(".instock").addClass("hide");
        $wrap.find(".outstock").removeClass("hide");

        $wrap.find(".btn-buyNow").html("Hết hàng");
    }

    if( LikedProds.indexOf(obj.id) != -1 ){
        $wrap.find(".btn-likeThisProduct >.icon").removeClass("anm-heart-l").addClass("anm-heart");
    }

    // 
    if( obj.liked ) $wrap.find('.product-liked .num').html(obj.liked);

    // price
    var _price = obj.price,
        _price2 = obj.price2;

    var setPrice = function(pr, pr2){
        $wrap.find(".product-price__price-product-template>.money").html(formatMoney(pr));
        $wrap.find(".comparePrice-product-template>.money").html(formatMoney(pr2));
        // $wrap.find(".product-single__save-amount>.money").html(formatMoney(pr2-pr));
        $wrap.find(".off>span").html( Math.round(100*(pr2-pr)/pr2) );
    };

    // Multiple type
    if( PRODUCT.prices ){
        var _multitype = "";

        for( var i=0; i<PRODUCT.prices.length; i++ ){
            var item = PRODUCT.prices[i];
            _multitype += '<div data-value="'+ item.name +'" class="swatch-element'+ (item.soldout?" soldout":"") +'" data-image="'+ item.img +'" data-index="'+ i +'">';
            _multitype += '<input class="swatchInput" id="swatch-0-'+ PRODUCT.id+'-'+item.id +'" type="radio" name="option--type" value="'+ PRODUCT.id+'-'+item.id +'"'+ (item.soldout?" disabled":"") +'>';
            _multitype += '<label class="swatchLbl color medium" for="swatch-0-'+ PRODUCT.id+'-'+item.id +'" style="background-image:url('+ item.img +');"></label>';
            _multitype += '<span class="tooltip-label">'+item.name+'</span>';
            _multitype += '</div>';
        }

        var $multitype = jQuery(_multitype);

        $wrap.find(".product-form__item--type").append($multitype);

        // mặc định chưa chọn
        // $wrap.find(".slVariant").html(_default==-1?"___":PRODUCT.prices[_default].name);

        $multitype.find("input").on("change", function(){
            var $thisParent = $(this).parent();
            var _name = $thisParent.attr("data-value"),
                _img = $thisParent.attr("data-image");

            var $wrapSelect = $wrap.find(".product-form-product-template");
            if( !$wrapSelect.hasClass("onselect") ){

                // var _bottom = $(window).innerHeight()-$wrapSelect.offset().top+$(window).scrollTop()-$wrapSelect.innerHeight()-15;

                var _top = $wrapSelect.offset().top - $(window).scrollTop() - 88 - 15;

                $wrapSelect.css('top', _top );
                // $wrapSelect.css('bottom', -$wrapSelect.height()-130);
                // $wrapSelect.css('top', $wrapSelect.offset().top-$(window).scrollTop()+5);
                setTimeout(function(){
                    $wrapSelect.addClass("onselect");
                    setTimeout(function(){
                        if( _top < 60 ){
                            $wrapSelect.css("top", 60);
                            $("html, body").animate({ scrollTop: "-="+ Math.abs(_top - 60) }, 300);
                        }else if( _top+$wrapSelect.innerHeight() > $(window).height() ){
                            var _nTop = $(window).height()-$wrapSelect.innerHeight();
                            $wrapSelect.css("top", _nTop);
                            $("html, body").animate({ scrollTop: "+="+ Math.abs(_nTop-_top) }, 300);
                        }
                    }, 1000);
                }, 50);
            }

            $wrapSelect.find(".product-selected-image").attr("src", _img);
            $wrapSelect.find(".slVariant").html(_name);

            // $("#gallery a").each(function(){
            //     if( $(this).attr("data-image") == _img ) $(this).addClass("active");
            //     else $(this).removeClass('active');
            // });

            // $(".zoompro").data('elevateZoom').swaptheimage(_img, _img);

            $wrap.find(".zoompro").attr("src", _img);
            $wrap.find(".product-thumb-style1 a").removeClass("active");


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

        $wrap.find(".cover-product-form-product-template").on("scroll mousewheel touchmove", function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

    }else{
        // remove
        $wrap.find(".product-form__item--type").remove();
    }

    setPrice(_price, _price2);

    // images
    var imgs = obj.imgs;
    var _gallery = "";
    var items = [];
    for( var i=0; i<imgs.length; i++){
        _gallery += '<a data-image="'+ imgs[i] +'" aria-hidden="true" tabindex="-1"><img src="'+ imgs[i] +'"/></a>';

        var itemSl = {
            src : imgs[i],
            w: 600,
            h: 600
        };

        if( PRODUCT.prices ){
            for( var j=0; j< PRODUCT.prices.length; j++){
                if( imgs[i] == PRODUCT.prices[j].img ){
                    itemSl.title = PRODUCT.prices[j].name;
                    break;
                }
            }
        }

        items.push(itemSl);
    }

    $wrap.find(".zoompro").attr("src", imgs[0]);

    $wrap.find(".product-thumb-style1").html(_gallery);

    product_thumb1();
    // product_zoom();
    video_popup();

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
    $wrap.find(".btn-addToCartMain").off().on("click", function(e){
        e.preventDefault();
        if( !PRODUCT.soldout ){
            var pid = "";

            var $eff = $('<span class="effect-addtocart"></span>');
            var _from;
            if( PRODUCT.prices ){
                var $swatchChecked = $wrap.find(".swatchInput:checked");
                pid = $swatchChecked.val();
                if( !pid ){
                    // Không có mặc định, bắt phải chọn
                    // pid = PRODUCT.id+'-'+PRODUCT.prices[0].id;
                    $wrap.find(".alert-warning").html("chọn loại hàng").show().delay( 2500 ).fadeOut( 300 );
                    
                    var $wrapSelect = $wrap.find(".product-form-product-template");
                    if( !$wrapSelect.hasClass("onselect") ){
                        var _bottom = $(window).innerHeight()-$wrapSelect.offset().top+$(window).scrollTop()-$wrapSelect.innerHeight()-15;
                        $wrapSelect.css('bottom', _bottom );
                        $wrapSelect.find(".product-selected-image").attr("src", PRODUCT.imgs[0]);
                        setTimeout(function(){
                            $wrapSelect.addClass("onselect");

                            setTimeout(function(){
                                if( _bottom < 0 ){
                                    $wrapSelect.css("bottom", 0);
                                    $("html, body").animate({ scrollTop: "+="+ Math.abs(_bottom) }, 300);
                                }else if( _bottom+$wrapSelect.innerHeight()+60 > $(window).height() ){
                                    var _nBottom = $(window).height()-$wrapSelect.innerHeight()-60;
                                    $wrapSelect.css("bottom", _nBottom);
                                    $("html, body").animate({ scrollTop: "-="+ Math.abs(_nBottom-_bottom) }, 300);
                                }
                            }, 1000);
                        }, 50);
                    }
                    return;
                }

                

            }else{
                pid = PRODUCT.id;
            }

            var _from = $("#Quantity").offset(),
                _to = $('.site-header__cart > .site-cart-count').offset(),
                _num = $("#Quantity").val();

            $eff.html(_num).css({top: _from.top-4, left: _from.left-10}).appendTo('body');

            $eff.delay(100).animate({
                top: _to.top,
                left: _to.left
            }, 'slow', function(){
                $wrap.find(".product-form-product-template").removeClass("onselect");
                // $('body').removeClass("disablescroll");
                $eff.remove();
                updateCartProd(pid, _num, true);
            });

            setTimeout(function(){
                $eff.addClass("onmoving");
            }, 150);

            // showLoading(true, 1);
            // addToCart(pid, $("#Quantity").val());

            // $wrap.find(".product-form-product-template").removeClass("onselect");
            // updateCartProd(pid, $("#Quantity").val());

            // setTimeout(function(){
            //     $("#minicart-drawer").modal('show');
            // }, 100);
        }
    });

    $wrap.find(".btn-buyNow").off().on("click", function(e){
        e.preventDefault();
        if( !PRODUCT.soldout ){
            var pid = "";
            if( PRODUCT.prices ){
                pid = $wrap.find(".swatchInput:checked").val();
                if( !pid ){
                    $wrap.find(".alert-warning").html("chọn loại hàng").show().delay( 2500 ).fadeOut( 300 );

                    var $wrapSelect = $wrap.find(".product-form-product-template");
                    if( !$wrapSelect.hasClass("onselect") ){
                        var _bottom = $(window).innerHeight()-$wrapSelect.offset().top+$(window).scrollTop()-$wrapSelect.innerHeight()-15;
                        $wrapSelect.css('bottom', _bottom );
                        $wrapSelect.find(".product-selected-image").attr("src", PRODUCT.imgs[0]);
                        setTimeout(function(){
                            $wrapSelect.addClass("onselect");

                            setTimeout(function(){
                                if( _bottom < 0 ){
                                    $wrapSelect.css("bottom", 0);
                                    $("html, body").animate({ scrollTop: "+="+ Math.abs(_bottom) }, 300);
                                }else if( _bottom+$wrapSelect.innerHeight()+60 > $(window).height() ){
                                    var _nBottom = $(window).height()-$wrapSelect.innerHeight()-60;
                                    $wrapSelect.css("bottom", _nBottom);
                                    $("html, body").animate({ scrollTop: "-="+ Math.abs(_nBottom-_bottom) }, 300);
                                }
                            }, 1000);
                        }, 50);
                    }
                    return;
                }
            }else{
                pid = PRODUCT.id;
            }

            updateCartProd(pid, $("#Quantity").val());
            setTimeout(function(){
                openUrl( getFullUrl("cart") );
            }, 100);
        }
    });

    $wrap.find(".cover-product-form-product-template, .btn-close-product-selected-wrap").off().on("click", function(e){
        e.preventDefault();
        $wrap.find(".product-form-product-template").removeClass("onselect");
    });

    $wrap.find(".btn-likeThisProduct").off().on("click", function(e){
        var _i = LikedProds.indexOf(obj.id);
        if( _i != -1 ){ // đã like => xóa
            obj.liked -= 1;
            LikedProds.splice(_i, 1);
            $(this).children(".icon").addClass("anm-heart-l").removeClass("anm-heart");
        }else{ // thêm
            obj.liked += 1;
            LikedProds.push(obj.id);
            $(this).children(".icon").removeClass("anm-heart-l").addClass("anm-heart");
        }

        $wrap.find('.product-liked .num').html(obj.liked);

        e.preventDefault();
    });

    // zooom
    $wrap.find('.prlightbox').on('click', function (event) {
        event.preventDefault();
        var _src = $(this).children().attr('src');

        var $index = PRODUCT.imgs.indexOf(_src);
        if($index == -1) $index = 0;

        var options = {
            index: $index,
            bgOpacity: 0.9,
            history: false,
        }
        var lightBox = new PhotoSwipe($('.pswp.slide-fullpage')[0], PhotoSwipeUI_Default, items, options);
        lightBox.init();
    });

    // mobile auto slide
    var slmbOptions = {
        index: 0,
        bgOpacity: 0,
        history: false,
        focus: false,
        modal:false,
        closeOnScroll:false,
        pinchToClose: false,
        closeOnVerticalDrag: false,
        escKey: false
    };
    var sliderMobile = new PhotoSwipe($('.pswp.slide-mobile')[0], PhotoSwipeUI_Default2, items, slmbOptions);
    sliderMobile.init();

    sliderMobile.listen('afterChange', function() {
        // console.log("changeeeee", sliderMobile.currItem);
        var _src = sliderMobile.currItem.src;
        $wrap.find(".product-thumb-style1 a").each(function(){
            var $this = $(this);
            if( $this.attr("data-image") == _src ) $this.addClass("active");
            else $this.removeClass("active");
        });
    });

    sliderMobile.listen('preventDragEvent', function(e, isDown, preventObj) {
        preventObj.prevent = !('ontouchstart' in document.documentElement);
    });

    $wrap.find(".product-thumb-style1").on("click mouseenter", "a", function(e){
        e.preventDefault();
        var $this = $(this);
        var _src = $this.attr("data-image");
        if( _src ){
            $wrap.find(".zoompro").attr("src", _src);
            // $this.addClass("active").closest(".product-thumb-style1").find("a").not(this).removeClass("active");
            var _index = PRODUCT.imgs.indexOf(_src);
            if( _index >=0 && _index < PRODUCT.imgs.length ) sliderMobile.goTo(_index);
        }
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

var updateCartProd = function(pid, n, isAdd){ // n <= 0 : remove cart item
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
                else{
                    if(isAdd) arr[i].num += num;
                    else arr[i].num = num;
                };
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

            _html += '<div class="product-price"><span class="old-price">'+ formatMoney(item.price2) +'</span><span class="price">'+ formatMoney(item.price2) +'</span> x '+prods[j].num+'</div>';

            _html += '</div></li>';

            _totalProd += prods[j].num;
            _totalMoney += item.price*prods[j].num;
        }
    }

    $wrap.find(".minicart-content>ul").html( _html );
    $wrap.find(".minicart-bottom .product-price").html(formatMoney(_totalMoney));

    $wrap.find("h4").html("Giỏ hàng ("+ _totalProd +")");

    $wrap.find(".remove").on("click", function(e){
        updateCartProd($(this).attr("data-pid"), -1);
        renderMiniCart();
        e.preventDefault();
    });
};

var renderHomePage = function(_url){
    homeSlider();

    var filter = getQueryVariable("t", _url);

    sortProducts(filter);

    var _html = "";
    for( var i=0; i<PRODUCTS.length; i++ ){
        _html += renderItem(PRODUCTS[i]);
    }
    $(".grid-products").html( _html );
};

var renderProductPage = function(_url){
    sortProducts();
    var slug = getQueryVariable("p", _url);

    for( var i=0; i<PRODUCTS.length; i++ ){
        if( PRODUCTS[i].slug == slug ){
            PRODUCT = PRODUCTS[i];
            break;
        }
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
            _htmlsptt += renderItem(arrSP[i], "col-6 col-sm-6 col-md-3 col-lg-2 px-1 px-lg-2 item");
        }
    }
    $(".related-product>.row").html(_htmlsptt);

    // SẢN PHẨM KHÁC
    var _htmlspk = "";
    for( var i=6; i<arrSP.length; i++ ){
        if( i < 14 ) _htmlspk += renderItem2(arrSP[i]);
        else break;
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
                    _html += '<div class="d-lg-none">';
                        _html += '<div class="product-price"><span class="old-price">'+formatMoney(item.price2)+'</span><span class="price">'+formatMoney(item.price)+'</span></div>';
                        _html += '<div class="cart__qty float-left">';
                            _html += '<div class="qtyField">';
                                _html += '<a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>';
                                _html += '<input class="cart__qty-input qty" type="text" name="updates[]" id="qty-'+ j +'" value="'+ prods[j].num +'" pattern="[0-9]*" data-pid="'+ item.id +'">';
                                _html += '<a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>';
                            _html += '</div>';
                        _html += '</div>';
                        _html += '<a href="javascript:void(0);" class="btn btn--secondary cart__remove" title="Remove tem" data-pid="'+ item.id +'"><i class="icon icon anm anm-times-l"></i></a>';
                    _html += '</div>'
                _html += '</td>';
                _html += '<td class="cart__price-wrapper cart-flex-item text-center">';
                    _html += '<div class="product-price"><span class="old-price">'+formatMoney(item.price2)+'</span><span class="price">'+formatMoney(item.price)+'</span></div>';
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

    $wrap.find(".qtyBtn").on("click", function(e) {
        e.preventDefault();

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

    $wrap.find(".cart__remove").on("click", function(e){
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
        e.preventDefault();
    });

    $("#cartCheckout").off().on("click", function(e){
        e.preventDefault();
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
                var req = {
                    name: _name,
                    phone: _phone,
                    address: _address,
                    note: _note,
                    prods: prods,
                    payment: $(".cart_input-payment").val(),
                    created: firebase.firestore.FieldValue.serverTimestamp()
                };

                var ref = $.cookie("ref");
                if( ref ) req.ref = ref;

                db.collection("order").add(req).then(function(docRef) {
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
    $('#minicart-drawer').modal('hide');

    // auto complete off
    $("#page-content").find('input').each(function(){
        var $this = $(this);
        if( $this.attr("autocomplete") == "false" ){
            $this.val(" ");
            setTimeout(function(){
                $this.val("");
            }, 500);
        }
    });
};

var renderOrderPage = function(){
    if( !USERPHONE ){
        openUrl(BASEURL); return;
    }

    var myorders = [];

    var _htmlTabNav = "",
        _htmlTabContent = "";

    db.collection("order").where("phone", "==", USERPHONE).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
            myorders.push( doc.data() );
        });

        myorders.sort(function(a, b){
            return b.created.seconds - a.created.seconds;
        });

        for( var i=0; i<myorders.length; i++ ){
            var totalMoney = 0,
                _status = 0;

            if( myorders[i].status ){
                if( myorders[i].status == 10 ) _status = 2;
                else if( myorders[i].status >= 5 ) _status = 1;
            }

            _htmlTabNav += '<li><a class="nav-link'+ (i==0?" active":"") +'" data-toggle="tab" href="#tab-pane-'+ myorders[i].created.seconds +'">Đơn hàng '+ Math.floor(myorders[i].created.seconds/100) +'</a></li>';
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
            _htmlTabContent += '<p>'+ (!myorders[i].payment?'Thanh toán khi nhận hàng':'Thanh toán chuyển khoản Ngân hàng/MoMo') +'</p>';
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

var renderPubPage = function(type){
    if( !type ) type === 'today';

    var _now = new Date();

    // bắt đầu ngày hôm nay in sec
    var _now0 = Math.floor(_now.getTime()/1000) - _now.getHours()*60*60 - _now.getMinutes()*60 - _now.getSeconds();

    var _from = 0, _to = 0;

    switch(type){
        case 'yesterday':
            _to = _now0-1;
            _from = _now0-24*60*60;
            break;
        case 'thisweek':
            _from = _now0 - (_now.getDay()-1)*24*60*60;
            _to = _from+7*24*60*60-1; 
            break;
        case 'lastweek':
            _from = _now0 - (_now.getDay()-1)*24*60*60 - 7*24*60*60;
            _to = _from+7*24*60*60-1; 
            break;
        case 'thismonth':
            var thang = _now.getMonth();
            var num = 31;

            if( thang == 1 ) num = 29;
            else if( [3,5,8,10].indexOf(thang) != -1 ){
                num = 30;
            }

            _from = _now0 - (_now.getDate()-1)*24*60*60;
            _to = _from + num*24*60*60 - 1;
            break;
        case 'lastmonth':
            var thang = _now.getMonth() - 1; // 0-11
            if( thang<0 ) thang = 11;

            var num = 31;

            if( thang == 1 ) num = 29;
            else if( [3,5,8,10].indexOf(thang) != -1 ){
                num = 30;
            }

            _to = _now0 - (_now.getDate()-1)*24*60*60 -1;
            _from = _to - num*24*60*60+1;
            break;
        default:
            type = 'today';
            _from = _now0;
            _to = _now0+24*60*60 - 1;
            break;
    }

    var $page = $("#page-content");

    var dateFrom = new Date(_from*1000),
        dateTo = new Date(_to*1000);

    $page.find(".pub-fromto").html( dateFrom.getDate()+'/'+ (dateFrom.getMonth()+1)+'/'+ dateFrom.getFullYear() +' - '+ dateTo.getDate()+'/'+ (dateTo.getMonth()+1)+'/'+ dateTo.getFullYear() );

    $page.find(".btn-pubdata").off().on("click", function(e){
        var _type = $(this).attr("data-type");
        renderPubPage(_type);
        e.preventDefault();
    });

    $page.find(".btn-pubdata").each(function(){
        if( type == $(this).attr("data-type") ) $(this).addClass("active");
        else $(this).removeClass("active");
    });

    //
    var res = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for( var i = PUBLISHER.length-1; i>=0; i-- ){
        var item = PUBLISHER[i];
        if( item.created.seconds>=_from && item.created.seconds<=_to ){
            var type = item.type || 0;
            res[type] += 1;
        }
    }

    $page.find(".sub-text").each(function(){
        var type = parseInt($(this).attr("data-type"));
        $(this).html('<span>'+ res[type] +'</span>');
    });

    console.log("PUBLISHER", PUBLISHER);
};

var openUrl = function(_url, notsave){
    
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
    }else if(_url.indexOf("/pub") !== -1){
        pname = "pub";
        if( !USER.uid ){
            openUrl(BASEURL);
            return;
        }
    }else{ // home
        pname = "home";
    }



    if( pname ){
        $("#page-content").addClass("invisible");
        if( !TEMPLATE[pname] ){
            $.get(BASEURL+"/template/"+ pname +".html?t="+Date.now(), function(data){
                TEMPLATE[pname] = data;
                openUrl(_url);
            });
        }else{
            PAGENAME = pname;
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
                case "pub":
                    PUBLISHER = [];
                    var tt = 0;
                    db.collection("pub-click").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            PUBLISHER.push(doc.data());
                            tt++;
                            if( tt === 2 ) renderPubPage();
                        });
                    }).catch(function(error) {
                        console.log("Error get click");
                    });

                    db.collection("publisher").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            PUBLISHER.push(doc.data());
                            tt++;
                            if( tt === 2 ) renderPubPage();
                        });
                    }).catch(function(error) {
                        console.log("Error getting publisher");
                    });
                    break;
            }

            setTimeout(function(){
                $("#page-content").removeClass("invisible");
                if( !notsave ) window.history.pushState("object or string", "", _url);
            }, 100);

            $('html, body').animate({
                scrollTop: 0
            }, 200);
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

var APP_STARTED = false;

firebase.auth().onAuthStateChanged(function(_user) {

    if (_user) {
        // User is signed in.
        var displayName = _user.displayName;
        var email = _user.email;
        var emailVerified = _user.emailVerified;
        var photoURL = _user.photoURL;
        var isAnonymous = _user.isAnonymous;
        var uid = _user.uid;
        var providerData = _user.providerData;

        USER.displayName = displayName;
        USER.email = email;
        USER.emailVerified = emailVerified;
        USER.photoURL = photoURL;
        USER.isAnonymous = isAnonymous;
        USER.uid = uid;
        USER.providerData = providerData;
        console.log("login", USER);
        // ...

        $(".not-login").hide();
        $(".has-login").show();

        jQuery("body").children(".mhpopup").addClass("hide");

        $("#popup-login").find(".customerPassword").val("");
    } else {
        // User is signed out.
        USER = {};
        console.log("logout");
        $(".not-login").show();
        $(".has-login").hide();

        if( PAGENAME == "pub" ) openUrl(BASEURL);
    }

    // APP START 
    (function(){
        if( APP_STARTED ) return;
        APP_STARTED = true;
        console.log("app start");

        var $body = jQuery("body");
        //
        checkPublisher();
        //
        db.collection("product").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var prod = doc.data();
                if( !prod.draft ){ // bản nháp bỏ qua
                    if( !prod.liked ){
                        prod.liked = Math.floor(Math.random() * 850) + 102;
                        console.log("not like", prod);
                    }
                    PRODUCTS.push( prod );
                }
            });
            $('#page-content').removeClass('invisible');
            openUrl(window.location.href);
        }).catch(function(error) {
            console.log("Error getting products: ", error);
        });

        $('#minicart-drawer').on('shown.bs.modal', function () {
            renderMiniCart();
        });

        $("body").on("click", ".openlink", function(e){
            var _url = $(this).attr("href");
            openUrl(_url);
            e.preventDefault();
        });

        var arr = getMyCart(),
            _total = 0;
        for( var i=0; i<arr.length; i++ ){
            _total += arr[i].num;
        }
        $(".site-cart-count").html( _total );

        // mhpopup
        $(".mhpopup").find(".mhpopup-close").off().on("click", function(e){
            $(this).closest(".mhpopup").addClass("hide");
            e.preventDefault();
        });

        //popup-login
        (function(){
            var $popup = $("#popup-login");
            $popup.find(".btn-sendLogin").off().on("click", function(e){
                var _mail = $popup.find(".customerEmail").val(),
                    _pass = $popup.find(".customerPassword").val();

                if( !_mail || !_pass ){
                    $popup.find(".alert-danger").html("Chưa nhập đủ thông tin").show().delay(4000).fadeOut();
                }else{
                    firebase.auth().signInWithEmailAndPassword(_mail, _pass).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                        console.log(errorCode, errorMessage, error);
                        var mes = "Email hoặc mật khẩu không đúng";
                        // if( errorCode === "auth/invalid-email" ){
                        //     mes = "Email sai định dạng";
                        // }if (errorCode === 'auth/wrong-password') {
                        //     mes = "Mật khẩu sai";
                        // }if (errorCode === 'auth/wrong-password') {
                        //     mes = "Mật khẩu sai";
                        // }else {
                        //     mes = errorCode;
                        // }
                        if( errorCode == "auth/user-disabled" ) mes = "Tài khoản này bị khóa do vi phạm điều khoản";

                        $popup.find(".alert-danger").html(mes).show().delay(4000).fadeOut();

                    });
                }
                e.preventDefault();
            });

            $popup.find(".btn-quenmk").off().on("click", function(e){
                $popup.find(".alert-danger").html("Để lấy lại mật khẩu vui lòng liên hệ quả trị viên.").show().delay(4000).fadeOut();
                e.preventDefault();
            });
        })();

        (function(){
            var $popup = $("#popup-signup");
            $popup.find(".btn-sendSignup").off().on("click", function(e){
                var _mail = $popup.find(".customerEmail").val(),
                    _pass = $popup.find(".customerPassword").val(),
                    _repass = $popup.find(".customerRePassword").val();

                if( !_mail || !_pass || !_repass ){
                    $popup.find(".alert-danger").html("Chưa nhập đủ thông tin").show().delay(4000).fadeOut();
                }else if(_pass != _repass){
                    $popup.find(".alert-danger").html("Nhập lại mật khẩu không khớp").show().delay(4000).fadeOut();
                }else{
                    firebase.auth().createUserWithEmailAndPassword(_mail, _pass).catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var mes = "";
                        if (errorCode == 'auth/weak-password') {
                            mes = 'Mật khẩu quá yếu';
                        } else if(errorCode == "auth/email-already-in-use"){
                            mes = "Email này đã đăng ký tài khoản";
                        } else if(errorCode == "auth/invalid-email"){
                            mes = "Email không hợp lệ";
                        } else {
                            mes = errorMessage;
                        }
                        // console.log(error);
                        $popup.find(".alert-danger").html(mes).show().delay(4000).fadeOut();
                    });
                }
                e.preventDefault();
            });
        })();

        $body.on("click", ".btn-login", function(e){
            e.preventDefault();
            $body.children(".mhpopup").addClass("hide");
            $("#popup-login").removeClass("hide");
        });

        $body.on("click", ".btn-signup", function(e){
            e.preventDefault();
            $body.children(".mhpopup").addClass("hide");
            $("#popup-signup").removeClass("hide");
        });

        $body.on("click",".btn-logout", function(e){
            e.preventDefault();
            firebase.auth().signOut();
        });

        $(".btn-openOrder").off().on("click", function(e){
            e.preventDefault();
            $(".search-drawer").addClass("search-drawer-open");
            toggleMenuMobile(false);
        });

        $(".btn-viewMyOrder").on("click", function(e){
            var _sdt = $(this).siblings(".input-text").val();
            if( _sdt ){
                USERPHONE = _sdt.replace(/\s/g,'');
                openUrl( getFullUrl("order") );
                $(".search-drawer").removeClass("search-drawer-open");
            }
            e.preventDefault();
        });

    })();
});   

window.addEventListener("popstate", function(e) {
    openUrl(location.href, true);
});

function homeSlider(){
    var $items = $(".home-slider").children(".item");
    var $dots = $('<div class="dots"><span class="active"></span><span></span><span></span></div>');
    var cr = 0;

    var timeAuto = 8000;

    $dots.appendTo('.home-slider');

    var loop = setInterval(function(){
        if( PAGENAME !== "home" ){
            clearInterval(loop);
        }else{
            cr++;
            if( cr >= $items.length ) cr = 0;
            $items.removeClass("active").eq(cr).addClass("active");
            $dots.children().removeClass("active").eq(cr).addClass("active");
        }
    }, timeAuto);

    $dots.children().on("click", function(e){
        e.preventDefault();

        cr = $(this).index();
        $items.removeClass("active").eq(cr).addClass("active");
        $dots.children().removeClass("active").eq(cr).addClass("active");

        clearInterval(loop);

        loop = setInterval(function(){
            if( PAGENAME !== "home" ){
                clearInterval(loop);
            }else{
                cr++;
                if( cr >= $items.length ) cr = 0;
                $items.removeClass("active").eq(cr).addClass("active");
                $dots.children().removeClass("active").eq(cr).addClass("active");
            }
        }, timeAuto);
    });
}