import React from 'react';
import $ from 'jquery'
import Retreat from './img/retreat.svg'

export default class SignUpForm extends React.Component{
  render(){
    return (
    <form className="signUp" onSubmit={this.props.onSubmit}> {/* 注册*/}
      <img src={Retreat} onClick={this.props.switchSignIn}/>
      <div className="row">
        <label className="inputTitle" onClick={this.move.bind(this)}>邮箱</label>
        <input type="text" value={this.props.formData.email}
                onChange={this.props.onChange.bind(null, 'email')}
                onFocus={this.onInput.bind(this)}
                onBlur={this.outInput.bind(this)}/>
      </div>
      <div className="row">
        <label className="inputTitle" onClick={this.move.bind(this)}>用户名</label>
        <input type="text" value={this.props.formData.username}
                 onChange={this.props.onChange.bind(null, 'username')}
                 onFocus={this.onInput.bind(this)}
                 onBlur={this.outInput.bind(this)}/>
        {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
      </div>
      <div className="row">
        <label className="inputTitle" onClick={this.move.bind(this)}>密码</label>
        <input type="password" value={this.props.formData.password}
                 onChange={this.props.onChange.bind(null, 'password')}
                 onFocus={this.onInput.bind(this)}
                 onBlur={this.outInput.bind(this)}/>
      </div>
      <div className="row signActions">
        <button className="Button" type="submit">注册</button>
      </div>
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
    var _this=e.target;
    var input=$(_this).parent().find('input')
    if(input.focus()){return}
  }
}