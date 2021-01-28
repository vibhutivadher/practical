import React, {Component} from 'react'; 
import './App.css';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        dropItem:[],
        data:[
          {
            id:1,
            label:"Bathroom floor"
          },
          {
            id:2,
            label:"Full window clean"
          },
          {
            id:3,
            label:"Lounge chairs"
          },
          {
            id:4,
            label:"Dining room chairs"
          },
          {
            id:5,
            label:"High level cleaning"
          },
          {
            id:6,
            label:"Vacant room clean"
          },
          {
            id:7,
            label:"Carpet steam cleanning"
          },
          {
            id:8,
            label:"Celling fans cleanning"
          },
          {
            id:9,
            label:"Floor scrubbing"
          },
          {
            id:10,
            label:"Coutryard"
          },
        ],
        sections:[
          {
            id:1,
            label:"yearly"
          },
          {
            id:2,
            label:"half yearly"
          },
          {
            id:3,
            label:"3 times a year"
          },
          {
            id:4,
            label:"quarterly"
          },
          {
            id:5,
            label:"6 times a year"
          },
          {
            id:6,
            label:"as required"
          },
          {
            id:7,
            label:"hallways on rotation"
          },
          {
            id:8,
            label:"na"
          }
        ]
      }
   }
  drag = (ev,label_key) => {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("===>drag",ev.target.id)
  }
  drop = (ev,block_id) => {
    ev.preventDefault();
    var draggable_id = ev.dataTransfer.getData("text");
    var dragableDivArr = draggable_id.split("-");
    var lable_id= parseInt(dragableDivArr[1],10)
    console.log("block_id",block_id)
    if(dragableDivArr[0]==="block"){
      let dropItem = this.state.dropItem.filter((task) => {  
         if (task.block === lable_id && task.id === parseInt(dragableDivArr[2],10)) {
           task.block = block_id;                
         }
         return task;
      });
      this.setState({...this.state,dropItem});
    }else{
      let dropItem = this.state.data.filter(val => val.id === lable_id)
      var extractData = dropItem[0]
      extractData['block']=block_id
      // Update the arry
      var newArr = this.state.dropItem
      newArr.push(extractData)
      console.log("newArr",newArr)
      //Remove the item from the existing array
      let data = this.state.data.filter(val => val.id !== lable_id)
      this.setState({dropItem:newArr,data:data});
    }
    
  }
  allowDrop = (ev) => {
      ev.preventDefault();
  }
  render() {
    const {data,sections,dropItem} = this.state
    console.log("===>dropItem render",dropItem)
    return (
      <div className="App">
        <div className="top-block">
            <div className="title">
              Periodicals
            </div>
            <div className="periodicals-block">
            {
              data.map((value,label_key)=>
                <div className="label-block"
                      key={label_key}
                      draggable="true"
                      id={"label-"+value.id}
                      onDragStart={(e)=>this.drag(e,label_key)}
                >
                {value.label}
                </div>
              )
            }
            </div>
        </div>
        <div className="bottom-block">
           <div className="title">
            Frequency
          </div>
          {
            sections.map((value,block_id)=>
              <div className={"dropable-container "+value.id} key={block_id}>
                <div className="title">
                  {value.label}
                </div>
                  <div className="drop-here"
                    onDrop={(e)=>this.drop(e,value.id)}  
                    onDragOver={this.allowDrop} 
                    id={"block-"+value.id}
                  >
                    {
                      this.state.dropItem.length > 0 &&
                      this.state.dropItem.map((data,label_key)=>
                        <React.Fragment key={label_key}>
                          {
                              data.block === value.id &&
                                <div className="label-block"
                                    key={label_key}
                                    draggable="true"
                                    id={"block-"+data.block+"-"+data.id}
                                    onDragStart={(e)=>this.drag(e,label_key)}
                                >
                                    {data.label}
                                </div>
                          }
                        </React.Fragment>
                      )
                    }
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default App;
