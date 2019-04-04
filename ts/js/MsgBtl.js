//4-4-2019 jchoy v0.128 fetAb
Msg5do = function(){
  this.max= 10;
  var $t=this, sto=new Sto().lo, fox=Msg5do.fox;
  $t.tag= "#default", $t.tuHost= "$b/";
  $t.res= {a:[], f:function(){console.log('no res fcn')} };
  var meh=[["body","String"]
          ,["date","Date"]
          ,["prev","String"]];
  var as=["tmp/m5do","m5tst_cfg"];
  this.start= function(mid,fn){
    $t.res.f= fn;  $t.res.a=[];
    //first get pointer to list head from tsrw
    sto.setItem( as[0], "" );
    sto.setItem( as[0], sto.getItem(as[1]) );
    fox.ttry( function(){return (sto.getItem(as[0]))?1:0},
      function(){$t.startHd()}, 20,
      function(){$t.fetAb()} );
    //new Tstu().start(["",prev,as[0]]);
    //this.startSim(mid,fn);
  }
  this.fetAb= function(){
    $t.res.a.unshift({body:"comm error"}); //TODO: a is undefined
    $t.res.f($t.res.a);
  }
  this.startHd= function(){
    console.log( 'startHd..', sto.getItem(as[0]) );
    var id0, at= sto.getItem(as[0]).split("\n");
    for (var ap,i=0; i<at.length; i++){
      ap= at[i].split(',');
      if (ap[0]==this.tag) id0=ap[1]; 
    }
    sto.setItem( as[0], "" );
    new Tstu().start(["",this.tuHost+id0,as[0]]);
    if (id0) fox.ttry(
      function(){return (sto.getItem(as[0]))?1:0},
      function(){$t.fetCh()}, 20,
      function(){$t.fetAb()} );
  }
  this.fetCh= function(){
    //detect endpoint
    console.log( 'fetCh' );
    console.log( 'fetCh..', sto.getItem(as[0]) );
    $t.res.a.unshift( JSON.parse(sto.getItem(as[0])) );
    $t.res.f($t.res.a);
  }
  this.startSim= function(mid,fn){
    var key= "qwe56"; //prompt('unique prefix');
    var res=[],dt= new Date().valueOf();
    var rd= "QZWXYK.".charAt(Math.random()*6);
    for (var pv,i=5,isn=1,s=rd+key; i>2; i--){
      pv= key+(i-1);
      if (key+i == mid) isn=0;
      if (isn)
        res.push(this.bldJo(meh,[s+i,dt+i*1000,pv],key+i));
    }
    if (res.length>this.max) res.length=this.max;
    fn( res.reverse() );
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
  ,x:0
}
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
    $t.pail.map( function(o,i){
      console.log(i); o.show($t)} );
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
console.log('delem',$t.pail.length);
    for (var i=k; i<$t.pail.length; i++)
      $t.pail[i].ice(i);
  }
}
//---
Btem= function(sto){
  this.jo= {body:"",meta:{},id:""};
  this.sto= sto;
  var as= ["tub/","appendChild","createElement", "div","btem","innerHTML","bctl"];
  var D=document;
  this.initStyle= function(){
    if (this.css) this.rmNode(this.css);
    var sheet = D[as[2]]('style');
    var bdr="border: 1px solid gray; border-radius: 5px;";
    sheet[as[5]]= "."+as[4]+" {"+bdr+"margins:0 2 0 2;"
      +"width:60%; margin-left:20%; padding-left:2px}\n"
      +"."+as[6]+" {"+bdr+"background-color:#DDBBBB;"
      +"margins:0 2 0 2; width:8%; text-align:center;"
      +"margin-left:45%}";
    D.body[as[1]](this.css=sheet);
  }
  this.show= function(btl){
    console.log( 'show', this.jo.id );
    var el= this.el=D.body[as[1]](D[as[2]](as[3]));
    el.innerHTML= this.jo.body;
    el.className= as[4];
    el.onclick= this.showCtl;
    el.ado= [this,btl];
  }
  this.showCtl= function(btl){
    console.log( 'showCtl' );
    var ao= this.getElementsByClassName(as[6]);
    if (ao.length>0) return this.ado[0].rmNode(ao[0]);
    var ctl=this[as[1]](D[as[2]](as[3]));
    ctl.innerHTML= "X";
    ctl.className= as[6];
    ctl.onclick= this.ado[0].del;
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
  this.getId= function(){ return this.jo.id }
  this.fill= function(msg){
    console.log( 'fill', msg );
    Object.assign(this.jo, msg);
    return this;
  }
  this.ice= function(num){
    console.log( 'ice ',as[0]+num );
    this.sto.setItem(as[0]+num, JSON.stringify(this.jo));
    return this;
  }
  this.iceDel= function(num){
    console.log( 'icedel '+as[0]+num );
    this.sto.setItem(as[0]+num, "");
  }
  this.thaw= function(num){
    var raw= this.sto.getItem(as[0]+num);
    this.jo= (raw)? JSON.parse(raw) : {};
    console.log( 'thaw ',num,this.jo.id );
    return (raw)? this: null;
  }
}
