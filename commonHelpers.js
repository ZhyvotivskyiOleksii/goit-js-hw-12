import{S as m,i as l}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const f="https://pixabay.com/api",d="30733650-3915f9571a70fae81f0483ef4";function h(a){const t=new URLSearchParams({key:d,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${f}?${t}`).then(s=>{if(!s.ok)throw new Error("Sorry, there are no images matching your search query. Please try again!");return s.json()})}function y(a){return a.map(({webformatURL:t,largeImageURL:s,tags:o,likes:e,views:r,comments:n,downloads:p})=>`<li class="gallery-item">
    <a class="gallery-link" href="${s}">
      <img
        class="gallery-image"
        src="${t}"
        alt="${o}"
      />
    </a>
    <div class="image-stats">
        <p>Likes <span>${e}</span></p>
        <p>Views <span>${r}</span></p>
        <p>Comments <span>${n}</span></p>
        <p>Downloads <span>${p}</span></p>
    </div>
    </li>`).join("")}const g=document.querySelector(".form"),c=document.querySelector(".gallery"),i=document.querySelector(".loading-text"),L=new m(".gallery a",{captionDelay:250,captionsData:"alt"});g.addEventListener("submit",w);const u={title:"Error",message:"Empty query!",titleColor:"white",messageColor:"white",backgroundColor:"red",position:"topRight"};function w(a){a.preventDefault();const t=a.currentTarget,s=t.elements.query.value.trim();if(s===""){l.show(u);return}c.innerHTML="",i.classList.remove("hidden"),h(s).then(o=>{if(o.totalHits===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");i.classList.add("hidden"),c.innerHTML=y(o.hits),L.refresh()}).catch(o=>{l.show({...u,message:o.message}),i.classList.add("hidden")}).finally(()=>t.reset())}
//# sourceMappingURL=commonHelpers.js.map
