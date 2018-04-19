var mobile = 'nao';
var baseLoja = '../lojas/00020368/';
var baseId = '20368';

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	mobile = 'sim'
}


//### Guarda em variÃ¡vel a pÃ¡gina atual
var sPagAtual=document.location.href.toUpperCase();

//### funÃ§Ã£o para link no topo
function LinkTop(sTitle,sPage,sParam,sStyle){ 
  sPageM=sPage.toUpperCase();
  if(sPageM=='CADASTRO' || sPageM=='TRACK'){sURL='https://www.rumo.com.br/';sTarget='top';}else {sURL='';sTarget='window'}
  if(sPagAtual.indexOf(sPageM+'.ASP')>=0 && sPagAtual.indexOf(sParam.toUpperCase())>=0){
    document.write('<table width=100% class='+sStyle+'_On align=center OnClick='+sTarget+'.location.href="'+sURL+sPage+'.asp?IDLoja='+IDLoja+sParam+'" cellspacing=0 cellpadding=0><tr><td align=center>'+sTitle+'</td></tr></table>');}
   else{
    document.write('<table width=100% class='+sStyle+'_Off align=center OnMouseOut=this.className="'+sStyle+'_Off" OnMouseOver=this.className="'+sStyle+'_Hover" OnClick='+sTarget+'.location.href="'+sURL+sPage+'.asp?IDLoja='+IDLoja+sParam+'" cellspacing=0 cellpadding=0><tr><td align=center>'+sTitle+'</td></tr></table>');}
}

//### funÃ§Ã£o para link no rodapÃ©
function LinkPag(sTitle,sPage,sParam,sStyle){ 
  sPageM=sPage.toUpperCase();
  if(sPageM=='CADASTRO' || sPageM=='TRACK'){sURL='https://www.rumo.com.br/';sTarget=' target=_top';}else {sURL='';sTarget=''}
  var str='<a href=';
  str+=sURL+sPage+'.asp?IDLoja='+IDLoja+sParam+' class='+sStyle;
  if(sPagAtual.indexOf(sPageM+'.ASP')>=0 && sPagAtual.indexOf(sParam.toUpperCase())>=0)str +='_On';
  else str +='_Off';
  str+=sTarget+'>'+sTitle+'</a>';
  document.write(str);
}

//comprar sem sair da pagina
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  var oPos=getPos(este);
  if(oDivShowCartOnPage==null){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","DivShowCartOnPage"); 
    oDivShowCartOnPage=este.parentNode.insertBefore(oNewElement,este);
  }
  oDivShowCartOnPage.style.color="#555555";
  oDivShowCartOnPage.style.position="absolute";
  oDivShowCartOnPage.style.zIndex="88";
  oDivShowCartOnPage.style.visibility="visible";
  if(iErr==0)sBackColor="../lojas/00020368/images/bg_carrinho.png"; else sBackColor="../lojas/00020368/images/bg_carrinho.png"
  var sHTML="<div style=width:260px;height:120px;background-image:url("+sBackColor+");background-repeat:no-repeat><table width=200 height=100 cellpadding=0 cellspacing=0>";
     sHTML+="<tr><td colspan=5 align=center style='color:#ffffff;font-weight:bold;font-size:12px;font-family:arial;cursor:pointer'>PRODUTO ADICIONADO AO CARRINHO</td></tr>";
     if(iErr==0){
       sHTML+="<tr height=50>";
       sHTML+="<td width=3>&nbsp;</td>";
       sHTML+="<td align=center><a onclick=oDivShowCartOnPage.style.visibility='hidden' style=color:#444444;text-decoration:none;font-size:12px;cursor:pointer;>Continuar comprando</a></td>";
       sHTML+="<td width=3>&nbsp;</td>";
       sHTML+="<td align=center><a href='addproduto.asp?idloja="+ IDLoja +"' style=color:#444444;text-decoration:none;font-size:12px;>Finalizar o pedido</a></td>";
       sHTML+="<td align=right><img src='images/cancel_off.png' hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
       MostraDadosCesta();
     }
     else{
       sHTML+="<tr height=20>";
       sHTML+="<td colspan=5 align=center><img src='images/cancel_off.png' hspace=5 style='cursor:pointer' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
       sHTML+="</tr>";
       oDivShowCartOnPage.style.visibility="hidden";
       alert("Essa cor e tamanho não está disponível no momento.");
     }
     sHTML+="</table>";
  oDivShowCartOnPage.style.top=oPos.y;
  oDivShowCartOnPage.style.left=oPos.x;
  oDivShowCartOnPage.innerHTML=sHTML;
  iLastCartOnPage++;
  setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",12000);
}

