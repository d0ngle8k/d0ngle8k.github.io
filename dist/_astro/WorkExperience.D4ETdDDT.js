import{j as s}from"./jsx-runtime.ClP7wGfN.js";import{r as l}from"./index.DK-fsZOb.js";function x({workHistory:r}){const[a,n]=l.useState(null),c=l.useMemo(()=>r,[r]);return s.jsxs("div",{className:"space-y-4 sm:space-y-6",children:[c.map((e,o)=>s.jsxs("article",{className:"card p-4 sm:p-6 space-y-3 transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:-translate-y-1 cursor-pointer group work-card",style:{animation:`fadeInUp 0.5s ease-out ${o*.08}s both`},onClick:()=>n(a===`${e.role}-${e.company}`?null:`${e.role}-${e.company}`),role:"button",tabIndex:0,onKeyDown:t=>{(t.key==="Enter"||t.key===" ")&&n(a===`${e.role}-${e.company}`?null:`${e.role}-${e.company}`)},children:[s.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-secondary",children:[s.jsx("span",{className:"rounded-full bg-white/10 px-3 py-1 text-primary font-semibold whitespace-nowrap group-hover:bg-white/20 transition-colors",children:e.role}),s.jsx("span",{className:"hidden sm:block",children:"•"}),s.jsx("span",{className:"hover-text-accent transition-colors",children:e.company}),s.jsx("span",{className:"hidden sm:block",children:"•"}),s.jsxs("span",{className:"hover-text-accent transition-colors text-xs sm:text-sm",children:[e.start," — ",e.end??"Present"]})]}),s.jsx("p",{className:"text-secondary text-sm sm:text-base hover-text-muted transition-colors",children:e.summary}),s.jsx("div",{className:`overflow-hidden transition-all duration-300 ${a===`${e.role}-${e.company}`?"max-h-96 opacity-100":"max-h-0 opacity-0"}`,children:s.jsx("ul",{className:"list-disc space-y-1 sm:space-y-2 pl-5 text-secondary text-xs sm:text-sm",children:e.bullets.map(t=>s.jsx("li",{className:"hover-text-muted transition-colors",children:t},t))})}),s.jsx("div",{className:"flex items-center justify-end pt-2",children:s.jsx("span",{className:"text-secondary hover-text-accent group-hover:translate-x-1 transition-all text-lg","aria-hidden":"true",children:a===`${e.role}-${e.company}`?"↑":"↓"})})]},`${e.role}-${e.company}`)),s.jsx("style",{children:`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `})]})}export{x as WorkExperience};
