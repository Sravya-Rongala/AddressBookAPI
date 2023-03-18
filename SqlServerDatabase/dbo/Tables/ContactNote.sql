

CREATE TABLE ContactNote (
  Id INT PRIMARY KEY,
  ContactId INT,
  Note VARCHAR(MAX),
  FOREIGN KEY (ContactId) REFERENCES ContactDetails(Id)
);
