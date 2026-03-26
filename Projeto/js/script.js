/* 🔐 BLOQUEIO */
if(localStorage.getItem("logado") !== "true"){
    console.warn("Usuário não logado")
}

/* DADOS */
let usuarios = JSON.parse(localStorage.getItem("clientes")) || []

const total = 9
let vagas = Array(total).fill(null)
let ticketId = 1

function salvar(){
  localStorage.setItem("clientes", JSON.stringify(usuarios))
}

function carregar(){

  let select = document.getElementById("user")
  let selecionado = select.value

  usuarios = JSON.parse(localStorage.getItem("clientes")) || []

  select.innerHTML = ""

  usuarios.forEach(u=>{
    let selected = (u.id == selecionado) ? "selected" : ""

    select.innerHTML += `<option value="${u.id}" ${selected}>
    ID ${u.id} - ${u.nome} (${u.tickets})
    </option>`
  })
}

function render(){
  let v = document.getElementById("vagas")
  v.innerHTML = ""

  vagas.forEach(x=>{
    let d = document.createElement("div")
    d.className="vaga"
    if(x)d.classList.add("ocupada")
    v.appendChild(d)
  })
}

function renderTickets(){
  let t = document.getElementById("tickets")
  t.innerHTML = ""

  vagas.forEach(v=>{
    if(v){
      let u = usuarios.find(x=>x.id===v.user)

      t.innerHTML += `<div class="ticket">
      <strong>Ticket #${v.id}</strong><br>
      Usuário: ${u.nome} (ID ${u.id})<br>
      Vaga: ${v.vaga}
      </div>`
    }
  })
}

function entrada(){

  let select = document.getElementById("user")

  if(!select.value){
    alert("Selecione um usuário")
    return
  }

  let id = parseInt(select.value)
  let u = usuarios.find(x=>x.id===id)

  if(!u){
    alert("Usuário não encontrado")
    return
  }

  if(u.tickets <= 0){
    alert("Sem ticket")
    return
  }

  let i = vagas.findIndex(v=>!v)

  if(i === -1){
    alert("Lotado")
    return
  }

  vagas[i] = {id:ticketId++,user:id,vaga:i+1}
  u.tickets--

  salvar()
  update()
}

function saida(){

  let id = parseInt(document.getElementById("user").value)

  let i = vagas.findIndex(v=>v && v.user===id)

  if(i === -1){
    alert("Não encontrado")
    return
  }

  vagas[i] = null

  salvar()
  update()
}

function logout(){
  localStorage.removeItem("logado")
  alert("Logout realizado")
}

function update(){
  carregar()
  render()
  renderTickets()
}

/* 🔥 INICIALIZAÇÃO */
window.onload = update