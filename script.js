const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const overlay = document.getElementById("contentOverlay");
const panelTitle = document.getElementById("panelTitle");
const panelContent = document.getElementById("panelContent");
const toast = document.getElementById("toast");
let cartCount = 0;
let toastTimer;

const productData = [
  {category:"denim",name:"Jean clásico",price:"$89.900",desc:"Denim de inspiración noventera.",img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80"},
  {category:"cuadros",name:"Chaqueta retro",price:"$119.900",desc:"Una pieza con carácter y estilo.",img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80"},
  {category:"accesorios",name:"Bolso de siempre",price:"$74.900",desc:"El detalle perfecto para tu look.",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80"}
];
const categoryNames = {denim:"Denim & básicos",cuadros:"Chalecos & cuadros",accesorios:"Vestidos & accesorios"};

function showToast(message){
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);
}
function openPanel(section){
  const titles={
    inicio:"Bienvenido a Retro Clothing",tienda:"Nuestra tienda",coleccion:"Nuestra colección",
    nosotros:"Nuestra historia",contacto:"Ponte en contacto",denim:"Denim & básicos",
    cuadros:"Chalecos & cuadros",accesorios:"Vestidos & accesorios"
  };
  panelTitle.textContent=titles[section]||"Retro Clothing";
  if(["coleccion","tienda","denim","cuadros","accesorios"].includes(section)){
    const chosen=section==="tienda"||section==="coleccion"?productData:productData.filter(p=>p.category===section);
    panelContent.innerHTML=`<p class="panel-copy">Prendas inspiradas en los años 80 y 90, elegidas para darle personalidad a tu estilo.</p>
      <div class="panel-products">${chosen.map(p=>`<article class="panel-product"><img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3><p>${p.desc}</p><strong>${p.price}</strong></article>`).join("")}</div>`;
  } else if(section==="nosotros"){
    panelContent.innerHTML='<p class="panel-copy">Retro Clothing nace del amor por la moda de los años 80 y 90. Recuperamos la esencia de otras épocas con prendas y accesorios llenos de personalidad. Creemos que cada prenda puede contar una historia y que el buen estilo nunca pasa de moda.</p>';
  } else if(section==="contacto"){
    panelContent.innerHTML='<div class="panel-copy panel-contact"><p>¿Tienes alguna pregunta sobre nuestras prendas?</p><p>Escríbenos y conversemos.</p><p>Correo: <a href="mailto:hola@retroclothing.com">hola@retroclothing.com</a></p><p>Horario de atención: lunes a viernes, 9:00 a. m. – 5:00 p. m.</p></div>';
  } else {
    panelContent.innerHTML='<p class="panel-copy">Prendas con historia. Estilo sin fecha de caducidad.</p>';
  }
  overlay.classList.add("open"); overlay.setAttribute("aria-hidden","false");
}
function closePanel(){
  overlay.classList.remove("open"); overlay.setAttribute("aria-hidden","true");
}
document.getElementById("panelClose").addEventListener("click",closePanel);
overlay.addEventListener("click",e=>{if(e.target===overlay)closePanel();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel();});

menuToggle.addEventListener("click",()=>{
  const opened=mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(opened));
  menuToggle.textContent=opened?"✕":"☰";
});
document.querySelectorAll(".main-nav a").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    const section=link.textContent.trim().toLowerCase();
    mainNav.classList.remove("open");menuToggle.textContent="☰";menuToggle.setAttribute("aria-expanded","false");
    document.querySelectorAll(".main-nav a").forEach(a=>a.classList.remove("active"));
    link.classList.add("active");
    openPanel(section);
  });
});
document.querySelectorAll("[data-panel]").forEach(button=>{
  button.addEventListener("click",()=>openPanel(button.dataset.panel));
});
document.getElementById("searchToggle").addEventListener("click",()=>showToast("La búsqueda estará disponible al entrar a la tienda."));
document.getElementById("cartButton").addEventListener("click",()=>showToast(cartCount?`Tienes ${cartCount} producto(s) en el carrito.`:"Tu carrito está vacío por ahora."));
