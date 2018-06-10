DROP DATABASE series;

CREATE DATABASE series;

\c series 

CREATE TABLE networks (
    network_id SERIAL PRIMARY KEY,
    network_name TEXT NOT NULL,
    logo_url TEXT
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name TEXT NOT NULL
);

CREATE TABLE series (
    show_id SERIAL PRIMARY KEY,
    show_name TEXT NOT NULL,
    number_of_seasons INTEGER NOT NULL,
    number_of_episodes INTEGER NOT NULL,
    image_url TEXT,
    network_id INTEGER REFERENCES networks(network_id),
    genre_id INTEGER REFERENCES genres(genre_id)
);