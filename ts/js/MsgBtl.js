//4-1-2019 jchoy v0.112 MsgBtl, Msg5do, Btem
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
  this.jo= {lore:"",meta:{},id:""};
  this.sto= sto;
  var as= ["tum/"];
  this.delem= function(){
  }
  this.getId= function(){ return this.jo.id }
  this.fill= function(msg){
    return [this, this.jo.lore= msg][0];
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
