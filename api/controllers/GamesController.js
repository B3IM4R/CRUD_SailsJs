/**
 * GamesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    list: (req, res) => {
        Games.find().exec((err, games) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.view('games/games', { games: games });
        });
    },

    add: (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        Games.create({ name: name, description: description }).exec((err) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.redirect('/games/list');
        });
    },

    edit: (req, res) => {
        Games.findOne({ id: req.params.id }).exec(function (err, game) {
            if (err) {
                res.send(500, { err: err });
            }
            res.view('games/edit', { game: game });
        })
    },

    delete: (req, res) => {
        Games.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { err: err });
            }
            res.redirect('/games/list');
        });
    },

    update: (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        Games.update({ id: req.params.id }, { name: name, description: description }).exec((err) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.redirect('/games/list');
        });
    }


};

