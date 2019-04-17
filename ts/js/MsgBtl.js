//4-16-2019 jchoy -  Spinner pattern
Msg5do = function(){
  this.ver= "1.157";
  this.max= 10;
  var $t=this, sto=new Sto().lo, fox=Msg5do.fox;
  $t.tuHost= "$r";  //$t.tag= "#default"
  $t.res= {a:[], f:function(){console.log('no res fcn')} };
  var meh= fox.meh;
  var og= fox.abc( "tmp/m5do","","2687","msgbtl_head_cfg" );
  this.start= function(tid,fn){
    $t.res.f= fn;  $t.res.a=[];  $t.res.tid=tid;
    var head, hdcfg= new HdSwitch().cfg;
    if ( !(head=sto.getItem(hdcfg.b)) ) head= hdcfg.a;
    fox.tstu( head, og.a, sto, $t.tuHost );
    fox.ttry( function(){return (sto.getItem(og.a))?1:0},
      function(){$t.fetHd()}, 20,
      function(){$t.fetAb()} );
  }
  this.fetAb= function(fetId){
    $t.res.a.unshift({body:"comm error for "+fetId});
    $t.res.f($t.res.a);
    new Spinner().stop();
  }
  this.fetHd= function(){
    console.log( 'startHd..', sto.getItem(og.a) );
    var id0= sto.getItem(og.a);
    if ($t.res.tid==id0)
      return $t.res.f([]);
    fox.tstu(id0,og.a,sto,this.tuHost);
    new Spinner().start( 10, "Loading "+id0 );
    if (id0) fox.ttry(
      function(){return (sto.getItem(og.a))?1:0},
      function(){$t.fetCh(id0)}, 20,
      function(){$t.fetAb(id0)} );
  }
  this.feTest= function(jp){
    if ($t.res.tid==jp) return true;
    return (jp=="") || ($t.res.a.length>=$t.max);
  }
  this.fetCh= function(fetId){
    var jo= JSON.parse(sto.getItem(og.a));
    jo.id= fetId;
    $t.res.a.unshift( jo );
    if (this.feTest(jo.prev))
      return new Spinner().stop( $t.res.f($t.res.a) );
    fox.tstu(jo.prev,og.a,sto,this.tuHost);
    new Spinner().start( 10, "Loading "+jo.prev );
    if (jo.prev) fox.ttry(
      function(){return (sto.getItem(og.a))?1:0},
      function(){$t.fetCh(jo.prev)}, 20,
      function(){$t.fetAb(jo.prev)} );
  }
}
Msg5do.fox= {
  ttry: function(testGo,run,max,runExp){
    var tto= { max: max, f$:function(){
      if (testGo()) return run();
      if (tto.max<=0) return runExp();
      if (tto.max-- > 0) setTimeout(tto.f$, 300); } };
    tto.f$();
  }
  ,meh:   [["body","String"]
          ,["date","Date"]
          ,["prev","String"]]
  ,tstu: function(p1,p2,sto,tuh){
    sto.setItem( p2, "" );  //clear file
    var pp= (p1.match(/^\$[a-z]/))? p1 : (tuh+p1);
    new Tstu().start(["", pp, p2]);
  }
  ,abc: function(){  var res={};
    for (var i=0; i<arguments.length; i++) 
      { res[String.fromCharCode(97+i)]= arguments[i];}
    return res;
  }
  ,new: function(){ return new Msg5do() }
}
//---
Spinner= function(color){
  new SnAppFdn().inherit( this, SnAppFdn );
  this.start= function(secs,s){
    this.getEl(s).ctlprop.expire= this.nowAdd((secs)?secs:0);
  }
  this.stop= function(){ this.start(0) }
  this.nowAdd= function(n){ return new Date().valueOf()+n*1000; }
  this.styleEl= function(res,s){
    Object.assign( res.style, {width:"80%",marginLeft:"10%", 
        height:240, textAlign:"center"} );
    var cp=res.ctlprop= { expire: this.nowAdd(999), n:1 };
    (cp.word= this.addEl('div',res)).innerHTML= (s)?s:"";
    cp.word.style.paddingTop= 50;
    (cp.bar= this.addEl('div',res)).style.height=10;
    var c4= " 4px, "+ ((color)? color : "blue");
    cp.bar.style.background= "repeating-linear-gradient( "
      +"45deg, white, white "+c4+c4+" 9px )";
  }
  this.getEl= function(s){
    var sty, og, res= document.getElementById("spinner");
    if (res && s) res.ctlprop.word.innerHTML= s;
    if (res) return res;
    (res= this.addEl('div')).id= "spinner";
    this.styleEl( res, s );
    var fcn= function(){
      if ( new Date().valueOf() > res.ctlprop.expire )
        return res.parentNode.removeChild( res );
      res.ctlprop.bar.style.width= (++res.ctlprop.n % 100) +"%";
      requestAnimationFrame( fcn );
    }
    return [res, fcn()][0];
  }
}
//---
MsgSdr= function(){
  var $t=this, sto=new Sto().lo, fox=Msg5do.fox, hsw=new HdSwitch();
  var og= fox.abc( "tmp/sendme", "2692", "tmp/rsv",  
    "location=\"http://spiceburger.okdaily.com/cgi2pm.html?lore=",
    "msgsdr_cfg", "2687", "ok",
    "not ready for writing", "missing cfg or class", new LinkMaker(),
    "error", "#://cmd/msend", "$r", "tmp/msghead",
    "no rsv list", "no thread head", "Message sent successfully" );  //opq
  this.start= function(){
    if (this.checkReq()) return og.k;
    fox.tstu( og.m+og.b, og.c, sto );  //load list
    fox.ttry( function(){return (sto.getItem(og.c))?1:0},
      function(){$t.takeNum()}, 20,
      function(){og.j.start( [0,".",og.o] )} );
    return og.g;
  }
  this.checkReq= function( isFull ){
    if (isFull) return og.j.start([0,".",og.h]);
    if ( (typeof(Tstu)=="undefined") || (!sto.getItem(og.e)) )
      return og.j.start([0,".",og.i]);
    if (!sto.getItem(og.a))
      return [new StoEdit().start([0,og.a]), og.j.start([0,og.l]) ];
  }
  this.takeNum= function(){   //shift and write back list
    var jo= JSON.parse(sto.getItem(og.c));
    if (jo.reservations.length<1) return this.checkReq(1)
    this.num= jo.reservations.shift();
    this.pkgCpm( og.b, JSON.stringify(jo) );

    fox.tstu( og.m+hsw.getNum(), og.n, sto );  //load list
    fox.ttry( function(){return (sto.getItem(og.n))?1:0},
      function(){$t.sendMsg()}, 20,
      function(){og.j.start( [0,".", og.n] )} );
  }
  this.sendMsg= function(){
    var jo= {date:new Date().valueOf(), body:sto.getItem(og.a)}
    jo.prev= sto.getItem(og.n);  //TODO: catch body > 300;
    this.pkgCpm( this.num, JSON.stringify(jo) );  //write msg
    this.pkgCpm( hsw.getNum(), this.num );  //update thread head
    sto.setItem( og.a, "" );  //erase tmp/sendme
    og.j.start( [1,".", og.q] );
  }
  this.pkgCpm= function(num,lore){
    var url= og.d + encodeURIComponent(lore) +"\"";
    new Image().src= url= sto.getItem(og.e) + "&i="+num
      +"&data="+ encodeURIComponent(url);  //fnf
    console.log( 'pkgCpm', url );
  }
}
//---
//new MsgBtl( new Msg5do(), new Sto().lo );
MsgBtl = function( fido, sto, isAni ){
  var $t=this, as=["","tmp/tumrec"];
  $t.pail= []; $t.sto= sto; $t.ub=new Btem($t.sto);
  this.start= function(){
    console.log( fido.ver );
    this.lastId= this.hogTums();
    fido.start(this.lastId, function(r){$t.restock(r)} );
  }
  this.restock= function( am ){
    for (var i=0; i<am.length; i++){
      var em= new Btem($t.sto).fill(am[i]);
      $t.pail.push( em.ice($t.pail.length) );
    }
    $t.ub.initStyle();
    if (!isAni) {
      $t.pail.map( function(o,i){ o.show($t)} );
      $t.ub.scrollEnd( 0, 999999 );
    } else 
      $t.ub.aniMap( $t.pail, function(o,i){
        o.show($t); window.scrollBy(0, 9999); } );
  }
  this.hogTums= function(){
    console.log( 'hogTums' );
    for (var em,i=this.pail.length; i>=0; i++){
      var em= new Btem($t.sto).thaw(i);
      if (em) this.pail.push(em);
      if (!em) i= -9;
    }
    return ($t.pail.length)? $t.pail.slice(-1)[0].getId() :"";
  }
  this.iceEm= function(em, nop, k){
    if ((k=this.getEmNum(em))>0) $t.pail[k].ice(k);
  }
  this.getEmNum= function(em){
    for (var i=0; i<$t.pail.length; i++)
      if (em == $t.pail[i]) return i;
    return -1;
  }
  this.delem= function(em, nop, k){
    if ((k=this.getEmNum(em))<0) return;
    $t.pail.splice(k,1);
    new Btem($t.sto).iceDel($t.pail.length);
    for (var i=k; i<$t.pail.length; i++)
      $t.pail[i].ice(i);
  }
}
//---
HdSwitch= function(){
  var cfg= this.cfg= Msg5do.fox.abc("2687","msgbtl_head_cfg","msgbtl/hd","hdn");
  this.start= function(){
    var hdn= new SnAppFdn().cgi(cfg.d, cfg.a, location);
    new Sto().lo.setItem( cfg.b, hdn );
  }
  this.getNum= function(){
    var head= new Sto().lo.getItem(cfg.b)
    return (head)? head : cfg.a;
  }
}
HdSwitch.new= function(){ return new HdSwitch() }

