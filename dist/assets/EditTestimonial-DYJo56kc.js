import{b as B,r as l,j as t,R as E,B as L}from"./index-CpFmk86o.js";import{R as f,C as r,b as m,a as p}from"./axios-Dx3QdDAU.js";import"./ckeditor5-FiHyv50m.js";import{S as F}from"./SuccessBanner-5bNXM_Ha.js";import"./moment-G82_0lEo.js";import{F as s}from"./Form-ClsflyVD.js";import"./toString-qof7_FyP.js";import"./Alert-B-JUCmsd.js";const O=()=>{const{id:x}=B(),[h,C]=l.useState([]),[i,j]=l.useState(),[a,c]=l.useState({testimonialDetails:{}}),[g,d]=l.useState({testimonialDetails:{}}),[b,D]=l.useState(!1);l.useEffect(()=>{const e=()=>{let u={method:"get",maxBodyLength:1/0,url:`https://rareminds.in/api/testimonials/${x}`,headers:{}};p.request(u).then(o=>{console.log("edit data",o.data),j(o.data)}).catch(o=>{console.log(o)})},n=()=>{let u={method:"get",maxBodyLength:1/0,url:"https://rareminds.in/api/testimonialCategories",headers:{}};p.request(u).then(o=>{console.log("response",o.data),C(o.data.categories)}).catch(o=>{console.log(o)})};e(),n()},[]);const[S,y]=l.useState([]),I=e=>{y(URL.createObjectURL(e.target.files[0]));const n=new FormData;a.testimonialDetails.ContentTitle&&n.append("ContentTitle",a.testimonialDetails.ContentTitle),a.testimonialDetails.ContentDescription&&n.append("ContentDescription",a.testimonialDetails.ContentDescription),blogFormData.append("ContentImage",e.target.files[0]),c({testimonialData:n})},T=()=>{console.log("form data",S);let e={method:"post",maxBodyLength:1/0,url:`https://rareminds.in/api/editTestimonial/${x}`,headers:"Content-Type: multipart/form-data",data:a};p.request(e).then(n=>{console.log(JSON.stringify(n.data)),D(!0),setTimeout(()=>{D(!1)},2e3)}).catch(n=>{console.log(n)})};return console.log("form data",a),t.jsx(E.Fragment,{children:t.jsx(f,{children:t.jsx(r,{sm:12,children:t.jsxs(m,{children:[t.jsxs(m.Header,{children:[b&&t.jsx(F,{}),t.jsx(m.Title,{as:"h5",children:"Testimonial"})]}),t.jsx(m.Body,{children:t.jsxs(s,{children:[t.jsxs(f,{children:[t.jsx(r,{md:12,children:t.jsxs(s.Group,{className:"mb-3",children:[t.jsx(s.Label,{children:"Enter Author Details"}),t.jsx(s.Control,{placeholder:"Enter author details",onChange:e=>{c({...a,testimonialDetails:{...a.testimonialDetails,ContentTitle:e.target.value}}),d({testimonialData:!1})},defaultValue:i==null?void 0:i.testimonialDetails[0].ContentTitle})]})}),t.jsx(r,{md:12,children:t.jsxs(s.Group,{className:"mb-3",children:[t.jsx(s.Label,{children:"Enter Description"}),t.jsx(s.Control,{placeholder:"Enter Description",onChange:e=>{c({...a,testimonialDetails:{...a.testimonialDetails,ContentDescription:e.target.value}}),d({testimonialDetails:!1})},as:"textarea",rows:4,defaultValue:i==null?void 0:i.testimonialDetails[0].ContentDescription})]})}),t.jsx(r,{md:6,children:t.jsxs(s.Group,{className:"mb-3",children:[t.jsx(s.Label,{children:"Image"}),t.jsx(s.Control,{type:"file",onChange:e=>{I(e),d({...g,testimonialDetails:!1})}})]})}),t.jsx(r,{md:6,children:t.jsxs(s.Group,{className:"mb-3",children:[t.jsx(s.Label,{children:"Category"}),t.jsxs(s.Select,{onChange:e=>{c({...a,testimonialDetails:{...a.testimonialDetails,ContentId:e.target.value}}),d({testimonialDetails:!1})},children:[t.jsx("option",{disabled:!0,selected:!0,children:"Select Category"}),h==null?void 0:h.map(e=>t.jsx("option",{value:e.ContentId,selected:e.ContentId===(i==null?void 0:i.testimonialDetails[0].ContentId),children:e.Heading1},e.ContentId))]})]})})]}),t.jsx(L,{variant:"primary",onClick:()=>T(),disabled:g.testimonialDetails,className:"float-right",children:"Submit"})]})})]})})})})};export{O as default};
