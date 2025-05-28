console.log("entrou js"); 

document.getElementById('btnSobreNos').addEventListener('click', function() {
  document.getElementById("sobreNos").hidden = false;
  document.getElementById("login").hidden = true;
  document.getElementById("cadastrar").hidden = true;
  document.getElementById("localizacao").hidden = true;
});

document.getElementById('btnLogin').addEventListener('click', function() {
  document.getElementById("login").hidden = false;
  document.getElementById("sobreNos").hidden = true;
  document.getElementById("cadastrar").hidden = true;
  document.getElementById("localizacao").hidden = true;
});

document.getElementById('btnCadastrar').addEventListener('click', function() {
  document.getElementById("cadastrar").hidden = false;
  document.getElementById("sobreNos").hidden = true;
  document.getElementById("login").hidden = true;
  document.getElementById("localizacao").hidden = true;

  var numAleatório =  Math.floor(Math.random() * 9000) + 1000; //gera um numero aleatorio de 4 digitos
  document.getElementById("codGerado").value= numAleatório;

});







document.getElementById('btnEnviarCadastro').addEventListener('click', function() {
  var nome = document.getElementById("nome").value; 
  var emailCadastro = document.getElementById("emailCadastro").value; 
  var codGerado = document.getElementById("codGerado").value; 
  var emailSeguranca = document.getElementById("emailSeguranca").value; 

  document.getElementById("codUser").value = codGerado; 

  //cria objeto para enviar no ajax

  var dados = {
    acao: "cadastrar",
    nome: nome,
    emailCadastro: emailCadastro,
    codGerado: codGerado,
    emailSeguranca: emailSeguranca
  };

  $.ajax({ //ajax 
    type: "POST", //post busca e envia dados
    url: "http://localhost/falconGuardeBackEnd/falconGuard.php", //para onde vai os dados
    data: dados, // envia o objeto criado antes
    dataType: "json", // força o jQuery a tratar como JSON
    success: function (resposta) { 		  
      console.log("Resposta do PHP:", resposta);

      if (resposta.status === "sucesso") {

        console.log(resposta.mensagem);
        
        if(resposta.mensagem === "Usuario ja cadastrado"){
          $("#labelMsgCadastro").addClass("text-warning negrito");// rounded deixa arredondado e p-1 add  espaçamento interno
          document.getElementById("labelMsgCadastro").textContent = "Usuário já possui cadastro."; //insere mensagem na label 

          pedirLocalizacao();

          setTimeout(function () {
            limparPagina();
            document.getElementById("localizacao").hidden = false;
            document.getElementById("cadastrar").hidden = true;
          }, 3000); // Ajusta o tempo (3000 ms = 3seg ) 

        }else{
          console.log("Registrado com sucesso"); 
          $("#labelMsgCadastro").addClass("text-success negrito"); // rounded deixa arredondado e p-1 add  espaçamento interno
          document.getElementById("labelMsgCadastro").textContent = "Usuário registrado com sucesso."; //insere mensagem na label 
        }

      } else {
      console.log("Erro ao registrar:", respostaAtualizada.mensagem || "sem detalhes");
      alert("Deu erro! Verifique todos os dados.");
      //document.getElementById("labelMen").textContent = "Deu erro! Verifique todos os dados."; //insere mensagem na label
      }
                  
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("Erro:", textStatus, errorThrown);
      alert("Deu erro: " + textStatus);
      //document.getElementById("labelMens").textContent = "Erro: "+textStatus; //insere mensagem na label
    }
  }); //ajax 


});



