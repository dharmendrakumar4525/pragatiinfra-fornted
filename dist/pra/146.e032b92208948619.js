"use strict";(self.webpackChunkpra=self.webpackChunkpra||[]).push([[146],{146:(H,U,p)=>{p.r(U),p.d(U,{ProcurmentModuleModule:()=>G});var f=p(6895),h=p(9299),r=p(4006),d=p(8608),Z=p(7489),u=p(5439),m=p(2340),t=p(4650),_=p(8507),q=p(6104),w=p(529),P=p(3238),g=p(9549),b=p(4859),k=p(3546),c=p(9602),v=p(4850),A=p(7392),y=p(4144),N=p(1948),F=p(4385),T=p(3683);function I(i,s){if(1&i&&(t.TgZ(0,"mat-option",52),t._uU(1),t.qZA()),2&i){const e=s.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",e.site_name," ")}}function O(i,s){if(1&i&&(t.TgZ(0,"mat-option",52),t._uU(1),t.qZA()),2&i){const e=s.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",e.item_name," ")}}function R(i,s){if(1&i&&(t.TgZ(0,"mat-option",52),t._uU(1),t.qZA()),2&i){const e=s.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",e.unit," ")}}function D(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"a",64),t.NdJ("click",function(){t.CHM(e);const n=t.oxw().index,a=t.oxw();return t.KtG(a.delete(n))}),t._UZ(1,"i",65),t.qZA()}}function Y(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"tr",53)(1,"td",54),t._uU(2),t.qZA(),t.ynx(3,55),t.TgZ(4,"td")(5,"mat-select",56),t.NdJ("selectionChange",function(n){const l=t.CHM(e).index,C=t.oxw();return t.KtG(C.selectedItem(n,l))}),t.YNc(6,O,2,2,"mat-option",40),t.qZA()(),t.TgZ(7,"td",57),t._uU(8),t.qZA(),t.TgZ(9,"td",57),t._uU(10),t.qZA(),t.TgZ(11,"td")(12,"mat-select",58),t.YNc(13,R,2,2,"mat-option",40),t.qZA()(),t.TgZ(14,"td"),t._UZ(15,"input",59),t.qZA(),t.TgZ(16,"td"),t._UZ(17,"input",60),t.qZA(),t.TgZ(18,"td"),t._UZ(19,"input",61),t.qZA(),t.TgZ(20,"td")(21,"div",62),t.YNc(22,D,2,0,"a",63),t.qZA()(),t.BQk(),t.qZA()}if(2&i){const e=s.$implicit,o=s.index,n=t.oxw();let a,l;t.xp6(2),t.hij(" ",o+1," "),t.xp6(1),t.Q6J("formGroupName",o),t.xp6(3),t.Q6J("ngForOf",n.itemList),t.xp6(2),t.hij(" ",null==(a=e.get("category"))?null:a.value," "),t.xp6(2),t.hij(" ",null==(l=e.get("subCategory"))?null:l.value," "),t.xp6(3),t.Q6J("ngForOf",n.uomList),t.xp6(9),t.Q6J("ngIf",o>0)}}let S=(()=>{class i{constructor(e,o,n,a,l){this.router=e,this.httpService=o,this.snack=n,this.formBuilder=a,this.http=l,this.load=!1,this.purchaseRequestForm=new r.cw({title:new r.NI("",r.kI.required),date:new r.NI(u().format("DD-MM-YYYY"),r.kI.required),expected_delivery_date:new r.NI(u().add(1,"days").format("DD-MM-YYYY"),r.kI.required),purchase_request_number:new r.NI(""),site:new r.NI("",r.kI.required),local_purchase:new r.NI("yes",r.kI.required),remarks:new r.NI(""),items:this.formBuilder.array([this.createItemArrayForm()])})}createItemArrayForm(){return new r.cw({item_id:new r.NI("",r.kI.required),qty:new r.NI("",r.kI.required),category:new r.NI(""),subCategory:new r.NI(""),attachment:new r.NI(""),remark:new r.NI("",r.kI.required),uom:new r.NI("",r.kI.required)})}onSubmit(){if(this.load||!this.purchaseRequestForm.valid)return;let e=this.purchaseRequestForm.value;e.date=u(e.date,"DD-MM-YYYY").toDate(),e.expected_delivery_date=new Date(e.expected_delivery_date),console.log("requestData",e),this.load=!0,this.httpService.POST(d.Fj,e).subscribe({next:o=>{this.load=!1,this.snack.notify("Purchase requrest has been created.",1),this.router.navigate(["procurement/prList"])},error:o=>{if(this.load=!1,o.errors&&!(0,Z.isEmpty)(o.errors)){let n="<ul>";for(let a in o.errors)n+=`<li>${o.errors[a][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(o.message,2)}})}getList(){const e=this.http.get(`${m.N.api_path}${d.PE}`),o=this.http.get(`${m.N.api_path}${d.o7}`),n=this.http.get(`${m.N.api_path}${d.S3}`);this.httpService.multipleRequests([e,o,n],{}).subscribe(a=>{a&&(this.uomList=a[0].data,this.itemList=a[1].data,this.siteList=a[2].data)})}addItem(){this.items=this.purchaseRequestForm.get("items"),this.items.push(this.createItem())}selectedItem(e,o){let n=[];n[o]={category:this.itemList.filter(a=>a._id==e.value)[0]?.categoryDetail.name,subCategory:this.itemList.filter(a=>a._id==e.value)[0]?.subCategoryDetail.subcategory_name},this.purchaseRequestForm.patchValue({items:n})}createItem(){return this.formBuilder.group({item_id:new r.NI("",r.kI.required),qty:new r.NI("",r.kI.required),attachment:new r.NI(""),remark:new r.NI("",r.kI.required),uom:new r.NI("",r.kI.required)})}delete(e){this.purchaseRequestForm.get("items").removeAt(e)}ngOnInit(){this.getList()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(h.F0),t.Y36(_.s),t.Y36(q.o),t.Y36(r.qu),t.Y36(w.eN))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-purchase-request"]],decls:133,vars:8,consts:[[2,"height","100px","background-color","#fff"],[2,"margin-top","40px","margin-left","20px"],["src","./assets/images/preq.svg"],[2,"font-family","Poppins","margin-top","40px","font-style","normal","font-weight","600","font-size","30px","color","#1E293B","margin-left","10px"],[1,"example-spacer"],["mat-icon-button","",2,"margin-right","40px"],[2,"margin-top","40px"],[2,"width","1130px","border","2px solid #C5C5C5","margin-left","30px"],[2,"display","flex","flex-direction","row","font-family","Poppins","font-weight","600"],[2,"margin-top","20px","margin-left","30px","display","flex"],["src","./assets/images/prl.svg"],[2,"color","#233A61","margin-left","5px","font-size","14px"],[2,"width","90px","margin-left","10px","margin-top","10px","border","1px dashed"],[2,"margin-top","20px","margin-left","10px","display","flex"],["src","./assets/images/approval.svg"],[2,"color","#97989D","margin-left","5px","font-size","14px"],["src","./assets/images/rc.svg"],[2,"width","100px","margin-left","10px","margin-top","10px","border","1px dashed"],["src","./assets/images/po.svg"],[1,"requests"],[1,"createreq"],[1,"innerreq"],[3,"formGroup","ngSubmit"],[1,"topcard"],[2,"display","flex","flex-wrap","wrap","gap","40px","width","1000px"],[2,"display","flex","flex-direction","column"],[2,"color","#4272BF","font-size","14px"],[1,"star"],["placeholder","Enter title","formControlName","title",2,"width","200px","padding","10px","border-radius","6px","border","1px solid #9F9F9F","cursor","pointer","margin-top","10px","font-family","Poppins"],[2,"display","flex","flex-direction","column","margin-left","100px"],["placeholder","Auto generate","formControlName","date",2,"width","200px","padding","10px","border-radius","6px","border","1px solid #9F9F9F","cursor","pointer","margin-top","10px","font-family","Poppins",3,"readonly"],[1,"custom-form-group"],["for","",1,"custom-label",2,"color","#4272BF","font-size","14px"],[1,"custom-form-control"],["appearance","outline"],["matInput","","formControlName","expected_delivery_date","placeholder","Enter base Line Start Date",3,"matDatepicker","click"],["matSuffix","",3,"for"],["requiredByStartDate",""],["placeholder","Auto generate","formControlName","purchase_request_number","readonly","",2,"width","200px","padding","10px","border-radius","6px","border","1px solid #9F9F9F","cursor","pointer","margin-top","10px","font-family","Poppins"],["id","site","placeholder","Select site","formControlName","site",2,"padding","10px","width","200px","border","1px solid #9F9F9F","border-radius","6px","cursor","pointer","margin-top","10px","font-family","Poppins"],[3,"value",4,"ngFor","ngForOf"],[2,"color","#4272BF"],["aria-labelledby","example-radio-group-label","color","primary","formControlName","local_purchase",1,"example-radio-group"],[1,"example-radio-button",3,"value"],[1,"scroll-bar1"],[2,"direction","ltr !important","border-left","2px solid #000 !important"],["style","background-color: #F4F4F5;","formArrayName","items",4,"ngFor","ngForOf"],[2,"display","flex","flex-direction","row","gap","40px","margin-left","60px","margin-bottom","100px","top","-50px","position","relative"],[2,"padding","8px","width","120px","background-color","#fff","cursor","pointer","border","0.5px solid #94A3B8","border-radius","5px","font-size","14px","font-family","Poppins",3,"click"],[2,"display","flex","flex-direction","row","gap","10px","float","right","position","relative","top","-120px","right","60px"],[2,"padding","8px","width","120px","background-color","#233A61","color","#fff","border-radius","5px","border-color","lightgrey","font-size","14px","font-family","Poppins"],[2,"padding","8px","width","120px","background-color","#fff","color","#233A61","border","1px solid #94A3B8","border-radius","5px","font-size","14px","font-family","Poppins"],[3,"value"],["formArrayName","items",2,"background-color","#F4F4F5"],[2,"text-align","center"],[3,"formGroupName"],["id","itemName","placeholder","Select site","formControlName","item_id",1,"select-form-field",3,"selectionChange"],[2,"color","#000"],["id","itemName","placeholder","Select site","formControlName","uom",1,"select-form-field"],["placeholder","Enter","formControlName","qty","type","number",1,"pr-form-field"],["placeholder","Enter","formControlName","attachment","type","file",1,"pr-form-field"],["placeholder","Enter","formControlName","remark",1,"pr-form-field"],[1,"action-btn-wrapper"],["class","action-btn","title","Delete",3,"click",4,"ngIf"],["title","Delete",1,"action-btn",3,"click"],[1,"fa","fa-trash"]],template:function(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"mat-toolbar",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"span",3),t._uU(4,"Purchase request "),t.qZA(),t._UZ(5,"span",4),t.TgZ(6,"button",5)(7,"mat-icon",6),t._uU(8,"notifications"),t.qZA()()(),t.TgZ(9,"div"),t._UZ(10,"hr",7),t.qZA(),t.TgZ(11,"div",8)(12,"div",9)(13,"div"),t._UZ(14,"img",10),t.qZA(),t.TgZ(15,"span",11),t._uU(16,"Purchase\xa0request"),t.qZA(),t.TgZ(17,"div"),t._UZ(18,"mat-divider",12),t.qZA()(),t.TgZ(19,"div",13)(20,"div"),t._UZ(21,"img",14),t.qZA(),t.TgZ(22,"span",15),t._uU(23,"Approvals"),t.qZA(),t.TgZ(24,"div"),t._UZ(25,"mat-divider",12),t.qZA()(),t.TgZ(26,"div",13)(27,"div"),t._UZ(28,"img",16),t.qZA(),t.TgZ(29,"span",15),t._uU(30,"Rate\xa0Comparative"),t.qZA(),t.TgZ(31,"div"),t._UZ(32,"mat-divider",12),t.qZA()(),t.TgZ(33,"div",13)(34,"div"),t._UZ(35,"img",14),t.qZA(),t.TgZ(36,"span",15),t._uU(37,"Rate\xa0Approvals"),t.qZA(),t.TgZ(38,"div"),t._UZ(39,"mat-divider",17),t.qZA()(),t.TgZ(40,"div",13)(41,"div"),t._UZ(42,"img",18),t.qZA(),t.TgZ(43,"span",15),t._uU(44,"Purchase\xa0orders"),t.qZA()()(),t.TgZ(45,"div",19)(46,"div",20),t._uU(47,"Create request"),t.qZA(),t.TgZ(48,"div",21),t._uU(49,"Approved request"),t.qZA(),t.TgZ(50,"div",21),t._uU(51,"Rejected request"),t.qZA(),t.TgZ(52,"div",21),t._uU(53,"Revised request"),t.qZA()(),t.TgZ(54,"form",22),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(55,"mat-card",23)(56,"div",24)(57,"div",25)(58,"label",26),t._uU(59,"Request title "),t.TgZ(60,"span",27),t._uU(61,"*"),t.qZA()(),t._UZ(62,"input",28),t.qZA(),t.TgZ(63,"div",29)(64,"label",26),t._uU(65,"Request date"),t.qZA(),t._UZ(66,"input",30),t.qZA(),t.TgZ(67,"div",31)(68,"label",32),t._uU(69," Required by "),t.TgZ(70,"span",27),t._uU(71,"*"),t.qZA()(),t.TgZ(72,"div",33)(73,"mat-form-field",34)(74,"input",35),t.NdJ("click",function(){t.CHM(n);const l=t.MAs(77);return t.KtG(l.open())}),t.qZA(),t._UZ(75,"mat-datepicker-toggle",36)(76,"mat-datepicker",null,37),t.qZA()()(),t.TgZ(78,"div",25)(79,"label",26),t._uU(80,"Purchase request no "),t.qZA(),t._UZ(81,"input",38),t.qZA(),t.TgZ(82,"div",29)(83,"label",26),t._uU(84,"Site name "),t.TgZ(85,"span",27),t._uU(86,"*"),t.qZA()(),t.TgZ(87,"mat-select",39),t.YNc(88,I,2,2,"mat-option",40),t.qZA()(),t.TgZ(89,"div",29)(90,"label",41),t._uU(91,"Local Purchase "),t.TgZ(92,"span",27),t._uU(93,"*"),t.qZA()(),t.TgZ(94,"mat-radio-group",42)(95,"mat-radio-button",43),t._uU(96," Yes "),t.qZA(),t.TgZ(97,"mat-radio-button",43),t._uU(98," No "),t.qZA()()()()(),t.TgZ(99,"div",44)(100,"table",45)(101,"tr")(102,"th"),t._uU(103,"S\xa0No"),t.qZA(),t.TgZ(104,"th"),t._uU(105,"Item*"),t.qZA(),t.TgZ(106,"th"),t._uU(107,"Category"),t.qZA(),t.TgZ(108,"th"),t._uU(109,"Sub\xa0category"),t.qZA(),t.TgZ(110,"th"),t._uU(111,"Uom*"),t.qZA(),t.TgZ(112,"th"),t._uU(113,"Quantity*"),t.qZA(),t.TgZ(114,"th"),t._uU(115,"Attachments"),t.qZA(),t.TgZ(116,"th"),t._uU(117,"Remarks"),t.qZA(),t.TgZ(118,"th"),t._uU(119,"Action"),t.qZA()(),t.TgZ(120,"tbody"),t.YNc(121,Y,23,7,"tr",46),t.qZA()()(),t.TgZ(122,"div",47)(123,"div")(124,"button",48),t.NdJ("click",function(){return o.addItem()}),t._uU(125," Add Item + "),t.qZA()()(),t.TgZ(126,"div",49)(127,"div")(128,"button",50),t._uU(129,"Submit"),t.qZA()(),t.TgZ(130,"div")(131,"button",51),t._uU(132,"Clear"),t.qZA()()()()}if(2&e){const n=t.MAs(77);t.xp6(54),t.Q6J("formGroup",o.purchaseRequestForm),t.xp6(12),t.Q6J("readonly",!0),t.xp6(8),t.Q6J("matDatepicker",n),t.xp6(1),t.Q6J("for",n),t.xp6(13),t.Q6J("ngForOf",o.siteList),t.xp6(7),t.Q6J("value","yes"),t.xp6(2),t.Q6J("value","no"),t.xp6(24),t.Q6J("ngForOf",o.purchaseRequestForm.get("items").controls)}},dependencies:[P.ey,g.KE,g.R9,b.lW,k.a8,c.Mq,c.hl,c.nW,v.d,A.Hw,y.Nt,N.VQ,N.U0,F.gD,T.Ye,f.sg,f.O5,r._Y,r.Fj,r.wV,r.JJ,r.JL,r.sg,r.u,r.x0,r.CE],styles:['mat-toolbar[_ngcontent-%COMP%]{height:100px;background-color:#fff}.example-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.requests[_ngcontent-%COMP%]{height:40px;width:1140px;background-color:#d9d9d9;display:flex;justify-content:space-around;align-items:center;margin-top:20px;margin-left:30px;font-size:14px}.innerreq[_ngcontent-%COMP%]{color:#233a61;font-family:Poppins;font-weight:600;font-style:normal;font-size:14px}.createreq[_ngcontent-%COMP%]{background-color:#233a61;color:#fff;height:40px;width:250px;margin-left:-80px;font-family:Poppins;font-weight:600;font-style:normal;font-size:14px;display:flex;align-items:center;justify-content:center}.topcard[_ngcontent-%COMP%]{width:1110px;height:200px;margin-left:30px;margin-top:30px;box-shadow:0 2px 12px #00000040;font-family:Poppins}table[_ngcontent-%COMP%]{font-family:Poppins,sans-serif!important;border-collapse:collapse;width:100%;font-size:14px;margin:8px 20px 20px 10px}th[_ngcontent-%COMP%]{background-color:#233a61;border:1px solid #94a3b8;text-align:left;padding:10px 40px!important;width:1000px!important;color:#fff;font-weight:100;font-size:14px;font-style:normal}td[_ngcontent-%COMP%]{border:1px solid #94a3b8;text-align:left;padding:20px;color:#233a61;font-style:normal;font-size:14px;font-family:Poppins}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#e5e6eb!important}.scroll-bar1[_ngcontent-%COMP%]{height:300px;width:95%;margin-left:25px;margin-bottom:100px;margin-top:50px;overflow:auto}[_ngcontent-%COMP%]::-webkit-scrollbar{width:7px;height:7px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{border:1px solid lightgrey;border-radius:5px;background-color:#d3d3d3}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#1e293b;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:lightblue}.pr-form-field[_ngcontent-%COMP%]{width:120px;padding:10px;border-radius:6px;border:1px solid #9f9f9f;cursor:pointer;background-color:"Transparent"}.select-form-field[_ngcontent-%COMP%]{padding:10px;width:150px;border:1px solid #9f9f9f;border-radius:20px;cursor:pointer;background-color:"Transparent "!important}.action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}']}),i})();function J(i,s){if(1&i&&(t.TgZ(0,"mat-option",48),t._uU(1),t.qZA()),2&i){const e=s.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",e.site_name," ")}}function L(i,s){if(1&i&&(t.TgZ(0,"mat-option",48),t._uU(1),t.qZA()),2&i){const e=s.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",e.item_name," ")}}function j(i,s){if(1&i&&(t.TgZ(0,"mat-option",48),t._uU(1),t.qZA()),2&i){const e=s.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",e.unit," ")}}function z(i,s){if(1&i&&(t.TgZ(0,"tr",49)(1,"td",50),t._uU(2),t.qZA(),t.ynx(3,51),t.TgZ(4,"td")(5,"mat-select",52),t.YNc(6,L,2,2,"mat-option",40),t.qZA()(),t.TgZ(7,"td",53),t._uU(8),t.qZA(),t.TgZ(9,"td",53),t._uU(10),t.qZA(),t.TgZ(11,"td")(12,"mat-select",54),t.YNc(13,j,2,2,"mat-option",40),t.qZA()(),t.TgZ(14,"td"),t._UZ(15,"input",55),t.qZA(),t.TgZ(16,"td"),t._UZ(17,"input",56),t.qZA(),t.TgZ(18,"td"),t._UZ(19,"input",57),t.qZA(),t.BQk(),t.qZA()),2&i){const e=s.$implicit,o=s.index,n=t.oxw();let a,l;t.xp6(2),t.hij(" ",o+1," "),t.xp6(1),t.Q6J("formGroupName",o),t.xp6(3),t.Q6J("ngForOf",n.itemList),t.xp6(2),t.hij(" ",null==(a=e.get("category"))?null:a.value," "),t.xp6(2),t.hij(" ",null==(l=e.get("subCategory"))?null:l.value," "),t.xp6(3),t.Q6J("ngForOf",n.uomList)}}let Q=(()=>{class i{constructor(e,o,n,a,l,C){this.router=e,this.httpService=o,this.snack=n,this.formBuilder=a,this.route=l,this.http=C,this.load=!1,this.purchaseRequestForm=new r.cw({title:new r.NI("",r.kI.required),date:new r.NI(u().format("DD-MM-YYYY"),r.kI.required),expected_delivery_date:new r.NI(u().add(1,"days").format("DD-MM-YYYY"),r.kI.required),purchase_request_number:new r.NI(""),site:new r.NI("",r.kI.required),local_purchase:new r.NI("",r.kI.required),remarks:new r.NI(""),items:this.formBuilder.array([]),_id:new r.NI}),this.getList(),this.route.params.subscribe(x=>{console.log(x),console.log(x.id),x.id&&this.httpService.GET(`${d.Fj}/detail`,{_id:x.id}).subscribe(M=>{console.log(M),this.patchData(M.data[0])})})}getList(){const e=this.http.get(`${m.N.api_path}${d.PE}`),o=this.http.get(`${m.N.api_path}${d.o7}`),n=this.http.get(`${m.N.api_path}${d.S3}`);this.httpService.multipleRequests([e,o,n],{}).subscribe(a=>{a&&(this.uomList=a[0].data,this.itemList=a[1].data,this.siteList=a[2].data)})}patchData(e){this.purchaseRequestForm.patchValue({title:e.title,date:e.date,expected_delivery_date:e.date,purchase_request_number:e.purchase_request_number,site:e.site,local_purchase:e.local_purchase,remarks:e.remarks}),e.items&&e.items.length>0&&e.items.map(o=>{this.addItems(o)})}createItemArrayForm(){return new r.cw({item_id:new r.NI("",r.kI.required),qty:new r.NI("",r.kI.required),category:new r.NI(""),subCategory:new r.NI(""),attachment:new r.NI(""),remark:new r.NI("",r.kI.required),uom:new r.NI("",r.kI.required)})}addItems(e){this.items=this.purchaseRequestForm.get("items"),e&&this.items.push(this.createItem(e))}createItem(e){if(e)return new r.cw({item_id:new r.NI(e.item_id,r.kI.required),qty:new r.NI(e.qty,r.kI.required),category:new r.NI(e.categoryDetail.name),subCategory:new r.NI(e.subCategoryDetail.subcategory_name),attachment:new r.NI(e.attachment),remark:new r.NI(e.remark,r.kI.required),uom:new r.NI(e.uomDetail._id,r.kI.required)})}onSubmit(){if(this.load||!this.purchaseRequestForm.valid)return;let e=this.purchaseRequestForm.value;e.requestDate=u(e.requestDate,"DD-MM-YYYY").toDate(),e.requiredBy=new Date(e.requiredBy),console.log("requestData",e),this.load=!0,this.httpService.POST(d.Fj,e).subscribe(o=>{this.load=!1,this.snack.notify("Purchase requrest has been created.",1),this.router.navigate(["/prstatus"])},o=>{if(this.load=!1,o.errors&&!(0,Z.isEmpty)(o.errors)){let n="<ul>";for(let a in o.errors)n+=`<li>${o.errors[a][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(o.message,2)})}getSiteList(){this.httpService.GET(d.S3,{}).subscribe(e=>{this.siteList=e})}ngOnInit(){this.getSiteList()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(h.F0),t.Y36(_.s),t.Y36(q.o),t.Y36(r.qu),t.Y36(h.gz),t.Y36(w.eN))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-purchase-request-details"]],decls:122,vars:6,consts:[[2,"height","100px","background-color","#fff"],[2,"margin-top","40px","margin-left","20px"],["src","./assets/images/preq.svg"],[2,"font-family","Poppins","margin-top","40px","font-style","normal","font-weight","600","font-size","30px","color","#1E293B","margin-left","10px"],[1,"example-spacer"],["mat-icon-button","",2,"margin-right","40px"],[2,"margin-top","40px"],[2,"width","1130px","border","2px solid #C5C5C5","margin-left","30px"],[2,"display","flex","flex-direction","row","font-family","Poppins","font-weight","600"],[2,"margin-top","20px","margin-left","30px","display","flex"],["src","./assets/images/prl.svg"],[2,"color","#233A61","margin-left","5px","font-size","14px"],[2,"width","90px","margin-left","10px","margin-top","10px","border","1px dashed"],[2,"margin-top","20px","margin-left","10px","display","flex"],["src","./assets/images/approval.svg"],[2,"color","#97989D","margin-left","5px","font-size","14px"],["src","./assets/images/rc.svg"],[2,"width","100px","margin-left","10px","margin-top","10px","border","1px dashed"],["src","./assets/images/po.svg"],[1,"requests"],[1,"createreq"],[1,"innerreq"],[3,"formGroup","ngSubmit"],[1,"topcard"],[2,"display","flex","flex-wrap","wrap","gap","40px","width","1000px"],[2,"display","flex","flex-direction","column"],[2,"color","#4272BF","font-size","14px"],[1,"star"],["placeholder","Enter title","formControlName","title",2,"width","200px","padding","10px","border-radius","6px","border","1px solid #9F9F9F","cursor","pointer","margin-top","10px","font-family","Poppins"],[2,"display","flex","flex-direction","column","margin-left","100px"],["placeholder","Auto generate","formControlName","date",2,"width","200px","padding","10px","border-radius","6px","border","1px solid #9F9F9F","cursor","pointer","margin-top","10px","font-family","Poppins",3,"readonly"],[1,"custom-form-group"],["for","",1,"custom-label",2,"color","#4272BF","font-size","14px"],[1,"custom-form-control"],["appearance","outline"],["matInput","","formControlName","expected_delivery_date","placeholder","Enter base Line Start Date",3,"matDatepicker","click"],["matSuffix","",3,"for"],["requiredByStartDate",""],["placeholder","Auto generate","formControlName","purchase_request_number","readonly","",2,"width","200px","padding","10px","border-radius","6px","border","1px solid #9F9F9F","cursor","pointer","margin-top","10px","font-family","Poppins"],["id","site","placeholder","Select site","formControlName","site",2,"padding","10px","width","200px","border","1px solid #9F9F9F","border-radius","6px","cursor","pointer","margin-top","10px","font-family","Poppins"],[3,"value",4,"ngFor","ngForOf"],[2,"color","#4272BF"],[1,"scroll-bar1"],[2,"direction","ltr !important","border-left","2px solid #000 !important"],["style","background-color: #F4F4F5;","formArrayName","items",4,"ngFor","ngForOf"],[2,"display","flex","flex-direction","row","gap","10px","float","right","position","relative","top","-120px","right","60px"],[2,"padding","8px","width","120px","background-color","#233A61","color","#fff","border-radius","5px","border-color","lightgrey","font-size","14px","font-family","Poppins"],[2,"padding","8px","width","120px","background-color","#fff","color","#233A61","border","1px solid #94A3B8","border-radius","5px","font-size","14px","font-family","Poppins"],[3,"value"],["formArrayName","items",2,"background-color","#F4F4F5"],[2,"text-align","center"],[3,"formGroupName"],["id","itemName","placeholder","Select site","formControlName","item_id",1,"select-form-field"],[2,"color","#000"],["id","itemName","placeholder","Select site","formControlName","uom",1,"select-form-field"],["placeholder","Enter","formControlName","qty","type","number",1,"pr-form-field"],["placeholder","Enter","formControlName","attachment","type","file",1,"pr-form-field"],["placeholder","Enter","formControlName","remark",1,"pr-form-field"]],template:function(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"mat-toolbar",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"span",3),t._uU(4,"Purchase request "),t.qZA(),t._UZ(5,"span",4),t.TgZ(6,"button",5)(7,"mat-icon",6),t._uU(8,"notifications"),t.qZA()()(),t.TgZ(9,"div"),t._UZ(10,"hr",7),t.qZA(),t.TgZ(11,"div",8)(12,"div",9)(13,"div"),t._UZ(14,"img",10),t.qZA(),t.TgZ(15,"span",11),t._uU(16,"Purchase\xa0request"),t.qZA(),t.TgZ(17,"div"),t._UZ(18,"mat-divider",12),t.qZA()(),t.TgZ(19,"div",13)(20,"div"),t._UZ(21,"img",14),t.qZA(),t.TgZ(22,"span",15),t._uU(23,"Approvals"),t.qZA(),t.TgZ(24,"div"),t._UZ(25,"mat-divider",12),t.qZA()(),t.TgZ(26,"div",13)(27,"div"),t._UZ(28,"img",16),t.qZA(),t.TgZ(29,"span",15),t._uU(30,"Rate\xa0Comparative"),t.qZA(),t.TgZ(31,"div"),t._UZ(32,"mat-divider",12),t.qZA()(),t.TgZ(33,"div",13)(34,"div"),t._UZ(35,"img",14),t.qZA(),t.TgZ(36,"span",15),t._uU(37,"Rate\xa0Approvals"),t.qZA(),t.TgZ(38,"div"),t._UZ(39,"mat-divider",17),t.qZA()(),t.TgZ(40,"div",13)(41,"div"),t._UZ(42,"img",18),t.qZA(),t.TgZ(43,"span",15),t._uU(44,"Purchase\xa0orders"),t.qZA()()(),t.TgZ(45,"div",19)(46,"div",20),t._uU(47,"Create request"),t.qZA(),t.TgZ(48,"div",21),t._uU(49,"Approved request"),t.qZA(),t.TgZ(50,"div",21),t._uU(51,"Rejected request"),t.qZA(),t.TgZ(52,"div",21),t._uU(53,"Revised request"),t.qZA()(),t.TgZ(54,"form",22),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(55,"mat-card",23)(56,"div",24)(57,"div",25)(58,"label",26),t._uU(59,"Request title "),t.TgZ(60,"span",27),t._uU(61,"*"),t.qZA()(),t._UZ(62,"input",28),t.qZA(),t.TgZ(63,"div",29)(64,"label",26),t._uU(65,"Request date"),t.qZA(),t._UZ(66,"input",30),t.qZA(),t.TgZ(67,"div",31)(68,"label",32),t._uU(69," Required by "),t.TgZ(70,"span",27),t._uU(71,"*"),t.qZA()(),t.TgZ(72,"div",33)(73,"mat-form-field",34)(74,"input",35),t.NdJ("click",function(){t.CHM(n);const l=t.MAs(77);return t.KtG(l.open())}),t.qZA(),t._UZ(75,"mat-datepicker-toggle",36)(76,"mat-datepicker",null,37),t.qZA()()(),t.TgZ(78,"div",25)(79,"label",26),t._uU(80,"Purchase request no "),t.qZA(),t._UZ(81,"input",38),t.qZA(),t.TgZ(82,"div",29)(83,"label",26),t._uU(84,"Site name "),t.TgZ(85,"span",27),t._uU(86,"*"),t.qZA()(),t.TgZ(87,"mat-select",39),t.YNc(88,J,2,2,"mat-option",40),t.qZA()(),t.TgZ(89,"div",29)(90,"label",41),t._uU(91,"Local Purchase "),t.TgZ(92,"span",27),t._uU(93,"*"),t.qZA()()()()(),t.TgZ(94,"div",42)(95,"table",43)(96,"tr")(97,"th"),t._uU(98,"S\xa0No"),t.qZA(),t.TgZ(99,"th"),t._uU(100,"Item*"),t.qZA(),t.TgZ(101,"th"),t._uU(102,"Category"),t.qZA(),t.TgZ(103,"th"),t._uU(104,"Sub\xa0category"),t.qZA(),t.TgZ(105,"th"),t._uU(106,"Uom*"),t.qZA(),t.TgZ(107,"th"),t._uU(108,"Quantity*"),t.qZA(),t.TgZ(109,"th"),t._uU(110,"Attachments"),t.qZA(),t.TgZ(111,"th"),t._uU(112,"Remarks"),t.qZA()(),t.TgZ(113,"tbody"),t.YNc(114,z,20,6,"tr",44),t.qZA()()(),t.TgZ(115,"div",45)(116,"div")(117,"button",46),t._uU(118,"Submit"),t.qZA()(),t.TgZ(119,"div")(120,"button",47),t._uU(121,"Clear"),t.qZA()()()()}if(2&e){const n=t.MAs(77);t.xp6(54),t.Q6J("formGroup",o.purchaseRequestForm),t.xp6(12),t.Q6J("readonly",!0),t.xp6(8),t.Q6J("matDatepicker",n),t.xp6(1),t.Q6J("for",n),t.xp6(13),t.Q6J("ngForOf",o.siteList),t.xp6(26),t.Q6J("ngForOf",o.purchaseRequestForm.get("items").controls)}},dependencies:[P.ey,g.KE,g.R9,b.lW,k.a8,c.Mq,c.hl,c.nW,v.d,A.Hw,y.Nt,F.gD,T.Ye,f.sg,r._Y,r.Fj,r.wV,r.JJ,r.JL,r.sg,r.u,r.x0,r.CE],styles:['mat-toolbar[_ngcontent-%COMP%]{height:100px;background-color:#fff}.example-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.requests[_ngcontent-%COMP%]{height:40px;width:1140px;background-color:#d9d9d9;display:flex;justify-content:space-around;align-items:center;margin-top:20px;margin-left:30px;font-size:14px}.innerreq[_ngcontent-%COMP%]{color:#233a61;font-family:Poppins;font-weight:600;font-style:normal;font-size:14px}.createreq[_ngcontent-%COMP%]{background-color:#233a61;color:#fff;height:40px;width:250px;margin-left:-80px;font-family:Poppins;font-weight:600;font-style:normal;font-size:14px;display:flex;align-items:center;justify-content:center}.topcard[_ngcontent-%COMP%]{width:1110px;height:200px;margin-left:30px;margin-top:30px;box-shadow:0 2px 12px #00000040;font-family:Poppins}table[_ngcontent-%COMP%]{font-family:Poppins,sans-serif!important;border-collapse:collapse;width:100%;font-size:14px;margin:8px 20px 20px 10px}th[_ngcontent-%COMP%]{background-color:#233a61;border:1px solid #94a3b8;text-align:left;padding:10px 40px!important;width:1000px!important;color:#fff;font-weight:100;font-size:14px;font-style:normal}td[_ngcontent-%COMP%]{border:1px solid #94a3b8;text-align:left;padding:20px;color:#233a61;font-style:normal;font-size:14px;font-family:Poppins}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#e5e6eb!important}.scroll-bar1[_ngcontent-%COMP%]{height:300px;width:95%;margin-left:25px;margin-bottom:100px;margin-top:50px;overflow:auto}[_ngcontent-%COMP%]::-webkit-scrollbar{width:7px;height:7px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{border:1px solid lightgrey;border-radius:5px;background-color:#d3d3d3}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#1e293b;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:lightblue}.pr-form-field[_ngcontent-%COMP%]{width:120px;padding:10px;border-radius:6px;border:1px solid #9f9f9f;cursor:pointer;background-color:"Transparent"}.select-form-field[_ngcontent-%COMP%]{padding:10px;width:150px;border:1px solid #9f9f9f;border-radius:20px;cursor:pointer;background-color:"Transparent "!important}.action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}']}),i})();var B=p(8898);function E(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td",39),t._uU(2),t.qZA(),t._UZ(3,"hr",40),t.TgZ(4,"td",41),t._uU(5),t.qZA(),t._UZ(6,"hr",40),t.TgZ(7,"td",42),t._uU(8),t.qZA(),t.TgZ(9,"td",43),t.NdJ("click",function(){const a=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.viewDetails(a._id))}),t._uU(10,"View\xa0details "),t.qZA(),t.TgZ(11,"td",44)(12,"mat-icon"),t._uU(13," arrow_forward_ios "),t.qZA()()()}if(2&i){const e=s.$implicit;t.xp6(2),t.hij("Request\xa0no\xa0 ",e.purchase_request_number,""),t.xp6(3),t.hij("Title \xa0 ",e.title,""),t.xp6(3),t.hij("Site \xa0 ",e.siteData.site_name," ")}}const $=[{path:"",component:S},{path:"prList",component:(()=>{class i{constructor(e,o,n,a){this.router=e,this.httpService=o,this.snack=n,this.formBuilder=a,this.getList()}getList(){this.httpService.GET(d.Fj,"").subscribe(e=>{console.log("---------\x3e",e),this.purchaseList=e.data,this.snack.notify("Purchase requrest has been created.",1)},e=>{if(e.errors&&!(0,Z.isEmpty)(e.errors)){let o="<ul>";for(let n in e.errors)o+=`<li>${e.errors[n][0]}</li>`;o+="</ul>",this.snack.notifyHtml(o,2)}else this.snack.notify(e.message,2)})}viewDetails(e){this.router.navigateByUrl("procurement/"+e)}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(h.F0),t.Y36(_.s),t.Y36(q.o),t.Y36(r.qu))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-purchase-request-list"]],decls:77,vars:3,consts:[[2,"height","100px","background-color","#fff"],[2,"margin-top","40px","margin-left","20px"],["src","./assets/images/preq.svg"],[2,"font-family","Poppins","margin-top","40px","font-style","normal","font-weight","600","font-size","30px","color","#1E293B","margin-left","10px"],[1,"example-spacer"],["mat-icon-button","",2,"margin-right","40px"],[2,"margin-top","40px"],[2,"width","1130px","border","2px solid #C5C5C5","margin-left","20px"],[2,"display","flex","flex-direction","row","font-family","Poppins","font-weight","600"],[2,"margin-top","20px","margin-left","30px","display","flex"],["src","./assets/images/box.svg"],[2,"color","#97989D","margin-left","5px","font-size","14px"],[2,"width","90px","margin-left","10px","margin-top","10px","border","1px dashed"],[2,"margin-top","20px","margin-left","10px","display","flex"],["src","./assets/images/app.svg"],[2,"color","#233A61","margin-left","5px","font-size","14px"],["src","./assets/images/rc.svg"],["src","./assets/images/approval.svg"],["src","./assets/images/po.svg"],[2,"display","flex","flex-direction","row","gap","10px"],[2,"margin-left","40px","width","100%","margin-top","30px"],["appearance","outline",1,"searchbar"],["matSuffix",""],["matInput","","type","search","placeholder","search title",1,"search-input"],[2,"margin-right","600px","margin-top","30px","display","flex","gap","10px"],[2,"margin-top","15px","color","#94A3B8","margin-left","30px"],["appearance","outline",1,"datebar"],["matInput","","placeholder","Date",3,"matDatepicker","click"],["matSuffix","",3,"for"],["startPicker",""],[2,"margin-top","30px","display","flex","position","relative","right","570px","gap","10px"],[2,"margin-top","15px","color","#94A3B8","margin-left","-10px"],["matInput","","placeholder","Site"],[2,"margin-top","50px","position","relative","right","520px"],[2,"color","#233A61"],[2,"color","#94A3B8"],[1,"scroll-bar1",2,"width","93%"],[2,"direction","ltr !important","margin-top","-20px"],[4,"ngFor","ngForOf"],[2,"color","#4272BF","width","300px","text-align","left","padding","10px"],[2,"border","1px solid #D9D9D9","height","30px"],[2,"color","#4272BF","width","200px"],[2,"color","#4272BF","width","800px","text-align","left","padding","10px"],[2,"background-color","#233A61","color","#fff","width","150px",3,"click"],[2,"width","100px"]],template:function(e,o){if(1&e){const n=t.EpF();t.TgZ(0,"mat-toolbar",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"span",3),t._uU(4,"Purchase request list"),t.qZA(),t._UZ(5,"span",4),t.TgZ(6,"button",5)(7,"mat-icon",6),t._uU(8,"notifications"),t.qZA()()(),t.TgZ(9,"div"),t._UZ(10,"hr",7),t.qZA(),t.TgZ(11,"div",8)(12,"div",9)(13,"div"),t._UZ(14,"img",10),t.qZA(),t.TgZ(15,"span",11),t._uU(16,"Purchase\xa0request"),t.qZA(),t.TgZ(17,"div"),t._UZ(18,"mat-divider",12),t.qZA()(),t.TgZ(19,"div",13)(20,"div"),t._UZ(21,"img",14),t.qZA(),t.TgZ(22,"span",15),t._uU(23,"Approvals"),t.qZA(),t.TgZ(24,"div"),t._UZ(25,"mat-divider",12),t.qZA()(),t.TgZ(26,"div",13)(27,"div"),t._UZ(28,"img",16),t.qZA(),t.TgZ(29,"span",11),t._uU(30,"Rate\xa0Comparative"),t.qZA(),t.TgZ(31,"div"),t._UZ(32,"mat-divider",12),t.qZA()(),t.TgZ(33,"div",13)(34,"div"),t._UZ(35,"img",17),t.qZA(),t.TgZ(36,"span",11),t._uU(37,"Rate\xa0Approvals"),t.qZA(),t.TgZ(38,"div"),t._UZ(39,"mat-divider",12),t.qZA()(),t.TgZ(40,"div",13)(41,"div"),t._UZ(42,"img",18),t.qZA(),t.TgZ(43,"span",11),t._uU(44,"Purchase\xa0orders"),t.qZA()()(),t.TgZ(45,"div",19)(46,"div",20)(47,"mat-form-field",21)(48,"mat-icon",22),t._uU(49,"search"),t.qZA(),t._UZ(50,"input",23),t.qZA()(),t.TgZ(51,"div",24)(52,"div",25)(53,"span"),t._uU(54,"Filter\xa0by"),t.qZA()(),t.TgZ(55,"div")(56,"mat-form-field",26)(57,"input",27),t.NdJ("click",function(){t.CHM(n);const l=t.MAs(60);return t.KtG(l.open())}),t.qZA(),t._UZ(58,"mat-datepicker-toggle",28)(59,"mat-datepicker",null,29),t.qZA()()(),t.TgZ(61,"div",30)(62,"div",31)(63,"span"),t._uU(64,"Filter\xa0by"),t.qZA()(),t.TgZ(65,"div")(66,"mat-form-field",26),t._UZ(67,"input",32),t.qZA()()(),t.TgZ(68,"div",33)(69,"span",34),t._uU(70,"New\xa0request\xa0|"),t.qZA(),t.TgZ(71,"span",35),t._uU(72,"\xa0Revised\xa0request"),t.qZA()()(),t.TgZ(73,"div",36)(74,"table",37)(75,"tbody"),t.YNc(76,E,14,3,"tr",38),t.qZA()()()}if(2&e){const n=t.MAs(60);t.xp6(57),t.Q6J("matDatepicker",n),t.xp6(1),t.Q6J("for",n),t.xp6(18),t.Q6J("ngForOf",o.purchaseList)}},dependencies:[g.KE,g.R9,b.lW,c.Mq,c.hl,c.nW,v.d,A.Hw,y.Nt,T.Ye,f.sg],styles:[".mat-form-field-appearance-outline .mat-form-field-infix{padding:.6em;width:250px}mat-toolbar[_ngcontent-%COMP%]{height:100px;background-color:#fff}.example-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.searchbar[_ngcontent-%COMP%]{width:350px;border-radius:20px;font-family:Poppins}.datebar[_ngcontent-%COMP%]{width:140px;border-radius:20px;font-family:Poppins}table[_ngcontent-%COMP%]{font-family:Poppins,sans-serif!important;border-collapse:separate;border-spacing:0 25px;text-align:left;width:100%;font-size:14px;margin-left:30px;margin-bottom:20px;margin-right:-10px}td[_ngcontent-%COMP%]{border:none;text-align:center;padding:8px 1px;color:#233a61;font-style:normal;font-size:14px}tr[_ngcontent-%COMP%]:nth-child(odd){background-color:#f4f4f5!important}tr[_ngcontent-%COMP%]:nth-child(even){background-color:#f4f4f5!important}.scroll-bar1[_ngcontent-%COMP%]{height:600px;width:93%;margin-left:20px;margin-bottom:100px;margin-top:10px;overflow:auto;direction:rtl;overflow-x:hidden}[_ngcontent-%COMP%]::-webkit-scrollbar{width:7px;height:7px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{border:1px solid lightgrey;border-radius:5px;background-color:#d3d3d3}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#1E293B;border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:lightblue}"]}),i})()},{path:":id",component:Q}];let G=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[B.S,f.ez,r.UX,[h.Bz.forChild($)]]}),i})()}}]);