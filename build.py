import re,subprocess,json,os
T=os.environ.get('TMPDIR','/tmp')
open(T+'/b.js','w').write("var window={};load('ev_auto.js');load('data.js');load('render.js');var o={};window.RENDER(window.CASE,function(i,h){o[i]=h});print(JSON.stringify(o));")
r=subprocess.run(['/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc',T+'/b.js'],capture_output=True,text=True)
if r.stderr or not r.stdout.startswith('{'): print('ERR',r.stderr[:800],r.stdout[:300]); raise SystemExit(1)
fr=json.loads(r.stdout)
h=open('index.tpl.html').read()
for k,v in fr.items():
    pat=re.compile(r'(<(div|ul) [^>]*id="%s"[^>]*>)(</\2>)'%k)
    m=pat.search(h); assert m,k
    h=h[:m.start()]+m.group(1)+v+m.group(3)+h[m.end():]
if 'render.js' not in h: h=h.replace('<script src="data.js"></script>','<script src="data.js"></script><script src="render.js"></script>')
open('index.html','w').write(h); print({k:len(v) for k,v in fr.items()})
