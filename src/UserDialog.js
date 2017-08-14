import React, { Component } from 'react';
import './UserDialog.css'
import TodoLogo from './img/todo-logo.svg'
import $ from 'jquery'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPasswordForm'
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'

export default class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state={
      selectedTab:'signInOrSignUp',
      formData:{
        email:'',
        username:'',
        password:'',
      }
    }
  }

  signUp(e){
    e.preventDefault()
    let {email,username, password} = this.state.formData
    if(!this.checkInfo.call(this,email,username,password)){
      return
    }
    let success = (user)=>{
      this.props.onSignUp.call(null, user)
    }
    let error = (error)=>{
      switch(error.code){
        case 202:
          alert('用户名已被占用')
          break
        case 200: 
          alert('用户名不能为空')
          break
        case 201:
          alert('密码不能为空')
          break
        case 203:
          alert('电子邮箱地址已经被占用')
          break
        case 204:
          alert('没有提供电子邮箱地址')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email,username, password, success, error)
  }

  signIn(e){
    e.preventDefault()
    let {username,password}=this.state.formData
    let success=(user)=>{
      this.props.onSignIn.call(null,user)
    }
    let error = (error)=>{
      switch(error.code){
        case 210:
          alert('用户名与密码不匹配')
          break
        case 211:
        alert('用户名不存在')
        default:
          alert(error)
          break
      }
    }
    signIn(username,password,success,error)
  }

  checkInfo(email, username, password){
        let regEmail = /\w+@/
        let regUsername = /\w{3,}/
        let regPassWord = /.{6,}/

        if(!regEmail.test(email)){
            alert('邮箱必须包含@')
            return false
        }else if (!regUsername.test(username)){
            alert('用户名不能少于三位')
            return false
        }else if(!regPassWord.test(password)){
            alert('密码不能少于六位')
            return false
        }
        return true
    }

  changeFormData(key,e){
      let stateCopy=JSON.parse(JSON.stringify(this.state))
      stateCopy.formData[key]=e.target.value
      this.setState(stateCopy)
  }

  showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab='forgotpassword'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
  returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }

  render(){
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <div className="border"></div>
          <div className="logo">
            <img src={TodoLogo}/>
            <h4>To Do</h4>
          </div>
          {
            this.state.selectedTab === 'signInOrSignUp' ?
              <SignInOrSignUp
                formData={this.state.formData}
                onSignIn={this.signIn.bind(this)}
                onSignUp={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}
              /> :
              <ForgotPasswordForm
                formData={this.state.formData}
                onSubmit={this.resetPassword.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onSignIn={this.returnToSignIn.bind(this)}
              />
          }
        </div>
        </div>
    )
  }
}