"use strict";(self.webpackChunkpra=self.webpackChunkpra||[]).push([[604],{3604:(I,y,a)=>{a.r(y),a.d(y,{GstModule:()=>S});var f=a(6895),o=a(4006),u=a(8608),m=a(7489),t=a(4650),p=a(9299),h=a(2126),_=a(6104),g=a(9549),b=a(4859),C=a(4144);function O(i,s){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function M(i,s){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}let P=(()=>{class i{constructor(e,n,r){this.router=e,this.httpService=n,this.snack=r,this.addForm=new o.cw({gst_name:new o.NI("",o.kI.required),gst_percentage:new o.NI("",[o.kI.required,o.kI.max(33),o.kI.min(0)])})}saveData(){this.addForm.valid?this.httpService.POST(u.cy,this.addForm.value).subscribe(e=>{this.snack.notify(" Data has been saved sucessfully.",1),this.router.navigate(["gst"])},e=>{if(e.errors&&!(0,m.isEmpty)(e.errors)){let n="<ul>";for(let r in e.errors)n+=`<li>${e.errors[r][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)}):this.addForm.markAllAsTouched()}list(){this.router.navigate(["gst"])}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(p.F0),t.Y36(h.s),t.Y36(_.o))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-add-data"]],decls:26,vars:3,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","gst_name"],[4,"ngIf"],["matInput","","formControlName","gst_percentage","type","number"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Add GST"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"button",5),t.NdJ("click",function(){return n.saveData()}),t._uU(8,"Submit"),t.qZA(),t.TgZ(9,"button",6),t.NdJ("click",function(){return n.list()}),t._uU(10,"Cancel"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),t._uU(17,"GST Name"),t.qZA(),t._UZ(18,"input",12),t.YNc(19,O,2,0,"mat-error",13),t.qZA()(),t.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),t._uU(23,"GST Percentage"),t.qZA(),t._UZ(24,"input",14),t.YNc(25,M,2,0,"mat-error",13),t.qZA()()()()()()),2&e&&(t.xp6(12),t.Q6J("formGroup",n.addForm),t.xp6(7),t.Q6J("ngIf",null==n.addForm.controls.gst_name.errors?null:n.addForm.controls.gst_name.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.addForm.controls.gst_percentage.errors?null:n.addForm.controls.gst_percentage.errors.required))},dependencies:[g.TO,g.KE,g.hX,b.lW,C.Nt,f.O5,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.sg,o.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}"]}),i})();function Z(i,s){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function T(i,s){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}let x=(()=>{class i{constructor(e,n,r,c){this.router=e,this.httpService=n,this.snack=r,this.route=c,this.editForm=new o.cw({gst_name:new o.NI("",o.kI.required),gst_percentage:new o.NI("",[o.kI.required,o.kI.max(33),o.kI.min(0)]),_id:new o.NI}),this.route.params.subscribe(l=>{l.id?this.httpService.GET(`${u.cy}/detail`,{_id:l.id}).subscribe(d=>{d&&this.patchValue(d.data)},d=>{if(d.errors&&!(0,m.isEmpty)(d.errors)){let v="<ul>";for(let E in d.errors)v+=`<li>${d.errors[E][0]}</li>`;v+="</ul>",this.snack.notifyHtml(v,2)}else this.snack.notify(d.message,2)}):this.list()})}patchValue(e){this.editForm.patchValue({gst_name:e.gst_name,gst_percentage:e.gst_percentage,_id:e._id})}saveData(){this.editForm.valid?this.httpService.PUT(u.cy,this.editForm.value).subscribe(e=>{this.snack.notify("Data has been saved sucessfully.",1),this.router.navigate(["gst"])},e=>{if(e.errors&&!(0,m.isEmpty)(e.errors)){let n="<ul>";for(let r in e.errors)n+=`<li>${e.errors[r][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)}):this.editForm.markAllAsTouched()}list(){this.router.navigate(["gst"])}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(p.F0),t.Y36(h.s),t.Y36(_.o),t.Y36(p.gz))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-edit-data"]],decls:26,vars:3,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","gst_name"],[4,"ngIf"],["matInput","","formControlName","gst_percentage","type","number"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Edit GST"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"button",5),t.NdJ("click",function(){return n.saveData()}),t._uU(8,"Submit"),t.qZA(),t.TgZ(9,"button",6),t.NdJ("click",function(){return n.list()}),t._uU(10,"Cancel"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),t._uU(17,"GST Name"),t.qZA(),t._UZ(18,"input",12),t.YNc(19,Z,2,0,"mat-error",13),t.qZA()(),t.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),t._uU(23,"GST Percentage"),t.qZA(),t._UZ(24,"input",14),t.YNc(25,T,2,0,"mat-error",13),t.qZA()()()()()()),2&e&&(t.xp6(12),t.Q6J("formGroup",n.editForm),t.xp6(7),t.Q6J("ngIf",null==n.editForm.controls.gst_name.errors?null:n.editForm.controls.gst_name.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.editForm.controls.gst_percentage.errors?null:n.editForm.controls.gst_percentage.errors.required))},dependencies:[g.TO,g.KE,g.hX,b.lW,C.Nt,f.O5,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.sg,o.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}"]}),i})();var k=a(5861),A=a(9715),D=a(445);const w=function(i){return["/gst/edit",i]};function F(i,s){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td",15),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td")(8,"div",16)(9,"a",17),t._UZ(10,"i",18),t.qZA(),t.TgZ(11,"a",19),t.NdJ("click",function(){const c=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.delete(c._id))}),t._UZ(12,"i",20),t.qZA()()()()}if(2&i){const e=s.$implicit,n=s.index;t.xp6(2),t.Oqu(n+1),t.xp6(2),t.Oqu(e.gst_name),t.xp6(2),t.Oqu(e.gst_percentage),t.xp6(3),t.Q6J("routerLink",t.VKq(4,w,e._id))}}let U=(()=>{class i{constructor(e,n,r,c,l){this.router=e,this.httpService=n,this.excelService=r,this.snack=c,this.route=l,this.list=[],this.gstList=[],this.getList()}getList(){this.httpService.GET(u.cy,{}).subscribe(e=>{e&&e.data&&(this.list=e.data,this.gstList=e.data)},e=>{if(e.errors&&!(0,m.isEmpty)(e.errors)){let n="<ul>";for(let r in e.errors)n+=`<li>${e.errors[r][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)})}edit(e){let n="gst/edit/"+e;console.log(n),this.router.navigateByUrl(n)}add(){this.router.navigateByUrl("gst/add")}delete(e){this.httpService.DELETE(u.cy,{_id:e}).subscribe(n=>{n&&(this.snack.notify(" record has been deleted sucessfully.",1),this.getList())},n=>{if(n.errors&&!(0,m.isEmpty)(n.errors)){let r="<ul>";for(let c in n.errors)r+=`<li>${n.errors[c][0]}</li>`;r+="</ul>",this.snack.notifyHtml(r,2)}else this.snack.notify(n.message,2)})}search(e){this.list=e.target.value?this.gstList.filter(n=>n.gst_name.toLowerCase().includes(e.target.value.toLowerCase())):this.gstList}exportXlSX(){var e=this;return(0,k.Z)(function*(){e.excelService.mapArrayToExcel("GST",["Name","Percentage"],["gst_name","gst_percentage"],["string","string"],e.list)})()}ngOnInit(){}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(p.F0),t.Y36(h.s),t.Y36(A.x),t.Y36(_.o),t.Y36(p.gz))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-listing"]],decls:29,vars:1,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],[1,"filter-con"],["dir","ltr",1,"labeled-outlined-field-wrapper"],["appearance","outline",1,"full-width","drop-down","outline-filter-field","hide-form-bottom-field"],["matInput","","placeholder","Search by name",3,"input"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"other-btn",3,"click"],[1,"section-body"],[1,"table","pragati-table"],["scope","col"],[4,"ngFor","ngForOf"],["scope","row"],[1,"action-btn-wrapper"],["title","Edit",1,"action-btn",3,"routerLink"],[1,"fa","fa-edit"],["title","Delete",1,"action-btn",3,"click"],[1,"fa","fa-trash"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"GST Master"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"mat-form-field",7)(10,"input",8),t.NdJ("input",function(c){return n.search(c)}),t.qZA()()()(),t.TgZ(11,"button",9),t.NdJ("click",function(){return n.add()}),t._uU(12,"Add New"),t.qZA(),t.TgZ(13,"button",10),t.NdJ("click",function(){return n.exportXlSX()}),t._uU(14,"Export"),t.qZA()()()(),t.TgZ(15,"div",11)(16,"table",12)(17,"thead")(18,"tr")(19,"th",13),t._uU(20,"SN."),t.qZA(),t.TgZ(21,"th",13),t._uU(22,"GST Name"),t.qZA(),t.TgZ(23,"th",13),t._uU(24,"Percentage"),t.qZA(),t.TgZ(25,"th",13),t._uU(26,"Action"),t.qZA()()(),t.TgZ(27,"tbody"),t.YNc(28,F,13,6,"tr",14),t.qZA()()()()),2&e&&(t.xp6(28),t.Q6J("ngForOf",n.list))},dependencies:[D.Lv,g.KE,b.lW,C.Nt,f.sg,p.yS],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.submit-btn[_ngcontent-%COMP%]:hover{opacity:.7}.cancel-btn[_ngcontent-%COMP%]{background:#ccc;font-size:12px;padding-left:23px;padding-right:23px}.cancel-btn[_ngcontent-%COMP%]:hover{opacity:.7}.other-btn[_ngcontent-%COMP%]{background:#525252;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.other-btn[_ngcontent-%COMP%]:hover{opacity:.7}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}.pragati-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#233A61;color:#fff;font-weight:400;font-size:12px;border:.5px solid #94A3B8;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-left:.5px solid #94A3B8;border-right:.5px solid #94A3B8;font-weight:400;font-size:12px;background:#F4F4F5;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n)   td[_ngcontent-%COMP%]{background:#D9DADE}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}"]}),i})();var q=a(8898);const N=[{path:"add",component:P},{path:"",component:U},{path:"edit/:id",component:x}];let S=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[q.S,f.ez,o.UX,[p.Bz.forChild(N)]]}),i})()}}]);