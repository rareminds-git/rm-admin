import{j as n}from"./index-CpFmk86o.js";const r=({postsPerPage:s,length:a,currentPage:o,handlePagination:c})=>{const t=[];for(let i=1;i<=Math.ceil(a/s);i++)t.push(i);return n.jsx("div",{className:"pagination",children:t.map(i=>n.jsx("button",{onClick:()=>c(i),className:o===i?"active":"",children:i},i))})};export{r as P};