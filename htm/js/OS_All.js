// alterar para a loja do cliente
var IDLoja = '20368';
var baseLoja = '../lojas/00020368/';

// selo.frete.gratis
function ImgFrete(ifrete) {
    if (ifrete >= 180)
        document.write("<img src='" + baseLoja + "images/layout/selo_frete.png'>");
}

//selo.preco.promocional
function ImgEconomia(ipre1, ipre2) {
    if (ipre1 != ipre2)
        document.write("<img src='" + baseLoja + "images/selo_off.png'>");
}

//preco.desconto.avista
function MostraDesconto(PrecoProd) {
    if (PrecoProd == 0)
        return;
    document.write("ou&nbsp;" + FormatPrecoReais(PrecoProd * 0.95) + " à vista no boleto <span>(5% de desconto)</span>");
}

function MostraDescontoProduto(PrecoProd) {
    if (PrecoProd == 0)
        return;
    document.write(FormatPrecoReais(PrecoProd * 0.95));
}

function MostraAtacado(PrecoProd) {
  document.write(FormatPrecoReais(PrecoProd*0.85) + "&nbsp;no&nbsp;atacado");
}

//preco.parcelado
function MostraMaxParcela(PrecoProd, MaxParcelas) {
    var ComSem;
    //insira aqui parcela minima
    /*	if(PrecoProd>=200)MaxParcelas=10;
     else if(PrecoProd>=180)MaxParcelas=9;
     else if(PrecoProd>=160)MaxParcelas=8;
     else if(PrecoProd>=140)MaxParcelas=7;
     else if(PrecoProd>=120)MaxParcelas=6;
     else if(PrecoProd>=100)MaxParcelas=5;
     else if(PrecoProd>=80)MaxParcelas=4;
     else if(PrecoProd>=60)MaxParcelas=3;
     else if(PrecoProd>=40)MaxParcelas=2;
     else if(PrecoProd>=1)MaxParcelas=1; */

    if (PrecoProd == 0 || MaxParcelas == 1 || Juros.length == 0)
        return;
    if (MaxParcelas == 0 || MaxParcelas > Juros.length)
        MaxParcelas = Juros.length;
    if (Juros[MaxParcelas - 1] > 0)
        ComSem = "";
    else
        ComSem = "&nbsp;sem&nbsp;juros";
    document.write(MaxParcelas + "X&nbsp;de&nbsp;" + FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd, MaxParcelas)) + ComSem);
}

//tabela.parcelas
function MostraParcelas(PrecoProd, MaxParcelas) {
    var ComSem, EstiloLinha;
    /*	if(PrecoProd>=200)MaxParcelas=10;
     else if(PrecoProd>=180)MaxParcelas=9;
     else if(PrecoProd>=160)MaxParcelas=8;
     else if(PrecoProd>=140)MaxParcelas=7;
     else if(PrecoProd>=120)MaxParcelas=6;
     else if(PrecoProd>=100)MaxParcelas=5;
     else if(PrecoProd>=80)MaxParcelas=4;
     else if(PrecoProd>=60)MaxParcelas=3;
     else if(PrecoProd>=40)MaxParcelas=2;
     else if(PrecoProd>=1)MaxParcelas=1; */

    if (PrecoProd == 0 || MaxParcelas == 1 || Juros.length == 0)
        return;
    if (MaxParcelas == 0 || MaxParcelas > Juros.length)
        MaxParcelas = Juros.length;
    document.write("<table cellpadding='4' class='ex_tabparc' cellspacing='0' width='283' border='0'>");
    for (var i = 0; i < MaxParcelas; i++) {
        if (Juros[i] > 0)
            ComSem = "com juros";
        else
            ComSem = "sem&nbsp;juros";
        if ((i % 2) == 0)
            EstiloLinha = 'EstParcPar';
        else
            EstiloLinha = 'EstParcImpar';
        document.write("<tr class=" + EstiloLinha + "><td class=" + EstiloLinha + ">" + (i + 1) + "x " + ComSem + "</td><td class=" + EstiloLinha + " align=right>" + FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd, i + 1)) + "</td></tr>");
    }
    document.write("</table>");
}

//preco.economia
function MostraEconomia(PrecoProd, PrecoOri) {
    if (PrecoProd != PrecoOri)
        document.write("Economize " + FormatPrice(PrecoOri - PrecoProd, 'R$') + " (" + FormatNum(((PrecoOri - PrecoProd) / PrecoOri) * 100) + "%)");
}

