-- Up
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname VARCHAR(20) UNIQUE,
    email VARCHAR(255) NOT NULL,
    passwd VARCHAR(60) NOT NULL,
    uni_id INTEGER REFERENCES Uni(id),
    first_name VARCHAR(255),
    surnames VARCHAR(255),
    degree VARCHAR(255)
);
CREATE TABLE Post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER REFERENCES User(id),
    category_id INTEGER REFERENCES Category(id),
    title VARCHAR(255),
    content TEXT
);
CREATE TABLE Comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER REFERENCES User(id),
    post_id INTEGER REFERENCES Post(id),
    content TEXT
);
CREATE TABLE Uni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) UNIQUE
);
CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    uni_id INTEGER REFERENCES Uni(id)
);
INSERT INTO Uni (name)
VALUES ("UPV");
INSERT INTO Uni (name)
VALUES ("UPC");
INSERT INTO Category (name, uni_id)
VALUES ("Deportes", 1);
INSERT INTO Category (name, uni_id)
VALUES ("Becas", 1);
INSERT INTO Category (name, uni_id)
VALUES ("Fiesta", 1);
INSERT INTO Category (name, uni_id)
VALUES ("Gaming", 1);
INSERT INTO Category (name, uni_id)
VALUES ("Noticias", 1);
INSERT INTO Category (name, uni_id)
VALUES ("General", 1);
INSERT INTO Category (name, uni_id)
VALUES ("Esports", 2);
INSERT INTO Category (name, uni_id)
VALUES ("Beques", 2);
INSERT INTO Category (name, uni_id)
VALUES ("Festa", 2);
INSERT INTO Category (name, uni_id)
VALUES ("Gaming", 2);
INSERT INTO Category (name, uni_id)
VALUES ("Noticies", 2);
INSERT INTO Category (name, uni_id)
VALUES ("General", 2);
INSERT INTO User (nickname, email, passwd, uni_id)
VALUES ("adriavc00", "foo@email.com", "foo", 1);
INSERT INTO User (nickname, email, passwd, uni_id)
VALUES ("hawkyre", "bar@email.com", "bar", 2);
INSERT INTO Post (author_id, category_id, title, content)
VALUES (
        1,
        1,
        "Partida de tenis",
        "Me gustaria organizar una partida de tenis para el pr??ximo lunes a las 17:00. ??Hay alguien interesado en jugar conmigo?"
    );
INSERT INTO Post (author_id, category_id, title, content)
VALUES (
        2,
        10,
        "Competici?? e-sport",
        "He escoltat que s'est?? organitzant una competici?? de videojocs, per?? no tinc molta m??s informaci??. Alg?? sap m??s informaci???"
    );
INSERT INTO Comment (author_id, post_id, content)
VALUES (
        2,
        2,
        "He descobert que es tracta d'una competici?? del LOL. Si alg?? est?? interessat en que li passe el link que em comente."
    );
-- Down
DROP TABLE User;
DROP TABLE Post;
DROP TABLE Comment;
DROP TABLE Uni;
DROP TABLE Category;