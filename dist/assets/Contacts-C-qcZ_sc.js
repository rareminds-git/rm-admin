import{b as m,r as h,j as e,R as x}from"./index-CpFmk86o.js";import{R as c,C as p,b as o,a as j}from"./axios-Dx3QdDAU.js";import{h as w}from"./moment-G82_0lEo.js";import{T as W}from"./Table-D1RLb0rs.js";const S=()=>{var n;m();const[i,l]=h.useState();return h.useEffect(()=>{(()=>{let s={method:"get",maxBodyLength:1/0,url:"https://rareminds.in/api/queries",headers:{}};j.request(s).then(t=>{l(t.data)}).catch(t=>{console.log(t)})})()},[]),console.log("page data",i),e.jsx(x.Fragment,{children:e.jsx(c,{children:e.jsx(p,{children:e.jsx(o,{children:e.jsx(o.Body,{children:e.jsxs(W,{responsive:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Full Name"}),e.jsx("th",{children:"Company Name"}),e.jsx("th",{children:"Email"}),e.jsx("th",{children:"Job Title"}),e.jsx("th",{children:"Services"}),e.jsx("th",{children:"Referral Source"}),e.jsx("th",{children:"Comment"}),e.jsx("th",{children:"Submitted Date"})]})}),e.jsx("tbody",{children:(n=i==null?void 0:i.queries)==null?void 0:n.map((r,s)=>{var d;let t=(d=r==null?void 0:r.Services.split(","))==null?void 0:d.map(a=>{if(a.trim()==="TA")return"Talent Acquisition";if(a.trim()==="TD")return"Talent Development";if(a.trim()==="TM")return"Talent Management"});return e.jsxs("tr",{children:[e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:r.FullName}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:r.CompanyName}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:r.Email}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:r.Jobtitle}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:t.join(", ")}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:r.ReferralSource}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:r.Comment}),e.jsx("td",{style:{wordWrap:"break-word",minWidth:"60px",maxWidth:"260px",whiteSpace:"normal"},children:w(r.CreatedAt).format("MM/DD/YYYY hh:mm:ss")}),e.jsx("td",{})]},s)})})]})})})})})})};export{S as default};