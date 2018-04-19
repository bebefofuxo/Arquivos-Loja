// altertar para a loja do cliente
var IDLoja = '20368';
var baseLoja = '../lojas/00020368/';

jQuery(window).load(function(){
// exibe.miniaturas
	jQuery(".miniaturas").css("height","74px");

// imagem.mega.zoom
	if(jQuery('#imageos').width()>jQuery('#container_image').width() || jQuery('#imageos').height()>jQuery('#container_image').height() ){

		var pos_x = jQuery('#thumbos').offset().left;
		var pos_y = jQuery('#thumbos').offset().top;
		var container_x = jQuery('#container_image').width();
		var container_y = jQuery('#container_image').height();
		var conteudo_x = jQuery('#imageos').width();
		var conteudo_y = jQuery('#imageos').height();
		var thumbos_x = jQuery('#thumbos').width();
		var thumbos_y = jQuery('#thumbos').height();
		var diferenca_x = conteudo_x - container_x;
		var diferenca_y = conteudo_y - container_y;		
		// POSICAO INICIAL ( na metade da tela)
		var metade_x = - parseInt(diferenca_x / 2);
		var metade_y = - parseInt(diferenca_y / 2);

		jQuery('#thumbos').mousemove(function(e){
          
			porcentagem_x = parseInt( (e.pageX - pos_x) / thumbos_x * 100);
			porcentagem_y = parseInt( (e.pageY - pos_y) / thumbos_y * 100);
			leftPosition = parseInt(0 - (diferenca_x  / 100 * porcentagem_x ));
			topPosition = parseInt(0 - (diferenca_y  / 100 * porcentagem_y ));
			jQuery('#imageos').css({
				'left':leftPosition,
				'top':topPosition
			});
		});

		jQuery('img').css('visibility','visible');				
	}
});

jQuery('.verComentarios').live( "click", function() {
  jQuery('html, body').animate({
      scrollTop: jQuery('.osp_historico').offset().top - 100
  }, 1000);
  
});

jQuery(document).ready(function(){
	
    //posts facebook
    if(isMobile.any() == null)
    {
       jQuery('.fb-post').css("margin-left", "15px");
       jQuery('.btnVermais').css("margin-left", "15px");
    }
    else
    {
       jQuery('.btnVermais').css("width", "60px");
       jQuery('.btnVermais').css("margin-left", "auto");
       jQuery('.btnVermais').css("margin-right", "auto");
    }
  
  
	if (jQuery('#idTabCrossFC').length) {
	   jQuery('.gt-relacionados').show();
	}
	
	jQuery(".ver-avaliacao").live('click', function() {		
		jQuery('ul.tabs li').removeClass('active');
		jQuery('#aba-avaliacao').addClass('active');
		jQuery(".tab_content").hide();
        var active = jQuery(this).attr("href");
        jQuery(active).fadeIn();
		goAnchor('#detalhes-produto');
		return false;
		
		
	});
	
	
	
//imagem.ampliada.lightbox
jQuery("a#os_imglight").fancybox();

	jQuery('#thumbos').mouseover(function(){
		jQuery("#container_image").addClass("mzoom");
		jQuery("#container_image").removeClass("ezoom");
		//jQuery("#container_image").hide();	 
		jQuery(".os_redes").css("display","none");
		jQuery("#comprasubproduto").removeClass("os_relativo");
	 	jQuery("#EstTabBotComprar").removeClass("os_relativo");
	 	jQuery("#thumbos").addClass("bgFoto");
	}).mouseout(function(){
		jQuery("#container_image").removeClass("mzoom");
		jQuery("#container_image").addClass("ezoom");
		jQuery(".os_redes").css("display","block");         
		jQuery("#comprasubproduto").addClass("os_relativo");
		jQuery("#EstTabBotComprar").addClass("os_relativo");
		jQuery("#thumbos").removeClass("bgFoto");
	});

	jQuery("#mfoto1").click(function(){
		jQuery('#thumbos').attr('src',pdet);
		jQuery('#imageos').attr('src',pdet);
		jQuery('#os_imglight').attr('href',pdet);
	});
	jQuery("#mfoto2").click(function(){
		jQuery('#thumbos').attr('src',pdet2);
		jQuery('#imageos').attr('src',pdet2);
		jQuery('#os_imglight').attr('href',pdet2);
	});
	jQuery("#mfoto3").click(function(){
		jQuery('#thumbos').attr('src',pdet3);
		jQuery('#imageos').attr('src',pdet3);
		jQuery('#os_imglight').attr('href',pdet3);
	});
});


