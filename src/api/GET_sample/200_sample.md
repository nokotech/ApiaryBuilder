### Create a New Question [GET]

You may create your own question using this action. It takes a JSON
object containing a question and a collection of answers in the
form of choices.

+ Request (application/json)

        <%_ include 200_req.json _%>


+ Response 200 (application/json)

    + Headers
    
            Location: /questions/2
    
    + Body

        <%_ include 200_res.json _%>
