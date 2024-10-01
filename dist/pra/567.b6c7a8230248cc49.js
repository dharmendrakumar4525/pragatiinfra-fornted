"use strict";(self.webpackChunkpra=self.webpackChunkpra||[]).push([[567],{8567:($,v,s)=>{s.r(v),s.d(v,{LocationModule:()=>B});var h=s(6895),A=s(5861),g=s(8608),c=s(4006),u=s(5938),m=s(7489),t=s(4650),C=s(9299),x=s(2126),y=s(6104),_=s(9549),P=s(4859),M=s(4144);function L(i,a){1&i&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function Z(i,a){if(1&i){const n=t.EpF();t.TgZ(0,"button",11),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.onYesClick())}),t.TgZ(1,"span"),t._uU(2,"Submit"),t.qZA()()}}function D(i,a){if(1&i){const n=t.EpF();t.TgZ(0,"button",11),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.onUpdateClick())}),t.TgZ(1,"span"),t._uU(2,"Update"),t.qZA()()}}let O=(()=>{class i{constructor(n,e,o,r,l){this.dialogRef=n,this.data=e,this.router=o,this.httpService=r,this.snack=l,this.addForm=new c.cw({location_name:new c.NI("",c.kI.required),_id:new c.NI("")}),e&&e.id&&this.httpService.GET(`${g.XC}/detail`,{_id:e.id}).subscribe(d=>{d&&this.patchValue(d.data)},d=>{if(d.errors&&!(0,m.isEmpty)(d.errors)){let f="<ul>";for(let b in d.errors)f+=`<li>${d.errors[b][0]}</li>`;f+="</ul>",this.snack.notifyHtml(f,2)}else this.snack.notify(d.message,2)})}patchValue(n){this.addForm.patchValue({location_name:n.location_name,_id:n._id})}onYesClick(){this.addForm.valid?this.httpService.POST(g.XC,{location_name:this.addForm.value.location_name}).subscribe(n=>{this.snack.notify(" Data has been saved sucessfully.",1),this.dialogRef.close({option:1,data:this.data})},n=>{if(n.errors&&!(0,m.isEmpty)(n.errors)){let e="<ul>";for(let o in n.errors)e+=`<li>${n.errors[o][0]}</li>`;e+="</ul>",this.snack.notifyHtml(e,2)}else this.snack.notify(n.message,2)}):this.addForm.markAllAsTouched()}onUpdateClick(){this.addForm.valid?this.httpService.PUT(g.XC,this.addForm.value).subscribe(n=>{this.snack.notify("Data has been saved sucessfully.",1),this.dialogRef.close({option:1,data:this.data})},n=>{if(n.errors&&!(0,m.isEmpty)(n.errors)){let e="<ul>";for(let o in n.errors)e+=`<li>${n.errors[o][0]}</li>`;e+="</ul>",this.snack.notifyHtml(e,2)}else this.snack.notify(n.message,2)}):this.addForm.markAllAsTouched()}onNoClick(){this.dialogRef.close({option:2,data:this.data})}ngOnInit(){}}return i.\u0275fac=function(n){return new(n||i)(t.Y36(u.so),t.Y36(u.WI),t.Y36(C.F0),t.Y36(x.s),t.Y36(y.o))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-add-data"]],decls:17,vars:4,consts:[["mat-dialog-title","",1,"mat-dialog-title"],["mat-dialog-content","",1,"mat-dialog-content-cstm"],[3,"formGroup"],[1,"row"],[1,"col-md-12"],["appearance","outline"],["matInput","","formControlName","location_name"],[4,"ngIf"],[2,"text-align","center","margin-bottom","5px"],["mat-raised-button","","cdkFocusInitial","",1,"cancel-btn","space-btn",3,"click"],["mat-raised-button","","class","space-btn theme-btn-color","color","primary",3,"click",4,"ngIf"],["mat-raised-button","","color","primary",1,"space-btn","theme-btn-color",3,"click"]],template:function(n,e){1&n&&(t.TgZ(0,"h1",0),t._uU(1," Add Location\n"),t.qZA(),t.TgZ(2,"div",1)(3,"form",2)(4,"div",3)(5,"div",4)(6,"mat-form-field",5)(7,"mat-label"),t._uU(8,"Location Name"),t.qZA(),t._UZ(9,"input",6),t.YNc(10,L,2,0,"mat-error",7),t.qZA()()()()(),t.TgZ(11,"div",8)(12,"button",9),t.NdJ("click",function(){return e.onNoClick()}),t.TgZ(13,"span"),t._uU(14," Cancel"),t.qZA()(),t.YNc(15,Z,3,0,"button",10),t.YNc(16,D,3,0,"button",10),t.qZA()),2&n&&(t.xp6(3),t.Q6J("formGroup",e.addForm),t.xp6(7),t.Q6J("ngIf",null==e.addForm.controls.location_name.errors?null:e.addForm.controls.location_name.errors.required),t.xp6(5),t.Q6J("ngIf",!e.data),t.xp6(1),t.Q6J("ngIf",e.data&&e.data.id))},dependencies:[_.TO,_.KE,_.hX,P.lW,u.uh,u.xY,M.Nt,h.O5,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}.theme-btn-color[_ngcontent-%COMP%]{margin-left:15px}"]}),i})();var S=s(9715),N=s(4465),w=s(2894),U=s(4961),F=s(445);function I(i,a){if(1&i){const n=t.EpF();t.TgZ(0,"div",6)(1,"div",7)(2,"div",8)(3,"div",9)(4,"mat-form-field",10)(5,"input",11),t.NdJ("input",function(o){t.CHM(n);const r=t.oxw();return t.KtG(r.search(o))}),t.qZA()()()(),t.TgZ(6,"button",12),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.add())}),t._uU(7,"Add New"),t.qZA(),t.TgZ(8,"button",13),t.NdJ("click",function(){t.CHM(n);const o=t.oxw();return t.KtG(o.exportXlSX())}),t._uU(9,"Export"),t.qZA()()()}}function Y(i,a){1&i&&(t.ynx(0),t._uU(1," No data found "),t.BQk())}function E(i,a){if(1&i){const n=t.EpF();t.TgZ(0,"tr")(1,"td",19),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td")(6,"div",20)(7,"a",21),t.NdJ("click",function(){const r=t.CHM(n).$implicit,l=t.oxw(3);return t.KtG(l.edit(r._id))}),t._UZ(8,"i",22),t.qZA(),t.TgZ(9,"a",23),t.NdJ("click",function(){const r=t.CHM(n).$implicit,l=t.oxw(3);return t.KtG(l.delete(r._id))}),t._UZ(10,"i",24),t.qZA()()()()}if(2&i){const n=a.$implicit,e=a.index;t.xp6(2),t.Oqu(e+1),t.xp6(2),t.Oqu(n.location_name)}}function J(i,a){if(1&i&&(t.ynx(0),t.YNc(1,E,11,2,"tr",18),t.BQk()),2&i){const n=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",n.structureList)}}function j(i,a){if(1&i&&(t.TgZ(0,"div",14)(1,"table",15)(2,"thead")(3,"tr")(4,"th",16),t._uU(5,"SN."),t.qZA(),t.TgZ(6,"th",16),t._uU(7,"Location Name"),t.qZA(),t.TgZ(8,"th",16),t._uU(9,"Action"),t.qZA()()(),t.TgZ(10,"tbody"),t.YNc(11,Y,2,0,"ng-container",17),t.YNc(12,J,2,1,"ng-container",17),t.qZA()()()),2&i){const n=t.oxw();t.xp6(11),t.Q6J("ngIf",n.structureList&&0==n.structureList.length),t.xp6(1),t.Q6J("ngIf",n.structureList&&n.structureList.length>0)}}function G(i,a){1&i&&(t.TgZ(0,"h3",25),t._uU(1,"You don't have permissions to view."),t.qZA())}let H=(()=>{class i{constructor(n,e,o,r,l,d,f,b){this.router=n,this.httpService=e,this.excelService=o,this.snack=r,this.dialog=l,this.toast=d,this.auth=f,this.userService=b,this.structureList=[],this.list=[],this.permissions=JSON.parse(localStorage.getItem("loginData")),this.userService.getUserss().subscribe(T=>{T.find(k=>k._id===this.permissions.user._id)?(this.httpService.GET(`/roles/role/${this.permissions.user.role}`,{}).subscribe({next:p=>{this.addPermission=p.dashboard_permissions[0].ParentChildchecklist[8].childList[0].isSelected,this.editPermission=p.dashboard_permissions[0].ParentChildchecklist[8].childList[1].isSelected,this.deletePermission=p.dashboard_permissions[0].ParentChildchecklist[8].childList[2].isSelected,this.viewPermission=p.dashboard_permissions[0].ParentChildchecklist[8].childList[3].isSelected},error:p=>{console.log(p)}}),this.getList()):(this.snack.notify("Invalid Credentials - User Details not Valid",1),this.auth.removeUser(),this.userService.updateLogin("logout"),this.router.navigate(["/login"]))})}getList(){this.httpService.GET(g.XC,{}).subscribe(n=>{n&&n.data&&(this.structureList=n.data,this.list=n.data)},n=>{if(n.errors&&!(0,m.isEmpty)(n.errors)){let e="<ul>";for(let o in n.errors)e+=`<li>${n.errors[o][0]}</li>`;e+="</ul>",this.snack.notifyHtml(e,2)}else this.snack.notify(n.message,2)})}edit(n){this.editPermission?this.dialog.open(O,{data:{id:n}}).afterClosed().subscribe(o=>{o&&1===o.option&&this.getList()}):this.toast.openSnackBar("Access to Location Master editing is restricted for your account.")}add(){this.addPermission?this.dialog.open(O,{}).afterClosed().subscribe(e=>{e&&1===e.option&&this.getList()}):this.toast.openSnackBar("Access to Location Master add is restricted for your account.")}delete(n){this.deletePermission?this.httpService.DELETE(g.XC,{_id:n}).subscribe(e=>{e&&(this.snack.notify(" record has been deleted sucessfully.",1),this.getList())},e=>{if(e.errors&&!(0,m.isEmpty)(e.errors)){let o="<ul>";for(let r in e.errors)o+=`<li>${e.errors[r][0]}</li>`;o+="</ul>",this.snack.notifyHtml(o,2)}else this.snack.notify(e.message,2)}):this.toast.openSnackBar("Access to Location Master deleting is restricted for your account.")}search(n){this.structureList=n.target.value?this.list.filter(e=>e.location_name.toLowerCase().includes(n.target.value.toLowerCase())):this.list}exportXlSX(){var n=this;return(0,A.Z)(function*(){n.excelService.mapArrayToExcel("Structure",["Structure Name\t"],["location_name"],["string"],n.structureList)})()}ngOnInit(){}}return i.\u0275fac=function(n){return new(n||i)(t.Y36(C.F0),t.Y36(x.s),t.Y36(S.x),t.Y36(y.o),t.Y36(u.uw),t.Y36(N.k),t.Y36(w.e),t.Y36(U.f))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-listing"]],decls:9,vars:3,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],["class","header-right",4,"ngIf"],["class","section-body",4,"ngIf","ngIfElse"],["noView",""],[1,"header-right"],[1,"buttons-containers"],[1,"filter-con"],["dir","ltr",1,"labeled-outlined-field-wrapper"],["appearance","outline",1,"full-width","drop-down","outline-filter-field","hide-form-bottom-field"],["matInput","","placeholder","Search by name",3,"input"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"other-btn",3,"click"],[1,"section-body"],[1,"table","pragati-table"],["scope","col"],[4,"ngIf"],[4,"ngFor","ngForOf"],["scope","row"],[1,"action-btn-wrapper"],["title","Edit",1,"action-btn",3,"click"],[1,"fa","fa-edit"],["title","Delete",1,"action-btn",3,"click"],[1,"fa","fa-trash"],[2,"display","flex","justify-content","center","margin-top","2%","font-size","160%","font-weight","bolder","color","grey"]],template:function(n,e){if(1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Location Master"),t.qZA()(),t.YNc(5,I,10,0,"div",3),t.qZA(),t.YNc(6,j,13,2,"div",4),t.YNc(7,G,2,0,"ng-template",null,5,t.W1O),t.qZA()),2&n){const o=t.MAs(8);t.xp6(5),t.Q6J("ngIf",e.viewPermission),t.xp6(1),t.Q6J("ngIf",e.viewPermission)("ngIfElse",o)}},dependencies:[F.Lv,_.KE,P.lW,M.Nt,h.sg,h.O5],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.submit-btn[_ngcontent-%COMP%]:hover{opacity:.7}.cancel-btn[_ngcontent-%COMP%]{background:#ccc;font-size:12px;padding-left:23px;padding-right:23px}.cancel-btn[_ngcontent-%COMP%]:hover{opacity:.7}.other-btn[_ngcontent-%COMP%]{background:#525252;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.other-btn[_ngcontent-%COMP%]:hover{opacity:.7}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}.pragati-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{position:sticky;top:0;background:#233A61;color:#fff;font-weight:400;font-size:12px;border:.5px solid #94A3B8;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-left:.5px solid #94A3B8;border-right:.5px solid #94A3B8;font-weight:400;font-size:12px;background:#F4F4F5;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n)   td[_ngcontent-%COMP%]{background:#D9DADE}.action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}"]}),i})();var X=s(8898);const Q=[{path:"",component:H}];let B=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[X.S,h.ez,c.UX,[C.Bz.forChild(Q)]]}),i})()}}]);