//gera.variacao.de.fotos	
function verificamini(img){
	img.onerror = null;
	document.getElementById('os_Miniaturas').style.display = 'none';
}
function trataErroImagem(img){
	img.onerror = null;
	img.style.display = 'none';
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

//parametro URLAPOIO utilizado para definir qtde de imagens de cada produto
function exibeVariacao(imgCadastrada,descURL){
	pdet  		= imgCadastrada;
	pdet2jpg 	= pdet.replace(/.jpg/gi, "_2.jpg");
	pdet3jpg 	= pdet.replace(/.jpg/gi, "_3.jpg");
	pdet2png 	= pdet2jpg.replace(/.png/gi, "_2.png");
	pdet3png 	= pdet3jpg.replace(/.png/gi, "_3.png");
	pdet2 		= pdet2png.replace(/.gif/gi, "_2.gif");
	pdet3 		= pdet3png.replace(/.gif/gi, "_3.gif");
	document.write('<div class="info_apmpliar">');
	/*document.write('<div class="simamp"><div class="miniaturas" id="os_Miniaturas" style="display:block">');
	document.write("<img id='mfoto1' onerror='trataErroImagem(this)' src='"+ pdet +"'>");
    document.write("<img id='mfoto2' onerror='verificamini(this)' src='"+ pdet2 +"'>");
    document.write("<img id='mfoto3' onerror='trataErroImagem(this)' src='"+ pdet3 +"'></div></div>");*/
	
    if (descURL == 2)
    {
       document.write('<div class="simamp"><div class="miniaturas" id="os_Miniaturas" style="display:block">');
	   document.write("<img id='mfoto1' onerror='trataErroImagem(this)' src='"+ pdet +"'>");
       document.write("<img id='mfoto2' onerror='verificamini(this)' src='"+ pdet2 +"'></div></div>");
    }
  else if (descURL == 3)
    {
       document.write('<div class="simamp"><div class="miniaturas" id="os_Miniaturas" style="display:block">');
	   document.write("<img id='mfoto1' onerror='trataErroImagem(this)' src='"+ pdet +"'>");
       document.write("<img id='mfoto2' onerror='verificamini(this)' src='"+ pdet2 +"'>");
       document.write("<img id='mfoto3' onerror='trataErroImagem(this)' src='"+ pdet3 +"'></div></div>");
    }
  
  
  if(isMobile.any() == null)
  {
      document.write('<div class="amp_light"><a href="'+imgCadastrada+'" id="os_imglight"><img src="'+baseLoja+'images/layout/bt_amp.gif"></a></div>');
  }
  else
  {
    document.write('<div class="amp_light" style="display:none"><a href="'+imgCadastrada+'" id="os_imglight"><img src="'+baseLoja+'images/layout/bt_amp.gif"></a></div>');
  }
	
}



//indica.amigos
function MostraIndique(IDLoja,IDProduto){
	popup=window.open("IndiqueProduto.asp?IDLoja="+IDLoja+"&IDProduto="+IDProduto,"Indique","top=10,left=10,height=450,width=423,scrollbars=no");
	popup.focus();
	return void(0);
}
function IndicaProd(IDProduto){
	document.write("<a href='javascript:MostraIndique("+IDLoja+","+IDProduto+")'>Indique para um amigo</a>");
}