document.getElementById('btnEntrar').addEventListener('click', function() {
  var nomeLgn = document.getElementById("nomeLgn").value; 
  var codLgn = document.getElementById("codLgn").value; 
  document.getElementById("codUser").value = codLgn; 

  //cria objeto para enviar no ajax
  var dados = {
    acao: "buscarUsuario",
    nomeLgn: nomeLgn,
    codLgn: codLgn
  };

  $.ajax({ //ajax 
    type: "POST", //post busca e envia dados
    url: "http://localhost/falconGuardeBackEnd/falconGuard.php", //para onde vai os dados
    data: dados, // envia o objeto criado antes 
    dataType: "json", // força o jQuery a tratar como JSON
    success: function (resposta) { 		  
      console.log("Resposta do PHP:", resposta);

      if (resposta.status === "sucesso") {

        console.log(resposta.mensagem);
        
        if(resposta.mensagem === "Usuario encontrado"){
          $("#labelMsgLgn").addClass("text-success negrito");// rounded deixa arredondado e p-1 add  espaçamento interno
          document.getElementById("labelMsgLgn").textContent = "Usuario encontrado, entrando..."; //insere mensagem na label 

          pedirLocalizacao();

          setTimeout(function () {
            document.getElementById("localizacao").hidden = false;
            document.getElementById("login").hidden = true;
          }, 3000); // Ajusta o tempo (3000 ms = 3seg ) 

        }else{
          console.log("Usuario não encontrado"); 
          $("#labelMsgLgn").addClass("text-danger negrito"); // rounded deixa arredondado e p-1 add  espaçamento interno
          document.getElementById("labelMsgLgn").textContent = "Usuário não encontrado, faça seu cadastro."; //insere mensagem na label 
        }

      } else {
      console.log("Erro ao registrar:", respostaAtualizada.mensagem || "sem detalhes");
      alert("Deu erro! Verifique todos os dados.");
      //document.getElementById("labelMen").textContent = "Deu erro! Verifique todos os dados."; //insere mensagem na label
      }
                  
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("Erro:", textStatus, errorThrown);
      alert("Deu erro: " + textStatus);
      //document.getElementById("labelMens").textContent = "Erro: "+textStatus; //insere mensagem na label
    }
  }); //ajax 


});

function limparPagina(){
  document.getElementById("labelMsgCadastro").textContent = "";

  document.getElementById("nome").value = ""; 
  document.getElementById("emailCadastro").value = "";  
  document.getElementById("codGerado").value = ""; 
  document.getElementById("emailSeguranca").value = "";  


}



function pedirLocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        document.getElementById("latitude").value = latitude; 
        document.getElementById("longitude").value = longitude;  

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude); 

        //add na api do google maps
        var iframe = document.getElementById("mapa");
        var chaveApi = "AIzaSyBAz6GsWeONRC2KRVVJPP1_BbP9F6Bi1sw";
        iframe.src ="https://www.google.com/maps?q=" + latitude + "," + longitude + "&output=embed";
        //A URL https://www.google.com/maps?q=LAT,LNG&output=embed não exige chave de API

      },
      function (error) {
        console.error("Erro ao obter localização:", error);
      },
      {
        enableHighAccuracy: true,  //true tenta usar GPS ou Wi-Fi para maior precisão
        timeout: 10000,
        maximumAge: 0
      }
    );
    
  } else {
    alert("Geolocalização não é suportada neste navegador.");
  }
}


document.getElementById('btnEnviarEmail').addEventListener('click', function() {
    var lat = document.getElementById("latitude").value; 
    var long = document.getElementById("longitude").value; 
    var codUser = document.getElementById("codUser").value; 

    //cria objeto para enviar no ajax
    var dados = {
        acao: "enviarEmail",
        latitude: lat,
        longitude: long,
        codUser: codUser
    };

    $.ajax({ //ajax 
    type: "POST", //post busca e envia dados
    url: "http://localhost/falconGuardeBackEnd/falconGuard.php", //para onde vai os dados
    data: dados, // envia o objeto criado antes 
    dataType: "json", // força o jQuery a tratar como JSON
    success: function (resposta) { 		  
      console.log("Resposta do PHP:", resposta);

      if (resposta.status === "sucesso") {

        console.log(resposta.mensagem);
        
        $("#labelMsgLgn").addClass("text-success negrito");// rounded deixa arredondado e p-1 add  espaçamento interno
        document.getElementById("labelMsgLgn").textContent = "Email enviado"; //insere mensagem na label 


      } else {
      console.log("Erro ao registrar:", respostaAtualizada.mensagem || "sem detalhes");
      alert("Deu erro! Verifique todos os dados.");
      //document.getElementById("labelMen").textContent = "Deu erro! Verifique todos os dados."; //insere mensagem na label
      }
                  
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("Erro:", textStatus, errorThrown);
      alert("Deu erro: " + textStatus);
      //document.getElementById("labelMens").textContent = "Erro: "+textStatus; //insere mensagem na label
    }
  }); //ajax 

});




        
