var FC_posIDProduto=0;
var FC_posEstoque=2;
var FC_posIniDescritor=9;
var FC_QtdDescritores=2;  //numero de descritores - mudar caso queira utilizar o terceiro
var SeparadorRGBCor="|";

function alertaEscolha() {
 document.getElementById('alerta').style.display="block";
}

function FC_fDistintos(aDados,iCampo,aDistintos){
  for(var i=0;i<aDados.length;i++){
    var j=0,JaTem=false;
    while(j<aDistintos.length && !JaTem){
      JaTem=(aDistintos[j]==aDados[i][iCampo]);
      j++;
    }
    if(!JaTem)aDistintos[aDistintos.length]=aDados[i][iCampo];
  }
}

function FC_fExisteDescritor(aDados,iCampo,ValorCampo,iCampoDisp,aValoresDisp){
  for(var i=0;i<aDados.length;i++){   
    if(aDados[i][iCampo]==ValorCampo)aValoresDisp[aValoresDisp.length]=aDados[i][iCampoDisp];
  
  }
}

function FC_fSubProdSelec(IDProduto,aDados,aDistintos){

  var aSelecionados=new Array();
  FC_fSelecionados(IDProduto,aDistintos,FC_QtdDescritores,aSelecionados);

  var i=0,j=0,AcheiSubProd=false;
  while(!AcheiSubProd && i<aDados.length){
    j=ObtemNivelSeguinte(aDistintos,-1);
    var bComparador=true;
    while(bComparador && j!=-1){
      bComparador=(bComparador && aDados[i][j+FC_posIniDescritor]==aSelecionados[j]);
      if(bComparador){j=ObtemNivelSeguinte(aDistintos,j);}
    }
    if(bComparador)AcheiSubProd=true;
    if(!AcheiSubProd)i++;
  }
  if(AcheiSubProd){
    this.IDSubProduto=aDados[i][FC_posIDProduto];
    this.iEstoque=aDados[i][FC_posEstoque];
    this.Cor=aDados[i][FC_posIniDescritor];
    this.Adicional1=aDados[i][FC_posIniDescritor+1];
    this.Adicional2=aDados[i][FC_posIniDescritor+2];
    this.Adicional3=aDados[i][FC_posIniDescritor+3];
    this.AdicionalD1=aDados[i][FC_posIniDescritor+4];
    this.AdicionalD2=aDados[i][FC_posIniDescritor+5];
    this.AdicionalD3=aDados[i][FC_posIniDescritor+6];
    this.PrecoOri=aDados[i][3];
    this.PrecoNum=aDados[i][4];
  
  }
  this.Existe=AcheiSubProd;
}

