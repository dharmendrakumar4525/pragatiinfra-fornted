"use strict";(self.webpackChunkpra=self.webpackChunkpra||[]).push([[375],{8375:(ge,v,d)=>{d.r(v),d.d(v,{SiteModule:()=>_e});var u=d(6895),o=d(4006),h=d(8608),Z=d(7489),e=d(4650),g=d(9299),C=d(2126),b=d(6104),q=d(4961),y=d(3238),_=d(9549),A=d(4859),T=d(4144),I=d(4385);function N(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function M(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function x(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function O(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"mat-option",27),e.NdJ("onSelectionChange",function(){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.manageChange(s._id))}),e._uU(1),e.qZA()}if(2&n){const t=a.$implicit;e.Q6J("value",null==t?null:t.name),e.xp6(1),e.hij(" ",null==t?null:t.name," ")}}function F(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function P(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function k(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function S(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function w(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function D(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function J(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function E(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function Y(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}let L=(()=>{class n{constructor(t,r,i,s,m){this.router=t,this.httpService=r,this.snack=i,this.route=s,this.userService=m,this.addForm=new o.cw({location:new o.NI("",o.kI.required),site_name:new o.NI("",o.kI.required),code:new o.NI("",o.kI.required),store_manager:new o.NI("",o.kI.required),store_manager_phone_number_dialcode:new o.NI("+91"),store_manager_phone_number:new o.NI("",o.kI.required),site_manager_email:new o.NI("",[o.kI.email,o.kI.required]),address:new o.cw({street_address:new o.NI("",o.kI.required),street_address2:new o.NI("",o.kI.required),state:new o.NI("",o.kI.required),city:new o.NI("",o.kI.required),zip_code:new o.NI("",o.kI.required),country:new o.NI("",o.kI.required)})}),this.users=[],this.userService.getUserss().subscribe(p=>{this.users=p})}saveData(){this.addForm.valid?this.httpService.POST(h.vI,this.addForm.value).subscribe(t=>{this.snack.notify("Organisation data has been saved sucessfully.",1),this.router.navigate(["site"])},t=>{if(t.errors&&!(0,Z.isEmpty)(t.errors)){let r="<ul>";for(let i in t.errors)r+=`<li>${t.errors[i][0]}</li>`;r+="</ul>",this.snack.notifyHtml(r,2)}else this.snack.notify(t.message,2)}):this.addForm.markAllAsTouched()}list(){this.router.navigate(["site"])}manageChange(t){console.log(t);let r=this.users.filter(i=>i._id==t);this.addForm.patchValue({store_manager_phone_number:r[0].phone,site_manager_email:r[0].email})}ngOnInit(){}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.F0),e.Y36(C.s),e.Y36(b.o),e.Y36(g.gz),e.Y36(q.f))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-add-data"]],decls:90,vars:16,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","site_name"],[4,"ngIf"],["matInput","","formControlName","location"],["matInput","","formControlName","code"],["matInput","","formControlName","store_manager"],[3,"value","onSelectionChange",4,"ngFor","ngForOf"],["matInput","","formControlName","store_manager_phone_number","type","number",3,"readonly"],["matInput","","formControlName","site_manager_email","type","email",3,"readonly"],["formGroupName","address",1,"row"],["matInput","","formControlName","street_address"],["matInput","","formControlName","street_address2"],["matInput","","formControlName","state"],["matInput","","formControlName","city"],["matInput","","formControlName","zip_code","type","number","maxlength","6"],["matInput","","formControlName","country"],[3,"value","onSelectionChange"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),e._uU(4,"Add Site"),e.qZA()(),e.TgZ(5,"div",3)(6,"div",4)(7,"button",5),e.NdJ("click",function(){return r.saveData()}),e._uU(8,"Submit"),e.qZA(),e.TgZ(9,"button",6),e.NdJ("click",function(){return r.list()}),e._uU(10,"Cancel"),e.qZA()()()(),e.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),e._uU(17,"Site Name"),e.qZA(),e._UZ(18,"input",12),e.YNc(19,N,2,0,"mat-error",13),e.qZA()(),e.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),e._uU(23,"Location"),e.qZA(),e._UZ(24,"input",14),e.YNc(25,M,2,0,"mat-error",13),e.qZA()(),e.TgZ(26,"div",10)(27,"mat-form-field",11)(28,"mat-label"),e._uU(29,"Code"),e.qZA(),e._UZ(30,"input",15),e.YNc(31,x,2,0,"mat-error",13),e.qZA()(),e.TgZ(32,"div",10)(33,"mat-form-field",11)(34,"mat-label"),e._uU(35,"Store Manager"),e.qZA(),e.TgZ(36,"mat-select",16),e.YNc(37,O,2,2,"mat-option",17),e.qZA(),e.YNc(38,F,2,0,"mat-error",13),e.qZA()(),e.TgZ(39,"div",10)(40,"mat-form-field",11)(41,"mat-label"),e._uU(42,"Store Manager Number"),e.qZA(),e._UZ(43,"input",18),e.YNc(44,P,2,0,"mat-error",13),e.qZA()(),e.TgZ(45,"div",10)(46,"mat-form-field",11)(47,"mat-label"),e._uU(48,"Store Manager Email"),e.qZA(),e._UZ(49,"input",19),e.YNc(50,k,2,0,"mat-error",13),e.qZA()(),e.TgZ(51,"h4"),e._uU(52,"Address"),e.qZA(),e.TgZ(53,"div",20)(54,"div",10)(55,"mat-form-field",11)(56,"mat-label"),e._uU(57,"Street Address"),e.qZA(),e._UZ(58,"input",21),e.YNc(59,S,2,0,"mat-error",13),e.qZA()(),e.TgZ(60,"div",10)(61,"mat-form-field",11)(62,"mat-label"),e._uU(63,"Street Address 2"),e.qZA(),e._UZ(64,"input",22),e.YNc(65,w,2,0,"mat-error",13),e.qZA()(),e.TgZ(66,"div",10)(67,"mat-form-field",11)(68,"mat-label"),e._uU(69,"State"),e.qZA(),e._UZ(70,"input",23),e.YNc(71,D,2,0,"mat-error",13),e.qZA()(),e.TgZ(72,"div",10)(73,"mat-form-field",11)(74,"mat-label"),e._uU(75,"City"),e.qZA(),e._UZ(76,"input",24),e.YNc(77,J,2,0,"mat-error",13),e.qZA()(),e.TgZ(78,"div",10)(79,"mat-form-field",11)(80,"mat-label"),e._uU(81,"Zip Code"),e.qZA(),e._UZ(82,"input",25),e.YNc(83,E,2,0,"mat-error",13),e.qZA()(),e.TgZ(84,"div",10)(85,"mat-form-field",11)(86,"mat-label"),e._uU(87,"Country"),e.qZA(),e._UZ(88,"input",26),e.YNc(89,Y,2,0,"mat-error",13),e.qZA()()()()()()()),2&t&&(e.xp6(12),e.Q6J("formGroup",r.addForm),e.xp6(7),e.Q6J("ngIf",null==r.addForm.controls.site_name.errors?null:r.addForm.controls.site_name.errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.controls.location.errors?null:r.addForm.controls.location.errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.controls.code.errors?null:r.addForm.controls.code.errors.required),e.xp6(6),e.Q6J("ngForOf",r.users),e.xp6(1),e.Q6J("ngIf",null==r.addForm.controls.store_manager.errors?null:r.addForm.controls.store_manager.errors.required),e.xp6(5),e.Q6J("readonly",!0),e.xp6(1),e.Q6J("ngIf",null==r.addForm.controls.store_manager_phone_number.errors?null:r.addForm.controls.store_manager_phone_number.errors.required),e.xp6(5),e.Q6J("readonly",!0),e.xp6(1),e.Q6J("ngIf",null==r.addForm.controls.site_manager_email.errors?null:r.addForm.controls.site_manager_email.errors.required),e.xp6(9),e.Q6J("ngIf",null==r.addForm.get("address.street_address").errors?null:r.addForm.get("address.street_address").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.get("address.street_address2").errors?null:r.addForm.get("address.street_address2").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.get("address.state").errors?null:r.addForm.get("address.state").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.get("address.city").errors?null:r.addForm.get("address.city").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.get("address.zip_code").errors?null:r.addForm.get("address.zip_code").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.addForm.get("address.country").errors?null:r.addForm.get("address.country").errors.required))},dependencies:[y.ey,_.TO,_.KE,_.hX,A.lW,T.Nt,I.gD,u.sg,u.O5,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.nD,o.sg,o.u,o.x0],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}"]}),n})();function Q(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function z(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function j(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function G(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"mat-option",27),e.NdJ("onSelectionChange",function(){const s=e.CHM(t).$implicit,m=e.oxw();return e.KtG(m.manageChange(s._id))}),e._uU(1),e.qZA()}if(2&n){const t=a.$implicit;e.Q6J("value",null==t?null:t.name),e.xp6(1),e.hij(" ",null==t?null:t.name," ")}}function $(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function H(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function B(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function K(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function X(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function V(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function W(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function R(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}function ee(n,a){1&n&&(e.TgZ(0,"mat-error"),e._uU(1," this field is required. "),e.qZA())}let te=(()=>{class n{constructor(t,r,i,s,m){this.router=t,this.httpService=r,this.snack=i,this.route=s,this.userService=m,this.editForm=new o.cw({location:new o.NI("",o.kI.required),site_name:new o.NI("",o.kI.required),code:new o.NI("",o.kI.required),store_manager:new o.NI("",o.kI.required),store_manager_phone_number_dialcode:new o.NI("+91"),store_manager_phone_number:new o.NI("",o.kI.required),site_manager_email:new o.NI("",[o.kI.email,o.kI.required]),address:new o.cw({street_address:new o.NI("",o.kI.required),street_address2:new o.NI("",o.kI.required),state:new o.NI("",o.kI.required),city:new o.NI("",o.kI.required),zip_code:new o.NI("",o.kI.required),country:new o.NI("",o.kI.required)}),_id:new o.NI}),this.users=[],this.userService.getUserss().subscribe(p=>{this.users=p,this.getDetails()})}getDetails(){this.route.params.subscribe(t=>{console.log(t),console.log(t.id),t.id?this.httpService.GET(`${h.vI}/detail`,{_id:t.id}).subscribe(r=>{console.log(r),r&&this.patchValue(r.data)},r=>{if(r.errors&&!(0,Z.isEmpty)(r.errors)){let i="<ul>";for(let s in r.errors)i+=`<li>${r.errors[s][0]}</li>`;i+="</ul>",this.snack.notifyHtml(i,2)}else this.snack.notify(r.message,2)}):this.list()})}patchValue(t){console.log("this.users",this.users);let r=this.users.filter(i=>{if(console.log(i),i.phone==t.store_manager_phone_number)return console.log(i),i});this.editForm.patchValue({location:t.location?t.location:"",site_name:t.site_name?t.site_name:"",code:t.code?t.code:"",store_manager:r[0]&&r[0].name?r[0].name:t.store_manager?t.store_manager:"",store_manager_phone_number_dialcode:"+91",store_manager_phone_number:t.store_manager_phone_number?t.store_manager_phone_number:"",site_manager_email:t.site_manager_email?t.site_manager_email:"",address:{street_address:t.address.street_address?t.address.street_address:"",street_address2:t.address.street_address2?t.address.street_address2:"",state:t.address.state?t.address.state:"",city:t.address.city?t.address.city:"",zip_code:t.address.zip_code?t.address.zip_code:"",country:t.address.country?t.address.country:""},_id:t._id})}saveData(){this.editForm.valid?this.httpService.PUT(h.vI,this.editForm.value).subscribe(t=>{this.snack.notify("site data has been saved sucessfully.",1),this.router.navigate(["site"])},t=>{if(t.errors&&!(0,Z.isEmpty)(t.errors)){let r="<ul>";for(let i in t.errors)r+=`<li>${t.errors[i][0]}</li>`;r+="</ul>",this.snack.notifyHtml(r,2)}else this.snack.notify(t.message,2)}):this.editForm.markAllAsTouched()}list(){this.router.navigate(["site"])}manageChange(t){let r=this.users.filter(i=>i._id==t);this.editForm.patchValue({store_manager_phone_number:r[0].phone,site_manager_email:r[0].email})}ngOnInit(){}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.F0),e.Y36(C.s),e.Y36(b.o),e.Y36(g.gz),e.Y36(q.f))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-data"]],decls:90,vars:16,consts:[[1,"section-wrapper"],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"cancel-btn",3,"click"],[1,"section-body"],[3,"formGroup"],[1,"row"],[1,"col-md-3"],["appearance","outline"],["matInput","","formControlName","site_name"],[4,"ngIf"],["matInput","","formControlName","location"],["matInput","","formControlName","code"],["matInput","","formControlName","store_manager"],[3,"value","onSelectionChange",4,"ngFor","ngForOf"],["matInput","","formControlName","store_manager_phone_number","type","number",3,"readonly"],["matInput","","formControlName","site_manager_email","type","email",3,"readonly"],["formGroupName","address",1,"row"],["matInput","","formControlName","street_address"],["matInput","","formControlName","street_address2"],["matInput","","formControlName","state"],["matInput","","formControlName","city"],["matInput","","formControlName","zip_code","type","number","maxlength","6"],["matInput","","formControlName","country"],[3,"value","onSelectionChange"]],template:function(t,r){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h2"),e._uU(4,"Edit Organisation"),e.qZA()(),e.TgZ(5,"div",3)(6,"div",4)(7,"button",5),e.NdJ("click",function(){return r.saveData()}),e._uU(8,"Submit"),e.qZA(),e.TgZ(9,"button",6),e.NdJ("click",function(){return r.list()}),e._uU(10,"Cancel"),e.qZA()()()(),e.TgZ(11,"div",7)(12,"form",8)(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),e._uU(17,"Site Name"),e.qZA(),e._UZ(18,"input",12),e.YNc(19,Q,2,0,"mat-error",13),e.qZA()(),e.TgZ(20,"div",10)(21,"mat-form-field",11)(22,"mat-label"),e._uU(23,"Location"),e.qZA(),e._UZ(24,"input",14),e.YNc(25,z,2,0,"mat-error",13),e.qZA()(),e.TgZ(26,"div",10)(27,"mat-form-field",11)(28,"mat-label"),e._uU(29,"Code"),e.qZA(),e._UZ(30,"input",15),e.YNc(31,j,2,0,"mat-error",13),e.qZA()(),e.TgZ(32,"div",10)(33,"mat-form-field",11)(34,"mat-label"),e._uU(35,"Store Manager"),e.qZA(),e.TgZ(36,"mat-select",16),e.YNc(37,G,2,2,"mat-option",17),e.qZA(),e.YNc(38,$,2,0,"mat-error",13),e.qZA()(),e.TgZ(39,"div",10)(40,"mat-form-field",11)(41,"mat-label"),e._uU(42,"Store Manager Number"),e.qZA(),e._UZ(43,"input",18),e.YNc(44,H,2,0,"mat-error",13),e.qZA()(),e.TgZ(45,"div",10)(46,"mat-form-field",11)(47,"mat-label"),e._uU(48,"Store Manager Email"),e.qZA(),e._UZ(49,"input",19),e.YNc(50,B,2,0,"mat-error",13),e.qZA()(),e.TgZ(51,"h4"),e._uU(52,"Address"),e.qZA(),e.TgZ(53,"div",20)(54,"div",10)(55,"mat-form-field",11)(56,"mat-label"),e._uU(57,"Street Address"),e.qZA(),e._UZ(58,"input",21),e.YNc(59,K,2,0,"mat-error",13),e.qZA()(),e.TgZ(60,"div",10)(61,"mat-form-field",11)(62,"mat-label"),e._uU(63,"Street Address 2"),e.qZA(),e._UZ(64,"input",22),e.YNc(65,X,2,0,"mat-error",13),e.qZA()(),e.TgZ(66,"div",10)(67,"mat-form-field",11)(68,"mat-label"),e._uU(69,"State"),e.qZA(),e._UZ(70,"input",23),e.YNc(71,V,2,0,"mat-error",13),e.qZA()(),e.TgZ(72,"div",10)(73,"mat-form-field",11)(74,"mat-label"),e._uU(75,"City"),e.qZA(),e._UZ(76,"input",24),e.YNc(77,W,2,0,"mat-error",13),e.qZA()(),e.TgZ(78,"div",10)(79,"mat-form-field",11)(80,"mat-label"),e._uU(81,"Zip Code"),e.qZA(),e._UZ(82,"input",25),e.YNc(83,R,2,0,"mat-error",13),e.qZA()(),e.TgZ(84,"div",10)(85,"mat-form-field",11)(86,"mat-label"),e._uU(87,"Country"),e.qZA(),e._UZ(88,"input",26),e.YNc(89,ee,2,0,"mat-error",13),e.qZA()()()()()()()),2&t&&(e.xp6(12),e.Q6J("formGroup",r.editForm),e.xp6(7),e.Q6J("ngIf",null==r.editForm.controls.site_name.errors?null:r.editForm.controls.site_name.errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.controls.location.errors?null:r.editForm.controls.location.errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.controls.code.errors?null:r.editForm.controls.code.errors.required),e.xp6(6),e.Q6J("ngForOf",r.users),e.xp6(1),e.Q6J("ngIf",null==r.editForm.controls.store_manager.errors?null:r.editForm.controls.store_manager.errors.required),e.xp6(5),e.Q6J("readonly",!0),e.xp6(1),e.Q6J("ngIf",null==r.editForm.controls.store_manager_phone_number.errors?null:r.editForm.controls.store_manager_phone_number.errors.required),e.xp6(5),e.Q6J("readonly",!0),e.xp6(1),e.Q6J("ngIf",null==r.editForm.controls.site_manager_email.errors?null:r.editForm.controls.site_manager_email.errors.required),e.xp6(9),e.Q6J("ngIf",null==r.editForm.get("address.street_address").errors?null:r.editForm.get("address.street_address").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.get("address.street_address2").errors?null:r.editForm.get("address.street_address2").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.get("address.state").errors?null:r.editForm.get("address.state").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.get("address.city").errors?null:r.editForm.get("address.city").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.get("address.zip_code").errors?null:r.editForm.get("address.zip_code").errors.required),e.xp6(6),e.Q6J("ngIf",null==r.editForm.get("address.country").errors?null:r.editForm.get("address.country").errors.required))},dependencies:[y.ey,_.TO,_.KE,_.hX,A.lW,T.Nt,I.gD,u.sg,u.O5,o._Y,o.Fj,o.wV,o.JJ,o.JL,o.nD,o.sg,o.u,o.x0],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff}.cancel-btn[_ngcontent-%COMP%]{background:#ccc}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}input[_ngcontent-%COMP%]::-webkit-outer-spin-button, input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}"]}),n})();var re=d(5861),ne=d(9715),oe=d(4465),ie=d(2894),ae=d(445);function se(n,a){if(1&n){const t=e.EpF();e.TgZ(0,"tr")(1,"td",17),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e._uU(8),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td"),e._uU(12),e.qZA(),e.TgZ(13,"td"),e._uU(14),e.qZA(),e.TgZ(15,"td"),e._uU(16),e.qZA(),e.TgZ(17,"td")(18,"div",18)(19,"a",19),e.NdJ("click",function(){const s=e.CHM(t).$implicit,m=e.oxw(2);return e.KtG(m.edit(s._id))}),e._UZ(20,"i",20),e.qZA(),e.TgZ(21,"a",21),e.NdJ("click",function(){const s=e.CHM(t).$implicit,m=e.oxw(2);return e.KtG(m.delete(s._id))}),e._UZ(22,"i",22),e.qZA()()()()}if(2&n){const t=a.$implicit,r=a.index;e.xp6(2),e.Oqu(r+1),e.xp6(2),e.Oqu(t.location),e.xp6(2),e.Oqu(t.site_name),e.xp6(2),e.Oqu(t.code),e.xp6(2),e.Oqu(t.store_manager),e.xp6(2),e.Oqu(t.store_manager_phone_number),e.xp6(2),e.Oqu(t.site_manager_email),e.xp6(2),e.hij(" ",t.address.street_address+" "+t.address.street_address2+" "+t.address.state+" "+t.address.city+" "+t.address.country," ")}}function de(n,a){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"div",3)(2,"div",4)(3,"h2"),e._uU(4,"Site Master"),e.qZA()(),e.TgZ(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"mat-form-field",9)(10,"input",10),e.NdJ("input",function(i){e.CHM(t);const s=e.oxw();return e.KtG(s.search(i))}),e.qZA()()()(),e.TgZ(11,"button",11),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.add())}),e._uU(12,"Add New"),e.qZA(),e.TgZ(13,"button",12),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.exportXlSX())}),e._uU(14," Export "),e.qZA()()()(),e.TgZ(15,"div",13)(16,"table",14)(17,"thead")(18,"tr")(19,"th",15),e._uU(20,"SN."),e.qZA(),e.TgZ(21,"th",15),e._uU(22,"Locaton"),e.qZA(),e.TgZ(23,"th",15),e._uU(24,"Site Name"),e.qZA(),e.TgZ(25,"th",15),e._uU(26,"Code"),e.qZA(),e.TgZ(27,"th",15),e._uU(28,"Store Manager"),e.qZA(),e.TgZ(29,"th",15),e._uU(30,"Store Manager Number"),e.qZA(),e.TgZ(31,"th",15),e._uU(32,"Store Manager Email"),e.qZA(),e.TgZ(33,"th",15),e._uU(34,"Address"),e.qZA(),e.TgZ(35,"th",15),e._uU(36,"Action"),e.qZA()()(),e.TgZ(37,"tbody"),e.YNc(38,se,23,8,"tr",16),e.qZA()()(),e.BQk()}if(2&n){const t=e.oxw();e.xp6(38),e.Q6J("ngForOf",t.siteList)}}function le(n,a){1&n&&(e.TgZ(0,"h3",23),e._uU(1," You don't have permissions to view. "),e.qZA())}let me=(()=>{class n{constructor(t,r,i,s,m,p,l){this.router=t,this.httpService=r,this.excelService=i,this.snack=s,this.toast=m,this.auth=p,this.userService=l,this.siteList=[],this.list=[],this.permissions=JSON.parse(localStorage.getItem("loginData")),this.userService.getUserss().subscribe(c=>{c.find(U=>U._id===this.permissions.user._id)?(this.httpService.GET(`/roles/role/${this.permissions.user.role}`,{}).subscribe({next:f=>{this.addPermission=f.dashboard_permissions[0].ParentChildchecklist[14].childList[0].isSelected,this.editPermission=f.dashboard_permissions[0].ParentChildchecklist[14].childList[1].isSelected,this.deletePermission=f.dashboard_permissions[0].ParentChildchecklist[14].childList[2].isSelected,this.viewPermission=f.dashboard_permissions[0].ParentChildchecklist[14].childList[3].isSelected},error:f=>{console.log(f)}}),this.getList()):(this.snack.notify("Invalid Credentials - User Details not Valid",1),this.auth.removeUser(),this.userService.updateLogin("logout"),this.router.navigate(["/login"]))})}getList(){this.httpService.GET(h.vI,{}).subscribe(t=>{t&&t.data&&(this.siteList=t.data,this.list=t.data)},t=>{if(t.errors&&!(0,Z.isEmpty)(t.errors)){let r="<ul>";for(let i in t.errors)r+=`<li>${t.errors[i][0]}</li>`;r+="</ul>",this.snack.notifyHtml(r,2)}else this.snack.notify(t.message,2)})}edit(t){if(console.log(t,"Id"),!this.editPermission)return void this.toast.openSnackBar("Access to Site Master editing is restricted for your account.");let r="site/edit/"+t;console.log(r),this.router.navigateByUrl(r)}add(){this.addPermission?this.router.navigateByUrl("site/add"):this.toast.openSnackBar("Access to Site Master add is restricted for your account.")}delete(t){this.deletePermission?this.httpService.DELETE(h.vI,{_id:t}).subscribe(r=>{r&&(this.snack.notify("site record has been deleted sucessfully.",1),this.getList())},r=>{if(r.errors&&!(0,Z.isEmpty)(r.errors)){let i="<ul>";for(let s in r.errors)i+=`<li>${r.errors[s][0]}</li>`;i+="</ul>",this.snack.notifyHtml(i,2)}else this.snack.notify(r.message,2)}):this.toast.openSnackBar("Access to Site Master deleting is restricted for your account.")}search(t){this.siteList=t.target.value?this.list.filter(r=>r.site_name.toLowerCase().includes(t.target.value.toLowerCase())):this.list}exportXlSX(){var t=this;return(0,re.Z)(function*(){let r=t.siteList.map(l=>{l.store_manager_number=`${l.store_manager_phone_number_dialcode}-${l.store_manager_phone_number}`;let c=[];return l.address&&(l.address.street_address&&c.push(l.address.street_address),l.address.street_address2&&c.push(l.address.street_address2),l.address.city&&c.push(l.address.city),l.address.state&&c.push(l.address.state),l.address.country&&c.push(l.address.country),l.address.zip_code&&c.push(l.address.zip_code)),l.address2=c.join(", "),l});t.excelService.mapArrayToExcel("sites",["Locaton","Site Name\t","Code","Store Manager\t","Store Manager Number","Store Manager Email","Address"],["location","site_name","code","store_manager","store_manager_number","site_manager_email","address2"],["string","string","string","string","string","string","string"],r)})()}ngOnInit(){}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.F0),e.Y36(C.s),e.Y36(ne.x),e.Y36(b.o),e.Y36(oe.k),e.Y36(ie.e),e.Y36(q.f))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-listing"]],decls:4,vars:2,consts:[[1,"section-wrapper"],[4,"ngIf","ngIfElse"],["noView",""],[1,"section-header"],[1,"header-left"],[1,"header-right"],[1,"buttons-containers"],[1,"filter-con"],["dir","ltr",1,"labeled-outlined-field-wrapper"],["appearance","outline",1,"full-width","drop-down","outline-filter-field","hide-form-bottom-field"],["matInput","","placeholder","Search by name",3,"input"],["mat-button","",1,"submit-btn",3,"click"],["mat-button","",1,"other-btn",3,"click"],[1,"section-body"],[1,"table","pragati-table"],["scope","col"],[4,"ngFor","ngForOf"],["scope","row"],[1,"action-btn-wrapper"],["title","Edit",1,"action-btn",3,"click"],[1,"fa","fa-edit"],["title","Delete",1,"action-btn",3,"click"],[1,"fa","fa-trash"],[2,"display","flex","justify-content","center","margin-top","2%","font-size","160%","font-weight","bolder","color","grey"]],template:function(t,r){if(1&t&&(e.TgZ(0,"div",0),e.YNc(1,de,39,1,"ng-container",1),e.YNc(2,le,2,0,"ng-template",null,2,e.W1O),e.qZA()),2&t){const i=e.MAs(3);e.xp6(1),e.Q6J("ngIf",r.viewPermission)("ngIfElse",i)}},dependencies:[ae.Lv,_.KE,A.lW,T.Nt,u.sg,u.O5],styles:[".section-wrapper[_ngcontent-%COMP%]{padding:0 15px}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]{border-bottom:2px solid #C5C5C5;display:flex;align-items:center;justify-content:space-between;padding:18px 0}.section-wrapper[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.buttons-containers[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:10px}.submit-btn[_ngcontent-%COMP%]{background:#233a61;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.submit-btn[_ngcontent-%COMP%]:hover{opacity:.7}.cancel-btn[_ngcontent-%COMP%]{background:#ccc;font-size:12px;padding-left:23px;padding-right:23px}.cancel-btn[_ngcontent-%COMP%]:hover{opacity:.7}.other-btn[_ngcontent-%COMP%]{background:#525252;color:#fff;font-size:12px;padding-left:23px;padding-right:23px}.other-btn[_ngcontent-%COMP%]:hover{opacity:.7}.section-body[_ngcontent-%COMP%]{padding:20px 0 0}mat-form-field[_ngcontent-%COMP%]{display:block}.pragati-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{position:sticky;top:0;background:#233A61;color:#fff;font-weight:400;font-size:12px;border:.5px solid #94A3B8;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-left:.5px solid #94A3B8;border-right:.5px solid #94A3B8;font-weight:400;font-size:12px;background:#F4F4F5;text-align:center;vertical-align:middle}.pragati-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(2n)   td[_ngcontent-%COMP%]{background:#D9DADE}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:center;justify-content:center}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:pointer;padding:5px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#233a61;opacity:.8;font-size:13px}.pragati-table[_ngcontent-%COMP%]   .action-btn-wrapper[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.7}"]}),n})();var ce=d(8898);const ue=[{path:"add",component:L},{path:"",component:me},{path:"edit/:id",component:te}];let _e=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[ce.S,u.ez,o.UX,[g.Bz.forChild(ue)]]}),n})()}}]);