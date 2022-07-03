var main = function (toDoObjects) {

    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
        });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // THIS IS THE TAGS TAB CODE
                console.log("the tags tab was clicked!");
                var organizedByTag = organizeByTag(toDoObjects);
                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                    $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                // input a new to-do
                var $input = $("<input>").addClass("description"),
                $inputLabel = $("<p>").text("Description: "),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Tags: "),
                $button = $("<button>").text("+");
                $button.on("click", function () {
                    var description = $input.val(),
                    tags = $tagInput.val().split(","); // split on the comma
                    toDoObjects.push({"description":description, "tags":tags});
                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });
                    $input.val("");
                    $tagInput.val("");
                });
                $content = $("<div>").append($inputLabel)
                .append($input)
                .append($tagLabel)
                .append($tagInput)
                .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
    main(toDoObjects);
    });
});
var organizeByTags = function (toDoObjects) {
    var tagObjects = tags.map(function (tag) {

    var toDosWithTag = [];
    toDoObjects.forEach(function (toDo) {
        if (toDo.tags.indexOf(tag) !== -1) {
            toDosWithTag.push(toDo.description);
        }
    });
    return { "name": tag, "toDos": toDosWithTag };
    });
    console.log(tagObjects);
};