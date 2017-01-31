const { play } = require("rps")
const React = require("react")
const ReactDOM = require("react-dom")


const RPSInput = ({name, handle}) => {

    function handler() {
        alert("Trapping on change from the select")
    }

    return (
        <select name={name} onChange={handle}>
            <option></option>
            <option>rock</option>
            <option>paper</option>
            <option>scissors</option>
        </select>
    )
}

const Play = React.createClass({
  getInitialState() {
      return {
          p1: null,
          p2: null
      }
  },

  submitPlay(e) {
      e.preventDefault()

      play(this.state.p1, this.state.p2, this)
  },

  p1Changed(e) {
      e.stopPropagation();

      this.setState({p1: e.target.value})
  },

  p2Changed(e) {
      e.stopPropagation();

      this.setState({p2: e.currentTarget.value})
  },

  p1Invalid() {
      alert("P1 entry was invalid")
  },

  p2Invalid() {
      alert("P2 entry was invalid")
  },

  tie() {
      alert("Tie")
  },

  p1Wins() {
      alert("P1 Wins !")
  },

  p2Wins() {
      alert("P2 Wins !")
  },

  render() {
      return (
      <div>
          <form onSubmit={this.submitPlay}>
              <input type="text" name="p1" onChange={this.p1Changed}/>
              <input type="text" name="p2" onChange={this.p2Changed}/>

              {/*<RPSInput name="p1" onChange={this.p1Changed} />*/}
              {/*<RPSInput name="p2" onChange={this.p2Changed} />*/}

              <input type="submit" value="Play"/>
          </form>
      </div>
      )
  }
})

const RComp = () => {
    return (<div>Hello, World!</div>)
}

ReactDOM.render(
    <Play/>,
    document.getElementById("app")
)