import React from "react";
class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            status:this.props.status,
            name:this.props.name
        };
      }

    changeStatus(){
        this.setState({
            status:'success',
            isEdit:false
        });
        let activityData = JSON.parse(localStorage.getItem(this.props.storageKey));
        activityData.forEach(activity => {
            if (activity.id === this.props.id) {
                activity.status = 'success';
            }
        });
        localStorage.setItem(this.props.storageKey, JSON.stringify(activityData));
    }

    delete(){
        this.setState({
            status:'remove',
            isEdit:false
        });
        let activityData = JSON.parse(localStorage.getItem(this.props.storageKey));
        activityData.forEach(activity => {
            if (activity.id === this.props.id) {
                activity.status = 'remove';
            }
        });
        localStorage.setItem(this.props.storageKey, JSON.stringify(activityData));
    }

    edit(){
        if(this.state.isEdit){
            this.setState({
                isEdit:false
            });
        }else{
            this.setState({
                isEdit:true
            });
        }
        
    }

    handleNameChange(event){
        const name = event.target.value;
        this.setState({
            name:name,
        });
        
    }    

    handleOnClick(e){
        e.preventDefault();
        
        let activityData = JSON.parse(localStorage.getItem(this.props.storageKey));
        activityData.forEach(activity => {
            if (activity.id === this.props.id) {
                activity.name = this.state.name;
            }
        });
        localStorage.setItem(this.props.storageKey, JSON.stringify(activityData));
        this.setState({
            isEdit:false,
        });
    }

    render() {
        let abu;
        let activity;
        let button;

        if(this.state.isEdit){
            activity = (
                    <form onSubmit={(e)=>{this.handleOnClick(e)}} >
                        <div className="w-full flex border border-gray-400 rounded-full mx-auto py-3">
                            <input name="title" defaultValue={this.state.name} onChange={(event) => {this.handleNameChange(event)}} className="my-auto ml-6 w-full flex-1 text-lg text-white border-none outline-none bg-transparent h-full "/>
                            <button type="submit" className="cursor-pointer flex mr-3 h-full rounded-full bg-green-400 hover:bg-green-300 p-2 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </form>
            );
            
        }else{
            activity = (
                <span>{this.state.name}</span>
            );
            button = (
                <div className="flex">
                    <div className="cursor-pointer" onClick={()=>this.edit()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-400 hover:text-green-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>

                    <div className="mx-5 cursor-pointer" onClick={()=>this.delete()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-red-400 hover:text-red-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                    
            );
        }
        
        if (this.state.status === "success") {
            abu = (
                <div className="flex border border-green-400 rounded-3xl my-5 mx-auto py-3">
                    <div className="flex mx-5">
                        <div className="w-5"></div>
                    </div>
                    <div className='flex flex-1 text-left text-green-400'>
                    {this.props.name}
                        <svg xmlns="http://www.w3.org/2000/svg" className=" mx-3 text-green-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                </div>
            );
        }else if(this.state.status === "pending") {
            abu = (
                <div className="flex border border-yellow-400 rounded-3xl my-5 mx-auto py-3">
                    <div className="flex mx-5 cursor-pointer" onClick={()=>this.changeStatus()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className='flex-1 text-left text-yellow-400'>
                    {activity}
                    </div>
                    {button}
                </div>
            );
        }else if(this.state.status === "remove") {
            abu = (
                <div className="flex border border-gray-400 rounded-3xl my-5 mx-auto py-3">
                    <div className="flex mx-5">
                        <div className="w-5"></div>
                    </div>
                    <div className='flex-1 text-left line-through text-gray-400'>{this.props.name}</div>
                    
                </div>
            );
        }
        return (
            <div>
                {abu}
            </div>
        );
    }
}

export default Activity;