const {play, history, FakePlayRepo} = require("rps")
const React = require("react")
const ReactDOM = require("react-dom")


const RPSInput = ({name, handler}) => {
    return (
        <select name={name} onChange={handler}>
            <option></option>
            <option>rock</option>
            <option>paper</option>
            <option>scissors</option>
        </select>
    )
}

const History = ({plays}) => {
    return(
        <ul>
            {plays.map((play, index) =>
               <li key={index}>{play.p1Throw + ", " + play.p2Throw + ", " + play.winner}</li>
            )}
        </ul>
    )
}

const Result = ({result, errors}) => {
    return (
        <div>
            <h1>{result}</h1>

            {errors.map((error, index) =>
                <h2 key={index}>{error}</h2>
            )}
        </div>
    )
}

const Play = React.createClass({
    getInitialState() {
        this.repo = new FakePlayRepo()

        return {
            p1: null,
            p2: null,
            result: "",
            errors: [
            ],
            currentHistory: <h1>No rounds!</h1>
        }
    },

    componentDidMount(){
        history(this, this.repo)
    },

    submitPlay(e) {
        e.preventDefault()

        play(this.state.p1, this.state.p2, this, this.repo)
        history(this, this.repo)
    },

    p1Changed(e) {
        e.stopPropagation();

        this.setState({p1: e.target.value})
    },

    p2Changed(e) {
        e.stopPropagation();

        this.setState({p2: e.currentTarget.value})
    },

    invalid(validationErrors) {
        let errors = []

        for (var i = 0; i < validationErrors.length; i++) {
            var error = validationErrors[i]

            errors.push(error.player + " " + error.errorCode)
        }

        this.setState({
            result: "Invalid Game!",
            errors: errors
        })
    },

    tie() {
        this.setState({
            result: "Tie !"
        })
    },

    p1Wins() {
        this.setState({
            result: "P1 Wins !"
        })
    },

    p2Wins() {
        this.setState({
            result: "P2 Wins !"
        })
    },

    plays(rounds){
        this.setState({currentHistory: <History plays={rounds}/>})
    },

    noPlays(){
    },

    render() {
        return (
            <div>

                <Result result={this.state.result} errors={this.state.errors}/>

                <form onSubmit={this.submitPlay}>
                    <input type="text" name="p1" onChange={this.p1Changed}/>
                    <input type="text" name="p2" onChange={this.p2Changed}/>
                    <input type="submit" value="Play"/>
                </form>

                {this.state.currentHistory}
            </div>
        )
    }
})


ReactDOM.render(
    <Play/>,
    document.getElementById("app")
)