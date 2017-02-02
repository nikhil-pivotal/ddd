const { Play } = require('./play')
const FakePlayRepo = require('./FakePlayRepo')


function play(p1, p2, ui, repo) {
    new PlayUseCase(p1, p2, ui, repo).execute()
}

function history(ui, repo) {
    if(repo.empty()){
        ui.noPlays()
    }else {
        ui.plays(repo.getAll())
    }
}


function ValidationError(player, errorCode) {
    this.player = player
    this.errorCode = errorCode
}

function PlayUseCase(p1, p2, ui, repo) {
    const validInputs = ["rock", "paper", "scissors"]

    function isValid(input) {
        return validInputs.includes(input)
    }

    function isTie() {
        return (p1 === p2)
    }

    function p1BeatsP2() {
        return (
        p1 === "paper" && p2 === "rock" ||
        p1 === "scissors" && p2 === "paper" ||
        p1 === "rock" && p2 === "scissors")
    }

    function checkValid() {
        let validationErrors = []

        if (!isValid(p1)) {
            validationErrors.push(new ValidationError("p1", "invalidThrow"))
        }

        if (!isValid(p2)) {
            validationErrors.push(new ValidationError("p2", "invalidThrow"))
        }

        if (validationErrors.length > 0) {
            ui.invalid(validationErrors)
            return false
        }

        return true
    }

    this.execute = function () {
        if (checkValid()) {
            if (isTie()) {
                repo.save(new Play(p1, p2, "tie"))
                ui.tie()
            } else if (p1BeatsP2()) {
                repo.save(new Play(p1, p2, "p1"))
                ui.p1Wins()
            } else {
                repo.save(new Play(p1, p2, "p2"))
                ui.p2Wins()
            }
        } else {
            repo.save(new Play(p1, p2, "invalid play"))
        }
    }
}

module.exports = {
    play,
    history,
    ValidationError,
    FakePlayRepo
};

