DROP TABLE IF EXISTS bands;

CREATE TABLE bands (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
	image TEXT NOT NULL
);

INSERT INTO bands (name, image) VALUES ('Iron Maiden', 'iron-maiden.jpg');
INSERT INTO bands (name, image) VALUES ('Metallica', 'metallica.jpg');
INSERT INTO bands (name, image) VALUES ('System of a Down', 'soad.jpg');

INSERT INTO bands (name, image) VALUES ('Guns N Roses', 'guns.jpg');
INSERT INTO bands (name, image) VALUES ('AC/DC', 'acdc.jpg');
INSERT INTO bands (name, image) VALUES ('Aerosmith', 'aerosmith.jpg');
INSERT INTO bands (name, image) VALUES ('Slipknot', 'slipknot.jpg');



DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	bandId INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE,
	image TEXT NOT NULL
);

INSERT INTO albums (name, bandId, image) VALUES ('Fear of the dark', 1,'fear-of-the-dark.jpg');
INSERT INTO albums (name,bandId, image) VALUES ('The number of the beast', 1,  '666.jpg');
INSERT INTO albums (name,bandId, image) VALUES ('Master of puppets', 2,'masterofp.jpg');


DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
	year INTEGER NOT NULL,
	bandId INTEGER NOT NULL,
	duration TEXT NOT NULL,
	stars INTEGER DEFAULT 1
);






SELECT * FROM bands;
SELECT * FROM songs;

SELECT * FROM songs WHERE bandId = 3;

DELETE FROM songs WHERE id = 6;