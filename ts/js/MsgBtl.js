//4-2-2019 jchoy v0.115 toggle controls
Msg5do = function(){
  this.max= 10;
  var meh=[["body","String"]
          ,["date","Date"]
          ,["prev","String"]];
  this.start= function(mid){
    var res= [], pail= {
        "qwe123d" :
      ["and I cannot lie", 1554170636026,"qwe123c"],
        "qwe123c" :
      ["I like big data", 1554170625026,"qwe123b"]
    }
    for (var m in pail)
      res.push( this.bldJo(meh,pail[m],m) )
    return res;
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
//new MsgBtl( new Msg5do(), new Sto().lo );
MsgBtl = function(fido,sto){
  var $t=this, as=["","tmp/tumrec"];
  this.pail= []; this.sto= sto;
  this.start= function(){
    this.lastId= this.hogTums();
    fido.start(this.lastId).map( this.restock );
    if (this.pail.length>0) this.pail[0].initStyle();
    this.pail.map( function(o){o.show($t)} );
  }
  this.restock= function( msg ){
    var em= new Btem($t.sto).fill(msg);
    $t.pail.push( em.ice($t.pail.length) );
  }
  this.hogTums= function(){
    for (var em,i=this.pail.length; i>=0; i++){
      var em= new Btem($t.sto).thaw(i);
      if (em) this.pail.push(em);
      if (!em) i= -9;
    }
    return ($t.pail.length)? $t.pail.slice(-1)[0].getId() :"";
  }
  this.delem= function(){
  }
}
Btem= function(sto){
  this.jo= {body:"",meta:{},id:""};
  this.sto= sto;
  var as= ["tum/","appendChild","createElement", "div","btem","innerHTML","bctl"];
  var D=document;
  this.initStyle= function(){
    if (this.css) this.rmNode(this.css);
    var sheet = D[as[2]]('style');
    var bdr="border: 1px solid gray; border-radius: 5px;";
    sheet[as[5]]= "."+as[4]+" {"+bdr+"margins:0 2 0 2}\n"
      +"."+as[6]+" {"+bdr+"background-color:#DDBBBB;"
      +"margins:0 2 0 2; width:8%; text-align:center}";
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
    this.parentNode.ado[0].rmNode(this.parentNode);
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
    this.sto.setItem(as[0]+num, JSON.stringify(this.jo));
  }
  this.thaw= function(num){
    var raw= this.sto.getItem(as[0]+num);
    this.jo= (raw)? JSON.parse(raw) : {};
    return (raw)? this: null;
  }
}
