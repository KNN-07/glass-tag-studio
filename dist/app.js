const $=id=>document.getElementById(id);
const ids=['width','height','base','radius','fit','zoom','panX','panY','brand','model','style','direction','position','ink','plate','size','inset','opacity','dpi','enabled'];
let art=null,artData=null,demo=true,guides=true;
const n=id=>Number($(id).value), clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function state(){return Object.fromEntries(ids.map(id=>[id,id==='enabled'?$(id).checked:$(id).value]));}
function notify(t){$('toast').textContent=t;$('toast').style.display='block';clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('toast').style.display='none',4000);}
function dimensions(){return {w:clamp(n('width')||500,100,1200),h:clamp(n('height')||450,100,1200)};}
function render(canvas,scale=2){const {w,h}=dimensions();canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);const c=canvas.getContext('2d');c.scale(scale,scale);c.save();c.beginPath();c.roundRect(0,0,w,h,n('radius'));c.clip();c.fillStyle=$('base').value;c.fillRect(0,0,w,h);
if(demo){const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,'#162d2b');g.addColorStop(.5,$('base').value);g.addColorStop(1,'#617a52');c.fillStyle=g;c.fillRect(0,0,w,h);c.save();c.translate(w*.45,h*.48);c.rotate(-.43);for(let i=0;i<26;i++){c.beginPath();c.ellipse(0,0,w*(.12+i*.026),h*(.12+i*.016),0,0,Math.PI*2);c.strokeStyle=i%4===0?'#c7dd9b80':'#afc68b28';c.lineWidth=i%4===0?1.1:.6;c.stroke();}c.restore();c.fillStyle='#ddecbb';c.font=`700 ${Math.min(w*.09,h*.09)}px "Barlow Condensed",sans-serif`;c.fillText('FIND YOUR',w*.075,h*.19);c.fillText('FLOW.',w*.075,h*.29);c.font=`${w*.016}px monospace`;c.fillStyle='#ddecbb99';c.fillText('PERSONAL SERIES   /   001',w*.08,h*.35);}
if(art){const fit=$('fit').value==='cover'?Math.max:Math.min;const s=fit(w/art.width,h/art.height)*n('zoom')/100;const aw=art.width*s,ah=art.height*s;const x=(w-aw)/2+n('panX')/100*Math.max(Math.abs(w-aw)/2,w*.25),y=(h-ah)/2+n('panY')/100*Math.max(Math.abs(h-ah)/2,h*.25);c.drawImage(art,x,y,aw,ah);}
if($('enabled').checked && $('style').value==='corner'){drawCornerTag(c,w,h);}else if($('enabled').checked){c.save();c.globalAlpha=n('opacity')/100;const k=n('size')/100;const font=7*k;const brand=$('brand').value,model=$('model').value;c.font=`800 ${font}px "Barlow Condensed",sans-serif`;const bw=c.measureText(brand).width;c.font=`${font*.72}px monospace`;const mw=c.measureText(model).width;const stacked=$('style').value==='stack';let tw=stacked?Math.max(bw,mw)+22*k:bw+mw+34*k,th=stacked?25*k:17*k;const inset=Math.min(n('inset'),Math.min(w,h)*.2),maxW=w-2*inset;const shrink=Math.min(1,maxW/tw);tw*=shrink;th*=shrink;const p=$('position').value,x=p.endsWith('r')?w-inset-tw:inset,y=p.startsWith('b')?h-inset-th:inset;c.translate(x,y);c.scale(shrink,shrink);tw/=shrink;th/=shrink;if($('style').value==='plate'){c.fillStyle=$('plate').value;c.fillRect(0,0,tw,th);}c.fillStyle=$('ink').value;c.strokeStyle=$('ink').value;c.lineWidth=.9*k;c.strokeRect(5*k,th/2-3*k,6*k,6*k);c.beginPath();c.moveTo(5*k,th/2+3*k);c.lineTo(11*k,th/2-3*k);c.stroke();c.textBaseline='middle';c.font=`800 ${font}px "Barlow Condensed",sans-serif`;c.fillText(brand,16*k,stacked?th/2-4*k:th/2);c.font=`${font*.72}px monospace`;c.fillText(model,stacked?16*k:24*k+bw,stacked?th/2+5*k:th/2);c.restore();}c.restore();}
function drawCornerTag(c,w,h){
  const k=n('size')/100,vertical=$('direction').value==='vertical';
  const brand=$('brand').value,model=$('model').value;
  const p=$('position').value,right=p.endsWith('r'),bottom=p.startsWith('b');
  const inset=Math.min(n('inset'),Math.min(w,h)*.2);
  const corner=Math.max(n('radius')+4,12), available=(vertical?h:w)-2*corner;
  c.save();c.globalAlpha=n('opacity')/100;
  c.font=`500 ${6.4*k}px "DM Sans",sans-serif`;
  const bw=c.measureText(brand).width;
  c.font=`400 ${5.8*k}px "DM Sans",sans-serif`;
  const mw=c.measureText(model).width;
  const length=Math.max(118*k,bw+mw+25*k),height=9*k;
  const shrink=Math.min(1,available/length),L=length*shrink,H=height*shrink;
  if(vertical){
    const x=right?w-inset-H:inset,y=bottom?h-corner:corner+L;
    c.translate(x,y);c.rotate(-Math.PI/2);
  }else c.translate(right?w-corner-L:corner,bottom?h-inset-H:inset);
  c.scale(shrink,shrink);
  c.fillStyle=$('plate').value;c.fillRect(0,0,length,height);
  c.fillStyle=$('ink').value;c.textBaseline='middle';
  c.font=`500 ${6.4*k}px "DM Sans",sans-serif`;c.fillText(brand,3*k,height/2);
  c.font=`400 ${5.8*k}px "DM Sans",sans-serif`;c.fillText(model,length-mw-10*k,height/2);
  c.strokeStyle=$('ink').value;c.lineWidth=.65*k;
  c.beginPath();c.arc(length-4.5*k,height/2,2*k,0,Math.PI*1.65);c.stroke();
  c.restore();
}
function update(){render($('preview'));const {w,h}=dimensions();$('topdim').textContent=w+' mm';$('sidedim').textContent=h+' mm';$('summary').textContent=`${w} × ${h} mm`;$('ratio').textContent=(w/h).toFixed(2)+' : 1';for(const [id,suffix] of [['radius',' mm'],['zoom','%'],['size','%'],['inset',' mm'],['opacity','%']])$(id+'Out').value=$(id).value+suffix;const px=Math.round(w/25.4*n('dpi')),py=Math.round(h/25.4*n('dpi'));$('pixels').textContent=`${px.toLocaleString()} × ${py.toLocaleString()} px · ${n('dpi')} DPI target`;$('export').disabled=px*py>70000000;$('export').title=px*py>70000000?'Choose a lower resolution for this size':'';}
ids.forEach(id=>$(id).addEventListener('input',()=>{if(id==='width'||id==='height')$('preset').value='custom';update();}));
['width','height'].forEach(id=>$(id).addEventListener('change',()=>{$(id).value=clamp(n(id)||500,100,1200);update();}));
$('preset').onchange=()=>{if($('preset').value!=='custom'){const [w,h]=$('preset').value.split(',');$('width').value=w;$('height').value=h;update();}};
async function readImage(file){if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>20*1024*1024){notify('Choose a PNG, JPG or WebP under 20 MB.');return;}try{const data=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});await setImage(data);$('zoom').value=100;$('panX').value=0;$('panY').value=0;update();notify('Artwork added. Use zoom and position to compose it.');}catch{notify('This image could not be opened.');}}
function setImage(data){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{art=im;artData=data;demo=false;resolve();};im.onerror=reject;im.src=data;});}
$('upload').onchange=e=>readImage(e.target.files[0]);$('drop').ondragover=e=>{e.preventDefault();};$('drop').ondrop=e=>{e.preventDefault();readImage(e.dataTransfer.files[0]);};$('clear').onclick=()=>{art=null;artData=null;demo=false;update();};$('demo').onclick=()=>{art=null;artData=null;demo=true;update();};
$('guides').onclick=()=>{guides=!guides;$('topdim').hidden=!guides;$('sidedim').hidden=!guides;$('guides').textContent='Guides '+(guides?'on':'off');$('guides').setAttribute('aria-pressed',guides);};
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
$('export').onclick=async()=>{const button=$('export');button.disabled=true;button.textContent='Exporting…';await new Promise(r=>setTimeout(r,40));try{await document.fonts.ready;const canvas=document.createElement('canvas');render(canvas,n('dpi')/25.4);const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));if(!blob)throw Error();download(blob,`glass-pad-${dimensions().w}x${dimensions().h}mm-${n('dpi')}dpi.png`);notify('PNG exported. Set the stated dimensions in your print software.');canvas.width=0;canvas.height=0;}catch{notify('Export failed. Try a lower resolution.');}finally{button.textContent='Export PNG ↗';update();}};
$('save').onclick=()=>download(new Blob([JSON.stringify({version:1,settings:state(),demo,artData})],{type:'application/json'}),'glass-studio-project.json');
$('load').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>30*1024*1024)throw Error();const data=JSON.parse(await file.text());if(data.version!==1||!data.settings)throw Error();if(data.artData&&!/^data:image\/(png|jpeg|webp);base64,/.test(data.artData))throw Error();if(data.artData)await setImage(data.artData);else{art=null;artData=null;}demo=Boolean(data.demo)&&!art;for(const id of ids){if(id in data.settings){if(id==='enabled')$(id).checked=Boolean(data.settings[id]);else $(id).value=String(data.settings[id]);}}$('width').value=dimensions().w;$('height').value=dimensions().h;$('preset').value='custom';update();notify('Project opened.');}catch{notify('Could not open this project file.');}e.target.value='';};
update();document.fonts.ready.then(update);
