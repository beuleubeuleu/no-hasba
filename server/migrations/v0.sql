CREATE DATABASE tricount_clone;

USE tricount_clone;

CREATE TABLE trigroups (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  trigroup_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (trigroup_id) REFERENCES trigroups(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE expenses (
  id INT NOT NULL AUTO_INCREMENT,
  trigroup_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  total_amount FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (trigroup_id) REFERENCES trigroups(id) ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE expense_contributors (
  id INT NOT NULL AUTO_INCREMENT,
  expense_id INT NOT NULL,
  user_id INT NOT NULL,
  amount FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE expense_beneficiaries (
  id INT NOT NULL AUTO_INCREMENT,
  expense_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
