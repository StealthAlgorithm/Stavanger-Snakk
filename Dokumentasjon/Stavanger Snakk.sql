Create DATABASE StavangerSnakk;
USE StavangerSnakk;

Create TABLE History
(
HistoryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
UserID INT NOT NULL,
Latitude DOUBLE PRECISION(12,6) NOT NULL,
Longitude DOUBLE PRECISION(12,6) NOT NULL,
History TEXT NOT NULL,
Created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
Edited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
DateDeleted DATE
);

alter table History add Active boolean default false;

insert into History(UserID, Longitude, Latitude, History) values(1,5.733107,58.969975,"Dette er Stavanger");

