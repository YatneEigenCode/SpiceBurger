//1-26-2018 jchoy v0.311 twigbud.js sc.start()
//8-11-2016 jchoy v0.291 SnCurly.cfgJsLoader, SnLiteLoader
//5-18-2016 jchoy v0.117 js604.appTool
//-----
SnAppFdn= function(){
  this.inherit= function( inst, base, a, b, c, d, e ){
    inst.cstr= base;  inst.cstr(a, b, c, d, e);
  }
  this.cgi= function(k,def,qy){
    var at=(qy+"").split(new RegExp("[\&\?]"+k+"="));
    return (at.length==1)?def:at[1].split("&")[0];
  }
  this.addEl= function( tag, par ){
	if (!par) par= document.body;
	return this._=par.appendChild( document.createElement(tag) );
  }
  this.exposeClassNames= function(obj){
    for (var m in obj){
      window[this._=m.charAt(0).toUpperCase()+m.substr(1)]= obj[m].constructor;
      console.log( this._+" class name is now defined.");
    } //TODO: check for native code, window/global
  }
}
SnAppLoader= function(){
  new SnAppFdn().inherit( this, SnLiteLoader );
  var $t= this;
  this.sendPkgUrl= "/ts/set/?i={0}";
  this.textPkgUrl= "/ts/text/?i={0}";
  this.prepChkPkg= function($s){
    try {$t.pkgBefore= pkg} catch(e) {}
    this.setNotification( function(){ $t.checkPkg($s) } );
  }
  this.setNotification= function($fcn){
    $t.chainNotify= null;
    try{ $t.chainNotify= _n } catch(e) {};
    _n= function(){ _n=$t.chainNotify; $fcn(); setTimeout('if(_n)_n()',100) }
  }
  this.checkPkg= function($s){
    if ($t.pkgBefore == pkg) return $t.setNotification( function(){ $t.checkPkg($s) } );
    $t.pkgBefore=pkg;
    $t.gotNewPkg($s);
  }
  this.gotNewPkg= function(s){  //override this
    pkg.starter.start();  //or specific action based on s
  }
}
SnLiteLoader= function(){
  new SnAppFdn().inherit( this, SnAppFdn );
  var $t= this;
  this.sendPkgUrl= this.textPkgUrl= "{0}";
  this.loadJs= function($s){
    var hd0= document.getElementsByTagName('head')[0];
    this.prepChkPkg($s);
    if ($s) this.addEl('script', hd0 ).src= this.textPkgUrl.replace('{0}',$s); 
  }
  this.cfgJsLoader= function( nm ){
    var cfg= (window[nm])? window[nm] : {};
    for (var m in cfg.topLevel) this[m]= cfg.topLevel[m];
  }
  this.prepChkPkg= function(){}
  this.sendPkg= function(json, num){
    var im=new Image(), res= "pkg="+ JSON.stringify(json) +"\ntry{_n()}catch(e){}";
    im.src= this.sendPkgUrl.replace('{0}',num) +"&data="+escape(res);
  }
}

//-----
SnCurly= function(){
  new SnAppFdn().inherit( this, SnLiteLoader);
  var $t= this;
  this.start= function( csvTs, csvCN, fcn ){
    this.startParms= [csvCN.split(','), fcn];
    this.cfgJsLoader( 'cfg' );
    for (var i=0,at=csvTs.split(','); i<at.length; i++)  this.loadJs( at[i] );
    this.count= 55;
    this.timer= setInterval( function(){ $t.doStart(); $t.count-- }, 100 );
  }
  //this.checkPkg= function(){}
  this.doStart= function(){
    if (this.count<=0) clearInterval( this.timer );
    for (var i=0,at=this.startParms[0]; i<at.length; i++) if ( !window[at[i]] ) return;
    clearInterval( this.timer );
    this.startParms[1]();
  }
}

//-----
SnApp= function(){
  new SnAppFdn().inherit( this, SnAppLoader);
  this.start= function(){
    //this.addEl('div').innerHTML= 'start 604';
    console.log( 'start 604' );
    this.cfgJsLoader( 'cfg' );
    //this.loadJs( this.cgi('js','619',location) );
    const sc= new SnCurly();
/*
    sc.start( sc.cgi("cts","622,621",location)
      , sc.cgi("ccn","CurlyStarter,ConSpool",location)
      , function(){ new CurlyStarter().start() }
    );
*/
    sc.start( sc.cgi("cts","622",location)
      , sc.cgi("ccn","CurlyStarter",location)
      , function(){ new CurlyStarter().start() }
    );
  }
}
//-----
pkg={
   snAppFdn: new SnAppFdn()
  ,appTool:  new SnAppLoader()
  ,snLiteLoader:  new SnLiteLoader()
  ,snAppLoader:  new SnAppLoader()
  ,snCurly: new SnCurly()
  ,starter:  new SnApp()
}

//----- client usage
cfg= { color:'blue'
  ,topLevel:{ sendPkgUrl: "ts/set/?i={0}"
             ,textPkgUrl: "ts/text/{0}.txt"}
}

