var request_sent = false;
// Функция отправки сообщений на почту
    function create_order(){

    var $form = $(this).parents('form:first');
    var namepopup = $form.find("input[type='text']").val();
    var telpopup = $form.find("input[type='tel']").val();
    var metka = $form.find("input[type='hidden']").val();
    if((namepopup === "") || (telpopup === "")) { 
       alert("Заполните все поля!")
       return false;
    }
    if (request_sent) {
        alert('Ваша заявка уже принята ранее. Спасибо');
        return false;
    }
    else {
    $.ajax({
      type: "POST",
      url: "form.php",
      data: {"namepopup": namepopup,  "telephonepopup" : telpopup, "metka" : metka},
      cache: false,
      success: function(response){
        request_sent = true;
        // console.log("asd");
        // var messageResp = new Array('Сообщение успешно отправлено','Сообщение не отправлено!','Ошибка');
    // $(".main-popup").css("display", "none");
      window.location.href = "/successfull.html";
      console.log("Successfull");
      },
      //error: function(response){
    });
    }
    return false;

  }

function openCart(self) {
	$(".cart-popup").show();
	var countClock = 0;
	var currentProg = self.parents(".js-wrap-product:first");
	var currentIndex = self.parents(".js-wrap-product:first").index();
	self.parents(".js-wrap-product:first").html();
	$(".js-title-push").html(currentProg.find(".js-title-pull").html());
	$(".js-image-push").html(currentProg.find(".js-image-pull").html());
	$(".js-char-push").html(currentProg.find(".js-char-pull").html());
	$(".js-wrap-sizer-push").html(currentProg.find(".js-wrap-sizer-pull").html());
		$(".js-image-push a").tosrus({
   effect     : "fade",
   buttons    : "inline",
   pagination : {
      add        : true
   },
   wrapper    : {
      classes    : "img-border"
   }
});
	globalcountClock = countClock;
	globulcurrentIndex = currentIndex;
}

function clickCartLeft() {
	if(0 >= (globalcountClock + globulcurrentIndex)) {
		return false;
	}
	else {
		globalcountClock--;
	$(".js-title-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-title-pull").html());
	$(".js-image-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-image-pull").html());
	$(".js-char-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-char-pull").html());
	$(".js-wrap-sizer-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-wrap-sizer-pull").html());
		$(".js-image-push a").tosrus({
   effect     : "fade",
   buttons    : "inline",
   pagination : {
      add        : true
   },
   wrapper    : {
      classes    : "img-border"
   }
});
	}

}

function clickCartRight() {
	if($(".js-wrap-product").length == globalcountClock + globulcurrentIndex + 1) {
		return false;
	}
	else {
		globalcountClock++;
		$(".js-title-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-title-pull").html());
		$(".js-image-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-image-pull").html());
		$(".js-char-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-char-pull").html());
		$(".js-wrap-sizer-push").html($(".js-model-wrap").find($(".js-wrap-product")).eq(globulcurrentIndex + globalcountClock).find(".js-wrap-sizer-pull").html());
			$(".js-image-push a").tosrus({
   effect     : "fade",
   buttons    : "inline",
   pagination : {
      add        : true
   },
   wrapper    : {
      classes    : "img-border"
   }
});
	}
}
/* Парсим данные с карты в попап слайдер */
function parseData(self) {
	self.parents(".js-wrap-sizer-push").children(".class-standart").removeClass("active");
	self.addClass("active");
	self.parents(".js-wrap-sizer-push").find(".js-size-push").removeClass("active");
	$(".js-size-push").eq(self.index()).html();
	self.parents(".js-wrap-sizer-push").find(".js-size-push").eq(self.index()).addClass("active");
}

