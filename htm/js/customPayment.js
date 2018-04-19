jQuery(window).load(function(){

var sPag=document.location.href.toUpperCase();

if(sPag.indexOf("CIELOONLINE.ASP")>=0 || sPag.indexOf("CIAREDIR.ASP")>=0) {

  var elemTitulo = document.getElementById('idDadosPagtoTitFC').querySelector(".EstTabTopo");
  $('.InputText').each(function(index, element) {
  
    this.style.height = "25px";
    this.style.fontFamily= "Arial";
    this.style.fontSize = "12px";
    this.style.color = "black";
    this.style.padding = "4px";
    this.onpaste = function(){alert("Digite os dados ao invés de colar.");return false};
    this.onpaste = function(){alert("Digite os dados ao invés de colar.");return false};
    this.onpaste = function(){alert("Digite os dados ao invés de colar.");return false};
    
  });
  
  document.getElementById('EnviaCardCIL').value = "CONCLUIR PAGAMENTO";
  
  
  var logoCielo = document.createElement('img');
  logoCielo.style.height = "18px";
  logoCielo.style.width = "53px";
  logoCielo.style.margin = "0px 6px 0px";
  logoCielo.src = "../lojas/00020368/images/logoCielo.png";
  logoCielo.style.float = "right";
  
  elemTitulo.appendChild(logoCielo);
  
  
}
  
});