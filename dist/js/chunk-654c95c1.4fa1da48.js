(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-654c95c1"],{1171:function(t,e,a){"use strict";a("7c2c")},"121e":function(t,e,a){"use strict";a("58b3")},"58b3":function(t,e,a){},"7c2c":function(t,e,a){},9413:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{staticClass:"p-5 mx-auto",attrs:{cols:"12"}},[a("h2",{staticClass:"text-center"},[t._v("Alerts")]),a("transition",{attrs:{name:"fade"}},[t.message?a("h6",{staticClass:"pt-5"},[t._v(t._s(t.message))]):t._e()]),a("div",{staticClass:"text-center"},[a("v-btn",{attrs:{color:"success",href:"/create_alert/"}},[t._v(" Create Alert ")])],1),a("v-row",t._l(t.alerts,(function(e){return a("v-col",{key:e.id,attrs:{cols:"12"}},[a("AlertCard",{attrs:{alert:e,alerts:t.alerts}})],1)})),1)],1)],1)],1)},n=[],s=a("bc3a"),o=a.n(s),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-text",[a("a",{attrs:{href:"/update_alert/"+t.alert.id}},[a("h2",[t._v("Alert")])]),a("div",{staticClass:"alert-information"},[a("v-icon",[t._v("mdi-calendar")]),t._v(" "+t._s(t.alert.run_time))],1),a("div",{staticClass:"alert-information"},[a("v-icon",[t._v("mdi-message-bulleted")]),t._v(" "+t._s(t.alert.message))],1),!1===t.alert.group_message?a("div",{staticClass:"alert-information"},[a("v-icon",[t._v("mdi-account-multiple")]),t._v(" All Guest")],1):a("div",{staticClass:"alert-information"},[a("v-icon",[t._v("mdi-account-multiple")]),t._v(" Group Alert")],1),a("div",{staticClass:"alert-information",on:{click:function(e){return t.deleteAlert(t.alert)}}},[a("v-icon",[t._v("mdi-trash-can")]),t._v(" Delete Alert")],1)])],1)},i=[],l=(a("c975"),a("d81d"),a("a434"),{name:"AlertCard",props:{alert:{type:Object},alerts:{type:Array}},methods:{deleteAlert:function(t){var e=this;o.a.delete("http://192.168.50.31:8000/api/v1/alert/?id=".concat(t.id),{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(a){if(204===a.status){var r=e.alerts.map((function(t){return t.id})).indexOf(t.id);e.alerts.splice(r,1),e.message="".concat(t.first_name," information has been deleted!")}else e.message="Sorry, we are having issues deleting ".concat(t.first_name," from your account.")})).catch((function(){e.message="Sorry, we are having issues deleting ".concat(t.first_name," from your account.")}))}}}),u=l,d=(a("1171"),a("2877")),f=a("6544"),m=a.n(f),v=a("b0af"),h=a("99d9"),g=a("132d"),p=Object(d["a"])(u,c,i,!1,null,"31bca834",null),_=p.exports;m()(p,{VCard:v["a"],VCardText:h["b"],VIcon:g["a"]});var A={name:"Alerts",components:{AlertCard:_},data:function(){return{alerts:[],accountId:"",message:""}},methods:{getAccountInformation:function(){var t=this;o.a.get("http://192.168.50.31:8000/api/v1/account/",{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(e){200===e.status?t.accountId=e.data[0].account_id:t.message="Sorry, we are having issues getting your account information."})).catch((function(e){if(e.response){var a="";for(var r in e.response.data)a+=e.response.data[r][0];t.message="".concat(a)}else e.request?t.message="Sorry, the following error occured (".concat(e.request,")."):t.message="Sorry, the following error occured (".concat(e.message,").")}))},getAlertInformation:function(){var t=this;o.a.get("http://192.168.50.31:8000/api/v1/alerts/",{headers:{Authorization:"Token f43c1ce6396e91936da9a7123909d0baf53651f1"}}).then((function(e){200===e.status?t.alerts=e.data:t.message="Sorry, we are having issues getting your account information."})).catch((function(e){if(e.response){var a="";for(var r in e.response.data)a+=e.response.data[r][0];t.message="".concat(a)}else e.request?t.message="Sorry, the following error occured (".concat(e.request,")."):t.message="Sorry, the following error occured (".concat(e.message,").")}))}},mounted:function(){this.getAccountInformation(),this.getAlertInformation()}},b=A,w=(a("121e"),a("8336")),C=a("62ad"),y=a("a523"),k=a("0fd9"),x=Object(d["a"])(b,r,n,!1,null,null,null);e["default"]=x.exports;m()(x,{VBtn:w["a"],VCol:C["a"],VContainer:y["a"],VRow:k["a"]})}}]);
//# sourceMappingURL=chunk-654c95c1.4fa1da48.js.map