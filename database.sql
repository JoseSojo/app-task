CREATE TABLE task (
  id INT(11) NOT NULL AUTO_INCREMENT,
  task_title VARCHAR(150) NOT NULL,
  task_description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);
