!function(e){var t="http://nheheu.com/",a=[],i=[],n=null,s={},r="",o=[],c="",l={},d=[],p=["Thanh toán khi nhận hàng","Thanh toán chuyển khoản Ngân hàng/MoMo"],h={0:"Mới, chưa gọi xác nhận",1:"Đang giao, đã đưa cho bên vận chuyển",2:"Hoàn thành, đã nhận hàng",3:"Chờ chuyển khoản, đã gọi xác nhận",4:"Đang gói hàng, đã gọi xác nhận",5:"Hủy đơn, sai sđt/không nhận hàng"},f=function(e,t){var a=(e+"").replace(/\B(?=(\d{3})+(?!\d))/g,".");return t||(a+=" ₫"),a},u=function(e,t){t||(t="%d/%m %h:%i:%s");var a=new Date(1e3*e);return t.replace(new RegExp("\\%\\w","g"),function(e){var t="";return-1!=e.indexOf("d")?t=a.getDate()<10?"0"+a.getDate():a.getDate():-1!=e.indexOf("m")?t=a.getMonth()<9?"0"+(a.getMonth()+1):a.getMonth()+1:-1!=e.indexOf("y")?t=a.getFullYear():-1!=e.indexOf("h")?t=a.getHours()<10?"0"+a.getHours():a.getHours():-1!=e.indexOf("i")?t=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes():-1!=e.indexOf("s")&&(t=a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds()),t})},m=function(e,t){var a=window.location.search.substring(1);if(t){var i=t.split("?");2==i.length&&(a=i[1])}for(var n=a.split("&"),s=0;s<n.length;s++){var r=n[s].split("=");if(r[0]==e)return r[1]}return!1},v=function(e){return t+e},g=function(e){if(-1==e.indexOf("daohoa.github.io")){var t=e.split("/");return"https://daohoa.github.io/nheheu/imgs/"+t[t.length-1]}return e},b=function(e){e||(e="random"),a.sort(function(t,a){var i,n;switch(e){case"hot":i=t.liked||0,n=a.liked||0;break;case"sale":i=t.price/t.price2,n=a.price/a.price2;break;default:i=.5,n=Math.random()}return i<n?1:i>n?-1:void 0});for(var t=a.length-1;t>=0;t--)if(a[t].soldout){var i=a[t];a.splice(t,1),a.push(i)}},w=function(e,t){var a="",i=e.price,n=e.price2;return t||(t="col-6 col-sm-6 col-md-4 col-lg-3 item px-1 px-lg-2 mb-2 mb-lg-3"),a+='<div class="'+t+'" style="display: block;">',a+='<a href="'+v("product/?p="+e.slug)+'" class="item-inner openlink bg-w">',a+='<div class="product-image">',a+='<img data-src="'+g(e.imgs[0])+'" class="lazyload" alt="'+e.name+'">',e.liked&&(a+='<div class="product-liked liked tooltip bs-tooltip-top" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"><i class="icon anm anm-heart"></i> '+e.liked+"</div></div>"),e.soldout&&(a+='<span class="sold-out"><img src="http://nheheu.com/assets/images/soldout2.png" ></span>'),a+="</div>",a+='<div class="product-details text-center">',a+='<div class="product-name">'+e.name+"</div>",a+='<div class="product-price">',a+='<span class="old-price">'+f(n)+"</span>",a+='<span class="price">'+f(i)+"</span>",a+="</div>",a+='<div class="product-review">'+k(e.review)+"</div>",a+="</div>",a+="</a>",a+="</div>"},y=function(e){var t="",a=e.price;e.price2;return t+='<div class="grid__item"><div class="mini-list-item"><div class="mini-view_image">',t+='<a class="grid-view-item__link openlink" href="'+v("product/?p="+e.slug)+'">',t+='<img class="grid-view-item__image ls-is-cached lazyload" data-src="'+g(e.imgs[0])+'" alt="'+e.name+'">',t+='</a></div><div class="details">',t+='<a class="grid-view-item__title openlink" href="'+v("product/?p="+e.slug)+'">'+e.name+"</a>",t+='<div class="grid-view-item__meta"><span class="product-price__price"><span class="money">'+f(a)+"</span></span></div>",t+='<div class="product-review">',t+=k(e.review),t+="</div></div></div></div>"},k=function(e){var t="",a=0;if(e&&"number"==typeof e)a=e;else if(e&&"object"==typeof e){for(var i=0,n=0;n<e.length;n++)i+=e[n].vote;a=Math.round(10*i/e.length)/10}for(n=1;n<=a;n++)t+='<i class="font-13 fa fa-star"></i>';a%1!=0&&(t+='<i class="font-13 fa fa-star-half-o"></i>');for(n=Math.ceil(a)+1;n<=5;n++)t+='<i class="font-13 fa fa-star-o"></i>';return t},_=function(){var t=[],i=e.cookie("mycart");if(i){t=JSON.parse(i);for(var n=0;n<t.length;n++)t[n].num=parseInt(t[n].num)}var s=t.length;if(a.length)for(n=t.length-1;n>=0;n--){-1==x(t[n].pid).id&&t[n].splice(n,1)}return s!=t.length&&e.cookie("mycart",JSON.stringify(t),{expires:7,path:"/"}),t},x=function(e){var t=e,i="",n=0,s=0,r="",o="",c="",l="";-1!=t.indexOf("-")&&(i=t.split("-")[1],t=t.split("-")[0]);for(var d=0;d<a.length;d++){if(t==a[d].id){l=a[d].name,c=a[d].slug,r=a[d].imgs[0],n=a[d].price,s=a[d].price2,a[d].prices&&(i?a[d].prices.forEach(function(e){e.id==i&&(n=e.price||a[d].price,s=e.price2||a[d].price2,r=e.img,o=e.name)}):t==a[d].id&&(o="Ngẫu nhiên",n=a[d].prices[0].price||a[d].price,s=a[d].prices[0].price2||a[d].price2));break}d===a.length-1&&(e=-1)}var p={id:e,name:l,slug:c,img:r,price:n,price2:s};return o&&(p.type=o),p},C=function(t,a,i){if("EMPTY"===t)return e.cookie("mycart",JSON.stringify([]),{expires:-7,path:"/"}),void e(".site-cart-count").html(0);var n=parseInt(a),s=_();if(s.length)for(var r=s.length-1;r>=0;r--){if(s[r].pid==t){n<=0?s.splice(r,1):i?s[r].num+=n:s[r].num=n;break}0==r&&a>0&&s.push({pid:t,num:n})}else a>0&&(s=[{pid:t,num:n}]);e.cookie("mycart",JSON.stringify(s),{expires:7,path:"/"});var o=0;for(r=0;r<s.length;r++)o+=s[r].num;e(".site-cart-count").html(o)},T=function(t,a,i){if(e("body").children(".shop-message").remove(),t){a||(a="warning");var n=e('<div class="shop-message'+(i=i?" "+i:"")+'"><div class="alert alert-'+a+' text-center animated fadeInDown" role="alert">'+t+"</div></div>").appendTo("body").delay(4e3).animate({top:-100},function(){n.remove()})}},D=function(i){b();for(var s=m("p",i),r=0;r<a.length;r++)if(a[r].slug==s){n=a[r];break}if(!n)return console.log("Product not found"),void(window.location.href=t);document.title=n.name+" - Nhẹ Hều",function(a){var i=e(".product-single");i.find(".product-single__title").html(a.name),i.find(".variant-sku").html(a.id),i.find(".spr-badge-caption").html((a.review?a.review.length:0)+" đánh giá"),i.find(".prInfoRow .reviewLink").prepend(k(a.review)),a.soldout&&(i.find(".instock").addClass("hide"),i.find(".outstock").removeClass("hide"),i.find(".btn-buyNow").html("Hết hàng")),-1!=o.indexOf(a.id)?(i.find(".btn-likeThisProduct >.icon").removeClass("anm-heart-r").addClass("anm-heart"),i.find(".product-liked").addClass("liked")):(i.find(".product-liked").removeClass("liked"),i.find(".btn-likeThisProduct >.icon").addClass("anm-heart-r").removeClass("anm-heart")),a.liked&&i.find(".product-liked .num").html(a.liked);var s=a.price,r=a.price2,c=function(e,t){i.find(".product-price__price-product-template>.money").html(f(e)),i.find(".comparePrice-product-template>.money").html(f(t)),i.find(".off>span").html(Math.round(100*(t-e)/t))};if(n.prices){for(var l="",d=0;d<n.prices.length;d++){var p=n.prices[d];l+='<div data-value="'+p.name+'" class="swatch-element'+(p.soldout?" soldout":"")+'" data-image="'+g(p.img)+'" data-index="'+d+'">',l+='<input class="swatchInput" id="swatch-0-'+n.id+"-"+p.id+'" type="radio" name="option--type" value="'+n.id+"-"+p.id+'"'+(p.soldout?" disabled":"")+">",l+='<label class="swatchLbl color medium" for="swatch-0-'+n.id+"-"+p.id+'" style="background-image:url('+g(p.img)+');"></label>',l+='<span class="tooltip-label">'+p.name+"</span>",l+="</div>"}var h=e(l);i.find(".product-form__item--type").append(h),h.find("input").on("change",function(){var t=e(this).parent(),a=t.attr("data-value"),s=t.attr("data-image"),r=i.find(".product-form-product-template");if(!r.hasClass("onselect")){var o=r.offset().top-e(window).scrollTop()-88-15;r.css("top",o),setTimeout(function(){r.addClass("onselect"),setTimeout(function(){if(o+r.innerHeight()>e(window).height()){var t=e(window).height()-r.innerHeight();r.css("top",t),e("html, body").animate({scrollTop:"+="+Math.abs(t-o)},300)}else o<60&&(r.css("top",60),e("html, body").animate({scrollTop:"-="+Math.abs(o-60)},300))},1e3)},50)}r.find(".product-selected-image").attr("src",s),r.find(".slVariant").html(a),i.find(".zoompro").attr("src",s),i.find(".product-thumb-style1 a").removeClass("active");var l=t.attr("data-index");if(l&&(l=parseInt(l))>=0&&l<n.prices.length){var d=n.prices[l].price||n.price,p=n.prices[l].price2||n.price2;c(d,p)}}),i.find(".cover-product-form-product-template").on("scroll mousewheel touchmove",function(e){return e.preventDefault(),e.stopPropagation(),!1})}else i.find(".product-form__item--type").remove();c(s,r);var u=a.imgs,m="",b=[];for(d=0;d<u.length;d++){m+='<a data-image="'+g(u[d])+'" aria-hidden="true" tabindex="-1"><img src="'+g(u[d])+'"/></a>';var w={src:u[d],w:600,h:600};if(n.prices)for(var y=0;y<n.prices.length;y++)if(u[d]==n.prices[y].img){w.title=n.prices[y].name;break}b.push(w)}i.find(".zoompro").attr("src",u[0]),i.find(".product-thumb-style1").html(m),product_thumb1(),i.find(".popup-video").hide(),i.find(".btn-addToCartMain").off().on("click",function(t){if(t.preventDefault(),!n.soldout){var a="",s=e('<span class="effect-addtocart"></span>');if(n.prices){var r=i.find(".swatchInput:checked");if(!(a=r.val())){setTimeout(function(){T("Hãy chọn 1 loại hàng","warning")},1e3);var o=i.find(".product-form-product-template");if(!o.hasClass("onselect")){var c=o.offset().top-e(window).scrollTop()-88-15;o.css("top",c),setTimeout(function(){o.addClass("onselect"),setTimeout(function(){if(c+o.innerHeight()>e(window).height()){var t=e(window).height()-o.innerHeight();o.css("top",t),e("html, body").animate({scrollTop:"+="+Math.abs(t-c)},300)}else c<60&&(o.css("top",60),e("html, body").animate({scrollTop:"-="+Math.abs(c-60)},300))},1e3)},50)}return}}else a=n.id;var l=i.find(".product-form__input.qty").offset(),d=e(".site-header__cart > .site-cart-count").offset(),p=i.find(".product-form__input.qty").val();s.html(p).css({top:l.top-4,left:l.left-10}).appendTo("body"),s.delay(100).animate({top:d.top,left:d.left},"slow",function(){i.find(".product-form-product-template").removeClass("onselect"),s.remove(),C(a,p,!0),setTimeout(function(){T("Thêm vào giỏ thành công","success")},800)}),setTimeout(function(){s.addClass("onmoving")},150)}}),i.find(".btn-buyNow").off().on("click",function(t){if(t.preventDefault(),!n.soldout){var a="";if(n.prices){if(!(a=i.find(".swatchInput:checked").val())){setTimeout(function(){T("Hãy chọn 1 loại hàng","warning")},1e3);var s=i.find(".product-form-product-template");if(!s.hasClass("onselect")){var r=s.offset().top-e(window).scrollTop()-88-15;s.css("top",r),setTimeout(function(){s.addClass("onselect"),setTimeout(function(){if(r+s.innerHeight()>e(window).height()){var t=e(window).height()-s.innerHeight();s.css("top",t),e("html, body").animate({scrollTop:"+="+Math.abs(t-r)},300)}else r<60&&(s.css("top",60),e("html, body").animate({scrollTop:"-="+Math.abs(r-60)},300))},1e3)},50)}return}}else a=n.id;C(a,i.find(".product-form__input.qty").val()),setTimeout(function(){M(v("cart"))},100)}}),i.find(".cover-product-form-product-template, .btn-close-product-selected-wrap").off().on("click",function(e){e.preventDefault(),i.find(".product-form-product-template").removeClass("onselect")}),i.find(".btn-likeThisProduct").off().on("click",function(e){e.preventDefault();var t=o.indexOf(a.id);-1!=t?(a.liked-=1,o.splice(t,1),i.find(".btn-likeThisProduct>.icon").addClass("anm-heart-r").removeClass("anm-heart"),i.find(".product-liked").removeClass("liked")):(a.liked+=1,o.push(a.id),i.find(".btn-likeThisProduct>.icon").removeClass("anm-heart-r").addClass("anm-heart"),i.find(".product-liked").addClass("liked")),i.find(".product-liked .num").html(a.liked)}),i.find(".btn-copy").attr("data-text",v("product/?p="+n.slug)),i.find(".prlightbox").on("click",function(t){t.preventDefault();var a=e(this).children().attr("src"),i=n.imgs.indexOf(a);-1==i&&(i=0);var s={index:i,bgOpacity:.9,history:!1};new PhotoSwipe(e(".pswp.slide-fullpage")[0],PhotoSwipeUI_Default,b,s).init()});var _=new PhotoSwipe(e(".pswp.slide-mobile")[0],PhotoSwipeUI_Default2,b,{index:0,bgOpacity:0,history:!1,focus:!1,modal:!1,closeOnScroll:!1,pinchToClose:!1,closeOnVerticalDrag:!1,escKey:!1});_.init(),_.listen("afterChange",function(){var t=_.currItem.src;i.find(".product-thumb-style1 a").each(function(){var a=e(this);a.attr("data-image")==t?a.addClass("active"):a.removeClass("active")})}),_.listen("preventDragEvent",function(e,t,a){a.prevent=!("ontouchstart"in document.documentElement)}),i.find(".product-thumb-style1").on("click mouseenter","a",function(t){t.preventDefault();var a=e(this).attr("data-image");if(a){i.find(".zoompro").attr("src",a);var s=n.imgs.indexOf(a);s>=0&&s<n.imgs.length&&_.goTo(s)}});var x='<a href="'+t+'" class="openlink" title="Trở về trang chủ">Shop</a><i class="fa fa-caret-right"></i><span> '+n.name+"</span>";e(".breadcrumbs").html(x);var D=a.detail?a.detail:"<h3>Nội dung đang được cập nhật</h3>";e(".description-inner").html(D);var O=[0x5af43a8a3d2c,0x5af466f294fd,0x5af4b1a43c69,0x5af538a5eac2,0x5af5a71f6f66,0x5af5c9c76894,0x5af5d049bcd2,0x5af5d7a50525,0x5af5eb36c22d,0x5af690b2f85c,0x5af6a6319800,0x5af6b20f7b4c,0x5af6f3c484f1,0x5af701ab0619,0x5af765bca3f5,0x5af7ee60ebf7,0x5af970825061,0x5af9f6698602,0x5afb856b79c2,0x5afbf2fdf86f,0x5afc0c721176,0x5afc10970454,0x5afcd0ae7abd,0x5afe9298a6c9,0x5afea5d3c280,0x5aff2d6835cf,0x5aff74de59db,"100024356736945","100030506206917","100041129792066","100010455919612","100004213142802","100054349191821","100014209244658","100014794145995","100041929506129","100010582727745","100051513442819","100050411920341","100049947427823","100003792418362","100013889040983","100009739625625","100025678697656","100007359736117","100013215076733","100042089654474","100029933432192","100026841510255","100007470310791","100006060404733","100015243815541","100043542337305","100027799839218","100009264069750","100007924681710","100005955634953","100054527936898","100054222011923","100044943874082","100041879354045","100041654270038","100039973741733","100039159664381","100035429615348","100030437588572","100029647820128","100023908908556","100022926943900","100022773858722","100019055294957","100016990690477","100016763145077","100016626041093","100014961935348","100014797564671","100014621622661","100014258468374","100012357248145","100011679842135","100011558225636","100011117342566","100010743945622","100010711920565","100010648380631","100010409708485","100010283746657","100010272246035","100010067499081","100009767556708","100009509466760","100009327881437","100009189392028","100008667127564","100008412690930","100008288299718","100008193705703","100007983783201","100007943115574","100007899852671","100007800930644","100006617371881","100006414434431","100006322903290","100006303931252","100006008880565","100005651713227","100005082999488","100004937074652","100004652641702","100004595593974","100004570982788","100004497438699","100004488665289","100004310834088","100004279601180","100004257757880","100004236968622","100004080967256","100004056091279","100003980217205","100003857893962","100003723669823","100003636221413","100000267943600"],S="";if(a.review)for(d=0;d<a.review.length;d++)S+='<div class="spr-review"><img src="https://daohoa.github.io/nheheu/ava/'+O[Math.floor(Math.random()*O.length)]+'.jpg" class="avatar"><div class="spr-review-header"> <div class="spr-review-wrap"><h3 class="spr-review-header-title">'+a.review[d].name+'</h3><span class="spr-review-header-certify"><i class="anm anm-shield-check" aria-hidden="true"></i> Chứng nhận đã mua hàng</span></div> <span class="product-review spr-starratings spr-review-header-starratings"><span class="reviewLink">'+k(a.review[d].vote)+"</span></span>",S+='</div><div class="spr-review-content">',S+='<p class="spr-review-content-body">'+a.review[d].content+"</p>",a.review[d].img&&(S+='<img class="spr-review-content-img lazyloaded" src="'+a.review[d].img+'">'),S+="</div>",a.review[d].reply&&(S+='<div class="spr-review-reply"><h3 class="spr-review-header-title">Nhẹ Hều <span class="badge badge-info">Care</span></h3><p class="spr-review-content-body">'+a.review[d].reply+"</p></div>"),S+="</div>";else S="<h3>Chưa có nhận xét nào</h3>";if(e(".spr-reviews .review-inner").html(S),a.review&&a.review.length){var q=0;for(d=0;d<a.review.length;d++)q+=a.review[d].vote;var E=Math.round(10*q/a.review.length)/10;e(".spr-reviews .section-header-score .score").html(E),e(".spr-reviews .section-header .count").html(a.review.length)}else e(".spr-reviews .section-header-score").remove();var H="";if(a.asks){for(d=0;d<a.asks.length;d++)H+='<div class="spr-review"><div class="spr-review-header">',H+='<div class="spr-review-header-avt">'+a.asks[d].name[0]+"</div>",H+='<h3 class="spr-review-header-title">'+a.asks[d].name+"</h3>",H+='</div><div class="spr-review-content">',H+='<p class="spr-review-content-body">'+a.asks[d].content+"</p>",H+="</div>",a.asks[d].reply&&(H+='<div class="spr-review-reply"><h3 class="spr-review-header-title">Nhẹ Hều <span class="badge badge-info">Care</span></h3><p class="spr-review-content-body">'+a.asks[d].reply+"</p></div>"),H+="</div>";e(".spr-questions .review-inner").html(H)}else e(".spr-questions").remove()}(n),qnt_incre();var c=function(t){var a=[],i=e.cookie("productseen");if(i&&(a=JSON.parse(i)),t){var n=a.indexOf(t);-1!=n&&a.splice(n,1),a.push(t),e.cookie("productseen",JSON.stringify(a),{expires:7,path:"/"})}return a}(n.id);c.length>1&&c.splice(c.length-1,1),c.length>4&&(c=c.slice(c.length-4));var l="";for(r=c.length-1;r>=0;r--)for(var d=0;d<a.length;d++)c[r]==a[d].id&&(l+=y(a[d]));e(".list-seen-products>.grid").html(l);var p=[];for(r=0;r<a.length;r++)a[r].id!=n.id&&-1==c.indexOf(a[r].id)&&p.push(a[r]);var h="";for(r=0;r<p.length;r++)r<6&&(h+=w(p[r],"col-6 col-sm-6 col-md-3 col-lg-2 px-1 px-lg-2 item"));e(".related-product>.row").html(h);var u="";for(r=6;r<p.length&&r<14;r++)u+=y(p[r]);e(".list-other-products>.grid").html(u)},O=function(t){document.title="Thống Kê Tiếp Thị Liên Kết - Nhẹ Hều";var a=new Date,i=Math.floor(a.getTime()/1e3)-60*a.getHours()*60-60*a.getMinutes()-a.getSeconds(),n=0,s=0;switch(t){case"yesterday":s=i-1,n=i-86400;break;case"thisweek":s=(n=i-24*(a.getDay()-1)*60*60)+604800-1;break;case"lastweek":s=(n=i-24*(a.getDay()-1)*60*60-604800)+604800-1;break;case"thismonth":var r=31;1==(o=a.getMonth())?r=29:-1!=[3,5,8,10].indexOf(o)&&(r=30),s=(n=i-24*(a.getDate()-1)*60*60)+24*r*60*60-1;break;case"lastmonth":var o;(o=a.getMonth()-1)<0&&(o=11);r=31;1==o?r=29:-1!=[3,5,8,10].indexOf(o)&&(r=30),n=(s=i-24*(a.getDate()-1)*60*60-1)-24*r*60*60+1;break;default:t="today",n=i,s=i+86400-1}var c=e("#page-content"),l=new Date(1e3*n),p=new Date(1e3*s);c.find(".pub-fromto").html(l.getDate()+"/"+(l.getMonth()+1)+"/"+l.getFullYear()+" - "+p.getDate()+"/"+(p.getMonth()+1)+"/"+p.getFullYear()),c.find(".btn-pubdata").off().on("click",function(t){var a=e(this).attr("data-type");O(a),t.preventDefault()}),c.find(".btn-pubdata").each(function(){t==e(this).attr("data-type")?e(this).addClass("active"):e(this).removeClass("active")});for(var h=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],f=d.length-1;f>=0;f--){var u=d[f];if(u.created.seconds>=n&&u.created.seconds<=s){t=u.type||0;h[t]+=1}}c.find(".sub-text").each(function(){var t=parseInt(e(this).attr("data-type"));e(this).html("<span>"+h[t]+"</span>")}),console.log("PUBLISHER",d)},M=function(n,o){var y="";if(-1!==n.indexOf("/quan-ly/order.html"))y="admin-order";else if(-1!==n.indexOf("/quan-ly"))y="admin-orders";else if(-1!==n.indexOf("/huong-dan-mua-hang"))y="huong-dan";else if(-1!==n.indexOf("/bao-hanh"))y="baohanh";else if(-1!==n.indexOf("/product/?p="))y="product";else if(-1!==n.indexOf("/cart"))y="cart";else if(-1!==n.indexOf("/order"))y="order";else if(-1!==n.indexOf("/payments"))y="payments";else if(-1!==n.indexOf("/pub")){if(y="pub",!l.uid)return void M(t)}else y="home";-1==y.indexOf("admin")||-1!=q.indexOf(l.email)?y&&(s[y]?(r=y,e("#page-content").addClass("onopenUrl"),setTimeout(function(){switch(e("#page-content").html(s[y]),e(window).scrollTop()>35&&e("html, body").scrollTop(35),e("html, body").animate({scrollTop:0},300),e("body").removeClass(function(e,t){return(t.match(/(^|\s)page-\S+/g)||[]).join(" ")}).addClass("page-"+y),y){case"home":!function(t){document.title="Phụ Kiện Trang Trí, Quà Tặng - Nhẹ Hều";var i=m("t",t);b(i);for(var n="",s=0;s<a.length;s++)n+=w(a[s]);e(".grid-products").html(n)}(n),n=t;break;case"product":D(n);break;case"cart":!function(){document.title="Giỏ Hàng - Nhẹ Hều";var t=e(".cart__list"),a=_(),i="",n=0;if(a.length)for(var s=a.length-1;s>=0;s--){var r=x(a[s].pid);n+=a[s].num*r.price,i+='<tr class="cart__row border-bottom line1 cart-flex">',i+='<td class="cart__image-wrapper cart-flex-item">',i+='<a href="'+v("product/?p="+r.slug)+'" class="openlink"><img class="cart__image" src="'+g(r.img)+'" alt="'+r.name+'"></a>',i+="</td>",i+='<td class="cart__meta small--text-left cart-flex-item">',i+='<div class="list-view-item__title">',i+='<a href="'+v("product/?p="+r.slug)+'" class="openlink">'+r.name+"</a>",i+="</div>",i+='<div class="cart__meta-text">',i+=(r.type||"")+"<br>",i+="</div>",i+='<div class="d-md-none">',i+='<div class="product-price"><span class="old-price">'+f(r.price2)+'</span><span class="price">'+f(r.price)+"</span></div>",i+='<div class="cart__qty float-left">',i+='<div class="qtyField">',i+='<a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>',i+='<input class="cart__qty-input qty" type="text" name="updates[]" value="'+a[s].num+'" pattern="[0-9]*" data-pid="'+r.id+'">',i+='<a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>',i+="</div>",i+="</div>",i+='<a href="javascript:void(0);" class="btn btn--secondary cart__remove" title="Remove tem" data-pid="'+r.id+'"><i class="icon icon anm anm-times-l"></i></a>',i+="</div>",i+="</td>",i+='<td class="cart__price-wrapper cart-flex-item text-center">',i+='<div class="product-price"><span class="old-price">'+f(r.price2)+'</span><span class="price">'+f(r.price)+"</span></div>",i+="</td>",i+='<td class="cart__update-wrapper cart-flex-item text-center">',i+='<div class="cart__qty text-center">',i+='<div class="qtyField">',i+='<a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>',i+='<input class="cart__qty-input qty" type="text" name="updates[]" value="'+a[s].num+'" pattern="[0-9]*" data-pid="'+r.id+'">',i+='<a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>',i+="</div>",i+="</div>",i+="</td>",i+='<td class="small--hide cart-price text-center">',i+='<div><span class="money">'+f(a[s].num*r.price)+"</span></div>",i+="</td>",i+='<td class="text-center small--hide"><a href="javascript:void(0);" class="btn btn--secondary cart__remove" title="Remove tem" data-pid="'+r.id+'"><i class="icon icon anm anm-times-l"></i></a></td>',i+="</tr>"}else i="<tr><td><h3>không có sản phẩm nào trong giỏ</h3></td></tr>";t.html(i),e(".totalMoney").html(f(n)),t.find(".qtyBtn").on("click",function(t){t.preventDefault();var a=e(this).siblings(".cart__qty-input"),i=a.val(),n=1,s=a.attr("data-pid");e(this).is(".plus")?n=parseInt(i)+1:i>1&&(n=parseInt(i)-1),a.val(n),C(s,n);var r=x(s);e(this).closest("tr").find(">.cart-price .money").html(f(n*r.price));var o=_(),c=0;if(o.length)for(var l=o.length-1;l>=0;l--)r=x(o[l].pid),c+=o[l].num*r.price;e(".totalMoney").html(f(c))}),t.find(".cart__remove").on("click",function(t){C(e(this).attr("data-pid"),-1),e(this).closest(".cart__row").remove();var a=_(),i=0;if(a.length)for(var n=a.length-1;n>=0;n--){var s=x(a[n].pid);i+=a[n].num*s.price}e(".totalMoney").html(f(i)),t.preventDefault()}),e("#cartCheckout").off().on("click",function(t){t.preventDefault();var a=e(".checkout-wrapper"),i=_(),n=a.find(".cart_input-name").val(),s=a.find(".cart_input-phone").val(),r=a.find(".cart_input-address").val(),o=a.find(".cart_input-note").val()||"";if(i.length)if(n&&s&&r){var l={name:n,phone:s=s.replace(/\s/g,""),address:r,note:o,prods:i,payment:parseInt(e(".cart_input-payment").val()),created:firebase.firestore.FieldValue.serverTimestamp()},d=e.cookie("ref");d&&(l.ref=d),S.collection("order").add(l).then(function(e){C("EMPTY"),c=s,M(v("order"))}).catch(function(t){e("#cartCheckout").next().show().delay(5e3).fadeOut(300).children(".cart_notify-inner").html("Lỗi hệ thống, vui lòng thử lại")})}else e(this).next().show().delay(5e3).fadeOut(300).children(".cart_notify-inner").html("Vui lòng nhập đủ thông tin");else e(this).next().show().delay(5e3).fadeOut(300).children(".cart_notify-inner").html("Không có sản phẩm nào trong giỏ")}),e("#page-content").find("input").each(function(){var t=e(this);"false"==t.attr("autocomplete")&&(t.val(" "),setTimeout(function(){t.val("")},500))})}();break;case"order":!function(){if(c){document.title="Đơn Hàng - Nhẹ Hều";var a=[],i="",n="";S.collection("order").where("phone","==",c).get().then(t=>{t.forEach(e=>{a.push(e.data())}),a.sort(function(e,t){return t.created.seconds-e.created.seconds});for(var s=0;s<a.length;s++){var r=0,o=0;a[s].status&&a[s].status<=2&&(o=a[s].status),i+='<li><a class="nav-link'+(0==s?" active":"")+'" data-toggle="tab" href="#tab-pane-'+a[s].created.seconds+'">Đơn hàng '+Math.floor(a[s].created.seconds/100)+"</a></li>",n+='<div id="tab-pane-'+a[s].created.seconds+'" class="tab-pane fade'+(0==s?" active show":"")+'">',n+='<h4>Ngày đặt hàng: <span class="time-now">'+u(a[s].created.seconds)+"</span></h4>",n+='<div class="order-progress" data-step="'+o+'"><div style="left: 0;"><span>Đang xử lý</span></div><div style="left: 50%;"><span>Đang vận chuyển</span></div><div style="left: 100%;"><span>Đã giao hàng</span></div></div>',n+='<div class="row"><div class="col-12 col-sm-12 col-md-12 col-lg-12 main-col"><div class="cart style2"><table>',n+='<thead class="cart__row cart__header"><tr><th colspan="2" class="text-center">Sản phẩm</th><th class="text-center">Đơn giá</th><th class="text-center">Số lượng</th><th class="text-center">Thành tiền</th><th class="action">&nbsp;</th></tr></thead>',n+='<tbody class="cart__list">';for(var l=0;l<a[s].prods.length;l++){var d=x(a[s].prods[l].pid);n+='<tr class="cart__row border-bottom line1 cart-flex border-top">',n+='<td class="cart__image-wrapper cart-flex-item"><a href="'+v("product/?p="+d.slug)+'" class="openlink"><img class="cart__image" src="'+g(d.img)+'" alt="'+d.name+'"></a></td>',n+='<td class="cart__meta small--text-left cart-flex-item">',n+='<div class="list-view-item__title"><a href="'+v("product/?p="+d.slug)+'" class="openlink">'+d.name+"</a></div>",n+='<p class="cart__meta-text">'+(d.type||"&nbsp;")+'</p><p class="cart__meta-text d-md-none">'+f(d.price)+" x "+a[s].prods[l].num+"</p>",n+="</td>",n+='<td class="cart__price-wrapper cart-flex-item text-center"><span class="money">'+f(d.price)+"</span></td>",n+='<td class="cart__update-wrapper cart-flex-item text-center"><span>'+a[s].prods[l].num+"</span></td>",n+='<td class="small--hide cart-price text-center"><div><span class="money">'+f(a[s].prods[l].num*d.price)+"</span></div></td></tr>",r+=a[s].prods[l].num*d.price}n+='</tbody></table></div></div><div class="container mt-4 checkout-wrapper"><div class="row"><div class="col-12 col-md-6 cart-col order-2 order-md-1"><h5>Thông tin người nhận</h5>',n+="<p>"+a[s].name+"</p><p>"+a[s].phone+"</p><p>"+a[s].address+"</p><p>"+a[s].note+"</p>",n+="<p>"+(a[s].payment?p[a[s].payment]:p[0])+"</p>",n+='</div><div class="col-12 col-md-6 order-1 order-md-2 cart__footer"><div class="solid-border"><div class="row border-bottom pb-2 pt-2"><span class="col-6 cart__subtotal-title"><strong>Tổng tiền</strong></span>',n+='<span class="col-6  cart__subtotal-title cart__subtotal text-right"><span class="money totalMoney">'+f(r)+"</span></span>",n+="</div></div></div></div></div></div></div>"}n||(n='<h4>Không có đơn hàng nào cho số điện thoại <span class="myphone">'+c+"</span></h4>"),e("#page-content").find(".dashboard-list").html(i),e("#page-content").find(".dashboard-content").html(n)}).catch(function(e){console.log("có lỗi xảy ra",e)})}else M(t)}();break;case"admin-orders":i=[],S.collection("order").orderBy("created","desc").get().then(t=>{t.forEach(e=>{var t=e.data();t.id=e.id,t.status||(t.status=0),i.push(t)});for(var a="",n=0;n<i.length;n++)a+="<tr>",a+="<td>"+(n+1)+"</td>",a+="<td>"+i[n].name+"</td>",a+="<td>"+u(i[n].created.seconds)+"</td>",a+="<td>"+h[i[n].status+""].split(",")[0]+"</td>",a+='<td><a class="openlink" href="'+v("quan-ly/order.html?id="+i[n].id)+'">xem</a></td>',a+="</tr>";e(".order-list").html(a)}).catch(function(e){console.log("Error getting products: ",e)});break;case"admin-order":!function(a){for(var n=null,s=m("id",a),r=0;r<i.length;r++)if(i[r].id==s){n=i[r];break}if(n){var o="";for(var c in o+="<h6>Ngày đặt: "+u(n.created.seconds)+"</h6>",o+="<p>"+n.name+"</p>",o+="<p>"+n.phone+"</p>",o+="<p>"+n.address+"</p>",o+="<p>"+p[n.payment]+"</p>",o+="<p>"+n.note+"</p>",e(".contact-details").html(o),o="",h)n.status+""==c?o+='<option value="'+c+'" selected>'+h[c]+"</option>":o+='<option value="'+c+'">'+h[c]+"</option>";e(".cart_input-payment").html(o),n._note&&e(".cart_input-note").val(n._note),o="";for(var l=0,d=0;d<n.prods.length;d++){var b=x(n.prods[d].pid);o+='<tr class="cart__row border-bottom line1 cart-flex border-top">',o+='<td class="cart__image-wrapper cart-flex-item"><a href="'+v("product/?p="+b.slug)+'" class="openlink"><img class="cart__image" src="'+g(b.img)+'" alt="'+b.name+'"></a></td>',o+='<td class="cart__meta small--text-left cart-flex-item">',o+='<div class="list-view-item__title"><a href="'+v("product/?p="+b.slug)+'" class="openlink">'+b.name+'</a><p class="cart__meta-text">'+b.type+'</p><p class="cart__meta-text d-md-none">'+f(b.price)+" x "+n.prods[d].num+"</p></div>",o+='<div class="cart__meta-text"><br></div></td>',o+='<td class="cart__price-wrapper cart-flex-item text-center"><span class="money">'+f(b.price)+"</span></td>",o+='<td class="cart__update-wrapper cart-flex-item text-center"><span>'+n.prods[d].num+"</span></td>",o+='<td class="small--hide cart-price text-center"><div><span class="money">'+f(n.prods[d].num*b.price)+"</span></div></td></tr>",l+=n.prods[d].num*b.price}e(".cart__list").html(o),e(".totalMoney").html(f(l)),e(".btn-saveChange").on("click",function(){return S.collection("order").doc(n.id).update({status:parseInt(e(".cart_input-payment").val()),_note:e(".cart_input-note").val()}).then(function(){T("Cập nhật thành công","success")}),!1})}else M(t)}(n);break;case"pub":d=[];var r=0;S.collection("pub-click").get().then(e=>{e.forEach(e=>{d.push(e.data()),2===++r&&O()})}).catch(function(e){console.log("Error get click")}),S.collection("publisher").get().then(e=>{e.forEach(e=>{d.push(e.data()),2===++r&&O()})}).catch(function(e){console.log("Error getting publisher")})}o||window.history.pushState("object or string","",n),e("#page-content").removeClass("onopenUrl")},300)):e.get(v("template/"+y+".html?t="+Date.now()),function(e){s[y]=e,M(n)})):M(t)};firebase.initializeApp({apiKey:"AIzaSyDfOuDOS6rncaofRNlGu73tPEFRrsxQIHE",authDomain:"nheheu-f68d6.firebaseapp.com",databaseURL:"https://nheheu-f68d6.firebaseio.com",projectId:"nheheu-f68d6",storageBucket:"nheheu-f68d6.appspot.com",messagingSenderId:"734928350132",appId:"1:734928350132:web:a4da8f5058b9738433e0e1",measurementId:"G-SRFCEZYK5H"}),firebase.analytics();var S=firebase.firestore(),q=["daominhhoa93@gmail.com","daothithuhien1705@gmail.com"],E=!1;firebase.auth().onAuthStateChanged(function(i){if(i){var n=i.displayName,s=i.email,o=i.emailVerified,d=i.photoURL,p=i.isAnonymous,h=i.uid,f=i.providerData;l.displayName=n,l.email=s,l.emailVerified=o,l.photoURL=d,l.isAnonymous=p,l.uid=h,l.providerData=f,e(".not-login").hide(),e(".has-login").show(),-1!==q.indexOf(l.email)?e(".is-admin").removeClass("hide").show():e(".is-admin").addClass("hide").hide(),e("body").children(".mhpopup").addClass("hide"),e("#popup-login").find(".customerPassword").val("")}else l={},e(".not-login").show(),e(".has-login").hide(),e(".is-admin").addClass("hide").hide(),"pub"==r&&M(t);!function(){if(!E){E=!0,console.log("app start");var i=e("body");!function(){var t=m("ref");if(t){var a={uid:t,created:firebase.firestore.FieldValue.serverTimestamp(),url:window.location.href};e.cookie("ref",t,{expires:30,path:"/"}),S.collection("pub-click").add(a).then(function(e){console.log("add new click")}).catch(function(e){console.log("add click fail")})}else console.log("no ref")}(),e.getJSON(v("products.json?t="+Date.now()),function(t){a=t,e("#page-content").removeClass("invisible"),-1!==q.indexOf(l.email)?M(v("quan-ly")):M(window.location.href)}),e("body").on("click",".openlink",function(t){t.preventDefault();var a=e(this).attr("href");M(a)}),e("body").on("click",".btn-copy",function(t){var a,i;t.preventDefault(),a=e(this).attr("data-text"),(i=document.createElement("textarea")).value=a,document.body.appendChild(i),i.select(),i.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(i),T("Đã copy","success")});for(var n,s,r,o,d=_(),p=0,h=0;h<d.length;h++)p+=d[h].num;e(".site-cart-count").html(p),e(".mhpopup").find(".mhpopup-close").off().on("click",function(t){e(this).closest(".mhpopup").addClass("hide"),t.preventDefault()}),(n=e("#popup-login")).find(".btn-sendLogin").off().on("click",function(e){var t=n.find(".customerEmail").val(),a=n.find(".customerPassword").val();t&&a?firebase.auth().signInWithEmailAndPassword(t,a).catch(function(e){var t=e.code,a=e.message;console.log(t,a,e);var i="Email hoặc mật khẩu không đúng";"auth/user-disabled"==t&&(i="Tài khoản này bị khóa do vi phạm điều khoản"),T(i)}):T("Chưa nhập đủ thông tin"),e.preventDefault()}),n.find(".btn-quenmk").off().on("click",function(e){e.preventDefault(),T("Để lấy lại mật khẩu vui lòng liên hệ quả trị viên")}),function(){var t=e("#popup-signup");t.find(".btn-sendSignup").off().on("click",function(e){var a=t.find(".customerEmail").val(),i=t.find(".customerPassword").val(),n=t.find(".customerRePassword").val();a&&i&&n?i!=n?T("Nhập lại mật khẩu không khớp"):firebase.auth().createUserWithEmailAndPassword(a,i).catch(function(e){var t=e.code,a=e.message;T("auth/weak-password"==t?"Mật khẩu quá yếu":"auth/email-already-in-use"==t?"Email này đã đăng ký tài khoản":"auth/invalid-email"==t?"Email không hợp lệ":a)}):T("Chưa nhập đủ thông tin"),e.preventDefault()})}(),i.on("click",".btn-login",function(t){t.preventDefault(),i.children(".mhpopup").addClass("hide"),e("#popup-login").removeClass("hide")}),i.on("click",".btn-signup",function(t){t.preventDefault(),i.children(".mhpopup").addClass("hide"),e("#popup-signup").removeClass("hide")}),i.on("click",".btn-logout",function(e){e.preventDefault(),firebase.auth().signOut()}),i.on("click",".btn-back",function(e){e.preventDefault(),i.hasClass("page-admin-order")?M(v("quan-ly")):M(t)}),e(".btn-openOrder").off().on("click",function(t){t.preventDefault(),e(".search-drawer").addClass("search-drawer-open"),toggleMenuMobile(!1)}),e(".btn-viewMyOrder").on("click",function(t){var a=e(this).siblings(".input-text").val();a&&(c=a.replace(/\s/g,""),M(v("order")),e(".search-drawer").removeClass("search-drawer-open")),t.preventDefault()}),s=!1,r=e(".header"),o=e(window),window.onscroll=function(){o.scrollTop()>35?(s||r.addClass("stickyNav"),s=!0):(s&&r.removeClass("stickyNav"),s=!1)}}}()}),window.addEventListener("popstate",function(e){M(location.href,!0)})}(_xvdth),document.addEventListener("contextmenu",e=>e.preventDefault());