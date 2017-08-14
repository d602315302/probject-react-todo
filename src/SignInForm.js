import React from 'react';
import $ from 'jquery'
export default class SignInForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      submit:'{this.props.onSubmit}'
    }
  }
  render(){
    return (
      <form className="signIn" onSubmit={this.props.onSubmit} > {/* 登录*/}
        <div className="row">
          <label className="inputTitle">用户名</label>
          <input type="text" value={this.props.formData.username}
                 onChange={this.props.onChange.bind(null,'username')}
                 onFocus={this.onInput.bind(this)}
                 onBlur={this.outInput.bind(this)}/>
        </div>
        <div className="row">
          <label className="inputTitle">密码</label>
          <input type="password" value={this.props.formData.password}
                 onChange={this.props.onChange.bind(null,'password')}
                 onFocus={this.onInput.bind(this)}
                 onBlur={this.outInput.bind(this)}/>
        </div>
        <a className="forgot" href="#" onClick={this.props.onForgotPassword}>忘记密码了?</a>
        <div className="row actions">
          <button className="Button" type="submit"
                   >登录</button> 
        </div>
        <p className="login">还没有账户？<a href="#" onClick={this.props.switchSignUp}>注册</a></p>
    </form>
  )
  }
onInput(e){
 var _this=e.target
  if(_this.value === ''){
      $(_this).parent().find('.inputTitle').animate({
        'top':'15px',
        'font-size':'12px',
        },500)
      $(_this).animate({
        'border-bottom':'3px solid #ccc'
      },1000)
    }
  }
  outInput(e){
    var _this=e.target
    if(_this.value!==''){
      $(_this).parent().find('.inputTitle').animate({
        'top':'15px',
        'font-size':'12px',
        },500)
    }else{
      $(_this).parent().find('.inputTitle').animate({
        'top':'30px',
        'font-size':'16px',
        },500)
    }
  }
// submit(e){
//   var _this=e.target
//   let stateCopy=JSON.parse(JSON.stringify(this.state))
//   $(_this).text('')
//   $(_this).animate({
//     'background':'transparent',
//     'width':'30px'
//   },200,function(){
//     $('.signIn').attr('onSubmit',stateCopy.submit)
//   })
// }
}