HdSto= function(){
  var og, sto= new Sto().lo;
  //og= Msg5do.fox.abc("2687","msgbtl_head_cfg","msgbtl/hd");
  og= HdSwitch.new().cfg;
  var parseI= function(s){ return parseInt(s.split("/").pop()) }
  var raw, pailFile, head= sto.getItem(og.b);
  raw= sto.getItem( pailFile= og.c+((head)?head:og.a) );
  this.pail= (raw)? JSON.parse(raw) : {ls:[]};

  this.setItem= function(sn,v){  //interim for backward compat
    this.setItm( parseI(sn), (v)? JSON.parse(v):null );
  }
  this.getItem= function(sn){
    var res= this.getItm( parseI(sn) );
    return (res)? JSON.stringify(res) : ""; 
  }
  this.setItm= function(i,jo){
    this.pail.ls[i]= jo; 
    sto.setItem( pailFile, JSON.stringify(this.pail) );
  }
  this.getItm= function(i){
    return this.pail.ls[i];
  }
}
HdSto.new= function(){ return new HdSto() }
//---
Btem= function(sto){
  this.jo= {body:"",meta:{},id:""};
  this.sto= sto;
  var D=document;
  var as= ["tub/","appendChild","createElement",
    "div","btem","innerHTML","bctl","[link]"];
  var og= Msg5do.fox.abc(1,2,3,4,5, 
    "innerHTML",7,8,"span","parentNode",
    "backgroundColor", D.createElement('div'),"&hearts;");
  og.m= [og.l[og.f]=og.m, og.l.innerText][1];
  this.initStyle= function(){
    if (this.css) this.rmNode(this.css);
    var sheet = D[as[2]]('style');
    var bdr="border: 1px solid gray; border-radius: 5px;";
    sheet[as[5]]= "."+as[4]+" {"+bdr+"margins:0 2 0 2;"
      +"width:70%; margin-left:15%; padding-left:2px; overflow-x:auto}\n"
      +".bcbn {"+bdr+"background-color:#DDBBBB;"
      +"margin-left: 4px; text-align:center;"
      +"padding:0 9px 0 9px}\n"
      +".bpnl {text-align: center}\n"
      +".fav {background-color: #FFFF80}\n"
      +".vaf {background-color: white}\n";
    D.body[as[1]](this.css=sheet);
  }
  this.show= function(btl){
    console.log( 'show', this.jo.id );
    var el= this.el=D.body[as[1]](D[as[2]](as[3]));
    var sb= this.jo.body;
    this.icoEl(el,sb,as[4],this.showCtl);
    this.colorFav( this.jo.meta.fav );
    el.ado= [this,btl];
  }
  this.icoEl= function(el,ih,cn,oc){
    el.innerHTML= ih;
    el.className= cn;
    el.onclick= oc;
    for (var i=0,at=ih.split(/\s/); i<at.length; i++)
      if (at[i].indexOf("://")>0) this.autolink(at[i],el);
  }
  this.autolink= function( url, el ){
      el.innerHTML+= " &nbsp; ";
      var ln= el[as[1]](D[as[2]]("a"));
      ln.innerHTML= as[7];
      ln.href= url;  ln.target="_blank";
  }
  this.showCtl= function(btl){
    console.log( 'showCtl' );
    var ao= this.getElementsByClassName('bpnl');
    if (ao.length>0) return this.ado[0].rmNode(ao[0]);
    var jo=this.ado[0]; pnl=this[as[1]](D[as[2]](as[3]));
    jo.icoEl(pnl,"","bpnl",);
    for (var i=0,a=["X", og.m]; i<a.length; i++){
      var ctl=pnl[as[1]](D[as[2]](og.i));
      jo.icoEl(ctl,a[i],"bcbn", jo.hCtlBtn);
    }
  }
  this.hCtlBtn= function(e){
    var div=this[og.j][og.j], bv=this[as[5]];
    console.log('hCtlBtn',bv,og.j);
    div.ado[0].rmNode(this[og.j]);
    if (bv=="X") {
      div.ado[0].rmNode(div);
      div.ado[1].delem(div.ado[0]);
    } else if (bv==og.m) {
      var isFav=(div.className.indexOf("fav")>0);
      div.ado[0].colorFav( ! isFav );    
      div.ado[1].iceEm(div.ado[0]);  
    }
    e.stopPropagation();
  }
  this.colorFav= function(isf){
    this.jo.meta.fav= (isf)? 1:0;
    this.el.className=as[4]+" "+((isf)?"fav":"vaf");
  }
  this.del= function(){
    console.log( 'del', this.innerHTML );
    var el=this.parentNode;
    el.ado[0].rmNode(el);
    el.ado[1].delem(el.ado[0]);
  }
  this.rmNode= function(el){
    el.parentNode.removeChild(el);
  }
  this.getId= function(){ 
    console.log( 'getId ', this.jo.id );
    return this.jo.id;
  }
  this.fill= function(msg){
    console.log( 'fill', msg );
    Object.assign(this.jo, msg);
    return this;
  }
  this.ice= function(num){
    this.sto.setItem(as[0]+num, JSON.stringify(this.jo));
    return this;
  }
  this.iceDel= function(num){
    this.sto.setItem(as[0]+num, "");
  }
  this.thaw= function(num){
    var raw= this.sto.getItem(as[0]+num);
    this.jo= (raw)? JSON.parse(raw) : {};
    return (raw)? this: null;
  }
  this.aniMap= function( a, f ){
    var k=0, act=function(t){
      if (k>=a.length) return;
      f( a[k++], k );
      window.requestAnimationFrame(act);
    }; act();
  }
  this.scrollEnd= function(){
    var D=document, div=document.createElement('div');
    D.body.appendChild(div).style.height= 699;
    window.scrollTo( 0, 99999 );
    D.body.removeChild( div );
  }
}
