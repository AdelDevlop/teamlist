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
      ],
      newName: '',
      newProfession: '',
      newImage: '',
      formSubmitted: false,
      errors: [
      ]
    }

    this.handleDeleteCollaborater  = this.handleDeleteCollaborater.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleProfessionChange = this.handleProfessionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAddContClick = this.handleAddContClick.bind(this);
    this.handleReorderList = this.handleReorderList.bind(this);
  }

  handleReorderList() {
    let _ = [].concat(this.state.contributors);
    _.sort((x, y) => {
      if (x.name > y.name) return 1;
      if (x.name < y.name) return -1;
      return 0;
    });
    this.setState({
      contributors: _
    });
  }

  handleNameChange(e){
    this.setState({
      newName: e.target.value
    });
  }
  handleProfessionChange(e) {
    this.setState({
      newProfession: e.target.value
    });
  }
  handleImageChange(e){
    this.setState({
      newImage: e.target.value
    });
  }
  handleAddContClick(e){
    e.preventDefault();
    let n = 0;
    if ( this.state.newName.length < 2 ||  this.state.newName.length > 25) {
      let _ = [...this.state.errors];
      _.push("Name length should be between 2 and 25 characters");
      this.setState({
        errors: _
      });
      n++;
    }
    if ( this.state.newImage.length < 4 ||  this.state.newImage.length > 255) {
      let _ = [...this.state.errors];
      _.push("Image name length should be between 4 and 255 characters without spaces");
      this.setState({
        errors: _
      });
      n++;
    }
    if ( this.state.newProfession.length < 5 ||  this.state.newName.length > 40) {
      let _ = [...this.state.errors];
      _.push("Profession length should be between 5 and 40 characters");
      this.setState({
        errors: _
      });
      n++;
    }

    if (n === 0) {
      let cpy = [...this.state.contributors];
      let o = {
        id: Date.now(),
        name: this.state.newName,
        profession: this.state.newProfession,
        avatar: this.state.newImage
      };
      cpy.push(o);
      this.setState({
        contributors: cpy
      });
      this.setState({
        newName: '',
        newProfession: '',
        newImage: '',
        errors: []
      });
    }
    this.setState({
      formSubmitted: true
    });
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

          <div className="container text-center">
            <button
              onClick={this.handleReorderList}
             className="btn-sm btn-dark">Reorder the team list</button>
          </div>

          <AddForm
            newName={this.state.newName}
            newProfession={this.state.newProfession}
            newImage={this.state.newImage}
            handleAddContClick={this.handleAddContClick}
            handleNameChange={this.handleNameChange}
            handleProfessionChange={this.handleProfessionChange}
            handleImageChange={this.handleImageChange}
            formSubmitted={this.state.formSubmitted}
            errors={this.state.errors}
          />

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

class AddForm extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
        <form>
          <p className="lead text-warning">Add new collaborater</p>
          <div className="form-group">
            <input
            onChange={this.props.handleNameChange}
            value={this.props.newName}
             type="text" className="form-control" placeholder="Name" />            
          </div>
          <div className="form-group">
            <input
            onChange={this.props.handleProfessionChange}
            value={this.props.newProfession} type="text" className="form-control" placeholder="Profession" />
          </div>
          <div className="form-group">
            <input
            onChange={this.props.handleImageChange}
            value={this.props.newImage} type="text" className="form-control" placeholder="Image name. Ex : adel.png" />
            <p className="text-muted small">Please note : It is assumed that employee images are stored on "https://welovedevs.com/images/"</p>
          </div>
          <div>
            <button 
            onClick={this.props.handleAddContClick}
            className="btn btn-outline-dark">Add</button>
          </div>
          <div className={"alert alert-warning mt-2 " + (( this.props.formSubmitted && this.props.errors.length > 0) ? " " : "d-none") } role="alert">
            <span>Please correct the following errors to continue :</span>
            <ul>
              {
                this.props.errors.map(error => {
                  return (
                      <li key={error}>{error}</li>
                    )
                })
              }
            </ul>
          </div>
        </form>

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
