"use strict";(self.webpackChunkpra=self.webpackChunkpra||[]).push([[502],{3502:(At,P,u)=>{u.r(P),u.d(P,{ItemModule:()=>Tt});var h=u(6895),s=u(4006),g=u(8608),_=u(2340),f=u(7489),t=u(4650),Z=u(9299),v=u(2126),q=u(6104),N=u(529),L=u(3238),b=u(9549),x=u(4859),O=u(4144),D=u(4385);function F(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function S(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function w(o,a){if(1&o&&(t.TgZ(0,"mat-option",23),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",null==e?null:e.brand_name," ")}}function J(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function E(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"mat-option",24),t.NdJ("onSelectionChange",function(){const i=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.categoryChange(i._id))}),t._uU(1),t.qZA()}if(2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.name," ")}}function $(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function Y(o,a){if(1&o&&(t.TgZ(0,"mat-option",23),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.subcategory_name," ")}}function j(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function Q(o,a){if(1&o&&(t.TgZ(0,"mat-option",23),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.uom_name," ")}}function z(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function G(o,a){if(1&o&&(t.TgZ(0,"mat-option",23),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.gst_percentage," ")}}function H(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function B(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}let K=(()=>{class o{constructor(e,n,r,i,l){this.router=e,this.httpService=n,this.snack=r,this.route=i,this.gstList=[],this.uomList=[],this.brandList=[],this.subCategoryList=[],this.categoryList=[],this.addForm=new s.cw({item_name:new s.NI("",s.kI.required),item_number:new s.NI("",s.kI.required),brands:new s.NI([],s.kI.required),category:new s.NI("",s.kI.required),sub_category:new s.NI("",s.kI.required),uom:new s.NI("",s.kI.required),gst:new s.NI("",s.kI.required),specification:new s.NI("",s.kI.required)}),this.allSubCategoryList=[];const p=l.get(`${_.N.api_path}${g.PE}`),c=l.get(`${_.N.api_path}${g.eC}`),C=l.get(`${_.N.api_path}${g.jz}`),T=l.get(`${_.N.api_path}${g.cy}`),M=l.get(`${_.N.api_path}${g.Lk}`);this.httpService.multipleRequests([p,c,C,T,M],{}).subscribe(m=>{this.uomList=m[0].data,this.subCategoryList=m[1].data,this.allSubCategoryList=m[1].data,this.categoryList=m[2].data,this.gstList=m[3].data,this.brandList=m[4].data},m=>{if(m.errors&&!(0,f.isEmpty)(m.errors)){let d="<ul>";for(let y in m.errors)d+=`<li>${m.errors[y][0]}</li>`;d+="</ul>",this.snack.notifyHtml(d,2)}else this.snack.notify(m.message,2)})}saveData(){this.addForm.valid?this.httpService.POST(g.o7,this.addForm.value).subscribe(e=>{this.snack.notify("Data has been saved sucessfully.",1),this.router.navigate(["item"])},e=>{if(e.errors&&!(0,f.isEmpty)(e.errors)){let n="<ul>";for(let r in e.errors)n+=`<li>${e.errors[r][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)}):this.addForm.markAllAsTouched()}list(){this.router.navigate(["item"])}categoryChange(e){this.subCategoryList=this.allSubCategoryList.filter(n=>n.category==e)}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(Z.F0),t.Y36(v.s),t.Y36(q.o),t.Y36(Z.gz),t.Y36(N.eN))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-add-data"]],decls:67,vars:14,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","item_name"],[4,"ngIf"],["matInput","","formControlName","item_number"],["matInput","","formControlName","brands","multiple",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","category"],[3,"value","onSelectionChange",4,"ngFor","ngForOf"],["matInput","","formControlName","sub_category"],["matInput","","formControlName","uom"],["matInput","","formControlName","gst"],["matInput","","formControlName","specification"],[3,"value"],[3,"value","onSelectionChange"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Add Item"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"button",5),t.NdJ("click",function(){return n.saveData()}),t._uU(8,"Submit"),t.qZA(),t.TgZ(9,"button",6),t.NdJ("click",function(){return n.list()}),t._uU(10,"Cancel"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),t._uU(17,"Name"),t.qZA(),t._UZ(18,"input",12),t.YNc(19,F,2,0,"mat-error",13),t.qZA()(),t.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),t._uU(23,"Item Number"),t.qZA(),t._UZ(24,"input",14),t.YNc(25,S,2,0,"mat-error",13),t.qZA()(),t.TgZ(26,"div",10)(27,"mat-form-field",11)(28,"mat-label"),t._uU(29,"Brands"),t.qZA(),t.TgZ(30,"mat-select",15),t.YNc(31,w,2,2,"mat-option",16),t.qZA(),t.YNc(32,J,2,0,"mat-error",13),t.qZA()(),t.TgZ(33,"div",10)(34,"mat-form-field",11)(35,"mat-label"),t._uU(36,"Category"),t.qZA(),t.TgZ(37,"mat-select",17),t.YNc(38,E,2,2,"mat-option",18),t.qZA(),t.YNc(39,$,2,0,"mat-error",13),t.qZA()(),t.TgZ(40,"div",10)(41,"mat-form-field",11)(42,"mat-label"),t._uU(43,"Sub Category"),t.qZA(),t.TgZ(44,"mat-select",19),t.YNc(45,Y,2,2,"mat-option",16),t.qZA(),t.YNc(46,j,2,0,"mat-error",13),t.qZA()(),t.TgZ(47,"div",10)(48,"mat-form-field",11)(49,"mat-label"),t._uU(50,"UOM"),t.qZA(),t.TgZ(51,"mat-select",20),t.YNc(52,Q,2,2,"mat-option",16),t.qZA(),t.YNc(53,z,2,0,"mat-error",13),t.qZA()(),t.TgZ(54,"div",10)(55,"mat-form-field",11)(56,"mat-label"),t._uU(57,"GST"),t.qZA(),t.TgZ(58,"mat-select",21),t.YNc(59,G,2,2,"mat-option",16),t.qZA(),t.YNc(60,H,2,0,"mat-error",13),t.qZA()(),t.TgZ(61,"div",10)(62,"mat-form-field",11)(63,"mat-label"),t._uU(64,"Specification"),t.qZA(),t._UZ(65,"input",22),t.YNc(66,B,2,0,"mat-error",13),t.qZA()()()()()()),2&e&&(t.xp6(12),t.Q6J("formGroup",n.addForm),t.xp6(7),t.Q6J("ngIf",null==n.addForm.controls.item_name.errors?null:n.addForm.controls.item_name.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.addForm.controls.item_number.errors?null:n.addForm.controls.item_number.errors.required),t.xp6(6),t.Q6J("ngForOf",n.brandList),t.xp6(1),t.Q6J("ngIf",null==n.addForm.controls.category.errors?null:n.addForm.controls.category.errors.required),t.xp6(6),t.Q6J("ngForOf",n.categoryList),t.xp6(1),t.Q6J("ngIf",null==n.addForm.controls.category.errors?null:n.addForm.controls.category.errors.required),t.xp6(6),t.Q6J("ngForOf",n.subCategoryList),t.xp6(1),t.Q6J("ngIf",null==n.addForm.controls.sub_category.errors?null:n.addForm.controls.sub_category.errors.required),t.xp6(6),t.Q6J("ngForOf",n.uomList),t.xp6(1),t.Q6J("ngIf",null==n.addForm.controls.uom.errors?null:n.addForm.controls.uom.errors.required),t.xp6(6),t.Q6J("ngForOf",n.gstList),t.xp6(1),t.Q6J("ngIf",null==n.addForm.controls.gst.errors?null:n.addForm.controls.gst.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.addForm.controls.specification.errors?null:n.addForm.controls.specification.errors.required))},dependencies:[L.ey,b.TO,b.KE,b.hX,x.lW,O.Nt,D.gD,h.sg,h.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}"]}),o})();function X(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function R(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function V(o,a){if(1&o&&(t.TgZ(0,"mat-option",24),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",e._id),t.xp6(1),t.hij(" ",null==e?null:e.brand_name," ")}}function W(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function tt(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"mat-option",25),t.NdJ("onSelectionChange",function(){const i=t.CHM(e).$implicit,l=t.oxw();return t.KtG(l.categoryChange(i._id))}),t._uU(1),t.qZA()}if(2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.name," ")}}function et(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function nt(o,a){if(1&o&&(t.TgZ(0,"mat-option",24),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.subcategory_name," ")}}function ot(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function it(o,a){if(1&o&&(t.TgZ(0,"mat-option",24),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.uom_name," ")}}function rt(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function at(o,a){if(1&o&&(t.TgZ(0,"mat-option",24),t._uU(1),t.qZA()),2&o){const e=a.$implicit;t.Q6J("value",null==e?null:e._id),t.xp6(1),t.hij(" ",null==e?null:e.gst_percentage," ")}}function st(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}function lt(o,a){1&o&&(t.TgZ(0,"mat-error"),t._uU(1," this field is required. "),t.qZA())}let ct=(()=>{class o{constructor(e,n,r,i,l){this.router=e,this.httpService=n,this.snack=r,this.route=i,this.gstList=[],this.uomList=[],this.brandList=[],this.subCategoryList=[],this.categoryList=[],this.allSubCategoryList=[],this.editForm=new s.cw({item_name:new s.NI("",s.kI.required),item_number:new s.NI("",s.kI.required),brands:new s.NI([],s.kI.required),category:new s.NI("",s.kI.required),sub_category:new s.NI("",s.kI.required),uom:new s.NI("",s.kI.required),gst:new s.NI("",s.kI.required),specification:new s.NI(""),_id:new s.NI});const p=l.get(`${_.N.api_path}${g.PE}`),c=l.get(`${_.N.api_path}${g.eC}`),C=l.get(`${_.N.api_path}${g.jz}`),T=l.get(`${_.N.api_path}${g.cy}`),M=l.get(`${_.N.api_path}${g.Lk}`);this.httpService.multipleRequests([p,c,C,T,M],{}).subscribe(m=>{this.uomList=m[0].data,this.subCategoryList=m[1].data,this.allSubCategoryList=m[1].data,this.categoryList=m[2].data,this.gstList=m[3].data,this.brandList=m[4].data},m=>{if(m.errors&&!(0,f.isEmpty)(m.errors)){let d="<ul>";for(let y in m.errors)d+=`<li>${m.errors[y][0]}</li>`;d+="</ul>",this.snack.notifyHtml(d,2)}else this.snack.notify(m.message,2)}),this.route.params.subscribe(m=>{console.log(m),console.log(m.id),m.id?this.httpService.GET(`${g.o7}/detail`,{_id:m.id}).subscribe(d=>{console.log("TTTTTTttt",d),console.log(d),d&&this.patchValue(d.data[0])},d=>{if(d.errors&&!(0,f.isEmpty)(d.errors)){let y="<ul>";for(let I in d.errors)y+=`<li>${d.errors[I][0]}</li>`;y+="</ul>",this.snack.notifyHtml(y,2)}else this.snack.notify(d.message,2)}):this.list()})}patchValue(e){this.editForm.patchValue({item_name:e.item_name,item_number:e.item_number,category:e.category,brands:e.brands||[],sub_category:e.sub_category,uom:e.uom,gst:e.gst,specification:e.specification,_id:e._id})}saveData(){this.editForm.valid?(console.log("consoling Payload",this.editForm.value),this.httpService.PUT(g.o7,this.editForm.value).subscribe(e=>{this.snack.notify("item data has been saved sucessfully.",1),this.router.navigate(["item"])},e=>{if(e.errors&&!(0,f.isEmpty)(e.errors)){let n="<ul>";for(let r in e.errors)n+=`<li>${e.errors[r][0]}</li>`;n+="</ul>",this.snack.notifyHtml(n,2)}else this.snack.notify(e.message,2)})):this.editForm.markAllAsTouched()}list(){this.router.navigate(["item"])}categoryChange(e){this.subCategoryList=this.allSubCategoryList.filter(n=>n.category==e)}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(Z.F0),t.Y36(v.s),t.Y36(q.o),t.Y36(Z.gz),t.Y36(N.eN))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-edit-data"]],decls:67,vars:14,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","item_name"],[4,"ngIf"],["matInput","","formControlName","item_number"],["appearance","outline",1,"col-md-3"],["matInput","","formControlName","brands","multiple",""],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","category"],[3,"value","onSelectionChange",4,"ngFor","ngForOf"],["matInput","","formControlName","sub_category"],["matInput","","formControlName","uom"],["matInput","","formControlName","gst"],["matInput","","formControlName","specification"],[3,"value"],[3,"value","onSelectionChange"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),t._uU(4,"Edit Item"),t.qZA()(),t.TgZ(5,"div",3)(6,"div",4)(7,"button",5),t.NdJ("click",function(){return n.saveData()}),t._uU(8,"Submit"),t.qZA(),t.TgZ(9,"button",6),t.NdJ("click",function(){return n.list()}),t._uU(10,"Cancel"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),t._uU(17,"Name"),t.qZA(),t._UZ(18,"input",12),t.YNc(19,X,2,0,"mat-error",13),t.qZA()(),t.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),t._uU(23,"Item Number"),t.qZA(),t._UZ(24,"input",14),t.YNc(25,R,2,0,"mat-error",13),t.qZA()(),t.TgZ(26,"div",15)(27,"mat-form-field",11)(28,"mat-label"),t._uU(29,"Brands"),t.qZA(),t.TgZ(30,"mat-select",16),t.YNc(31,V,2,2,"mat-option",17),t.qZA(),t.YNc(32,W,2,0,"mat-error",13),t.qZA()(),t.TgZ(33,"div",15)(34,"mat-form-field")(35,"mat-label"),t._uU(36,"Category"),t.qZA(),t.TgZ(37,"mat-select",18),t.YNc(38,tt,2,2,"mat-option",19),t.qZA(),t.YNc(39,et,2,0,"mat-error",13),t.qZA()(),t.TgZ(40,"div",10)(41,"mat-form-field",11)(42,"mat-label"),t._uU(43,"Sub Category"),t.qZA(),t.TgZ(44,"mat-select",20),t.YNc(45,nt,2,2,"mat-option",17),t.qZA(),t.YNc(46,ot,2,0,"mat-error",13),t.qZA()(),t.TgZ(47,"div",10)(48,"mat-form-field",11)(49,"mat-label"),t._uU(50,"UOM"),t.qZA(),t.TgZ(51,"mat-select",21),t.YNc(52,it,2,2,"mat-option",17),t.qZA(),t.YNc(53,rt,2,0,"mat-error",13),t.qZA()(),t.TgZ(54,"div",10)(55,"mat-form-field",11)(56,"mat-label"),t._uU(57,"GST"),t.qZA(),t.TgZ(58,"mat-select",22),t.YNc(59,at,2,2,"mat-option",17),t.qZA(),t.YNc(60,st,2,0,"mat-error",13),t.qZA()(),t.TgZ(61,"div",15)(62,"mat-form-field",11)(63,"mat-label"),t._uU(64,"Specification"),t.qZA(),t._UZ(65,"input",23),t.YNc(66,lt,2,0,"mat-error",13),t.qZA()()()()()()),2&e&&(t.xp6(12),t.Q6J("formGroup",n.editForm),t.xp6(7),t.Q6J("ngIf",null==n.editForm.controls.item_name.errors?null:n.editForm.controls.item_name.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.editForm.controls.item_number.errors?null:n.editForm.controls.item_number.errors.required),t.xp6(6),t.Q6J("ngForOf",n.brandList),t.xp6(1),t.Q6J("ngIf",null==n.editForm.controls.category.errors?null:n.editForm.controls.category.errors.required),t.xp6(6),t.Q6J("ngForOf",n.categoryList),t.xp6(1),t.Q6J("ngIf",null==n.editForm.controls.category.errors?null:n.editForm.controls.category.errors.required),t.xp6(6),t.Q6J("ngForOf",n.subCategoryList),t.xp6(1),t.Q6J("ngIf",null==n.editForm.controls.sub_category.errors?null:n.editForm.controls.sub_category.errors.required),t.xp6(6),t.Q6J("ngForOf",n.uomList),t.xp6(1),t.Q6J("ngIf",null==n.editForm.controls.uom.errors?null:n.editForm.controls.uom.errors.required),t.xp6(6),t.Q6J("ngForOf",n.gstList),t.xp6(1),t.Q6J("ngIf",null==n.editForm.controls.gst.errors?null:n.editForm.controls.gst.errors.required),t.xp6(6),t.Q6J("ngIf",null==n.editForm.controls.specification.errors?null:n.editForm.controls.specification.errors.required))},dependencies:[L.ey,b.TO,b.KE,b.hX,x.lW,O.Nt,D.gD,h.sg,h.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}"]}),o})();var U=u(5861),k=u(8739),mt=u(9715),ut=u(4465),A=u(5938),gt=u(2894),dt=u(4961);const pt=["errorDialog"];function _t(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"tr")(1,"td",23),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.qZA(),t.TgZ(9,"td"),t._uU(10),t.qZA(),t.TgZ(11,"td"),t._uU(12),t.qZA(),t.TgZ(13,"td"),t._uU(14),t.qZA(),t.TgZ(15,"td"),t._uU(16),t.qZA(),t.TgZ(17,"td"),t._uU(18),t.qZA(),t.TgZ(19,"td")(20,"div",24)(21,"a",25),t.NdJ("click",function(){const i=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.edit(i._id))}),t._UZ(22,"i",26),t.qZA(),t.TgZ(23,"a",27),t.NdJ("click",function(){const i=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.delete(i._id))}),t._UZ(24,"i",28),t.qZA()()()()}if(2&o){const e=a.$implicit,n=a.index,r=t.oxw(2);t.xp6(2),t.Oqu(n+1),t.xp6(2),t.Oqu(e.item_number),t.xp6(2),t.Oqu(e.item_name),t.xp6(2),t.Oqu(r.getBrandNamesByIds(e.brands)),t.xp6(2),t.Oqu(null==e||null==e.categoryDetail?null:e.categoryDetail.name),t.xp6(2),t.Oqu(null==e||null==e.subCategoryDetail?null:e.subCategoryDetail.subcategory_name),t.xp6(2),t.Oqu(null==e||null==e.uomDetail?null:e.uomDetail.uom_name),t.xp6(2),t.Oqu(null==e||null==e.gstDetail?null:e.gstDetail.gst_name),t.xp6(2),t.Oqu(e.specification)}}function ft(o,a){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"div",4)(2,"div",5)(3,"h2"),t._uU(4,"Item Master"),t.qZA()(),t.TgZ(5,"div",6)(6,"div",7)(7,"div",8)(8,"mat-form-field",9)(9,"input",10),t.NdJ("input",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.search(r))}),t.qZA()()(),t.TgZ(10,"button",11),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.add())}),t._uU(11,"Add New"),t.qZA(),t.TgZ(12,"button",12)(13,"input",13,14),t.NdJ("change",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.importFile(r))}),t.qZA(),t.TgZ(15,"span",15),t.NdJ("click",function(){t.CHM(e);const r=t.MAs(14);return t.KtG(r.click())}),t._uU(16,"Import"),t.qZA()(),t.TgZ(17,"button",16),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.exportXlSX())}),t._uU(18,"Export"),t.qZA(),t.TgZ(19,"button",16),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.exportAllXlSX())}),t._uU(20,"Export All"),t.qZA()()()(),t.TgZ(21,"div",17)(22,"table",18)(23,"thead")(24,"tr")(25,"th",19),t._uU(26,"SN."),t.qZA(),t.TgZ(27,"th",19),t._uU(28,"Item Number"),t.qZA(),t.TgZ(29,"th",19),t._uU(30,"Item Name"),t.qZA(),t.TgZ(31,"th",19),t._uU(32,"Brands"),t.qZA(),t.TgZ(33,"th",19),t._uU(34,"Category"),t.qZA(),t.TgZ(35,"th",19),t._uU(36,"Sub Category"),t.qZA(),t.TgZ(37,"th",19),t._uU(38,"UOM"),t.qZA(),t.TgZ(39,"th",19),t._uU(40,"GST"),t.qZA(),t.TgZ(41,"th",19),t._uU(42,"Specification"),t.qZA(),t.TgZ(43,"th",19),t._uU(44,"Action"),t.qZA()()(),t.TgZ(45,"tbody"),t.YNc(46,_t,25,9,"tr",20),t.qZA()(),t.TgZ(47,"mat-paginator",21,22),t.NdJ("page",function(r){t.CHM(e);const i=t.oxw();return t.KtG(i.onPageChange(r))}),t.qZA()(),t.BQk()}if(2&o){const e=t.oxw();t.xp6(46),t.Q6J("ngForOf",e.itemList),t.xp6(1),t.Q6J("length",e.length)("pageSize",e.pageSize)("disabled",e.disabled)("showFirstLastButtons",e.showFirstLastButtons)("pageSizeOptions",e.pageSizeOptions)("hidePageSize",e.hidePageSize)("pageIndex",e.pageIndex)}}function ht(o,a){1&o&&(t.TgZ(0,"h3",29),t._uU(1," You don't have permissions to view. "),t.qZA())}function bt(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"h1",30),t._uU(1,"Error in Imported Item List"),t.qZA(),t._UZ(2,"div",31),t.TgZ(3,"div",32)(4,"button",33),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.dialog.closeAll())}),t._uU(5,"Close"),t.qZA()()}if(2&o){const e=a.$implicit;t.xp6(2),t.Q6J("innerHTML",e.message,t.oJD)}}let Ct=(()=>{class o{constructor(e,n,r,i,l,p,c,C,T){this.router=e,this.httpService=n,this.excelService=r,this.snack=i,this.http=l,this.toast=p,this.dialog=c,this.auth=C,this.userService=T,this.subCategoryList=[],this.itemList=[],this.pageSizeOptions=[5,10,20],this.pageSize=10,this.length=50,this.pageIndex=0,this.disabled=!1,this.showPageSizeOptions=!1,this.showFirstLastButtons=!0,this.hidePageSize=!1,this.pagestore=0}ngOnInit(){this.permissions=JSON.parse(localStorage.getItem("loginData")),this.userService.getUserss().subscribe(e=>{e.find(r=>r._id===this.permissions.user._id)?(this.httpService.GET(`/roles/role/${this.permissions.user.role}`,{}).subscribe({next:l=>{this.addPermission=l.dashboard_permissions[0].ParentChildchecklist[11].childList[0].isSelected,this.editPermission=l.dashboard_permissions[0].ParentChildchecklist[11].childList[1].isSelected,this.deletePermission=l.dashboard_permissions[0].ParentChildchecklist[11].childList[2].isSelected,this.viewPermission=l.dashboard_permissions[0].ParentChildchecklist[11].childList[3].isSelected},error:l=>{console.log(l)}}),this.getList()):(this.snack.notify("Invalid Credentials - User Details not Valid",1),this.auth.removeUser(),this.userService.updateLogin("logout"),this.router.navigate(["/login"]))})}getList(){const e=this.http.get(`${_.N.api_path}${g.eC}`),n=this.http.get(`${_.N.api_path}${g.jz}`),r=this.http.get(`${_.N.api_path}${g.Lk}`);this.httpService.multipleRequests([e,n,r],{}).subscribe(i=>{i&&(this.subCategoryList=i[0].data,console.log("Sub Category : ",this.subCategoryList),this.categoryList=i[1].data,this.brandList=i[2].data)},i=>{if(i.errors&&!(0,f.isEmpty)(i.errors)){let l="<ul>";for(let p in i.errors)l+=`<li>${i.errors[p][0]}</li>`;l+="</ul>",this.snack.notifyHtml(l,2)}else this.snack.notify(i.message,2)}),this.fetchItemList(0,this.pageSize),this.httpService.GET(g.o7,{}).subscribe(i=>{i&&i.data&&(console.log(i.data),this.list=i.data,this.length=i.data.length)},i=>{if(i.errors&&!(0,f.isEmpty)(i.errors)){let l="<ul>";for(let p in i.errors)l+=`<li>${i.errors[p][0]}</li>`;l+="</ul>",this.snack.notifyHtml(l,2)}else this.snack.notify(i.message,2)})}fetchItemList(e,n){const r={page:e+1,per_page:n};this.pagestore=r.page,console.log("L",this.pagestore),this.httpService.GET(g.o7,r).subscribe(i=>{console.log("res+++",i),i&&i.data&&(this.itemList=i.data)},i=>{if(i.errors&&!(0,f.isEmpty)(i.errors)){let l="<ul>";for(let p in i.errors)l+=`<li>${i.errors[p][0]}</li>`;l+="</ul>",this.snack.notifyHtml(l,2)}else this.snack.notify(i.message,2)})}getCategory(e){return this.categoryList.filter(n=>n._id==e)[0]?.name}getSubCategory(e){return this.subCategoryList.filter(n=>n._id==e)[0]?.subcategory_name}getBrandNamesByIds(e){if(void 0===e)return"";console.log(e);const n=this.brandList.reduce((r,i)=>(r[i._id]=i.brand_name,r),{});return e.map(r=>n[r]).filter(r=>r).join(" / ")}edit(e){if(!this.editPermission)return void this.toast.openSnackBar("Access to Item Master editing is restricted for your account.");let n="item/edit/"+e;console.log(n),this.router.navigateByUrl(n)}add(){this.addPermission?this.router.navigateByUrl("item/add"):this.toast.openSnackBar("Access to Item Master add is restricted for your account.")}delete(e){this.deletePermission?this.httpService.DELETE(g.o7,{_id:e}).subscribe(n=>{n&&(this.snack.notify("Item record has been deleted successfully.",2),this.getList())},n=>{if(n.errors&&!(0,f.isEmpty)(n.errors)){let r="<ul>";for(let i in n.errors)r+=`<li>${n.errors[i][0]}</li>`;r+="</ul>",this.snack.notifyHtml(r,2)}else this.snack.notify(n.message,2)}):this.toast.openSnackBar("Access to Item Master deleting is restricted for your account.")}search(e){e.target.value?this.itemList=this.list.filter(n=>n.item_name.toLowerCase().includes(e.target.value.toLowerCase())):this.fetchItemList(this.pagestore-1,this.pageSize)}exportXlSX(){var e=this;return(0,U.Z)(function*(){let n=e.itemList.map(c=>(c.categoryName=c.categoryDetail?.name,c.brandName=e.getBrandNamesByIds(c.brands),c.subCategoryName=c.subCategoryDetail?.subcategory_name,c.uomName=c.uomDetail?.uom_name,c.gstValue=c.gstDetail?.gst_percentage,c));e.excelService.mapArrayToExcel("Item",["Item Number","Item Name","Brands","Category Name","Sub Category Name","UOM","GST","Specification"],["item_number","item_name","brandName","categoryName","subCategoryName","uomName","gstValue","specification"],["string","string","string","string","string","string","string"],n)})()}exportAllXlSX(){var e=this;return(0,U.Z)(function*(){let n=e.list.map(c=>(c.categoryName=c.categoryDetail?.name,c.subCategoryName=c.subCategoryDetail?.subcategory_name,c.uomName=c.uomDetail?.uom_name,c.gstValue=c.gstDetail?.gst_percentage,c));e.excelService.mapArrayToExcel("Item",["Item Number","Item Name","Category Name","Sub Category Name","UOM","GST","Specification"],["item_number","item_name","categoryName","subCategoryName","uomName","gstValue","specification"],["string","string","string","string","string","string","string"],n)})()}onPageChange(e){console.log(e),this.fetchItemList(e.pageIndex,e.pageSize)}importFile(e){const n=e.target.files[0];if(!n)return;console.log("deaw",n);const r=new FormData;r.append("file",n),console.log(r),this.http.post(`${_.N.api_path}/item/upload-csv`,r).subscribe({next:i=>{this.snack.notify("File imported successfully!",1),this.getList()},error:i=>{console.log("Error:",i.error.message);const c=`<ul>${i.error.message.replace("Errors encountered during processing:","").split(",").map(C=>`<li>${C.trim()}</li>`).join("")}</ul>`;this.showErrorDialog(c)}})}showErrorDialog(e){console.log(e),this.dialog.open(this.errorDialog,{data:{message:e}})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(Z.F0),t.Y36(v.s),t.Y36(mt.x),t.Y36(q.o),t.Y36(N.eN),t.Y36(ut.k),t.Y36(A.uw),t.Y36(gt.e),t.Y36(dt.f))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-listing"]],viewQuery:function(e,n){if(1&e&&(t.Gf(k.NW,5),t.Gf(pt,5)),2&e){let r;t.iGM(r=t.CRH())&&(n.paginator=r.first),t.iGM(r=t.CRH())&&(n.errorDialog=r.first)}},decls:6,vars:2,consts:[[1,"section-wrapper"],[4,"ngIf","ngIfElse"],["noView",""],["errorDialog",""],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],[1,"filter-con"],["appearance","outline",1,"full-width","drop-down","outline-filter-field","hide-form-bottom-field"],["matInput","","placeholder","Search by name",3,"input"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"submit-btn"],["type","file","accept",".csv",2,"display","none",3,"change"],["fileInput",""],[3,"click"],["mat-button","",1,"other-btn",3,"click"],[1,"section-body"],[1,"table","pragati-table"],["scope","col"],[4,"ngFor","ngForOf"],["aria-label","Select page",1,"demo-paginator",3,"length","pageSize","disabled","showFirstLastButtons","pageSizeOptions","hidePageSize","pageIndex","page"],["paginator",""],["scope","row"],[1,"action-btn-wrapper"],["title","Edit",1,"action-btn",3,"click"],[1,"fa","fa-edit"],["title","Delete",1,"action-btn",3,"click"],[1,"fa","fa-trash"],[2,"display","flex","justify-content","center","margin-top","2%","font-size","160%","font-weight","bolder","color","grey"],["mat-dialog-title","",2,"font-size","15px","font-weight","bold"],["mat-dialog-content","",1,"error-dialog-content",3,"innerHTML"],["mat-dialog-actions","",1,"modal-actions"],["mat-button","",1,"modal-close-button",3,"click"]],template:function(e,n){if(1&e&&(t.TgZ(0,"div",0),t.YNc(1,ft,49,8,"ng-container",1),t.YNc(2,ht,2,0,"ng-template",null,2,t.W1O),t.qZA(),t.YNc(4,bt,6,1,"ng-template",null,3,t.W1O)),2&e){const r=t.MAs(3);t.xp6(1),t.Q6J("ngIf",n.viewPermission)("ngIfElse",r)}},dependencies:[b.KE,x.lW,A.uh,A.xY,A.H8,O.Nt,k.NW,h.sg,h.O5],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.error-dialog-content[_ngcontent-%COMP%]{max-height:400px;overflow-y:auto;word-wrap:break-word;font-size:12px}.modal-actions[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-top:10px}.modal-close-button[_ngcontent-%COMP%]{background-color:#233a61;color:#fff;font-size:13px;height:35px;border-radius:4px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.submit-btn[_ngcontent-%COMP%]:hover{opacity:.7}.cancel-btn[_ngcontent-%COMP%]{background:#ccc;font-size:12px;padding-left:23px;padding-right:23px}.cancel-btn[_ngcontent-%COMP%]:hover{opacity:.7}.other-btn[_ngcontent-%COMP%]{background:#525252;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.other-btn[_ngcontent-%COMP%]:hover{opacity:.7}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}.pragati-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{position:sticky;top:0;background:#233A61;color:#fff;font-weight:400;font-size:12px;border:.5px solid #94A3B8;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-left:.5px solid #94A3B8;border-right:.5px solid #94A3B8;font-weight:400;font-size:12px;background:#F4F4F5;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n)   td[_ngcontent-%COMP%]{background:#D9DADE}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}.pragati-table[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]{display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:#0006}.pragati-table[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:80%}.pragati-table[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700}.pragati-table[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover, .pragati-table[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:focus{color:#000;text-decoration:none;cursor:pointer}"]}),o})();var yt=u(8898);const Zt=[{path:"add",component:K},{path:"",component:Ct},{path:"edit/:id",component:ct}];let Tt=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[yt.S,h.ez,s.UX,[Z.Bz.forChild(Zt)]]}),o})()}}]);