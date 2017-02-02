
const { Play } = require("../src/play")
const { history, play } = require("../src/rps");
const FakePlayRepo = require("./../src/FakePlayRepo")

describe("history", function () {
    let ui, repo

    beforeEach(function () {
        ui = jasmine.createSpyObj("uiSpy", ["noPlays", "p2Wins", "plays"])
        repo = new FakePlayRepo()
    })

    it("given no one has played before", function () {
        history(ui, repo)

        expect(ui.noPlays).toHaveBeenCalled()
    });

    it("given one game has been played before", function () {
        play("rock", "paper", ui, repo)
        history(ui, repo)

        expect(ui.plays).toHaveBeenCalledWith([new Play("rock", "paper", "p2")])
    })

    it("", function () {
        
    });


});



