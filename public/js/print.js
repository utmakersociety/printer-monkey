function toJSONString(form) {
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for(var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if(name) {
            obj[name] = value;
        }
    }
}

var print = document.getElementById("print-form");
var uploader = document.getElementById("file");

uploader.addEventListener("change", function(event) {
    
});