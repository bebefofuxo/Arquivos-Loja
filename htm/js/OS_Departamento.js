/**
 * departamento
 * @author gutvalente@gmail.com
 */

//navegacao.por.filtros
function AjustaFiltros(){ 
	var bTemPathQts=false;
	var oUlPathCatQt=document.getElementById("idUlPathCatQtFC");

	if(oUlPathCatQt){
bTemPathQts=true;

//====================== RETIRAR CATEGORIA DO FILTRO E DEIXAR SÓ SUB
var lis = oUlPathCatQt.children;
for(var i = 0; i < lis.length; i++) {
    var a = lis[i].innerHTML;
var array = a.split(">");
var textoFinal = array[0] + ">";

var arrayDois = array[1].split(",");
var nomeSub = arrayDois[1].substring(1);

textoFinal = textoFinal + nomeSub + ">";
console.log(textoFinal);
    lis[i].innerHTML = textoFinal;
//=============================
}


}
else
{document.getElementById('idListaProdCategoriasFC').style.display='none';}
	var oUlAdic1Qt=document.getElementById("idUlAdic1QtFC");
    var lpa1 = document.getElementById('idListaProdAdicional1FC');
    if(oUlAdic1Qt){bTemPathQts=true;}else{if(lpa1){lpa1.style.display='none';}}
	var oUlAdic2Qt=document.getElementById("idUlAdic2QtFC");
    var lpa2 = document.getElementById('idListaProdAdicional2FC');
	if(oUlAdic2Qt){bTemPathQts=true;}else{if(lpa2){lpa2.style.display='none';}}
	var oUlAdic3Qt=document.getElementById("idUlAdic3QtFC");
    var lpa3 = document.getElementById('idListaProdAdicional3FC');
	if(oUlAdic3Qt){bTemPathQts=true;}else{if(lpa3){lpa3.style.display='none';}}
}

//ordena.listagem.de.produtos
var sPag=document.location.href.toUpperCase();
function ordenaLista() {
	if(sPag.indexOf("/PROD,")==-1){sConcat="&";sCharSep="=";} else {sConcat=",";sCharSep=",";}
	if((sPag.indexOf("&DET=")==-1 && sPag.indexOf("&IDPRODUTO=")==-1) && (sPag.indexOf(",DET,")==-1 && sPag.indexOf(",IDPRODUTO,")==-1)){
		document.write("<select id=OrderProd class=smSelect onchange=NewOrder()>");
		document.write("<option value=-1>Ordenar por</option>");
		document.write("<option value=0>Padr&atilde;o</option>");
		document.write("<option value=1>Lan&ccedil;amentos</option>");
		document.write("<option value=2>Destaques</option>");
		document.write("<option value=3>Nomes das categorias</option>");
		document.write("<option value=4>Nomes dos produtos</option>");
		document.write("<option value=5>Avalia&ccedil;&otilde;es dos clientes</option>");
		document.write("<option value=6>Promo&ccedil;&otilde;es</option>");
		document.write("<option value=7>Pre&ccedil;os menores</option>");
		document.write("<option value=8>Pre&ccedil;os maiores</option>");
		document.write("</select>");
		var oOrder=document.getElementById('OrderProd');
		var posOrder=sPag.indexOf("ORDER"+sCharSep);
		if(posOrder!=-1){
			var iOrderCurrent=sPag.substr(posOrder+6,1);
			if(!isNaN(iOrderCurrent))if(iOrderCurrent>=0){
				var i=0;
				while(i<oOrder.length && oOrder.options[i].value!=iOrderCurrent)i++;
				if(i<oOrder.length)oOrder.selectedIndex=i;
			}
		}
	}
}
      
function NewOrder(){
	var oOrder=document.getElementById('OrderProd');
	var posOrder=sPag.indexOf("ORDER"+sCharSep);
	if(posOrder!=-1){
	  var iOrderCurrent=sPag.substr(posOrder+6,1);
	}
	var iOrder=oOrder.options[oOrder.selectedIndex].value;
	if(iOrder>=0){
		if(posOrder!=-1){document.location.href=document.location.href.replace(new RegExp('order'+sCharSep+iOrderCurrent),'order'+sCharSep+iOrder);}
		else{document.location.href=document.location.href.replace(new RegExp('idloja'+sCharSep+IDLojaNum,'gi'),'idloja'+sCharSep+IDLojaNum+sConcat+'order'+sCharSep+iOrder);}
	}
}

jQuery(document).ready(function() {
//acrescenta preco no filtro
    if (sPag.indexOf("IDPRODUTO")<=0 || sPag.indexOf("LISTAPRODUTOS")>=0) {
	  prefixoLinh = '/prod,IDLoja,14834,IDCategoria,'+IDCategoriaAtualFC+',Avancada,1,';
	  linkPreco = '<div class="gtm-preco os_grpFiltro"><h3>PREÇO</h3><ul><li><a href="'+prefixoLinh+'PrecoDe,0,PrecoAte,10">Até R$ 10,00</a></li><li><a href="'+prefixoLinh+'PrecoDe,10,PrecoAte,20">R$ 10,00 a R$ 20,00</a></li><li><a href="'+prefixoLinh+'PrecoDe,20,PrecoAte,50">R$ 20,00 a R$ 50,00</a></li><li><a href="'+prefixoLinh+'PrecoDe,50,PrecoAte,100">R$ 50,00 a R$ 100,00</a></li><li><a href="'+prefixoLinh+'PrecoDe,100">Acima de R$ 100,00</a></li></div>';
	  jQuery('.osc_filtro').append(linkPreco);	  
	}
	
});