"use strict";(self.webpackChunkpra=self.webpackChunkpra||[]).push([[621],{1621:(H,O,a)=>{a.r(O),a.d(O,{CategoryModule:()=>G});var m=a(6895),r=a(4006),f=a(8608),h=a(7489),t=a(4650),p=a(9299),_=a(2126),b=a(6104),g=a(9549),y=a(4859),v=a(4144);function Z(o,s){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function T(o,s){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}let A=(()=>{class o{constructor(e,n,i){this.router=e,this.httpService=n,this.snack=i,this.addForm=new r.cw({name:new r.NI("",r.kI.required),code:new r.NI("",r.kI.required)})}saveData(){this.addForm.valid?this.httpService.POST(f.jz,this.addForm.value).subscribe(e=>{this.snack.notify(" Data has been saved sucessfully.",1),this.router.navigate(["category"])},e=>{if(e.errors&&!(0,h.isEmpty)(e.errors)){let n="<ul>";for(let i in e.errors)n+=`<li>${e.errors[i][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)}):this.addForm.markAllAsTouched()}list(){this.router.navigate(["category"])}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(p.F0),t.Y36(_.s),t.Y36(b.o))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-add-data"]],decls:26,vars:3,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],["matInput","","formControlName","code"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Add Category"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"button",5),t.NdJ("click",function(){return n.saveData()}),t._uU(8,"Submit"),t.qZA(),t.TgZ(9,"button",6),t.NdJ("click",function(){return n.list()}),t._uU(10,"Cancel"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),t._uU(17,"Category Name"),t.qZA(),t._UZ(18,"input",12),t.YNc(19,Z,2,0,"mat-error",13),t.qZA()(),t.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),t._uU(23,"Category Code"),t.qZA(),t._UZ(24,"input",14),t.YNc(25,T,2,0,"mat-error",13),t.qZA()()()()()()),2&e&&(t.xp6(12),t.Q6J("formGroup",n.addForm),t.xp6(7),t.Q6J("ngIf",null==n.addForm.controls.name.errors?null:n.addForm.controls.name.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.addForm.controls.code.errors?null:n.addForm.controls.code.errors.required))},dependencies:[g.TO,g.KE,g.hX,y.lW,v.Nt,m.O5,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}"]}),o})();function k(o,s){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function w(o,s){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}let D=(()=>{class o{constructor(e,n,i,c){this.router=e,this.httpService=n,this.snack=i,this.route=c,this.editForm=new r.cw({name:new r.NI("",r.kI.required),code:new r.NI("",r.kI.required),_id:new r.NI}),this.route.params.subscribe(l=>{console.log(l),console.log(l.id),l.id?this.httpService.GET(`${f.jz}/detail`,{_id:l.id}).subscribe(d=>{console.log(d),d&&this.patchValue(d.data)},d=>{if(d.errors&&!(0,h.isEmpty)(d.errors)){let C="<ul>";for(let M in d.errors)C+=`<li>${d.errors[M][0]}</li>`;C+="</ul>",this.snack.notifyHtml(C,2)}else this.snack.notify(d.message,2)}):this.list()})}patchValue(e){this.editForm.patchValue({name:e.name,code:e.code,_id:e._id})}saveData(){this.editForm.valid?this.httpService.PUT(f.jz,this.editForm.value).subscribe(e=>{this.snack.notify("Data has been saved sucessfully.",1),this.router.navigate(["category"])},e=>{if(e.errors&&!(0,h.isEmpty)(e.errors)){let n="<ul>";for(let i in e.errors)n+=`<li>${e.errors[i][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)}):this.editForm.markAllAsTouched()}list(){this.router.navigate(["category"])}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(p.F0),t.Y36(_.s),t.Y36(b.o),t.Y36(p.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-edit-data"]],decls:26,vars:3,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],["matInput","","formControlName","code"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Edit Category"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"button",5),t.NdJ("click",function(){return n.saveData()}),t._uU(8,"Submit"),t.qZA(),t.TgZ(9,"button",6),t.NdJ("click",function(){return n.list()}),t._uU(10,"Cancel"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),t._uU(17,"Category Name"),t.qZA(),t._UZ(18,"input",12),t.YNc(19,k,2,0,"mat-error",13),t.qZA()(),t.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),t._uU(23,"Category Code"),t.qZA(),t._UZ(24,"input",14),t.YNc(25,w,2,0,"mat-error",13),t.qZA()()()()()()),2&e&&(t.xp6(12),t.Q6J("formGroup",n.editForm),t.xp6(7),t.Q6J("ngIf",null==n.editForm.controls.name.errors?null:n.editForm.controls.name.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.editForm.controls.code.errors?null:n.editForm.controls.code.errors.required))},dependencies:[g.TO,g.KE,g.hX,y.lW,v.Nt,m.O5,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}"]}),o})();var U=a(5861),N=a(9715),F=a(4465),E=a(2894),S=a(4961),L=a(445);function I(o,s){if(1&o){const e=t.EpF();t.TgZ(0,"tr")(1,"td",17),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td")(8,"div",18)(9,"a",19),t.NdJ("click",function(){const c=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.edit(c._id))}),t._UZ(10,"i",20),t.qZA(),t.TgZ(11,"a",21),t.NdJ("click",function(){const c=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.delete(c._id))}),t._UZ(12,"i",22),t.qZA()()()()}if(2&o){const e=s.$implicit,n=s.index;t.xp6(2),t.Oqu(n+1),t.xp6(2),t.Oqu(e.name),t.xp6(2),t.Oqu(e.code)}}function q(o,s){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",3)(2,"div",4)(3,"h2"),t._uU(4,"Category Master"),t.qZA()(),t.TgZ(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"mat-form-field",9)(10,"input",10),t.NdJ("input",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.search(i))}),t.qZA()()()(),t.TgZ(11,"button",11),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.add())}),t._uU(12,"Add New"),t.qZA(),t.TgZ(13,"button",12),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.exportXlSX())}),t._uU(14," Export "),t.qZA()()()(),t.TgZ(15,"div",13)(16,"table",14)(17,"thead")(18,"tr")(19,"th",15),t._uU(20,"SN."),t.qZA(),t.TgZ(21,"th",15),t._uU(22,"Category Name"),t.qZA(),t.TgZ(23,"th",15),t._uU(24,"Category Code"),t.qZA(),t.TgZ(25,"th",15),t._uU(26,"Action"),t.qZA()()(),t.TgZ(27,"tbody"),t.YNc(28,I,13,3,"tr",16),t.qZA()()(),t.BQk()}if(2&o){const e=t.oxw();t.xp6(28),t.Q6J("ngForOf",e.categoryList)}}function j(o,s){1&o&&(t.TgZ(0,"h3",23),t._uU(1," You don't have permissions to view. "),t.qZA())}let J=(()=>{class o{constructor(e,n,i,c,l,d,C,M){this.router=e,this.httpService=n,this.excelService=i,this.snack=c,this.route=l,this.toast=d,this.auth=C,this.userService=M,this.categoryList=[],this.list=[],this.permissions=JSON.parse(localStorage.getItem("loginData")),this.userService.getUserss().subscribe(P=>{P.find(x=>x._id===this.permissions.user._id)?(this.httpService.GET(`/roles/role/${this.permissions.user.role}`,{}).subscribe({next:u=>{this.addPermission=u.dashboard_permissions[0].ParentChildchecklist[16].childList[0].isSelected,this.editPermission=u.dashboard_permissions[0].ParentChildchecklist[16].childList[1].isSelected,this.deletePermission=u.dashboard_permissions[0].ParentChildchecklist[16].childList[2].isSelected,this.viewPermission=u.dashboard_permissions[0].ParentChildchecklist[16].childList[3].isSelected},error:u=>{console.log(u)}}),this.getList()):(this.snack.notify("Invalid Credentials - User Details not Valid",2),this.auth.removeUser(),this.userService.updateLogin("logout"),this.router.navigate(["/login"]))})}getList(){this.httpService.GET(f.jz,{}).subscribe(e=>{e&&e.data&&(this.categoryList=e.data,this.list=e.data)},e=>{if(e.errors&&!(0,h.isEmpty)(e.errors)){let n="<ul>";for(let i in e.errors)n+=`<li>${e.errors[i][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)})}edit(e){if(!this.editPermission)return void this.toast.openSnackBar("Access to Category Master editing is restricted for your account.");let n="category/edit/"+e;console.log(n),this.router.navigateByUrl(n)}add(){this.addPermission?this.router.navigateByUrl("category/add"):this.toast.openSnackBar("Access to Category Master add is restricted for your account.")}delete(e){this.deletePermission?this.httpService.DELETE(f.jz,{_id:e}).subscribe(n=>{n&&(this.snack.notify(" record has been deleted sucessfully.",1),this.getList())},n=>{if(n.errors&&!(0,h.isEmpty)(n.errors)){let i="<ul>";for(let c in n.errors)i+=`<li>${n.errors[c][0]}</li>`;i+="</ul>",this.snack.notifyHtml(i,2)}else this.snack.notify(n.message,2)}):this.toast.openSnackBar("Access to Category Master deleting is restricted for your account.")}search(e){this.categoryList=e.target.value?this.list.filter(n=>n.name.toLowerCase().includes(e.target.value.toLowerCase())):this.list}exportXlSX(){var e=this;return(0,U.Z)(function*(){e.excelService.mapArrayToExcel("Category",["Category Name\t","Code"],["name","code"],["string","string"],e.categoryList)})()}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(p.F0),t.Y36(_.s),t.Y36(N.x),t.Y36(b.o),t.Y36(p.gz),t.Y36(F.k),t.Y36(E.e),t.Y36(S.f))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-listing"]],decls:4,vars:2,consts:[[1,"section-wrapper"],[4,"ngIf","ngIfElse"],["noView",""],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],[1,"filter-con"],["dir","ltr",1,"labeled-outlined-field-wrapper"],["appearance","outline",1,"full-width","drop-down","outline-filter-field","hide-form-bottom-field"],["matInput","","placeholder","Search by name",3,"input"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"other-btn",3,"click"],[1,"section-body"],[1,"table","pragati-table"],["scope","col"],[4,"ngFor","ngForOf"],["scope","row"],[1,"action-btn-wrapper"],["title","Edit",1,"action-btn",3,"click"],[1,"fa","fa-edit"],["title","Delete",1,"action-btn",3,"click"],[1,"fa","fa-trash"],[2,"display","flex","justify-content","center","margin-top","2%","font-size","160%","font-weight","bolder","color","grey"]],template:function(e,n){if(1&e&&(t.TgZ(0,"div",0),t.YNc(1,q,29,1,"ng-container",1),t.YNc(2,j,2,0,"ng-template",null,2,t.W1O),t.qZA()),2&e){const i=t.MAs(3);t.xp6(1),t.Q6J("ngIf",n.viewPermission)("ngIfElse",i)}},dependencies:[L.Lv,g.KE,y.lW,v.Nt,m.sg,m.O5],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.submit-btn[_ngcontent-%COMP%]:hover{opacity:.7}.cancel-btn[_ngcontent-%COMP%]{background:#ccc;font-size:12px;padding-left:23px;padding-right:23px}.cancel-btn[_ngcontent-%COMP%]:hover{opacity:.7}.other-btn[_ngcontent-%COMP%]{background:#525252;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.other-btn[_ngcontent-%COMP%]:hover{opacity:.7}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}.pragati-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#233A61;color:#fff;font-weight:400;font-size:12px;border:.5px solid #94A3B8;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-left:.5px solid #94A3B8;border-right:.5px solid #94A3B8;font-weight:400;font-size:12px;background:#F4F4F5;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n)   td[_ngcontent-%COMP%]{background:#D9DADE}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}"]}),o})();var Y=a(8898);const z=[{path:"add",component:A},{path:"",component:J},{path:"edit/:id",component:D}];let G=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[Y.S,m.ez,r.UX,[p.Bz.forChild(z)]]}),o})()}}]);