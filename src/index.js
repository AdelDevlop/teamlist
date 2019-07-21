import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Index extends Component {
  constructor(){
    super();
    this.state = {
      contributors : [
        {
          id : 1,
          name : "Damien Cavaillès",
          profession : "Co-founder",
          avatar : "damien.jpg"
        },
        {
          id: 2,
          name : "Vincent Cotro",
          profession : "Co-founder",
          avatar : "vincent.jpg"
        },
        {
          id: 3,
          name : "Thomas Grivet",
          profession : "React developer",
          avatar : "thomas.jpg"
        },
        {
          i: 4,
          name : "Martin Lutton",
          profession : "Recruiter",
          avatar : "martin.jpg"
        },
        {
          id: 5,
          name : "Alexis Camus",
          profession : "Customer success",
          avatar : "alexis.png"
        },
        {
          id: 6,
          name : "Nicolas Detrez",
          profession : "Content Specialist",
          avatar : "nicolas.jpg"
        },
        {
          id: 7,
          name : "Clément Devos",
          profession : "JS Developer",
          avatar : "clement.png"
        },
        {
          id: 8,
          name : "Quentin Tournier",
          profession : "React developer",
          avatar : "quentin.png"
        },
        {
          id: 9,
          name : "Pierre Willame",
          profession : "Customer success",
          avatar : "pierre.png"
        },
        {
          id: 10,
          name : "Alexandre Brisbout",
          profession : "Customer success",
          avatar : "alexandre.png"
        }
      ]
    }

    this.handleDeleteCollaborater  = this.handleDeleteCollaborater.bind(this);
  }
  handleDeleteCollaborater(id) {
    let cpy = this.state.contributors.filter(c => {
      return c.id !== id
    });

    this.setState({
      contributors: cpy
    });
  }

  render () {
    return ( 
      <div className="container">
        <div className="container-fluid pt-3">
          <h1 className="lead text-info">WeLoveDevs.com</h1>
          <p className=" pb-4 small text-muted">Meet the team</p>

          

          <hr />
        </div>
        <div className="container-fluid mt-2">
          <TeamList
            contributors={this.state.contributors}
            handleDeleteCollaborater={this.handleDeleteCollaborater}
          />
        </div>
      </div>
    )
  }
}


class TeamList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      this.props.contributors.length > 0 ? (
        <div className="row pb-4">
          {
            this.props.contributors.map(collaborater => 
               (
                  <div key={collaborater.id} className="col-4 mt-2">
                    <div className="card">
                        <img src={"https://welovedevs.com/images/" + collaborater.avatar} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{ collaborater.name }</h5>
                          <p className="card-text text-muted">
                            { collaborater.profession }
                          </p>
                          <button
                            onClick={() => {
                              this.props.handleDeleteCollaborater( collaborater.id )
                            }}
                           className="btn-sm btn-danger">Delete</button>
                        </div>
                      </div>
                  </div>
              )
            )
          }
        </div>
      )
      : (
        <div className="text-center alert alert-light mt-2" role="alert">The list is empty ... Please add your contributors</div>
      )

    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
