function FakePlayRepo(){
    this.plays = [];

    this.save = function (play) {
        this.plays.push(play)
    }

    this.empty = function () {
        return (this.plays.length === 0)
    }

    this.getAll = function () {
        return this.plays
    }
}

module.exports = FakePlayRepo
