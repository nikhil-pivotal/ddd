const {play, ValidationError} = require("../src/rps")
const FakePlayRepo = require("./../src/FakePlayRepo");

describe("play", function () {
    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    let ui, repo, repoSaveSpy

    function makeSpy(fn) {
        return jasmine.createSpyObj("uiSpy", [fn])
    }

    beforeEach(function () {
        repo = new FakePlayRepo()
        repoSaveSpy = spyOn(repo, 'save')

    })

    it("rock vs rock", function () {
        ui = makeSpy("tie")
        play(ROCK, ROCK, ui, repo)

        expect(ui.tie).toHaveBeenCalled();
    });

    it("paper vs rock", function () {
        ui = makeSpy("p1Wins")
        play(PAPER, ROCK, ui, repo)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("rock vs paper", function () {
        ui = makeSpy("p2Wins")
        play(ROCK, PAPER, ui, repo)

        expect(ui.p2Wins).toHaveBeenCalled()
    });

    it("scissors vs paper", function () {
        ui = makeSpy("p1Wins")
        play(SCISSORS, PAPER, ui, repo)

        expect(ui.p1Wins).toHaveBeenCalled()
    });

    it("paper vs scissors", function () {
        ui = makeSpy("p2Wins")
        play(PAPER, SCISSORS, ui, repo)

        expect(ui.p2Wins).toHaveBeenCalled()
    });

    it("rock vs scissors", function () {
        ui = makeSpy("p1Wins")
        play(ROCK, SCISSORS, ui, repo)

        expect(ui.p1Wins).toHaveBeenCalled()
    });

    it("scissors vs rock", function () {
        ui = makeSpy("p2Wins")
        play(SCISSORS, ROCK, ui, repo)

        expect(ui.p2Wins).toHaveBeenCalled()
        expect(repoSaveSpy).toHaveBeenCalled()
    });

    it("sailboat vs rock", function () {
        ui = makeSpy("invalid")
        play("sailboat", ROCK, ui, repo)

        expect(ui.invalid).toHaveBeenCalledWith([new ValidationError("p1", "invalidThrow")])
        expect(repoSaveSpy).toHaveBeenCalled()
    });

    it("rock vs sailboat", function () {
        ui = makeSpy("invalid")
        play(ROCK, "sailboat", ui, repo)

        expect(ui.invalid).toHaveBeenCalledWith([new ValidationError("p2", "invalidThrow")])
        expect(repoSaveSpy).toHaveBeenCalled()
    });

})