function FC_fRedefineOpcoes(IDProduto,aDados,aDistintos,iCampo,ValorCampo){
  
  //Marca o selecionado e desmarca os demais
  for(var j=0;j<aDistintos[iCampo].length;j++){   
    FC_Option=document.getElementById("FC_idOpcao_"+ iCampo +"_"+ j +"_"+ IDProduto);
    if(aDistintos[iCampo][j]!=ValorCampo){
      FC_Option.style.borderWidth='1px';
      FC_Option.style.borderStyle='solid';
      FC_Option.style.borderColor='#ccc';
      //FC_Option.style.backgroundImage = 'none';
    }
    else{
      FC_Option.style.borderWidth='1px';
      FC_Option.style.borderStyle='solid';
      FC_Option.style.borderColor='#FE2337';
      //FC_Option.style.backgroundImage='url("../lojas/00011498/images/layout/macaelemento.png")';
    } 
  }

  //Se for cor, altera a foto do produto caso tenha
  if((iCampo==0 || iCampo==2) && aDados.length>1){
    var i=0,j=0,AcheiFotoProd=false;
if(iCampo==0)
{
while(!AcheiFotoProd && i<aDados.length){
        AcheiFotoProd=(aDados[i][FC_posIniDescritor]==ValorCampo);
        i++;

      }
}
else if(iCampo==2)
{
while(!AcheiFotoProd && i<aDados.length){
        AcheiFotoProd=(aDados[i][FC_posIniDescritor+2]==ValorCampo);
        i++;

      }
}
    


    if(bDet){var sSrcFoto=aDados[i-1][8];var sSrcFotoA=aDados[i-1][8]} else{var sSrcFoto=aDados[i-1][6]} 
   
    var fcpdet  = sSrcFotoA;
  var fcpdet2jpg = fcpdet.replace(/.jpg/gi, "_2.jpg");
  var fcpdet3jpg = fcpdet.replace(/.jpg/gi, "_3.jpg");  
    var fcpdet2png = fcpdet2jpg.replace(/.png/gi, "_2.png");
  var fcpdet3png = fcpdet3jpg.replace(/.png/gi, "_3.png");
    var fcpdet2 = fcpdet2png.replace(/.gif/gi, "_2.gif");
  var fcpdet3 = fcpdet3png.replace(/.gif/gi, "_3.gif");
   
    if(sSrcFotoA!='')document.getElementById('thumbos').src=sSrcFotoA; //Altera a foto do ZOOM de acordo com o produto
  if(sSrcFoto!='')document.getElementById("imageos").src=sSrcFotoA;
  if(sSrcFotoA!='')document.getElementById("os_imglight").href=sSrcFotoA;
  if(sSrcFotoA!='' && document.getElementById("mfoto1"))document.getElementById("mfoto1").src=sSrcFotoA;
  if(sSrcFotoA!='' && document.getElementById("mfoto2"))document.getElementById("mfoto2").src=fcpdet2;
  if(sSrcFotoA!='' && document.getElementById("mfoto3"))document.getElementById("mfoto3").src=fcpdet3;
  
  if(sSrcFotoA!='')pdet=fcpdet;
  if(sSrcFotoA!='')pdet2=fcpdet2;
  if(sSrcFotoA!='')pdet3=fcpdet3;
  }

    //Mostra cor e tamanho - linha 106 personaliza descritores conforme a loja, caso altere o nome da div, precisa alterar a linha 357
   if(iCampo==0){
    var aNomeRGB=ValorCampo.split(SeparadorRGBCor);
    var sNomeCor=aNomeRGB[0];
    var sRGBCor=aNomeRGB[1];
  sNomeCor_os = sNomeCor.replace(/_/gi, "+");
    document.getElementById('CorProduto').innerHTML="<b>Cor:</b> "+sNomeCor_os+"&nbsp;&nbsp;";    
    document.getElementById('Campo1').innerHTML="";
  document.getElementById('Campo2').innerHTML='';
  document.getElementById('Campo3').innerHTML='';
  document.getElementById('Campo4').innerHTML='';

    
  document.getElementById('Campo5').innerHTML='';
  document.getElementById('Campo6').innerHTML='';

   }
   else if(iCampo==1){
    document.getElementById('Campo1').innerHTML="<b>Tamanho:</b> "+ValorCampo+"&nbsp;&nbsp;";
   }
   else if(iCampo==2){
    document.getElementById('Campo2').innerHTML="<b>Gênero:</b> "+ValorCampo+"&nbsp;";
   }
   else if(iCampo==3){
    document.getElementById('Campo3').innerHTML="/ "+ValorCampo+"&nbsp;";
   }
    else if(iCampo==4){
    document.getElementById('Campo4').innerHTML="/ "+ValorCampo+"&nbsp;";
   }
    else if(iCampo==5){
    document.getElementById('Campo5').innerHTML="/ "+ValorCampo+"&nbsp;";
   }
    else if(iCampo==6){
    document.getElementById('Campo6').innerHTML="/ "+ValorCampo+"&nbsp;";
   }


  var NivelSeguinte=ObtemNivelSeguinte(aDistintos,iCampo);
  if(NivelSeguinte!=-1){  
    document.getElementById("FC_idNivel_"+ NivelSeguinte +"_"+ IDProduto).className="NivelOn";
    for(var j=0;j<aDistintos[NivelSeguinte].length;j++){  
      if(aDistintos[NivelSeguinte][j]!=''){
        var bExisteOpcao=FC_fExisteOpcao(IDProduto,aDados,aDistintos,NivelSeguinte,j);

        FC_Option=document.getElementById("FC_idOpcao_"+ NivelSeguinte +"_"+ j +"_"+ IDProduto);  
        if(bExisteOpcao){FC_Option.style.backgroundColor='#ccc';}
        else{FC_Option.style.backgroundColor='#fff';}

        document.getElementById("FC_oOpcao_"+ NivelSeguinte +"_"+ j +"_"+ IDProduto).disabled=bExisteOpcao;
        document.getElementById("FC_idOpcao_"+ NivelSeguinte +"_"+ j +"_"+ IDProduto).className='estOpcao'+!bExisteOpcao;
        document.getElementById("FC_oOpcao_"+ NivelSeguinte +"_"+ j +"_"+ IDProduto).checked=false;

        FC_Option=document.getElementById("FC_idOpcao_"+ NivelSeguinte +"_"+ j +"_"+ IDProduto);   
        FC_Option.style.borderWidth='1px';
        FC_Option.style.borderStyle='solid';
        FC_Option.style.borderColor='#ccc';
        //FC_Option.style.backgroundImage = 'none';
      }
    }   
    for(var i=NivelSeguinte+1;i<FC_QtdDescritores;i++){  
      document.getElementById("FC_idNivel_"+ i +"_"+ IDProduto).className="NivelOff";
      for(var j=0;j<aDistintos[i].length;j++){ 
        if(aDistintos[i][j]!=''){
          document.getElementById("FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto).disabled=true;
          document.getElementById("FC_idOpcao_"+ i +"_"+ j +"_"+ IDProduto).className='estOpcaotrue';
          document.getElementById("FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto).checked=false;
        }
      }   
    }
  }
  var oBotao=document.getElementById("FC_oBotao_"+ IDProduto);
  if(NivelSeguinte==-1){ 
    var oSubProd=new FC_fSubProdSelec(IDProduto,aDados,aDistintos);
    if(oSubProd.Existe){

       bSubProdSemPreco=false;
      
      if(oSubProd.PrecoNum==0 && oSubProd.PrecoOri==0){
        bSubProdSemPreco=true;
        document.getElementById('PrecoProdPrinc').innerHTML="<span class=EstPrecoProdCapa>sem preco neste item</span>";
        oBotao.style.backgroundImage="url('"+sCaminhoImagens+"botgridconsultenos.png')";
        oBotao.onclick=new Function('FC_ConsultenosSubProd("'+ oSubProd.IDSubProduto +'","'+oSubProd.Cor+'","'+oSubProd.Adicional1+'","'+oSubProd.Adicional2+'","'+oSubProd.Adicional3+'","'+oSubProd.AdicionalD1+'","'+oSubProd.AdicionalD2+'","'+oSubProd.AdicionalD3+'");');
      }

      if(!bSubProdSemPreco){
        
        if(oSubProd.PrecoNum!=oSubProd.PrecoOri)
    {     
      //document.getElementById('PrecoProdPrinc').innerHTML="de <strike>"+FormatPrice(oSubProd.PrecoOri,'R$')+"</strike> por <b>"+FormatPrice(oSubProd.PrecoNum,'R$')+"</b><br><span class=os_Parcelas>"+oSubProd.PrecoOri/5+"<span>";         
      document.getElementById('PrecoProdPrinc').innerHTML="de <strike>"+FormatPrice(oSubProd.PrecoOri,'R$')+"</strike> por <b>"+FormatPrice(oSubProd.PrecoNum,'R$')+"</b>";     
         }
         else
     {        
           document.getElementById('PrecoProdPrinc').innerHTML="<b>"+FormatPrice(oSubProd.PrecoNum,'R$')+"</b>";
       
         }

        if(oSubProd.iEstoque>0){
      document.getElementById('alertaEsconde').style.display="none";
      document.getElementById('alerta').style.display="none";
          oBotao.style.backgroundImage="url('"+sCaminhoImagens+"botgridcomprar.png')";
          oBotao.onclick=new Function('FC_CompraSubProd("'+ oSubProd.IDSubProduto +'","'+oSubProd.Cor+'","'+oSubProd.Adicional1+'","'+oSubProd.Adicional2+'","'+oSubProd.Adicional3+'","'+oSubProd.AdicionalD1+'","'+oSubProd.AdicionalD2+'","'+oSubProd.AdicionalD3+'","'+ IDProduto +'");');  //Função para comprar o produto
        }
        else{
          
          oBotao.style.backgroundImage="url('"+sCaminhoImagens+"botgridesgotado.png')";
      document.getElementById('alerta').style.display="none";
      document.getElementById('alertaEsconde').style.display="none";
          oBotao.onclick=new Function('MostraDispCaptcha('+IDLojaNum+',"'+oSubProd.IDSubProduto+'");'); 
        }

      }
      oBotao.disabled=false;
      
    }
    else{
      oBotao.value="";  
      oBotao.disabled=true;
      oBotao.onclick=null;
    document.getElementById('alertaEsconde').style.display="block";
    }
  }
  else{   

    
    if(PrecoProdPaiNum!=PrecoProdPaiOri){
     document.getElementById('PrecoProdPrinc').innerHTML="de <strike>"+FormatPrice(PrecoProdPaiOri,'R$')+"</strike> por <b>"+FormatPrice(PrecoProdPaiNum,'R$')+"</b>";
     }
     else{
     document.getElementById('PrecoProdPrinc').innerHTML="<b>"+FormatPrice(PrecoProdPaiNum,'R$')+"</b>";
     }

    
    oBotao.style.backgroundImage="url('"+sCaminhoImagens+"botgridselecione.png')";
    oBotao.disabled=false;
    oBotao.onclick=null;
  document.getElementById('alertaEsconde').style.display="block";
  }
}

function FC_CompraSubProd(IDSubProd,Cor,Adicional1,Adicional2,Adicional3,AdicionalD1,AdicionalD2,AdicionalD3,IDProduto){

  /*
console.log("IDSubProd: " + IDSubProd);
console.log("Cor: " + Cor);
console.log("Adicional1: "+Adicional1);
console.log("Adicional2: "+Adicional2);
console.log("Adicional3: "+Adicional3);
console.log("AdicionalD1: "+AdicionalD1);
console.log("AdicionalD2: "+AdicionalD2);
console.log("AdicionalD3: "+AdicionalD3);
console.log("IDProduto: "+IDProduto);
*/

  var aNomeRGB=Cor.split(SeparadorRGBCor);
  var sNomeCor=aNomeRGB[0];
  var sParamsProd='&QTIncMult_'+IDSubProd+'=1';
  if(sNomeCor!='')sParamsProd+='&Cor_'+ IDSubProd +'='+ Encoder.htmlDecode(sNomeCor).replace(/\+/g,'%2B');
  if(Adicional1!='')sParamsProd+='&Adicional1_'+ IDSubProd +'='+ Encoder.htmlEncode(Adicional1);
  if(Adicional2!='')sParamsProd+='&Adicional2_'+ IDSubProd +'='+ Encoder.htmlEncode(Adicional2);
  if(Adicional3!='')sParamsProd+='&Adicional3_'+ IDSubProd +'='+ Encoder.htmlEncode(Adicional3);
  if(AdicionalD1!='')sParamsProd+='&AdicionalD1_'+ IDSubProd +'='+ Encoder.htmlEncode(AdicionalD1);
  if(AdicionalD2!='')sParamsProd+='&AdicionalD2_'+ IDSubProd +'='+ Encoder.htmlEncode(AdicionalD2);
  if(AdicionalD3!='')sParamsProd+='&AdicionalD3_'+ IDSubProd +'='+ Encoder.htmlEncode(AdicionalD3);
  var oBot=document.getElementById("FC_oBotao_"+ IDProduto);
  AjaxExecFC("/addmult.asp","IDLoja="+ IDLojaGrid +"&xml=1"+sParamsProd,true,processXMLAddMult,IDLojaGrid,oBot,sParamsProd);
  //top.location.href=sURLCompra;
  
   
  var sacola = "";
  var qtdeItensSacola = document.getElementById("QtdItensCesta").innerHTML;
  
  if (qtdeItensSacola != "0")
  {
    sacola = localStorage.getItem("sacola");
  }

  var fotoProduto = $(".os_imgDetalhes #thumbos").attr('src');
  fotoProduto = fotoProduto.replace('..','https://www.bebefofuxo.com.br');
  //console.log(fotoProduto);
  var descProduto = $( ".descHtml" ).text();
  descProduto = descProduto.replace('\n','');
  descProduto = descProduto.replace('\n','');
  descProduto = descProduto.replace('Nas cores azul e turquesa serão estampas com temas masculinos. Na cor rosa serão estampas com temas femininos. Nas cores branco, creme e verde, escolha a opção entre feminino e masculino para definir o tema da estampa.','');
  
  
  
  
  sacola += IDProduto + ";" + fotoProduto + ";" + $( ".osp_name" ).text() + ";" + descProduto + ";" + $( ".osp_price b" ).text() + ";" + window.location.href + "|";
  localStorage.setItem("sacola",sacola);
  
  //console.log(sacola);

  
//console.log("IDLojaGrid: "+IDLojaGrid);
//console.log("sParamsProd: "+sParamsProd);
//console.log("oBot: "+oBot);
  
  //pixel reclamou que foi acionado duas vezes na mesma página
  //fbq('track', 'AddToCart');


}


function FC_ConsultenosSubProd(IDSubProd,Cor,Adicional1,Adicional2,Adicional3,AdicionalD1,AdicionalD2,AdicionalD3){
  var aNomeRGB=Cor.split(SeparadorRGBCor);
  var sNomeCor=aNomeRGB[0];
  var sURLConsultenos='FaleConosco.asp?IDLoja='+IDLojaGrid+'&Assunto=Consulta%20sobre%20produto('+ IDSubProd +') ';
  
  if(sNomeCor!='')sURLConsultenos+=' Cor='+ Encoder.htmlDecode(sNomeCor).replace(/\+/g,'%2B');
  if(Adicional1!='')sURLConsultenos+=' '+ Encoder.htmlDecode(Adicional1);
  if(Adicional2!='')sURLConsultenos+=' '+ Encoder.htmlDecode(Adicional2);
  if(Adicional3!='')sURLConsultenos+=' '+ Encoder.htmlDecode(Adicional3);
  if(AdicionalD1!='')sURLConsultenos+=' '+ Encoder.htmlDecode(AdicionalD1);
  if(AdicionalD2!='')sURLConsultenos+=' '+ Encoder.htmlDecode(AdicionalD2);
  if(AdicionalD3!='')sURLConsultenos+=' '+ Encoder.htmlDecode(AdicionalD3);  
  top.location.href=sURLConsultenos;
}

function FC_fExisteOpcao(IDProduto,aDados,aDistintos,iNivel,iOpcao){

  var aSelecionados=new Array();
  FC_fSelecionados(IDProduto,aDistintos,iNivel,aSelecionados);
  aSelecionados[aSelecionados.length]=aDistintos[iNivel][iOpcao];

  var i=0,j=0,AcheiSubProd=false;
  while(!AcheiSubProd && i<aDados.length){
    j=ObtemNivelSeguinte(aDistintos,-1);
    var bComparador=true;
    while(bComparador && j!=-1 && j<aSelecionados.length){
      bComparador=(bComparador && aDados[i][j+FC_posIniDescritor]==aSelecionados[j]);
//alert(aDados[i][j+FC_posIniDescritor]+"="+aSelecionados[j]);
      if(bComparador)j=ObtemNivelSeguinte(aDistintos,j);
    }
    if(bComparador)AcheiSubProd=true;
    if(!AcheiSubProd)i++;
  }
  return !AcheiSubProd;
}

function FC_fSelecionados(IDProduto,aDistintos,iNivel,aSelecionados){

  for(var i=0;i<iNivel;i++){
    if(!FC_fIsVazio(aDistintos[i])){
      for(var j=0;j<aDistintos[i].length;j++){
        if(aDistintos[i][j]!=''){
          if(document.getElementById("FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto).checked){
            aSelecionados[aSelecionados.length]=aDistintos[i][j];
          }
        }
      }
    }
    else {
      aSelecionados[aSelecionados.length]='';
    }
  }
}

function ObtemNivelSeguinte(aDistintos,iCampo){

  var i=iCampo+1,IsBranco=true;
  while(i<aDistintos.length && IsBranco){
    IsBranco=(FC_fIsVazio(aDistintos[i]));
    if(IsBranco)i++;
  }
  if(IsBranco)return -1;
  else return i;
}

function FC_fIsVazio(aValores){
  var i=0,IsVazio=true;
  while(IsVazio && i<aValores.length){
    IsVazio=(aValores[i]=='');
    if(IsVazio)i++;
  }
  return IsVazio;
}
//=================================== ORDENAR POR ESTOQUE
function ordenarPorEstoque(produtos)
{
  
  var corAnalisada = "";
  var valorSomadoDaCor = 0;
  var tamanhosZerados = 0;
  
  //console.log(produtos);
  
  var qtdeTamanhosArray = new Array();
  var coresArray = new Array();
  
  //descrobrir quantidade de tamanhos do modelo
  //descorbrir as cores do modelo
  for(var tt = 0; tt < produtos.length;tt++)
  {
    var tam = produtos[tt][10];
    var cor = produtos[tt][9];
    
    //tamanho
    var tamanhoRegistrado = false;
    
    for(var uu = 0; uu < qtdeTamanhosArray.length;uu++)
    {
		if (tam == qtdeTamanhosArray[uu])
        {
        	  tamanhoRegistrado = true;
        }
    }
    
    if (tamanhoRegistrado == false)
    {
        qtdeTamanhosArray[qtdeTamanhosArray.length] = tam;
    }
    
    
    //cor
    
    var corRegistrada = false;
    
    for(var uu = 0; uu < coresArray.length;uu++)
    {
		if (cor == coresArray[uu])
        {
        	  corRegistrada = true;
        }
    }
    
    if (corRegistrada == false)
    {
        coresArray[coresArray.length] = cor;
    }
    
    
  }
  
  //console.log(qtdeTamanhosArray.length);
  //console.log(coresArray);
  
  //ordenar produtos por cor, mantendo a ordem dos tamanhos
  var produtosOrdenadosCor = new Array();
  
  for (var w = 0; w < coresArray.length; w++)
  {
      var nomeCor = coresArray[w];
    
      var somaTrans = 0;
      for (var y = 0; y < produtos.length; y++)
      {
         if (produtos[y][9] == nomeCor)
         {
           produtosOrdenadosCor[produtosOrdenadosCor.length] = produtos[y];
           somaTrans++;
           
           if(somaTrans == qtdeTamanhosArray.length) break;
         }
      }
    
    
  }
  
  //console.log(produtosOrdenadosCor);
  
  var somaEstoqueCor = new Array();
  
  for(var z = 0; z < produtosOrdenadosCor.length;z++)
  {
    if (corAnalisada != produtosOrdenadosCor[z][9])
    {
      if (z > 0)
      {
        var tamanho = somaEstoqueCor.length;
        somaEstoqueCor[tamanho] = new Array();
        //guardar cor anterior
        somaEstoqueCor[tamanho][0] = corAnalisada;
        somaEstoqueCor[tamanho][1] = valorSomadoDaCor;
        somaEstoqueCor[tamanho][2] = tamanhosZerados;
        valorSomadoDaCor = 0;
        tamanhosZerados = 0;
      }
      
    }
    
    if (produtosOrdenadosCor[z][2] == 0)
    {
        tamanhosZerados++;
    }
    valorSomadoDaCor = valorSomadoDaCor + produtosOrdenadosCor[z][2];
    
    //console.log(corAnalisada);
    //console.log(valorSomadoDaCor);
    
    corAnalisada = produtosOrdenadosCor[z][9];
    
    if (z == produtosOrdenadosCor.length - 1)
    {
      	var tamanho = somaEstoqueCor.length;
        somaEstoqueCor[tamanho] = new Array();
        //guardar cor anterior
        somaEstoqueCor[tamanho][0] = corAnalisada;
        somaEstoqueCor[tamanho][1] = valorSomadoDaCor;
        somaEstoqueCor[tamanho][2] = tamanhosZerados;
        valorSomadoDaCor = 0;
        tamanhosZerados = 0;
    }
  }
  
  somaEstoqueCor.sort(ordenacaoEstoqueZerado);
  console.log(somaEstoqueCor);
  
  
  var produtosOrdenadosEstoque = new Array();
  
  for (var w = 0; w < somaEstoqueCor.length; w++)
  {
      var nomeCor = somaEstoqueCor[w][0];
    
      var somaTrans = 0;
      for (var y = 0; y < produtos.length; y++)
      {
         if (produtos[y][9] == nomeCor)
         {
           produtosOrdenadosEstoque[produtosOrdenadosEstoque.length] = produtos[y];
           somaTrans++;
           
           if(somaTrans == qtdeTamanhosArray.length) break;
         }
      }
    
    
  }
  
  //console.log(produtosOrdenadosEstoque);
  
  return produtosOrdenadosEstoque;
  
  
  /*
  var corAnalisada = "";
  valorSomadoDaCor = 0;
  
  var qtdeTamanhosArray = new Array();
  
  //percorrer o array de subprodutos para descobrir a quantidade total de tamanhos desse modelo
  for(var tt = 0; tt < produtos.length;tt++)
  {
    var tam = produtos[tt][10];
    var tamanhoRegistrado = false;
    
    for(var uu = 0; uu < qtdeTamanhosArray.length;uu++)
    {
		if (tam == qtdeTamanhosArray[uu])
        {
        	  tamanhoRegistrado = true;
        }
    }
    
    if (tamanhoRegistrado == false)
    {
        qtdeTamanhosArray[qtdeTamanhosArray.length] = tam;
    }
    
    
  }
  
  produtos.sort(ordenacaoCor);
  console.log(produtos);
  
  return produtos;
  */
}


function ordenacaoEstoqueZerado(p,s)
{
  if (p[2] < s [2])
  {
      return - 1;
  }
  else if (p[2] == s [2])
  {
      if (p[1] > s [1])
      {
          return - 1;
      }
      else
      {
          return 1;
      }
  }
  else
  {
     return 1; 
  }
}

function ordenacao(p,s)
{
  if (p[1] > s [1])
  {
      return - 1;
  }
  else
  {
      return 1;
  }
  
  return 0;
}

function ordenacaoCor(p,s)
{
  if (p[9] > s [9])
  {
      return - 1;
  }
  else
  {
      return 1;
  }
  
  return 0;
}


function FC_fInitProd(IDProduto){

  fbq('track', 'ViewContent');
  
  
  
  var FC_aProduto=new Array();
  for(var i=0;i<FC_aSubProd.length;i++)FC_aProduto=FC_aProduto.concat(FC_aSubProd[i]);
  eval("FC_aProduto_"+ IDProduto +"=FC_aProduto");

  FC_aProduto = ordenarPorEstoque(FC_aProduto);
  
  var aDistintos=new Array();
  for(var i=0;i<FC_QtdDescritores;i++){
    var aTemp=new Array();
    FC_fDistintos(FC_aProduto,FC_posIniDescritor+i,aTemp);
    aDistintos=aDistintos.concat([aTemp]);
  }
  eval("FC_aDistintos_"+ IDProduto +"=aDistintos");
  
  var NivelSeguinte=ObtemNivelSeguinte(aDistintos,-1);  
  if(NivelSeguinte==-1)return void(0); 
  else document.write("<form name=FC_oForm_"+ IDProduto +">");
  
  
  for(var i=0;i<FC_QtdDescritores;i++){
    if(i==NivelSeguinte){FC_sClass="NivelOn";var sDisabled="";}
    else{FC_sClass="NivelOff";var sDisabled="";}
  if (i==0) {titdesc="Selecione uma Cor:";}
  if (i==1) {titdesc="Selecione um Tamanho:";}
  if (i==2) {titdesc="Selecione um Gênero:";}
  if (i==3) {titdesc="Selecione:";}
  if (i==4) {titdesc="Selecione:";}
  if (i==5) {titdesc="Selecione:";}
  if (i==6) {titdesc="Selecione:";}
    document.write("<table id=t"+ i +" border=0 cellspacing=0 cellpadding=0><tr><td><div id=FC_idNivel_"+ i +"_"+ IDProduto +" class="+ FC_sClass +"><span class=titGride>"+ titdesc +"</span>");

     //tentativa de carregar foto para quando é um unico produto
     if (FC_aSubProd.length == 1)
     {
   
       var detalhesProduto = FC_aSubProd[0];
       var sSrcFoto = detalhesProduto[0][8];
       var sSrcFotoA = detalhesProduto[0][8];
       
       var fcpdet  = sSrcFotoA;
     var fcpdet2jpg = fcpdet.replace(/.jpg/gi, "_2.jpg");
     var fcpdet3jpg = fcpdet.replace(/.jpg/gi, "_3.jpg"); 
       var fcpdet2png = fcpdet2jpg.replace(/.png/gi, "_2.png");
     var fcpdet3png = fcpdet3jpg.replace(/.png/gi, "_3.png");
       var fcpdet2 = fcpdet2png.replace(/.gif/gi, "_2.gif");
     var fcpdet3 = fcpdet3png.replace(/.gif/gi, "_3.gif");
   
       if(sSrcFotoA!='')document.getElementById('thumbos').src=sSrcFotoA; //Altera a foto do ZOOM de acordo com o produto
     if(sSrcFoto!='')document.getElementById("imageos").src=sSrcFotoA;
     if(sSrcFotoA!='')document.getElementById("os_imglight").href=sSrcFotoA;
     
     if(sSrcFotoA!='' && document.getElementById("mfoto1"))document.getElementById("mfoto1").src=sSrcFotoA;
     if(sSrcFotoA!='' && document.getElementById("mfoto2"))document.getElementById("mfoto2").src=fcpdet2;
     if(sSrcFotoA!='' && document.getElementById("mfoto3"))document.getElementById("mfoto3").src=fcpdet3;
  
     if(sSrcFotoA!='')pdet=fcpdet;
     if(sSrcFotoA!='')pdet2=fcpdet2;
     if(sSrcFotoA!='')pdet3=fcpdet3;
     }
     
     
    if(aDistintos[i].length>0){
      for(var j=0;j<aDistintos[i].length;j++){
        
        if(i==0){  
          var aNomeRGB=aDistintos[i][j].split(SeparadorRGBCor);
          sValor="&nbsp;";
          cFundo = sCaminhoProds+"cores/"+aNomeRGB[0]+".gif";   
          classe="width:30px;height:30px;padding:0;background:url("+cFundo+") no-repeat center center";
        }
        else{
      sValor=aDistintos[i][j];
      cFundo = "#fff";
      classe="width:auto;padding-left:9px;padding-right:9px;padding-top:6px;padding-bottom:6px;background:"+cFundo+"";
    }
        if(aDistintos[i][j]!=''){
      
      document.write("<input type=radio class=os_radio name=FC_oOpcao_"+ i +"_"+ IDProduto +" id=FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto +" value="+aDistintos[i][j]+" onclick='FC_fRedefineOpcoes("+ IDProduto +",FC_aProduto_"+ IDProduto +",FC_aDistintos_"+ IDProduto +","+i+",this.value);'"+ sDisabled +"><label class=FC_Opcao for=FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto +" id=FC_idOpcao_"+ i +"_"+ j +"_"+ IDProduto +" style="+classe+">"+ sValor +"</label>");
          setTimeout("document.getElementById('FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto+"').checked=false",1);  //desmarca IE
          if(sDisabled!="")document.getElementById("FC_oOpcao_"+ i +"_"+ j +"_"+ IDProduto).disabled=true;         
        } else { 
       ptor = "t"+i;
       document.getElementById(ptor).style.display='none';       
       }
        
      }
      //if(!FC_fIsVazio(aDistintos[i]))document.write("<hr>");
    }
    //document.write("</ul></div></td></tr></table>");
  document.write("</div></td></tr></table>");
  }
  document.write("<div class='gradeComprar' style='position:relative' id=EstTabBotComprar><div class='gradeComprarDados' onClick='alertaEscolha();' id=alertaEsconde></div><span id=CorProduto></span><span id=Campo1></span><span id=Campo2></span><span id=Campo3></span><span id=Campo4></span><span id=Campo5></span><span id=Campo6></span><br><input type=button class=BotComprarGrid name=FC_oBotao_"+ IDProduto +" id=FC_oBotao_"+ IDProduto +" onClick='' value='' style='z-index:1;'><br><div id=alerta>ATEN&Ccedil;&Atilde;O: Selecione as op&ccedil;&otilde;es do produto acima.</div></div>");
  if(NivelSeguinte!=-1)document.write("</form>");
}