//function FuncCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
//  if(iErr==0)MostraDadosCesta();
//}


//### FunÃ§Ã£o que valida a busca  
function VerTexto(oNome){
 if (oNome.Texto.value=='' || oNome.Texto.value.length<2){
   alert('Busca invÃ¡lida.');
   oNome.Texto.focus();
   return false;}
 else{return true;}
}

function MostraFreteGratis(iPeso){
//frete gratis
if(iPeso==0)document.write("frete");
}



function fnGetShippingValues(){

  var sCEP=document.getElementById("idZip").value;
  FCLib$.SetCookie("CEP"+FC$.IDLoja,sCEP);
  if(sCEP==""){
    document.getElementById("idShippingValues").innerHTML="<span id=idErrInformCEPFC style=color:#990000;>Informe o CEP</span>";
  }
  else{
    document.getElementById("idShippingValues").innerHTML="";
    document.getElementById("ImgLoadingCEP").style.display="";
    AjaxExecFC("/XMLShippingCEP.asp","IDLoja="+ FC$.IDLoja +"&cep="+ sCEP,false,fnprocessXMLCEP);
  }
}

var ehSP = false;
var ehNordesteNorte = false;
var ehSudeste = false;

function verificaSaoPaulo(cepCliente)
{
  ehSP = false;
  if (cepCliente)
  	{
      	cepCliente = cepCliente.replace(/-/g,'');
      	cepCliente = cepCliente.replace(/ /g,'');

  
      	if(cepCliente.length == 8 && parseInt(cepCliente) > 1000000 && parseInt(cepCliente) < 20000000)
      	{
          ehSP = true;
        }
    }
}

function verificaSudeste(cepCliente)
{
  ehSudeste = false;
  if (cepCliente)
  	{
      	cepCliente = cepCliente.replace(/-/g,'');
      	cepCliente = cepCliente.replace(/ /g,'');

  
      	if(cepCliente.length == 8 && parseInt(cepCliente) > 1000000 && parseInt(cepCliente) < 40000000)
      	{
          ehSudeste = true;
        }
    }
}

function verificaNordesteNorte(cepCliente)
{
  ehNordesteNorte = false;
  if (cepCliente)
  	{
      	cepCliente = cepCliente.replace(/-/g,'');
      	cepCliente = cepCliente.replace(/ /g,'');

  
      	if(cepCliente.length == 8 && ((parseInt(cepCliente) >= 40000000 && parseInt(cepCliente) < 70000000) || (parseInt(cepCliente) >= 76800000 && parseInt(cepCliente) < 78000000)))
      	{
          ehNordesteNorte = true;
        }
    }
}

