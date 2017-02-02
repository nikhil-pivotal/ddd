const { Play } = require("../src/play");


function playRepoContract(Repo) {
    describe("Play Repo Contract", function () {
        let repo, play;

        beforeEach(function () {
            repo = new Repo()
        });

        it("saves plays", function () {
            let play = new Play("rock", "rock", "tie")

            repo.save(play)

            expect(repo.getAll()).toContain(play)
        });

        describe("when there are no plays", function () {
            it("the repo should be empty", function () {
                expect(repo.empty()).toBeTruthy()
            });
        });

        describe("when there are plays", function () {
            it("is not empty", function () {
                repo.save(new Play("paper", "scissors", "p2"))

                expect(repo.empty()).toBeFalsy()
            });

            it("should return all plays", function () {
                let play1 = new Play("rock", "paper", "p2")
                let play2 = new Play("paper", "paper", "tie")
                repo.save(play1)
                repo.save(play2)

                expect(repo.getAll()).toContain(play1)
                expect(repo.getAll()).toContain(play2)
            })
        });
    });
}

module.exports = playRepoContract