function FormatNum(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    num = Math.floor(num / 100).toString();
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return ((sign) ? '' : '-') + num;
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

jQuery(document).ready(function() {
    //submenu
    jQuery('.navigation li.pai').hover(
            function() {
                jQuery('ul', this).show(0);
            },
            function() {
                jQuery('ul', this).fadeOut(0);
            }
    );
  
  	if(isMobile.any() == null){
   		
      	//hover.home
		jQuery(".pr1").live({
    		mouseenter: function () {
      			jQuery(this).addClass('opaco100');
      			jQuery('.pr1comprar', this).addClass('gt-exibe');
      			//jQuery('.lancamento', this).addClass('gt-exibe');
    		},
    		mouseleave: function () {
      			jQuery(this).removeClass('opaco100');
      			jQuery('.pr1comprar', this).removeClass('gt-exibe');
      			//jQuery('.lancamento', this).removeClass('gt-exibe');
    		}
		});
		//hover.categorias
		jQuery(".pr2").live({
    		mouseenter: function () {
      			jQuery(this).addClass('opaco100');
      			jQuery('.pr2comprar', this).addClass('gt-exibe');
      			//jQuery('.lancamento', this).addClass('gt-exibe');
    		},
    		mouseleave: function () {
      			jQuery(this).removeClass('opaco100');
      			jQuery('.pr2comprar', this).removeClass('gt-exibe');
      			//jQuery('.lancamento', this).removeClass('gt-exibe');
    		}
		});
      
	}
  	else
    {
      	jQuery('.pr1comprar', this).addClass('gt-exibe');
      	jQuery('.pr2comprar', this).addClass('gt-exibe');
    }
  
	

    jQuery('#idTxtLinkCatFC').html('<a href="home.asp?idloja=20368">Clique aqui</a> para começar a comprar.<br>');
	jQuery('#idTxtNewSearchNotFoundFC').hide();
	jQuery('#idTxtCatNotFoundFC').html('<a href="home.asp?idloja=20368">Clique aqui</a> para voltar.<br><br>');
	jQuery('#idTxtRecalculateFC b').html('ATUALIZAR CARRINHO');
   
});

// seta.direita.scroll
jQuery(function() {
    jQuery("a.anchorLink").anchorAnimate();
});
jQuery.fn.anchorAnimate = function(settings) {
    settings = jQuery.extend({
        speed: 1100
    }, settings);
    return this.each(function() {
        var caller = this
        jQuery(caller).click(function(event) {
            event.preventDefault()
            var locationHref = window.location.href
            var elementClick = jQuery(caller).attr("href")

            var destination = (jQuery("" + elementClick + "").offset().top) - 40;
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, settings.speed, function() {
                //window.location.hash = elementClick
            });
            return false;
        })
    })
}
function goAnchor(target) {
    //event.preventDefault();
    var locationHref = window.location.href;
    var elementClick = "" + target + "";
    var destination = (jQuery("" + elementClick + "").offset().top) - 40;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100, function() {
        //window.location.hash = elementClick
    });
}

// barra.fixa.topo
jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 100) {
        jQuery('#voltartopo').fadeIn(200);
        jQuery('#os_topbar').fadeIn(200);
    } else {
        jQuery('#voltartopo').fadeOut(200);
        jQuery('#os_topbar').fadeOut(200);
    }
});


//dados.do.carrinho.topo
function MostraDadosCesta() {

    var vTotal;
    var qTotal;
    var vFrete = '';
    var lTotal = '';
    var sItem;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "XMLCart.asp?IDLoja=" + IDLojaNum + "", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    var x = xmlDoc.getElementsByTagName("item");
    var z = xmlDoc.getElementsByTagName("cart");

    //total valor
    try {
        currencyProdCart = (z[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);
    }
    catch (e) {
        currencyProdCart = ""
    }

    try {
        subtotalProdCart = "" + (z[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);
    }
    catch (e) {
        subtotalProdCart = ""
    }

    try {
        vTotal = currencyProdCart + " " + subtotalProdCart;

        //document.getElementById("ValorItensCesta").innerHTML=currencyProdCart + " " + subtotalProdCart;}
    }
    catch (e) {
    }

    // total itens
    try {
        TotalQtyProdCart = (z[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);
    }
    catch (e) {
        TotalQtyProdCart = "0"
    }
    var iItensCesta = TotalQtyProdCart;
    if (iItensCesta == 0) {
        sItem = "0";
        qTotal = 0;
        document.getElementById("ValorItensCesta").innerHTML = "R$ 0,00";
		document.getElementById("ValorItensCesta2").innerHTML = "R$ 0,00";

    }
    else {
        qTotal = iItensCesta;
        sItem = iItensCesta;
        document.getElementById("ValorItensCesta").innerHTML = vTotal;
		document.getElementById("ValorItensCesta2").innerHTML = vTotal;
    }
    try {
        document.getElementById("QtdItensCesta").innerHTML = sItem;
		document.getElementById("QtdItensCesta2").innerHTML = sItem;
    }
    catch (e) {
    }
}

//chat
function MostraChatLoja() {
    popup = window.open("http://www.rumo.com.br/sistema/ChatLogin.asp?IDLoja=" + IDLoja + "", "Chat", "top=20,left=20,height=280,width=390,scrollbars=no,resizable=yes");
    popup.focus();
    return void(0);
}

//janela.popup
function abrirT2(URL) {
    window.open(URL, 'janela', 'width=500, height=350, top=80, left=80, scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no');
}

//carregando.pagina
jQuery(window).load(function() {
    jQuery('.carrega').fadeOut(0);
});