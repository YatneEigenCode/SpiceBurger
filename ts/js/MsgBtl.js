//4-10-2019 jchoy v1.135 autolink fix typo
Msg5do = function(){
  this.ver= "1.135";
  this.max= 10;
  var $t=this, sto=new Sto().lo, fox=Msg5do.fox;
  $t.tuHost= "$r";  //$t.tag= "#default"
  $t.res= {a:[], f:function(){console.log('no res fcn')} };
  var meh= fox.meh;
  var og= fox.abc( "tmp/m5do","","2687","msgbtl_head_cfg" );
  this.start= function(tid,fn){
    $t.res.f= fn;  $t.res.a=[];  $t.res.tid=tid;
    //if (!($t.res.head=sto.getItem(og.d))) $t.res.head=og.c;
    fox.tstu( og.c, og.a, sto, $t.tuHost );
    fox.ttry( function(){return (sto.getItem(og.a))?1:0},
      function(){$t.fetHd()}, 20,
      function(){$t.fetAb()} );
  }
  this.fetAb= function(fetId){
    $t.res.a.unshift({body:"comm error for "+fetId});
    $t.res.f($t.res.a);
  }
  this.fetHd= function(){
    console.log( 'startHd..', sto.getItem(og.a) );
    var id0= sto.getItem(og.a);
    if ($t.res.tid==id0)
      return $t.res.f([]);
    fox.tstu(id0,og.a,sto,this.tuHost);
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
         return $t.res.f($t.res.a);
    fox.tstu(jo.prev,og.a,sto,this.tuHost);
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
}
MsgSdr= function(){
  var $t=this, sto=new Sto().lo, fox=Msg5do.fox;
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

    fox.tstu( og.m+og.f, og.n, sto );  //load list
    fox.ttry( function(){return (sto.getItem(og.n))?1:0},
      function(){$t.sendMsg()}, 20,
      function(){og.j.start( [0,".", og.n] )} );
  }
  this.sendMsg= function(){
    var jo= {date:new Date().valueOf(), body:sto.getItem(og.a)}
    jo.prev= sto.getItem(og.n);  //TODO: catch body > 300;
    this.pkgCpm( this.num, JSON.stringify(jo) );  //write msg
    this.pkgCpm( og.f, this.num );  //update thread head
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
  this.delem= function(em){
    var k= -1;
    for (var i=0; i<$t.pail.length; i++)
      if (em == $t.pail[i]) k=i;
    if (k < 0) return;
    $t.pail.splice(k,1);
    new Btem($t.sto).iceDel($t.pail.length);
    for (var i=k; i<$t.pail.length; i++)
      $t.pail[i].ice(i);
  }
}
//---
Btem= function(sto){
  this.jo= {body:"",meta:{},id:""};
  this.sto= sto;
  var as= ["tub/","appendChild","createElement",
    "div","btem","innerHTML","bctl","[link]"];
  var D=document;
  this.initStyle= function(){
    if (this.css) this.rmNode(this.css);
    var sheet = D[as[2]]('style');
    var bdr="border: 1px solid gray; border-radius: 5px;";
    sheet[as[5]]= "."+as[4]+" {"+bdr+"margins:0 2 0 2;"
      +"width:70%; margin-left:15%; padding-left:2px; overflow:scroll}\n"
      +"."+as[6]+" {"+bdr+"background-color:#DDBBBB;"
      +"margins:0 2 0 2; width:8%; text-align:center;"
      +"margin-left:45%}";
    D.body[as[1]](this.css=sheet);
  }
  this.show= function(btl){
    console.log( 'show', this.jo.id );
    var el= this.el=D.body[as[1]](D[as[2]](as[3]));
    var sb= this.jo.body;
    this.icoEl(el,sb,as[4],this.showCtl);
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
    var ao= this.getElementsByClassName(as[6]);
    if (ao.length>0) return this.ado[0].rmNode(ao[0]);
    var ctl=this[as[1]](D[as[2]](as[3]));
    this.ado[0].icoEl(ctl,"X",as[6],this.ado[0].del);
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
