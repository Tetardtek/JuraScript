function hello(name) {
    console.log("Hello " + name);
}

const firstName = "bob";

hello(firstName);
hello(firstName + " marley");

function concat(a, b) {
    return a + b;
}

const wcs = concat("Wild", concat("Code", "School"));
console.log(wcs);