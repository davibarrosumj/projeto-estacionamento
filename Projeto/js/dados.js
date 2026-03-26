let clientes = JSON.parse(localStorage.getItem("clientes")) || [
{
id:1,
nome:"Carlos Silva",
cpf:"123.456.789-10",
banco:"Banco do Brasil",
nascimento:"12/04/1995",
telefone:"99999-1111",
endereco:"Rua das Flores, 120",
placa:"ABC-1234",
tickets:2
}
]

function salvar(){
localStorage.setItem("clientes", JSON.stringify(clientes))
}

/* TABELA */
function carregarClientes(){

let tabela = document.getElementById("clientesTabela")
tabela.innerHTML = ""

clientes.forEach(cliente => {

tabela.innerHTML += `
<tr id="linha-${cliente.id}">

<td>${cliente.id}</td>

<td><input id="nome-${cliente.id}" value="${cliente.nome}" disabled></td>
<td><input id="cpf-${cliente.id}" value="${cliente.cpf}" disabled></td>
<td><input id="banco-${cliente.id}" value="${cliente.banco}" disabled></td>
<td><input id="nascimento-${cliente.id}" value="${cliente.nascimento}" disabled></td>
<td><input id="telefone-${cliente.id}" value="${cliente.telefone}" disabled></td>
<td><input id="endereco-${cliente.id}" value="${cliente.endereco}" disabled></td>
<td><input id="placa-${cliente.id}" value="${cliente.placa}" disabled></td>

<td>
<div class="acoes-tickets">
<input type="number" id="tickets-${cliente.id}" value="${cliente.tickets}" disabled>
<button class="add" onclick="alterarTicket(${cliente.id},1)">+</button>
<button class="remove" onclick="alterarTicket(${cliente.id},-1)">-</button>
</div>
</td>

<td>
<div class="acoes-botoes">
<button class="editar" id="btn-${cliente.id}" onclick="toggleEditar(${cliente.id})">
Editar
</button>

<button class="remove" onclick="excluirCliente(${cliente.id})">
Excluir
</button>
</div>
</td>

</tr>
`
})

}

/* EDITAR */
function toggleEditar(id){

let btn = document.getElementById(`btn-${id}`)
let linha = document.getElementById(`linha-${id}`)
let editando = btn.innerText === "Salvar"

let campos = ["nome","cpf","banco","nascimento","telefone","endereco","placa","tickets"]

if(editando){

let cliente = clientes.find(c => c.id === id)

campos.forEach(campo => {
let input = document.getElementById(`${campo}-${id}`)

if(campo === "tickets"){
cliente[campo] = parseInt(input.value) || 0
}else{
cliente[campo] = input.value
}

input.disabled = true
})

btn.innerText = "Editar"
btn.classList.remove("salvar")
btn.classList.add("editar")

linha.classList.remove("editando")

salvar()

}else{

campos.forEach(campo => {
document.getElementById(`${campo}-${id}`).disabled = false
})

btn.innerText = "Salvar"
btn.classList.remove("editar")
btn.classList.add("salvar")

linha.classList.add("editando")

}

}

/* TICKETS */
function alterarTicket(id, valor){
let cliente = clientes.find(c => c.id === id)

cliente.tickets = parseInt(cliente.tickets) || 0
cliente.tickets += valor

if(cliente.tickets < 0) cliente.tickets = 0

salvar()
carregarClientes()
}

/* EXCLUIR */
function excluirCliente(id){

if(confirm("Tem certeza que deseja excluir este cliente?")){

clientes = clientes.filter(cliente => cliente.id !== id)

salvar()
carregarClientes()

}

}

/* NOVO */
function adicionarCliente(){

let novoId = clientes.length > 0 
? clientes[clientes.length - 1].id + 1 
: 1

clientes.push({
id: novoId,
nome: "",
cpf: "",
banco: "",
nascimento: "",
telefone: "",
endereco: "",
placa: "",
tickets:0
})

salvar()
carregarClientes()

setTimeout(() => {
toggleEditar(novoId)
}, 100)

}

carregarClientes()