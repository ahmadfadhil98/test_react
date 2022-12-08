import React from "react";
import logo from '../logo.svg';
import '../App.css';
import Activity from '../component/Activity';
import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            activity:'',
            isNameError:false,
        };
    }

    handleNameChange(event){
        const name = event.target.value;
        this.setState({
            name:name,
            isNameError:false,
            activity:{
                id : new Date().getTime(),
                name:name,
                status:'pending'
            }
        });
        
    }    

    handleOnClick(e){
        e.preventDefault();
        if(this.state.name===''){
            this.setState({
                isNameError:true
            });
        }else{
            this.setState({
                name:'',
            });
            this.putActivityList(this.state.activity);
            
        }
    }

    putActivityList(data) {
        if (this.checkForStorage()) {
            let activityData = [];
            if (localStorage.getItem(this.props.storageKey) !== null) {
                activityData = JSON.parse(localStorage.getItem(this.props.storageKey));
            }
            activityData.unshift(data);
            localStorage.setItem(this.props.storageKey, JSON.stringify(activityData));
        }
    }

    checkForStorage() {
        return typeof (Storage) !== 'undefined';
    }

    getActivityList() {
        if (this.checkForStorage()) {
            return JSON.parse(localStorage.getItem(this.props.storageKey)) || [];
        } else {
            return [];
        }
    }

    destroy(){
        this.setState({
            activityList:[]
        });

        return localStorage.removeItem(this.props.storageKey);
    }
    
    render(){
        let errorName;
        let activityList = this.getActivityList();
        let page;
        if(this.state.isNameError){
            errorName = (
                <div className="text-red-400 text-left mx-7 mt-2"> Please input your activity! </div>
            );
        }
        console.log(activityList);
        if(!activityList==[]){
            
            page = (
                    <div className="">
                            {activityList.slice(0).reverse().map((activity,index) => {
                            return (
                                <Activity 
                                key={index}
                                name={activity.name}
                                status={activity.status}
                                id = {activity.id}
                                checkForStorage={this.checkForStorage}
                                getActivityList={this.getActivityList}
                                storageKey={this.props.storageKey}
                                />
                            )
                            })}
                        </div>
            );
        }
        return(
            <div className="App h-full min-h-screen text-white font-mono">
                <header className="justify-center text-center">
                    <img src={logo} className="App-logo text-center mx-auto" alt="logo"/>
                    <h1 className='text-2xl md:text-4xl '>Welcome in <span className='text-blue-300'>TO DO LIST APP</span></h1>
                </header>
                <div className="lg:w-1/2 w-auto mx-5 lg:mx-auto pb-16">
                    <form onSubmit={(e)=>{this.handleOnClick(e)}} >
                        <div className="w-full flex h-full border border-gray-400 rounded-full mt-5 mx-auto py-3">
                            <input value={this.state.name} className="my-auto ml-6 w-full flex-1 text-lg text-white border-none outline-none bg-transparent h-full " onChange={(event) => {this.handleNameChange(event)}} placeholder="What will you do?"/>
                            <button type="submit" className="cursor-pointer flex h-full rounded-full bg-green-400 hover:bg-green-300 p-2 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                            <button type="button" className="cursor-pointer flex h-full mx-3 rounded-full my-auto bg-red-400 hover:bg-red-300 p-2 text-black" onClick={()=>{this.destroy()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        {errorName}                        
                    </form>
                        {page}
                        
                </div>
            </div>
        );
    }
}

export default Todo;