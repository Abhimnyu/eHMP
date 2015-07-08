require "httparty"

When(/^the client requests patient photo with user "(.*?)" and ICN "(.*?)"$/) do |user, icn|
  resource_query = PatientPhotoSearch.new
  resource_query.add_parameter("pid", icn)
  path = resource_query.path
  puts "Requesting photo for ICN" + " " + icn

  #If the ICN is Eight,Patient's ICN, then return the image associated with Eight,Patient.
  #If the ICN is a correct ICN of another patient, then return the gender-neutral image
  #For the moment, all other data passed as an ICN will also return the gender-neutral image
  case icn
  when '10108V420871'
    photo_string = String.new("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")
  when '4325678V4325'
    photo_string = String.new("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")
  else
    photo_string = String.new("/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAB5AHoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7cHiXxCAANdvxgDn7S+Pw5FH/AAk3iL/oP3//AIEP/jWaOn4CloA0f+Em8Rf9B+//APAh/wDGj/hJvEX/AEH7/wD8CH/xrOooA0f+Em8Rf9B+/wD/AAIf/Gj/AISbxF/0H7//AMCH/wAazqAM0AaP/CTeIv8AoP3/AP4EP/jR/wAJN4i/6D9//wCBD/41n7fejb70AaH/AAk3iL/oP3//AIEP/jR/wk3iL/oP3/8A4EP/AI1n7fekIxQBo/8ACTeIv+g/f/8AgQ/+NH/CTeIv+g/f/wDgQ/8AjWdRQBo/8JN4i/6D9/8A+BD/AONH/CTeIv8AoP3/AP4EP/jWdRQBonxL4iIJ/t7UCQOP9Jf/ABNe06O7S6TZSSSszvbRMxJ5JKjOa8F/wP8AKvd9C/5Amnf9ekP/AKAKAPBx0/AUtIOn4CloAKAM0YyaeFoAaF5p+2pI4mkdY0QszHAUdSfSuu0jwjBEiz6qokc4PlZwq+1AHJw2txcHZbwySN6ICf5VZOg6wOTplyfYo1eixxpEojjiSNR0VRgCnUAeWy20sDbJYmRvQgj+dRla9Tnt4bmMxTwpKp/hdciuY1rwn5Svc6WjFV5aFmyQO+2gDkWWmkYqwynqQR2wetRFaAGUUYwaKAD/AAP8q930L/kCad/16Q/+gCvCP8D/ACr3fQv+QJp3/XpD/wCgCgDwcdPwFOWmjp+ApaAHgZqQJk/TkmmKM1e0y0a8vYbUf8tHAP0oA6fwpo628A1K4X99Lwg/uj/6/wDSuiPHHpxmkCqihF6KMD6CigAooooAKMHPBwe31oooA5PxXo6Qn+1IBtV22yr7+v481zLLyT716ddW0d5bS2sv3ZVKmvNp42jkeJ/vIxU/hQBVIxTKmcYqJqAE/wAD/Kvd9C/5Amnf9ekP/oArwj/A/wAq930L/kCad/16Q/8AoAoA8HHT8BTlpE6fgKeOtAD06V0PhCPdqjSf884mP58f1rn17V0ng98ahLH/AHoT+hFAHYH1/D8qSgDgH1H9aKACiiigAooooAUHFcF4gh8rV7lPVg35gV3hGRj1rh/Ej79ZuD6bR+lAGIwxmon61PJUJ60AM/wP8q930L/kCad/16Q/+gCvCP8AA/yr3fQv+QJp3/XpD/6AKAPBx0/AU5aaOn4CnLQBKla+hXQs9Ut5m+6X8tvo3H+FZCHFTI3IOcYPX0oA9OGRwetFZ2haiuo2SszfvowFkH8j+P8AStGgAooooAKKKX69OuKAELKiMzdFG4/QV51fXDXV1NcH/lo5YfSuq8UamttbGxifMtxw3+ytcbI2OOo7H1oAhbvUZ609zmomoAG/of5V7toX/IE07/r0h/8AQBXhH+B/lXu+hf8AIE07/r0h/wDQBQB4OOn4ClpB0/AUtADwcVKjVXBwcHoffFamm6DqmpKHt7crGT99+B/9egB2nahPp1wtxA2D0IPRh6V2+m6ra6nEDCxWQfejPVTWTZ+C4EGby7Mh4yEwB/8AXrWttF0q0YPBaLvHRmJJoAu9TkDFFKcH60lAARntms7VdbttMVlyktxjCxr2960SARg1RuNE0i5JaWyjLHq4JB/OgDh7q5luZmnnffI5yT7elVXautvPBkLDNleshOcLJhh+BrndQ0LVNOUyXFuWjH8aLuX8fSgDOY5qOlcgnA6fpSUAH+B/lXu+hf8AIE07/r0h/wDQBXhH+B/lXu+hf8gTTv8Ar0h/9AFAHg46fgKs2GnXep3C2tnCXc984VfcmnaXptzqt0tpbZBOCzdlHrXoum6XaaTbC2tEGOrP3c+tAGdpPhLT9P2T3QW5nXrvHyKfYVun65/z6UlFABRRRQAUUUUAFFFFABSjnjgZ9f8ACkooAwtY8J2F9umtf9HnPTYPkY+4rib3T7vTbhra8hKOO+cq30Nep1U1LS7TVrY292ox1Vu6n1oA8w/wP8q930L/AJAmnf8AXpD/AOgCvE9T0250m7azuVOVyVbswPevbNC/5Amnf9ekP/oAoA4/w9pCaTp6oy/6RLh5m9Tjgfh/WtOlXqfp/U06gBlFPooAZRT6KAGUU+igBlFPooAZRT6KAGUU+igDI8R6QuraeyIMXEQLwn3xyPxrs9EBXRbBWjwRaxAjHQ7BWC/b8f5V1Nv/AMe8X+4v8qAP/9k=")  
  end

  @response = HTTPartyWithBasicAuth.get_with_authorization_for_user(path, user, TestClients.password_for(user))
  expect(@response.body).to eq photo_string
  puts "...request was successful"
end