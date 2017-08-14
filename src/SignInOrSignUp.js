import React, {Component} from 'react';
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default class SignInOrSignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            selected:'signIn'
        }
    }
    switchSignUp(){
        this.setState({
        selected:'signUp'
        })
    }
    switchSignIn(){
        this.setState({
        selected:'signIn'
        })
    }
    render(){
        return(
            <div className="signInOrSignUp">
                <div className="panes">
                    {this.state.selected === 'signUp' ? 
                    <SignUpForm formData={this.props.formData}
                        onSubmit={this.props.onSignUp}
                        onChange={this.props.onChange}
                        switchSignIn={this.switchSignIn.bind(this)}/> 
                    : null}
                    {this.state.selected === 'signIn' ? 
                    <SignInForm formData={this.props.formData}
                        onSubmit={this.props.onSignIn}
                        onChange={this.props.onChange}
                        onForgotPassword={this.props.onForgotPassword.bind(this)}
                        switchSignUp={this.switchSignUp.bind(this)}
                        onForgotPassword={this.props.onForgotPassword}/> 
                    : null}
                </div>
            </div>
        )
    }
}