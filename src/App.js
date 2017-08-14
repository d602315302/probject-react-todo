import React, { Component } from 'react';
import './App.css';
import Exit from './img/exit.svg'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:getCurrentUser()||{},
      newTodo:'',
      todoList:[]
    }
    let user=getCurrentUser()
    if(user){
      TodoModel.getByUser(user,(todos)=>{
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList=todos
        this.setState(stateCopy)
      })
    }
  }
  render() {
    let todos=this.state.todoList.filter((item)=>!item.deleted).map((item,index)=>{
      return(
        <li key={index}>
          <TodoItem todo={item}
                    onDelete={this.delete.bind(this)}
                    onToggle={this.toggle.bind(this)}/>
        </li>
      )
    })
    return (
      <div className="App">
        <div className="App-wrapper">
          <header className="App-header">
          <h1>添写你的备忘录</h1>
          <p>用心完成每一件小事...</p>
          <p className="username"><span>欢迎，</span> {this.state.user.username}
            {this.state.user.id ? <img className="exit" src={Exit} onClick={this.signOut.bind(this)}/> : null}
          </p>
        </header>
        <section className="App-content">
          <div className="content">
            <TodoInput content={this.state.newTodo}
                     onChange={this.changeTitle.bind(this)}
                     onSubmit={this.addTodo.bind(this)}/>
          </div>
          <ol className="todos">
              {todos}
          </ol>
        </section>
        </div>
        {this.state.user.id ? 
          null :
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    );
  }

  signOut(){
    signOut()
    let stateCopy= JSON.parse(JSON.stringify(this.state))
    stateCopy.user={}
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }

  toggle(e,todo){
    let oldStatus=todo.status
    todo.status=todo.status==='completed' ? '' : 'completed'
    TodoModel.update(todo,()=>{
      this.setState(this.state)
    },(error)=>{
      todo.status=oldStatus
      this.setState(this.state)
    })
  }
  delete(event,todo){
    TodoModel.destroy(todo.id,()=>{
      todo.deleted=true
      this.setState(this.state)
    })
  }
  changeTitle(event){
    this.setState({
      newTodo:event.target.value,
      todoList:this.state.todoList
    })
  }
  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;
