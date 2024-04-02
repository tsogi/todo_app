({156:function(){var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function c(e){try{u(r.next(e))}catch(e){i(e)}}function a(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}u((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(c=0)),c;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,r=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!((o=(o=c.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};!function(){e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,i()];case 1:return e.sent(),[2]}}))}))}();var n=0;function r(){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,fetch("https://app-servers.io/api/todos")];case 1:return[4,e.sent().json()];case 2:return[2,e.sent()]}}))}))}function o(n){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,fetch("https://app-servers.io/api/todos/add",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:n})})];case 1:return e.sent(),[2]}}))}))}function i(){return e(this,void 0,void 0,(function(){return t(this,(function(o){switch(o.label){case 0:return[4,r()];case 1:return function(r){var o=document.querySelector(".todoList");o.innerHTML="",r.forEach((function(r){if(!r.completed){var c=document.createElement("div");c.className="todoItem";var a=document.createElement("div");a.className="todoCheckbox";var u=document.createElement("input");u.type="checkbox",u.checked=r.completed,u.dataset.todoid=r.id,u.addEventListener("click",(function(){return function(n){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return e=document.querySelector('[data-todoid="'.concat(n,'"]')).checked,[4,fetch("https://app-servers.io/api/todos/edit/".concat(n),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({completed:e})})];case 1:return t.sent(),[4,i()];case 2:return t.sent(),[2]}}))}))}(r.id)})),a.appendChild(u);var s=document.createElement("div");s.className="todoName",s.textContent=r.task;var d=document.createElement("div");d.className="actions";var l=document.createElement("span");l.className="btnEdit",l.textContent="Edit",l.addEventListener("click",(function(){return function(r,o){return e(this,void 0,void 0,(function(){return t(this,(function(e){return n=o,document.querySelector(".textInput").value=r,[2]}))}))}(r.task,r.id)}));var h=document.createElement("span");h.className="btnDelete",h.textContent="Delete",h.addEventListener("click",(function(){return function(n){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,fetch("https://app-servers.io/api/todos/delete/".concat(n),{method:"POST"})];case 1:return e.sent(),[4,i()];case 2:return e.sent(),[2]}}))}))}(r.id)})),d.appendChild(l),d.appendChild(h),c.appendChild(a),c.appendChild(s),c.appendChild(d),o.appendChild(c)}}));var c,a=function(e){for(var t=0,n=0;n<e.length;n++)e[n].completed||t++;return t}(r);c=a,document.querySelector(".todosCount").innerHTML=c}(o.sent()),[2]}}))}))}document.querySelector(".submitBtn").addEventListener("click",(function(){var r=document.querySelector(".textInput").value;r.length<5||r.length>30?alert("Task name should be between 5 and 30 letters - Edited by New Developer"):0!==n?function(){e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return e=document.querySelector(".textInput").value,[4,fetch("https://app-servers.io/api/todos/edit/".concat(n),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:e})})];case 1:return t.sent(),[4,i()];case 2:return t.sent(),document.querySelector(".textInput").value="",n=0,[2]}}))}))}():function(){e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,o(document.querySelector(".textInput").value)];case 1:return e.sent(),[4,i()];case 2:return e.sent(),[2]}}))}))}()}))}})[156]();