(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-91f52dda"],{"05ee":function(t,e,i){"use strict";i("b544")},"41ae":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{fluid:""}},[i("v-row",[i("v-col",{staticClass:"mx-auto",attrs:{cols:"10"}},[i("h2",{staticClass:"text-center"},[t._v("Update Group")]),i("transition",{attrs:{name:"fade"}},[t.message?i("h6",{staticClass:"pt-5"},[t._v(t._s(t.message))]):t._e()]),i("form",{on:{submit:function(e){return e.preventDefault(),t.processForm(e)}}},[i("v-text-field",{attrs:{label:"Group Name",required:""},model:{value:t.groupName,callback:function(e){t.groupName=e},expression:"groupName"}}),i("h4",[t._v("Guest List")]),i("v-list",{staticClass:"px-5 my-5"},t._l(t.guests,(function(e){return i("v-list-item",{key:e.id},[i("v-list-item-content",{staticClass:"pl-3"},[t.selectedGuests.includes(e.id)?i("v-switch",{attrs:{label:""+e.full_name,value:"true",color:"error"},on:{click:function(i){return t.toggleGuest(e.id)}}}):i("v-switch",{attrs:{label:""+e.full_name,color:"error"},on:{click:function(i){return t.toggleGuest(e.id)}}})],1)],1)})),1),i("v-btn",{attrs:{color:"success"},on:{click:t.processForm}},[t._v(" Update Group ")])],1)],1)],1)],1)},a=[],n=(i("caad"),i("c975"),i("a434"),i("2532"),i("bc3a")),o=i.n(n),r={name:"UpdateGroup",data:function(){return{groupName:"",guests:[],selectedGuests:[],message:""}},methods:{getAccountInformation:function(){var t=this;o.a.get("http://192.168.1.196:8000/api/v1/account/",{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(e){200===e.status?t.accountId=e.data[0].account_id:t.message="Sorry, we are having issues getting your account information."})).catch((function(){t.message="Sorry, we are having issues getting your account information."}))},getGuestsInformation:function(){var t=this;o.a.get("http://192.168.1.196:8000/api/v1/guests/",{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(e){200===e.status?t.guests=e.data:t.message="Sorry, we are having issues getting your account information."})).catch((function(){t.message="Sorry, we are having issues getting your account information."}))},getGroupInformation:function(){var t=this;o.a.get("http://192.168.1.196:8000/api/v1/group/?id=".concat(this.$route.params.id),{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(e){200===e.status?(t.groupName=e.data[0].group_name,t.selectedGuests=e.data[0].guests):t.message="Sorry, we are having issues getting your guest information."})).catch((function(){t.message="Sorry, we are having issues getting your guest information."}))},processForm:function(){var t=this;o.a.put("http://192.168.1.196:8000/api/v1/group/",{account_id:this.accountId,group_name:this.groupName,guests:this.selectedGuests,id:this.$route.params.id},{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(e){201===e.status?(t.message="".concat(t.groupName," information has been updated!"),window.location.href="/groups/"):t.message="Sorry, we are having issues updating ".concat(t.groupName,".")})).catch((function(){t.message="Sorry, we are having issues updating ".concat(t.groupName,".")}))},toggleGuest:function(t){this.selectedGuests.includes(t)?this.selectedGuests.splice(this.selectedGuests.indexOf(t),1):this.selectedGuests.push(t)}},mounted:function(){this.getAccountInformation(),this.getGuestsInformation(),this.getGroupInformation()}},u=r,c=(i("05ee"),i("2877")),l=i("6544"),h=i.n(l),d=i("8336"),p=i("62ad"),f=i("a523"),g=i("8860"),v=i("da13"),m=i("5d23"),b=i("0fd9"),w=i("b73d"),y=i("8654"),C=Object(c["a"])(u,s,a,!1,null,null,null);e["default"]=C.exports;h()(C,{VBtn:d["a"],VCol:p["a"],VContainer:f["a"],VList:g["a"],VListItem:v["a"],VListItemContent:m["a"],VRow:b["a"],VSwitch:w["a"],VTextField:y["a"]})},8547:function(t,e,i){"use strict";var s=i("2b0e"),a=i("80d2");e["a"]=s["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:a["i"]}}})},"9d01":function(t,e,i){},b544:function(t,e,i){},b73d:function(t,e,i){"use strict";i("0481"),i("4069");var s=i("5530"),a=(i("ec29"),i("9d01"),i("4de4"),i("45fc"),i("d3b7"),i("25f0"),i("c37a")),n=i("5607"),o=i("2b0e"),r=o["a"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),u=i("8547"),c=i("58df");function l(t){t.preventDefault()}var h=Object(c["a"])(a["a"],r,u["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:l},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:l},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var s=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===s&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),d=i("c3f0"),p=i("0789"),f=i("490a"),g=i("80d2");e["a"]=h.extend({name:"v-switch",directives:{Touch:d["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(p["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(f["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===g["s"].left&&this.isActive||t.keyCode===g["s"].right&&!this.isActive)&&this.onChange()}}})},ec29:function(t,e,i){}}]);
//# sourceMappingURL=chunk-91f52dda.5cc733bd.js.map