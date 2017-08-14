import React, {Component} from 'react';
import Retreat from './img/retreat.svg'
import ForgotPasswordFormStyle from './ForgotPasswordForm.css'

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
                        <input type="text" value={this.props.formData.email}
                                onChange={this.props.onChange.bind(null, 'email')}/>
                    </div>
                    <div className="row actions">
                        <button className="Button" type="submit">发送</button>
                    </div>
                </form>
            </div>
        )
    }
}