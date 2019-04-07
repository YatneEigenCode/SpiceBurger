//4-7-2019 jchoy v1.119 fox.abc
Msg5do = function(){
  this.max= 10;
  var $t=this, sto=new Sto().lo, fox=Msg5do.fox;
  $t.tuHost= "$r";  //"$t/";  //$t.tag= "#default"
  //TODO: handle mixed tuHosts
  $t.res= {a:[], f:function(){console.log('no res fcn')} };
  var meh= fox.meh;
  var as=["tmp/m5do","m5tst_cfg","2687"];
  var og= fox.abc( "tmp/m5do","","2687" );
  this.start= function(tid,fn){
    $t.res.f= fn;  $t.res.a=[];  $t.res.tid=tid;
    sto.setItem( og.a, "" );
    new Tstu().start(["", $t.tuHost+og.c, og.a]);
    fox.ttry( function(){return (sto.getItem(as[0]))?1:0},
      function(){$t.fetHd()}, 20,
      function(){$t.fetAb()} );
  }
  this.fetAb= function(fetId){
    $t.res.a.unshift({body:"comm error for "+fetId});
    $t.res.f($t.res.a);
  }
  this.fetHd= function(){
    console.log( 'startHd..', sto.getItem(as[0]) );
    var id0= sto.getItem(as[0]);
    if ($t.res.tid==id0)
      return $t.res.f([]);
    fox.tstu(this.tuHost+id0,as[0],sto);
    if (id0) fox.ttry(
      function(){return (sto.getItem(as[0]))?1:0},
      function(){$t.fetCh(id0)}, 20,
      function(){$t.fetAb(id0)} );
  }
  this.feTest= function(jp){
    if ($t.res.tid==jp) return true;
    return (jp=="") || ($t.res.a.length>=$t.max);
  }
  this.fetCh= function(fetId){
    var jo= JSON.parse(sto.getItem(as[0]));
    jo.id= fetId;
    $t.res.a.unshift( jo );
    if (this.feTest(jo.prev))
         return $t.res.f($t.res.a);
    fox.tstu($t.tuHost+jo.prev,as[0],sto);
    if (jo.prev) fox.ttry(
      function(){return (sto.getItem(as[0]))?1:0},
      function(){$t.fetCh(jo.prev)}, 20,
      function(){$t.fetAb(jo.prev)} );
  }
  this.bldJo= function(meh, dat, id){
    var res={};
    for (var i=0; i<meh.length; i++)
      if (i<dat.length)
        res[meh[i][0]]= new window[meh[i][1]](dat[i]);
    if (id) res.id= id;
    return res;
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
  ,tstu: function(p1,p2,sto){
    sto.setItem( p2, "" );  //clear file
    new Tstu().start(["",p1,p2]);
  }
  ,abc: function(){  var res={};
    for (var i=0; i<arguments.length; i++) 
      { res[String.fromCharCode(97+i)]= arguments[i];}
    return res;
  }
}
//---
//new MsgBtl( new Msg5do(), new Sto().lo );
MsgBtl = function(fido,sto){
  var $t=this, as=["","tmp/tumrec"];
  this.pail= []; this.sto= sto;
  this.start= function(){
    this.lastId= this.hogTums();
    console.log( 'start lastId', this.lastId );
    fido.start(this.lastId, function(r){$t.restock(r)} );
    //fido.start(this.lastId).map( this.restock );
  }
  this.restock= function( am ){
    for (var i=0; i<am.length; i++){
      var em= new Btem($t.sto).fill(am[i]);
      $t.pail.push( em.ice($t.pail.length) );
    }
    console.log( 'pail.len',$t.pail.length );
    if ($t.pail.length>0) $t.pail[0].initStyle();
    $t.pail.map( function(o,i){ o.show($t)} );
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
      +"width:70%; margin-left:15%; padding-left:2px}\n"
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
    if (ih.indexOf("://")>0) {
      el.innerHTML+= " &nbsp; ";
      var ln= el[as[1]](D[as[2]]("a"));
      ln.innerHTML= as[7];
      ln.href= ih;  ln.target="_blank";
    }
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
}