function fnprocessXMLCEP(obj){

  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues");
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display="none";
    oShippingValues.innerHTML="<span id=idErrXMLCEPFC style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  
  verificaSaoPaulo(document.getElementById("idZip").value);
  verificaNordesteNorte(document.getElementById("idZip").value);
  
  var valorCesta = document.getElementById("ValorItensCesta").innerHTML;
  valorCesta = valorCesta.replace('R$ ','');
  valorCesta = valorCesta.replace('.','');
  valorCesta = valorCesta.replace(',','.');
  
  
  
  
  
  
  oShippingValues.innerHTML="";
  sShipping+="<table border=0 cellpadding=5>";
  
  
  if (parseInt(valorCesta) < 199 && ehNordesteNorte == true)
  {
    
      //var valorFaltante = 250.0 - parseFloat(valorCesta);
    //valorFaltante = valorFaltante.toString().replace('.',',');
    sShipping+="<tr bgcolor='#fff5d5' color='#976b00' style='line-height:1.5;'><td align='center' colspan='4' style='border-bottom:8px solid #FFFFFF;'>Em compras acima de <strong>R$ 199,00</strong> seu frete é <strong>GRÁTIS!</strong> <a href='http://www.bebefofuxo.com.br'>Clique aqui para comprar mais</a></td></tr>";
  }
  if (parseInt(valorCesta) < 99 && ehSP == true)
  {
    
      //var valorFaltante = 250.0 - parseFloat(valorCesta);
    //valorFaltante = valorFaltante.toString().replace('.',',');
    sShipping+="<tr bgcolor='#fff5d5' color='#976b00' style='line-height:1.5;'><td align='center' colspan='4' style='border-bottom:8px solid #FFFFFF;'>Em compras acima de <strong>R$ 99,00</strong> seu frete é <strong>GRÁTIS!</strong> <a href='http://www.bebefofuxo.com.br'>Clique aqui para comprar mais</a></td></tr>";
  }
  else if (parseInt(valorCesta) < 150 && ehSP == false && ehNordesteNorte == false)
  {
      //var valorFaltante = 150.0 - parseFloat(valorCesta);
      //valorFaltante = valorFaltante.toString().replace('.',',');
      sShipping+="<tr bgcolor='#fff5d5' color='#976b00' style='line-height:1.5;'><td align='center' colspan='4' style='border-bottom:8px solid #FFFFFF;'>Em compras acima de <strong>R$ 150,00</strong> seu frete é <strong>GRÁTIS!</strong> <a href='http://www.bebefofuxo.com.br'>Clique aqui para comprar mais</a></td></tr>";
    
  }
  
  var iOpt=ReadXMLNode(obj,"OptQt");
  
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptValue=ReadXMLNode(obj,"Opt"+ i +"Value");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    if(OptImage==null)sImageFreight="";else sImageFreight="<img src='"+ OptImage +"' id=idZipImageFC>";
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    if(OptObs==null)sOptObs="";else sOptObs=OptObs;
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete=="R$ 0,00")sValorFrete="FRETE GRÁTIS";
    
    var nomeServico = ReadXMLNode(obj,"Opt"+ i +"Name");
    var qtdeExtraDias = 0;
    
    if (nomeServico == "Encomenda PAC")
    {
        qtdeExtraDias = 3;
    }
    else
    {
        qtdeExtraDias = 3;
    }
    
    var prazo = ReadXMLNode(obj,"Opt"+ i +"Obs");
    
    
    //apagar prazo manual
    var n = prazo.indexOf("(");
    var m = prazo.indexOf(")");
    prazo = prazo.replace(prazo.substring(n, m+1), "");
    
    
    n = prazo.indexOf("(");
    m = prazo.indexOf(")");
    if (m == -1 || n == -1)
    {
    	var textoFinal = ReadXMLNode(obj,"Opt"+ i +"Obs");
      	if (textoFinal != "Frete Gratuito")
        {
            //textoFinal = prazo + "(área com entrega restrita)";
          textoFinal = prazo + "(12 dias úteis)";
        }
    }
    else
    {
    	var semParenteses = prazo.substring(n+1, m);
    	var array = semParenteses.split(" ");
    	var dias = parseInt(array[0]) + qtdeExtraDias;
    	var diasUteis = "("+dias+" dias úteis)";
    	n = prazo.indexOf("(");
    	m = prazo.indexOf(")");
    	prazo = prazo.replace(prazo.substring(n, m+1), "");
    	var textoFinal = prazo + diasUteis;
    }
    
    
    //sOptObs saiu e foi colocado textoFinal
    sShipping+="<tr><td valign=top class='ZipImage'>"+ sImageFreight +"</td><td valign=top><span class='ZipName'>"+ OptName +"</span><br><span class='ZipObsVal'>"+ textoFinal +"</span></td><td>&nbsp; </td><td nowrap valign=top class='ZipValue'>"+ OptValue +"</td></tr>";
  }
  sShipping+="</table>";
  oShippingValues.innerHTML=sShipping;
  oShippingValues.style.display="block";
  document.getElementById("ImgLoadingCEP").style.display="none";
}