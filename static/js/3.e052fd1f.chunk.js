(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{291:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a(34),r=a(35),l=a(38),o=a(37),i=a(10),c=a(0),u=a.n(c),s=a(16),m=function(e){var t=function(t){Object(l.a)(c,t);var a=Object(o.a)(c);function c(){return Object(n.a)(this,c),a.apply(this,arguments)}return Object(r.a)(c,[{key:"render",value:function(){return this.props.isAuth?u.a.createElement(e,this.props):u.a.createElement(i.a,{to:"/login"})}}]),c}(u.a.Component);return Object(s.b)((function(e){return{isAuth:e.authReducer.isAuth}}),{})(t)}},292:function(e,t,a){},293:function(e,t,a){e.exports={profileImage:"ProfileInfo_profileImage__Z8WVx",mainPhoto:"ProfileInfo_mainPhoto__22hmD"}},294:function(e,t,a){e.exports={item:"Post_item__AsE_b"}},295:function(e,t,a){"use strict";a.r(t);var n=a(34),r=a(35),l=a(38),o=a(37),i=a(0),c=a.n(i),u=(a(292),a(94)),s=a(293),m=a.n(s),p=a(47),f=function(e){var t=Object(i.useState)(!1),a=Object(u.a)(t,2),n=a[0],r=a[1],l=Object(i.useState)(e.profileStatus),o=Object(u.a)(l,2),s=o[0],m=o[1];Object(i.useEffect)((function(){m(e.profileStatus)}),[e.profileStatus]);return c.a.createElement("div",null,!n&&c.a.createElement("div",null,c.a.createElement("span",{onDoubleClick:function(){r(!0)}},"Status: ",e.profileStatus||"-------")),n&&c.a.createElement("div",null,c.a.createElement("input",{autoFocus:!0,onBlur:function(){return e.updateUserStatus(s),void r(!1)},value:s,onChange:function(e){var t=e.target.value;m(t)},type:"text"})))},d=a(105),b=a.n(d),E=function(e){return c.a.createElement("div",{style:{marginLeft:"20px"}},c.a.createElement("b",null,e.contactTitle),": ",e.contactValue)},h=function(e){return c.a.createElement("div",null,c.a.createElement("p",null,"Name: ",e.profile.fullName),c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("b",null,"Looking for a job:")," ",e.profile.lookingForAJob?"yes":"nope"," "),c.a.createElement("div",null,c.a.createElement("b",null,"My professional skills:")," ",e.profile.lookingForAJobDescription),c.a.createElement("div",null,c.a.createElement("b",null,"About me:"),e.profile.aboutMe)),c.a.createElement("div",null,c.a.createElement("b",null,"Contacts:")," ",Object.keys(e.profile.contacts).map((function(t,a){return c.a.createElement(E,{key:t,contactTitle:t,contactValue:e.profile.contacts[t]})}))),e.isOwner&&c.a.createElement("button",{onClick:function(){return e.changeEditMode(!0)}},"edit"))},v=a(7),O=a(127),g=a(128),j=a(55),P=a(45),S=a(48),k=a.n(S),y=Object(v.d)(Object(g.a)({form:"edit-profile"}))((function(e){return c.a.createElement("form",{onSubmit:e.handleSubmit},e.error&&c.a.createElement("div",{className:k.a.formSummaryError},e.error),c.a.createElement("p",null,"Name:")," ",c.a.createElement(O.a,{name:"fullName",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f",component:j.a,validate:[P.b]}),c.a.createElement("div",null,c.a.createElement("div",null,c.a.createElement("b",null,"Looking for a job:")," ",c.a.createElement(O.a,{name:"lookingForAJob",component:j.a,type:"checkbox"})),c.a.createElement("div",null,c.a.createElement("b",null,"My professional skills:")," ",c.a.createElement(O.a,{name:"lookingForAJobDescription",placeholder:"\u0412\u0430\u0448\u0438 \u043d\u0430\u0432\u044b\u043a\u0438",component:j.b})),c.a.createElement("div",null,c.a.createElement("b",null,"About me:"),c.a.createElement(O.a,{name:"aboutMe",placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0442\u0435\u043a\u0441\u0442 \u043e \u0432\u0430\u0441",component:j.b}))),c.a.createElement("div",null,c.a.createElement("b",null,"Contacts:")," ",Object.keys(e.profile.contacts).map((function(e,t){return c.a.createElement("div",{style:{marginLeft:"20px"},key:t},c.a.createElement("b",null,e)," ",c.a.createElement(O.a,{placeholder:e,name:"contacts.".concat(e),component:j.a}))}))),c.a.createElement("button",null,"save"),c.a.createElement("button",{type:"button",onClick:function(){return e.changeEditMode(!1)}},"close"))})),A=function(e){var t=Object(i.useState)(!1),a=Object(u.a)(t,2),n=a[0],r=a[1];if(!e.profile)return c.a.createElement(p.a,null);return c.a.createElement("div",null,c.a.createElement("img",{className:m.a.profileImage,src:"https://process.images.nathab.com/A6dTpd53SmIg0pBfJJhgAz/resize=width:864/quality=value:60/cache=expiry:31536000/compress/https://www.nathab.com/uploaded-files/carousels/HERO/South-America/83-ALT.jpg",alt:"IMG"}),c.a.createElement("img",{src:e.profile.photos.small||b.a,alt:"photo",className:m.a.mainPhoto}),e.isOwner&&c.a.createElement("input",{type:"file",onChange:function(t){t.target.files.length&&e.savePhoto(t.target.files[0])}}),n?c.a.createElement(y,{initialValues:e.profile,profile:e.profile,isOwner:e.isOwner,changeEditMode:r,onSubmit:function(t){e.saveProfile(t)}}):c.a.createElement(h,{profile:e.profile,isOwner:e.isOwner,changeEditMode:r}),c.a.createElement(f,{profileStatus:e.profileStatus,updateUserStatus:e.updateUserStatus}))},w=a(93),I=a(16),M=a(294),U=a.n(M);var x=function(e){return c.a.createElement("div",{className:U.a.item},c.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsLfGk8cfZYn-FlJfh4I9rPP656klMZAF6Og&usqp=CAU",alt:"avatar"}),c.a.createElement("span",null,e.message),c.a.createElement("div",null,c.a.createElement("span",null,"Like - ",e.like)))},C=Object(P.a)(1e3),_=Object(v.d)(Object(g.a)({form:"addPost"}))((function(e){return c.a.createElement("form",{onSubmit:e.handleSubmit},c.a.createElement("div",null,c.a.createElement(O.a,{name:"newPostText",placeholder:"Enter your post",component:j.b,validate:[C,P.b]})),c.a.createElement("div",null,c.a.createElement("button",null,"Add post")))})),D=Object(I.b)((function(e){return{postsData:e.profilePage.postData}}),(function(e){return{addPost:function(t){var a=Object(w.a)(t);e(a)}}}))((function(e){var t=e.postsData.map((function(e,t){return c.a.createElement(x,{message:e.message,like:e.likes,key:t})}));return c.a.createElement("div",null,"My posts",c.a.createElement(_,{onSubmit:function(t){e.addPost(t.newPostText)}}),t)}));var J=function(e){return c.a.createElement("div",null,c.a.createElement(A,{profile:e.profile,profileStatus:e.profileStatus,updateUserStatus:e.updateUserStatus,isOwner:e.isOwner,savePhoto:e.savePhoto,saveProfile:e.saveProfile}),c.a.createElement(D,null))},N=a(10),F=a(291),L=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"refreshProfile",value:function(){var e=this.props.match.params.userId;e||(e=this.props.authorizedUserId),this.props.setProfile(e),this.props.getUserStatus(e)}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,t,a){this.props.match.params.userId!=e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(J,Object.assign({},this.props,{profile:this.props.profile,isOwner:!this.props.match.params.userId,savePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile})))}}]),a}(i.Component);t.default=Object(v.d)(Object(I.b)((function(e){return{profile:e.profilePage.profile,profileStatus:e.profilePage.profileStatus,authorizedUserId:e.authReducer.id,isAuth:e.authReducer.isAuth}}),(function(e){return{setProfile:function(t){e(Object(w.f)(t))},getUserStatus:function(t){e(Object(w.c)(t))},updateUserStatus:function(t){e(Object(w.g)(t))},savePhoto:function(t){e(Object(w.d)(t))},saveProfile:function(t){e(Object(w.e)(t))}}})),N.f,F.a)(L)}}]);
//# sourceMappingURL=3.e052fd1f.chunk.js.map