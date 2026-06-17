const S="smartmistake_usage";function d(e){try{const t=localStorage.getItem(S),s=t?JSON.parse(t):[];s.push(e),s.length>500&&s.shift(),localStorage.setItem(S,JSON.stringify(s))}catch{}}function P(e){try{const t=localStorage.getItem(S),o=(t?JSON.parse(t):[]).filter(a=>a.provider===e),r=new Date().toDateString(),i=o.filter(a=>new Date(a.timestamp).toDateString()===r),n=o.filter(a=>!a.success).pop();return{totalCalls:o.length,successCalls:o.filter(a=>a.success).length,failedCalls:o.filter(a=>!a.success).length,todayCalls:i.length,lastError:n==null?void 0:n.error,lastErrorTime:n==null?void 0:n.timestamp}}catch{return{totalCalls:0,successCalls:0,failedCalls:0,todayCalls:0}}}function B(){const e=q(),t=p();return e.map(s=>({provider:s.id,label:s.label,stats:P(s.id),configured:!!t[s.id]}))}function H(e){const t=p(),s=Object.keys(t);if(s.length<=1)return null;const o=s.indexOf(e);if(o===-1)return s[0]||null;for(let r=1;r<s.length;r++){const i=s[(o+r)%s.length];if(E(i))return i}return s[0]||null}function E(e){const t=P(e);return!(t.failedCalls>=3&&t.failedCalls>=t.totalCalls)}const h={openai:{label:"OpenAI",baseUrl:"https://api.openai.com/v1",models:[{id:"gpt-4o-mini",label:"GPT-4o Mini（快速便宜）",vision:!0},{id:"gpt-4o",label:"GPT-4o（能力强）",vision:!0},{id:"gpt-3.5-turbo",label:"GPT-3.5 Turbo（最便宜）",vision:!1}]},claude:{label:"Claude",baseUrl:"https://api.anthropic.com/v1",models:[{id:"claude-3-sonnet-20240229",label:"Claude 3 Sonnet（推荐）",vision:!0},{id:"claude-3-haiku-20240307",label:"Claude 3 Haiku（最快）",vision:!0}]},kimi:{label:"Kimi（月之暗面，国内）",baseUrl:"https://api.moonshot.cn/v1",models:[{id:"moonshot-v1-8k-vision-preview",label:"V1-8K 视觉版（国内·视觉）",vision:!0},{id:"moonshot-v1-8k",label:"V1-8K（国内·文字）",vision:!1},{id:"moonshot-v1-32k",label:"V1-32K（国内·文字）",vision:!1}]},deepseek:{label:"DeepSeek（国内，暂不支持图片）",baseUrl:"https://api.deepseek.com/v1",models:[{id:"deepseek-chat",label:"DeepSeek-V3（国内·文字）",vision:!1},{id:"deepseek-reasoner",label:"DeepSeek-R1（国内·文字）",vision:!1}]},siliconflow:{label:"SiliconFlow（硅基流动，国内免费）",baseUrl:"https://api.siliconflow.cn/v1",models:[{id:"Qwen/Qwen2.5-VL-7B-Instruct",label:"Qwen2.5-VL 7B（国内·视觉·免费）",vision:!0},{id:"Qwen/Qwen2.5-7B-Instruct",label:"Qwen2.5 7B（国内·文字·免费）",vision:!1},{id:"deepseek-ai/DeepSeek-V3",label:"DeepSeek-V3（国内·文字）",vision:!1}]},openrouter:{label:"OpenRouter（国内可访问，免费额度）",baseUrl:"https://openrouter.ai/api/v1",models:[{id:"openai/gpt-4o-mini",label:"GPT-4o Mini（国内可访问·视觉·免费）",vision:!0},{id:"anthropic/claude-3-haiku",label:"Claude 3 Haiku（国内可访问·视觉·免费）",vision:!0},{id:"google/gemini-2.0-flash-exp:free",label:"Gemini 2.0 Flash（国内可访问·视觉·免费）",vision:!0},{id:"meta-llama/llama-3.2-11b-vision-instruct:free",label:"Llama 3.2 11B（国内可访问·视觉·免费）",vision:!0},{id:"deepseek/deepseek-chat",label:"DeepSeek-V3（国内可访问·文字）",vision:!1}]},qwen:{label:"通义千问（阿里，国内）",baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",models:[{id:"qwen-vl-max",label:"Qwen-VL Max（国内·视觉·推荐）",vision:!0},{id:"qwen-vl-plus",label:"Qwen-VL Plus（国内·视觉）",vision:!0},{id:"qwen-turbo",label:"Qwen Turbo（国内·文字）",vision:!1},{id:"qwen-plus",label:"Qwen Plus（国内·文字）",vision:!1}]},ollama:{label:"Ollama（本地部署，离线可用）",baseUrl:"http://localhost:11434/v1",models:[{id:"llama3.2-vision",label:"Llama 3.2 Vision（本地·视觉·离线）",vision:!0},{id:"llama3.2",label:"Llama 3.2（本地·文字·离线）",vision:!1},{id:"qwen2.5",label:"Qwen 2.5（本地·文字·离线）",vision:!1},{id:"gemma2",label:"Gemma 2（本地·文字·离线）",vision:!1}]},lmstudio:{label:"LM Studio（本地部署，离线可用）",baseUrl:"http://localhost:1234/v1",models:[{id:"local-model",label:"本地模型（请在 LM Studio 中加载，离线可用）",vision:!0}]},custom:{label:"自定义",baseUrl:"",models:[{id:"PaddlePaddle/PaddleOCR-VL-1.5",label:"PaddleOCR-VL-1.5（免费·OCR识别）",vision:!0},{id:"custom",label:"自定义模型（手动输入）",vision:!0}]}},A="smartmistake_ai_configs",C="smartmistake_ai_active";function K(){try{const e="smartmistake_ai_config",t=localStorage.getItem(e);if(t){const s=JSON.parse(t),o={[s.provider]:{apiKey:s.apiKey,model:s.model,baseUrl:s.baseUrl}};localStorage.setItem(A,JSON.stringify(o)),localStorage.setItem(C,s.provider),localStorage.removeItem(e)}}catch{}}function p(){try{const e=localStorage.getItem(A);if(e)return JSON.parse(e)}catch{}return{}}function v(){K();try{const e=localStorage.getItem(C),t=p();if(e&&t[e]){const o=t[e];return{provider:e,apiKey:o.apiKey,model:o.model,baseUrl:o.baseUrl}}const s=Object.keys(t)[0];if(s&&t[s]){const o=t[s];return{provider:s,apiKey:o.apiKey,model:o.model,baseUrl:o.baseUrl}}}catch{}return null}function Y(e){return p()[e]||null}function X(e){const t=p();t[e.provider]={apiKey:e.apiKey,model:e.model,baseUrl:e.baseUrl},localStorage.setItem(A,JSON.stringify(t)),localStorage.setItem(C,e.provider)}function z(){const e=v();return!!(e!=null&&e.apiKey&&e.provider)}const O="smartm_ocr_configs",U="smartm_ocr_active";function _(){try{const e=localStorage.getItem(U),t=localStorage.getItem(O);if(!t)return null;const s=JSON.parse(t);if(e&&s[e]){const r=s[e];return{provider:e,apiKey:r.apiKey,model:r.model,baseUrl:r.baseUrl}}const o=Object.keys(s)[0];if(o&&s[o]){const r=s[o];return{provider:o,apiKey:r.apiKey,model:r.model,baseUrl:r.baseUrl}}}catch{}return null}function F(e){const t=p();t[e.provider]={apiKey:e.apiKey,model:e.model,baseUrl:e.baseUrl},localStorage.setItem(O,JSON.stringify(t)),localStorage.setItem(U,e.provider)}function W(){const e=_();return!!(e!=null&&e.apiKey&&e.provider)}function Z(e){try{const t=localStorage.getItem(O);return t&&JSON.parse(t)[e]||null}catch{return null}}async function ee(e){return M(e)}async function te(e){var o,r,i,n;const t=_();if(!t)throw new Error("未配置OCR API，请先在 AI 设置中配置OCR 识别");if(!D(t.provider,t.model))throw new Error(`当前 OCR 模型 ${t.model} 不支持图片识别。请使用带「视觉」标签的模型，如 GPT-4o Mini、Gemini 2.0 Flash、Qwen-VL 等`);const s=g(t.provider,t.baseUrl);try{const a=await fetch(`${s}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.apiKey}`},body:JSON.stringify({model:t.model,messages:[{role:"user",content:[{type:"text",text:`你是一位专业的试卷识别助手。请仔细识别图片中的内容。

图片说明：这是一张学生试卷/练习册/错题本的照片，包含印刷的题目文字（黑色印刷体）和学生的手写答案/批改标记。

请识别并区分以下三部分：
1. 【题目】只提取图片中印刷的题目文字（黑色印刷体），不包含任何手写内容
2. 【学生答案】提取学生手写的答案内容（如有）
3. 【正确答案】如果图片中有参考答案、批改标记或正确解答，请提取

重要要求：
- 只输出识别到的文字，不要添加任何解释、分析或额外内容
- 数学公式用纯阿拉伯数字和中文表示，禁止使用 LaTeX 格式（如禁止使用 \\(( \\) 或 $ $ 包裹）
- 小数点用"."表示，不要使用逗号
- 不要输出任何坐标标记、位置标记、框选标记（如<|LOC_XXX|>）
- 手写潦草无法识别时标注[无法识别]
- 如果图片中有多个填空（如"最大是( )，最小是( )"），请按顺序全部识别并保留原格式
- 如果图片中没有手写答案，学生答案填"无"
- 【关键】"正确答案"只提取图片中**明确标注的标准答案**（如练习册后的参考答案、老师批改的正确标记、红色√旁边的数字）。**严禁**将题目描述中的数字、示例数字、或学生的错误答案当作正确答案。如果图片中没有明确标注正确答案，正确答案必须填"无"

输出格式（严格按此格式，每项独占一行，不能省略任何一项）：
题目：xxx（保留所有填空位置，如"最大是( )，最小是( )"）
学生答案：xxx（多个答案用逗号分隔，如"5.499, 5.501"）
正确答案：xxx（多个答案用逗号分隔）`},{type:"image_url",image_url:{url:e.startsWith("data:")?e:`data:image/jpeg;base64,${e}`}}]}],max_tokens:2e3})});if(!a.ok){const y=await a.json().catch(()=>({}));throw new Error(((o=y.error)==null?void 0:o.message)||`OCR 错误: ${a.status}`)}let c=((n=(i=(r=(await a.json()).choices)==null?void 0:r[0])==null?void 0:i.message)==null?void 0:n.content)||"";d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!0}),c=R(c);const u=T(c);if(u.confidence==="low"&&!u.question)throw new Error(`识别结果异常：模型似乎未正确识别图片内容（返回了不相关的文本）。

可能原因：
1. 当前模型 ${t.model} 不支持图片识别（vision）
2. 图片模糊或格式不支持

建议：切换到支持视觉的模型，如 GPT-4o Mini、Gemini 2.0 Flash、Qwen-VL 等`);return{text:c.trim(),words:c.split(/\s+/).filter(y=>y.length>0),...u,confidence:u.confidence}}catch(a){throw d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!1,error:a.message}),new Error(a.message||"AI 识别失败")}}function T(e){const t={confidence:"low"};if(!e||e.trim().length===0)return t;const o=[/\\\\[\\(\\[]|\\$\\$|\\frac\{|\\sqrt\{/,/^日期：|^\d+月：|^\d+日：/m,/许可证号|许可证|工作单位|Source|ts-chz|统一社会信用代码|组织机构代码/,/必须提供|请提供|请填写|请确认|申请人|负责人|联系电话|联系地址/,/^尊敬的|^您好|^谢谢|^此致|^敬礼/,/^(http|https|www\.|ftp:)/].some(a=>a.test(e)),r=[/题目[:：]\s*([\s\S]*?)(?=学生答案[:：]|正确答案[:：]|$)/i,/【题目】\s*([\s\S]*?)(?=【学生答案】|【正确答案】|$)/i,/1\.\s*题目\s*[:：]\s*([\s\S]*?)(?=2\.\s*学生答案|3\.\s*正确答案|$)/i];for(const a of r){const l=e.match(a);if(l&&l[1].trim().length>5)if(t.question=l[1].trim(),t.question==="无"||t.question==="无。")t.question=void 0;else break}const i=[/学生答案[:：]\s*([\s\S]*?)(?=题目[:：]|正确答案[:：]|$)/i,/【学生答案】\s*([\s\S]*?)(?=【题目】|【正确答案】|$)/i,/2\.\s*学生答案\s*[:：]\s*([\s\S]*?)(?=1\.\s*题目|3\.\s*正确答案|$)/i];for(const a of i){const l=e.match(a);if(l)if(t.studentAnswer=l[1].trim(),t.studentAnswer==="无"||t.studentAnswer==="无。")t.studentAnswer=void 0;else break}const n=[/正确答案[:：]\s*([\s\S]*?)(?=题目[:：]|学生答案[:：]|$)/i,/【正确答案】\s*([\s\S]*?)(?=【题目】|【学生答案】|$)/i,/3\.\s*正确答案\s*[:：]\s*([\s\S]*?)(?=1\.\s*题目|2\.\s*学生答案|$)/i];for(const a of n){const l=e.match(a);if(l)if(t.correctAnswer=l[1].trim(),t.correctAnswer==="无"||t.correctAnswer==="无。")t.correctAnswer=void 0;else break}return t.question&&o?(t.question=void 0,t.studentAnswer=void 0,t.correctAnswer=void 0,t.confidence="low"):t.question?t.confidence="high":o?t.confidence="low":e.trim().length>10&&(t.question=e.trim(),t.confidence="medium"),t}function se(e){var t;return((t=h[e])==null?void 0:t.label)||e}function k(e){var t;return((t=h[e])==null?void 0:t.models)||[]}function oe(e){var s;return((s=k(e)[0])==null?void 0:s.id)||""}function g(e,t){var s;return(e==="custom"||e==="ollama"||e==="lmstudio")&&t?t:((s=h[e])==null?void 0:s.baseUrl)||""}function q(){return Object.entries(h).map(([e,t])=>({id:e,label:t.label,models:t.models,baseUrl:t.baseUrl}))}function D(e,t){const s=k(e);if(!t)return s.some(r=>r.vision);const o=s.find(r=>r.id===t);return(o==null?void 0:o.vision)??!1}function re(e){return e==="ollama"||e==="lmstudio"}function R(e){return e&&(e=e.replace(/<\|LOC_\d+\|>/g,""),e=e.replace(/<\|box_start\|>/g,""),e=e.replace(/<\|box_end\|>/g,""),e=e.replace(/<\|quad_start\|>/g,""),e=e.replace(/<\|quad_end\|>/g,""),e=e.replace(/<\|vision_[\w\-]+\|>/g,""),e=e.replace(/<\|image_[\w\-]+\|>/g,""),e=e.replace(/<\|ocr_[\w\-]+\|>/g,""),e=e.replace(/<\|text_[\w\-]+\|>/g,""),e=e.replace(/<\|ref_[\w\-]+\|>/g,""),e=e.replace(/<\|[\w\-_]+\|>/g,""),e=e.replace(/\\\(\s*([^\\]*)\s*\\\)/g,"$1"),e=e.replace(/\\\[\s*([^\\]*)\s*\\\]/g,"$1"),e=e.replace(/\$([^\$]*)\$/g,"$1"),e=e.replace(/^\s*\d+\s*(?=\n|$)/gm,""),e=e.replace(/```[\w]*\n?/g,""),e=e.replace(/\n{3,}/g,`

`),e=e.replace(/[ \t]+/g," "),e=e.replace(/^\s+|\s+$/gm,""),e.trim())}const m="smartmistake_explanation_cache",N=10080*60*1e3;function L(e){const t=`${e.questionText}|${e.studentAnswer||""}|${e.correctAnswer||""}|${e.errorReason}|${e.subject}`;let s=0;for(let o=0;o<t.length;o++){const r=t.charCodeAt(o);s=(s<<5)-s+r}return`exp_${Math.abs(s).toString(36)}`}function j(e){try{const t=localStorage.getItem(m);if(!t)return null;const s=JSON.parse(t),o=s[e];return o?Date.now()-o.timestamp>N?(delete s[e],localStorage.setItem(m,JSON.stringify(s)),null):o:null}catch{return null}}function $(e,t,s,o){try{const r=localStorage.getItem(m),i=r?JSON.parse(r):{},n=Object.keys(i);if(n.length>=100){const a=n.sort((l,c)=>i[l].timestamp-i[c].timestamp)[0];delete i[a]}i[e]={hash:e,explanation:t,timestamp:Date.now(),provider:s,model:o},localStorage.setItem(m,JSON.stringify(i))}catch{}}function ne(){localStorage.removeItem(m)}function ae(){try{const e=localStorage.getItem(m);if(!e)return{total:0,oldest:0};const t=JSON.parse(e),s=Object.values(t);return s.length===0?{total:0,oldest:0}:{total:s.length,oldest:Math.min(...s.map(o=>o.timestamp))}}catch{return{total:0,oldest:0}}}async function ie(e){const t=v();if(!t)throw new Error("未配置AI API");const s=L(e),o=j(s);if(o)return d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!0}),o.explanation;const r=g(t.provider,t.baseUrl);if(!r)throw new Error("未知的API 地址");const i=J(e);try{if(t.provider==="claude"){const n=await w(t.apiKey,r,t.model,i);return d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!0}),$(s,n,t.provider,t.model),n}else{const n=await b(t.apiKey,r,t.model,i);return d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!0}),$(s,n,t.provider,t.model),n}}catch(n){throw console.error("AI API 调用失败:",n),d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!1,error:n.message}),new Error(n.message||"AI 服务调用失败")}}function J(e){const t={careless:"粗心大意",concept:"概念不清",calculation:"计算错误",misreading:"审题偏差",unknown:"完全不会",other:"其他原因"};return`你是一位资深${e.subject}学科教师，擅长帮助学生分析错题并给出针对性讲解。
【重要】你必须独立完成题目计算，给出正确的答案和解析。不要受下方"学生提供的参考答案"影响，那只是学生自己填的，可能是错误的。

请分析以下错题，并给出详细讲解：

【题目】${e.questionText}

${e.studentAnswer?`【学生答案】${e.studentAnswer}`:""}
${e.correctAnswer?`【学生提供的参考答案】${e.correctAnswer}（注意：这是学生自己填的，不一定正确，请你自己重新计算）`:""}

【错误类型】${t[e.errorReason]||e.errorReason}
【涉及知识点】${e.knowledgePoints.join("、")}

请按以下结构输出讲解：

## 错误诊断
分析这道题的考查意图和学生出错的具体原因。

## 正确解题思路
分步骤给出完整的解题过程，确保逻辑清晰。必须包含：
1. 每步计算过程
2. 最终正确答案（用"正确答案：xxx"格式明确标出）
3. 关键知识点说明

## 正确答案
请明确给出本题的正确答案：
正确答案：xxx

## 避免再错策略
给出 3-4 条具体的建议，帮助学生避免类似错误。

## 相关知识点复习
简要梳理本题涉及的核心知识点。

要求：
1. 语言通俗易懂，适合学生理解
2. 步骤清晰，便于学生跟随
3. 针对性要强，紧扣错误类型
4. 必须独立计算，给出真正正确的答案
5. 如果学生的"参考答案"是错误的，请在讲解中指出错误原因`}async function w(e,t,s,o){var n,a,l;const r=await fetch(`${t}/messages`,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":e,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:s||"claude-3-sonnet-20240229",max_tokens:2e3,messages:[{role:"user",content:o}]})});if(!r.ok){const c=await r.json().catch(()=>({}));throw new Error(((n=c.error)==null?void 0:n.message)||`Claude API 错误: ${r.status}`)}return((l=(a=(await r.json()).content)==null?void 0:a[0])==null?void 0:l.text)||"AI 未返回内容"}async function b(e,t,s,o){var n,a,l,c;const r=await fetch(`${t}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({model:s,messages:[{role:"system",content:"你是一位专业的学科教师，擅长分析错题并给出针对性讲解。"},{role:"user",content:o}],temperature:.7,max_tokens:2e3})});if(!r.ok){const u=await r.json().catch(()=>({}));throw new Error(((n=u.error)==null?void 0:n.message)||`API 错误: ${r.status}`)}return((c=(l=(a=(await r.json()).choices)==null?void 0:a[0])==null?void 0:l.message)==null?void 0:c.content)||"AI 未返回内容"}async function M(e){try{const t=g(e.provider,e.baseUrl),s='你好，请回复"API 连接成功"即可。';let o="";return e.provider==="claude"?o=await w(e.apiKey,t,e.model,s):o=await b(e.apiKey,t,e.model,s),o.includes("成功")||o.includes("success")||o.length>0?{success:!0,message:"API 连接成功"}:{success:!1,message:"API 返回异常"}}catch(t){return{success:!1,message:t.message||"连接失败"}}}async function le(e){const t=v();if(!t)throw new Error("未配置AI API");const s=g(t.provider,t.baseUrl);if(!s)throw new Error("未知的API 地址");const o=`你是一位资深${e.subject}学科教师。请解答以下题目，直接给出正确答案。

【题目】${e.questionText}

要求：
1. 先给出简洁的解题步骤（2-4步即可）
2. 最后必须单独一行输出：正确答案：xxx
3. 只输出解题步骤和正确答案，不要输出任何额外内容（如问候语、鼓励语、格式说明等）
4. 如果是多空题，用逗号分隔多个答案，如：正确答案：5.504, 5.495`;try{let r="";t.provider==="claude"?r=await w(t.apiKey,s,t.model,o):r=await b(t.apiKey,s,t.model,o),d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!0});const i=r.match(/正确答案[：:]\s*([\s\S]+?)(?=\n|$)/i),n=i?i[1].trim():"",a=r.replace(/正确答案[：:]\s*[\s\S]+?$/,"").trim();return{answer:n,steps:a}}catch(r){throw d({provider:t.provider,model:t.model,timestamp:Date.now(),success:!1,error:r.message}),new Error(r.message||"AI 计算失败")}}const f="smartmistake_similar_questions_cache",Q=10080*60*1e3;function I(e){return`sq_${e}`}function V(e){try{const t=localStorage.getItem(f);if(!t)return null;const s=JSON.parse(t),o=s[I(e)];return o?Date.now()-o.timestamp>Q?(delete s[I(e)],localStorage.setItem(f,JSON.stringify(s)),null):o:null}catch{return null}}function G(e,t){try{const s=localStorage.getItem(f),o=s?JSON.parse(s):{},r=Object.keys(o);if(r.length>=50){const i=r.sort((n,a)=>o[n].timestamp-o[a].timestamp)[0];delete o[i]}o[I(e)]={hash:e,questions:t,timestamp:Date.now()},localStorage.setItem(f,JSON.stringify(o))}catch{}}function ce(){localStorage.removeItem(f)}async function de(e){const t=V(e.mistakeId);if(t)return t.questions;const s=v();if(!s)throw new Error("未配置AI API");const o=g(s.provider,s.baseUrl);if(!o)throw new Error("未知的API 地址");const r=`你是一位资深${e.subject}学科教师。请根据以下错题，生成 3 道相似的练习题，帮助学生巩固知识点。

【原题】${e.questionText}

【涉及知识点】${e.knowledgePoints.join("、")}
【难度】${e.difficulty}/5

要求：
1. 生成 3 道与原题知识点相似但数据/情景不同的练习题
2. 每道题都要有明确的题目和答案
3. 难度与原题相近（${e.difficulty}/5）
4. 题目要简洁清晰，适合学生练习

请按以下格式输出：

题目1：
[题目内容]
答案1：
[答案内容]

题目2：
[题目内容]
答案2：
[答案内容]

题目3：
[题目内容]
答案3：
[答案内容]`;try{let i;s.provider==="claude"?i=await w(s.apiKey,o,s.model,r):i=await b(s.apiKey,o,s.model,r);const n=x(i,e.difficulty);return n.length>0&&(d({provider:s.provider,model:s.model,timestamp:Date.now(),success:!0}),G(e.mistakeId,n)),n}catch(i){throw console.error("AI 相似题生成失败",i),d({provider:s.provider,model:s.model,timestamp:Date.now(),success:!1,error:i.message}),new Error(i.message||"AI 相似题生成失败")}}function x(e,t){const s=[],o=e.match(/题目[\d一二三四五]：\s*([\s\S]*?)(?=答案[\d一二三四五]：|$)/g),r=e.match(/答案[\d一二三四五]：\s*([\s\S]*?)(?=题目[\d一二三四五]：|$)/g);if(o&&r)for(let i=0;i<Math.min(o.length,r.length);i++){const n=o[i].replace(/^题目[\d一二三四五]：\s*/,"").trim(),a=r[i].replace(/^答案[\d一二三四五]：\s*/,"").trim();n&&a&&s.push({questionText:n,answer:a,difficulty:t,explanation:"",id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),isCompleted:!1,isCorrect:!1})}if(s.length===0){const i=e.split(`
`).filter(l=>l.trim());let n="",a="";for(const l of i)l.match(/^\d+\./)||l.match(/^题目/)?(n&&a&&s.push({questionText:n,answer:a,difficulty:t,explanation:"",id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),isCompleted:!1,isCorrect:!1}),n=l.replace(/^\d+\.\s*/,"").replace(/^题目[\d一二三四五]：\s*/,"").trim(),a=""):(l.match(/^答案/)||l.match(/^解析/))&&(a=l.replace(/^答案[\d一二三四五]：\s*/,"").replace(/^解析：\s*/,"").trim());n&&a&&s.push({questionText:n,answer:a,difficulty:t,explanation:"",id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),isCompleted:!1,isCorrect:!1})}return s.slice(0,3)}export{le as calculateCorrectAnswer,R as cleanOCRMarkers,ne as clearExplanationCache,ce as clearSimilarQuestionsCache,ie as generateAIExplanation,de as generateSimilarQuestionsAI,v as getAIConfig,p as getAllAIConfigs,q as getAllProviders,B as getAllProvidersUsage,g as getBaseUrl,oe as getDefaultModel,ae as getExplanationCacheStats,H as getNextAvailableProvider,_ as getOCRConfig,Z as getOCRProviderConfig,Y as getProviderConfig,se as getProviderLabel,k as getProviderModels,P as getUsageStats,z as hasAIConfig,W as hasOCRConfig,re as isLocalProvider,E as isProviderHealthy,te as recognizeWithAI,d as recordUsage,X as saveAIConfig,F as saveOCRConfig,D as supportsVision,M as testAIAPI,ee as testOCRAPI};
