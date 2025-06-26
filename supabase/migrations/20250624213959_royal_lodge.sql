/*
  # Add example phrases for DecodeDesk

  1. New Data
    - Insert corporate speak example phrases into `example_phrases` table
    - These will be used for the "Try these examples" feature
  
  2. Examples Added
    - "Let's circle back on this"
    - "We need to leverage our synergies"
    - "Let's take this offline"
    - "We need to think outside the box"
    - "Let's touch base and ideate"
    - "We should drill down on the low-hanging fruit"
    - "Let's move the needle on this initiative"
    - "We need more bandwidth for this project"
*/

INSERT INTO example_phrases (phrase) VALUES 
('Let''s circle back on this'),
('We need to leverage our synergies'),
('Let''s take this offline'),
('We need to think outside the box'),
('Let''s touch base and ideate'),
('We should drill down on the low-hanging fruit'),
('Let''s move the needle on this initiative'),
('We need more bandwidth for this project'),
('Let''s run this up the flagpole'),
('We should socialize this idea'),
('Let''s get our ducks in a row'),
('We need to boil the ocean on this'),
('Let''s ping the stakeholders'),
('We should circle the wagons'),
('Let''s put a pin in this for now')
ON CONFLICT (phrase) DO NOTHING;