import{_ as A}from"./pdf-DlBFes3l.js";import{v as R,j as e,A as C,d as o,f as T,Z as I,C as O,D as k,K as w,s as N,ac as U,L as P}from"./index-DWGnUDIn.js";import{b as i}from"./charts-C1EvV752.js";import{G as z}from"./globe-D60vPt5B.js";import{D as X}from"./database-DUMhyr-0.js";import"./supabase-IXkdJ51F.js";const F=[{id:1,title:"注册 Supabase 账户",description:"访问 supabase.com 注册免费账户，无需信用卡",action:"立即注册",link:"https://supabase.com"},{id:2,title:"创建新项目",description:'点击 "New Project"，选择免费 tier（Free）',action:"创建项目",link:"https://supabase.com/dashboard"},{id:3,title:"获取连接信息",description:"进入 Project Settings → API，复制 URL 和 anon key",action:"打开设置",link:"https://supabase.com/dashboard"},{id:4,title:"创建数据库表",description:"在 SQL Editor 中执行下方脚本，一键创建所需表",action:"复制脚本"},{id:5,title:"填入配置",description:"将 URL 和 anon key 填入下方输入框，测试连接",action:"开始配置"}];function Z({onBack:E}){const[r,b]=i.useState(""),[l,j]=i.useState(""),[d,x]=i.useState(!1),[c,t]=i.useState(null),[f,u]=i.useState(!1),[n,g]=i.useState(1),[m,p]=i.useState(!1),v=R(),S=()=>{if(!r.trim()||!l.trim()){t({success:!1,message:"请填写完整信息"});return}localStorage.setItem("smartm_supabase_url",r.trim()),localStorage.setItem("smartm_supabase_key",l.trim()),p(!0),t({success:!0,message:"配置已保存！请刷新页面生效"}),setTimeout(()=>p(!1),3e3)},L=async()=>{if(!r.trim()||!l.trim()){t({success:!1,message:"请填写完整信息"});return}x(!0),t(null);try{const{createClient:s}=await A(async()=>{const{createClient:y}=await import("./supabase-IXkdJ51F.js");return{createClient:y}},[],import.meta.url),a=s(r.trim(),l.trim()),{error:h}=await a.from("auth_codes").select("count").limit(1);t(h?{success:!1,message:"连接失败："+h.message}:{success:!0,message:"连接成功！数据库表已就绪"})}catch(s){t({success:!1,message:"测试失败："+(s.message||"网络错误")})}finally{x(!1)}},_=()=>{navigator.clipboard.writeText(`-- SmartMistake 数据库初始化脚本
-- 在 Supabase SQL Editor 中执行此脚本

-- 1. 创建授权码表
CREATE TABLE IF NOT EXISTS auth_codes (
    code TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    used_count INTEGER DEFAULT 0
);

-- 2. 创建错题表
CREATE TABLE IF NOT EXISTS mistakes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    knowledge_points JSONB DEFAULT '[]',
    question_text TEXT,
    question_image TEXT,
    student_answer TEXT,
    correct_answer TEXT,
    error_reason TEXT,
    difficulty INTEGER DEFAULT 3,
    notes TEXT,
    explanation TEXT,
    review_count INTEGER DEFAULT 0,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_review_at TIMESTAMPTZ
);

-- 3. 启用行级安全（RLS）
ALTER TABLE auth_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistakes ENABLE ROW LEVEL SECURITY;

-- 4. 创建访问策略（允许匿名用户验证授权码）
CREATE POLICY "Allow anon read auth_codes" 
    ON auth_codes FOR SELECT TO anon USING (is_active = TRUE);

CREATE POLICY "Allow anon update auth_codes" 
    ON auth_codes FOR UPDATE TO anon USING (is_active = TRUE);

CREATE POLICY "Users can only access own mistakes" 
    ON mistakes FOR ALL TO anon 
    USING (user_id = COALESCE(current_setting('request.headers.x-user-id', TRUE), ''));

-- 5. 创建索引（提升查询性能）
CREATE INDEX IF NOT EXISTS idx_auth_codes_user_id ON auth_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_mistakes_user_id ON mistakes(user_id);`),u(!0),setTimeout(()=>u(!1),2e3)};return e.jsxs("div",{className:"page-container",children:[e.jsxs("header",{className:"flex items-center gap-3 mb-6",children:[e.jsx("button",{onClick:E,className:"btn-secondary w-10 h-10 p-0 rounded-full",children:e.jsx(C,{size:20})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-bold text-white",children:"配置云服务"}),e.jsx("p",{className:"text-slate-400 text-sm",children:"5步完成 Supabase 配置，实现多设备同步"})]})]}),v?e.jsx("div",{className:"mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl",children:e.jsxs("div",{className:"flex items-center gap-2 text-emerald-400 text-sm",children:[e.jsx(o,{size:16}),e.jsx("span",{children:"Supabase 已配置，数据同步功能可用"})]})}):e.jsx("div",{className:"mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl",children:e.jsxs("div",{className:"flex items-center gap-2 text-amber-400 text-sm",children:[e.jsx(T,{size:16}),e.jsx("span",{children:"尚未配置 Supabase，数据仅保存在本地"})]})}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(I,{size:16,className:"text-primary-400"}),e.jsx("h2",{className:"text-sm font-semibold text-white",children:"配置步骤"})]}),e.jsx("div",{className:"space-y-2",children:F.map(s=>e.jsxs("div",{onClick:()=>g(n===s.id?0:s.id),className:`glass-card p-4 cursor-pointer transition-all ${n===s.id?"border-primary-500/30":""}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${n===s.id?"bg-primary-500/20 text-primary-400":"bg-slate-800 text-slate-500"}`,children:s.id}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h3",{className:"text-sm font-medium text-white",children:s.title}),e.jsx("p",{className:"text-xs text-slate-400 mt-0.5",children:s.description})]}),e.jsx(O,{size:16,className:`text-slate-500 transition-transform ${n===s.id?"rotate-90":""}`})]}),n===s.id&&e.jsx("div",{className:"mt-3 pl-11",children:s.id===4?e.jsxs("div",{className:"bg-slate-900/50 rounded-xl p-3 relative",children:[e.jsx("pre",{className:"text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap break-all",children:"-- 点击复制按钮获取完整 SQL 脚本"}),e.jsx("button",{onClick:a=>{a.stopPropagation(),_()},className:"absolute top-2 right-2 p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",children:f?e.jsx(o,{size:14,className:"text-emerald-400"}):e.jsx(k,{size:14,className:"text-slate-400"})})]}):s.link?e.jsxs("a",{href:s.link,target:"_blank",rel:"noopener noreferrer",onClick:a=>a.stopPropagation(),className:"inline-flex items-center gap-1 px-3 py-2 bg-primary-500/20 text-primary-400 rounded-lg text-sm hover:bg-primary-500/30 transition-colors",children:[e.jsx(w,{size:14}),s.action]}):e.jsx("button",{onClick:a=>a.stopPropagation(),className:"px-3 py-2 bg-primary-500/20 text-primary-400 rounded-lg text-sm hover:bg-primary-500/30 transition-colors",children:s.action})})]},s.id))})]}),e.jsxs("div",{className:"glass-card p-5 mb-4",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-sm font-bold",children:e.jsx(N,{size:16})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-sm font-semibold text-white",children:"连接配置"}),e.jsx("p",{className:"text-xs text-slate-400",children:"填入 Supabase 项目信息"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1",children:[e.jsx(z,{size:14}),"Project URL"]}),e.jsx("input",{type:"text",value:r,onChange:s=>b(s.target.value),placeholder:"https://xxxx.supabase.co",className:"input-field w-full"})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1",children:[e.jsx(U,{size:14}),"Anon Key"]}),e.jsx("input",{type:"text",value:l,onChange:s=>j(s.target.value),placeholder:"eyJhbGciOiJIUzI1NiIs...",className:"input-field w-full font-mono text-xs"})]})]}),c&&e.jsxs("div",{className:`mt-3 p-3 rounded-xl flex items-start gap-2 text-sm ${c.success?"bg-emerald-500/10 text-emerald-400 border border-emerald-500/20":"bg-rose-500/10 text-rose-400 border border-rose-500/20"}`,children:[c.success?e.jsx(o,{size:16,className:"mt-0.5 shrink-0"}):e.jsx(T,{size:16,className:"mt-0.5 shrink-0"}),e.jsx("span",{children:c.message})]}),e.jsxs("div",{className:"flex gap-2 mt-4",children:[e.jsxs("button",{onClick:L,disabled:d,className:"flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",children:[d?e.jsx(P,{size:16,className:"animate-spin"}):e.jsx(X,{size:16}),d?"测试中...":"测试连接"]}),e.jsxs("button",{onClick:S,className:`flex-1 py-2.5 rounded-xl text-sm font-medium transition-opacity flex items-center justify-center gap-2 ${m?"bg-emerald-500/20 text-emerald-400":"bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:opacity-90"}`,children:[m?e.jsx(o,{size:16}):e.jsx(N,{size:16}),m?"已保存":"保存配置"]})]})]}),e.jsxs("div",{className:"glass-card p-5",children:[e.jsx("h3",{className:"text-sm font-semibold text-white mb-3",children:"常见问题"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-slate-300",children:"Supabase 免费 tier 够用吗？"}),e.jsx("p",{className:"text-xs text-slate-400 mt-1",children:"500MB 数据库 + 1GB 存储 + 50,000 MAU，对于个人错题本完全够用。"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-slate-300",children:"数据安全吗？"}),e.jsx("p",{className:"text-xs text-slate-400 mt-1",children:"使用行级安全（RLS）策略，每个用户只能访问自己的数据，Supabase 提供企业级安全保障。"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-medium text-slate-300",children:"配置后之前的错题会丢失吗？"}),e.jsx("p",{className:"text-xs text-slate-400 mt-1",children:"不会。配置后新数据会同步到云端，已有数据保留在本地。可以手动导出旧数据再导入。"})]})]})]})]})}export{Z as default};
