const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const html = `
<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>JjoCelL Store Manager</title>
<style>
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#0b0b0b;color:#fff}
header{background:#151515;padding:20px;text-align:center;border-bottom:1px solid #333}
h1{margin:0;font-size:24px}
.gold{color:#d4af37}
nav{display:flex;gap:8px;overflow:auto;padding:12px;background:#111}
nav button{border:0;background:#222;color:#fff;padding:12px 16px;border-radius:8px;white-space:nowrap}
main{padding:18px}
.card{background:#171717;border:1px solid #292929;border-radius:14px;padding:18px;margin-bottom:15px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.number{font-size:30px;font-weight:bold;margin-top:8px}
button.primary{background:#d4af37;color:#000;font-weight:bold;border:0;padding:13px 18px;border-radius:8px}
input,textarea{width:100%;padding:13px;margin:7px 0;background:#222;color:#fff;border:1px solid #444;border-radius:8px}
.section{display:none}.section.active{display:block}
table{width:100%;border-collapse:collapse}
td,th{padding:10px;border-bottom:1px solid #333;text-align:left}
.small{color:#aaa;font-size:13px}
</style>
</head>
<body>

<header>
<h1>JjoCelL <span class="gold">Store Manager</span></h1>
<div class="small">Gestão inteligente do seu negócio</div>
</header>

<nav>
<button onclick="show('inicio')">Início</button>
<button onclick="show('clientes')">Clientes</button>
<button onclick="show('vendas')">Vendas</button>
<button onclick="show('produtos')">Produtos</button>
<button onclick="show('mensagens')">Atendimento</button>
<button onclick="show('hotel')">Hotelaria</button>
</nav>

<main>

<section id="inicio" class="section active">
<h2>Painel</h2>
<div class="grid">
<div class="card">Clientes<div class="number">0</div></div>
<div class="card">Vendas<div class="number">0</div></div>
<div class="card">Produtos<div class="number">0</div></div>
<div class="card">Reservas<div class="number">0</div></div>
</div>
<div class="card">
<h3>Bem-vindo ao JjoCelL Store Manager</h3>
<p>Centralize clientes, vendas, produtos, atendimento, reservas e serviços num único sistema.</p>
<button class="primary" onclick="show('clientes')">Começar</button>
</div>
</section>

<section id="clientes" class="section">
<h2>Clientes</h2>
<div class="card">
<input id="nome" placeholder="Nome do cliente">
<input id="telefone" placeholder="Telefone / WhatsApp">
<input id="email" placeholder="E-mail">
<button class="primary" onclick="addCliente()">Adicionar cliente</button>
</div>
<div class="card">
<table><thead><tr><th>Nome</th><th>Contacto</th></tr></thead>
<tbody id="listaClientes"></tbody></table>
</div>
</section>

<section id="vendas" class="section">
<h2>Vendas</h2>
<div class="card">
<input id="vendaCliente" placeholder="Cliente">
<input id="vendaValor" type="number" placeholder="Valor">
<button class="primary" onclick="addVenda()">Registar venda</button>
</div>
<div class="card">
<table><thead><tr><th>Cliente</th><th>Valor</th></tr></thead>
<tbody id="listaVendas"></tbody></table>
</div>
</section>

<section id="produtos" class="section">
<h2>Produtos e Serviços</h2>
<div class="card">
<input id="produto" placeholder="Nome do produto/serviço">
<input id="preco" type="number" placeholder="Preço">
<button class="primary" onclick="addProduto()">Adicionar</button>
</div>
<div class="card">
<table><thead><tr><th>Produto/Serviço</th><th>Preço</th></tr></thead>
<tbody id="listaProdutos"></tbody></table>
</div>
</section>

<section id="mensagens" class="section">
<h2>Atendimento</h2>
<div class="card">
<p>🤖 <b>Assistente IA</b></p>
<p class="small">Área preparada para atendimento automático e integração com WhatsApp.</p>
<textarea placeholder="Escreva uma mensagem..."></textarea>
<button class="primary">Enviar</button>
</div>
</section>

<section id="hotel" class="section">
<h2>Hotelaria</h2>
<div class="card">
<input placeholder="Nome do hóspede">
<input placeholder="Quarto">
<input type="date">
<button class="primary">Criar reserva</button>
</div>
</section>

</main>

<script>
function show(id){
 document.querySelectorAll('.section').forEach(x=>x.classList.remove('active'));
 document.getElementById(id).classList.add('active');
}

let clientes=[],vendas=[],produtos=[];

function addCliente(){
 let n=document.getElementById('nome').value;
 let t=document.getElementById('telefone').value;
 if(!n)return;
 clientes.push({n,t});
 document.getElementById('listaClientes').innerHTML=
 clientes.map(x=>'<tr><td>'+x.n+'</td><td>'+x.t+'</td></tr>').join('');
 document.getElementById('nome').value='';
 document.getElementById('telefone').value='';
}

function addVenda(){
 let c=document.getElementById('vendaCliente').value;
 let v=document.getElementById('vendaValor').value;
 if(!c)return;
 vendas.push({c,v});
 document.getElementById('listaVendas').innerHTML=
 vendas.map(x=>'<tr><td>'+x.c+'</td><td>'+x.v+'</td></tr>').join('');
}

function addProduto(){
 let p=document.getElementById('produto').value;
 let v=document.getElementById('preco').value;
 if(!p)return;
 produtos.push({p,v});
 document.getElementById('listaProdutos').innerHTML=
 produtos.map(x=>'<tr><td>'+x.p+'</td><td>'+x.v+'</td></tr>').join('');
}
</script>

</body>
</html>
`;

app.get("/", (req,res)=>{
  res.send(html);
});

app.listen(PORT, ()=>{
  console.log("JjoCelL Store Manager iniciado na porta " + PORT);
});
