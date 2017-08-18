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
          <label className="inputTitle" onClick={this.move.bind(this)}>用户名</label>
          <input className="aa" type="text" value={this.props.formData.username}
                 onChange={this.props.onChange.bind(null,'username')}
                 onFocus={this.onInput.bind(this)}
                 onBlur={this.outInput.bind(this)}/>
        </div>
        <div className="row">
          <label className="inputTitle" onClick={this.move.bind(this)}>密码</label>
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
        'top':'12px',
        'font-size':'12px'
        },150)
    }
  }
  outInput(e){
    var _this=e.target
    if($(_this).val()===''){
      $(_this).parent().find('.inputTitle').animate({
         'top':'30px',
         'font-size':'16px'
         },150)
    }
  }

  move(e){    
    console.log(e.button)
    var _this=e.target;
    var input=$(_this).parent().find('input')
    if(input.focus()){return}
  }
}