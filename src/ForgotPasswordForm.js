import React, {Component} from 'react';
import Retreat from './img/retreat.svg'
import ForgotPasswordFormStyle from './ForgotPasswordForm.css'
import $ from 'jquery'

export default class ForgotPasswordForm extends Component {
    render(){
        return(
            <div className="forgotPassword">
                <img src={Retreat} onClick={this.props.onSignIn}/>
                <h3>
                    重置密码
                </h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
                    <div className="row">
                        <label>邮箱</label>
                        <input className="email" type="text" value={this.props.formData.email}
                                onChange={this.props.onChange.bind(null, 'email')}/>
                    </div>
                    <div className="row actions">
                        <button onClick={this.isOk.bind(this)}className="Button" type="submit">发送</button>
                    </div>
                </form>
            </div>
        )
    }
    isOk(){
        var input=document.getElementsByClassName('email')
        let regEmail = /\w+@/
        if($(input).val() ===''){
            alert('请填写邮箱再发送')
        }else if($(input).val()!=='' && !regEmail.test()){
            alert('邮箱格式不正确')
        }
        else {
            alert('发送成功，请查看邮箱')
        }
    }
}