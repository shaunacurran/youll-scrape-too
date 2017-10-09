// Include React
var React = require("react");

// Here we include all of the sub-components
var Child = require("./Child");

// Requiring our helper for making API calls
var helpers = require("../utils/helpers");

// Create the Parent Component
var Main = React.createClass(
  {

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return {
      clicks: 0,
      clickID: "Main"
    };
  },

  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    // The moment the page renders on page load, we will retrieve the previous click count.
    // We will then utilize that click count to change the value of the click state.
    helpers.getClicks()
      .then(function(response) {
        // Using a ternary operator we can set newClicks to the number of clicks in our response object
        // If we don't have any clicks in our database, set newClicks to 0
        var newClicks = response.data.length ? response.data[0].clicks : 0;
        this.setState({
          clicks: newClicks
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", newClicks);
      }.bind(this));
  },
  // Whenever our component updates, the code inside componentDidUpdate is run
  componentDidUpdate: function(prevState) {
    console.log("COMPONENT UPDATED");

    // We will check if the click count has changed...
    if (prevState.clicks !== this.state.clicks) {

      // If it does, then update the clickcount in MongoDB
      helpers.saveClicks({ clickID: this.state.clickID, clicks: this.state.clicks })
        .then(function() {
          console.log("Posted to MongoDB");
        });
    }
  },
  // Whenever the button is clicked we'll use setState to add to the clickCounter
  // Note the syntax for setting the state
  handleClick: function() {
    this.setState({ clicks: this.state.clicks + 1 });
  },

  // Whenever the button is clicked we'll use setState to reset the clickCounter
  // This will reset the clicks -- and it will be passed ALL children
  resetClick: function() {
    this.setState({ clicks: 0 });
  },

  // Here we render the function
  render: function() {
    return (

               <div data-reactroot="" className="main-container">
                  <div className="container">
                     <nav className="navbar navbar-default" role="navigation">
                        <div className="container-fluid">
                           <div className="navbar-header"><button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a className="navbar-brand" href="/">Echo</a></div>
                           <div className="collapse navbar-collapse navbar-ex1-collapse">
                              <ul className="nav navbar-nav navbar-right">
                                 <li><a href="/search">Search</a></li>
                                 <li><a href="/saved">Saved Articles</a></li>
                              </ul>
                           </div>
                        </div>
                     </nav>
                     <div className="jumbotron">
                        <h2 className="text-center"><strong>Echo Scraper</strong></h2>
                        <h3 className="text-center">Search for and save articles of interest.</h3>
                     </div>
                     <div className="main-container">
                        <div className="main-container">
                           <div className="row">
                              <div className="col-lg-12">
                                 <div className="panel panel-primary">
                                    <div className="panel-heading">
                                       <h1 className="panel-title">
                                          <strong>
                                             <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                                          </strong>
                                       </h1>
                                    </div>
                                    <div className="panel-body">
                                       <form>
                                          <div className="form-group">
                                             <h4 className=""><strong>Topic</strong></h4>
                                             <input type="text" value="" className="form-control" id="search" required=""/>

                                          </div>

                                       </form>
                                       <div className="pull-right">
                                          <button type="submit" id="submit" className="btn btn-danger">
                                             <h4>Submit</h4>
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <li className="list-group-item">
                           <h3 id="notes"></h3>
                        </li>
                     </div>
                     <footer>
                        <hr/>
                        <p className="pull-right">
                           <i className="fa fa-github" aria-hidden="true"></i>
                        </p>
                     </footer>
                  </div>
               </div>

             );
  }

});


module.exports = Main;
