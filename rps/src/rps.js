
function play(p1, p2, ui) {
    new PlayUseCase().execute(p1, p2, ui)
}


function PlayUseCase() {
    const validInputs = ["rock", "paper", "scissors"]

    function isValid(input) {
        return validInputs.includes(input)
    }

    function isTie(p1, p2) {
        return (p1 === p2)
    }

    function p1BeatsP2(p1, p2) {
        return (
        p1 === "paper" && p2 === "rock" ||
        p1 === "scissors" && p2 === "paper" ||
        p1 === "rock" && p2 === "scissors")
    }

    this.execute = function (p1, p2, ui) {

        if (!isValid(p1)) {
            ui.p1Invalid()
            return
        }

        if (!isValid(p2)) {
            ui.p2Invalid()
            return
        }

        if (isTie(p1, p2)) {
            ui.tie()
        } else if (p1BeatsP2(p1, p2)) {
            ui.p1Wins()
        } else {
            ui.p2Wins()
        }
    }
}



module.exports = {
    play
};

