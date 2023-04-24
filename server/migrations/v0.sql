CREATE DATABASE tricount_clone;

USE tricount_clone;

CREATE TABLE trigroup (
    trigroup_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (trigroup_id)
);

CREATE TABLE expense (
    expense_id INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    what TEXT,
    trigroup_id INT NOT NULL,
    PRIMARY KEY (expense_id),
    FOREIGN KEY (trigroup_id) REFERENCES trigroup(trigroup_id)
);

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
