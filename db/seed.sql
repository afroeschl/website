INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('alice', 'hashed_pass1');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('bob', 'hashed_pass2');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('charlie', 'hashed_pass3');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('dave', 'hashed_pass4');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('eve', 'hashed_pass5');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('frank', 'hashed_pass6');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('grace', 'hashed_pass7');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('heidi', 'hashed_pass8');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('ivan', 'hashed_pass9');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('judy', 'hashed_pass10');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('kyle', 'hashed_pass11');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('laura', 'hashed_pass12');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('mike', 'hashed_pass13');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('nancy', 'hashed_pass14');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('oliver', 'hashed_pass15');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('pam', 'hashed_pass16');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('quentin', 'hashed_pass17');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('rachel', 'hashed_pass18');
INSERT OR IGNORE INTO users (username, hashedPassword) VALUES ('steve', 'hashed_pass19');

INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'admin'), 'Hello everyone, welcome to the chat!', 3);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'alice'), 'Had a great day at the park with friends.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'bob'), 'Just cooked a new recipe – it was delicious!', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'charlie'), 'Listening to some classic rock tunes right now.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'dave'), 'Taking it easy and enjoying a quiet evening.', 0);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'eve'), 'Lost in a book about philosophy and life.', -1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'frank'), 'Went for a morning hike – the view was breathtaking!', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'grace'), 'Started learning guitar, and it’s both fun and challenging.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'heidi'), 'Enjoying a hot cup of tea on a rainy day.', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'ivan'), 'The weather is perfect for a long bike ride today.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'judy'), 'Had an inspiring conversation with an old friend.', 3);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'kyle'), 'Finished watching an amazing thriller movie last night.', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'laura'), 'Enjoying time with family over a delicious dinner.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'mike'), 'Exploring the city and discovering hidden gems.', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'nancy'), 'Spent the afternoon painting and feeling inspired.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'oliver'), 'Catching up on my favorite podcast series.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'pam'), 'Experimenting with photography – loving the new perspective.', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'quentin'), 'Taking a refreshing walk in the park this afternoon.', 2);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'rachel'), 'Had a spontaneous adventure today – sometimes it’s fun to be unpredictable!', 1);
INSERT INTO chats (user_id, message, vote) VALUES ((SELECT id FROM users WHERE username = 'steve'), 'Reflecting on life and enjoying the simple moments.', 2);

INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'alice'), 1, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'admin'), 2, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'charlie'), 3, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'dave'), 4, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'eve'), 5, -1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'frank'), 6, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'grace'), 7, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'heidi'), 8, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'ivan'), 9, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'judy'), 10, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'kyle'), 11, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'laura'), 12, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'mike'), 13, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'nancy'), 14, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'oliver'), 15, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'pam'), 16, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'quentin'), 17, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'rachel'), 18, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'steve'), 19, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES ((SELECT id FROM users WHERE username = 'admin'), 20, 1);
INSERT OR IGNORE INTO votes (user_id, chat_id, vote) VALUES
((SELECT id FROM users WHERE username = 'alice'), 1, 1),
((SELECT id FROM users WHERE username = 'bob'), 1, -1),
((SELECT id FROM users WHERE username = 'charlie'), 2, 1),
((SELECT id FROM users WHERE username = 'dave'), 3, -1),
((SELECT id FROM users WHERE username = 'eve'), 4, 1),
((SELECT id FROM users WHERE username = 'frank'), 5, -1),
((SELECT id FROM users WHERE username = 'grace'), 6, 1),
((SELECT id FROM users WHERE username = 'heidi'), 7, 1),
((SELECT id FROM users WHERE username = 'ivan'), 8, -1),
((SELECT id FROM users WHERE username = 'judy'), 9, 1),
((SELECT id FROM users WHERE username = 'kyle'), 10, -1),
((SELECT id FROM users WHERE username = 'laura'), 11, 1),
((SELECT id FROM users WHERE username = 'mike'), 12, 1),
((SELECT id FROM users WHERE username = 'nancy'), 13, -1),
((SELECT id FROM users WHERE username = 'oliver'), 14, 1),
((SELECT id FROM users WHERE username = 'pam'), 15, 1),
((SELECT id FROM users WHERE username = 'quentin'), 16, -1),
((SELECT id FROM users WHERE username = 'rachel'), 17, 1),
((SELECT id FROM users WHERE username = 'steve'), 18, 1),
((SELECT id FROM users WHERE username = 'admin'), 19, -1),
((SELECT id FROM users WHERE username = 'alice'), 20, 1),
((SELECT id FROM users WHERE username = 'bob'), 3, 1),
((SELECT id FROM users WHERE username = 'charlie'), 7, 1),
((SELECT id FROM users WHERE username = 'dave'), 10, 1),
((SELECT id FROM users WHERE username = 'eve'), 12, -1),
((SELECT id FROM users WHERE username = 'frank'), 15, 1),
((SELECT id FROM users WHERE username = 'grace'), 18, -1),
((SELECT id FROM users WHERE username = 'heidi'), 20, 1),
((SELECT id FROM users WHERE username = 'ivan'), 5, 1),
((SELECT id FROM users WHERE username = 'judy'), 6, -1),
((SELECT id FROM users WHERE username = 'kyle'), 8, 1),
((SELECT id FROM users WHERE username = 'laura'), 9, 1),
((SELECT id FROM users WHERE username = 'mike'), 11, -1),
((SELECT id FROM users WHERE username = 'nancy'), 13, 1),
((SELECT id FROM users WHERE username = 'oliver'), 14, 1),
((SELECT id FROM users WHERE username = 'pam'), 17, -1),
((SELECT id FROM users WHERE username = 'quentin'), 19, 1),
((SELECT id FROM users WHERE username = 'rachel'), 2, 1),
((SELECT id FROM users WHERE username = 'steve'), 4, -1),
((SELECT id FROM users WHERE username = 'admin'), 6, 1),
((SELECT id FROM users WHERE username = 'alice'), 8, 1),
((SELECT id FROM users WHERE username = 'bob'), 10, -1),
((SELECT id FROM users WHERE username = 'charlie'), 12, 1),
((SELECT id FROM users WHERE username = 'dave'), 14, 1),
((SELECT id FROM users WHERE username = 'eve'), 16, -1),
((SELECT id FROM users WHERE username = 'frank'), 18, 1),
((SELECT id FROM users WHERE username = 'grace'), 20, 1),
((SELECT id FROM users WHERE username = 'heidi'), 1, -1),
((SELECT id FROM users WHERE username = 'ivan'), 3, 1),
((SELECT id FROM users WHERE username = 'judy'), 5, 1),
((SELECT id FROM users WHERE username = 'kyle'), 7, -1),
((SELECT id FROM users WHERE username = 'laura'), 9, 1),
((SELECT id FROM users WHERE username = 'mike'), 11, 1),
((SELECT id FROM users WHERE username = 'nancy'), 13, -1),
((SELECT id FROM users WHERE username = 'oliver'), 15, 1),
((SELECT id FROM users WHERE username = 'pam'), 17, 1),
((SELECT id FROM users WHERE username = 'quentin'), 19, -1);
