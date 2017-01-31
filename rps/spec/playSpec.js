

const { play } = require("../src/rps")

describe("play", function () {
    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    let ui

    function makeSpy(fn) {
        return jasmine.createSpyObj("uiSpy", [fn])
    }

    it("rock vs rock", function () {
        // ui = jasmine.createSpyObj("uiSpy", ["tie"])
        ui = makeSpy("tie")
        play(ROCK, ROCK, ui)

        expect(ui.tie).toHaveBeenCalled();
    });

    it("paper vs rock", function () {
        ui = makeSpy("p1Wins")
        play(PAPER, ROCK, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("rock vs paper", function () {
        ui = makeSpy("p2Wins")
        play(ROCK, PAPER, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    });

    it("scissors vs paper", function () {
        ui = makeSpy("p1Wins")
        play(SCISSORS, PAPER, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    });

    it("paper vs scissors", function () {
        ui = makeSpy("p2Wins")
        play(PAPER, SCISSORS, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    });

    it("rock vs scissors", function () {
        ui = makeSpy("p1Wins")
        play(ROCK, SCISSORS, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    });

    it("scissors vs rock", function () {
        ui = makeSpy("p2Wins")
        play(SCISSORS, ROCK, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    });

    it("sailboat vs rock", function () {
        ui = makeSpy("p1Invalid")
        play("sailboat", ROCK, ui)

        expect(ui.p1Invalid).toHaveBeenCalled()
    });

    it("rock vs sailboat", function () {
        ui = makeSpy("p2Invalid")
        play(ROCK, "sailboat", ui)

        expect(ui.p2Invalid).toHaveBeenCalled()
    });

})


