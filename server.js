const express = require("express");
const bodyParser = require("body-parser");
const Genre = require('./models/Genre')
const Network = require('./models/Network')
const Series = require('./models/Series')
const methodOverride = require("method-override");
const app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 4567;

app.get("/", (request, response) => {
    response.render("homepage");
});

app.get("/series", (request, response) => {
    Series.all().then(series => {
        response.render("series/index", { series: series });
    })
});
app.get("/series.json", (request, response) => {
    Series.all().then(series => {
        response.json(series);
    });
});

app.get("/series/new", (request, response) => {
    Promise.all([
        Genre.all(),
        Network.all()
    ]).then(([genres, networks]) => {
        response.render("series/new", { genres: genres, networks: networks })
    })
})

app.post("/series", (request, response) => {
    const newSeries = request.body
    Series.create(newSeries).then(show => {
        response.redirect(302, "/series")
    })
})

app.get("/series/:id", (request, response) => {
    const id = request.params.id
    Promise.all([
        Genre.all(),
        Network.all(),
        Series.find(id)
    ]).then(([genres, networks, show]) => {
        response.render("series/show", { genres: genres, networks: networks, show: show })
    })
})

app.put('/series/:id', (request, response) => {
    const updatedShow = request.body
    updatedShow.show_id = request.params.id
    Series.update(updatedShow).then(show => {
        response.redirect(302, `/series/${updatedShow.show_id}`)
    })
})

app.delete('/series/:id', (request, response) => {
    const id = request.params.id;
    Series.delete(id).then(() => {
        response.redirect(302, '/series');
    })
})

app.get("/networks", (request, response) => {
    Network.all().then(networks => {
        response.render("network/index", { networks: networks })
    })
})

app.post("/networks", (request, response) => {
    const newNetwork = request.body
    Network.create(newNetwork).then(network => {
        response.redirect(302, "/networks")
    })
})

app.get("/networks/:id", (request, response) => {
    const id = request.params.id;
    Promise.all([
        Network.find(id),
        Series.findNetwork(id)
    ]).then(([network, series]) => {
        response.render("network/show", { network: network, series: series })
    })
})

app.delete('/networks/:id', (request, response) => {
    const id = request.params.id;
    Network.delete(id).then(() => {
        response.redirect(302, '/networks');
    })
})

app.get("/genres", (request, response) => {
    Genre.all().then(genres => {
        response.render("genre/index", { genres: genres })
    })
})

app.post("/genres", (request, response) => {
    const newGenre = request.body
    Genre.create(newGenre).then(genre => {
        response.redirect(302, "/genres")
    })
})

app.get("/genres/:id", (request, response) => {
    const id = request.params.id;
    Promise.all([
        Genre.find(id),
        Series.findGenre(id)
    ]).then(([genre, series]) => {
        response.render("genre/show", { genre: genre, series: series })
    })
})

app.delete('/genres/:id', (request, response) => {
    const id = request.params.id;
    Genre.delete(id).then(() => {
        response.redirect(302, '/genres');
    })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});