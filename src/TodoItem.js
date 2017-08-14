import React,{components} from 'react'
import './TodoItem.css'
import deleteLogo from './img/delete.svg'

export default class TodoItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            date:new Date(),
        }
    }
    render(){
        return(
            <div className="TodoItem">
                <input type = "checkbox" checked = {this.props.todo.status === 'completed'}
                       onChange={this.toggle.bind(this)}/>
                <span>{this.props.todo.title}</span>
                <img src={deleteLogo} onClick={this.delete.bind(this)}/>
                <span className="date">{this.state.date.toLocaleDateString()}</span>
            </div>
        )
    }
    delete(e){
        this.props.onDelete(e,this.props.todo)
    }

    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
}