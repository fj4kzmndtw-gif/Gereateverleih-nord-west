const products=[
 {id:1,name:"Makita Akku-Schlagschrauber",category:"bau",price:29,kaution:300,icon:"🔧"},
 {id:2,name:"Makita Schlitzfräse",category:"bau",price:39,kaution:400,icon:"🛠️"},
 {id:3,name:"750-kg-Anhänger",category:"anhaenger",price:25,kaution:200,icon:"🚚"},
 {id:4,name:"Rüttelplatte",category:"bau",price:35,kaution:300,icon:"▰"},
 {id:5,name:"Makita Akku-Bohrschrauber",category:"bau",price:24,kaution:250,icon:"🔩"},
 {id:6,name:"Akku-Heckenschere",category:"garten",price:27,kaution:250,icon:"🌿"},
 {id:7,name:"Akku-Rasenmäher",category:"garten",price:32,kaution:300,icon:"🌱"},
 {id:8,name:"750-kg-Planenanhänger",category:"anhaenger",price:29,kaution:250,icon:"🚛"}
];

let cart=[];

function render(items=products){
 const grid=document.getElementById("productGrid"), empty=document.getElementById("emptyState");
 grid.innerHTML=items.map(p=>`
  <article class="product">
    <div class="product-img" aria-hidden="true">${p.icon}</div>
    <div class="product-body">
      <h3>${p.name}</h3>
      <div class="price">${p.price.toFixed(2).replace(".",",")} € <span>/ Tag</span></div>
      <div class="meta">Kaution: ${p.kaution.toFixed(2).replace(".",",")} €</div>
      <span class="available">Verfügbar</span>
      <button class="btn btn-dark" onclick="reserve(${p.id})">ZUM GERÄT →</button>
    </div>
  </article>`).join("");
 empty.hidden=items.length!==0;
}
function search(){
 const q=document.getElementById("searchInput").value.toLowerCase().trim();
 const cat=document.getElementById("categorySelect").value;
 render(products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(cat==="all"||p.category===cat)));
 document.getElementById("geraete").scrollIntoView({behavior:"smooth"});
}
function reserve(id){
 const p=products.find(x=>x.id===id);
 cart.push(p);
 document.getElementById("cartCount").textContent=cart.length;
 showModal(`<p class="eyebrow">RESERVIERUNG</p><h2>${p.name}</h2>
 <p><strong>${p.price.toFixed(2).replace(".",",")} € / Tag</strong><br>Kaution: ${p.kaution.toFixed(2).replace(".",",")} €</p>
 <label>Gewünschter Mietbeginn<input type="date" id="reserveDate"></label>
 <button class="btn btn-primary" onclick="confirmReserve('${p.name.replace(/'/g,"\\'")}')">RESERVIERUNG ANFRAGEN →</button>`);
}
function confirmReserve(name){
 showModal(`<h2>Anfrage erhalten ✓</h2><p>Deine Anfrage für <strong>${name}</strong> ist als Demo vorgemerkt.</p><p>Im späteren Live-Betrieb folgen hier Identitätsprüfung, Mietvertrag, Zahlung und die verbindliche Bestätigung.</p><button class="btn btn-primary" onclick="closeModal()">SCHLIESSEN</button>`);
}
function showModal(content){document.getElementById("modalContent").innerHTML=content;document.getElementById("modal").hidden=false}
function closeModal(){document.getElementById("modal").hidden=true}
document.getElementById("searchBtn").addEventListener("click",search);
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search()});
document.getElementById("showAll").addEventListener("click",()=>render(products));
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
document.getElementById("accountBtn").addEventListener("click",()=>showModal(`<p class="eyebrow">MEIN KONTO</p><h2>Kundenkonto</h2><p>Im Live-System kannst du hier Reservierungen, Verträge und vergangene Mieten verwalten.</p><input type="email" placeholder="E-Mail-Adresse"><input type="password" placeholder="Passwort"><button class="btn btn-primary" onclick="confirmReserve('Kundenkonto')">ANMELDEN</button>`));
document.getElementById("cartBtn").addEventListener("click",()=>showModal(`<p class="eyebrow">MEINE RESERVIERUNG</p><h2>${cart.length?cart.length+" Gerät(e)":"Noch keine Geräte"}</h2>${cart.length?cart.map(p=>`<p>• ${p.name} – ${p.price.toFixed(2).replace(".",",")} € / Tag</p>`).join(""):"<p>Wähle ein Gerät aus, um es hier vorzumerken.</p>"}`));
render();