$(document).ready(function() {




var globalcountClock;
var globulcurrentIndex;

var globalCase = 2;
var globalSex = 0;
var globalSlim = 0;

/* Вызов функции отправки сообщений на почту */
$(".click_order").bind("click", create_order);

/* Открываем карточку товара на которую нажали */
$(".js-moreinfo").click(function() {
	openCart($(this));
});

/* Переключаем карточку-слайдер назад */
$("#js-prev-btn-cart").click(function() {
	clickCartLeft();
});

/* Переключаем карточку-слайдер вперед */
$("#js-next-btn-cart").click(function() {
	clickCartRight();
});

/* Переключаем карточку-слайдер вперед */
$(".js-btn-order-list").click(function() {
	var $contentProd = $(this).parents(".wrap-product");
	var $title_list = $contentProd.find(".js-title-pull").html();
	var $price_list =  $contentProd.find(".blok-cost").html();
	var descr_list = "<i>Человек нажал заказать по каталогу</i><br>";
	$(".mark").val(descr_list + "Модель: " + $title_list + "<br>" + $price_list);
	$(".popup-order").show();
});

$(".js-btn-order-cart").click(function() {
	var $contentCart = $(".wrap-cart");
	var $title_cart = $contentCart.find(".js-title-push").html();
	var $price_cart =  $contentCart.find(".choose-priсe").html();
	var descr_cart = "<i>Человек нажал заказать с карты</i><br>";
	$(".mark").val(descr_cart + "Модель: " + $title_cart + "<br>" + $price_cart);
	$(".popup-order").show();
});

/* Закрываем попап */
$(".js-close-btn").click(function() {
	$(".cart-popup").hide();
});		
/* Попап инициализация */
$(".js-popup-tosrus a").tosrus({
   effect     : "fade",
   buttons    : "inline",
   pagination : {
      add        : true
   },
   wrapper    : {
      classes    : "img-border"
   }
});



$(".js-sex-click").click(function() {
console.log("Sex", $(this).data("sex"));
globalSex = $(this).data("sex");
cunstruct();
});
$(".js-slim-click").click(function() {
console.log("Slim", $(this).data("slim"));
	globalSlim = $(this).data("slim");
	cunstruct();
});

$(".js-case-click").click(function() {
globalCase = $(this).data("case");
cunstruct();
});

$(".glasses-case").click(function() {
	$(".glasses-case").removeClass("active");
	$(this).addClass("active");
	console.log($(this).data("model"));
	$(".btn-cunstr").attr("href", $(this).data("model"));
});

function cunstruct() {
$(".preview-photo img").each(function() {
	if($(this).data("preview") == globalSex.toString() + globalSlim.toString() + globalCase.toString()) {
$(".preview-photo img").addClass("hidden");
$(this).removeClass("hidden");
	}

});
}

	$(".close-btn").click(function() {
		$(".popup-order").fadeOut();
	});

$(".js-close-btn-video").click(function() {
	console.log($(".videoWrapper iframe").attr("src", ""));
		$(".popup-video").fadeOut();
	});
	
	$(".js-link-video-review").click(function() {
		console.log($(".videoWrapper iframe").attr("src", $(".videoWrapper iframe").data("src")));
		$(".popup-video").fadeIn();
	});

	$(".btn-footer-info").click(function() {
		$(".popup-order input[type='hidden']").val($(this).text());
		$(".popup-order").fadeIn();
	});

$(".request-call-button").click(function() {
	$(".popup-order input[type='hidden']").val($(this).text());
		$(".popup-order").fadeIn();
	});

	$(".mnu-top").click(function() {
		$(".header-mob").toggleClass("movemenu");
	});

/* При нажатии на ссылку в мобильном меню,
	скрипт выполняет переход к указаному блоку */
$(".list-menu li a").click(function(event) {
	$(".header-mob").toggleClass("movemenu");
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top - 60}, 500);
});

$(".btn-obsl a").click(function(event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    console.log(id);
    $('body,html').animate({scrollTop: top}, 500);
});

$(".btn-cunstr").click(function(event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    console.log(id);
    $('body,html').animate({scrollTop: top}, 500);
});

/* Показать/Скрыть моб. меню*/
$(".wrap-mnu-top").click(function() {
	$(".header-mob").toggleClass("movemenu");
});
	
});

// $(window).load(function() {


// });
